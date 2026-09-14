import { NextRequest, NextResponse } from "next/server";
import { promptFor } from "@/lib/vault-db";

// Single-company prompt fields for member copy buttons.
// Tiny response by design: the ledger never carries prompt text (CPU budget).
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const row = await promptFor(params.slug);
  if (!row) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json(row);
}
