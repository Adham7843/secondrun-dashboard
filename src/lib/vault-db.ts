import { drizzle } from "drizzle-orm/d1";
// @ts-expect-error - resolved at Workers runtime via vinext/cloudflare bindings
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { companies, founders, teardownsPro } from "./vault-schema";

// VAULT data access: D1 only. No Prisma, no SQLite files — this code runs on
// Cloudflare Workers where neither exists.

// @ts-expect-error - D1Database type comes from @cloudflare/workers-types at deploy
type D1 = D1Database;

function db() {
  const { secondrun_vault } = env as unknown as { secondrun_vault: D1 };
  if (!secondrun_vault) {
    throw new Error("D1 binding 'secondrun_vault' is not configured");
  }
  return drizzle(secondrun_vault);
}

export interface VaultTeardown {
  overview: string;
  fatalFlaw: string | null;
  rebuildThesis: string | null;
  agentPrompt: string | null;
}

export interface VaultCompanyLite {
  id: string;
  slug: string;
  name: string;
  batch: string;
  status: string;
  tagline: string;
  industry: string;
  capitalBurned: string | null;
  fatalFlawSummary: string | null;
  foundedYear: number | null;
  closedYear: number | null;
  fatalFlaw: string | null;
  rebuildThesis: string | null;
}

export interface VaultCompany extends VaultCompanyLite {
  teardown: VaultTeardown | null;
}

/** Member ledger, LIGHT fields only (no overview, no agentPrompt).
 * Full prompts load per-company on demand via promptFor().
 * Keeps every response far under the free-tier CPU limit. */
export async function getVaultLedger(): Promise<VaultCompanyLite[]> {
  const d = db();
  const rows = await d
    .select({
      id: companies.id,
      slug: companies.slug,
      name: companies.name,
      batch: companies.batch,
      status: companies.status,
      tagline: companies.tagline,
      industry: companies.industry,
      capitalBurned: companies.capitalBurned,
      fatalFlawSummary: companies.fatalFlawSummary,
      foundedYear: companies.foundedYear,
      closedYear: companies.closedYear,
      fatalFlaw: teardownsPro.fatalFlaw,
      rebuildThesis: teardownsPro.rebuildThesis,
    })
    .from(companies)
    .leftJoin(teardownsPro, eq(teardownsPro.companyId, companies.id));

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    batch: r.batch,
    status: r.status,
    tagline: r.tagline,
    industry: r.industry,
    capitalBurned: r.capitalBurned,
    fatalFlawSummary: r.fatalFlawSummary,
    foundedYear: r.foundedYear,
    closedYear: r.closedYear,
    fatalFlaw: r.fatalFlaw,
    rebuildThesis: r.rebuildThesis,
  }));
}

/** Single-company prompt fields, fetched on demand (copy buttons, workspace). */
export async function promptFor(slug: string): Promise<{
  name: string;
  slug: string;
  industry: string;
  batch: string;
  capitalBurned: string | null;
  tagline: string;
  fatalFlawSummary: string | null;
  fatalFlaw: string | null;
  rebuildThesis: string | null;
  agentPrompt: string | null;
} | null> {
  const d = db();
  const rows = await d
    .select({
      name: companies.name,
      slug: companies.slug,
      industry: companies.industry,
      batch: companies.batch,
      capitalBurned: companies.capitalBurned,
      tagline: companies.tagline,
      fatalFlawSummary: companies.fatalFlawSummary,
      fatalFlaw: teardownsPro.fatalFlaw,
      rebuildThesis: teardownsPro.rebuildThesis,
      agentPrompt: teardownsPro.agentPrompt,
    })
    .from(companies)
    .leftJoin(teardownsPro, eq(teardownsPro.companyId, companies.id))
    .where(eq(companies.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export interface VaultFounder {
  id: string;
  name: string;
  role: string | null;
  xUrl: string | null;
  linkedinUrl: string | null;
}

export interface VaultDossier extends VaultCompanyLite {
  location: string | null;
  ycUrl: string | null;
  websiteUrl: string | null;
  founders: VaultFounder[];
  teardown: VaultTeardown;
  sections: { title: string; body: string }[];
  antiPatterns: string[];
  sources: string[];
}

/** Full member dossier with prompt suite + parsed story blocks. */
export async function getVaultDossier(slug: string): Promise<VaultDossier | null> {
  const d = db();
  const rows = await d
    .select()
    .from(companies)
    .leftJoin(teardownsPro, eq(teardownsPro.companyId, companies.id))
    .where(eq(companies.slug, slug))
    .limit(1);

  const row = rows[0];
  if (!row || !row.teardowns_pro) return null;
  const c = row.companies;
  const t = row.teardowns_pro;

  const team = await d
    .select()
    .from(founders)
    .where(eq(founders.companyId, c.id));

  const parse = <T,>(raw: string | null, fallback: T): T => {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  };

  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    batch: c.batch,
    status: c.status,
    tagline: c.tagline,
    industry: c.industry,
    capitalBurned: c.capitalBurned,
    fatalFlawSummary: c.fatalFlawSummary,
    foundedYear: c.foundedYear,
    closedYear: c.closedYear,
    location: c.location,
    ycUrl: c.ycUrl,
    websiteUrl: c.websiteUrl,
    fatalFlaw: t.fatalFlaw,
    rebuildThesis: t.rebuildThesis,
    founders: team.map((f) => ({
      id: f.id,
      name: f.name,
      role: f.role,
      xUrl: f.xUrl,
      linkedinUrl: f.linkedinUrl,
    })),
    teardown: {
      overview: t.overview,
      fatalFlaw: t.fatalFlaw,
      rebuildThesis: t.rebuildThesis,
      agentPrompt: t.agentPrompt,
    },
    sections: parse<{ title: string; body: string }[]>(t.sections, []),
    antiPatterns: parse<string[]>(t.antiPatterns, []),
    sources: parse<string[]>(t.sources, []),
  };
}
