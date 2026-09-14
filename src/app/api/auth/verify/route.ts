import { NextRequest, NextResponse } from "next/server";
import {
  redeemMagicToken,
  consumeMagicToken,
  createSession,
  sessionCookieHeader,
} from "@/lib/access";

// GET /api/auth/verify?t=<token> → session cookie → dashboard.
export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("t") ?? "";
  const fail = (reason: string) =>
    NextResponse.redirect(new URL(`/signin?error=${reason}`, req.url));

  if (!token) return fail("missing");
  const email = await redeemMagicToken(token);
  if (!email) return fail("invalid");
  await consumeMagicToken(token);
  const session = await createSession(email);

  const res = NextResponse.redirect(new URL("/dashboard", req.url));
  res.headers.append("Set-Cookie", sessionCookieHeader(session));
  return res;
}
