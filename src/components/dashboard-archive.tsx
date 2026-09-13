"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CompanyLogo from "@/components/company-logo";
import AdaptMarketModal from "@/components/adapt-market-modal";
import {
  Search,
  Terminal,
  Flame,
  Globe,
  Check,
  ArrowRight,
  LayoutGrid,
  List,
} from "lucide-react";

export interface DashboardCompany {
  id: string;
  slug: string;
  name: string;
  batch: string;
  status: string;
  tagline: string;
  industry: string;
  capitalBurned?: string | null;
  fatalFlawSummary?: string | null;
  foundedYear?: number | null;
  closedYear?: number | null;
  teardown?: {
    overview: string;
    fatalFlaw?: string | null;
    rebuildThesis?: string | null;
    agentPrompt?: string | null;
  } | null;
}

export default function DashboardArchive({
  companies,
}: {
  companies: DashboardCompany[];
}) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("ALL");
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); // Boxes view is DEFAULT & PRIORITY
  const [displayCount, setDisplayCount] = useState(48);

  // Modal State
  const [modalCompany, setModalCompany] = useState<DashboardCompany | null>(null);

  const industryScrollRef = useRef<HTMLDivElement>(null);
  const batchScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayCount(48);
  }, [search, selectedIndustry, selectedBatch, viewMode]);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const { industries, industryCounts } = useMemo(() => {
    const counts: Record<string, number> = { ALL: companies.length };
    const set = new Set<string>();
    companies.forEach((c) => {
      set.add(c.industry);
      counts[c.industry] = (counts[c.industry] || 0) + 1;
    });
    return {
      industries: ["ALL", ...Array.from(set)],
      industryCounts: counts,
    };
  }, [companies]);

  const { batches, batchCounts } = useMemo(() => {
    const counts: Record<string, number> = { ALL: companies.length };
    const set = new Set<string>();
    companies.forEach((c) => {
      set.add(c.batch);
      counts[c.batch] = (counts[c.batch] || 0) + 1;
    });
    return {
      batches: ["ALL", ...Array.from(set)],
      batchCounts: counts,
    };
  }, [companies]);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.tagline.toLowerCase().includes(search.toLowerCase()) ||
        (c.fatalFlawSummary && c.fatalFlawSummary.toLowerCase().includes(search.toLowerCase())) ||
        c.industry.toLowerCase().includes(search.toLowerCase());

      const matchIndustry = selectedIndustry === "ALL" || c.industry === selectedIndustry;
      const matchBatch = selectedBatch === "ALL" || c.batch === selectedBatch;

      return matchSearch && matchIndustry && matchBatch;
    });
  }, [companies, search, selectedIndustry, selectedBatch]);

  const handleQuickCopy = (c: DashboardCompany) => {
    const text =
      c.teardown?.agentPrompt ||
      `# ============================================================================
# SECOND RUN REBUILD MASTER BLUEPRINT: ${c.name.toUpperCase()}
# SECTOR: ${c.industry.toUpperCase()} · BATCH: ${c.batch} · BURN: ${c.capitalBurned || "$10M+"}
# ============================================================================
Original Offer: ${c.tagline}
Fatal Flaw: ${c.fatalFlawSummary || c.teardown?.fatalFlaw || "Unit economics collapse."}
The 2026 Counter-Strategy: ${c.teardown?.rebuildThesis || "Rebuild as an automated micro-SaaS with $0 payroll."}
`;
    navigator.clipboard.writeText(text);
    setCopiedId(c.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const displayedCompanies = filtered.slice(0, displayCount);

  return (
    <div className="space-y-6">
      {/* Search Bar & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <Input
            placeholder="Search 1,200+ dossiers by keyword, fatal flaw, or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-ink-300 text-xs sm:text-sm h-11 shadow-2xs"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-ink-400 hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right Controls: Count Pill + View Mode Toggle */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          {/* Status Count Pill */}
          <div className="text-xs font-mono text-ink-600 bg-white border border-ink-200 px-3.5 py-2.5 rounded-sm flex items-center gap-2 shadow-2xs">
            <span>
              Showing <strong className="text-ink">{Math.min(displayCount, filtered.length)}</strong> of {filtered.length} dossiers
            </span>
          </div>

          {/* View Mode Toggle: Boxes (Priority) vs List */}
          <div className="flex items-center border border-ink-200 bg-white rounded-sm p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-mono font-semibold transition-colors ${
                viewMode === "grid"
                  ? "bg-ink text-white shadow-2xs"
                  : "text-ink-600 hover:text-ink hover:bg-ink-100"
              }`}
              title="Boxes View (Default Priority)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Boxes</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-mono font-semibold transition-colors ${
                viewMode === "list"
                  ? "bg-ink text-white shadow-2xs"
                  : "text-ink-600 hover:text-ink hover:bg-ink-100"
              }`}
              title="Compact List View"
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Category Pills with Arrow Controls */}
      <div className="p-3.5 sm:p-4 bg-[#FAF9F6] border border-ink-200/80 rounded-sm space-y-3 shadow-2xs">
        {/* Industry Row */}
        <div className="flex items-center gap-2.5 text-xs">
          <span className="w-20 font-mono text-ink-600 uppercase shrink-0 text-xs font-semibold tracking-wider">
            Industry:
          </span>
          <button
            type="button"
            onClick={() => handleScroll(industryScrollRef, "left")}
            className="h-7 w-7 rounded-full bg-white border border-ink-200 text-ink-600 hover:text-ink hover:bg-ink-100 flex items-center justify-center text-xs font-mono shrink-0 transition-colors shadow-2xs"
            aria-label="Scroll left"
          >
            ←
          </button>
          <div
            ref={industryScrollRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 text-xs flex-1"
          >
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`h-7 px-3 rounded-full text-xs font-mono shrink-0 transition-colors flex items-center gap-1.5 ${
                  selectedIndustry === ind
                    ? "bg-ink text-white font-semibold shadow-2xs"
                    : "bg-white border border-ink-200 text-ink-700 hover:bg-ink-100"
                }`}
              >
                <span>{ind}</span>
                <span
                  className={`text-[10px] font-mono ${
                    selectedIndustry === ind ? "text-white/80" : "text-ink-400"
                  }`}
                >
                  ({industryCounts[ind] || 0})
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleScroll(industryScrollRef, "right")}
            className="h-7 w-7 rounded-full bg-white border border-ink-200 text-ink-600 hover:text-ink hover:bg-ink-100 flex items-center justify-center text-xs font-mono shrink-0 transition-colors shadow-2xs"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>

        {/* Batch Row */}
        <div className="flex items-center gap-2.5 text-xs">
          <span className="w-20 font-mono text-ink-600 uppercase shrink-0 text-xs font-semibold tracking-wider">
            Batch:
          </span>
          <button
            type="button"
            onClick={() => handleScroll(batchScrollRef, "left")}
            className="h-7 w-7 rounded-full bg-white border border-ink-200 text-ink-600 hover:text-ink hover:bg-ink-100 flex items-center justify-center text-xs font-mono shrink-0 transition-colors shadow-2xs"
            aria-label="Scroll left"
          >
            ←
          </button>
          <div
            ref={batchScrollRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 text-xs flex-1"
          >
            {batches.map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`h-7 px-3 rounded-full text-xs font-mono shrink-0 transition-colors flex items-center gap-1.5 ${
                  selectedBatch === batch
                    ? "bg-ink text-white font-semibold shadow-2xs"
                    : "bg-white border border-ink-200 text-ink-700 hover:bg-ink-100"
                }`}
              >
                <span>{batch}</span>
                <span
                  className={`text-[10px] font-mono ${
                    selectedBatch === batch ? "text-white/80" : "text-ink-400"
                  }`}
                >
                  ({batchCounts[batch] || 0})
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleScroll(batchScrollRef, "right")}
            className="h-7 w-7 rounded-full bg-white border border-ink-200 text-ink-600 hover:text-ink hover:bg-ink-100 flex items-center justify-center text-xs font-mono shrink-0 transition-colors shadow-2xs"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 1. PRIORITY VIEW: THE BOXES / CARDS GRID (3-COLUMN RESPONSIVE)         */}
      {/* ====================================================================== */}
      {viewMode === "grid" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCompanies.map((c) => {
              const isAcquired = c.status === "ACQUIRED";

              return (
                <Card
                  key={c.id}
                  className="flex flex-col justify-between border border-ink-200 bg-white hover:border-ink-400 hover:shadow-md transition-all duration-200 group rounded-sm"
                >
                  <CardHeader className="p-6 pb-3 space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <CompanyLogo slug={c.slug} name={c.name} size="lg" className="rounded-xs shadow-2xs" />
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <Badge variant="outline" className="text-xs font-mono font-medium">
                          {c.batch}
                        </Badge>
                        <Badge
                          variant={isAcquired ? "acquired" : "inactive"}
                          className="text-xs font-mono uppercase tracking-wider"
                        >
                          {c.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Link
                        href={`/company/${c.slug}`}
                        className="font-display font-bold text-2xl sm:text-3xl text-ink group-hover:text-rebuild transition-colors"
                      >
                        {c.name}
                      </Link>
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-ink-500 pt-1">
                        <span>{c.industry}</span>
                        <span>·</span>
                        <span>
                          {c.foundedYear ?? "—"}–{c.closedYear ?? "Acquired"}
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
                      <p className="text-sm sm:text-base text-ink-900 leading-relaxed font-serif italic line-clamp-2">
                        &ldquo;{c.tagline}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-ink-100 space-y-3">
                      {/* Capital Burned */}
                      {c.capitalBurned && (
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-ink-700">
                          <Flame className="w-4 h-4 text-destructive shrink-0" />
                          <span>
                            Venture Burn: <strong className="text-ink-900 text-sm sm:text-base">{c.capitalBurned}</strong>
                          </span>
                        </div>
                      )}

                      {/* Fatal Flaw Takeaway Box */}
                      {c.fatalFlawSummary && (
                        <div className="text-xs sm:text-[13px] text-ink-800 bg-[#FAF9F6] p-3 rounded border border-ink-200/80 leading-relaxed">
                          <strong className="text-destructive font-mono text-xs uppercase block mb-1">
                            Fatal Flaw:
                          </strong>
                          <span className="line-clamp-3">{c.fatalFlawSummary}</span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {/* 1-Click Cursor Copy Button */}
                          <Button
                            variant={copiedId === c.id ? "default" : "secondary"}
                            size="sm"
                            onClick={() => handleQuickCopy(c)}
                            className="text-xs h-9 font-mono flex items-center gap-1.5 bg-[#FAF9F6] border border-ink-200 hover:bg-ink-100 text-ink-900"
                          >
                            {copiedId === c.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-rebuild font-bold" />
                                <span className="font-semibold text-rebuild">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Terminal className="w-3.5 h-3.5 text-rebuild" />
                                <span>Copy Prompt</span>
                              </>
                            )}
                          </Button>

                          {/* Regional Market Adapter Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setModalCompany(c)}
                            className="text-xs h-9 text-ink-700 hover:text-ink flex items-center gap-1.5 bg-white border-ink-200"
                            title="Adapt for Regional Market"
                          >
                            <Globe className="w-3.5 h-3.5 text-ink-500" />
                          </Button>
                        </div>

                        {/* Full Dossier Page Link */}
                        <Link href={`/company/${c.slug}`}>
                          <Button
                            variant="primary"
                            size="sm"
                            className="text-xs h-9 flex items-center gap-1 px-3.5 font-semibold bg-rebuild hover:bg-rebuild/90 text-white"
                          >
                            <span>Autopsy</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Progressive Chunk Navigation */}
          {filtered.length > displayCount && (
            <div className="p-6 bg-[#FAF9F6] border border-ink-200 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono shadow-2xs">
              <span className="text-ink-600">
                Showing <strong>{displayCount}</strong> of <strong>{filtered.length}</strong> matching startup boxes
              </span>
              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDisplayCount((prev) => Math.min(prev + 48, filtered.length))}
                  className="text-xs h-10 px-4 bg-white border-ink-300 hover:bg-ink-100 font-semibold"
                >
                  Load 48 More Boxes ↓
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDisplayCount(filtered.length)}
                  className="text-xs h-10 px-4 text-ink-700"
                >
                  Show All ({filtered.length})
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* 2. SECONDARY VIEW: COMPACT LIST / TABLE                                */}
      {/* ====================================================================== */}
      {viewMode === "list" && (
        <div className="border border-ink-200 bg-white rounded-sm overflow-hidden shadow-2xs">
          <div className="border-b border-ink-200 bg-[#FAF9F6] px-5 py-3 flex items-center justify-between text-xs font-mono text-ink-600 uppercase tracking-wider">
            <span>Dossier Ledger (Showing {Math.min(displayCount, filtered.length)} of {filtered.length} Indexed)</span>
            <span className="hidden sm:inline">Actions / Instant Tools</span>
          </div>

          <div className="divide-y divide-ink-100">
            {displayedCompanies.map((c) => {
              const isAcquired = c.status === "ACQUIRED";

              return (
                <div
                  key={c.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF9F6]/80 transition-colors"
                >
                  {/* Left: Typographic SVG Mark + Overview */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <CompanyLogo slug={c.slug} name={c.name} size="md" className="rounded-xs shadow-2xs" />

                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/company/${c.slug}`}
                          className="font-display font-bold text-lg text-ink hover:text-rebuild transition-colors"
                        >
                          {c.name}
                        </Link>
                        <Badge variant="outline" className="font-mono text-xs font-medium">
                          {c.batch}
                        </Badge>
                        <Badge
                          variant={isAcquired ? "acquired" : "inactive"}
                          className="uppercase text-[10px] font-mono"
                        >
                          {c.status}
                        </Badge>

                        {c.capitalBurned && (
                          <span className="text-xs font-mono text-destructive font-semibold flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5" /> Burned: {c.capitalBurned}
                          </span>
                        )}

                        <span className="text-xs font-mono text-ink-400">·</span>
                        <span className="text-xs font-mono text-ink-500">{c.industry}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-ink-800 leading-relaxed font-sans line-clamp-1">
                        {c.tagline}
                      </p>

                      {c.fatalFlawSummary && (
                        <p className="text-xs text-ink-600 font-serif italic line-clamp-2">
                          &ldquo;{c.fatalFlawSummary}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Quick Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto pt-2 md:pt-0">
                    {/* Regional Market Adapter Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setModalCompany(c)}
                      className="text-xs h-9 text-ink-700 hover:text-ink flex items-center gap-1.5 bg-white border-ink-200"
                    >
                      <Globe className="w-3.5 h-3.5 text-ink-500" />
                      <span className="hidden sm:inline">Adapt Market</span>
                    </Button>

                    {/* 1-Click Cursor Copy Button */}
                    <Button
                      variant={copiedId === c.id ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleQuickCopy(c)}
                      className="text-xs h-9 font-mono flex items-center gap-1.5 bg-[#FAF9F6] border border-ink-200 hover:bg-ink-100 text-ink-900"
                    >
                      {copiedId === c.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-rebuild font-bold" />
                          <span className="font-semibold text-rebuild">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Terminal className="w-3.5 h-3.5 text-rebuild" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </Button>

                    {/* Full Dossier Page Link */}
                    <Link href={`/company/${c.slug}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="text-xs h-9 flex items-center gap-1 px-3.5 font-semibold bg-rebuild hover:bg-rebuild/90 text-white"
                      >
                        <span>Full Autopsy</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progressive Loading Navigation */}
          {filtered.length > displayCount && (
            <div className="p-4 sm:p-5 bg-[#FAF9F6] border-t border-ink-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <span className="text-ink-600">
                Showing <strong>{displayCount}</strong> of <strong>{filtered.length}</strong> matching dossiers
              </span>
              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDisplayCount((prev) => Math.min(prev + 48, filtered.length))}
                  className="text-xs h-9 bg-white border-ink-300 hover:bg-ink-100 font-semibold"
                >
                  Load 48 More Dossiers ↓
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDisplayCount(filtered.length)}
                  className="text-xs h-9 text-ink-700"
                >
                  Show All ({filtered.length})
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Regional Market Adaptation Modal */}
      {modalCompany && (
        <AdaptMarketModal
          companyName={modalCompany.name}
          companySlug={modalCompany.slug}
          originalThesis={modalCompany.teardown?.rebuildThesis ?? modalCompany.tagline}
          onClose={() => setModalCompany(null)}
        />
      )}
    </div>
  );
}
