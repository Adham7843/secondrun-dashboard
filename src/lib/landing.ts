import landingData from "../../data/landing-30.json";

/**
 * PUBLIC landing dataset: 30 prompt-free company stories.
 *
 * This is the ONLY data source the marketing/landing surface may touch.
 * It contains names + stories (overview, fatal flaw, anti-patterns) and
 * deliberately EXCLUDES all monetizable prompt/spec fields
 * (agentPrompt, rebuildThesis, businessModel).
 *
 * The full 1,200-record vault with prompts lives behind the paywall and is
 * served exclusively from the database to authenticated dashboard users.
 * Never import prisma/db or startups-1200.json into a landing route.
 */

export interface LandingSection {
  title: string;
  body: string;
}

export interface LandingTeardown {
  overview: string;
  fatalFlaw?: string | null;
  antiPatterns?: string[] | null;
  sections?: LandingSection[] | null;
  sources?: string[] | null;
}

export interface LandingFounder {
  name: string;
  role?: string | null;
}

export interface LandingCompany {
  id: string;
  slug: string;
  name: string;
  batch: string;
  status: string;
  tagline: string;
  industry: string;
  location?: string | null;
  foundedYear?: number | null;
  closedYear?: number | null;
  capitalBurned?: string | null;
  fatalFlawSummary?: string | null;
  ycUrl?: string | null;
  websiteUrl?: string | null;
  founders: LandingFounder[];
  teardown: LandingTeardown | null;
}

const companies = landingData as LandingCompany[];

export function getLandingCompanies(): LandingCompany[] {
  return companies;
}

export function getLandingSlugs(): string[] {
  return companies.map((c) => c.slug);
}

export function isLandingSlug(slug: string): boolean {
  return companies.some((c) => c.slug === slug);
}
