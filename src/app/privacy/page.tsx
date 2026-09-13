import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldCheck, Lock, EyeOff } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | SecondRun",
  description: "Privacy policy, data protection, zero-data-selling guarantee, and GDPR/CCPA compliance for SecondRun.",
};

export default function PrivacyPage() {
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
          Data Governance & Privacy
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-ink-500">
          Last Updated: September 13, 2026 · Compliant with GDPR, CCPA, and Global Privacy Standards
        </p>
      </div>

      {/* Core Privacy Commitments */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-ink-200 rounded-sm space-y-1.5">
          <span className="font-mono text-[11px] font-bold text-rebuild uppercase flex items-center gap-1.5">
            <EyeOff className="w-3.5 h-3.5 text-rebuild" /> We Never Sell Data
          </span>
          <p className="text-xs text-ink-600 leading-relaxed">
            Your email, account credentials, and search queries are never monetized, rented, or shared with data brokers.
          </p>
        </div>

        <div className="p-4 bg-white border border-ink-200 rounded-sm space-y-1.5">
          <span className="font-mono text-[11px] font-bold text-ink uppercase flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-ink" /> Minimal Collection
          </span>
          <p className="text-xs text-ink-600 leading-relaxed">
            We only store the bare minimum required to provision your lifetime access and verify payment receipts.
          </p>
        </div>

        <div className="p-4 bg-white border border-ink-200 rounded-sm space-y-1.5">
          <span className="font-mono text-[11px] font-bold text-rebuild uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-rebuild" /> Tokenized Billing
          </span>
          <p className="text-xs text-ink-600 leading-relaxed">
            Payment card details are processed directly by Stripe via PCI-DSS Level 1 tokenization. We never touch credit cards.
          </p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="prose prose-sm max-w-none text-ink-800 space-y-8 bg-white border border-ink-200 p-6 sm:p-10 rounded-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2">
            1. Information We Collect
          </h2>
          <p className="text-xs text-ink-700 leading-relaxed">
            When you register an account or purchase an All-Access Lifetime Pass, we collect:
          </p>
          <ul className="list-disc pl-5 text-xs text-ink-700 space-y-1">
            <li><strong>Authentication Data:</strong> Your name and email address provided during signup or OAuth authentication.</li>
            <li><strong>Transaction Metadata:</strong> Stripe Customer ID, payment timestamps, and transaction IDs (payment card numbers are processed directly by Stripe).</li>
            <li><strong>Operational Audit Logs:</strong> Cryptographic timestamps and IP addresses recorded when accessing or copying proprietary blueprints to prevent fraudulent chargebacks.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-xs text-ink-700 leading-relaxed">
            Your data is strictly used to:
          </p>
          <ul className="list-disc pl-5 text-xs text-ink-700 space-y-1">
            <li>Provision and authenticate your lifetime access to the subscriber intelligence desk.</li>
            <li>Send receipt confirmations, critical security updates, and the weekly forensic autopsy dispatch.</li>
            <li>Protect our intellectual property and prevent automated scraping or unauthorized credential sharing.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink border-b border-ink-100 pb-2">
            3. Your Rights (GDPR & CCPA)
          </h2>
          <p className="text-xs text-ink-700 leading-relaxed">
            Regardless of your geographic location, you retain full rights to request an export of your personal account data or request complete account deletion (&quot;Right to be Forgotten&quot;) by contacting our privacy officer.
          </p>
        </section>
      </div>
    </div>
  );
}
