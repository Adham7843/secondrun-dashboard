import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error - resolved at Workers runtime via vinext/cloudflare bindings
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import {
  entitlements,
  hasEntitlement,
  mintMagicToken,
} from "@/lib/access";

// POST { email } → generic "check your inbox" ALWAYS (no account enumeration).
export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = (await req.json()) as { email?: string };
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: true });
  }
  if (!email || !email.includes("@")) return NextResponse.json({ ok: true });
  if (!(await hasEntitlement(email))) return NextResponse.json({ ok: true });

  const token = await mintMagicToken(email);
  const cfg = env as unknown as {
    VAULT_URL?: string;
    RESEND_API_KEY?: string;
    RESEND_FROM?: string;
  };
  const base = (cfg.VAULT_URL || "https://secondrun-vault.amradham153.workers.dev").replace(/\/$/, "");
  const link = `${base}/api/auth/verify?t=${token}`;

  const { secondrun_vault } = env as unknown as {
    // @ts-expect-error - D1Database exists at Workers runtime
    secondrun_vault: D1Database;
  };
  const d = drizzle(secondrun_vault);
  const rows = await d
    .select({ licenseKey: entitlements.licenseKey })
    .from(entitlements)
    .where(eq(entitlements.email, email))
    .limit(1);
  const licenseKey = rows[0]?.licenseKey ?? "SR-ALL-ACCESS";

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
        subject: "Your SecondRun vault access link",
        text: `One-click access (valid 15 min):\n${link}\n\nLicense key: ${licenseKey}`,
      }),
    });
  } else {
    console.log(`[ACCESS LINK] ${email} :: ${licenseKey} :: ${link}`);
  }
  return NextResponse.json({ ok: true });
}
