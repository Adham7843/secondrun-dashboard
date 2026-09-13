"use client";

import { useState, useMemo, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CompanyCard, { CompanyCardData } from "@/components/company-card";
import { Search, SlidersHorizontal, RefreshCw, Skull, Sparkles } from "lucide-react";

interface FilterBarProps {
  companies: CompanyCardData[];
}

export default function FilterBar({ companies }: FilterBarProps) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("ALL");
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");

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

  const industryScrollRef = useRef<HTMLDivElement>(null);
  const batchScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <Input
            placeholder="Search by name, industry, or fatal flaw..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-ink-300 text-sm h-11"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-400 hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Count Pill */}
        <div className="text-xs font-mono text-ink-600 bg-white border border-ink-200 px-3 py-2.5 rounded-md flex items-center gap-2 self-start sm:self-auto">
          <span>Showing: <strong className="text-ink">{filtered.length}</strong> of {companies.length} dossiers</span>
        </div>
      </div>

      {/* Filter Category Pills with Arrow Controls & Hidden Scrollbar */}
      <div className="p-3.5 sm:p-4 bg-[#FAF9F6] border border-ink-200/80 rounded-sm space-y-3">
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

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-ink-300 bg-white/50 rounded-lg p-8">
          <Skull className="w-8 h-8 text-ink-400 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-ink">No matching autopsies found</h3>
          <p className="text-sm text-ink-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or resetting batch and industry filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("");
              setSelectedIndustry("ALL");
              setSelectedBatch("ALL");
            }}
            className="mt-4"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-2" /> Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
