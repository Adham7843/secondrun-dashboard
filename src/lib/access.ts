import { drizzle } from "drizzle-orm/d1";
// @ts-expect-error - resolved at Workers runtime via vinext/cloudflare bindings
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ACCESS tables (entitlements + magic links + sessions). Vault content tables
// live in vault-schema.ts. D1 only — no Prisma, no files.

export const entitlements = sqliteTable("entitlements", {
  email: text("email").primaryKey(),
  licenseKey: text("license_key").notNull(),
  membershipId: text("membership_id"),
  createdAt: text("created_at").notNull(),
});

export const magicTokens = sqliteTable("magic_tokens", {
  tokenHash: text("token_hash").primaryKey(),
  email: text("email").notNull(),
  expiresAt: text("expires_at").notNull(),
  used: integer("used").notNull().default(0),
});

export const sessions = sqliteTable("sessions", {
  sessionHash: text("session_hash").primaryKey(),
  email: text("email").notNull(),
  expiresAt: text("expires_at").notNull(),
});

// @ts-expect-error - D1Database exists at Workers runtime
type D1 = D1Database;

function db() {  const { secondrun_vault } = env as unknown as { secondrun_vault: D1 };
  if (!secondrun_vault) throw new Error("D1 binding 'secondrun_vault' missing");
  return drizzle(secondrun_vault);
}

const enc = new TextEncoder();

export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(input));
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function randomToken(bytes = 32): string {
  const buf = crypto.getRandomValues(new Uint8Array(bytes));
  return [...buf].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ---------------------------------------------------------------------------
// Standard Webhooks verification (what Whop uses).
// Trial key derivations: Whop issues `ws_`-prefixed secrets; the spec uses
// `whsec_` + base64. Accept a cryptographic match under any interpretation —
// still fail-closed (no match = rejected), just tolerant of key encoding.
// ---------------------------------------------------------------------------

function b64ToBytes(b64: string): Uint8Array | null {
  try {
    const bin = atob(b64.replace(/-/g, "+").replace(/_/g, "/"));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

function hexToBytes(hex: string): Uint8Array | null {
  if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function keyCandidates(secret: string): Uint8Array[] {
  const out: Uint8Array[] = [enc.encode(secret)];
  const stripped = secret.replace(/^(whsec_|ws_)/, "");
  const b64 = b64ToBytes(stripped);
  if (b64) out.push(b64);
  const hex = hexToBytes(stripped);
  if (hex) out.push(hex);
  return out;
}

async function hmacB64(key: Uint8Array, msg: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key.buffer as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
  const bytes = new Uint8Array(sig);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

export async function verifyWebhook(
  secret: string,
  headers: { id: string; timestamp: string; signature: string },
  rawBody: string
): Promise<{ ok: boolean; reason?: string }> {
  const ts = parseInt(headers.timestamp, 10);
  if (!Number.isFinite(ts)) return { ok: false, reason: "bad-timestamp" };
  const skew = Math.abs(Math.floor(Date.now() / 1000) - ts);
  if (skew > 300) return { ok: false, reason: "stale" };

  const msg = `${headers.id}.${headers.timestamp}.${rawBody}`;
  const sigs = headers.signature
    .split(" ")
    .map((s) => (s.includes(",") ? s.split(",")[1] : s).trim())
    .filter(Boolean);

  for (const key of keyCandidates(secret)) {
    const expected = await hmacB64(key, msg);
    if (sigs.includes(expected)) return { ok: true };
  }
  return { ok: false, reason: "no-match" };
}

// ---------------------------------------------------------------------------
// Entitlements + sessions
// ---------------------------------------------------------------------------

export async function grantEntitlement(
  email: string,
  licenseKey: string,
  membershipId: string | null
): Promise<void> {
  const d = db();
  const now = new Date().toISOString();
  const existing = await d
    .select()
    .from(entitlements)
    .where(eq(entitlements.email, email.toLowerCase()))
    .limit(1);
  if (existing.length > 0) {
    return;
  }
  await d.insert(entitlements).values({
    email: email.toLowerCase(),
    licenseKey,
    membershipId,
    createdAt: now,
  });
}

export async function hasEntitlement(email: string): Promise<boolean> {
  const d = db();
  const rows = await d
    .select({ email: entitlements.email })
    .from(entitlements)
    .where(eq(entitlements.email, email.toLowerCase()))
    .limit(1);
  return rows.length > 0;
}

export async function mintMagicToken(email: string): Promise<string> {
  const d = db();
  const token = randomToken(32);
  const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  await d.insert(magicTokens).values({
    tokenHash: await sha256Hex(token),
    email: email.toLowerCase(),
    expiresAt: expires,
    used: 0,
  });
  return token;
}

export async function redeemMagicToken(token: string): Promise<string | null> {
  const d = db();
  const hash = await sha256Hex(token);
  const rows = await d
    .select()
    .from(magicTokens)
    .where(eq(magicTokens.tokenHash, hash))
    .limit(1);
  const row = rows[0];
  if (!row || row.used) return null;
  if (new Date(row.expiresAt).getTime() < Date.now()) return null;
  if (!(await hasEntitlement(row.email))) return null;
  return row.email;
}

export async function consumeMagicToken(token: string): Promise<void> {
  const d = db();
  const hash = await sha256Hex(token);
  await d
    .update(magicTokens)
    .set({ used: 1 })
    .where(eq(magicTokens.tokenHash, hash));
}

const SESSION_COOKIE = "secondrun_session";
const YEAR = 365 * 24 * 60 * 60;

export function sessionCookieHeader(session: string): string {
  return `${SESSION_COOKIE}=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${YEAR}`;
}

export async function createSession(email: string): Promise<string> {
  const d = db();
  const session = randomToken(32);
  const expires = new Date(Date.now() + YEAR * 1000).toISOString();
  await d.insert(sessions).values({
    sessionHash: await sha256Hex(session),
    email: email.toLowerCase(),
    expiresAt: expires,
  });
  return session;
}

/** Email bound to a live session cookie, or null. Server-side gate primitive. */
export async function sessionEmail(cookieHeader: string | null): Promise<string | null> {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(SESSION_COOKIE + "="));
  if (!match) return null;
  const session = match.slice(SESSION_COOKIE.length + 1);
  if (!session) return null;
  const d = db();
  const rows = await d
    .select()
    .from(sessions)
    .where(eq(sessions.sessionHash, await sha256Hex(session)))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  if (new Date(row.expiresAt).getTime() < Date.now()) return null;
  if (!(await hasEntitlement(row.email))) return null;
  return row.email;
}
