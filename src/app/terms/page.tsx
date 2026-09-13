import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldAlert, FileText, AlertTriangle, Lock } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Anti-Refund Policy | SecondRun",
  description: "Terms of service, fair use legal disclaimers, CFAA anti-scraping policy, and digital goods no-refund waiver for SecondRun.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-xs font-mono text-ink-500 hover:text-ink transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover:-translate-x-1" />
          Back to Graveyard Archive
        </Link>
      </div>

      <div className="border-b border-ink-200 pb-6 space-y-2">
        <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest text-ink-600">
          Legal Framework & Governance
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
          Terms of Service & Licensing Agreement
        </h1>
        <p className="text-xs font-mono text-ink-500">
          Last Updated: September 13, 2026 · Effective Immediately for All Registered Accounts
        </p>
      </div>

      {/* Critical Legal Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-ink-200 rounded-sm space-y-1.5">
          <span className="font-mono text-[11px] font-bold text-rebuild uppercase flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-rebuild" /> Strictly No Refunds
          </span>
          <p className="text-xs text-ink-600 leading-relaxed">
            All sales are final upon granting immediate access to proprietary prompts, schemas, and research.
          </p>
        </div>

        <div className="p-4 bg-white border border-ink-200 rounded-sm space-y-1.5">
          <span className="font-mono text-[11px] font-bold text-ink uppercase flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-ink" /> Fair Use Commentary
          </span>
          <p className="text-xs text-ink-600 leading-relaxed">
            Historical analysis & forensic engineering research conducted under 17 U.S.C. § 107.
          </p>
        </div>

        <div className="p-4 bg-white border border-ink-200 rounded-sm space-y-1.5">
          <span className="font-mono text-[11px] font-bold text-orange-600 uppercase flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" /> Non-Advisory Status
          </span>
          <p className="text-xs text-ink-600 leading-relaxed">
            SecondRun provides technical productivity templates, not formal legal, financial, or tax counsel.
          </p>
        </div>
      </div>

      {/* Full Legal Text */}
      <div className="prose prose-sm max-w-none text-ink-800 space-y-8 bg-white border border-ink-200 p-6 sm:p-10 rounded-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2">
            1. Acceptance of Terms & Digital Goods Waiver
          </h2>
          <p className="text-xs text-ink-700 leading-relaxed">
            By accessing or subscribing to SecondRun (&quot;the Service&quot;, &quot;we&quot;, &quot;us&quot;), purchasing the All-Access Lifetime Pass, or utilizing any proprietary AI prompts, architectural blueprints, or autopsy datasets, you agree to be bound by these Terms of Service. If you do not agree to these terms, you are strictly prohibited from accessing the subscriber intelligence desk or downloading repository files.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            2. Strict All-Sales-Final & No-Refund Policy
          </h2>
          <div className="p-4 bg-[#FFF8F7] border border-destructive/20 rounded text-xs text-ink-800 space-y-2">
            <p className="font-semibold text-destructive uppercase tracking-wide font-mono text-[11px]">
              Express Waiver of Right of Withdrawal (US FTC & EU Consumer Rights Directive):
            </p>
            <p className="leading-relaxed">
              Due to the immediate digital delivery and irreversible nature of proprietary software blueprints, code templates, Python scrapers, and research dossiers, <strong>all purchases of the SecondRun All-Access Lifetime Pass are strictly final and non-refundable</strong> once payment is completed and digital access is provisioned.
            </p>
            <p className="leading-relaxed">
              By initiating checkout, you expressly acknowledge and agree that digital asset delivery begins immediately upon payment, and you thereby waive any statutory right of cancellation, withdrawal, or refund.
            </p>
            <p className="leading-relaxed">
              Our servers maintain cryptographic access audit logs recording user session timestamps, IP addresses, and blueprint copy actions. In the event of a fraudulent bank dispute or chargeback claiming &quot;unauthorized access&quot; or &quot;item not received&quot;, these audit logs and signed waiver agreements will be provided as conclusive rebuttal evidence.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2">
            3. Fair Use, Trademark & Historical Commentary Disclaimer
          </h2>
          <p className="text-xs text-ink-700 leading-relaxed">
            SecondRun is an independent forensic publication. All company names, brand marks, logos, and registered trademarks referenced throughout the platform (including, but not limited to, Y Combinator, Atrium, HigherMe, Shipwise, LunchBadger, Pebble, Rdio, Spotify, Clerky, Carta, and others) remain the sole exclusive property of their respective trademark holders.
          </p>
          <p className="text-xs text-ink-700 leading-relaxed">
            The presentation of historical startup shutdown data, financial metrics, and architectural post-mortems constitutes transformative educational commentary, historical journalism, and software engineering analysis protected under the Fair Use doctrine of the United States Copyright Act (17 U.S.C. § 107). SecondRun is not affiliated with, sponsored by, or endorsed by Y Combinator or any evaluated startup entity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2">
            4. Non-Legal & Non-Financial Advice Disclaimer
          </h2>
          <p className="text-xs text-ink-700 leading-relaxed">
            SecondRun provides software engineering frameworks, automated document templates, and system architectural specifications. <strong>SecondRun is not a law firm, investment advisor, accounting firm, or registered broker-dealer.</strong>
          </p>
          <p className="text-xs text-ink-700 leading-relaxed">
            Nothing published within our autopsies, rebuild blueprints, contract clause prompts, or cap table schemas constitutes legal, financial, tax, or securities advice. You assume complete responsibility for independently verifying all generated code, terms, and agreements with certified legal and financial practitioners before deploying to production or issuing equity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2">
            5. Anti-Scraping & CFAA Automated Protection
          </h2>
          <p className="text-xs text-ink-700 leading-relaxed">
            You agree not to employ automated scripts, headless crawlers, scrapers, data-mining algorithms, or mirror networks to systematically harvest, extract, or redistribute the proprietary autopsies, prompts, or databases published by SecondRun.
          </p>
          <p className="text-xs text-ink-700 leading-relaxed">
            Any unauthorized scraping, bulk mirroring, reselling of prompt dossiers, or sharing of subscriber credentials constitutes a material breach of this agreement and a violation of the Computer Fraud and Abuse Act (18 U.S.C. § 1030), subjecting the violating party to immediate account revocation, IP blacklisting, and statutory damages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2">
            6. Commercial License to Rebuild & Deploy
          </h2>
          <p className="text-xs text-ink-700 leading-relaxed">
            Upon purchasing the All-Access Lifetime Pass, you are granted a perpetual, non-exclusive, worldwide commercial license to use the generated architectural schemas, code patterns, and prompts to build, deploy, and monetize your own independent software applications and SaaS businesses, without payment of ongoing royalties to SecondRun.
          </p>
        </section>
      </div>
    </div>
  );
}
