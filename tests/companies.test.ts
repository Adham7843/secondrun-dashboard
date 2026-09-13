import { describe, expect, it } from "vitest";
import { previewCut, saasSlice, slug, statusBadge, tocFromSections } from "../src/lib/companies";

describe("slug", () => {
  it("lowercases and hyphenates", () => {
    expect(slug("A Thinking Ape")).toBe("a-thinking-ape");
  });
  it("strips parens content", () => {
    expect(slug("Accept.inc (formerly BoardRE)")).toBe("accept-inc");
  });
});

describe("statusBadge", () => {
  it("maps INACTIVE", () => {
    expect(statusBadge("INACTIVE")).toBe("Inactive");
  });
  it("maps ACQUIRED", () => {
    expect(statusBadge("ACQUIRED")).toBe("Acquired");
  });
});

describe("saasSlice", () => {
  const rows = [
    { industry: "B2B", tags: ["saas"] },
    { industry: "Fintech", tags: ["payments"] },
    { industry: "Consumer", tags: ["marketplace"] },
  ];
  it("keeps SaaS-set rows only", () => {
    expect(saasSlice(rows)).toHaveLength(2);
  });
});

describe("tocFromSections", () => {
  it("builds anchors from h2 titles", () => {
    expect(tocFromSections(["Overview", "Post-Mortem"])).toEqual([
      { title: "Overview", anchor: "overview" },
      { title: "Post-Mortem", anchor: "post-mortem" },
    ]);
  });
});

describe("previewCut", () => {
  it("cuts at char limit without breaking words", () => {
    expect(previewCut("aaa bbb ccc", 7)).toBe("aaa bbb");
  });
});
