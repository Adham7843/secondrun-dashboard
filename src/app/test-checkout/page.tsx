import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import WhopCheckout from "@/components/whop-checkout";

export const metadata: Metadata = {
  title: "Test Checkout — SecondRun",
  robots: { index: false, follow: false },
};

// UNLISTED test page: $0 Whop test plan. Not linked from anywhere, noindexed.
// Used to verify embed + onComplete against a real Whop transaction for free.
const TEST_PLAN_ID = "plan_5qTDHa1gymzIQ";

export default function TestCheckoutPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider text-ink-600">
          Internal Test — $0, No Charge
        </Badge>
        <h1 className="font-display text-3xl font-bold text-ink">
          Checkout Test Bench
        </h1>
        <p className="text-sm text-ink-600">
          Completes a real $0 Whop transaction to verify embed + success flow.
        </p>
      </div>
      <WhopCheckout planId={TEST_PLAN_ID} priceLabel="$0 test" />
    </div>
  );
}
