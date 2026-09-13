import sqlite3
import json
import os
import uuid

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "prisma", "dev.db")

COMPANIES = [
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
        "founders": [{"name": "Eric Migicovsky", "role": "Founder & CEO"}],
        "fatalFlaw": "In 2015, Pebble projected explosive mainstream growth and ordered millions of dollars in component inventory. When Apple Watch launched, demand collapsed. Pebble was stuck with warehouses of unsold watches and heavy venture debt.",
        "antiPatterns": [
            "Ordering speculative physical inventory ahead of verified consumer demand.",
            "Taking on venture debt with strict financial covenants to fund manufacturing runs.",
            "Abandoning a passionate cult niche (7-day battery e-paper) to fight a trillion-dollar incumbent on general smartwatch features."
        ],
        "rebuildThesis": "Rebuild the Pebble ethos as an ultra-minimalist, open-source e-ink productivity wearable focused strictly on notifications, calendar, and health with a 14-day battery life.",
        "businessModel": "Direct-to-consumer hardware sold at a guaranteed 45% gross margin on pre-orders only (zero speculative inventory) paired with a $4.99/mo developer cloud app ecosystem."
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
        "founders": [{"name": "Janus Friis", "role": "Co-founder"}, {"name": "Niklas Zennström", "role": "Co-founder"}],
        "fatalFlaw": "Rdio refused to launch a free, ad-supported tier until it was too late. While Rdio had the most beautiful UI in tech, Spotify acquired tens of millions of users for free and subsidized licensing minimum guarantees.",
        "antiPatterns": [
            "Assuming superior product craft and UI alone can overcome a competitor's free viral distribution model.",
            "Signing draconian record label minimum guarantees without a sustainable freemium funnel.",
            "Ignoring localized telecom bundling partnerships that drove Spotify's global expansion."
        ],
        "rebuildThesis": "Rebuild as a decentralized, lossless audio streaming player connecting directly to indie artists and Bandcamp/Audius feeds with micro-patronage tokens.",
        "businessModel": "Pure software player ($9.99 one-time download or $2.99/mo sync) with zero record label minimum guarantees."
    },
    {
        "name": "Secret",
        "slug": "secret",
        "batch": "W14",
        "status": "INACTIVE",
        "industry": "Consumer Social",
        "location": "San Francisco, CA",
        "foundedYear": 2014,
        "closedYear": 2015,
        "capitalBurned": "$35.0M",
        "fatalFlawSummary": "Toxicity, cyberbullying, and unmoderated gossip destroyed retention once early Silicon Valley curiosity faded.",
        "ycUrl": "https://www.ycombinator.com/companies/secret",
        "websiteUrl": "https://secret.ly",
        "founders": [{"name": "David Byttow", "role": "Co-founder & CEO"}, {"name": "Chrys Bader", "role": "Co-founder"}],
        "fatalFlaw": "Anonymous social networks suffer from an adverse selection loop: unmoderated anonymity attracts cyberbullying and toxic rumors, driving away high-signal users until the network rots.",
        "antiPatterns": [
            "Building an engagement loop dependent on negativity, slander, and unverified rumors.",
            "Failing to build positive long-term utility beyond short-lived voyeuristic novelty.",
            "Allowing founders to take millions off the table in secondary sales during the peak of an unsustainable hype cycle."
        ],
        "rebuildThesis": "Rebuild as an anonymous, verified workplace salary and culture intelligence community (similar to Blind/Glassdoor) with cryptographic domain verification.",
        "businessModel": "Free for employees; B2B employer branding and enterprise talent intelligence subscriptions at $499/mo."
    },
    {
        "name": "Homejoy",
        "slug": "homejoy",
        "batch": "S10",
        "status": "INACTIVE",
        "industry": "Gig Economy & Home Services",
        "location": "San Francisco, CA",
        "foundedYear": 2010,
        "closedYear": 2015,
        "capitalBurned": "$40.0M",
        "fatalFlawSummary": "Subsidized $19 cleanings attracted bargain hunters who never retained, while 1099 labor classification lawsuits killed margins.",
        "ycUrl": "https://www.ycombinator.com/companies/homejoy",
        "websiteUrl": "https://homejoy.com",
        "founders": [{"name": "Adora Cheung", "role": "Co-founder & CEO"}, {"name": "Aaron Cheung", "role": "Co-founder"}],
        "fatalFlaw": "Customer acquisition cost exceeded customer lifetime value because promotional discounts attracted cheap, non-recurring clients. Simultaneously, workers circumvented the platform for cash payments after the first clean.",
        "antiPatterns": [
            "Running deeply unprofitable customer acquisition promos ($19 for 3 hours of cleaning) without cohort retention.",
            "Failing to prevent off-platform disintermediation between cleaners and homeowners.",
            "Expanding to 30+ international cities before mastering unit economics in a single market."
        ],
        "rebuildThesis": "Rebuild as a pure SaaS operating system for independent cleaning business owners (CRM, scheduling, invoicing, SMS dispatch) rather than an on-demand labor marketplace.",
        "businessModel": "Vertical SaaS subscription: $49/mo for solo cleaners, $149/mo for small cleaning agencies."
    },
    {
        "name": "Zirtual",
        "slug": "zirtual",
        "batch": "W13",
        "status": "INACTIVE",
        "industry": "Virtual Assistants & B2B Services",
        "location": "San Francisco, CA",
        "foundedYear": 2011,
        "closedYear": 2015,
        "capitalBurned": "$5.5M",
        "fatalFlawSummary": "Abruptly laid off 400 workers overnight due to miscalculated payroll taxes and operational accounting blindspots.",
        "ycUrl": "https://www.ycombinator.com/companies/zirtual",
        "websiteUrl": "https://zirtual.com",
        "founders": [{"name": "Maren Kate Donovan", "role": "Founder & CEO"}],
        "fatalFlaw": "Transitioned hundreds of independent contractors to full-time W2 employees with healthcare benefits without updating pricing or tracking payroll tax liabilities. Burn outpaced cash reserves overnight.",
        "antiPatterns": [
            "Switching contractor business models to W2 employment without financial modeling or accounting audits.",
            "Lacking real-time CFO visibility into burn rate and tax withholding liabilities.",
            "Subsidizing human assistant hours below actual fully loaded labor costs."
        ],
        "rebuildThesis": "Rebuild as an autonomous AI Executive Assistant agent operating inside Slack, Gmail, and Google Calendar that triages email and schedules meetings for $29/mo.",
        "businessModel": "100% automated software subscription: $29/mo Starter, $79/mo Executive. Zero human employees on payroll."
    },
    {
        "name": "Jawbone",
        "slug": "jawbone",
        "batch": "W06",
        "status": "INACTIVE",
        "industry": "Consumer Electronics & Wearables",
        "location": "San Francisco, CA",
        "foundedYear": 1999,
        "closedYear": 2017,
        "capitalBurned": "$930.0M",
        "fatalFlawSummary": "Burned nearly $1 Billion across Bluetooth headsets and fitness trackers plagued by hardware failure rates and litigation.",
        "ycUrl": "https://www.ycombinator.com/companies/jawbone",
        "websiteUrl": "https://jawbone.com",
        "founders": [{"name": "Hosain Rahman", "role": "Founder & CEO"}, {"name": "Alexander Asseily", "role": "Co-founder"}],
        "fatalFlaw": "The UP fitness wristband suffered from catastrophic manufacturing defects (battery charging failures), resulting in massive return rates, inventory write-downs, and endless patent wars with Fitbit.",
        "antiPatterns": [
            "Shipping hardware with known thermal and water-resistance vulnerabilities to hit retail deadlines.",
            "Raising mega-rounds of debt to sustain operational bloat instead of restructuring around core patents.",
            "Fighting multi-year patent lawsuits that consumed tens of millions in legal fees."
        ],
        "rebuildThesis": "Rebuild as a medical-grade biometric software algorithm API licensing health diagnostics to existing smart rings and watch manufacturers.",
        "businessModel": "B2B API licensing: $1.50 per active device per month to OEM manufacturers."
    },
    {
        "name": "Fast",
        "slug": "fast",
        "batch": "S20",
        "status": "INACTIVE",
        "industry": "Fintech & Payments",
        "location": "San Francisco, CA",
        "foundedYear": 2019,
        "closedYear": 2022,
        "capitalBurned": "$124.0M",
        "fatalFlawSummary": "Burned $10M/month with 400 employees while generating only $600k in annual revenue trying to build 1-click checkout.",
        "ycUrl": "https://www.ycombinator.com/companies/fast",
        "websiteUrl": "https://fast.co",
        "founders": [{"name": "Domm Holland", "role": "Co-founder & CEO"}, {"name": "Allison Barr Allen", "role": "Co-founder & COO"}],
        "fatalFlaw": "Hyper-inflated team growth and splashy marketing sponsorships (NASCAR, sports stadiums) with virtually zero organic merchant adoption. Shop Pay already solved 1-click checkout for 80% of merchants.",
        "antiPatterns": [
            "Spending millions on consumer brand sponsorships for a B2B infrastructure product.",
            "Hiring 400+ employees before proving merchant distribution or repeat transaction volume.",
            "Ignoring incumbent platform lock-in (Shopify's Shop Pay monopoly on checkout)."
        ],
        "rebuildThesis": "Rebuild as an open-source headless checkout SDK for WooCommerce and custom storefronts that eliminates abandoned carts without processing fees.",
        "businessModel": "Freemium developer tool: Free up to $20k/mo GMV, then 0.5% transaction volume cap."
    },
    {
        "name": "Shyp",
        "slug": "shyp",
        "batch": "W14",
        "status": "INACTIVE",
        "industry": "Logistics & Delivery",
        "location": "San Francisco, CA",
        "foundedYear": 2013,
        "closedYear": 2018,
        "capitalBurned": "$62.0M",
        "fatalFlawSummary": "Offered $5 courier pickups where a courier drove to your house, boxed your item, and mailed it, losing $20 per order.",
        "ycUrl": "https://www.ycombinator.com/companies/shyp",
        "websiteUrl": "https://shyp.com",
        "founders": [{"name": "Kevin Gibbon", "role": "Founder & CEO"}],
        "fatalFlaw": "Negative unit economics on every single pickup. The cost of van couriers, bubble wrap, custom cardboard boxes, and warehouse sorters was fundamentally higher than the $5 fee charged to consumers.",
        "antiPatterns": [
            "Subsidizing physical last-mile courier pickups with venture capital.",
            "Chasing low-margin, infrequent consumer package shippers instead of high-volume B2B warehouses.",
            "Expanding warehouse footprints and vehicle fleets before proving positive unit contribution margins."
        ],
        "rebuildThesis": "Rebuild as an automated drop-shipping barcode scanner and shipping label generator for boutique ecommerce sellers.",
        "businessModel": "Pure software subscription ($39/mo) with zero trucks, zero couriers, and zero physical cardboard."
    },
    {
        "name": "ScaleFactor",
        "slug": "scalefactor",
        "batch": "W17",
        "status": "INACTIVE",
        "industry": "Fintech & Automated Accounting",
        "location": "Austin, TX",
        "foundedYear": 2014,
        "closedYear": 2020,
        "capitalBurned": "$100.0M",
        "fatalFlawSummary": "Sold 'AI-powered automated bookkeeping' that was secretly performed manually by dozens of accountants making catastrophic errors.",
        "ycUrl": "https://www.ycombinator.com/companies/scalefactor",
        "websiteUrl": "https://scalefactor.com",
        "founders": [{"name": "Kurt Rathmann", "role": "Founder & CEO"}],
        "fatalFlaw": "Faked AI automation by using offshore human bookkeepers who couldn't keep up with customer transaction volumes. Books were filled with erroneous journal entries, causing customers to fire the company in droves.",
        "antiPatterns": [
            "Faking software automation with manual human labor ('Wizard of Oz' model that never transitioned to code).",
            "Scaling sales reps aggressively while the core product corrupted customer financial data.",
            "Misleading investors and customers about AI capabilities that did not exist in the codebase."
        ],
        "rebuildThesis": "Rebuild as an autonomous, deterministic transaction reconciliation agent using modern LLM financial extraction and bank Plaid webhooks.",
        "businessModel": "Self-serve micro-SaaS: $79/month per company. Zero human bookkeepers."
    },
    {
        "name": "Lily Robotics",
        "slug": "lily-robotics",
        "batch": "S14",
        "status": "INACTIVE",
        "industry": "Hardware & Drones",
        "location": "San Francisco, CA",
        "foundedYear": 2013,
        "closedYear": 2017,
        "capitalBurned": "$15.0M",
        "fatalFlawSummary": "Collected $34M in pre-orders with a promotional video faked using a competitor's drone, then ran out of cash before manufacturing.",
        "ycUrl": "https://www.ycombinator.com/companies/lily",
        "websiteUrl": "https://lily.camera",
        "founders": [{"name": "Antoine Balaresque", "role": "Co-founder"}, {"name": "Henry Bradlow", "role": "Co-founder"}],
        "fatalFlaw": "Promised a waterproof 'throw-in-the-air' autonomous follow-me drone before solving basic aerodynamics and computer vision tracking. The product video was faked with DJI equipment, leading to a fraud lawsuit by the SF District Attorney.",
        "antiPatterns": [
            "Faking prototype capabilities in public promotional materials.",
            "Taking $34M in consumer pre-orders without a validated contract manufacturer.",
            "Underestimating the complexity of GPS-free optical subject tracking hardware."
        ],
        "rebuildThesis": "Rebuild as an AI camera tracking mobile app that turns any modern iPhone/Android into an autonomous sports cameraman using optical recognition.",
        "businessModel": "Mobile software app: $4.99/mo or $29/yr subscription. Zero drone manufacturing."
    },
    {
        "name": "Teforia",
        "slug": "teforia",
        "batch": "W15",
        "status": "INACTIVE",
        "industry": "Consumer Hardware & IoT",
        "location": "Mountain View, CA",
        "foundedYear": 2014,
        "closedYear": 2017,
        "capitalBurned": "$17.0M",
        "fatalFlawSummary": "Manufactured a $399–$999 smart tea infuser with proprietary tea pods that customers found absurdly overpriced.",
        "ycUrl": "https://www.ycombinator.com/companies/teforia",
        "websiteUrl": "https://teforia.com",
        "founders": [{"name": "Allen Han", "role": "Founder & CEO"}],
        "fatalFlaw": "Built an ultra-expensive hardware gadget for an everyday ritual (brewing tea) that traditional hot water and a $5 strainer already solved. High manufacturing BOM cost and slow pod replenishment killed the business.",
        "antiPatterns": [
            "Over-engineering simple analog rituals with complex internet-connected microprocessors.",
            "Pricing consumer kitchen hardware at $999 without an established luxury brand.",
            "Relying on closed proprietary pod packaging that frustrated tea connoisseurs."
        ],
        "rebuildThesis": "Rebuild as a smart tea sommelier mobile app that identifies loose-leaf teas via camera and provides exact brewing temperatures and steeping timers.",
        "businessModel": "Mobile app freemium ($19/yr) paired with an affiliate marketplace connecting artisanal tea growers directly to consumers."
    },
    {
        "name": "Starsky Robotics",
        "slug": "starsky-robotics",
        "batch": "S16",
        "status": "INACTIVE",
        "industry": "Autonomous Vehicles & Robotics",
        "location": "San Francisco, CA",
        "foundedYear": 2015,
        "closedYear": 2020,
        "capitalBurned": "$20.0M",
        "fatalFlawSummary": "Autonomous trucking technology plateaued at the 99% safety barrier, while freight brokerage margins collapsed.",
        "ycUrl": "https://www.ycombinator.com/companies/starsky-robotics",
        "websiteUrl": "https://starsky.io",
        "founders": [{"name": "Stefan Seltz-Axmacher", "role": "Founder & CEO"}, {"name": "Kartik Gopalakrishnan", "role": "Co-founder"}],
        "fatalFlaw": "The final 1% of autonomous edge cases (inclement weather, unpredictable highway debris) required hundreds of millions of dollars in capital that venture markets refused to fund during the 2019 freight recession.",
        "antiPatterns": [
            "Underestimating the astronomical capital requirements of safety-critical physical robotics.",
            "Operating an internal manual freight brokerage that bled operational cash to prove demand.",
            "Assuming autonomous technology breakthroughs follow predictable venture timelines."
        ],
        "rebuildThesis": "Rebuild as an AI fleet telematics and fuel-efficiency optimization SaaS that saves human-driven trucking fleets 8–15% on diesel.",
        "businessModel": "B2B SaaS: $49/truck per month with verifiable fuel ROI."
    },
    {
        "name": "Omni",
        "slug": "omni",
        "batch": "W15",
        "status": "INACTIVE",
        "industry": "Consumer Logistics & Storage",
        "location": "San Francisco, CA",
        "foundedYear": 2014,
        "closedYear": 2019,
        "capitalBurned": "$35.0M",
        "fatalFlawSummary": "Photographed and stored individual consumer items on-demand, incurring crippling warehouse labor and delivery van costs.",
        "ycUrl": "https://www.ycombinator.com/companies/omni",
        "websiteUrl": "https://beomni.com",
        "founders": [{"name": "Tom McLeod", "role": "Founder & CEO"}, {"name": "Adam Dexter", "role": "Co-founder"}],
        "fatalFlaw": "Omni charged customers a few dollars to store individual items (e.g. a sleeping bag or guitar), but had to dispatch human drivers in vans to pick up, catalog, photograph, and deliver them on demand.",
        "antiPatterns": [
            "Subsidizing physical storage handling and van deliveries with venture capital.",
            "Pivoting into peer-to-peer item rentals to save margins without having sufficient supply density.",
            "Underpricing high-friction manual warehousing operations."
        ],
        "rebuildThesis": "Rebuild as a digital home inventory and insurance asset management app that catalogs belongings via smartphone camera and generates claims paperwork.",
        "businessModel": "Consumer subscription ($29/year) and B2B insurance carrier lead generation."
    },
    {
        "name": "FlightCar",
        "slug": "flightcar",
        "batch": "W13",
        "status": "INACTIVE",
        "industry": "Peer-to-Peer Car Sharing",
        "location": "San Francisco, CA",
        "foundedYear": 2012,
        "closedYear": 2016,
        "capitalBurned": "$40.0M",
        "fatalFlawSummary": "Park your car at the airport for free, let incoming travelers rent it, and get paid—crushed by insurance losses and vehicle wear.",
        "ycUrl": "https://www.ycombinator.com/companies/flightcar",
        "websiteUrl": "https://flightcar.com",
        "founders": [{"name": "Rujul Zaparde", "role": "Co-founder & CEO"}, {"name": "Kevin Petrovic", "role": "Co-founder"}],
        "fatalFlaw": "Vehicle damage claims and exorbitant commercial insurance deductibles destroyed profitability. Owners returned from flights to find their personal cars dented, dirty, or with mechanical issues.",
        "antiPatterns": [
            "Exposing high-value consumer personal assets (cars) to anonymous rental wear-and-tear.",
            "Underestimating the complexity of commercial auto insurance loss ratios.",
            "Operating expensive off-airport shuttle buses and parking lots that bled cash."
        ],
        "rebuildThesis": "Rebuild as a B2B fleet telematics and automated rental checkout engine for independent regional car rental companies.",
        "businessModel": "Vertical SaaS: $99/month per independent rental location + 2% transaction fee."
    },
    {
        "name": "Doppler Labs",
        "slug": "doppler-labs",
        "batch": "W15",
        "status": "INACTIVE",
        "industry": "Audio Hardware & Hearables",
        "location": "San Francisco, CA",
        "foundedYear": 2013,
        "closedYear": 2017,
        "capitalBurned": "$50.0M",
        "fatalFlawSummary": "Here One smart wireless earbuds suffered manufacturing delays and battery defects right as Apple released AirPods.",
        "ycUrl": "https://www.ycombinator.com/companies/doppler-labs",
        "websiteUrl": "https://hereplus.me",
        "founders": [{"name": "Noah Kraft", "role": "Founder & CEO"}, {"name": "Fritz Lanman", "role": "Executive Chairman"}],
        "fatalFlaw": "Shipped an ambitious smart earbud with real-time acoustic sound processing, but battery life was under 2 hours. Apple launched AirPods with instant pairing and 5-hour battery life at half the price, wiping out Doppler's sales.",
        "antiPatterns": [
            "Attempting to beat Apple on audio hardware manufacturing without vertical silicon supply chains.",
            "Promising a computational audio hearing-aid alternative without clinical regulatory approval.",
            "Over-allocating capital to celebrity marketing endorsements instead of silicon battery efficiency."
        ],
        "rebuildThesis": "Rebuild as an AI background noise cancellation and speech enhancement software plugin for Zoom, Google Meet, and podcast recording.",
        "businessModel": "Desktop software subscription ($8/mo) with zero hardware manufacturing risk."
    }
]

