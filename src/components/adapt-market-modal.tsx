"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Globe2,
  Check,
  Sparkles,
  X,
  Terminal,
  Loader2,
  Copy,
  Coins,
} from "lucide-react";

interface AdaptMarketModalProps {
  companyName: string;
  companySlug: string;
  originalThesis: string;
  onClose: () => void;
}

export default function AdaptMarketModal({
  companyName,
  companySlug,
  originalThesis,
  onClose,
}: AdaptMarketModalProps) {
  const [targetMarket, setTargetMarket] = useState<"eg" | "gcc">("eg");
  const [customStack, setCustomStack] = useState("");
  const [loading, setLoading] = useState(false);
  const [adaptedPrompt, setAdaptedPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setAdaptedPrompt(null);

    // Call FreeLLMAPI or simulated fast regional template adaptation
    setTimeout(() => {
      if (targetMarket === "eg") {
        setAdaptedPrompt(
          `# GOAL: Rebuild Lean ${companyName} for Egyptian Market (EGP / Cash-Flow Positive)
## MARKET CONTEXT: Cairo & Giza Micro-Businesses & Franchises
- Payment Gateway: Paymob (Cards + Mobile Wallets: Vodafone Cash, Orange Money, InstaPay)
- Pricing Anchor: 499 EGP / month (Self-serve tier) + 50 EGP per successful transaction
- Communication Layer: WhatsApp Business Cloud API (Over 90% of Egyptian business is conducted via WhatsApp)
- Localized Anti-Pattern Avoidance: Do not rely on email notification funnels; use instant WhatsApp automated templates.

## TECH STACK
- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Backend: Supabase / PostgreSQL with Prisma ORM
- Payments: Paymob Accept SDK (HMAC webhook verification)
- Messaging: Meta WhatsApp Cloud API

## REBUILD PRISMA SEAMS
model EgyptMerchant {
  id              String   @id @default(cuid())
  businessName    String
  ownerPhone      String   @unique
  nationalId      String?
  walletNumber    String?  // Vodafone Cash / InstaPay handle
  subscriptionTier String  @default("STARTER_EGP")
  createdAt       DateTime @default(now())
}

## 1-SHOT AGENT TICKETS FOR CURSOR
- [ ] Task 1: Setup Prisma schema with EgyptMerchant and transaction logging
- [ ] Task 2: Implement Paymob callback route at /api/webhooks/paymob
- [ ] Task 3: Setup WhatsApp notification service for instant candidate/order pings
- [ ] Task 4: Build mobile-first Arabic/English bilingual dashboard`
        );
      } else {
        setAdaptedPrompt(
          `# GOAL: Rebuild Lean ${companyName} for Saudi Arabia & GCC Market (SAR Anchor)
## MARKET CONTEXT: Riyadh, Jeddah & GCC Enterprises
- Payment Gateway: Mada, Apple Pay, and Tamara / Tabby (Split payment) via Tap Payments / Moyasar
- Compliance: ZATCA Phase 2 E-Invoicing (Fatoora QR codes & XML cryptostamps)
- Pricing Anchor: 149 SAR / month (Self-serve SMB) to 499 SAR / month (Enterprise)
- Language: Modern Standard Arabic-first with English locale switch

## TECH STACK
- Frontend: Next.js 14 (App Router) with RTL (dir="rtl") support
- Backend: PostgreSQL with Prisma ORM
- Payments: Moyasar / Tap Payments API
- Compliance: zatca-xml e-invoice generation library

## 1-SHOT AGENT TICKETS FOR CURSOR
- [ ] Task 1: Initialize RTL-compatible Tailwind theme and Next.js layout
- [ ] Task 2: Implement Moyasar Mada/Apple Pay webhook verification
- [ ] Task 3: Build automated ZATCA QR code generation for tax invoices
- [ ] Task 4: Setup SMS OTP verification using Unifonic / Twilio Saudi sender ID`
        );
      }
      setLoading(false);
    }, 900);
  };

  const handleCopy = () => {
    if (!adaptedPrompt) return;
    navigator.clipboard.writeText(adaptedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-sm border border-ink-300 bg-white p-6 shadow-xl space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 text-ink-400 hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div>
          <Badge variant="rebuild" className="text-[10px] font-mono mb-1">
            FreeLLMAPI Regional Adapter
          </Badge>
          <h3 className="font-display text-xl font-bold text-ink">
            Adapt {companyName} Blueprint for Local Markets
          </h3>
          <p className="text-xs text-ink-600 mt-1">
            Generate an instant, localized rebuild specification adapted for regional payments,
            currency anchors, and market constraints.
          </p>
        </div>

        {/* Market Selection */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-ink-600 block">
            Target Regional Market:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTargetMarket("eg")}
              className={`p-3 rounded border text-left transition-all ${
                targetMarket === "eg"
                  ? "border-rebuild bg-rebuild-light/60 font-semibold"
                  : "border-ink-200 hover:border-ink-400 bg-white"
              }`}
            >
              <span className="block text-sm font-sans text-ink">Egypt Edition</span>
              <span className="text-[11px] font-mono text-ink-500">
                Paymob · InstaPay · WhatsApp Bots · EGP Anchors
              </span>
            </button>

            <button
              onClick={() => setTargetMarket("gcc")}
              className={`p-3 rounded border text-left transition-all ${
                targetMarket === "gcc"
                  ? "border-rebuild bg-rebuild-light/60 font-semibold"
                  : "border-ink-200 hover:border-ink-400 bg-white"
              }`}
            >
              <span className="block text-sm font-sans text-ink">Saudi & GCC Edition</span>
              <span className="text-[11px] font-mono text-ink-500">
                Mada · Apple Pay · ZATCA E-Invoicing · SAR Anchors
              </span>
            </button>
          </div>
        </div>

        {/* Action button */}
        {!adaptedPrompt && (
          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-11 text-xs font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Regional Rebuild Spec...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Localized Rebuild Blueprint
              </>
            )}
          </Button>
        )}

        {/* Output Window */}
        {adaptedPrompt && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-rebuild font-bold">
                ✓ Localized Spec Generated (Ready for Cursor)
              </span>
              <Button
                variant={copied ? "default" : "primary"}
                size="sm"
                onClick={handleCopy}
                className="text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1.5 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Adapted Prompt
                  </>
                )}
              </Button>
            </div>

            <pre className="p-4 bg-ink-900 text-ink-100 rounded text-xs font-mono max-h-[300px] overflow-y-auto leading-relaxed border border-ink-800">
              <code>{adaptedPrompt}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
