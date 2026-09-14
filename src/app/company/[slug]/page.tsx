import { redirect } from "next/navigation";
import Link from "next/link";
import CompanyLogo from "@/components/company-logo";
import { getLandingCompanies } from "@/lib/landing";

export const revalidate = 3600; // Public dossiers are static: story only, no DB

export function generateStaticParams() {
  return getLandingCompanies().map((c) => ({ slug: c.slug }));
}

export default async function CompanyPage({
  params,
}: {
  params: { slug: string };
}) {
  // PUBLIC dossier: the 30 free stories from the static landing dataset.
  // Any other slug lives exclusively in the member vault → send to pricing.
  const company = getLandingCompanies().find((c) => c.slug === params.slug);

  if (!company || !company.teardown) redirect("/pricing");

  const isAcquired = company.status === "ACQUIRED";

  const sections = company.teardown.sections ?? [];
  const sources = company.teardown.sources ?? [];
  const antiPatterns = company.teardown.antiPatterns ?? [];

  // Prompt/spec data (rebuild thesis, agent prompts, blueprints) is NEVER
  // loaded here -- it lives exclusively behind the paywall in the dashboard.

  // Domain suggestions
  const originalDomain =
    company.websiteUrl?.replace("https://", "").replace("http://", "").replace(/\/$/, "") ||
    `${company.slug}.com`;
  const domainSuggestions = [
    `use${company.slug}.com`,
    `get${company.slug}.app`,
    `${company.slug}os.com`,
  ];
  const waybackUrl = `https://web.archive.org/web/*/${originalDomain}`;

  return (
    <article className="w-full space-y-8 py-2">
      {/* Top Editorial Dateline & Back Navigation */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-500 pb-2 border-b border-ink-200/70">
        <Link
          href="/"
          className="inline-flex items-center hover:text-ink transition-colors"
        >
          ← Graveyard Archive
        </Link>
        <span className="uppercase tracking-widest text-[11px] text-ink-400">
          Morgue File · {company.batch} · {company.industry}
        </span>
      </div>

      {/* Newsletter Header: Title, Lede, and Dateline Positioned Top-Left */}
      <header className="space-y-3">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <CompanyLogo slug={company.slug} name={company.name} size="lg" className="rounded-sm shadow-2xs" />
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight">
            {company.name}
          </h1>
        </div>
        <p className="font-serif text-xl sm:text-2xl text-ink-600 italic leading-relaxed max-w-4xl">
          {company.tagline}
        </p>

        {/* Dense, calm horizontal byline strip */}
        <div className="py-2.5 border-y border-ink-200/80 font-mono text-xs sm:text-sm text-ink-600 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span>
            <strong className="text-ink-900">Capital Burned:</strong>{" "}
            {company.capitalBurned || "Confidential"}
          </span>
          <span>·</span>
          <span>
            <strong className="text-ink-900">Lifespan:</strong>{" "}
            {company.foundedYear ?? "—"}–{company.closedYear ?? "Acquired"}
          </span>
          <span>·</span>
          <span
            className={
              isAcquired
                ? "text-[#B7791F] font-semibold uppercase"
                : "text-destructive font-semibold uppercase"
            }
          >
            {company.status}
          </span>
          <span>·</span>
          <span>
            <strong className="text-rebuild font-semibold">Rebuild Feasibility:</strong> 96 / 100
          </span>
          <span>·</span>
          <span>
            <strong className="text-ink-800">Sprint:</strong> ~48h in Cursor
          </span>
        </div>

        {/* Public note: full rebuild blueprints unlock with the All-Access Pass */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-rebuild text-white font-semibold hover:bg-rebuild/90 transition-colors"
          >
            Unlock the 5 rebuild blueprints ($49) →
          </Link>
          <Link href="/dashboard" className="text-rebuild hover:underline font-semibold">
            Member sign in →
          </Link>
        </div>
      </header>

      {/* Main Full-Width Broadsheet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full pt-2">
        {/* Main Narrative Column on the Left (Dense & Continuous) */}
        <div className="lg:col-span-8 space-y-10">
          {/* CHAPTER I: THE AUTOPSY */}
          <section className="space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
              The Rise, Promise, and Market Reality
            </h2>
            <div className="font-sans text-[15px] sm:text-base text-ink-800 leading-relaxed space-y-3">
              <p className="font-serif text-lg sm:text-xl text-ink-900 italic border-l-2 border-ink-300 pl-4 leading-relaxed">
                {company.name} entered the market with extraordinary promise, raising{" "}
                <strong>{company.capitalBurned || "substantial venture backing"}</strong> from top-tier
                investors. But underlying this aggressive expansion was a fatal structural flaw.
              </p>
              <p>{company.teardown.overview}</p>
            </div>
          </section>

          {/* CHAPTER II: THE FATAL TERMINAL BOTTLENECK */}
          <section className="space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
              The Fatal Terminal Bottleneck
            </h2>

            {company.teardown.fatalFlaw && (
              <blockquote className="border-l-2 border-destructive pl-4 my-3 font-serif text-base sm:text-lg text-ink-900 italic leading-relaxed">
                &ldquo;{company.teardown.fatalFlaw}&rdquo;
              </blockquote>
            )}

            {antiPatterns.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <h3 className="font-display font-bold text-lg sm:text-xl text-ink">
                  Fatal Anti-Patterns That Burned Capital
                </h3>
                <div className="space-y-2.5">
                  {antiPatterns.map((ap, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-ink-800 leading-relaxed">
                      <span className="font-mono font-bold text-destructive text-sm sm:text-base shrink-0 pt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{ap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* CHAPTER III: CHRONOLOGY OF A COLLAPSE */}
          {sections.length > 0 && (
            <section className="space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                Chronology of a Collapse
              </h2>

              <div className="space-y-5">
                {sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                      {sec.title}
                    </h3>
                    <div className="font-sans text-[15px] sm:text-base text-ink-800 leading-relaxed whitespace-pre-line">
                      {sec.body}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* THE MID-ARTICLE CONVERSION BRIDGE (PAS FRAMEWORK) */}
          <div className="p-5 sm:p-6 bg-white border-l-4 border-rebuild shadow-2xs space-y-2.5 my-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase font-bold text-rebuild tracking-widest bg-rebuild-light px-2 py-0.5 rounded">
                The Architect&apos;s Dilemma
              </span>
            </div>
            <p className="font-serif italic text-ink-900 text-base sm:text-lg leading-snug">
              Why spend 6 months brainstorming an unvalidated startup from scratch when {company.name} already spent {company.capitalBurned || "millions"} proving that real customer demand exists?
            </p>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans">
              The opportunity is not inventing new speculative markets—it is taking proven multi-million dollar software demand and executing it with zero human payroll. If you want to skip straight to the production code and negative engineering rules, our 5-module specification suite is waiting in Chapter V.
            </p>
            <div className="pt-1">
              <a href="#engineering-specs" className="text-xs sm:text-sm font-mono font-bold text-rebuild hover:underline inline-flex items-center gap-1">
                Jump straight to Chapter V: The 5 Rebuild Specifications ↓
              </a>
            </div>
          </div>

          {/* CHAPTER IV: THE CIRCUMVENTION BLUEPRINT */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
              Routing Around {company.name}&apos;s Fatal Bottleneck
            </h2>

            {/* Locked Pivot Thesis (paywalled — story ends here for visitors) */}
            <div className="p-4 bg-rebuild-light/40 border-l-2 border-rebuild text-sm sm:text-base text-ink-800 leading-relaxed">
              <strong className="font-semibold text-rebuild block mb-1 font-mono text-xs sm:text-sm uppercase">
                The Lean Pivot Thesis — Locked
              </strong>
              <p className="text-sm text-ink-700">
                The full counter-strategy for {company.name} — architecture,
                cost-inversion plan, and go-to-market wedge — is reserved for
                All-Access members.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 mt-2 text-sm font-mono font-bold text-rebuild hover:underline"
              >
                Unlock the full thesis + 5 rebuild blueprints ($49) →
              </Link>
            </div>

            {/* Cost Inversion Comparison Table */}
            <div className="space-y-2 pt-1">
              <h3 className="font-display font-bold text-lg sm:text-xl text-ink">
                Then vs. Now: The 25,000x Cost Inversion
              </h3>
              <div className="border border-ink-200 rounded overflow-hidden text-xs sm:text-sm font-mono">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF9F6] text-xs uppercase text-ink-600 border-b border-ink-200">
                    <tr>
                      <th className="p-3">Operating Layer</th>
                      <th className="p-3">Original {company.name}</th>
                      <th className="p-3 text-rebuild font-bold">2026 Rebuild</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100 text-ink-800 bg-white">
                    <tr>
                      <td className="p-3 font-semibold">Service Workforce</td>
                      <td className="p-3 text-destructive">Salaried Specialists (~$1.2M / mo)</td>
                      <td className="p-3 text-rebuild font-semibold">100% LLM Engine ($0 / mo)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Customer Acquisition</td>
                      <td className="p-3 text-destructive">Sales Reps &amp; Demos (CAC &gt; $3,500)</td>
                      <td className="p-3 text-rebuild font-semibold">Product-Led SEO (CAC &lt; $20)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Infrastructure</td>
                      <td className="p-3 text-destructive">Heavy Monolith Servers ($45,000 / mo)</td>
                      <td className="p-3 text-rebuild font-semibold">Serverless Edge (&lt; $25 / mo)</td>
                    </tr>
                    <tr className="bg-[#FAF9F6] font-bold">
                      <td className="p-3">Monthly Fixed Burn</td>
                      <td className="p-3 text-destructive">$1,260,000 / month</td>
                      <td className="p-3 text-rebuild">&lt; $50 / month (96% Margin)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* CHAPTER V: LOCKED SPECIFICATION SUITE (paywall — no prompt data rendered) */}
          <section id="engineering-specs" className="space-y-4 pt-2">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
              The Anti-Death Engineering Specifications
            </h2>
            <div className="p-6 sm:p-8 bg-[#141416] text-ink-100 rounded-sm border-2 border-rebuild space-y-4 text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-rebuild">
                Locked — All-Access Members Only
              </p>
              <p className="text-sm sm:text-base text-ink-300 leading-relaxed max-w-xl mx-auto">
                The 5 production prompt modules for <strong className="text-white">{company.name}</strong> —
                forensic master blueprint, dark UI design system, agent directives,
                TDD implementation tickets, and the zero-sales GTM playbook — unlock
                with the Lifetime Pass.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 px-5 py-2.5 rounded bg-rebuild text-white text-sm font-semibold hover:bg-rebuild/90 transition-colors"
                >
                  Unlock All 5 Blueprints ($49) →
                </Link>
                <Link href="/dashboard" className="text-sm font-mono text-rebuild hover:underline font-semibold">
                  Member sign in →
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Supporting Marginalia Column on the Right */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 space-y-6 text-xs sm:text-sm font-mono text-ink-600">
            {/* Quick Context Summary */}
            <div className="p-4 bg-[#FAF9F6] border border-ink-200/80 rounded space-y-3">
              <span className="font-bold text-ink-900 uppercase block text-xs tracking-wider">
                Morgue Dossier Metadata
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-ink-200/60 pb-1">
                  <span className="text-ink-400">BATCH</span>
                  <span className="font-semibold text-ink-800">{company.batch}</span>
                </div>
                <div className="flex justify-between border-b border-ink-200/60 pb-1">
                  <span className="text-ink-400">HEADQUARTERS</span>
                  <span className="font-semibold text-ink-800">{company.location || "United States"}</span>
                </div>
                <div className="flex justify-between border-b border-ink-200/60 pb-1">
                  <span className="text-ink-400">ACTIVE TIMELINE</span>
                  <span className="font-semibold text-ink-800">
                    {company.foundedYear ?? "—"} – {company.closedYear ?? "Acquired"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-ink-200/60 pb-1">
                  <span className="text-ink-400">STATUS</span>
                  <span className="font-semibold text-ink-800">{company.status}</span>
                </div>
                {company.ycUrl && (
                  <div className="flex justify-between pt-0.5">
                    <span className="text-ink-400">DIRECTORY</span>
                    <a
                      href={company.ycUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-rebuild hover:underline font-semibold"
                    >
                      {company.ycUrl.includes("ycombinator.com")
                        ? "YC Profile →"
                        : company.ycUrl.includes("crunchbase.com")
                        ? "Crunchbase Record →"
                        : company.ycUrl.includes("wikipedia.org")
                        ? "Public Archive →"
                        : "Verified Filing →"}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Founding Team & Governance */}
            {company.founders.length > 0 && (
              <div className="p-4 bg-white border border-ink-200/80 rounded space-y-2">
                <span className="font-bold text-ink-900 uppercase block text-xs tracking-wider">
                  Founding Team &amp; Governance
                </span>
                <div className="space-y-2 text-xs">
                  {company.founders.map((f) => (
                    <div key={f.name} className="border-b border-ink-100 pb-1.5 last:border-0 last:pb-0">
                      <strong className="text-ink-900 block font-sans text-xs sm:text-sm">{f.name}</strong>
                      <span className="text-ink-500 text-xs">{f.role || "Founder"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Domain Reclamation */}
            <div className="p-4 bg-[#FAF9F6] border border-ink-200/80 rounded space-y-2">
              <span className="font-bold text-ink-900 uppercase block text-xs tracking-wider">
                Domain &amp; Archive Reclamation
              </span>
              <p className="text-xs text-ink-600 leading-relaxed">
                Original domain (<strong>{originalDomain}</strong>) is archived on the{" "}
                <a
                  href={waybackUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-rebuild underline font-semibold"
                >
                  Wayback Machine
                </a>
                . Clean alternative domains available:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {domainSuggestions.map((d, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-white border border-ink-200 rounded text-ink-800 text-xs font-semibold"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Sources */}
            {sources.length > 0 && (
              <div className="p-4 bg-white border border-ink-200/80 rounded space-y-1.5 text-xs">
                <span className="font-bold text-ink-900 uppercase block text-xs tracking-wider">
                  Public Archive References
                </span>
                <ul className="list-disc pl-3.5 space-y-1 text-ink-500">
                  {sources.map((src, i) => (
                    <li key={i} className="truncate">
                      <a
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-rebuild underline"
                      >
                        {src}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Legal Notice */}
            <p className="text-[11px] text-ink-500 p-2 leading-relaxed">
              Published under Fair Use (17 U.S.C. § 107) for architectural critique and software engineering research.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