def seed_database():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    print(f"Connected to database at {DB_PATH}")
    
    seeded_count = 0
    for comp in COMPANIES:
        cursor.execute("SELECT id FROM Company WHERE slug = ?", (comp["slug"],))
        existing = cursor.fetchone()
        if existing:
            print(f"Skipping existing company: {comp['name']}")
            continue
            
        company_id = f"c_{uuid.uuid4().hex[:16]}"
        cursor.execute("""
            INSERT INTO Company (id, slug, name, batch, status, tagline, industry, location, foundedYear, closedYear, capitalBurned, fatalFlawSummary, ycUrl, websiteUrl)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            company_id,
            comp["slug"],
            comp["name"],
            comp["batch"],
            comp["status"],
            f"Rebuild {comp['name']} ({comp['industry']})",
            comp["industry"],
            comp["location"],
            comp["foundedYear"],
            comp["closedYear"],
            comp["capitalBurned"],
            comp["fatalFlawSummary"],
            comp.get("ycUrl"),
            comp.get("websiteUrl")
        ))
        
        for f in comp.get("founders", []):
            fid = f"f_{uuid.uuid4().hex[:16]}"
            cursor.execute("""
                INSERT INTO Founder (id, companyId, name, role)
                VALUES (?, ?, ?, ?)
            """, (fid, company_id, f["name"], f.get("role", "Co-founder")))
            
        teardown_id = f"t_{uuid.uuid4().hex[:16]}"
        sections = [
            {"title": "The Rise & The Venture Hype", "body": f"{comp['name']} raised {comp['capitalBurned']} to conquer the {comp['industry']} market. They experienced rapid early enthusiasm before structural bottlenecks emerged."},
            {"title": "The Fatal Bottleneck", "body": comp["fatalFlaw"]},
            {"title": "The 2026 Rebuild Blueprint", "body": comp["rebuildThesis"]}
        ]
        
        cursor.execute("""
            INSERT INTO Teardown (id, companyId, overview, fatalFlaw, antiPatterns, sections, rebuildThesis, businessModel, agentPrompt, previewChars, isPro, sources)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            teardown_id,
            company_id,
            f"{comp['name']} was founded in {comp['foundedYear']} in {comp['location']} with {comp['capitalBurned']} in venture capital. They attempted to scale rapidly in {comp['industry']}.",
            comp["fatalFlaw"],
            json.dumps(comp["antiPatterns"]),
            json.dumps(sections),
            comp["rebuildThesis"],
            comp["businessModel"],
            "", # Prompt is dynamically synthesized via getMasterDossier
            3000,
            1,
            json.dumps([comp.get("ycUrl", "https://ycombinator.com")])
        ))
        seeded_count += 1
        print(f"[OK] Seeded: {comp['name']} ({comp['capitalBurned']} burned)")
        
    conn.commit()
    conn.close()
    print(f"\nSuccessfully seeded {seeded_count} iconic dead startups into the graveyard!")

if __name__ == "__main__":
    seed_database()
