import { RebuildPromptItem } from "@/components/prompt-suite-viewer";

export interface MasterPromptSection {
  id: string;
  title: string;
  category: "context" | "autopsy" | "competition" | "rules" | "tech" | "frontend" | "gtm" | "pricing" | "retention" | "tickets";
  content: string;
}

export interface RebuildMasterDossier {
  companyName: string;
  fullPrompt: string;
  wordCount: number;
  lineCount?: number;
  sections: MasterPromptSection[];
  prompts: RebuildPromptItem[];
}

interface CompanyLike {
  name: string;
  slug: string;
  industry: string;
  batch?: string | null;
  tagline?: string | null;
  capitalBurned?: string | null;
  foundedYear?: number | null;
  closedYear?: number | null;
}

interface TeardownLike {
  overview?: string | null;
  fatalFlaw?: string | null;
  rebuildThesis?: string | null;
  businessModel?: string | null;
  agentPrompt?: string | null;
  antiPatterns?: string | null;
}

/**
 * Builds the comprehensive 10-section Anti-Death Master Rebuild Prompt.
 * Incorporates deep competitor study, failure mechanics, hard negative engineering constraints,
 * full Prisma domain models, and progressive TDD implementation tickets.
 */
export function getPromptSuite(
  company: CompanyLike,
  teardown?: TeardownLike | null
): RebuildPromptItem[] {
  const master = getMasterDossier(company, teardown);
  return master.prompts;
}

