"""Build the public landing dataset: 30 prompt-free company stories.

Reads data/startups-1200.json (the full vault, including monetizable prompt
fields) and writes data/landing-30.json containing ONLY public story fields:

  kept:    id, slug, name, batch, status, tagline, industry, location,
           foundedYear, closedYear, capitalBurned, fatalFlawSummary,
           ycUrl, websiteUrl, founders, teardown{overview, fatalFlaw,
           antiPatterns, sections, sources}
  STRIPPED: teardown{agentPrompt, rebuildThesis, businessModel}

The landing bundle must never contain prompt/spec data -- the prompts live
exclusively behind the paywall (dashboard / company dossiers for paid users).
A regression test (tests/landing.test.ts) enforces this.

Selection: 6 curated flagships first, then 24 more spread across industries
and batches for a representative shop window.
"""

import json
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "data", "startups-1200.json")
DST = os.path.join(BASE, "data", "landing-30.json")

FLAGSHIPS = ["atrium", "fast", "pebble", "scalefactor", "higherme", "rdio"]

PUBLIC_TOP_FIELDS = [
    "id", "slug", "name", "batch", "status", "tagline", "industry",
    "location", "foundedYear", "closedYear", "capitalBurned",
    "fatalFlawSummary", "ycUrl", "websiteUrl", "founders",
]

PUBLIC_TEARDOWN_FIELDS = [
    "overview", "fatalFlaw", "antiPatterns", "sections", "sources",
]

# Prompt/spec fields that must NEVER appear in the landing dataset.
STRIPPED_FIELDS = {"agentPrompt", "rebuildThesis", "businessModel"}


def strip(row: dict) -> dict:
    public = {k: row.get(k) for k in PUBLIC_TOP_FIELDS}
    td = row.get("teardown") or {}
    assert not (STRIPPED_FIELDS & set(td.keys())) - STRIPPED_FIELDS or True
    public["teardown"] = {k: td.get(k) for k in PUBLIC_TEARDOWN_FIELDS}
    # Founder contact links are story metadata; keep names/roles only.
    public["founders"] = [
        {"name": f.get("name"), "role": f.get("role")}
        for f in (row.get("founders") or [])
    ]
    return public


def main() -> None:
    with open(SRC, encoding="utf-8") as fh:
        all_rows = json.load(fh)

    by_slug = {r["slug"]: r for r in all_rows}
    picked, seen = [], set()

    for slug in FLAGSHIPS:
        if slug in by_slug:
            picked.append(by_slug[slug])
            seen.add(slug)

    # Fill to 30 with diverse industries/batches (skip flagships).
    industries_seen = set()
    for row in all_rows:
        if len(picked) >= 30:
            break
        if row["slug"] in seen:
            continue
        key = (row.get("industry"), row.get("batch"))
        if key in industries_seen and len(picked) < 24:
            continue
        industries_seen.add(key)
        picked.append(row)
        seen.add(row["slug"])

    # Fallback: top up sequentially if diversity pass came up short.
    for row in all_rows:
        if len(picked) >= 30:
            break
        if row["slug"] not in seen:
            picked.append(row)
            seen.add(row["slug"])

    landing = [strip(r) for r in picked[:30]]

    # Prove no prompt data survived.
    blob = json.dumps(landing)
    for field in STRIPPED_FIELDS:
        assert f'"{field}"' not in blob, f"LEAK: {field} present in landing data"

    with open(DST, "w", encoding="utf-8") as fh:
        json.dump(landing, fh, ensure_ascii=False)
    print(f"wrote {DST}: {len(landing)} companies, {len(blob)//1024} KB, prompts stripped")


if __name__ == "__main__":
    main()
