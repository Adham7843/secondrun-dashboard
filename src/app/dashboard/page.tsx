import { getVaultLedger, promptFor } from "@/lib/vault-db";
import { sessionEmail } from "@/lib/access";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CopyPromptButton from "@/components/copy-prompt-button";
import DashboardArchive from "@/components/dashboard-archive";
import SocialDistributionEngine from "@/components/social-distribution-engine";
import CompanyLogo from "@/components/company-logo";
import {
  Flame,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Calendar,
  Layers,
} from "lucide-react";

export const revalidate = 0;

export default async function DashboardPage() {
  // SERVER GATE: no session → signin. Prompt data never renders for strangers.
  const member = await sessionEmail(headers().get("cookie"));
  if (!member) redirect("/signin");

  // VAULT: full 1,200 ledger (light fields) from D1.
  const companies = await getVaultLedger();

  // Daily Rotation Protocol: 1 fresh venture rebuild featured every day across all 1,200 startups
  const now = new Date();
  const startEpoch = new Date("2026-01-01").getTime();
  const dayNumber = Math.max(1, Math.floor((now.getTime() - startEpoch) / (1000 * 60 * 60 * 24)) + 1);
  const featuredIndex = ((dayNumber - 1) % companies.length + companies.length) % companies.length;
  const dailyFeatured = companies[featuredIndex] || companies[0];
  // Single-company prompt fetch: the ledger carries light fields only (CPU budget).
  const featuredPrompt = dailyFeatured ? await promptFor(dailyFeatured.slug) : null;

  return (
    <div className="space-y-6">
      {/* Member session bar (server-verified) */}
      <div className="bg-[#18181B] text-ink-100 px-4 py-2.5 rounded-sm border border-ink-800 flex items-center justify-between gap-2 text-xs font-mono">
        <span className="text-emerald-400 font-bold">LIFETIME MEMBER PASS ACTIVE · {member}</span>
        <span>1,200+ startups unlocked</span>
      </div>
      <div className="space-y-10 pb-16">
        {/* ---------------------------------------------------------------------- */}
        {/* 1. CLEAN HEADER & 1,200-DAY ROTATION PROTOCOL                          */}
        {/* ---------------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-ink-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-[11px] font-mono tracking-wider text-ink-700 uppercase border-ink-300 bg-white">
                <Calendar className="w-3 h-3 mr-1 inline text-rebuild" />
                Day #{dayNumber} of {companies.length.toLocaleString()}
              </Badge>
              <span className="text-xs font-mono text-rebuild font-bold">
                Daily Rotation Protocol Active
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink">
              The 1,200 Graveyard Archive
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-500 max-w-md sm:text-right leading-relaxed">
            1 fresh venture failure autopsy &amp; rebuild blueprint featured every single day for 1,200 days.
          </p>
        </div>

        {/* ---------------------------------------------------------------------- */}
        {/* 2. TODAY'S FEATURED REBUILD (ROTATES DAILY FOR 1,200 DAYS)              */}
        {/* ---------------------------------------------------------------------- */}
        {dailyFeatured && (
          <section className="border-2 border-rebuild/40 bg-white p-4 sm:p-7 rounded-sm shadow-sm space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-ink-200 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase text-rebuild tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Autopsy of the Day
                </span>
                <span className="text-xs font-mono text-ink-400">·</span>
                <span className="text-xs font-mono text-ink-600 font-semibold">
                  Rotation #{dayNumber}
                </span>
              </div>
              <span className="text-xs font-mono text-ink-500">
                Batch {dailyFeatured.batch} · Filed in Master Vault
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left 7 cols: Story & Failure Breakdown */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3.5">
                  <CompanyLogo slug={dailyFeatured.slug} name={dailyFeatured.name} size="lg" className="rounded-xs shadow-2xs shrink-0" />
                  <div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                      {dailyFeatured.name}
                    </h2>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-ink-500 pt-0.5 flex-wrap">
                      <span>{dailyFeatured.industry}</span>
                      <span>·</span>
                      <span>{dailyFeatured.foundedYear ?? "—"}–{dailyFeatured.closedYear ?? "Acquired"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase text-ink-400 font-bold block tracking-wider">
                    Original Value Proposition
                  </span>
                  <p className="text-sm sm:text-base text-ink-900 leading-relaxed font-serif italic">
                    &ldquo;{dailyFeatured.tagline}&rdquo;
                  </p>
                </div>

                {dailyFeatured.fatalFlaw && (
                  <div className="p-3.5 sm:p-4 bg-[#FFF8F7] border border-destructive/30 rounded text-xs sm:text-sm text-ink-800 space-y-1">
                    <span className="font-mono font-bold text-destructive flex items-center gap-1 uppercase text-xs">
                      <AlertTriangle className="w-3.5 h-3.5" /> Fatal Flaw Breakdown:
                    </span>
                    <p className="leading-relaxed font-serif italic">{dailyFeatured.fatalFlaw}</p>
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs font-mono text-ink-600 pt-1 flex-wrap">
                  {dailyFeatured.capitalBurned && (
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-destructive" />
                      Burned: <strong className="text-ink-900">{dailyFeatured.capitalBurned}</strong>
                    </span>
                  )}
                  <span>YC Batch: {dailyFeatured.batch}</span>
                </div>
              </div>

              {/* Right 5 cols: The Lean Pivot & Directives */}
              <div className="lg:col-span-5 bg-rebuild-light/50 border border-rebuild/30 p-4 sm:p-6 rounded-sm space-y-4">
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-rebuild tracking-wider block mb-1">
                    The SecondRun Counter-Strategy
                  </span>
                  <h3 className="font-display font-bold text-xl text-ink">
                    How to Repurpose &amp; Profit
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
                  {dailyFeatured.rebuildThesis ??
                    "Rebuild as a 100% automated self-serve micro-SaaS with sub-5-cent compute transactions and zero sales headcount."}
                </p>

                <div className="space-y-2 pt-2 border-t border-rebuild/20">
                  {featuredPrompt?.agentPrompt && (
                    <CopyPromptButton
                      promptText={featuredPrompt.agentPrompt}
                      companyName={dailyFeatured.name}
                      className="w-full text-xs font-semibold h-10 shadow-2xs"
                    />
                  )}

                  <Link href={`/company/${dailyFeatured.slug}`} className="block">
                    <Button variant="outline" className="w-full text-xs h-9 bg-white border-ink-300">
                      <span>Inspect Full Forensic Autopsy</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* 3. THE 1,200 STARTUP ARCHIVE (BOXES DEFAULT + LIST TOGGLE)              */}
        {/* ---------------------------------------------------------------------- */}
        <section id="ledger" className="space-y-4 pt-2">
          <DashboardArchive companies={companies} />
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* 4. 60-SECOND SOCIAL DISTRIBUTION DESK                                  */}
        {/* ---------------------------------------------------------------------- */}
        <section id="social-engine">
          <SocialDistributionEngine
            companies={companies.map((c) => ({
              name: c.name,
              slug: c.slug,
              capitalBurned: c.capitalBurned,
              fatalFlaw: c.fatalFlaw,
              rebuildThesis: c.rebuildThesis,
              closedYear: c.closedYear,
              industry: c.industry,
            }))}
          />
        </section>
      </div>
    </div>
  );
}