export function getMasterDossier(
  company: CompanyLike,
  teardown?: TeardownLike | null
): RebuildMasterDossier {
  const name = company.name;
  const slug = company.slug;
  const industry = company.industry || "B2B SaaS";
  const capital = company.capitalBurned || "$10M+";
  const batch = company.batch || "Venture Archive";
  const activeYears = `${company.foundedYear ?? 2016}–${company.closedYear ?? 2021}`;

  const fatalFlaw =
    teardown?.fatalFlaw ||
    "High human sales overhead and manual services disguised as software, leading to catastrophic customer acquisition costs.";
  const thesis =
    teardown?.rebuildThesis ||
    `Rebuild ${name} as a 100% self-serve, automated micro-SaaS with zero human service bottlenecks and instant time-to-value.`;
  const antiPatterns = teardown?.antiPatterns
    ? (JSON.parse(teardown.antiPatterns) as string[])
    : [
        "Hiring salaried practitioners before software automation achieved product-market fit.",
        "Subsidizing bespoke human services with venture capital instead of building scalable software.",
        "Building a high-touch sales rep pipeline instead of a frictionless self-serve checkout funnel.",
      ];

  // Competitor profiles & asymmetric attack wedges by company/industry
  let competitorsInfo = `
- Incumbent 1: Clerky (Rigid, charges $500+ per document, zero contract review, outdated 2012 interface).
- Incumbent 2: Carta (Expensive $3,000–$10,000/yr pricing, aggressive sales reps, recent customer data scandals).
- Incumbent 3: Cooley GO / Orrick (Static PDF templates designed strictly as lead magnets to charge $1,000/hr legal partner rates).
- Incumbent 4: Ironclad / ContractPodAI (Enterprise only: $25,000–$100,000 ACV, totally inaccessible for startups).`;

  let competitorWedge = `
- The Asymmetric Attack Wedge: Combine instant SAFE generation, automated cap table management, and AI contract redlining into a single $49/month self-serve platform.
- Why Customers Will Switch: No $20k retainers, no waiting 5 business days for a junior lawyer to review an NDA, zero human sales friction.
- Competitor Search Hijack Strategy: Target high-intent queries ("Clerky alternative", "Carta pricing too high", "how to draft a SAFE without a lawyer") and scrape G2/Capterra 1-star reviews to pinpoint frustrated founders.`;

  if (slug === "fast" || industry.toLowerCase().includes("checkout") || industry.toLowerCase().includes("fintech")) {
    competitorsInfo = `
- Incumbent 1: Shop Pay (Monopolized by Shopify, completely unavailable for custom or WooCommerce storefronts).
- Incumbent 2: Bolt (Aggressive enterprise sales contracts, high transaction fees, merchant onboarding friction).
- Incumbent 3: Stripe Checkout (Standard hosted redirect that knocks users off the merchant's domain, lowering conversion).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: Open-source headless 1-click checkout SDK for WooCommerce, Magento, and custom React storefronts with 0% processing markup.
- Why Customers Will Switch: Keeps shoppers directly on the merchant's domain, eliminates 14-field forms, and drops cart abandonment by 35% without vendor lock-in.
- Competitor Search Hijack Strategy: Target "Shop Pay for WooCommerce", "Bolt alternative without contract", "reduce cart abandonment self-serve".`;
  } else if (slug === "pebble" || industry.toLowerCase().includes("hardware") || industry.toLowerCase().includes("wearable")) {
    competitorsInfo = `
- Incumbent 1: Apple Watch ($399+, battery dies in 18 hours, locked to iPhone ecosystem, bloated notification alerts).
- Incumbent 2: Garmin ($400–$900, bulky fitness aesthetic, intimidating UI for casual productivity users).
- Incumbent 3: Withings ($200–$350, hybrid analog face with minimal customizable productivity screen).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: Open-source, hackable e-paper productivity wearable with 14-day battery life, zero app subscriptions, and open Bluetooth/HTTP webhooks.
- Why Customers Will Switch: True 14-day battery, readable in bright sunlight, works seamlessly on both Android and iOS, fully programmable via TypeScript SDK.
- Competitor Search Hijack Strategy: Target "Apple Watch 1-day battery annoyance", "open source smartwatch 2026", "e-paper productivity watch".`;
  } else if (slug === "scalefactor" || industry.toLowerCase().includes("accounting") || industry.toLowerCase().includes("bookkeep")) {
    competitorsInfo = `
- Incumbent 1: Pilot.com ($500–$1,500/mo, relies on offshore human bookkeepers who take 3 weeks to close monthly books).
- Incumbent 2: QuickBooks Live ($300–$700/mo, frustrating phone support, frequent categorization errors).
- Incumbent 3: Bench.co ($350–$600/mo, closed proprietary ledger that traps your financial history upon cancellation).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: Autonomous deterministic Plaid webhook reconciliation engine that extracts receipts and syncs double-entry ledgers in real-time for $79/mo flat.
- Why Customers Will Switch: Real-time book closing (same day, not day 25 of next month), zero human error, exportable to standard CSV/Excel anytime.
- Competitor Search Hijack Strategy: Target "Pilot bookkeeping errors", "Bench alternative open ledger", "automated bookkeeping without human CPAs".`;
  } else if (slug === "rdio" || industry.toLowerCase().includes("audio") || industry.toLowerCase().includes("streaming")) {
    competitorsInfo = `
- Incumbent 1: Spotify ($11.99/mo, cluttered with non-skippable podcast ads, algorithmic autoplay homogenizing music taste).
- Incumbent 2: Apple Music ($10.99/mo, clunky desktop application, closed ecosystem).
- Incumbent 3: Tidal ($10.99/mo, confusing tier transitions, weak social discovery features).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: Minimalist, decentralized lossless audio streaming client linking directly to indie artist RSS/Bandcamp feeds with direct micro-patronage.
- Why Customers Will Switch: 100% focused on pure music listening, stark typography, zero algorithmic podcast bloat, 90% of subscription goes directly to listened artists.
- Competitor Search Hijack Strategy: Target "Spotify UI is ruined", "clean minimalist music player", "Audius Bandcamp indie music player".`;
  } else if (slug === "higherme" || industry.toLowerCase().includes("hiring") || industry.toLowerCase().includes("hr")) {
    competitorsInfo = `
- Incumbent 1: Workstream ($200–$500/month per store location, clunky desktop dashboard managers never check).
- Incumbent 2: Fountain (Complex enterprise ATS targeting high-volume gig economy, $15k+ annual commitments).
- Incumbent 3: Harri (Bloated hospitality platform with slow onboarding and heavy sales calls).
- Incumbent 4: Paradox / Olivia (High-cost conversational AI targeting Fortune 500 enterprise).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: 100% WhatsApp/SMS AI screening agent for $49/mo per store. Zero app to download.
- Why Customers Will Switch: Restaurant managers hire from their phones. Candidates answer 3 questions via WhatsApp voice note; AI scores and schedules directly on Google Calendar.
- Competitor Search Hijack Strategy: Target high-intent queries ("Workstream alternative", "hourly hiring without recruiters", "restaurant applicant tracking") and scrape Reddit /r/restaurateur for hiring complaints.`;
  } else if (slug === "shipwise" || slug === "shyp" || industry.toLowerCase().includes("logistics") || industry.toLowerCase().includes("shipping") || industry.toLowerCase().includes("delivery")) {
    competitorsInfo = `
- Incumbent 1: ShipStation (Clunky legacy UI, subscription fees plus carrier surcharges, slow support).
- Incumbent 2: Shippo (Good API, but charges per-label fees that eat into high-volume ecommerce margins).
- Incumbent 3: EasyPost (Pure developer API with no modern merchant dashboard or rate arbitrage).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: Zero-markup multi-carrier rate arbitrage engine with 1-click Shopify/WooCommerce install and automated customs duty calculation.
- Why Customers Will Switch: Saves 15–30% on shipping labels instantly with zero setup fees and zero courier overhead.
- Competitor Search Hijack Strategy: Target "ShipStation hidden fees", "cheapest shipping software for Shopify", "Shippo alternative".`;
  } else if (slug === "lunchbadger" || industry.toLowerCase().includes("developer") || industry.toLowerCase().includes("api")) {
    competitorsInfo = `
- Incumbent 1: Kong Gateway (Complex Kubernetes-heavy deployment, steep Lua plugin learning curve).
- Incumbent 2: Tyk (Expensive on-prem enterprise licenses, heavy ops overhead).
- Incumbent 3: Apigee (Google Cloud enterprise pricing starting at $10k+/year).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: Zero-DevOps, serverless edge API gateway deployed to Cloudflare Workers in 30 seconds for $29/month.
- Why Customers Will Switch: No Kubernetes clusters to maintain, instant rate-limiting, and visual canvas workflow.
- Competitor Search Hijack Strategy: Target "Kong too complex", "serverless API gateway alternative", "lightweight microservice gateway".`;
  } else if (slug === "eden" || industry.toLowerCase().includes("workplace") || industry.toLowerCase().includes("facility")) {
    competitorsInfo = `
- Incumbent 1: Envoy (Dominates visitor check-in, but charges $300–$1,000/mo per location with aggressive annual contracts).
- Incumbent 2: Robin Powered (Desk booking and meeting room scheduling with complex enterprise licensing).
- Incumbent 3: Officely (Slack-integrated desk booking with limited building management features).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: Lightweight QR-code desk booking and automated visitor badge bot inside Slack/Teams for $39/mo flat per office.
- Why Customers Will Switch: Zero iPad hardware lock-in, zero annual contracts, self-serve setup in 3 minutes.
- Competitor Search Hijack Strategy: Target "Envoy workplace pricing alternative", "cheapest visitor management software".`;
  } else if (slug === "mailmodo" || industry.toLowerCase().includes("marketing") || industry.toLowerCase().includes("email")) {
    competitorsInfo = `
- Incumbent 1: Klaviyo (Massive market leader, but pricing escalates astronomically as contact lists grow).
- Incumbent 2: Mailchimp (Bloated feature set, frequent price increases, weak interactive email support).
- Incumbent 3: Customer.io (Powerful event-driven email, but requires dedicated engineer to configure).`;
    competitorWedge = `
- The Asymmetric Attack Wedge: Interactive AMP-email and rich inbox forms at a flat $49/mo rate with zero contact-list penalty pricing.
- Why Customers Will Switch: Collect feedback, bookings, and survey responses directly inside the email without opening a new tab.
- Competitor Search Hijack Strategy: Target "Klaviyo price increase alternative", "interactive AMP email software".`;
  }

  // --------------------------------------------------------------------------
  // ASSEMBLE THE MASTER 10-SECTION BLUEPRINT
  // --------------------------------------------------------------------------
  const fullPrompt = `# ============================================================================
# SECOND RUN REBUILD MASTER PROMPT: RESURRECTING ${name.toUpperCase()}
# INDUSTRY: ${industry.toUpperCase()} · CAPITAL BURNED: ${capital} · BATCH: ${batch}
# TARGET AGENTS: Cursor Composer / Windsurf Cascade / Claude Code / Aider
# PURPOSE: Rebuild the core value proposition of ${name} to the absolute limits
#          while strictly enforcing the "Anti-Death" negative engineering rules.
# ============================================================================

You are a Principal Software Architect, Forensic Startup Auditor, and Autonomous Venture Builder.
Your mission is to rebuild "${name}" from scratch in this workspace as a 100% automated, zero-human-headcount micro-SaaS.

==============================================================================
## § 1. TARGET IDENTITY & VALIDATED MARKET DEMAND
==============================================================================
- Company: ${name}
- Active Lifespan: ${activeYears}
- Total Venture Capital Burned: ${capital}
- Original Value Proposition: ${company.tagline || `Automated ${industry} software for modern businesses`}

### Why the Market Demand is 100% Real:
The original company did NOT die from lack of customer demand. They had passionate early adopters, significant waitlists, and validated willingness-to-pay.
The underlying customer pain point—eliminating expensive, slow, and manual ${industry} overhead—remains completely unsolved for early-stage teams and growing businesses.
Customers are currently desperate for an affordable, transparent, self-serve alternative and are overpaying legacy incumbents.

==============================================================================
## § 2. THE FORENSIC AUTOPSY: HOW THEY KILLED IT (THE DEATH TRAP)
==============================================================================
The original ${name} raised ${capital} and collapsed due to the following fatal failure mechanics:

### The Fatal Flaw:
"${fatalFlaw}"

### The CAC vs. LTV Inversion:
1. They hired expensive human specialists, practitioners, and sales reps to perform bespoke services disguised as software.
2. Customer Acquisition Cost (CAC) exploded past sustainable limits because they relied on outbound sales calls, custom demos, and high-touch account management.
3. Payback periods stretched beyond 14 months. When venture capital market conditions shifted, their burn rate wiped them out.

### The 3 Fatal Anti-Patterns They Fell Into:
1. ${antiPatterns[0] || "Hiring salaried practitioners before software automation worked."}
2. ${antiPatterns[1] || "Subsidizing expensive bespoke services with investor money."}
3. ${antiPatterns[2] || "Building high-overhead sales rep funnels instead of a frictionless self-serve checkout."}

==============================================================================
## § 3. IN-DEPTH COMPETITOR STUDY & THE VULNERABILITY MATRIX
==============================================================================
When ${name} died, the following competitors captured the remaining market share:

### The Incumbent Landscape:
${competitorsInfo}

### Competitor Vulnerability Audit (Why Customers Hate Them):
- Pricing Gouging: Incumbents charge thousands per year or bill per transaction with opaque enterprise tiers.
- Legacy Technical Debt: Most incumbent software was built 8–12 years ago. Slow page loads, complex configuration menus, and lack of modern AI capabilities.
- Gated Access: Forcing prospects through "Schedule a Demo with Sales" forms instead of allowing them to test the product immediately.

### The Asymmetric Attack Wedge:
${competitorWedge}

==============================================================================
## § 4. "ANTI-DEATH" NEGATIVE ENGINEERING GUARDRAILS (WHAT THE AGENT MUST NEVER BUILD)
==============================================================================
As the AI coding agent building this product, you MUST obey these non-negotiable negative constraints:

- RULE 1: ZERO HUMAN-IN-THE-LOOP SERVICE HEADCOUNT.
  Under NO circumstances should you build internal admin tools for human service workers, consultant booking calendars, or manual approval queues. If a workflow cannot be resolved in code or via automated LLM reasoning, DO NOT BUILD IT.

- RULE 2: FIXED MARGINAL COMPUTE COST (< $0.05 PER TRANSACTION).
  The predecessor burned hundreds of dollars in human labor per customer request. Our total marginal compute cost (LLM tokens, database read/write, edge execution) must stay strictly under 5 cents per run.

- RULE 3: 100% SELF-SERVE TIME-TO-VALUE (< 60 SECONDS).
  Never implement a "Contact Sales to Activate" wall. A new user must be able to authenticate, configure their parameters, and view their first live automated output in less than 60 seconds.

- RULE 4: MULTI-TENANT ISOLATION WITH ZERO LEAKAGE.
  Every query must enforce strict organization boundary scoping: \`where: { organizationId: session.user.orgId }\`. No shared memory or cross-tenant leaks.

==============================================================================
## § 5. THE 2026 CIRCUMVENTION ARCHITECTURE & COMPLETE PRISMA SCHEMA
==============================================================================
We route completely around the dead company's terminal bottleneck using modern serverless primitives:
- Framework: Next.js 14 App Router (Server Actions, Route Handlers, Edge Middleware)
- Database: PostgreSQL / SQLite with Prisma ORM
- Auth: NextAuth.js (Auth.js v5) with Multi-Tenant Organization Isolation
- Payments: Stripe Billing (Starter $49/mo, Growth $149/mo) with idempotent HMAC webhooks
- Background Queue: Inngest or Upstash QStash for reliable async tasks

### Complete Prisma Schema (prisma/schema.prisma):
\`\`\`prisma
datasource db {
  provider = "postgresql" // or "sqlite" for development
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum OrgRole {
  OWNER
  ADMIN
  MEMBER
}

enum PlanTier {
  STARTER   // $49/mo
  GROWTH    // $149/mo
  SCALE     // $499/mo
}

enum RunStatus {
  QUEUED
  PROCESSING
  COMPLETED
  FAILED
}

model User {
  id            String          @id @default(cuid())
  email         String          @unique
  name          String?
  image         String?
  memberships   OrgMembership[]
  auditLogs     AuditLog[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model Organization {
  id             String          @id @default(cuid())
  name           String
  slug           String          @unique
  planTier       PlanTier        @default(STARTER)
  stripeCustId   String?         @unique
  stripeSubId    String?         @unique
  subStatus      String          @default("INACTIVE")
  monthlyQuota   Int             @default(100)
  usedThisMonth  Int             @default(0)
  members        OrgMembership[]
  records        DomainRecord[]
  apiKeys        ApiKey[]
  auditLogs      AuditLog[]
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  @@index([slug])
}

model OrgMembership {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  userId         String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  role           OrgRole      @default(MEMBER)

  @@unique([organizationId, userId])
}

model DomainRecord {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  title          String
  status         RunStatus    @default(QUEUED)
  inputPayload   Json
  outputResult   Json?
  latencyMs      Int?
  costUsd        Float        @default(0.0)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@index([organizationId, status])
}

model ApiKey {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  keyHash        String       @unique
  prefix         String
  createdAt      DateTime     @default(now())
}

model AuditLog {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  userId         String?
  user           User?        @relation(fields: [userId], references: [id], onDelete: SetNull)
  action         String
  metadata       Json?
  createdAt      DateTime     @default(now())
}

model IdempotencyKey {
  key         String   @id
  scope       String
  createdAt   DateTime @default(now())
}
\`\`\`

### Production Route Handler (src/app/api/v1/records/route.ts):
\`\`\`typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

const InputSchema = z.object({
  title: z.string().min(2).max(100),
  payload: z.record(z.any()),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const orgId = req.headers.get("x-organization-id") || session.user.defaultOrgId;
  const org = await prisma.organization.findUnique({ where: { id: orgId } });
  if (!org || org.usedThisMonth >= org.monthlyQuota) {
    return NextResponse.json({ error: "QUOTA_EXCEEDED", message: "Upgrade plan for more runs." }, { status: 402 });
  }

  const body = await req.json();
  const parsed = InputSchema.parse(body);

  const [record] = await prisma.$transaction([
    prisma.domainRecord.create({
      data: { organizationId: org.id, title: parsed.title, inputPayload: parsed.payload, status: "QUEUED" },
    }),
    prisma.organization.update({ where: { id: org.id }, data: { usedThisMonth: { increment: 1 } } }),
  ]);

  return NextResponse.json({ success: true, record }, { status: 201 });
}
\`\`\`

==============================================================================
## § 6. FRONTEND COMPONENT TREE & USER JOURNEY WIREFRAMES
==============================================================================
- Art Direction: Linear / Modern Dark UI (#050506 canvas, 1px glassmorphic borders rgba(255, 255, 255, 0.08), deep elevated surfaces #0A0A0C, high-contrast typography, and electric indigo/emerald telemetry accents).
- Screen 1 (Subscriber Command Center): Top masthead with live system health ping, 4 vitals cards (Runs, Capital Saved vs Legacy, Latency, Quota), and a high-density interactive ledger table.
- Screen 2 (Split-Screen Workspace): 60% live document/output editor on the left with instant copy button, and 40% metadata sidebar on the right with chronological audit trail.
- Screen 3 (Quick-Action Drawer): Accessible slide-over sheet triggered by 'Cmd+K' with live execution cost estimator.

==============================================================================
## § 7. ZERO-SALES SELF-SERVE ONBOARDING & PRODUCT-LED GTM
==============================================================================
Operate with exactly 1 founder and 0 sales reps. Route completely around the predecessor's high customer acquisition costs:

### 1. Frictionless Self-Serve Funnel (60-Second Time-to-First-Value):
- Zero Sales Gates: No "Schedule a Demo", no sales reps, no discovery calls, and no manual contract negotiation.
- Interactive Sandbox: Prospects can immediately run a sample input on the landing page without even logging in.
- 1-Click Magic Link Signup: Zero friction passwordless authentication with immediate routing to their pre-configured workspace.
- Transparent Instant Billing: 14-day automated trial or instant 1-click Stripe Checkout ($49/mo).

### 2. Product-Led Organic Growth & Inbound Wedges:
- Public Diagnostic Pages: Programmatically generate benchmark audits and comparison matrices against legacy incumbents.
- Open-Source Developer Wedge: Release a lightweight open-source CLI or SDK on GitHub to build developer trust and organic adoption.
- SEO Asymmetric Attack: Target high-intent competitor comparison keywords ("${name} alternative", "${industry} without sales reps", "cheapest self-serve ${industry} tool").
- Viral Export Loop: Every generated report, artifact, or dashboard includes a discrete "Automated by Rebuild ${name}" attribution badge.

### 3. Sustainable Unit Economics (Zero Headcount Scale):
- CAC Target: Under $25 (primarily through organic search, developer tools, and programmatic content).
- Payback Period: < 30 days (instant profitability on first payment).
- Customer Support: 100% automated documentation bot with LLM triage and in-app interactive walkthroughs.

==============================================================================
## § 8. PRICING ARCHITECTURE & LOCAL MARKET ARBITRAGE
==============================================================================
- Global / US Market (Stripe):
  - Starter: $49 / month (Up to 100 runs, 1 workspace)
  - Growth: $149 / month (Up to 1,000 runs, team seats, webhook exports)
  - Pay-Per-Deal: $199 flat per transaction (Instant cash-flow positive)
- Egypt & North Africa: 999 EGP / month (~$20 USD) via Paymob/InstaPay with automated WhatsApp bot onboarding.
- Saudi Arabia & GCC: 189 SAR / month (~$50 USD) via Tap/Moyasar with ZATCA Phase 2 e-invoicing.

==============================================================================
## § 9. AUTOMATED RETENTION, CHURN RESCUE & REGULATORY ARMOR
==============================================================================
- Frictionless Onboarding: Magic link login (0 passwords), pre-seeded demo workspace, 1-click execution in < 180 seconds.
- Inactivity Churn Rescue: 10-day inactivity alert triggering an automated 1-click survey ("Need a custom integration?", "Missing feature?", or "Pause subscription for 30 days").
- Regulatory Armor: Prominent disclaimer stating the software is an automated productivity tool and does not provide bespoke professional advice, shielding the platform from regulatory liability.

==============================================================================
## § 10. PROGRESSIVE TDD IMPLEMENTATION CHECKLIST
==============================================================================
Execute the 9 atomic implementation tickets in strict chronological order with zero skipping.
`;

  const wordCount = fullPrompt.split(/\s+/).filter(Boolean).length;

  const sections: MasterPromptSection[] = [
    {
      id: "demand",
      title: "§ 1. Target Identity & Validated Demand",
      category: "context",
      content: fullPrompt.split("## § 1. TARGET IDENTITY")[1]?.split("## § 2.")[0]?.trim() || "",
    },
    {
      id: "autopsy",
      title: "§ 2. Forensic Autopsy & The Death Trap",
      category: "autopsy",
      content: fullPrompt.split("## § 2. THE FORENSIC AUTOPSY")[1]?.split("## § 3.")[0]?.trim() || "",
    },
    {
      id: "competition",
      title: "§ 3. Competitor Study & Vulnerability Matrix",
      category: "competition",
      content: fullPrompt.split("## § 3. IN-DEPTH COMPETITOR STUDY")[1]?.split("## § 4.")[0]?.trim() || "",
    },
    {
      id: "rules",
      title: "§ 4. 'Anti-Death' Negative Constraints",
      category: "rules",
      content: fullPrompt.split("## § 4. \"ANTI-DEATH\" NEGATIVE ENGINEERING")[1]?.split("## § 5.")[0]?.trim() || "",
    },
    {
      id: "tech",
      title: "§ 5. 2026 Architecture & Prisma Schema",
      category: "tech",
      content: fullPrompt.split("## § 5. THE 2026 CIRCUMVENTION ARCHITECTURE")[1]?.split("## § 6.")[0]?.trim() || "",
    },
    {
      id: "frontend",
      title: "§ 6. Frontend Wireframes & State Machine",
      category: "frontend",
      content: fullPrompt.split("## § 6. FRONTEND COMPONENT TREE")[1]?.split("## § 7.")[0]?.trim() || "",
    },
    {
      id: "gtm",
      title: "§ 7. Zero-Sales Self-Serve GTM",
      category: "gtm",
      content: fullPrompt.split("## § 7. ZERO-SALES SELF-SERVE")[1]?.split("## § 8.")[0]?.trim() || "",
    },
    {
      id: "pricing",
      title: "§ 8. Pricing & Local Market Arbitrage",
      category: "pricing",
      content: fullPrompt.split("## § 8. PRICING ARCHITECTURE")[1]?.split("## § 9.")[0]?.trim() || "",
    },
    {
      id: "retention",
      title: "§ 9. Retention, Churn Rescue & Armor",
      category: "retention",
      content: fullPrompt.split("## § 9. AUTOMATED RETENTION")[1]?.split("## § 10.")[0]?.trim() || "",
    },
    {
      id: "tickets",
      title: "§ 10. Progressive Implementation Tickets",
      category: "tickets",
      content: fullPrompt.split("## § 10. PROGRESSIVE TDD")[1]?.trim() || "",
    },
  ];

  // MODULE 2: DESIGN SYSTEM PROMPT (LINEAR / MODERN DARK UI)
  const designPrompt = `# ==============================================================================
# DESIGN SYSTEM & FRONTEND COMPONENT BLUEPRINT
# TARGET: Rebuild ${name} UI/UX
# ARCHITECTURE: Linear / Modern Dark UI (Tailwind CSS, shadcn/ui, Radix, Lucide)
# VALIDATED FOR: v0.dev, Cursor Composer, Windsurf, Claude Code
# ==============================================================================

================================================================================
CRITICAL ARCHITECTURAL MANDATE: YOU MUST DESIGN THE UNIQUE BRAND IDENTITY
================================================================================
You MUST design and invent the bespoke brand identity for this specific startup 
(bespoke logo mark geometry, color accent, typography hierarchy, and emotional tone). 
The following dark UI design tokens, component schemas, and viewports are ONLY a 
foundational structural layout canvas—THIS IS JUST A BASIC LAYOUT. 
You MUST NOT copy generic placeholders. You must elevate and skin it with the unique brand ethos.
================================================================================

## 1. DESIGN PHILOSOPHY & AESTHETIC DNA: LINEAR / MODERN DARK UI
- Vibe: Precision, depth, and cinematic fluidity. Communicates "premium developer tool"—fast, responsive, and obsessively crafted like Linear, Vercel, or Raycast.
- Background System:
  - Deep Canvas: #050506 (Deep space near-black, never pure #000000)
  - Base Background: #020203 (Deepest recessed layer)
  - Elevated Surfaces: #0A0A0C with subtle 1px border rgba(255, 255, 255, 0.08)
- Surface Cards: rgba(255, 255, 255, 0.04) with hover state rgba(255, 255, 255, 0.07)
- Typography:
  - Primary Headlines: Inter / Geist Sans (font-semibold, tracking-[-0.03em])
  - Body Text: #EDEDEF (Primary foreground) and #8A8F98 (Muted description)
  - Monospace Data: JetBrains Mono / Geist Mono for tabular telemetry and metrics
- Lighting & Accents:
  - Primary Accent: #5E6AD2 (Refined Electric Indigo) or brand-specific saturated hue
  - Accent Glow: rgba(94, 106, 210, 0.25) soft 120px blurred ambient backlight
  - Success Indicator: #10B981 (Emerald edge beacon)
  - Critical/Error: #EF4444 (Crimson telemetry alert)

## 2. CORE VIEWPORTS TO CONSTRUCT

### Viewport 1: The Subscriber Command Console (/app)
- Top Navigation Masthead: Custom SVG brandmark, workspace tenant switcher, quota consumption gauge (e.g. "42 / 100 Runs"), and live server latency beacon.
- 4 Primary Metric Cards:
  1. Total Automations Executed (Monospace counter with subtext)
  2. Estimated Capital Saved vs. Legacy Predecessor (e.g. "$4,820 Saved")
  3. Average Execution Latency (e.g. "1.2s at 99.4% SLA")
  4. Monthly Quota Utilization (Hairline progress bar with alert at >80%)
- The High-Density Working Ledger: Dark glassmorphic table with columns for ID, Title, Status badge (Queued, Running, Completed, Failed), Latency, Cost, and 1-click Action drawer.

### Viewport 2: The Split-Screen Execution Workspace (/app/workspace/[id])
- Left Pane (60%): High-focus document editor / output viewer with markdown rendering, syntax highlighting, and 1-click "Copy Clean Output" floating action pill.
- Right Pane (40%): Contextual inspector showing input parameters, execution telemetry (tokens consumed, latency in ms, compute cost in USD), and chronological audit event trail.

### Viewport 3: Quick-Action Command Palette (Cmd+K)
- Keyboard-accessible dialog for running new automations in under 60 seconds without mouse interaction.
- Form inputs with real-time Zod schema validation and live cost estimator before submitting.
`;

  // MODULE 3: AGENTS.MD DIRECTIVES
  const agentDirectivesPrompt = `# ==============================================================================
# AGENTS.md — AUTONOMOUS AGENT GOVERNANCE PROTOCOL
# TARGET: Rebuild ${name}
# VALIDATED FOR: Cursor Composer, Windsurf Cascade, Claude Code, Aider
# ==============================================================================

You are the Principal Systems Architect and Autonomous Software Builder for Rebuilding "${name}".
You must follow this governance protocol with zero deviation.

${sections[3].content}

==============================================================================
## STRICT EXECUTION RULES FOR AUTONOMOUS CODING AGENTS
==============================================================================

1. ZERO HALLUCINATED DEPENDENCIES:
   Use only standard Next.js 14 App Router, Prisma ORM, NextAuth (Auth.js v5), and Stripe SDK.
   Do not add third-party wrappers, unmaintained libraries, or unnecessary micro-SaaS dependencies.

2. ATOMIC TDD PROGRESSION:
   Never write application logic without a corresponding verification test.
   Follow the strict Red-Green-Refactor cycle. All tests must execute cleanly via \`npm test\` before proceeding to the next ticket.

3. MANDATORY MULTI-TENANT ISOLATION:
   Every Prisma query that accesses or mutates data MUST be explicitly scoped to the authenticated
   organization: \`where: { organizationId: session.user.orgId }\`. Never execute un-scoped queries that could leak cross-tenant customer records.

4. SELF-HEALING RECOVERY LOOP:
   If a test or compiler check fails:
   - Read the exact error diagnostic.
   - Inspect the file and type definitions.
   - Formulate a precise hypothesis and fix the file.
   - Never repeatedly apply the same failed edit or guess blindly.
`;

  // MODULE 4: DEEP PROGRESSIVE TDD TICKETS (POCOCK-STYLE TO-TICKETS ENGINE)
  const ticketsPrompt = `# ==============================================================================
# PROGRESSIVE TDD IMPLEMENTATION PLAN: RESURRECTING ${name.toUpperCase()}
# ARCHITECTURE: Next.js 14 App Router + Prisma + NextAuth v5 + Stripe SDK
# VALIDATED FOR: Cursor Composer, Windsurf Cascade, Claude Code, Aider
# ==============================================================================

Execute these 9 atomic engineering tickets PROGRESSIVELY, ONE BY ONE, IN STRICT CHRONOLOGICAL ORDER.
Do not begin Ticket N+1 until Ticket N passes all test assertions with zero TypeScript compiler errors.

--------------------------------------------------------------------------------
### TICKET 01: Multi-Tenant Prisma Schema & Database Singleton
--------------------------------------------------------------------------------
- Objective: Scaffold the database layer with strict tenant isolation and zero shared state.
- Target Files:
  - \`prisma/schema.prisma\`
  - \`src/lib/db.ts\`
  - \`scripts/verify-db.ts\`
- Specification:
  - Define User, Organization, OrgMembership, DomainRecord, ApiKey, AuditLog, and IdempotencyKey models.
  - Implement Prisma client singleton in \`src/lib/db.ts\` with connection pool recycling.
- Test Assertions (Vitest):
  \`\`\`typescript
  // src/tests/ticket-01-db.test.ts
  import { describe, it, expect } from "vitest";
  import { prisma } from "@/lib/db";

  describe("Ticket 01: Database Layer", () => {
    it("creates an organization and enforces unique slug", async () => {
      const org = await prisma.organization.create({
        data: { name: "Test Corp", slug: "test-corp", monthlyQuota: 100 }
      });
      expect(org.id).toBeDefined();
      await expect(
        prisma.organization.create({ data: { name: "Duplicate", slug: "test-corp" } })
      ).rejects.toThrow();
    });
  });
  \`\`\`
- Verification Command: \`npx vitest run src/tests/ticket-01-db.test.ts\`

--------------------------------------------------------------------------------
### TICKET 02: NextAuth (Auth.js v5) with Tenant Scoped Session & Edge Middleware
--------------------------------------------------------------------------------
- Objective: Provide passwordless magic link authentication with auto-hydration of active tenant organization.
- Target Files:
  - \`src/auth.ts\`
  - \`src/middleware.ts\`
  - \`src/app/api/auth/[...nextauth]/route.ts\`
- Specification:
  - Session callback must attach \`user.id\` and \`user.defaultOrgId\`.
  - Edge middleware must protect \`/app/*\` routes and redirect unauthenticated visitors to \`/login\`.
- Test Assertions:
  - Unauthenticated requests to \`/app\` receive 307 redirect to \`/login\`.
  - Authenticated session contains valid \`organizationId\` string.

--------------------------------------------------------------------------------
### TICKET 03: Core Domain Automation Engine (Pure TypeScript)
--------------------------------------------------------------------------------
- Objective: Implement the core automation logic that replaces the predecessor's human labor.
- Target Files:
  - \`src/lib/engine/${slug}-processor.ts\`
  - \`src/tests/ticket-03-engine.test.ts\`
- Specification:
  - Pure function receiving typed input parameters and returning deterministic, structured output.
  - Marginal compute cost must be tracked and returned in the result object (costUsd < 0.05).
- Test Assertions:
  - Engine transforms raw input payload into structured production deliverable in < 2,000ms.
  - Rejects malformed payload with descriptive Zod validation error.

--------------------------------------------------------------------------------
### TICKET 04: Production API Route Handlers with Quota Enforcement
--------------------------------------------------------------------------------
- Objective: Expose \`POST /api/v1/records\` with organization quota check and transactional execution.
- Target Files:
  - \`src/app/api/v1/records/route.ts\`
  - \`src/tests/ticket-04-api.test.ts\`
- Specification:
  - Verify active organization quota: if \`usedThisMonth >= monthlyQuota\`, return HTTP 402 Payment Required.
  - Execute Prisma transaction incrementing quota counter and recording domain record atomically.
- Test Assertions:
  - Request with exhausted quota returns 402 with upgrade URL.
  - Valid request returns 201 Created with persisted record ID.

--------------------------------------------------------------------------------
### TICKET 05: Idempotent Stripe Webhook Listener & Customer Portal
--------------------------------------------------------------------------------
- Objective: Handle subscription lifecycle events (created, updated, canceled) with zero race conditions.
- Target Files:
  - \`src/app/api/webhooks/stripe/route.ts\`
  - \`src/lib/stripe.ts\`
  - \`src/tests/ticket-05-stripe.test.ts\`
- Specification:
  - Verify Stripe HMAC signature using \`stripe.webhooks.constructEvent\`.
  - Check \`IdempotencyKey\` model to ensure webhook replays do not double-increment credits.
- Test Assertions:
  - Missing or invalid Stripe signature returns HTTP 400.
  - \`customer.subscription.created\` event upgrades Organization planTier to GROWTH and sets subStatus to ACTIVE.

--------------------------------------------------------------------------------
### TICKET 06: Linear / Modern Dark UI Subscriber Command Center
--------------------------------------------------------------------------------
- Objective: Render high-density dashboard displaying vitals, quota consumption, and working ledger.
- Target Files:
  - \`src/app/app/page.tsx\`
  - \`src/components/dashboard/ledger-table.tsx\`
  - \`src/components/dashboard/metric-cards.tsx\`
- Specification:
  - Implement Linear-inspired Modern Dark UI (#050506 canvas, elevated glassmorphic cards, telemetry vitals).
  - Search and filter controls operating over client-side records without full page reloads.

--------------------------------------------------------------------------------
### TICKET 07: Split-Screen Live Execution Workspace
--------------------------------------------------------------------------------
- Objective: Interactive workspace allowing users to edit, inspect, and export outputs in < 60 seconds.
- Target Files:
  - \`src/app/app/workspace/[id]/page.tsx\`
  - \`src/components/workspace/split-editor.tsx\`
  - \`src/components/workspace/telemetry-sidebar.tsx\`

--------------------------------------------------------------------------------
### TICKET 08: Quick-Action Command Palette (Cmd+K)
--------------------------------------------------------------------------------
- Objective: Keyboard-driven modal launcher for running tasks instantly.
- Target Files:
  - \`src/components/command-palette.tsx\`
  - \`src/hooks/use-command-palette.ts\`

--------------------------------------------------------------------------------
### TICKET 09: End-to-End Verification Suite (Zero-Error Assertion)
--------------------------------------------------------------------------------
- Objective: End-to-end integration test asserting a new visitor can sign up, execute a task, view results, and export with zero console errors.
- Target Files:
  - \`playwright.config.ts\`
  - \`e2e/signup-to-execution.spec.ts\`
- Verification Command: \`npx playwright test\`
`;

  // MODULE 5: ZERO-SALES PRODUCT-LED GTM PLAYBOOK (FROM VAULT BUSINESS-MANAGER)
  const gtmPrompt = `# ==============================================================================
# ZERO-SALES PRODUCT-LED GTM PLAYBOOK: RESURRECTING ${name.toUpperCase()}
# STRATEGY SOURCE: Vault Business-Manager (zero-sales-product-led-gtm.md)
# EXECUTION: 1 Founder · 0 Sales Reps · 100% Self-Serve Funnel · 90%+ Gross Margin
# ==============================================================================

You are the Chief Commercial Officer and Growth Architect.
Your mission is to scale the resurrected "${name}" to $10,000–$25,000/month in cash flow without hiring a single sales rep or booking a single custom demo.

==============================================================================
## PILLAR 1: ASYMMETRIC NEGATIVE POSITIONING AGAINST THE DEAD INCUMBENT
==============================================================================

The original ${name} raised ${capital} and collapsed because they charged enterprise prices for manual services disguised as software.
We position our product as the exact antidote:

### The "Anti-Venture" Value Proposition:
- "The original ${name} raised ${capital} and had 200 employees to do what our software does in 30 seconds for $49."
- No "Schedule a Demo" forms. No 45-minute discovery calls. No enterprise annual lock-in contracts.
- Public Tear-Down Matrix on Landing Page:
  | Feature | The Dead Predecessor | Legacy Incumbents | Rebuild ${name} |
  |---------|----------------------|-------------------|-----------------|
  | Setup Time | 3 weeks (human onboard) | 14 days (sales calls) | 60 seconds (self-serve) |
  | Pricing | $1,500+/mo | $500–$2,000/mo | $49/mo flat |
  | Headcount Touch | 4 account managers | 2 sales reps | 0 humans (pure code) |
  | Cancel Policy | 30-day notice | Annual lock-in | 1-click self-serve |

==============================================================================
## PILLAR 2: PROGRAMMATIC DIAGNOSTIC SEO ENGINE (/audit/[domain])
==============================================================================

Acquire high-intent B2B customers for free by providing automated public diagnostic audits:

1. Dynamic Diagnostic Pages:
   - Build a public endpoint at \`/audit/[domain]\` or \`/check/[id]\` that runs a free 30-second automated scan of a prospect's public setup.
   - Programmatically index 10,000+ public company URLs targeting competitor search terms.
2. The High-Converting Diagnostic Teaser:
   - Provide a free 3-point scorecard: Performance Grade, Fatal Bottlenecks Detected, and Estimated Capital Wasted.
   - Lock the 1-click automated fix behind the $49/mo self-serve subscription.
3. Competitor Search Hijack:
   - Programmatic comparison pages: \`/vs/clerky\`, \`/vs/carta\`, \`/vs/workstream\`, \`/vs/pilot\`.
   - Index user reviews showing exactly why legacy customers are churning.

==============================================================================
## PILLAR 3: THE 60-SECOND TIME-TO-VALUE (TTV) SANDBOX
==============================================================================

Eliminate every ounce of friction between discovery and the "Aha!" moment:

1. Interactive Homepage Sandbox:
   - Visitors test the core engine on the landing page BEFORE creating an account.
   - Live sample data pre-populated with 1-click execution.
2. Zero-Password Magic Link:
   - Users click "Save & Export" -> modal prompts for email -> instant magic link or Google OAuth -> routes directly to their hydrated workspace with their result already saved.
3. Pre-Seeded Workspace:
   - The user is never greeted with a blank screen. Their workspace contains 3 pre-completed demo runs showing best practices.

==============================================================================
## PILLAR 4: VIRAL ARTIFACT LOOPS & WATERMARKED EXPORTS
==============================================================================

Every piece of value generated by the platform acts as an organic customer acquisition channel:

1. Attribution Badge on Outputs:
   - Every generated report, document, embeddable widget, or email includes a discrete footer:
     "Automated by Rebuild ${name} — Launch your self-serve setup in 60s"
2. One-Click Public Share Links:
   - Users can share outputs with investors, clients, or team members via unique read-only URL (\`/share/[id]\`).
   - The shared page features a prominent CTA: "Create your own automated ${industry} workflow ->"

==============================================================================
## PILLAR 5: STRICT SELF-SERVE NEGATIVE PRICING RULES
==============================================================================

To guarantee 90%+ gross margins and zero operational drag, obey these rules:

- NEVER offer custom enterprise contracts or bespoke SLAs.
- NEVER accept manual invoices or paper checks. All payments are automated via Stripe Billing.
- NEVER discount below $49/month.
- PRICING TIERS:
  - Starter: $49/mo (Up to 100 runs, 1 workspace, community support)
  - Growth: $149/mo (Up to 1,000 runs, 5 team seats, API webhooks, priority queue)
  - Scale: $499/mo (Up to 5,000 runs, unlimited seats, custom domain branding)

==============================================================================
## PILLAR 6: 52-WEEK INBOUND CONTENT & AUTOPSY TEARDOWN ENGINE
==============================================================================

Generate relentless organic attention by turning the predecessor's failure into authority content:

1. The Weekly Autopsy Breakdown:
   - Publish a weekly forensic breakdown on X/LinkedIn: "How [Startup] burned $75M trying to solve ${industry}, and the modern automated architecture that makes their business model obsolete today."
2. The Community Wedge:
   - Post tactical solutions on Hacker News, Reddit (/r/SaaS, /r/startups), and specialized Discord communities answering questions about ${industry} headaches.
   - Always link back to the free diagnostic tool.
`;

  const prompts: RebuildPromptItem[] = [
    {
      id: "master",
      title: "1. The Centerpiece: Forensic Failure Autopsy & Anti-Death Counter-Strategy Blueprint",
      shortTitle: "1. Master Centerpiece",
      targetTool: "Cursor Composer · Windsurf Cascade · Claude Code",
      description: "The primary strategic blueprint: Forensic root failure breakdown, CAC/LTV inversion mechanics, 3 fatal anti-patterns, competitor vulnerability matrix, and non-negotiable negative engineering constraints.",
      content: fullPrompt.trim(),
    },
    {
      id: "design",
      title: "2. Design System & Frontend UI Prompt (Linear / Modern Dark UI)",
      shortTitle: "2. Dark UI Design",
      targetTool: "v0.dev · Cursor · Tailwind CSS",
      description: "Modern dark developer tool design system, brand identity design mandate, component wireframes, and subscriber command console.",
      content: designPrompt.trim(),
    },
    {
      id: "agents",
      title: "3. Autonomous Agent System Directives (AGENTS.md)",
      shortTitle: "3. Agent Directives",
      targetTool: "Cursor Rules · Windsurf Memories · Claude Code",
      description: "Strict negative engineering boundaries, autonomous builder persona, self-correction test harness, and execution protocol.",
      content: agentDirectivesPrompt.trim(),
    },
    {
      id: "tickets",
      title: "4. Progressive TDD Implementation Plan",
      shortTitle: "4. TDD Tickets",
      targetTool: "Cursor Composer · Aider · Cline",
      description: "Sequential atomic implementation tickets with preconditions, tests, files to create, and verification assertions.",
      content: ticketsPrompt.trim(),
    },
    {
      id: "gtm",
      title: "5. Zero-Sales Product-Led GTM Playbook",
      shortTitle: "5. Product-Led GTM",
      targetTool: "ChatGPT · Claude · Growth Strategy",
      description: "Self-serve acquisition wedge, programmatic diagnostic pages, competitor comparison attack vectors, and automated retention loops.",
      content: gtmPrompt.trim(),
    },
  ];

  return {
    companyName: name,
    fullPrompt,
    wordCount,
    sections,
    prompts,
  };
}
