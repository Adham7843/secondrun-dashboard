import Link from "next/link";
import { Lock, ShieldCheck, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl text-ink">SecondRun</span>
              <span className="text-xs font-mono uppercase bg-ink text-white px-2 py-0.5">Vol 1.0</span>
            </div>
            <p className="text-sm text-ink-600 max-w-sm leading-relaxed">
              The post-mortem intelligence archive for dead startups. Learn why they failed,
              understand the fatal unit-economic mistakes, and grab the 10-section Anti-Death rebuild prompts.
            </p>
            <p className="text-xs font-mono text-ink-400">
              © {new Date().getFullYear()} SecondRun Intelligence. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-ink-500 tracking-wider mb-3">Database</h4>
            <ul className="space-y-2 text-sm text-ink-700">
              <li><Link href="/" className="hover:text-rebuild">Browse Graveyard</Link></li>
              <li><Link href="/dashboard" className="hover:text-rebuild">Subscriber Desk</Link></li>
              <li><Link href="/pricing" className="hover:text-rebuild font-semibold text-rebuild">Lifetime Pass ($49)</Link></li>
              <li><Link href="/login" className="hover:text-rebuild">Founder Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-ink-500 tracking-wider mb-3">Governance & Legal</h4>
            <ul className="space-y-2 text-sm text-ink-700">
              <li>
                <Link href="/terms" className="hover:text-rebuild flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-ink-500" />
                  <span>Terms &amp; No-Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-rebuild flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-ink-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms#fair-use" className="hover:text-rebuild flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-ink-500" />
                  <span>Fair Use 17 U.S.C. § 107</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Fair Use & Non-Advisory Shield Banner */}
        <div className="pt-6 border-t border-ink-100 text-[11px] font-mono text-ink-500 leading-relaxed space-y-1.5">
          <p>
            <strong>LEGAL &amp; FAIR USE NOTICE:</strong> All company names, logos, trademarks, and registered marks mentioned are the exclusive property of their respective holders. SecondRun is an independent forensic research publication. Post-mortems, failure analyses, and rebuild blueprints are prepared strictly under the Fair Use doctrine (17 U.S.C. § 107) for transformative historical analysis and software engineering commentary.
          </p>
          <p>
            <strong>DISCLAIMER:</strong> SecondRun does not provide legal, financial, accounting, or investment advice. Blueprints, schemas, and contract prompts are starting-point templates provided for software engineering evaluation only. Consult qualified counsel before entering commercial transactions.
          </p>
        </div>
      </div>
    </footer>
  );
}
