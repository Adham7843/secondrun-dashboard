"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Check,
  Terminal,
  Sparkles,
  ShieldCheck,
  Lock,
  Download,
  FileCode,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider text-ink-600">
          Transparent Pricing · Zero Recurring Subscription
        </Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink">
          The 1,200+ Startup Failure Database.
        </h1>
        <p className="text-base text-ink-600 max-w-2xl mx-auto">
          Uncover what made 1,200+ venture-backed startups fail, avoid their lethal anti-patterns,
          and get the exact 5-module autonomous code blueprints to <strong>repurpose their validated demand
          and build it better to profit this time</strong>.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rebuild-light/80 border border-rebuild/30 rounded-full text-xs font-mono text-ink-800 mt-2">
          <span className="w-2 h-2 rounded-full bg-rebuild animate-pulse" />
          <span>Launch Special: <strong>$49 One-Time Lifetime Access</strong> (No Monthly Recurring Fees)</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Plan */}
        <Card className="border-ink-200 bg-white p-7 flex flex-col justify-between shadow-2xs">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-ink">Graveyard Free</h3>
              <Badge variant="outline" className="font-mono text-xs">FREE FOREVER</Badge>
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              For casual founders and researchers exploring failure patterns in historical YC batches.
            </p>
            <div className="pt-2">
              <span className="font-display text-4xl font-bold text-ink">$0</span>
              <span className="text-xs font-mono text-ink-500 ml-1">/ forever</span>
            </div>

            <ul className="space-y-3 pt-4 text-xs text-ink-700">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                Browse all 1,200+ dead startup company profiles
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                Filter by YC batch, industry, and capital burned
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                Read top 3,000 characters of every forensic autopsy
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                Inspect founder history and original pitch data
              </li>
              <li className="flex items-center gap-2.5 text-ink-400">
                <span className="w-4 h-4 flex items-center justify-center font-mono">✕</span>
                Full 10-Section Anti-Death Rebuild Prompts
              </li>
              <li className="flex items-center gap-2.5 text-ink-400">
                <span className="w-4 h-4 flex items-center justify-center font-mono">✕</span>
                1-Click .cursorrules & AGENTS.md Downloads
              </li>
              <li className="flex items-center gap-2.5 text-ink-400">
                <span className="w-4 h-4 flex items-center justify-center font-mono">✕</span>
                Executable Python Lead Generation Scrapers
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link href="/register" className="block">
              <Button variant="outline" className="w-full h-11 text-xs font-semibold">
                Start Reading Free Archive
              </Button>
            </Link>
          </div>
        </Card>

        {/* Pro Lifetime Plan */}
        <Card className="border-2 border-rebuild bg-white p-7 relative flex flex-col justify-between shadow-md ring-1 ring-rebuild/20">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rebuild text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
            ★ ALL-ACCESS LIFETIME PASS
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-ink">SecondRun All-Access</h3>
              <Badge variant="rebuild" className="font-mono text-xs">PAY ONCE · OWN FOREVER</Badge>
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              Full lifetime access to the 1,200+ startup failure database: uncover why each product died,
              avoid their mistakes, and repurpose their market demand with production-ready AI prompts.
            </p>
            <div className="pt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl sm:text-5xl font-bold text-ink">
                $49
              </span>
              <span className="text-xs font-mono text-ink-500">
                one-time payment (Lifetime access to all current & future dossiers)
              </span>
            </div>

            <ul className="space-y-3 pt-4 text-xs text-ink-800">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                <strong className="text-ink">Full unredacted access to all 1,200+ startup failure dossiers</strong>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                <strong className="text-ink">1,200-Day Daily Rotation: 1 fresh rebuild blueprint featured every day</strong>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                <strong className="text-ink">The Centerpiece: Forensic Autopsy &amp; Anti-Death Counter-Strategy</strong>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                <strong className="text-ink">Linear / Modern Dark UI Design Prompts with Brand Mandates</strong>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                <strong className="text-ink">1-Click .cursorrules & AGENTS.md Direct Downloads</strong>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                Competitor study & vulnerability attack wedges per startup
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                Ready-to-run Python lead generation scrapers (autonomous_scraper.py)
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                4-Stage cold outbound email sequences with diagnostic hooks
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                Commercial license to build, deploy, and monetize rebuilt SaaS
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rebuild shrink-0" />
                All new weekly teardowns and prompt blueprints added forever
              </li>
            </ul>
          </div>

          <div className="pt-8 space-y-2">
            <Link href="/register?plan=lifetime" className="block">
              <Button variant="primary" className="w-full h-11 text-xs font-semibold shadow-sm">
                <span>Unlock All-Access Lifetime Pass ($49)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>

            <p className="text-[11px] font-mono text-center text-ink-500 pt-1">
              🔒 Instant digital delivery · Strictly no refunds once accessed (
              <Link href="/terms" className="underline hover:text-ink">
                Terms of Service
              </Link>
              )
            </p>
          </div>
        </Card>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-6 bg-white border border-ink-200 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="space-y-1">
          <strong className="font-mono text-ink uppercase flex items-center gap-1.5 font-bold">
            <Lock className="w-3.5 h-3.5 text-rebuild" /> Digital Delivery Guarantee
          </strong>
          <p className="text-ink-600 leading-relaxed">
            Immediate unlock upon payment. Your account gains permanent access to every current and future rebuild blueprint.
          </p>
        </div>

        <div className="space-y-1">
          <strong className="font-mono text-ink uppercase flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-ink" /> Anti-Refund Policy
          </strong>
          <p className="text-ink-600 leading-relaxed">
            Due to the proprietary nature of our AI prompts and code exports, all digital sales are final per our{" "}
            <Link href="/terms" className="underline hover:text-rebuild">
              Terms of Service
            </Link>
            .
          </p>
        </div>

        <div className="space-y-1">
          <strong className="font-mono text-ink uppercase flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-rebuild" /> Commercial License
          </strong>
          <p className="text-ink-600 leading-relaxed">
            You own 100% of the code you build with our prompts. Zero royalties, zero attribution required.
          </p>
        </div>
      </div>
    </div>
  );
}
