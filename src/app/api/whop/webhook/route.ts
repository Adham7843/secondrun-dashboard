import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error - resolved at Workers runtime via vinext/cloudflare bindings
import { env } from "cloudflare:workers";
import {
  verifyWebhook,
  grantEntitlement,
  mintMagicToken,
  randomToken,
} from "@/lib/access";

// Whop fulfillment: verify signature → record entitlement → mint access.
// Returns 200 fast ALWAYS after verification (slow work never blocks Whop).

interface WorkerEnv {
  WHOP_WEBHOOK_SECRET?: string;
  WHOP_API_KEY?: string;
  VAULT_URL?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
}

function workerEnv(): WorkerEnv {
  return env as unknown as WorkerEnv;
}

async function memberEmail(
  apiKey: string | undefined,
  payload: Record<string, unknown>
): Promise<string | null> {
  const user = payload.user as { email?: string } | undefined;
  if (user?.email) return user.email;
  const member = payload.member as { email?: string } | undefined;
  if (member?.email) return member.email;
  const memberId = (payload.member as { id?: string } | undefined)?.id;
  if (!apiKey || !memberId) return null;
  try {
    const res = await fetch(
      `https://api.whop.com/api/v1/members/${encodeURIComponent(memberId)}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { user?: { email?: string } };
    return data.user?.email ?? null;
  } catch {
    return null;
  }
}

async function sendAccessLink(
  cfg: WorkerEnv,
  email: string,
  licenseKey: string,
  token: string
): Promise<void> {
  const base = (cfg.VAULT_URL || "https://secondrun-vault.amradham153.workers.dev").replace(/\/$/, "");
  const link = `${base}/api/auth/verify?t=${token}`;
  if (cfg.RESEND_API_KEY && cfg.RESEND_FROM) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: cfg.RESEND_FROM,
        to: email,
        subject: "Your SecondRun vault key is ready",
        text: `SecondRun All-Access confirmed.\n\nLicense key: ${licenseKey}\nAccess the vault (one click, valid 15 min):\n${link}\n\nKeep this email — your purchase address is your permanent re-entry key.`,
      }),
    });
    return;
  }
  // No mailer configured (test phase): log the link for manual delivery.
  console.log(`[ACCESS LINK] ${email} :: ${licenseKey} :: ${link}`);
}

export async function POST(req: NextRequest) {
  const cfg = workerEnv();
  if (!cfg.WHOP_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "webhook-not-configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const checked = await verifyWebhook(
    cfg.WHOP_WEBHOOK_SECRET,
    {
      id: req.headers.get("webhook-id") ?? "",
      timestamp: req.headers.get("webhook-timestamp") ?? "",
      signature: req.headers.get("webhook-signature") ?? "",
    },
    rawBody
  );
  if (!checked.ok) {
    console.log(`[WEBHOOK] rejected: ${checked.reason}`);
    return NextResponse.json({ error: "bad-signature" }, { status: 400 });
  }

  let event: { type?: string; data?: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "bad-payload" }, { status: 400 });
  }

  // Fulfillment trigger: access became valid (one-time + free joins alike).
  if (event.type === "membership.went_valid" || event.type === "payment.succeeded") {
    const data = event.data ?? {};
    const email = await memberEmail(cfg.WHOP_API_KEY, data);
    if (!email) {
      console.log(`[WEBHOOK] ${event.type}: no email resolvable, payload keys: ${Object.keys(data).join(",")}`);
      return NextResponse.json({ ok: true, fulfilled: false });
    }
    const membership = data as { id?: string; license_key?: string };
    const licenseKey =
      membership.license_key ?? `SR-${randomToken(4).toUpperCase()}`;
    await grantEntitlement(email, licenseKey, membership.id ?? null);
    const token = await mintMagicToken(email);
    await sendAccessLink(cfg, email, licenseKey, token);
    console.log(`[WEBHOOK] fulfilled ${event.type} for ${email}`);
    return NextResponse.json({ ok: true, fulfilled: true });
  }

  // Access revoked (dispute/chargeback/cancel): entitlement dies here.
  if (event.type === "membership.went_invalid") {
    const data = event.data ?? {};
    const email = await memberEmail(cfg.WHOP_API_KEY, data);
    console.log(`[WEBHOOK] went_invalid for ${email ?? "unknown"} — TODO revoke (phase 2b)`);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true, ignored: event.type ?? "unknown" });
}
