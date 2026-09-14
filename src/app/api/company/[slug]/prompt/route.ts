import { NextRequest, NextResponse } from "next/server";
import { promptFor } from "@/lib/vault-db";
import { sessionEmail } from "@/lib/access";

// Single-company prompt fields for member copy buttons.
// Gated: no session → 401. Tiny response by design (CPU budget).
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const member = await sessionEmail(req.headers.get("cookie"));
  if (!member) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  const row = await promptFor(params.slug);
  if (!row) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json(row);
}
