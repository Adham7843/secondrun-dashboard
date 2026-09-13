import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "The Second Run Dispatch — Archival Broadsheet Edition",
  description: "A pure newsprint broadsheet concept inspired by classic journalism and the vault design system.",
};

export default function NewspaperPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F7] text-[#111111] selection:bg-[#991B1B] selection:text-white py-6 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto border-x border-[#111111] px-4 sm:px-8 py-6 bg-[#F9F9F7] shadow-xs">
        {/* TOP BULLETIN TICKER */}
        <div className="border-b border-[#111111] pb-2 mb-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#111111]">
          <div className="flex items-center gap-3">
            <span className="bg-[#991B1B] text-white px-2 py-0.5 font-bold">
              BULLETIN
            </span>
            <span className="hidden sm:inline">
              MORTALITY DISPATCH · 1,200+ AUTOPSIES FILED · DAILY RESURRECTION DIRECTIVES
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#991B1B] font-bold">PRICE: $49 LIFETIME</span>
            <span>NO REFUNDS</span>
          </div>
        </div>

        {/* AUTHENTIC BROADSHEET MASTHEAD */}
        <header className="border-t-4 border-b-2 border-[#111111] py-4 text-center">
          {/* Metadata Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono uppercase tracking-widest border-b border-[#111111] pb-2 mb-3 gap-2">
            <span>VOL. CXXIV · NO. 42</span>
            <span className="font-serif italic capitalize text-sm tracking-normal text-ink-700">
              "The Journal of Post-Mortem Enterprise &amp; Autonomous Resurrection"
            </span>
            <span>CIRCULATION: GLOBAL DIGITAL VAULT</span>
          </div>

          {/* Main Title Wordmark */}
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tighter leading-none py-2 text-[#111111]">
            THE SECOND RUN
          </h1>

          {/* Sub-Masthead Dateline */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono uppercase tracking-widest border-t border-[#111111] pt-2 mt-3 gap-2">
            <span>NEW YORK, LONDON &amp; SAN FRANCISCO</span>
            <span className="text-[#991B1B] font-bold">SPECIAL POST-MORTEM DOSSIER</span>
            <span>SUNDAY EDITION · SEPTEMBER 2026</span>
          </div>
        </header>

        {/* SECTION NAV / EDITION BAR */}
        <nav className="border-b border-[#111111] py-2 flex items-center justify-between text-xs font-mono uppercase tracking-wider overflow-x-auto whitespace-nowrap gap-4">
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-[#991B1B] font-bold transition-colors">
              [ FRONT PAGE ]
            </Link>
            <Link href="/browse" className="hover:text-[#991B1B] transition-colors">
              THE MORGUE (1,200)
            </Link>
            <Link href="/latest" className="hover:text-[#991B1B] transition-colors">
              RECENT CASUALTIES
            </Link>
            <Link href="/pricing" className="hover:text-[#991B1B] transition-colors text-[#991B1B] font-semibold">
              SUBSCRIBE ($49 ALL-ACCESS)
            </Link>
          </div>
          <div className="text-[11px] text-ink-600 hidden md:block">
            WEATHER: STORMY FOR VC MONOLITHS · HIGH CLARITY FOR LEAN BUILDERS
          </div>
        </nav>

        {/* MAIN BROADSHEET 12-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 pt-6 border-b border-[#111111]">
          {/* PRIMARY INVESTIGATIVE ARTICLE (8 COLS) */}
          <article className="lg:col-span-8 lg:border-r border-[#111111] lg:pr-8 pb-8 space-y-6">
            {/* Kicker / Category */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#991B1B] font-bold">
              <span>SPECIAL INQUIRY</span>
              <span>·</span>
              <span>FORENSIC AUTOPSY NO. 049</span>
            </div>

            {/* Massive Headline */}
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#111111] leading-[0.95] tracking-tight">
              HOW ATRIUM BURNED $75.5M TRYING TO SUBSIDIZE BILLABLE LAWYERS
            </h2>

            {/* Deck / Sub-headline */}
            <p className="font-serif text-lg sm:text-xl text-ink-800 leading-snug italic border-l-2 border-[#991B1B] pl-4">
              Justin Kan raised $75.5 million from Andreessen Horowitz to automate the legal industry. 
              Instead, they built a boutique law firm with an iPad in the lobby and a fatal $1.2 million monthly overhead burn.
            </p>

            {/* Byline & Dateline */}
            <div className="flex items-center justify-between text-xs font-mono text-ink-600 border-y border-ink-200 py-2">
              <span>BY CHIEF FORENSIC CORRESPONDENT</span>
              <span>SAN FRANCISCO BUREAU · 11 MIN READ</span>
            </div>

            {/* 2-Column Newspaper Body Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14.5px] leading-relaxed font-serif text-ink-900 text-justify">
              <div className="space-y-4">
                <p>
                  <span className="float-left font-serif text-6xl leading-[0.8] pr-3 pt-1 font-bold text-[#991B1B]">
                    W
                  </span>
                  hen Atrium launched in 2017, Silicon Valley hailed it as the inevitable reckoning for high-priced corporate law. 
                  Armed with $75.5 million in institutional capital from Andreessen Horowitz, Founders Fund, and General Catalyst, Justin Kan promised 
                  founders an automated, transparent legal machine that would commoditize incorporation, SAFEs, and Series A term sheets.
                </p>
                <p>
                  The premise was seductively logical: startup founders loathe billable hours, and corporate paralegals spend 80% of their days 
                  copy-pasting boilerplates into state registry filings. Software should have eaten this margin for breakfast.
                </p>
                <p>
                  Yet by March 2020, Kan summoned 100 employees to a sudden all-hands meeting and shut the operation down, returning what remained of the 
                  capital. The post-mortem consensus was unanimous: Atrium never built a software platform. It had merely disguised an expensive, 
                  bespoke law firm behind a Silicon Valley SaaS marketing veneer.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  The terminal bottleneck was architectural and structural. By attempting to deliver both the software tooling and the actual licensed 
                  legal representation under one umbrella, Atrium trapped itself in California&apos;s strict Bar association regulations.
                </p>
                <p>
                  Because non-lawyers cannot legally own a law firm, Atrium was forced to maintain two separate corporate entities: a technology company 
                  and a licensed law firm. Every customer acquired required a dedicated human partner, human associates, and human billing negotiations.
                </p>
                <p>
                  The moment their customer count surged past 400 startups, their customer acquisition cost exploded past $3,500 per logo, while internal 
                  attorney payroll devoured $1,260,000 every single month. They had recreated the exact cost disease they set out to eliminate.
                </p>
              </div>
            </div>

            {/* PULL QUOTE WITH DOUBLE HAIRLINE RULES */}
            <div className="border-y-2 border-[#111111] py-5 px-6 my-6 text-center">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#111111] leading-snug">
                &ldquo;They didn&apos;t build a software company. They built a massively bloated law firm with high-end Herman Miller chairs and a venture cap table.&rdquo;
              </blockquote>
              <cite className="block font-mono text-xs uppercase tracking-widest text-[#991B1B] font-bold mt-2">
                — Former Atrium Senior Associate, 2020
              </cite>
            </div>

            {/* FIGURE 1.0: THE COST INVERSION TABLE */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase">
                <span className="font-bold text-[#111111]">FIGURE 1.0 · OPERATING COST INVERSION</span>
                <span className="text-[#991B1B] font-bold">25,000X LEVERAGE</span>
              </div>

              <div className="border border-[#111111] overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#111111] text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-2.5">Operating Dimension</th>
                      <th className="p-2.5">Atrium (2017 Monolith)</th>
                      <th className="p-2.5 bg-[#991B1B] text-white font-bold">
                        SecondRun 2026 Micro-SaaS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#111111] bg-white text-ink-900">
                    <tr>
                      <td className="p-2.5 font-bold">Workforce</td>
                      <td className="p-2.5 text-red-700">120 Salaried Attorneys &amp; Paralegals</td>
                      <td className="p-2.5 font-semibold text-[#991B1B]">0 Humans · 100% LLM Agent Pipeline</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Customer Acquisition</td>
                      <td className="p-2.5 text-red-700">Enterprise Sales Calls (CAC &gt; $3,500)</td>
                      <td className="p-2.5 font-semibold text-[#991B1B]">Self-Serve Programmatic SEO (CAC &lt; $20)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Monthly Fixed Burn</td>
                      <td className="p-2.5 text-red-700 font-bold">$1,260,000 / month</td>
                      <td className="p-2.5 font-bold text-[#991B1B]">&lt; $50 / month Edge Compute</td>
                    </tr>
                    <tr className="bg-ink-100 font-bold">
                      <td className="p-2.5">Gross Operating Margin</td>
                      <td className="p-2.5 text-red-700">32% (Law Firm Economics)</td>
                      <td className="p-2.5 text-[#991B1B]">96% (True Software Leverage)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RESTRICTED REBUILD SPECIFICATION VAULT (PAYWALLED) */}
            <div className="border-2 border-[#111111] bg-white p-6 space-y-6 mt-8">
              {/* Vault Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#111111] pb-4 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#991B1B] text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                      RESTRICTED VAULT
                    </span>
                    <span className="text-xs font-mono font-semibold text-ink-600">
                      REGISTERED DOSSIER #49-ATRIUM
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#111111] mt-1">
                    The 5-Module Rebuild Specification Suite
                  </h3>
                </div>
                <div className="text-right sm:text-right font-mono text-xs">
                  <div className="text-[#991B1B] font-bold text-lg leading-tight">$49.00</div>
                  <div className="text-[10px] text-ink-500 uppercase">One-Time All-Access</div>
                </div>
              </div>

              <p className="text-xs font-serif text-ink-700 leading-relaxed">
                The entire production engineering suite required to rebuild Atrium into an autonomous Next.js micro-SaaS is cataloged below. 
                All source prompts, database schemas, and agent governance directives are locked under the SecondRun All-Access Lifetime Pass.
              </p>

              {/* Stacked 5 Modules (All On Top of One Another, 100% Paywalled) */}
              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "Anti-Death Master Architecture & Backend Spec",
                    tool: "Cursor / Claude 3.7 / Cline",
                    words: "3,420 words",
                    desc: "Complete Next.js 14 App Router, Prisma ORM multi-tenant schema, HMAC webhook validation, and negative engineering constraints.",
                  },
                  {
                    num: "02",
                    title: "Design & Frontend UI System Prompt",
                    tool: "v0.dev / Cursor Composer",
                    words: "1,980 words",
                    desc: "Authentic broadsheet newsprint tokens, Lora/Playfair type scales, high-density dashboard layouts, and subscriber command center.",
                  },
                  {
                    num: "03",
                    title: "Autonomous Agent System Directives (AGENTS.md)",
                    tool: "Claude Code / Windsurf / Cursor",
                    words: "1,450 words",
                    desc: "Strict autonomous builder persona, zero-human service constraint, self-correction test loops, and multi-file governance.",
                  },
                  {
                    num: "04",
                    title: "Progressive TDD Implementation Plan",
                    tool: "Cursor Composer / GitHub Copilot",
                    words: "2,150 words",
                    desc: "9 atomic engineering tickets executed strictly step-by-step with precondition verifications, test cases, and assertion checks.",
                  },
                  {
                    num: "05",
                    title: "Zero-Sales Product-Led GTM Playbook",
                    tool: "Autonomous GTM / Edge SEO",
                    words: "1,620 words",
                    desc: "Programmatic competitor teardown SEO engine, 60-second self-serve onboarding, and automated Stripe billing funnel.",
                  },
                ].map((mod) => (
                  <div
                    key={mod.num}
                    className="border border-[#111111] bg-[#F9F9F7] p-4 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink-200 pb-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase text-[#991B1B] font-bold">
                          MODULE {mod.num} OF 05 · {mod.words}
                        </span>
                        <h4 className="font-display font-bold text-base text-[#111111]">
                          {mod.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-white border border-[#111111] px-2 py-0.5 self-start sm:self-auto font-semibold">
                        {mod.tool}
                      </span>
                    </div>

                    <p className="text-xs font-serif text-ink-600 leading-relaxed">
                      {mod.desc}
                    </p>

                    {/* Encrypted Locked Box */}
                    <div className="bg-[#111111] text-white p-3 font-mono text-xs space-y-1.5 border border-[#111111]">
                      <div className="flex items-center justify-between text-[#991B1B] font-bold text-[11px]">
                        <span>[ENCRYPTED DIRECTIVE · LOCKED]</span>
                        <span>ALL-ACCESS REQUIRED</span>
                      </div>
                      <div className="text-ink-400 text-[11px]">
                        Payload: Complete executable prompt, schema models, and verification tests withheld.
                      </div>
                      <div className="pt-2 flex justify-end">
                        <Link href="/pricing">
                          <Button
                            size="sm"
                            className="bg-[#991B1B] hover:bg-red-800 text-white text-[11px] font-mono h-7 px-3 rounded-none font-bold"
                          >
                            Unlock Module ($49 Pass) →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Master Unlock Banner */}
              <div className="border-2 border-[#991B1B] bg-red-50/50 p-5 text-center space-y-3">
                <h4 className="font-display font-bold text-xl text-[#111111]">
                  Resurrect Atrium in Cursor Tonight
                </h4>
                <p className="text-xs font-serif text-ink-700 max-w-lg mx-auto">
                  One single $49 lifetime pass unlocks every prompt, schema, and directive for Atrium plus our entire 
                  archive of 1,200+ dead startup teardowns. Instant copy-paste injection.
                </p>
                <div className="pt-1">
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      className="bg-[#991B1B] hover:bg-red-800 text-white font-mono text-xs uppercase tracking-wider px-8 h-11 rounded-none font-bold shadow-xs"
                    >
                      Unlock All-Access Lifetime Pass ($49)
                    </Button>
                  </Link>
                </div>
                <div className="text-[10px] font-mono text-ink-500 uppercase">
                  Strictly No Refunds · Instant Delivery · Commercial Rebuild Rights Included
                </div>
              </div>
            </div>
          </article>

          {/* MARGINALIA SIDEBAR & CLASSIFIEDS (4 COLS) */}
          <aside className="lg:col-span-4 lg:pl-8 pt-6 lg:pt-0 space-y-8">
            {/* THE DAILY MORTALITY LEDGER */}
            <div className="border border-[#111111] bg-white p-4 space-y-3">
              <div className="border-b-2 border-[#111111] pb-2 flex items-center justify-between">
                <h3 className="font-display font-bold text-base uppercase tracking-tight text-[#111111]">
                  THE MORTALITY LEDGER
                </h3>
                <span className="text-[10px] font-mono bg-[#991B1B] text-white px-1.5 py-0.2 font-bold">
                  UPDATED DAILY
                </span>
              </div>
              <p className="text-[11px] font-serif text-ink-600 leading-snug">
                Certified autopsies and resurrection feasibility audits recorded across the global tech morgue.
              </p>

              <div className="divide-y divide-[#111111] text-xs font-mono">
                {[
                  {
                    name: "FAST.CO",
                    died: "2022",
                    burned: "$102M",
                    flaw: "$10M/mo burn on $600K ARR",
                    score: "94/100",
                    slug: "fast",
                  },
                  {
                    name: "PEBBLE",
                    died: "2016",
                    burned: "$40M",
                    flaw: "Hardware inventory trap",
                    score: "88/100",
                    slug: "pebble",
                  },
                  {
                    name: "HIGHERME",
                    died: "2023",
                    burned: "$14M",
                    flaw: "Manual screening bottleneck",
                    score: "96/100",
                    slug: "higherme",
                  },
                  {
                    name: "RDIO",
                    died: "2015",
                    burned: "$125M",
                    flaw: "Record label licensing monopoly",
                    score: "82/100",
                    slug: "rdio",
                  },
                ].map((item) => (
                  <div key={item.name} className="py-2.5 space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <Link
                        href={`/company/${item.slug}`}
                        className="text-[#111111] hover:text-[#991B1B] underline decoration-1"
                      >
                        {item.name}
                      </Link>
                      <span className="text-red-800">{item.burned}</span>
                    </div>
                    <div className="text-[11px] text-ink-600 font-serif">
                      {item.flaw}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-ink-500 pt-0.5">
                      <span>Mortality: {item.died}</span>
                      <span className="text-[#991B1B] font-bold">
                        Rebuild: {item.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#111111] text-center">
                <Link
                  href="/browse"
                  className="font-mono text-xs uppercase font-bold text-[#111111] hover:text-[#991B1B]"
                >
                  View All 1,200+ Startups →
                </Link>
              </div>
            </div>

            {/* CORONER'S TELEGRAPHIC ADVICE */}
            <div className="border border-[#111111] bg-[#F9F9F7] p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-[#111111] pb-1 text-[10px] font-mono uppercase text-[#991B1B] font-bold">
                <span>TELEGRAPHIC ADVICE</span>
                <span>DISPATCH #18</span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#111111]">
                On The Fallacy of Venture Headcount
              </h4>
              <p className="text-xs font-serif text-ink-800 leading-relaxed text-justify">
                &ldquo;Every venture dollar accepted in 2017 obligated a startup to hire five human coordinators to justify 
                the fund size. In 2026, every additional human on payroll before reaching $1M ARR is an unforced error. 
                Let the software run alone.&rdquo;
              </p>
              <div className="text-[10px] font-mono text-ink-500 text-right pt-1">
                — SecondRun Editorial Board
              </div>
            </div>

            {/* VINTAGE CLASSIFIED ADVERTISEMENT */}
            <div className="border-2 border-dashed border-[#111111] p-4 bg-white space-y-3">
              <div className="text-center border-b border-[#111111] pb-2">
                <span className="text-[10px] font-mono uppercase font-bold text-[#991B1B] tracking-widest block">
                  PUBLIC NOTICE &amp; OPPORTUNITY
                </span>
                <h4 className="font-display font-black text-lg text-[#111111] uppercase mt-0.5">
                  TO HACKERS &amp; CODE ARCHITECTS
                </h4>
              </div>

              <div className="font-serif text-xs text-ink-800 space-y-2 text-justify leading-relaxed">
                <p>
                  Cease the futile pursuit of unproven consumer fads. 1,200 validated software markets have already spent billions 
                  proving that customer demand exists.
                </p>
                <p>
                  We supply the forensic post-mortems, the exact failure points to avoid, and the ready-to-run Cursor specifications.
                </p>
              </div>

              <div className="pt-2 border-t border-[#111111] space-y-2 text-center">
                <div className="font-mono text-xs font-bold text-[#111111]">
                  ONE PASS · ALL MORTALITIES · $49
                </div>
                <Link href="/pricing" className="block">
                  <Button
                    size="sm"
                    className="w-full bg-[#111111] hover:bg-[#991B1B] text-white font-mono text-xs uppercase tracking-wider rounded-none font-bold"
                  >
                    Claim Lifetime Access
                  </Button>
                </Link>
                <span className="text-[10px] font-mono text-ink-500 block">
                  Strictly No Refunds · Final Sale
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* ORNAMENTAL SECTION BREAK */}
        <div className="py-6 text-center font-serif text-xl text-[#991B1B] tracking-[1em]">
          ✦ ✦ ✦
        </div>

        {/* FOOTER */}
        <footer className="border-t-2 border-[#111111] pt-6 pb-8 text-xs font-mono text-ink-600 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#111111] pb-4">
            <div className="font-display font-bold text-lg text-[#111111]">
              THE SECOND RUN DISPATCH
            </div>
            <div className="flex items-center gap-6 text-[11px] uppercase">
              <Link href="/pricing" className="hover:text-[#991B1B]">Pricing</Link>
              <Link href="/terms" className="hover:text-[#991B1B]">No-Refund Terms</Link>
              <Link href="/privacy" className="hover:text-[#991B1B]">Privacy Notice</Link>
              <Link href="/dashboard" className="hover:text-[#991B1B]">Subscriber Command</Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-ink-500">
            <span>PRINTED DIGITALLY FOR CODERS, FOUNDERS &amp; AUTONOMOUS AGENTS</span>
            <span>&copy; 2026 THE SECOND RUN DISPATCH · ALL RIGHTS RESERVED</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
