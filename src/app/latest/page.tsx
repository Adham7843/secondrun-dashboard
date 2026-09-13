import { prisma } from "@/lib/db";
import CompanyCard from "@/components/company-card";

export default async function Latest() {
  const companies = await prisma.company.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main style={{ padding: "2rem", maxWidth: 720 }}>
      <h1>Latest Reports</h1>
      <p>Freshly researched startups with full post-mortems and rebuild plans.</p>
      {companies.map((c) => (
        <CompanyCard key={c.slug} company={c} />
      ))}
    </main>
  );
}
