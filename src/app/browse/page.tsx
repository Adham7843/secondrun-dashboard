import { getLandingCompanies } from "@/lib/landing";
import BatchList from "@/components/batch-list";
import CategoryList from "@/components/category-list";

export default async function Browse() {
  // PUBLIC sample only: the 30 landing stories. Full vault stays in the dashboard.
  const companies = getLandingCompanies();
  const byBatch = new Map<string, number>();
  for (const c of companies) byBatch.set(c.batch, (byBatch.get(c.batch) ?? 0) + 1);
  const batches = [...byBatch.entries()]
    .map(([batch, count]) => ({ batch, count }))
    .sort((a, b) => b.batch.localeCompare(a.batch));

  const byIndustry = new Map<string, string[]>();
  for (const c of companies) {
    const list = byIndustry.get(c.industry) ?? [];
    if (list.length < 3) list.push(c.name);
    byIndustry.set(c.industry, list);
  }
  const categories = [...byIndustry.entries()]
    .map(([industry, top]) => ({
      industry,
      count: companies.filter((c) => c.industry === industry).length,
      top,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <main style={{ padding: "2rem", maxWidth: 720 }}>
      <h1>Browse</h1>
      <p>Scan the free 30-story sample by batch or category. The full 1,200-record archive lives in the member dashboard.</p>
      <h2>Batches</h2>
      <BatchList batches={batches} />
      <h2>Categories</h2>
      <CategoryList categories={categories} />
    </main>
  );
}
