import { prisma } from "@/lib/db";
import Link from "next/link";
import AuthGate from "@/components/auth-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CopyPromptButton from "@/components/copy-prompt-button";
import DashboardArchive from "@/components/dashboard-archive";
import SocialDistributionEngine from "@/components/social-distribution-engine";
import CompanyLogo from "@/components/company-logo";
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Layers,
  Terminal,
} from "lucide-react";

export const revalidate = 0;

export default async function DashboardPage() {
  const companies = await prisma.company.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      batch: true,
      status: true,
      tagline: true,
      industry: true,
      capitalBurned: true,
      fatalFlawSummary: true,
      foundedYear: true,
      closedYear: true,
      teardown: {
        select: {
          overview: true,
          fatalFlaw: true,
          rebuildThesis: true,
          agentPrompt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Pick the lead autopsy of the week (first company)
  const lead = companies[0];

  return (
    <AuthGate>
      <div className="space-y-10 pb-16">
        {/* ---------------------------------------------------------------------- */}
        {/* 1. SUBSCRIBER CLEARANCE & POST-PAYMENT VIP CONFIRMATION BANNER         */}
        {/* ---------------------------------------------------------------------- */}
      <div className="p-6 bg-[#FAF9F6] border-2 border-rebuild rounded-sm shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rebuild text-white font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                All-Access Lifetime Member Clearance Active
              </span>
              <span className="font-mono text-xs text-ink-600">
                Receipt Verified · $49 Pass
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink">
              Subscriber Intelligence Command Console
            </h1>
            <p className="text-xs sm:text-sm text-ink-700 max-w-2xl leading-relaxed">
              Your lifetime pass is active. You have full, unrestricted access to the complete
              1,200+ startup autopsy archive, 5-module autonomous engineering prompt suites,
              and turnkey social distribution tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <a href="#ledger">
              <Button
                variant="primary"
                className="text-xs font-semibold h-10 px-5 shadow-2xs bg-rebuild hover:bg-rebuild/90 text-white"
              >
                Browse Full Ledger ({companies.length.toLocaleString()} Startups) ↓
              </Button>
            </a>
            <a href="#social-engine">
              <Button
                variant="outline"
                className="text-xs font-medium h-10 px-4 bg-white border-ink-300 hover:bg-ink-100"
              >
                Social Distribution Desk ↓
              </Button>
            </a>
          </div>
        </div>

        {/* Platform Vitals Grid */}
        <div className="pt-4 border-t border-ink-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-white border border-ink-200 rounded">
            <span className="text-ink-400 block uppercase text-[10px]">Autopsies Indexed</span>
            <strong className="text-ink text-base sm:text-lg block pt-0.5 font-bold">
              {companies.length.toLocaleString()} Full Files
            </strong>
            <span className="text-[10px] text-rebuild font-semibold">100% Unlocked</span>
          </div>

          <div className="p-3 bg-white border border-ink-200 rounded">
            <span className="text-ink-400 block uppercase text-[10px]">Code Directives</span>
            <strong className="text-ink text-base sm:text-lg block pt-0.5 font-bold">
              {(companies.length * 5).toLocaleString()} Modules
            </strong>
            <span className="text-[10px] text-ink-500">Cursor / Windsurf ready</span>
          </div>

          <div className="p-3 bg-white border border-ink-200 rounded">
            <span className="text-ink-400 block uppercase text-[10px]">Analyzed VC Burn</span>
            <strong className="text-destructive text-base sm:text-lg block pt-0.5 font-bold">
              $14,000,000,000+
            </strong>
            <span className="text-[10px] text-ink-500">Verified market demand</span>
          </div>

          <div className="p-3 bg-white border border-ink-200 rounded">
            <span className="text-ink-400 block uppercase text-[10px]">Rebuild Feasibility</span>
            <strong className="text-rebuild text-base sm:text-lg block pt-0.5 font-bold">
              98 / 100
            </strong>
            <span className="text-[10px] text-ink-500">Solo operator executable</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. THE 3-STEP REBUILD PROTOCOL FOR NEW MEMBERS                        */}
      {/* ---------------------------------------------------------------------- */}
      <section className="p-5 sm:p-6 bg-white border border-ink-200 rounded-sm space-y-4 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase text-rebuild tracking-widest bg-rebuild-light px-2.5 py-0.5 rounded">
            Execution Playbook
          </span>
          <span className="text-xs font-mono text-ink-500">How to ship your first rebuild in 72 hours</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 bg-[#FAF9F6] border border-ink-200/80 rounded space-y-1.5">
            <span className="text-destructive font-bold block text-sm">Step 01 · Select a Venture Corpse</span>
            <p className="text-ink-700 leading-relaxed font-sans text-xs">
              Pick a startup from the ledger below with proven buyer demand and over $10M in burned VC capital.
            </p>
          </div>

          <div className="p-4 bg-[#FAF9F6] border border-ink-200/80 rounded space-y-1.5">
            <span className="text-rebuild font-bold block text-sm">Step 02 · Inject Directives 01 &amp; 03</span>
            <p className="text-ink-700 leading-relaxed font-sans text-xs">
              Paste the Master Schema and AGENTS.md rules into Cursor Composer, Windsurf, or Claude Code.
            </p>
          </div>

          <div className="p-4 bg-[#FAF9F6] border border-ink-200/80 rounded space-y-1.5">
            <span className="text-ink-900 font-bold block text-sm">Step 03 · Execute TDD Tickets 01–09</span>
            <p className="text-ink-700 leading-relaxed font-sans text-xs">
              Let the AI agent sequentially execute the atomic test-driven tickets to stand up a self-serve MVP.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 3. LEAD FORENSIC INVESTIGATION OF THE WEEK                             */}
      {/* ---------------------------------------------------------------------- */}
      {lead && (
        <section className="border border-ink-200 bg-white p-6 sm:p-8 rounded-sm shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-ink-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase text-rebuild tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Featured Forensic Autopsy
              </span>
            </div>
            <span className="text-xs font-mono text-ink-500">
              Batch {lead.batch} · Filed in Master Vault
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Story & Analysis */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <CompanyLogo slug={lead.slug} name={lead.name} size="md" className="rounded-xs shadow-2xs" />
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                    {lead.name}: The Fatal Unit Economics Trap
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-mono text-ink-500 pt-0.5">
                    <span>{lead.industry}</span>
                    <span>·</span>
                    <span>{lead.foundedYear ?? "—"}–{lead.closedYear ?? "Acquired"}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-[15px] text-ink-700 leading-relaxed">
                {lead.teardown?.overview}
              </p>

              {lead.teardown?.fatalFlaw && (
                <div className="p-4 bg-[#FFF8F7] border border-destructive/30 rounded text-xs sm:text-sm text-ink-800 space-y-1">
                  <span className="font-mono font-bold text-destructive flex items-center gap-1 uppercase text-xs">
                    <AlertTriangle className="w-3.5 h-3.5" /> Root Cause of Death:
                  </span>
                  <p className="leading-relaxed font-serif italic">{lead.teardown.fatalFlaw}</p>
                </div>
              )}

              <div className="flex items-center gap-4 text-xs font-mono text-ink-600 pt-1">
                {lead.capitalBurned && (
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-destructive" />
                    Burned: <strong className="text-ink-900">{lead.capitalBurned}</strong>
                  </span>
                )}
                <span>YC Batch: {lead.batch}</span>
              </div>
            </div>

            {/* Right 5 cols: The Rebuild Solution & Instant Prompt */}
            <div className="lg:col-span-5 bg-rebuild-light/50 border border-rebuild/30 p-6 rounded-sm space-y-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-rebuild tracking-wider block mb-1">
                  The SecondRun Pivot
                </span>
                <h3 className="font-display font-bold text-xl text-ink">
                  How to Rebuild Without Sales Headcount
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
                {lead.teardown?.rebuildThesis ??
                  "Rebuild with automated self-serve onboarding to eliminate the high sales rep acquisition cost."}
              </p>

              <div className="space-y-2 pt-2 border-t border-rebuild/20">
                {lead.teardown?.agentPrompt && (
                  <CopyPromptButton
                    promptText={lead.teardown.agentPrompt}
                    companyName={lead.name}
                    className="w-full text-xs font-semibold h-10 shadow-2xs"
                  />
                )}

                <Link href={`/company/${lead.slug}`} className="block">
                  <Button variant="outline" className="w-full text-xs h-9 bg-white border-ink-300">
                    <span>Read Full 3,000-Word Investigation</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 4. 60-SECOND SOCIAL DISTRIBUTION DESK                                  */}
      {/* ---------------------------------------------------------------------- */}
      <section id="social-engine">
        <SocialDistributionEngine
          companies={companies.map((c) => ({
            name: c.name,
            slug: c.slug,
            capitalBurned: c.capitalBurned,
            fatalFlaw: c.teardown?.fatalFlaw,
            rebuildThesis: c.teardown?.rebuildThesis,
            closedYear: c.closedYear,
            industry: c.industry,
          }))}
        />
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 5. THE COMPLETE GRAVEYARD WIRE & DOSSIER LEDGER                        */}
      {/* ---------------------------------------------------------------------- */}
      <section id="ledger" className="space-y-4 pt-2">
        <div className="flex items-baseline justify-between border-b border-ink-200 pb-3">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
              The Graveyard Wire &amp; Dossier Ledger
            </h2>
            <p className="text-xs sm:text-sm font-mono text-ink-500 mt-0.5">
              All {companies.length} historical startup post-mortems and 5-module rebuild specifications.
            </p>
          </div>
          <span className="text-xs font-mono text-rebuild font-bold">
            ✔ Full Member Access
          </span>
        </div>

        <DashboardArchive companies={companies} />
      </section>
    </div>
    </AuthGate>
  );
}
