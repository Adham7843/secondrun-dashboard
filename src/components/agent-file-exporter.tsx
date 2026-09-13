"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AgentFileExporterProps {
  companyName: string;
  slug: string;
  fullPrompt: string;
}

export default function AgentFileExporter({
  companyName,
  slug,
  fullPrompt,
}: AgentFileExporterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#FAF9F6] border border-ink-200/80 rounded-sm text-xs font-mono">
      <div className="space-y-0.5">
        <span className="font-semibold text-ink-900 block">
          Agent Repository Directives (.cursorrules &amp; AGENTS.md)
        </span>
        <span className="text-ink-500 block text-xs">
          Pre-configured governance files for Cursor Composer, Windsurf &amp; Claude Code
        </span>
      </div>

      <div className="flex items-center gap-2">
        <a href="#engineering-specs">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs font-mono font-medium bg-white hover:bg-[#F5F5F4]"
          >
            Inspect 5-Module Suite ↓
          </Button>
        </a>
        <Link href="/pricing">
          <Button
            variant="primary"
            size="sm"
            className="h-8 text-xs font-mono font-semibold"
          >
            Unlock All Directives ($49)
          </Button>
        </Link>
      </div>
    </div>
  );
}
