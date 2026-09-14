import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// VAULT D1 schema mirror. Public story columns live on companies/founders;
// monetizable prompt/spec columns live ONLY on teardowns_pro and must never
// be selected for unauthenticated callers.

export const companies = sqliteTable("companies", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  batch: text("batch").notNull(),
  status: text("status").notNull(),
  tagline: text("tagline").notNull(),
  industry: text("industry").notNull(),
  location: text("location"),
  foundedYear: integer("foundedYear"),
  closedYear: integer("closedYear"),
  capitalBurned: text("capitalBurned"),
  fatalFlawSummary: text("fatalFlawSummary"),
  logoUrl: text("logoUrl"),
  ycUrl: text("ycUrl"),
  websiteUrl: text("websiteUrl"),
  createdAt: text("createdAt").notNull(),
});

export const founders = sqliteTable("founders", {
  id: text("id").primaryKey(),
  companyId: text("companyId").notNull(),
  name: text("name").notNull(),
  role: text("role"),
  xUrl: text("xUrl"),
  linkedinUrl: text("linkedinUrl"),
});

export const teardownsPro = sqliteTable("teardowns_pro", {
  companyId: text("companyId").primaryKey(),
  overview: text("overview").notNull(),
  fatalFlaw: text("fatalFlaw"),
  antiPatterns: text("antiPatterns"),
  sections: text("sections").notNull(),
  rebuildThesis: text("rebuildThesis"),
  businessModel: text("businessModel"),
  agentPrompt: text("agentPrompt"),
  sources: text("sources").notNull(),
});
