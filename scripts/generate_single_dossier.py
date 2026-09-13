import urllib.request
import json
import sqlite3
import os
import sys
import uuid

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

FREELLM_URL = "http://localhost:3001/v1/chat/completions"
API_KEY = "freellmapi-ac34bc5a79e331f28659a0d26a973f5d2939dc7e6f83c7ac"

STARTUPS = [
    {
        "name": "Atrium",
        "slug": "atrium",
        "batch": "W18",
        "status": "INACTIVE",
        "industry": "Legal Tech",
        "location": "San Francisco, CA",
        "foundedYear": 2017,
        "closedYear": 2020,
        "capitalBurned": "$75.5M",
        "fatalFlawSummary": "Attempted to operate a hybrid law firm with high lawyer burn rates while building unproven internal software.",
        "ycUrl": "https://www.ycombinator.com/companies/atrium",
        "websiteUrl": "https://atrium.co",
        "founders": [
            {"name": "Justin Kan", "role": "CEO (Twitch Co-founder)", "linkedinUrl": "https://linkedin.com/in/justinkan"},
            {"name": "Bebe Chueh", "role": "Co-founder"},
            {"name": "Chris Smoak", "role": "Co-founder"}
        ],
        "originalPitch": "Full-service corporate legal platform powered by machine learning to automate startup legal paperwork (SAFEs, commercial contracts, fundraising).",
        "coreBottleneck": "Tried to run a law firm with salaried attorneys while simultaneously writing software. Billable hour incentives clashed with automation, software adoption was low, and monthly burn hit $1.5M+."
    },
    {
        "name": "Pebble",
        "slug": "pebble",
        "batch": "W11",
        "status": "ACQUIRED",
        "industry": "Hardware & Wearables",
        "location": "Redwood City, CA",
        "foundedYear": 2012,
        "closedYear": 2016,
        "capitalBurned": "$43.0M",
        "fatalFlawSummary": "Over-extended inventory and debt to chase Apple Watch on features instead of doubling down on the 7-day battery e-paper niche.",
        "ycUrl": "https://www.ycombinator.com/companies/pebble",
        "websiteUrl": "https://pebble.com",
        "founders": [
            {"name": "Eric Migicovsky", "role": "Founder & CEO", "linkedinUrl": "https://linkedin.com/in/ericmigicovsky"}
        ],
        "originalPitch": "Open e-paper smartwatch with 7-day battery life and developer-friendly SDK.",
        "coreBottleneck": "Miscalculated demand in 2015, ordered millions of dollars in unsold inventory, took on heavy bank debt, and lost positioning trying to compete with Apple and Fitbit on general smartwatch features."
    },
    {
        "name": "Rdio",
        "slug": "rdio",
        "batch": "W10",
        "status": "ACQUIRED",
        "industry": "Consumer Audio & Streaming",
        "location": "San Francisco, CA",
        "foundedYear": 2010,
        "closedYear": 2015,
        "capitalBurned": "$125.0M",
        "fatalFlawSummary": "Believed superior UI/UX would beat Spotify's aggressive free-tier viral distribution and telco bundling.",
        "ycUrl": "https://www.ycombinator.com/companies/rdio",
        "websiteUrl": "https://rdio.com",
        "founders": [
            {"name": "Janus Friis", "role": "Founder (Skype Co-founder)"},
            {"name": "Niklas Zennström", "role": "Founder (Skype Co-founder)"}
        ],
        "originalPitch": "Ad-free, beautifully crafted social music streaming service with curated human playlists and peer recommendations.",
        "coreBottleneck": "Refused to launch a free, ad-supported tier until it was too late. Spotify captured all market mindshare and distribution via free viral discovery, while Rdio bled capital on record label minimum guarantees."
    }
]

def build_prompt_for_startup(st):
    return f"""You are a Principal Software Architect, Forensic Startup Auditor, and Autonomous Venture Builder.
Your task is to produce a publication-grade SecondRun autopsy and an exhaustive 4-blueprint rebuild prompt suite for "{st['name']}".

<startup_profile>
Name: {st['name']}
Industry: {st['industry']}
Capital Burned: {st['capitalBurned']}
Fatal Flaw: {st['fatalFlawSummary']}
Original Bottleneck: {st['coreBottleneck']}
</startup_profile>

You must output a JSON object containing:
1. "overview": Executive summary of the rise and fall (2-3 paragraphs).
2. "fatalFlaw": The exact failure mechanism (unit economics, CAC:LTV, org conflict).
3. "antiPatterns": Exactly 3 fatal anti-patterns to avoid.
4. "rebuildThesis": The lean, automated software-only pivot thesis for 2026.
5. "businessModel": Zero-sales operating model and pricing tiers.
6. "sections": 3 narrative sections with "title" and "body".
7. "agentPrompt": An array of 4 distinct, highly detailed blueprints:
   - Blueprint 1 (Backend Architecture & Schema): id="backend", title="Pocock-Style Backend & Data Schema Spec", targetTool="Cursor / Windsurf / Claude 3.5 Sonnet", description="Prisma models, API routes, webhooks, auth", iconName="database", content="..." (must include full Prisma schema and API route code).
   - Blueprint 2 (Frontend UI/UX Design System): id="frontend", title="v0 Design System & Screen Blueprint", targetTool="v0.dev / Cursor / Tailwind UI", description="Newsprint editorial tokens, component hierarchy, interactive modals", iconName="palette", content="..." (must include color tokens, dashboard layout, detail workspace, and components).
   - Blueprint 3 (Pocock to-tickets Plan): id="tickets", title="Matt Pocock 'to-tickets' Progressive Plan", targetTool="Aider / Cline / Cursor Composer", description="Step-by-step TDD checklist for autonomous coding agents", iconName="terminal", content="..." (must include Tickets 01 through 06 with files, tasks, and assertions).
   - Blueprint 4 (Zero-Sales GTM Playbook): id="business", title="Zero-Sales Operating Engine & GTM Playbook", targetTool="ChatGPT / Claude / Make.com / n8n", description="Cold outbound scraping, 3-step email sequences, local pricing", iconName="trending", content="..." (must include lead generation scraper python code, 3 cold emails, regional pricing anchors for US, Egypt, GCC, and churn retention workflows).
8. "sources": 3 reference URLs.

OUTPUT VALID JSON ONLY. NO MARKDOWN FENCES. START WITH {{ AND END WITH }}.
"""

