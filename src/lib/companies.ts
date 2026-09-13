export function slug(name: string): string {
  return name
    .replace(/\s*\(.*?\)\s*/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function statusBadge(status: string): string {
  if (status === "INACTIVE") return "Inactive";
  if (status === "ACQUIRED") return "Acquired";
  return "Active";
}

const SAAS_TAGS = new Set(["saas", "developer-tools", "ai", "artificial-intelligence", "generative-ai"]);
const SAAS_INDUSTRIES = new Set(["B2B", "Productivity", "Marketing", "Sales", "Fintech"]);

export function saasSlice<T extends { industry: string; tags: string[] }>(rows: T[]): T[] {
  return rows.filter((r) => SAAS_INDUSTRIES.has(r.industry) || r.tags.some((t) => SAAS_TAGS.has(t)));
}

export function tocFromSections(sections: string[]): { title: string; anchor: string }[] {
  return sections.map((title) => ({ title, anchor: slug(title) }));
}

export function previewCut(text: string, chars: number): string {
  if (text.length <= chars) return text;
  const cut = text.slice(0, chars);
  if (text[chars] === " ") return cut;
  const lastSpace = cut.lastIndexOf(" ");
  return lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
}
