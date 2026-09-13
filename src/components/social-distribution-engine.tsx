"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DistributionCompany {
  name: string;
  slug: string;
  capitalBurned?: string | null;
  fatalFlaw?: string | null;
  rebuildThesis?: string | null;
  closedYear?: number | null;
  industry: string;
}

interface SocialDistributionEngineProps {
  companies: DistributionCompany[];
}

export default function SocialDistributionEngine({ companies }: SocialDistributionEngineProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(companies[0]?.slug || "");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const active = companies.find((c) => c.slug === selectedSlug) || companies[0];

  if (!active) return null;

  const shortFormHook = `In ${active.closedYear ? active.closedYear - 4 : "2017"}, ${active.name} raised ${active.capitalBurned || "millions"} from tier-1 VCs to solve ${active.industry.toLowerCase()}.

By ${active.closedYear || "2022"}, they shut down completely.

Why? ${active.fatalFlaw || "They burned millions trying to scale human service operations before finding sustainable unit economics."}

Today, you can rebuild this entire validated software model on serverless edge with 0 employees:
👉 https://secondrun.io/company/${active.slug}`;

  const pasReplyPlug = `Most indie founders spend 6 months building an unvalidated SaaS that nobody wants.

Meanwhile, ${active.name} already spent ${active.capitalBurned || "millions"} proving that customers actively pay for this software.

The opportunity is taking the validated market and cutting out the bloated venture burn rate.

We reverse-engineered the entire 5-module specification (.cursorrules, Prisma schema, and TDD tickets) in the SecondRun Vault ($49 lifetime pass):
👉 https://secondrun.io/company/${active.slug}#engineering-specs`;

  const newsletterSnippet = `SUBJECT: How ${active.name} burned ${active.capitalBurned || "millions"} (and the 48-hour Cursor blueprint)

Good morning,

When ${active.name} raised ${active.capitalBurned || "their funding"}, they had one structural flaw:
${active.fatalFlaw || "They built an expensive manual consulting firm disguised as software."}

Here is the 25,000x cost inversion:
- Original Burn: ${active.capitalBurned || "$1.2M/mo"}
- 2026 Micro-SaaS Burn: < $50/mo on edge compute
- Gross Margin: 32% → 96%

Read the full 3,000-word autopsy and copy the autonomous rebuild specification:
https://secondrun.io/company/${active.slug}`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="border border-ink-200 bg-white p-6 rounded-sm shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-ink-200 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-ink text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded">
              Operator Engine
            </span>
            <span className="text-xs font-mono text-ink-500">60-Second Daily Routine</span>
          </div>
          <h3 className="font-display font-bold text-xl text-ink mt-1">
            Social Distribution &amp; Hook Generator
          </h3>
          <p className="text-xs text-ink-600 font-sans mt-0.5">
            Select any startup from the archive to generate platform-native hooks and PAS conversion replies.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-mono text-ink-600">Startup:</label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="text-xs font-mono bg-[#FAF9F6] border border-ink-300 rounded px-2.5 py-1.5 text-ink font-semibold focus:outline-none focus:border-ink"
          >
            {companies.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.capitalBurned || "Venture Backed"})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Box 1: Short-Form Viral Hook */}
        <div className="p-4 bg-[#FAF9F6] border border-ink-200 rounded-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-rebuild tracking-wider">
                01 · Short-Form Hook (X / LinkedIn)
              </span>
              <span className="text-[10px] font-mono text-ink-400">Time: 08:00 AM</span>
            </div>
            <pre className="text-xs font-mono text-ink-800 whitespace-pre-wrap bg-white border border-ink-200/80 p-3 rounded leading-relaxed max-h-56 overflow-y-auto">
              {shortFormHook}
            </pre>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy(shortFormHook, "short")}
            className="w-full text-xs font-mono bg-white hover:bg-ink-100 h-8"
          >
            {copiedType === "short" ? "Copied Hook!" : "Copy Post to Clipboard"}
          </Button>
        </div>

        {/* Box 2: PAS Reply Conversion */}
        <div className="p-4 bg-[#FAF9F6] border border-ink-200 rounded-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-ink-700 tracking-wider">
                02 · PAS Reply Conversion Plug
              </span>
              <span className="text-[10px] font-mono text-ink-400">First Reply</span>
            </div>
            <pre className="text-xs font-mono text-ink-800 whitespace-pre-wrap bg-white border border-ink-200/80 p-3 rounded leading-relaxed max-h-56 overflow-y-auto">
              {pasReplyPlug}
            </pre>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy(pasReplyPlug, "reply")}
            className="w-full text-xs font-mono bg-white hover:bg-ink-100 h-8"
          >
            {copiedType === "reply" ? "Copied Reply!" : "Copy Reply to Clipboard"}
          </Button>
        </div>

        {/* Box 3: Sunday Dispatch Email */}
        <div className="p-4 bg-[#FAF9F6] border border-ink-200 rounded-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-ink-700 tracking-wider">
                03 · Sunday Dispatch Newsletter
              </span>
              <span className="text-[10px] font-mono text-ink-400">Weekly Broadcast</span>
            </div>
            <pre className="text-xs font-mono text-ink-800 whitespace-pre-wrap bg-white border border-ink-200/80 p-3 rounded leading-relaxed max-h-56 overflow-y-auto">
              {newsletterSnippet}
            </pre>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy(newsletterSnippet, "email")}
            className="w-full text-xs font-mono bg-white hover:bg-ink-100 h-8"
          >
            {copiedType === "email" ? "Copied Email!" : "Copy Newsletter Draft"}
          </Button>
        </div>
      </div>
    </div>
  );
}