def generate_and_save(st):
    print(f"\n==========================================")
    print(f"Generating Dossier for {st['name']} ({st['capitalBurned']} burned)...")
    print(f"==========================================")
    
    prompt = build_prompt_for_startup(st)
    
    req = urllib.request.Request(
        FREELLM_URL,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}"
        },
        data=json.dumps({
            "model": "auto",
            "temperature": 0.1,
            "messages": [
                {"role": "system", "content": "You are an expert startup forensic auditor and principal architect. Output strictly valid JSON without formatting ticks."},
                {"role": "user", "content": prompt}
            ]
        }).encode("utf-8")
    )
    
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            raw = resp.read().decode("utf-8")
            res_json = json.loads(raw)
            content = res_json["choices"][0]["message"]["content"].strip()
            
            if content.startswith("```json"):
                content = content[7:]
            if content.startswith("```"):
                content = content[3:]
            if content.endswith("```"):
                content = content[:-3]
            content = content.strip()
            
            dossier = json.loads(content)
            print(f"[OK] FreeLLMAPI returned valid structured dossier for {st['name']}!")
            
            # Verify agentPrompt array
            agent_prompts = dossier.get("agentPrompt", [])
            if isinstance(agent_prompts, str):
                try:
                    agent_prompts = json.loads(agent_prompts)
                except:
                    pass
            
            db_path = os.path.join(os.path.dirname(__file__), "..", "prisma", "dev.db")
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            # Remove existing
            cursor.execute("SELECT id FROM Company WHERE slug = ?", (st["slug"],))
            row = cursor.fetchone()
            if row:
                cid = row[0]
                cursor.execute("DELETE FROM Founder WHERE companyId = ?", (cid,))
                cursor.execute("DELETE FROM Teardown WHERE companyId = ?", (cid,))
                cursor.execute("DELETE FROM Company WHERE id = ?", (cid,))
            
            company_id = f"c_{uuid.uuid4().hex[:16]}"
            
            cursor.execute("""
                INSERT INTO Company (id, slug, name, batch, status, tagline, industry, location, foundedYear, closedYear, capitalBurned, fatalFlawSummary, ycUrl, websiteUrl)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                company_id,
                st["slug"],
                st["name"],
                st["batch"],
                st["status"],
                st.get("originalPitch", f"Rebuild {st['name']}"),
                st["industry"],
                st["location"],
                st["foundedYear"],
                st["closedYear"],
                st["capitalBurned"],
                st["fatalFlawSummary"],
                st.get("ycUrl"),
                st.get("websiteUrl")
            ))
            
            for f in st.get("founders", []):
                fid = f"f_{uuid.uuid4().hex[:16]}"
                cursor.execute("""
                    INSERT INTO Founder (id, companyId, name, role, linkedinUrl)
                    VALUES (?, ?, ?, ?, ?)
                """, (fid, company_id, f["name"], f.get("role"), f.get("linkedinUrl")))
                
            def to_str(val):
                if isinstance(val, (dict, list)):
                    return json.dumps(val, indent=2)
                return str(val) if val is not None else ""
                
            tid = f"t_{uuid.uuid4().hex[:16]}"
            
            # Serialize agent_prompts to JSON string
            agent_prompt_str = json.dumps(agent_prompts) if isinstance(agent_prompts, list) else to_str(agent_prompts)
            
            cursor.execute("""
                INSERT INTO Teardown (id, companyId, overview, fatalFlaw, antiPatterns, sections, rebuildThesis, businessModel, agentPrompt, previewChars, isPro, sources)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                tid,
                company_id,
                to_str(dossier.get("overview", "")),
                to_str(dossier.get("fatalFlaw", "")),
                json.dumps(dossier.get("antiPatterns", [])),
                json.dumps(dossier.get("sections", [])),
                to_str(dossier.get("rebuildThesis", "")),
                to_str(dossier.get("businessModel", "")),
                agent_prompt_str,
                3000,
                1,
                json.dumps(dossier.get("sources", []))
            ))
            
            conn.commit()
            conn.close()
            print(f"[OK] {st['name']} successfully written to SQLite dev.db with {len(agent_prompts) if isinstance(agent_prompts, list) else 1} prompt blueprints!")
            
    except Exception as e:
        print(f"Error processing {st['name']}: {e}")

if __name__ == "__main__":
    slug_arg = sys.argv[1] if len(sys.argv) > 1 else None
    targets = [s for s in STARTUPS if s["slug"] == slug_arg] if slug_arg else STARTUPS
    for t in targets:
        generate_and_save(t)
