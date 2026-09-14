"use client";

import { useState } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { CheckCircle2 } from "lucide-react";

/**
 * FRONTEND checkout: Whop embedded gateway. The buyer never leaves this page.
 * planId comes from NEXT_PUBLIC_WHOP_PLAN_ID (per-FRONTEND, per-price).
 */
export default function WhopCheckout({
  planId,
  priceLabel,
}: {
  planId: string;
  priceLabel: string;
}) {
  const [completed, setCompleted] = useState(false);

  if (!planId) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs font-mono text-amber-800">
        Checkout is being connected — please check back shortly.
      </div>
    );
  }

  if (completed) {
    return (
      <div className="p-6 sm:p-8 bg-[#141416] text-center rounded-sm border-2 border-rebuild space-y-3">
        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          Payment complete — vault key incoming
        </h3>
        <p className="text-xs sm:text-sm text-ink-300 leading-relaxed max-w-md mx-auto">
          Your All-Access Pass ({priceLabel}) is confirmed. Your license key and
          one-click dashboard access link are on the way to your inbox now.
        </p>
        <p className="text-[11px] font-mono text-ink-500">
          Keep your Whop receipt — its license key is your permanent proof of purchase.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-ink-200 rounded-sm p-2 sm:p-4">
      <WhopCheckoutEmbed
        planId={planId}
        skipRedirect
        themeOptions={{ accentColor: "#C2410C" }}
        onComplete={() => setCompleted(true)}
      />
    </div>
  );
}
