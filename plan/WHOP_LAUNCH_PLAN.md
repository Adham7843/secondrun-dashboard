# SecondRun (DeadSaaS) — Whop Launch Plan

> Status: LANDING BUILT, DASHBOARD GATE PENDING. Last updated 2026-09-14.
> Repo: `Adham7843/secondrun` (branch `main`). Holding dir: `DeadSaaS/`.

## 0. Terminology (LOCKED — use exactly these words)

- **FRONTEND** = the 30 free dossiers + homepage + browse/latest/pricing. Marketing.
  Free forever. Static. Routes visitors TO the dashboard when they pay. Never holds prompts.
- **DASHBOARD** = the paid thing. The vault: full 1,200 + all 5 prompt modules.
  Exists ONLY behind the Whop session gate. Nothing public reads from it.

FRONTEND sells. DASHBOARD delivers. Never mix them.

**Access law (locked 2026-09-14, revised — email is identity, cookie is cache):**
FRONTEND never links to DASHBOARD URLs. The only outbound paths from any FRONTEND
are Whop checkout (buy) and the member sign-in page on the dashboard domain (re-entry).
- Identity = purchase email (Gumroad pattern). Entitlements keyed by email in D1.
- Cross-browser proof = Whop hub (AppSumo pattern): buyer logs into Whop anywhere,
  sees SecondRun owned, clicks through. No dependence on our cookies.
- Re-entry = passwordless magic link (Whop's own email-login pattern): enter purchase
  email on /signin → single-use link → fresh session on ANY browser/device.
- Session cookie (1 yr) is a convenience cache ("remember me"), never the access
  mechanism. Lost cookie / new browser / new phone = new magic link, zero support load.
- License key (native per Whop membership) = receipt + support identifier + redeem path.

## 1. Product thesis (one paragraph)

SecondRun sells post-mortem intelligence on 1,200 dead startups: what they built,
why they died, and the 5-module rebuild blueprints to resurrect each one as a
lean micro-SaaS. The data layer IS the product. Marketing frontends are disposable;
the gated dashboard is the vault. Price: **$49 one-time, lifetime access, no refunds.**

## 2. Topology — many fronts, one vault

```
[secondrun.io + niche SEO frontends]  → static, no DB, no prompt bytes
        │  CTA → Whop checkout ($49 one-time)
        ▼
[app.secondrun.io]                    → the ONLY dynamic app (DB + auth + prompts)
  /pricing → Whop checkout embed/link
  /dashboard → gated, full 1,200 + prompt copy buttons
  /api/whop/webhook, /api/auth/verify, /api/me
```

## 3. Data split (ENFORCED — see tests/landing.test.ts)

| Surface | Source | Prompt fields? |
|---|---|---|
| Homepage, /browse, /latest (30 stories) | `data/landing-30.json` via `src/lib/landing.ts` | NEVER — type has no prompt fields |
| /company/[slug] (public dossiers) | DB story columns only (overview, fatalFlaw, antiPatterns, sections) | NEVER — viewer/exporter removed |
| /dashboard (paid) | DB incl. `agentPrompt`, `rebuildThesis`, `businessModel` | YES — gated by session |

Regeneration: `python scripts/build_landing_30.py` (6 flagships + 24 diverse).
Guard: `tests/landing.test.ts` fails the build on any prompt leak into landing data or company-page source.

## 4. Money + access — Whop (NO Stripe), NO passwords, NO refunds

- **Gateway: Whop only.** $49 one-time product. Memberships carry native `license_key`.
- **Flow:** pay → `membership.went_valid` webhook → Worker verifies signature (Standard
  Webhooks spec) → D1 `entitlements(email, license_key, membership_id)` → email buyer
  **license key + single-use access link** (15-min expiry) → click sets HttpOnly session
  cookie (1 yr) → `/dashboard`.
- **Return visits:** cookie → straight in. New device: enter purchase email → new link
  iff email in `entitlements`, else buy-page.
- **No passwords exist anywhere.** No hashes, no resets, nothing to breach.
- **No refunds:** stated on /pricing + /terms ("all digital sales final"). Disputes →
  `membership.went_invalid` webhook deletes entitlement; session dies on next check.
- **D1 tables:** `entitlements`, `magic_tokens(token_hash, email, expires_at, used)`,
  `sessions(session_hash, email, expires_at)`.

## 5. Cloudflare free-tier mapping

| Piece | Service | Notes |
|---|---|---|
| Landing | Pages + `@cloudflare/next-on-pages` | No env vars, no DB binding |
| Dashboard app | Same Pages project (or `app.*` split later) | + D1 binding |
| Vault data | D1 (public cols vs `teardowns_pro` split at import) + R2 backup of `startups-1200.json` | ~0.01/5 GB used |
| Email | Resend free / MailChannels on Workers | magic-link delivery |

## 6. Build order (what's done / next)

- [x] 30-story prompt-free landing split (commit `a86bca9`)
- [x] Company pages stripped to story + paywall (same commit)
- [x] Untrack `.env`, `dev.db` (commit `9688706`)
- [ ] Sovereign: create Whop $49 one-time product → hand over webhook secret + product ID
- [ ] D1 schema + import (public vs pro column split)
- [ ] Worker routes: checkout config, `/api/whop/webhook`, `/api/auth/verify`, `/api/me`
- [ ] Middleware gate on `/dashboard` + pro fields; DELETE fake `src/lib/auth-context.tsx`
- [ ] Cloudflare Pages connect → `secondrun.pages.dev` → view-source audit → custom domain

## 7. Non-negotiables

1. No public route may import prisma/db, `startups-1200.json`, or prompt components.
2. No passwords, ever. Email + token links only.
3. No Stripe. No refunds. Whop is the sole money rail.
4. Every change ships with the leak tests green (`npx vitest run`, `npx tsc --noEmit`).
