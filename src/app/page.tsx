import { getLandingCompanies } from "@/lib/landing";
import SundayDispatchSignup from "@/components/sunday-dispatch-signup";
import CompanyLogo from "@/components/company-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Terminal,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Layers,
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react";

export const revalidate = 3600; // Landing is static: 30 prompt-free stories, rebuilt hourly

export default async function Home() {
  // LANDING dataset only: 30 public stories, zero prompt/spec data.
  // The full 1,200-record vault with rebuild prompts lives exclusively
  // behind the paywall (dashboard, served from the database).
  const flagshipCompanies = getLandingCompanies();

  return (
    <div className="space-y-16 pb-16">
      {/* ---------------------------------------------------------------------- */}
      {/* 1. EDITORIAL MASTHEAD & COMMERCIAL HERO (THE EARNINGS / ROI HOOK)     */}
      {/* ---------------------------------------------------------------------- */}
      <section className="pt-2 sm:pt-4 border-b border-ink-200/80 pb-12">
        <div className="max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-rebuild/30 bg-rebuild/5 text-rebuild font-mono text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>The $650M+ Asymmetric Inversion Opportunity</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.06]">
            1,200 dead startups burned billions proving the market.{" "}
            <span className="italic font-normal text-rebuild block sm:inline">
              You repurpose the demand and profit.
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-ink-700 leading-relaxed font-sans max-w-3xl">
            Get instant access to the <strong>1,200+ dead startup database</strong>: uncover exactly what
            made them fail, avoid their lethal anti-patterns, and learn how <strong>YOU can repurpose their validated
            demand</strong> into an automated, cash-flowing micro-SaaS with $0 payroll.
          </p>

          {/* Key Metric Inversion Tickers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-3.5 bg-white border border-ink-200 rounded-sm">
              <span className="font-mono text-xs text-ink-400 block uppercase">VC Proof Burn</span>
              <strong className="font-display text-xl sm:text-2xl text-ink font-bold block pt-0.5">
                $650M+
              </strong>
              <span className="text-[11px] text-ink-500">Verified market demand</span>
            </div>

            <div className="p-3.5 bg-white border border-ink-200 rounded-sm">
              <span className="font-mono text-xs text-rebuild block uppercase">Cost Inversion</span>
              <strong className="font-display text-xl sm:text-2xl text-rebuild font-bold block pt-0.5">
                25,000x
              </strong>
              <span className="text-[11px] text-ink-500">$10M burn vs. $40/mo stack</span>
            </div>

            <div className="p-3.5 bg-white border border-ink-200 rounded-sm">
              <span className="font-mono text-xs text-ink-400 block uppercase">Gross Margin</span>
              <strong className="font-display text-xl sm:text-2xl text-ink font-bold block pt-0.5">
                90%+
              </strong>
              <span className="text-[11px] text-ink-500">Zero human service staff</span>
            </div>

            <div className="p-3.5 bg-white border border-ink-200 rounded-sm">
              <span className="font-mono text-xs text-ink-400 block uppercase">Sprint to Ship</span>
              <strong className="font-display text-xl sm:text-2xl text-ink font-bold block pt-0.5">
                ~72 Hours
              </strong>
              <span className="text-[11px] text-ink-500">With 5-module directives</span>
            </div>
          </div>
        </div>

        {/* The Commercial Asymmetry Comparison (VC Burn vs. Solo Operator) */}
        <div className="mt-10 p-6 sm:p-8 bg-[#FAF9F6] border border-ink-300 rounded-sm shadow-2xs">
          <div className="max-w-3xl space-y-2 mb-6">
            <span className="font-mono text-xs font-bold text-rebuild uppercase tracking-wider">
              The Forensic Playbook · Why Whoever Buys It Wins
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              The Structural Shift That Makes Dead Startups Cash Flow
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              Every company in our archive proved product-market demand before imploding under the
              weight of venture bloat. Study the math:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white border border-ink-200 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-destructive font-mono text-xs font-bold uppercase">
                <span>The Dead VC Predecessor (Why They Died)</span>
              </div>
              <ul className="text-xs sm:text-[13px] text-ink-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">✕</span>
                  <span>Hired 200–400 employees with $1.5M+/month in salaried payroll.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">✕</span>
                  <span>30 outbound sales reps chasing 9-month enterprise procurement deals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">✕</span>
                  <span>Manual human labor disguised as software, burning $200+ per request.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">✕</span>
                  <span>14-month payback period. Collapsed the instant venture capital froze.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-white border-2 border-rebuild rounded-sm space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-rebuild font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4 text-rebuild" />
                <span>The 2026 SecondRun Operator (Why You Profit)</span>
              </div>
              <ul className="text-xs sm:text-[13px] text-ink-800 space-y-2 leading-relaxed font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-rebuild font-bold">✓</span>
                  <span>1 solo founder + autonomous agent harness. Exactly $0 payroll.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rebuild font-bold">✓</span>
                  <span>100% self-serve checkout. Zero sales reps. 60-second time-to-first-value.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rebuild font-bold">✓</span>
                  <span>Pure deterministic code and serverless edge functions (&lt; $0.05 per run).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rebuild font-bold">✓</span>
                  <span>Day-1 cash flow positive at $49–$149/mo. Instant 90%+ gross margins.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. FREE SAMPLE ARCHIVE (30 PUBLIC STORIES, ZERO PROMPT DATA)            */}
      {/* ---------------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-ink-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] font-mono tracking-widest text-ink-600 uppercase border-ink-300">
                Free Sample Archive
              </Badge>
              <span className="text-xs font-mono text-rebuild font-semibold">100% Free Autopsies</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">
              The Premier Post-Mortem Dossiers
            </h2>
          </div>
          <p className="text-xs font-mono text-ink-500 max-w-sm sm:text-right">
            30 free failure stories. Names, autopsies, fatal flaws — no prompts, no blueprints. Those unlock after purchase.
          </p>
        </div>

        {/* 30 Free Sample Cards (public stories only — prompts stay behind the paywall) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flagshipCompanies.map((company) => {
            const isAcquired = company.status === "ACQUIRED";

            return (
              <Card
                key={company.id}
                className="flex flex-col justify-between border border-ink-200 bg-white hover:border-ink-400 hover:shadow-md transition-all duration-200 group"
              >
                <CardHeader className="p-6 pb-3 space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <CompanyLogo slug={company.slug} name={company.name} size="lg" className="rounded-xs shadow-2xs" />
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <Badge variant="outline" className="text-xs font-mono font-medium">
                        {company.batch}
                      </Badge>
                      <Badge
                        variant={isAcquired ? "acquired" : "inactive"}
                        className="text-xs font-mono uppercase tracking-wider"
                      >
                        {company.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink group-hover:text-rebuild transition-colors">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-ink-500 pt-1">
                      <span>{company.industry}</span>
                      <span>·</span>
                      <span>
                        {company.foundedYear ?? "—"}–{company.closedYear ?? "Acquired"}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between space-y-4">
                  {/* Story-driven explanation of what the product offered */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase text-ink-500 font-bold block tracking-wider">
                      What They Offered
                    </span>
                    <p className="text-sm sm:text-base text-ink-900 leading-relaxed font-serif italic line-clamp-3">
                      &ldquo;{company.tagline}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-ink-100 space-y-3">
                    {/* Capital Burned */}
                    {company.capitalBurned && (
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-ink-700">
                        <Flame className="w-4 h-4 text-destructive shrink-0" />
                        <span>
                          Venture Burn: <strong className="text-ink-900 text-sm sm:text-base">{company.capitalBurned}</strong>
                        </span>
                      </div>
                    )}

                    {/* Fatal Flaw Takeaway */}
                    {company.fatalFlawSummary && (
                      <div className="text-xs sm:text-[13px] text-ink-800 bg-[#FAF9F6] p-3 rounded border border-ink-200/80 leading-relaxed">
                        <strong className="text-destructive font-mono text-xs uppercase block mb-1">
                          Fatal Flaw:
                        </strong>
                        {company.fatalFlawSummary}
                      </div>
                    )}

                    {/* Free Autopsy Button */}
                    <div className="pt-2">
                      <Link
                        href={`/company/${company.slug}`}
                        className="flex items-center justify-between p-2.5 rounded bg-ink-50 hover:bg-ink hover:text-white transition-colors text-sm font-semibold text-ink"
                      >
                        <span>Read Free Full Autopsy</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 3. THE ALL-ACCESS PASS PAYWALL GATE (SELLS THE DATABASE & PROMPTS)    */}
      {/* ---------------------------------------------------------------------- */}
      <section className="p-6 sm:p-10 bg-[#141416] text-ink-100 rounded-sm border-2 border-rebuild shadow-md space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-rebuild text-white font-mono text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3 h-3" />
              <span>Subscriber Intelligence Pass</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
              Access the Full 1,200+ Startup Database &amp; Learn How to Repurpose Them
            </h2>
            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              The 30 stories above are the free public preview. The full SecondRun vault unlocks
              the entire <strong>1,200+ startup database</strong> with a brand-new rebuild blueprint featured
              every single day for <strong>1,200 days</strong>—what made them fail, the lethal mistakes
              to avoid, and the actionable 5-module code prompts to build them 100x leaner and profit this time.
            </p>
          </div>

          <div className="shrink-0 p-6 bg-[#1D1D20] border border-ink-800 rounded-sm text-center sm:text-right space-y-3">
            <span className="font-mono text-xs text-ink-400 uppercase block">Lifetime Access</span>
            <div className="flex items-baseline justify-center sm:justify-end gap-1.5">
              <span className="font-display text-4xl sm:text-5xl font-bold text-white">$49</span>
              <span className="text-xs font-mono text-ink-400">one-time</span>
            </div>
            <p className="text-[11px] font-mono text-ink-400">Zero recurring fees · Instant activation</p>
            <Link href="/pricing" className="block">
              <Button
                variant="primary"
                className="w-full h-11 px-6 text-sm font-semibold shadow-md bg-rebuild hover:bg-rebuild/90 text-white"
              >
                Unlock All-Access ($49) →
              </Button>
            </Link>
          </div>
        </div>

        {/* What Is Unlocked Inside the Subscriber Dashboard */}
        <div className="pt-6 border-t border-ink-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 bg-[#1A1A1D] border border-ink-800 rounded space-y-1">
            <span className="text-rebuild font-bold block">01 · Failure Autopsy Centerpiece</span>
            <span className="text-ink-400 leading-snug block">
              Root failure mechanics, CAC/LTV inversions, anti-patterns, and negative engineering rules.
            </span>
          </div>

          <div className="p-3.5 bg-[#1A1A1D] border border-ink-800 rounded space-y-1">
            <span className="text-rebuild font-bold block">02 · Dark UI Design System</span>
            <span className="text-ink-400 leading-snug block">
              Linear / Modern Dark UI tokens, brand creation mandate, and subscriber command center.
            </span>
          </div>

          <div className="p-3.5 bg-[#1A1A1D] border border-ink-800 rounded space-y-1">
            <span className="text-rebuild font-bold block">03 · 9-Ticket TDD Plan</span>
            <span className="text-ink-400 leading-snug block">
              Sequential atomic tickets with Vitest assertions and negative engineering guardrails.
            </span>
          </div>

          <div className="p-3.5 bg-[#1A1A1D] border border-ink-800 rounded space-y-1">
            <span className="text-rebuild font-bold block">04 · 1,200-Day Daily Rotation</span>
            <span className="text-ink-400 leading-snug block">
              A fresh startup failure autopsy &amp; rebuild blueprint featured every single day for 1,200 days.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-ink-400 pt-2 flex-wrap gap-2">
          <span>✔ Direct routing to Private Console (/dashboard) · Daily Rotation Protocol Active</span>
          <Link href="/dashboard" className="text-rebuild hover:underline font-semibold">
            Preview Subscriber Desk →
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 4. OWNED AUDIENCE NEWSLETTER CAPTURE (SUNDAY DISPATCH)                 */}
      {/* ---------------------------------------------------------------------- */}
      <SundayDispatchSignup />

      {/* ---------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------- */}
      {/* 5. PRIVATE DASHBOARD ROUTING TEASER                                    */}
      {/* ---------------------------------------------------------------------- */}
      <section className="p-8 bg-[#FAF9F6] border border-ink-200 rounded-sm text-center space-y-4 shadow-2xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ink text-white font-mono text-xs uppercase tracking-wider font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Private Subscriber Intelligence Console</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
          The Remaining 1,200+ Startups Live in the Dashboard
        </h2>
        <p className="text-sm sm:text-base text-ink-600 max-w-2xl mx-auto leading-relaxed">
          The 30 teardowns above are our free public proof-of-work. The complete searchable database,
          5-module production code prompts, .cursorrules downloads, and the 60-second social
          distribution desk are reserved for paid subscribers.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/pricing">
            <Button
              variant="primary"
              className="w-full sm:w-auto h-11 px-6 text-sm font-semibold shadow-2xs bg-rebuild hover:bg-rebuild/90 text-white"
            >
              Unlock All 1,200+ Dossiers ($49) →
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-11 px-6 text-sm font-medium bg-white hover:bg-ink-100 border-ink-300"
            >
              Open Member Dashboard →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
