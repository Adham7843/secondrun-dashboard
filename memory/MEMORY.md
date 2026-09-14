# SecondRun — Session Memory (newest first)

## 2026-09-14 — Landing/vault split shipped; Whop arch locked
- Built prompt-free public split: `data/landing-30.json` (30 stories, 58 KB, prompts
  stripped by `scripts/build_landing_30.py`), `src/lib/landing.ts` gate module.
- Homepage/browse/latest now static, DB-free. Company pages: story + paywall CTAs only
  (viewer/exporter/thesis removed). Dashboard untouched (still fake auth).
- Guards: `tests/landing.test.ts` (7 tests) — 14/14 green, `tsc` clean.
- Local preview verified: `/` 200 (30 dossier links, no prompt bytes), `/company/atrium`
  200 (story + lock panel, no prompt bytes).
- Pushed: `a86bca9` (split), `9688706` (untracked `.env`, `dev.db`).
- Decisions locked with Sovereign: Cloudflare free tier, Whop-only payments, $49
  lifetime, no refunds, no passwords (magic-link + session cookie).
- NEXT: Sovereign creates Whop $49 product → provides webhook secret + product ID →
  build D1 + Worker routes + session gate, delete fake auth.
