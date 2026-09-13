import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowRight, Flame, DollarSign, Briefcase } from "lucide-react";
import CompanyLogo from "@/components/company-logo";

export interface CompanyCardData {
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
}

export default function CompanyCard({ company }: { company: CompanyCardData }) {
  const isAcquired = company.status === "ACQUIRED";

  return (
    <Link href={`/company/${company.slug}`} className="block group">
      <Card className="h-full flex flex-col justify-between border-ink-200 bg-white transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-ink-400">
        <CardHeader className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-2">
            {/* Bespoke SVG Logo / Brandmark */}
            <CompanyLogo slug={company.slug} name={company.name} size="md" />

            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              <Badge variant="outline" className="text-[11px] font-mono">
                {company.batch}
              </Badge>
              <Badge
                variant={isAcquired ? "acquired" : "inactive"}
                className="text-[10px] uppercase tracking-wider"
              >
                {company.status}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink group-hover:text-rebuild transition-colors">
              {company.name}
            </h3>
            <p className="text-xs sm:text-sm text-ink-500 font-mono mt-0.5">
              {company.industry} {company.foundedYear ? `· ${company.foundedYear}` : ""}
              {company.closedYear ? `–${company.closedYear}` : ""}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between">
          <p className="text-sm sm:text-[15px] text-ink-800 line-clamp-2 leading-relaxed mb-4 font-sans">
            {company.tagline}
          </p>

          <div className="pt-3 border-t border-ink-100/80 space-y-2.5">
            {company.capitalBurned && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-ink-700">
                <Flame className="w-3.5 h-3.5 text-destructive shrink-0" />
                <span>Burned: <strong className="text-ink-900">{company.capitalBurned}</strong></span>
              </div>
            )}

            {company.fatalFlawSummary && (
              <p className="text-xs sm:text-sm text-ink-600 line-clamp-3 italic leading-relaxed">
                "{company.fatalFlawSummary}"
              </p>
            )}

            <div className="pt-2 flex items-center justify-between text-sm font-semibold text-ink group-hover:text-rebuild">
              <span>Read Full Autopsy</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
