"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export interface RebuildPromptItem {
  id: string;
  title: string;
  shortTitle?: string;
  targetTool: string;
  description: string;
  iconName?: string;
  content: string;
}

interface PromptSuiteViewerProps {
  companyName: string;
  prompts: RebuildPromptItem[];
}

export default function PromptSuiteViewer({
  companyName,
  prompts,
}: PromptSuiteViewerProps) {
  const { user } = useAuth();
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);
  const isUnlocked = manualOverride !== null ? manualOverride : Boolean(user?.isPaid);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalWords = prompts.reduce(
    (acc, p) => acc + p.content.split(/\s+/).filter(Boolean).length,
    0
  );

  const allPromptsCombined = prompts
    .map(
      (p, idx) =>
        `# ==============================================================================\n# MODULE ${String(
          idx + 1
        ).padStart(2, "0")}: ${p.title.toUpperCase()}\n# TARGET ENVIRONMENT: ${p.targetTool.toUpperCase()}\n# ==============================================================================\n\n${p.content}`
    )
    .join("\n\n" + "=".repeat(80) + "\n\n");

  const handleCopy = (text: string, id: string) => {
    if (!isUnlocked) {
      window.location.href = "/pricing";
      return;
    }
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    if (!isUnlocked) {
      window.location.href = "/pricing";
      return;
    }
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedId(filename);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const cursorrulesContent = `# ==============================================================================
# .cursorrules — SECOND RUN REBUILD GOVERNANCE
# PROJECT: Rebuild ${companyName}
# ==============================================================================
# INSTRUCTIONS FOR CURSOR COMPOSER / WINDSURF CASCADE:
# 1. Obey these rules on EVERY generation without exception.
# 2. Never violate the negative engineering constraints.
# ==============================================================================

# TECH STACK SPECIFICATION:
# Framework: Next.js 14 (App Router, Server Actions)
# ORM: Prisma Client
# Auth: NextAuth.js (Auth.js v5) with multi-tenant organization scoping
# Payments: Stripe Billing with HMAC webhooks
# Database: SQLite for local dev, PostgreSQL for production

# DEVELOPMENT PROTOCOL:
# Execute step-by-step using strict TDD. Verify all tests pass before writing new code.
`;

  return (
    <div className="space-y-8 w-full">
      {/* Master Paywall / Status Banner */}
      <div className="p-6 bg-[#FAF9F6] border-2 border-ink rounded-sm shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-ink text-white">
                {isUnlocked ? "Member All-Access Active" : "Protected Engineering Suite"}
              </span>
              <span className="font-mono text-xs sm:text-sm text-ink-600">
                5 Modules · {totalWords.toLocaleString()} Words · Production Blueprints
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-ink">
              The 5-Module Rebuild Specification Suite
            </h3>
            <p className="text-sm sm:text-base text-ink-700 max-w-2xl leading-relaxed">
              {isUnlocked
                ? `All 5 production prompt modules for ${companyName} are unlocked below. You can copy individual modules or export the entire repository package directly.`
                : `All 5 production prompt modules, schemas, design tokens, and TDD tickets for ${companyName} are locked behind the SecondRun All-Access Lifetime Pass.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setManualOverride(!isUnlocked)}
              className="text-xs font-mono text-ink-500 hover:text-ink underline self-center sm:self-auto py-1"
            >
              {isUnlocked ? "Switch to Visitor View" : "Simulate Member Unlock"}
            </button>

            {isUnlocked ? (
              <Button
                variant="primary"
                onClick={() => handleCopy(allPromptsCombined, "all-modules")}
                className="text-xs sm:text-sm font-semibold h-10 px-5 shadow-2xs"
              >
                {copiedId === "all-modules"
                  ? "Copied All 5 Modules!"
                  : "Copy All 5 Modules at Once"}
              </Button>
            ) : (
              <Link href="/pricing" className="block">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto text-xs sm:text-sm font-semibold h-10 px-6 shadow-2xs"
                >
                  Unlock All 5 Modules ($49)
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Member Download Actions (When Unlocked) */}
        {isUnlocked && (
          <div className="mt-5 pt-4 border-t border-ink-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-ink-600">Export repository governance files:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadFile(".cursorrules", cursorrulesContent)}
                className="h-8 text-xs font-mono bg-white hover:bg-[#F5F5F4]"
              >
                {copiedId === ".cursorrules"
                  ? "Downloaded .cursorrules"
                  : "Download .cursorrules"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadFile("AGENTS.md", allPromptsCombined)}
                className="h-8 text-xs font-mono bg-white hover:bg-[#F5F5F4]"
              >
                {copiedId === "AGENTS.md"
                  ? "Downloaded AGENTS.md"
                  : "Download AGENTS.md"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 5 Modules Stacked Vertically On Top of One Another */}
      <div className="space-y-8">
        {prompts.map((prompt, idx) => {
          const modNumber = String(idx + 1).padStart(2, "0");
          const wordCount = prompt.content.split(/\s+/).filter(Boolean).length;
          const isCopied = copiedId === prompt.id;

          return (
            <div
              key={prompt.id}
              className="border border-ink-200 rounded-sm bg-white overflow-hidden shadow-2xs"
            >
              {/* Module Header Bar */}
              <div className="p-5 sm:p-6 bg-[#FAF9F6] border-b border-ink-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                      <span className="font-bold text-ink uppercase tracking-wider">
                        Module {modNumber} of 05
                      </span>
                      <span className="text-ink-300">·</span>
                      <span className="bg-white border border-ink-200 px-2 py-0.5 rounded text-ink-700 font-semibold text-xs">
                        {prompt.targetTool}
                      </span>
                      <span className="text-ink-300">·</span>
                      <span className="text-ink-500 text-xs">
                        {wordCount.toLocaleString()} words · Production Blueprint
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xl sm:text-2xl text-ink pt-1">
                      {prompt.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-ink-600 max-w-3xl leading-relaxed">
                      {prompt.description}
                    </p>
                  </div>

                  <div className="shrink-0 self-start sm:self-center">
                    {isUnlocked ? (
                      <Button
                        variant={isCopied ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCopy(prompt.content, prompt.id)}
                        className="text-xs sm:text-sm font-mono font-medium h-9 px-4 bg-white hover:bg-ink-100"
                      >
                        {isCopied ? `Copied Module ${modNumber}!` : `Copy Module ${modNumber}`}
                      </Button>
                    ) : (
                      <Link href="/pricing">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs sm:text-sm font-mono font-medium h-9 px-4 bg-white border-ink-300 hover:bg-ink-100"
                        >
                          Locked ($49 All-Access)
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Module Content / Locked Paywall State */}
              <div className="bg-[#141416] p-0">
                {isUnlocked ? (
                  /* UNLOCKED FULL MONOSPACE CODE BLOCK */
                  <pre className="p-6 text-ink-100 text-xs sm:text-[13px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[850px] selection:bg-rebuild selection:text-white">
                    <code>{prompt.content}</code>
                  </pre>
                ) : (
                  /* COMPLETELY HIDDEN BEHIND PAYWALL (NO CODE VISIBLE) */
                  <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="max-w-md w-full space-y-3">
                      <div className="inline-block border border-ink-700 bg-ink-900/90 px-3 py-1 rounded text-ink-400 font-mono text-xs uppercase tracking-wider">
                        Protected Engineering Directive · Module {modNumber}
                      </div>

                      <div className="border border-ink-800 bg-[#0B0B0C] p-4 rounded text-left font-mono text-xs text-ink-400 space-y-1.5">
                        <div className="text-ink-300 font-semibold text-xs sm:text-sm">
                          # PAYWALLED SPECIFICATION WITHHELD
                        </div>
                        <div>
                          # Target Environment:{" "}
                          <span className="text-ink-200">{prompt.targetTool}</span>
                        </div>
                        <div>
                          # Payload Volume:{" "}
                          <span className="text-ink-200">
                            {wordCount.toLocaleString()} words · Complete System Specification
                          </span>
                        </div>
                        <div className="text-ink-500 text-xs pt-1">
                          # Contains: Full runnable schema definitions, negative engineering bounds,
                          # route handlers, and automated test assertions for {companyName}.
                        </div>
                      </div>

                      <div className="pt-2 space-y-2">
                        <Link href="/pricing" className="block">
                          <Button
                            variant="primary"
                            className="w-full h-11 text-xs sm:text-sm font-semibold shadow-2xs"
                          >
                            Unlock All 5 Modules with All-Access Pass ($49)
                          </Button>
                        </Link>
                        <p className="text-xs font-mono text-ink-400">
                          One-time $49 · Instant access to all 1,200+ startup rebuild dossiers · No recurring fees
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-6 bg-[#FAF9F6] border border-ink-200 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono">
        <span className="text-ink-600 text-center sm:text-left">
          {isUnlocked
            ? "All 5 specifications ready for injection into Cursor, Claude Code, Windsurf, or Copilot."
            : "5 of 5 specifications locked. All-Access Lifetime Pass grants immediate access to all code."}
        </span>

        {isUnlocked ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleCopy(allPromptsCombined, "all-modules-bottom")}
            className="h-9 px-4 font-semibold text-xs sm:text-sm shrink-0"
          >
            {copiedId === "all-modules-bottom"
              ? "Copied All 5 Modules!"
              : "Copy All 5 Modules at Once"}
          </Button>
        ) : (
          <Link href="/pricing">
            <Button
              variant="primary"
              size="sm"
              className="h-9 px-5 font-semibold text-xs sm:text-sm shrink-0"
            >
              Get All-Access Lifetime Pass ($49)
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

