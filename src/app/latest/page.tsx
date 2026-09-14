import { getLandingCompanies } from "@/lib/landing";
import CompanyCard from "@/components/company-card";

export default async function Latest() {
  // PUBLIC sample only: the 30 landing stories. Full vault stays in the dashboard.
  const companies = getLandingCompanies();
  return (
    <main style={{ padding: "2rem", maxWidth: 720 }}>
      <h1>Latest Reports</h1>
      <p>Free sample stories with full post-mortems. Rebuild blueprints unlock with the All-Access Pass.</p>
      {companies.map((c) => (
        <CompanyCard key={c.slug} company={c} />
      ))}
    </main>
  );
}
