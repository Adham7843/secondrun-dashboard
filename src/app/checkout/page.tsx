import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock } from "lucide-react";
import WhopCheckout from "@/components/whop-checkout";

/**
 * Dedicated checkout page: order summary left, Whop embedded gateway right.
 * Buyer pays here and never leaves this page.
 */
export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <div className="text-center space-y-2">
        <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider text-ink-600">
          Secure Checkout · Instant Delivery
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
          SecondRun All-Access — $49 one-time
        </h1>
        <p className="text-sm text-ink-600">
          1,200+ failure dossiers + 5 rebuild blueprints each. Yours forever.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-2 p-5 bg-[#FAF9F6] border border-ink-200 rounded-sm space-y-3 text-xs sm:text-sm">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500 font-bold block">
            Order summary
          </span>
          <div className="flex justify-between border-b border-ink-200/70 pb-2">
            <span className="text-ink-700">Lifetime Pass</span>
            <strong className="text-ink">$49.00</strong>
          </div>
          <div className="flex justify-between border-b border-ink-200/70 pb-2">
            <span className="text-ink-700">Recurring fees</span>
            <strong className="text-rebuild">$0 — never</strong>
          </div>
          <div className="flex justify-between text-sm sm:text-base pt-1">
            <span className="font-semibold text-ink">Due today</span>
            <strong className="font-display text-xl text-ink">$49.00</strong>
          </div>
          <p className="text-[11px] font-mono text-ink-500 leading-relaxed flex items-start gap-1.5 pt-1">
            <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Digital delivery, no refunds once accessed ({" "}
              <Link href="/terms" className="underline hover:text-ink">
                Terms
              </Link>
              ).
            </span>
          </p>
          <p className="text-[11px] font-mono text-ink-500 leading-relaxed flex items-start gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>License key + vault access link emailed instantly after payment.</span>
          </p>
        </div>

        <div className="md:col-span-3">
          <WhopCheckout
            planId={process.env.NEXT_PUBLIC_WHOP_PLAN_ID ?? ""}
            priceLabel="$49 one-time"
          />
        </div>
      </div>
    </div>
  );
}
