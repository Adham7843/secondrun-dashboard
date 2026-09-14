import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import landingData from "../data/landing-30.json";
import { getLandingCompanies, getLandingSlugs } from "../src/lib/landing";

const BANNED_FIELDS = ["agentPrompt", "rebuildThesis", "businessModel"];

describe("landing-30 dataset (public, prompt-free)", () => {
  it("contains exactly 30 sample stories", () => {
    expect(landingData).toHaveLength(30);
    expect(getLandingCompanies()).toHaveLength(30);
  });

  it("leads with the 6 curated flagships", () => {
    const slugs = getLandingSlugs();
    for (const s of ["atrium", "fast", "pebble", "scalefactor", "higherme", "rdio"]) {
      expect(slugs).toContain(s);
    }
  });

  it("contains zero prompt/spec fields anywhere in the payload", () => {
    const blob = JSON.stringify(landingData);
    for (const field of BANNED_FIELDS) {
      expect(blob).not.toContain(`"${field}"`);
    }
  });

  it("exposes no prompt fields through the landing lib", () => {
    for (const c of getLandingCompanies()) {
      expect(c).not.toHaveProperty("agentPrompt");
      const td = (c as unknown as Record<string, unknown>).teardown as Record<string, unknown> | null;
      if (td) {
        for (const field of BANNED_FIELDS) {
          expect(td).not.toHaveProperty(field);
        }
      }
    }
  });

  it("every story has the public fields the landing renders", () => {
    for (const c of getLandingCompanies()) {
      expect(c.slug).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.tagline).toBeTruthy();
    }
  });
});

describe("public company pages (story only, prompts paywalled)", () => {
  const src = readFileSync(
    join(__dirname, "..", "src", "app", "company", "[slug]", "page.tsx"),
    "utf8"
  );

  it("never renders prompt suites, exporters, or spec fields", () => {
    for (const token of [
      "PromptSuiteViewer",
      "AgentFileExporter",
      "getMasterDossier",
      "getPromptSuite",
      "agentPrompt",
      "rebuildThesis",
      "businessModel",
    ]) {
      expect(src).not.toContain(token);
    }
  });

  it("routes visitors to pricing/dashboard instead", () => {
    expect(src).toContain('href="/pricing"');
    expect(src).toContain('href="/dashboard"');
  });
});
