# SecondRun (DeadSaaS) — 1,200+ Startup Failure Database & Autonomous Rebuild Platform

> **1,200 dead startups burned over $14 Billion proving the market. Learn from their fatal flaws, avoid their anti-patterns, and repurpose their validated demand into an automated, cash-flowing micro-SaaS with $0 payroll.**

---

## ⚡ Overview
SecondRun is an editorial forensic intelligence platform and autonomous code generation factory. It documents the post-mortems of 1,200+ venture-backed startup casualties across all 40 Y Combinator batches (`W05` to `S24`) and provides 5-module autonomous code blueprints for Cursor Composer, Claude Code, and Windsurf.

### Key Capabilities
- **1,200+ Forensic Startup Autopsies**: Real-world metrics, burned venture capital ($500k to $1.75B), root causes, fatal flaws, and 3 lethal anti-patterns.
- **The Centerpiece Master Blueprint**: Forensic root failure analysis, CAC/LTV inversion mechanics, competitor vulnerability matrices, and 4 non-negotiable negative engineering constraints.
- **Linear / Modern Dark UI Design Prompts**: Dark developer tool design tokens with an architectural mandate to invent bespoke brand identities.
- **Protected Member Dashboard (`/dashboard`)**: Full-text real-time search across 1,200 startups, batch and industry filters, 1-click prompt copying, and regional market adapters.
- **Turnkey Cloudflare Ready**: Pre-compiled static JSON dataset (`data/startups-1200.json`) for $0/mo hosting on Cloudflare Pages or Cloudflare D1.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite (via Prisma ORM)
- **Styling**: Tailwind CSS + Radix UI primitives + Lucide Icons
- **Testing**: Vitest + TypeScript type checking (`tsc --noEmit`)
- **Deployment**: Local Node / Cloudflare Pages

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Initialization
```bash
npx prisma generate
npx prisma db push
```

### 3. Run 1,200 Startup Generator Pipeline
```bash
python scripts/generate_1200_graveyard_pipeline.py
```
This script populates `prisma/dev.db` with all 1,200 startups and exports `data/startups-1200.json`.

### 4. Start Development Server
```bash
npm run dev -- --port 3200
```
Open [http://localhost:3200](http://localhost:3200) to view the application.

---

## 📁 Repository Structure
```
├── data/
│   └── startups-1200.json         # Static pre-baked dataset for Cloudflare Pages
├── prisma/
│   ├── schema.prisma              # Database schema (User, Company, Teardown, Founder)
│   └── dev.db                     # SQLite database with 1,200 populated startups
├── scripts/
│   └── generate_1200_graveyard_pipeline.py # High-speed pipeline generator
├── src/
│   ├── app/
│   │   ├── page.tsx               # Homepage with flagship autopsies & $49 paywall
│   │   ├── dashboard/page.tsx     # Member dashboard with search across all 1,200
│   │   ├── pricing/page.tsx       # $49 Lifetime Pass checkout page
│   │   └── company/[slug]/page.tsx# Individual forensic autopsy dossier
│   ├── components/
│   │   ├── auth-gate.tsx          # Subscriber access protection & demo bypass
│   │   ├── dashboard-archive.tsx  # Searchable 1,200 ledger with progressive loading
│   │   └── prompt-suite-viewer.tsx# 5-module autonomous code prompt viewer
│   └── lib/
│       ├── auth-context.tsx       # Client-side session and clearance state
│       └── prompt-suite.ts        # 5-module prompt generation engine
└── docs/                          # Mockups and architectural specs
```

---

## 🔒 License
Proprietary & Confidential. All rights reserved.
