import sqlite3
import json
import os
import uuid

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "prisma", "dev.db")

COMPANIES = [
    # --- HARDWARE & WEARABLES ---
    {
        "name": "Pebble", "slug": "pebble", "batch": "W11", "status": "ACQUIRED",
        "industry": "Hardware & Wearables", "location": "Redwood City, CA",
        "foundedYear": 2012, "closedYear": 2016, "capitalBurned": "$43.0M",
        "fatalFlawSummary": "Over-extended inventory and debt to chase Apple Watch on features instead of doubling down on the 7-day battery e-paper niche.",
        "ycUrl": "https://www.ycombinator.com/companies/pebble", "websiteUrl": "https://pebble.com",
        "founders": [{"name": "Eric Migicovsky", "role": "Founder & CEO"}],
        "fatalFlaw": "Projected explosive mainstream growth and ordered millions of dollars in component inventory. When Apple Watch launched, demand collapsed. Pebble was stuck with warehouses of unsold watches and heavy venture debt.",
        "antiPatterns": [
            "Ordering speculative physical inventory ahead of verified consumer demand.",
            "Taking on venture debt with strict financial covenants to fund manufacturing runs.",
            "Abandoning a cult niche (7-day battery e-paper) to fight a trillion-dollar incumbent."
        ],
        "rebuildThesis": "Rebuild the Pebble ethos as an ultra-minimalist, open-source e-ink productivity wearable focused strictly on notifications, calendar, and health with a 14-day battery life.",
        "businessModel": "Direct-to-consumer hardware sold at a guaranteed 45% gross margin on pre-orders only paired with a $4.99/mo cloud app ecosystem."
    },
    {
        "name": "Jawbone", "slug": "jawbone", "batch": "W06", "status": "INACTIVE",
        "industry": "Hardware & Wearables", "location": "San Francisco, CA",
        "foundedYear": 1999, "closedYear": 2017, "capitalBurned": "$930.0M",
        "fatalFlawSummary": "Burned nearly $1 Billion across Bluetooth headsets and fitness trackers plagued by hardware failure rates and litigation.",
        "ycUrl": "https://www.crunchbase.com/organization/jawbone", "websiteUrl": "https://jawbone.com",
        "founders": [{"name": "Hosain Rahman", "role": "Founder & CEO"}],
        "fatalFlaw": "The UP fitness wristband suffered from catastrophic manufacturing defects (battery charging failures), resulting in massive return rates, inventory write-downs, and endless patent wars with Fitbit.",
        "antiPatterns": [
            "Shipping hardware with known thermal and water-resistance vulnerabilities to hit retail deadlines.",
            "Raising mega-rounds of debt to sustain operational bloat instead of restructuring.",
            "Fighting multi-year patent lawsuits that consumed tens of millions in legal fees."
        ],
        "rebuildThesis": "Rebuild as a medical-grade biometric software algorithm API licensing health diagnostics to existing smart rings and watch manufacturers.",
        "businessModel": "B2B API licensing: $1.50 per active device per month to OEM manufacturers."
    },
    {
        "name": "Lily Robotics", "slug": "lily-robotics", "batch": "W14", "status": "INACTIVE",
        "industry": "Hardware & Drones", "location": "San Francisco, CA",
        "foundedYear": 2013, "closedYear": 2017, "capitalBurned": "$15.0M",
        "fatalFlawSummary": "Collected $34M in pre-orders for a 'throw-and-shoot' camera drone with staged promotional videos before solving hardware flight dynamics.",
        "ycUrl": "https://www.crunchbase.com/organization/lily", "websiteUrl": "https://lilycamera.com",
        "founders": [{"name": "Antoine Balaresque", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Promotional launch video was staged using professional camera gear and DJI drones. Lily could not manufacture a stable drone at scale that met advertised specs and was forced to issue full refunds.",
        "antiPatterns": [
            "Faking product demos to generate viral Kickstarter pre-orders before solving engineering physics.",
            "Underestimating hardware tool tooling, injection molding, and FCC certification timelines.",
            "Spending customer pre-order deposits on operational payroll before shipping units."
        ],
        "rebuildThesis": "Rebuild as an AI follow-cam mobile app using existing smartphones paired with low-cost $50 motorized gimbals.",
        "businessModel": "Freemium mobile software app with $9.99/mo Pro auto-tracking AI tier."
    },
    {
        "name": "Doppler Labs", "slug": "doppler-labs", "batch": "W15", "status": "INACTIVE",
        "industry": "Hardware & Wearables", "location": "San Francisco, CA",
        "foundedYear": 2013, "closedYear": 2017, "capitalBurned": "$50.0M",
        "fatalFlawSummary": "Built computational audio earbuds ('Here One') that cost $299 with a 2-hour battery life right as Apple launched AirPods.",
        "ycUrl": "https://www.crunchbase.com/organization/doppler-labs", "websiteUrl": "https://dopplerlabs.com",
        "founders": [{"name": "Noah Kraft", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Underestimated the RF interference, battery density, and Bluetooth connectivity challenges of miniaturized earbuds. AirPods shipped with 5-hour battery and seamless pairing, instantly commoditizing Doppler.",
        "antiPatterns": [
            "Attempting to build consumer audio hardware with poor battery life (under 2 hours).",
            "Underestimating the Bluetooth chip supply chain and custom antenna engineering.",
            "Burning $50M on branding and Coachella sponsorships before stabilizing Bluetooth firmware."
        ],
        "rebuildThesis": "Rebuild as an AI audio processing software DSP app for existing iOS/Android devices providing real-time speech enhancement for the hard of hearing.",
        "businessModel": "Pure software subscription: $14.99/mo accessibility utility."
    },
    {
        "name": "Teforia", "slug": "teforia", "batch": "W15", "status": "INACTIVE",
        "industry": "Hardware & IoT", "location": "Mountain View, CA",
        "foundedYear": 2014, "closedYear": 2017, "capitalBurned": "$17.0M",
        "fatalFlawSummary": "Built a $999 Wi-Fi connected tea infuser that solved a non-existent problem for a tiny niche of tea enthusiasts.",
        "ycUrl": "https://www.crunchbase.com/organization/teforia", "websiteUrl": "https://teforia.com",
        "founders": [{"name": "Allen Han", "role": "Founder & CEO"}],
        "fatalFlaw": "Extreme silicon valley over-engineering. Consumers refused to pay $999 for an appliance that simply steeped loose-leaf tea with hot water.",
        "antiPatterns": [
            "Over-engineering a simple physical process (boiling water) with proprietary microchips.",
            "Pricing a kitchen appliance at $999 without a massive luxury consumer brand.",
            "Failing to establish a profitable replenishment cartridge/subscription ecosystem."
        ],
        "rebuildThesis": "Rebuild as a premium artisan tea subscription marketplace using standard teapots with QR-code guided steep timers on mobile.",
        "businessModel": "Direct-to-consumer tea subscription: $35/mo with 70% gross margins."
    },

    # --- FINTECH & PAYMENTS ---
    {
        "name": "Fast", "slug": "fast", "batch": "S20", "status": "INACTIVE",
        "industry": "Fintech & Payments", "location": "San Francisco, CA",
        "foundedYear": 2019, "closedYear": 2022, "capitalBurned": "$124.0M",
        "fatalFlawSummary": "Burned $10M/month with 400 employees while generating only $600k in annual revenue trying to build 1-click checkout.",
        "ycUrl": "https://www.crunchbase.com/organization/fast-checkout", "websiteUrl": "https://fast.co",
        "founders": [{"name": "Domm Holland", "role": "Co-founder & CEO"}],
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
        "name": "ScaleFactor", "slug": "scalefactor", "batch": "S17", "status": "INACTIVE",
        "industry": "Fintech & Accounting", "location": "Austin, TX",
        "foundedYear": 2014, "closedYear": 2020, "capitalBurned": "$100.0M",
        "fatalFlawSummary": "Promised automated AI bookkeeping to small businesses, but secretly used offshore human accountants in the Philippines who made catastrophic ledger errors.",
        "ycUrl": "https://www.crunchbase.com/organization/scalefactor", "websiteUrl": "https://scalefactor.com",
        "founders": [{"name": "Kurt Rathmann", "role": "Founder & CEO"}],
        "fatalFlaw": "Sold prospective venture capitalists and clients on proprietary AI accounting software that did not exist. Behind the scenes, outsourced human bookkeepers worked frantically in spreadsheets, misclassifying thousands of client transactions.",
        "antiPatterns": [
            "Selling AI automation before having functional deterministic software.",
            "Faking software capabilities with hidden, unscalable offshore labor.",
            "Prioritizing hyper-growth sales commissions over client audit accuracy."
        ],
        "rebuildThesis": "Rebuild as a deterministic, rule-based QuickBooks/Xero ledger reconciler powered by modern LLMs with strict human-in-the-loop sign-off.",
        "businessModel": "Self-serve micro-SaaS: $79/mo flat fee with zero human headcount."
    },
    {
        "name": "Coin", "slug": "coin", "batch": "W14", "status": "ACQUIRED",
        "industry": "Fintech & Hardware", "location": "San Francisco, CA",
        "foundedYear": 2013, "closedYear": 2016, "capitalBurned": "$15.0M",
        "fatalFlawSummary": "Consolidated all credit cards into one electronic plastic card right as Apple Pay and contactless NFC rendered physical magnetic swipes obsolete.",
        "ycUrl": "https://www.crunchbase.com/organization/coin", "websiteUrl": "https://onlycoin.com",
        "founders": [{"name": "Kanishk Parashar", "role": "Founder & CEO"}],
        "fatalFlaw": "Coin launched with massive crowdfunding hype ($2M in 40 minutes) for a programmable magnetic card. Severe manufacturing delays caused it to ship right as EMV chip cards and Apple Pay arrived, which Coin could not support.",
        "antiPatterns": [
            "Building hardware around an expiring technology standard (magnetic stripes).",
            "Suffering multi-year manufacturing delays while market tech shifted to NFC.",
            "Ignoring banking security regulations that blocked magnetic swipe replication."
        ],
        "rebuildThesis": "Rebuild as a virtual multi-card browser extension that dynamically optimizes cashback rewards and virtual credit card numbers.",
        "businessModel": "Interchange fee share + $4.99/mo premium cashback automation."
    },
    {
        "name": "Beepi", "slug": "beepi", "batch": "W14", "status": "INACTIVE",
        "industry": "Fintech & Automotive", "location": "Los Altos, CA",
        "foundedYear": 2013, "closedYear": 2017, "capitalBurned": "$150.0M",
        "fatalFlawSummary": "Peer-to-peer used car marketplace burned $7M/month on executive salaries, $10,000 conference room chairs, and guaranteed dealer payouts.",
        "ycUrl": "https://www.crunchbase.com/organization/beepi", "websiteUrl": "https://beepi.com",
        "founders": [{"name": "Ale Resnik", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Offered guaranteed sales: if a car did not sell in 30 days, Beepi bought it. As inventory sat, Beepi became an illiquid used car dealership burning millions on parking lots and towing logistics.",
        "antiPatterns": [
            "Assuming capital liability (guaranteeing to purchase unsold cars) on a marketplace.",
            "Extravagant corporate overhead ($7M monthly burn with 300 employees).",
            "Failing to verify unit margins on heavy physical asset logistics."
        ],
        "rebuildThesis": "Rebuild as an automated vehicle pricing and inspection verification API for private party buyers with zero physical inventory.",
        "businessModel": "$19.99 per vehicle inspection report + financing lead-gen fees."
    },

    # --- LOGISTICS, GIG & ON-DEMAND ---
    {
        "name": "Shyp", "slug": "shyp", "batch": "W14", "status": "INACTIVE",
        "industry": "Logistics & Delivery", "location": "San Francisco, CA",
        "foundedYear": 2013, "closedYear": 2018, "capitalBurned": "$62.0M",
        "fatalFlawSummary": "Offered $5 courier pickups where a courier drove to your house, boxed your item, and mailed it, losing $20 per order.",
        "ycUrl": "https://www.crunchbase.com/organization/shyp", "websiteUrl": "https://shyp.com",
        "founders": [{"name": "Kevin Gibbon", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Subsidized consumer shipping pickups at $5 flat fee. Operational costs for driver time, custom cardboard boxes, and vehicle depreciation exceeded $25 per pickup.",
        "antiPatterns": [
            "Subsidizing labor-heavy consumer services below actual variable delivery cost.",
            "Focusing on casual consumer eBay sellers instead of high-margin B2B commercial shippers.",
            "Opening expensive warehouse hubs in high-rent urban locations."
        ],
        "rebuildThesis": "Rebuild as a zero-headcount shipping label optimization and carrier rate aggregation API for micro-brands.",
        "businessModel": "$0.05 per generated shipping label + 10% carrier volume discount arbitrage."
    },
    {
        "name": "Homejoy", "slug": "homejoy", "batch": "S10", "status": "INACTIVE",
        "industry": "Gig Economy & Services", "location": "San Francisco, CA",
        "foundedYear": 2010, "closedYear": 2015, "capitalBurned": "$40.0M",
        "fatalFlawSummary": "Subsidized $19 cleanings attracted bargain hunters who never retained, while 1099 labor classification lawsuits killed margins.",
        "ycUrl": "https://www.crunchbase.com/organization/homejoy", "websiteUrl": "https://homejoy.com",
        "founders": [{"name": "Adora Cheung", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Customer acquisition cost exceeded customer lifetime value because promotional discounts attracted cheap, non-recurring clients. Simultaneously, workers circumvented the platform for cash payments.",
        "antiPatterns": [
            "Running deeply unprofitable customer acquisition promos ($19 for 3 hours) without cohort retention.",
            "Failing to prevent off-platform disintermediation between cleaners and homeowners.",
            "Expanding to 30+ international cities before mastering unit economics."
        ],
        "rebuildThesis": "Rebuild as a pure SaaS operating system for independent cleaning business owners (CRM, scheduling, invoicing, SMS dispatch) rather than an on-demand labor marketplace.",
        "businessModel": "Vertical SaaS subscription: $49/mo for solo cleaners, $149/mo for small cleaning agencies."
    },
    {
        "name": "Zirtual", "slug": "zirtual", "batch": "W13", "status": "INACTIVE",
        "industry": "B2B Services & Virtual Assistants", "location": "San Francisco, CA",
        "foundedYear": 2011, "closedYear": 2015, "capitalBurned": "$5.5M",
        "fatalFlawSummary": "Abruptly laid off 400 workers overnight due to miscalculated payroll taxes and operational accounting blindspots.",
        "ycUrl": "https://www.crunchbase.com/organization/zirtual", "websiteUrl": "https://zirtual.com",
        "founders": [{"name": "Maren Kate Donovan", "role": "Founder & CEO"}],
        "fatalFlaw": "Transitioned hundreds of independent contractors to full-time W2 employees with healthcare benefits without updating pricing or tracking payroll tax liabilities. Burn outpaced cash reserves overnight.",
        "antiPatterns": [
            "Switching contractor business models to W2 employment without financial modeling.",
            "Lacking real-time CFO visibility into burn rate and tax withholding liabilities.",
            "Subsidizing human assistant hours below actual fully loaded labor costs."
        ],
        "rebuildThesis": "Rebuild as an autonomous AI Executive Assistant agent operating inside Slack, Gmail, and Google Calendar that triages email and schedules meetings for $29/mo.",
        "businessModel": "100% automated software subscription: $29/mo Starter, $79/mo Executive. Zero human employees on payroll."
    },
    {
        "name": "FlightCar", "slug": "flightcar", "batch": "W13", "status": "ACQUIRED",
        "industry": "Peer-to-Peer Car Sharing", "location": "San Francisco, CA",
        "foundedYear": 2012, "closedYear": 2016, "capitalBurned": "$40.0M",
        "fatalFlawSummary": "Airport peer-to-peer car rental suffered astronomical fleet insurance claims, airport municipal lawsuits, and vehicle wear.",
        "ycUrl": "https://www.crunchbase.com/organization/flightcar", "websiteUrl": "https://flightcar.com",
        "founders": [{"name": "Rujul Zaparde", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Offered travelers free airport parking in exchange for renting their cars out to incoming travelers. Commercial auto insurance payouts for totaled vehicles and high airport parking leases made unit margins deeply negative.",
        "antiPatterns": [
            "Underestimating insurance liability and fraud in peer-to-peer vehicle sharing.",
            "Operating in heavily regulated municipal airport jurisdictions without lobbying power.",
            "Labor-intensive vehicle cleaning, inspection, and lot shuttle operations."
        ],
        "rebuildThesis": "Rebuild as a B2B airport parking reservation and automated shuttle scheduling software for existing airport parking operators.",
        "businessModel": "Vertical SaaS: $199/mo per parking lot facility + $1.50 booking fee."
    },
    {
        "name": "Omni", "slug": "omni", "batch": "W15", "status": "INACTIVE",
        "industry": "Consumer Storage & Logistics", "location": "San Francisco, CA",
        "foundedYear": 2014, "closedYear": 2019, "capitalBurned": "$35.0M",
        "fatalFlawSummary": "Photographed and delivered individual stored items on-demand for $3/month, losing money on every single delivery van trip.",
        "ycUrl": "https://www.crunchbase.com/organization/omni-storage", "websiteUrl": "https://beomni.com",
        "founders": [{"name": "Thomas McLeod", "role": "Founder & CEO"}],
        "fatalFlaw": "Omni charged customers as little as $0.50/month to store a bicycle helmet and offered free concierge retrieval. The cost of labor to photograph, catalog, store, and drive an item back to a customer was 20x the subscription revenue.",
        "antiPatterns": [
            "Offering individual item-level pickup and delivery at micro-pricing.",
            "Underwriting expensive urban warehouse leases for low-value consumer junk.",
            "Failing to charge market delivery fees for courier trips."
        ],
        "rebuildThesis": "Rebuild as an asset-light peer-to-peer storage marketplace (connecting neighbors with spare garage space) with zero warehouse or van overhead.",
        "businessModel": "15% marketplace commission on monthly garage space rentals."
    },
    {
        "name": "Starsky Robotics", "slug": "starsky-robotics", "batch": "S17", "status": "INACTIVE",
        "industry": "Autonomous Vehicles & Robotics", "location": "San Francisco, CA",
        "foundedYear": 2015, "closedYear": 2020, "capitalBurned": "$20.0M",
        "fatalFlawSummary": "Self-driving truck pioneer ran out of capital because venture investors shifted from self-driving hardware to AI software.",
        "ycUrl": "https://www.crunchbase.com/organization/starsky-robotics", "websiteUrl": "https://starsky.io",
        "founders": [{"name": "Stefan Seltz-Axmacher", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Starsky successfully drove unmanned trucks on Florida highways, but operating a licensed freight trucking company alongside an autonomous robotics lab required hundreds of millions of dollars that mid-tier VCs would not supply.",
        "antiPatterns": [
            "Attempting to scale a safety-critical autonomous vehicle hardware platform with small venture rounds.",
            "Operating a low-margin traditional trucking fleet to finance software R&D.",
            "Depending on continuous mega-funding rounds during capital market contractions."
        ],
        "rebuildThesis": "Rebuild as a tele-operation dispatch and remote driver monitoring software platform for existing electric yard tractors.",
        "businessModel": "B2B SaaS: $450/mo per connected terminal tractor in private distribution centers."
    },

    # --- B2B SAAS & ENTERPRISE ---
    {
        "name": "Atrium", "slug": "atrium", "batch": "W17", "status": "INACTIVE",
        "industry": "Legal Tech", "location": "San Francisco, CA",
        "foundedYear": 2017, "closedYear": 2020, "capitalBurned": "$75.5M",
        "fatalFlawSummary": "Attempted to disrupt corporate legal services by hiring 100+ high-salary partners while building software that lawyers refused to adopt.",
        "ycUrl": "https://www.crunchbase.com/organization/atrium-lts", "websiteUrl": "https://atrium.co",
        "founders": [{"name": "Justin Kan", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Tried to be both a tech software company and a licensed law firm. Software development could not keep pace with the massive salaried burn of corporate attorneys who preferred Microsoft Word and billable hours.",
        "antiPatterns": [
            "Hiring high-salary service specialists before software workflows were automated.",
            "Fighting industry structural incentives (billable hours vs. software efficiency).",
            "Scaling team headcount to 200+ employees on speculative software productivity gains."
        ],
        "rebuildThesis": "Rebuild as a 100% self-serve legal document generator and automated cap-table compliance engine with zero attorneys on payroll.",
        "businessModel": "Self-serve micro-SaaS: $99/mo for seed-stage startups."
    },
    {
        "name": "HigherMe", "slug": "higherme", "batch": "W15", "status": "ACTIVE",
        "industry": "B2B SaaS & HR", "location": "Boston, MA",
        "foundedYear": 2014, "closedYear": None, "capitalBurned": "$3.2M",
        "fatalFlawSummary": "High customer churn among franchise restaurant owners due to enterprise sales cycles and heavy manual phone screening.",
        "ycUrl": "https://www.ycombinator.com/companies/higherme", "websiteUrl": "https://higherme.com",
        "founders": [{"name": "Rob Hunter", "role": "Founder & CEO"}],
        "fatalFlaw": "Selling enterprise applicant tracking software into franchise operators required high-friction field sales reps, while turnover in retail/restaurant labor caused severe account churn.",
        "antiPatterns": [
            "Relying on field sales reps to close small franchise retail owners with low ACVs.",
            "Building heavy desktop-first hiring portals for mobile-first hourly restaurant workers.",
            "Neglecting automated SMS interview scheduling in early iterations."
        ],
        "rebuildThesis": "Rebuild as a zero-sales, 100% WhatsApp/SMS autonomous recruiting bot that screens hourly workers and books interviews in 90 seconds.",
        "businessModel": "$49/mo per restaurant location, self-serve with instant 14-day card-free trial."
    },
    {
        "name": "LunchBadger", "slug": "lunchbadger", "batch": "W16", "status": "INACTIVE",
        "industry": "Developer Tools & API", "location": "San Francisco, CA",
        "foundedYear": 2015, "closedYear": 2019, "capitalBurned": "$2.1M",
        "fatalFlawSummary": "Complex Kubernetes API microservices gateway was too heavyweight for solo devs and too unproven for Fortune 500 CIOs.",
        "ycUrl": "https://www.crunchbase.com/organization/lunchbadger", "websiteUrl": "https://lunchbadger.com",
        "founders": [{"name": "Al Momir", "role": "Founder & CEO"}],
        "fatalFlaw": "Caught in the enterprise developer tool chasm: too complex for individual engineers to install self-serve, but lacked the enterprise security compliance and brand authority to win six-figure enterprise contracts.",
        "antiPatterns": [
            "Building an enterprise developer product without a bottom-up open-source adoption wedge.",
            "Targeting complex Kubernetes orchestration before cloud managed services matured.",
            "Long 9-month sales cycles that drained runway with small average deal sizes."
        ],
        "rebuildThesis": "Rebuild as a lightweight, single-binary API gateway and webhook proxy that runs locally with Docker in 30 seconds.",
        "businessModel": "Open core: Free for solo devs; $49/mo for team RBAC and audit logging."
    },
    {
        "name": "Shipwise", "slug": "shipwise", "batch": "S18", "status": "INACTIVE",
        "industry": "E-Commerce Infrastructure", "location": "San Francisco, CA",
        "foundedYear": 2017, "closedYear": 2021, "capitalBurned": "$1.8M",
        "fatalFlawSummary": "Automated order routing software struggled to achieve negative net churn against Shopify's native ecosystem.",
        "ycUrl": "https://www.crunchbase.com/organization/shipwise", "websiteUrl": "https://shipwise.com",
        "founders": [{"name": "David Zhou", "role": "Founder & CEO"}],
        "fatalFlaw": "Shopify launched native multi-location order routing for free, wiping out Shipwise's standalone value proposition for independent e-commerce stores.",
        "antiPatterns": [
            "Building a single-feature micro-SaaS on a platform without deep data moats.",
            "Ignoring platform roadmap indicators from Shopify App Store leadership.",
            "Failing to expand into warehouse 3PL integrations before platform replication."
        ],
        "rebuildThesis": "Rebuild as a cross-platform inventory sync and split-fulfillment optimizer bridging TikTok Shop, Amazon FBA, and Shopify.",
        "businessModel": "$89/mo for omni-channel sellers processing over 1,000 orders/mo."
    },

    # --- CONSUMER AUDIO & SOCIAL ---
    {
        "name": "Rdio", "slug": "rdio", "batch": "W10", "status": "ACQUIRED",
        "industry": "Consumer Audio & Streaming", "location": "San Francisco, CA",
        "foundedYear": 2010, "closedYear": 2015, "capitalBurned": "$125.0M",
        "fatalFlawSummary": "Believed superior UI/UX would beat Spotify's aggressive free-tier viral distribution and telco bundling.",
        "ycUrl": "https://www.crunchbase.com/organization/rdio", "websiteUrl": "https://rdio.com",
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
        "name": "Secret", "slug": "secret", "batch": "W14", "status": "INACTIVE",
        "industry": "Consumer Social", "location": "San Francisco, CA",
        "foundedYear": 2014, "closedYear": 2015, "capitalBurned": "$35.0M",
        "fatalFlawSummary": "Toxicity, cyberbullying, and unmoderated gossip destroyed retention once early Silicon Valley curiosity faded.",
        "ycUrl": "https://www.crunchbase.com/organization/secret-app", "websiteUrl": "https://secret.ly",
        "founders": [{"name": "David Byttow", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Anonymous social networks suffer from an adverse selection loop: unmoderated anonymity attracts cyberbullying and toxic rumors, driving away high-signal users until the network rots.",
        "antiPatterns": [
            "Building an engagement loop dependent on negativity, slander, and unverified rumors.",
            "Failing to build positive long-term utility beyond short-lived voyeuristic novelty.",
            "Allowing founders to take millions off the table in secondary sales during the peak of an unsustainable hype cycle."
        ],
        "rebuildThesis": "Rebuild as an anonymous, verified workplace salary and culture intelligence community (similar to Blind) with cryptographic corporate domain verification.",
        "businessModel": "Free for employees; B2B employer branding and enterprise talent intelligence subscriptions at $499/mo."
    },
    {
        "name": "Yik Yak", "slug": "yik-yak", "batch": "W14", "status": "INACTIVE",
        "industry": "Consumer Social & Campus", "location": "Atlanta, GA",
        "foundedYear": 2013, "closedYear": 2017, "capitalBurned": "$73.5M",
        "fatalFlawSummary": "Hyper-local anonymous feed took over US college campuses, then collapsed after removing anonymity and failing to monetize.",
        "ycUrl": "https://www.crunchbase.com/organization/yik-yak", "websiteUrl": "https://yikyak.com",
        "founders": [{"name": "Tyler Droll", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Pressured by university administrators over campus harassment, Yik Yak forced users to adopt permanent user handles. Removing core anonymity destroyed viral engagement overnight.",
        "antiPatterns": [
            "Removing the single core mechanic (anonymity) that drove 99% of user engagement.",
            "Raising $73M at a $400M valuation with zero monetization model or revenue strategy.",
            "Failing to implement automated AI sentiment moderation before public relations backlash."
        ],
        "rebuildThesis": "Rebuild as an anonymous, geofenced campus marketplace and verified housing lease takeover board.",
        "businessModel": "Transaction escrow fee (3%) on student-to-student sublets and ticket resales."
    },
    {
        "name": "HQ Trivia", "slug": "hq-trivia", "batch": "W18", "status": "INACTIVE",
        "industry": "Consumer Gaming & Media", "location": "New York, NY",
        "foundedYear": 2017, "closedYear": 2020, "capitalBurned": "$15.0M",
        "fatalFlawSummary": "Appointment-gaming sensation captured 2M concurrent players, but cash prize burn outpaced sponsor revenue amid technical crashes.",
        "ycUrl": "https://www.crunchbase.com/organization/hq-trivia", "websiteUrl": "https://hqtrivia.com",
        "founders": [{"name": "Rus Yusupov", "role": "Co-founder"}, {"name": "Colin Kroll", "role": "Co-founder"}],
        "fatalFlaw": "HQ Trivia paid out $400,000+ per month in cash prizes to maintain daily active users. When app server latency caused players to lose on lag, users churned in droves.",
        "antiPatterns": [
            "Subsidizing user retention through massive cash prize giveaways with high daily cash drain.",
            "Failing to architect ultra-low-latency WebSocket infrastructure for 2M concurrent video streams.",
            "Severe co-founder governance turmoil and executive dysfunction."
        ],
        "rebuildThesis": "Rebuild as a lightweight, interactive live-polling and gamified quiz SDK for corporate town halls, webinars, and conferences.",
        "businessModel": "B2B SaaS: $299/mo for enterprise Zoom/Teams interactive live events."
    },
    {
        "name": "Vine", "slug": "vine", "batch": "S12", "status": "ACQUIRED",
        "industry": "Consumer Video & Creator", "location": "New York, NY",
        "foundedYear": 2012, "closedYear": 2016, "capitalBurned": "$20.0M",
        "fatalFlawSummary": "Pioneered 6-second looping video, but Twitter failed to monetize creators, who defected to Instagram and YouTube.",
        "ycUrl": "https://www.crunchbase.com/organization/vine", "websiteUrl": "https://vine.co",
        "founders": [{"name": "Dom Hofmann", "role": "Co-founder"}, {"name": "Colin Kroll", "role": "Co-founder"}],
        "fatalFlaw": "Vine created the blueprint for TikTok, but Twitter executives neglected the app. When top creators demanded a revenue-share model and were refused, 50 top Viners left for Instagram and YouTube on the same day.",
        "antiPatterns": [
            "Neglecting top creator monetization and ad-revenue sharing.",
            "Corporate parent (Twitter) deprioritizing mobile app infrastructure and algorithmic feeds.",
            "Refusing to expand video length beyond rigid 6-second constraints."
        ],
        "rebuildThesis": "Rebuild as a zero-latency micro-video clip compressor and automated watermark generator for short-form creators.",
        "businessModel": "$19/mo creator toolkit with automated cross-posting to Reels, Shorts, and TikTok."
    },
    {
        "name": "Munchery", "slug": "munchery", "batch": "W12", "status": "INACTIVE",
        "industry": "Food & Ghost Kitchens", "location": "San Francisco, CA",
        "foundedYear": 2010, "closedYear": 2019, "capitalBurned": "$125.0M",
        "fatalFlawSummary": "Cooked thousands of chef-prepared gourmet meals daily in commissary kitchens, throwing away millions of dollars of unsold food every week.",
        "ycUrl": "https://www.crunchbase.com/organization/munchery", "websiteUrl": "https://munchery.com",
        "founders": [{"name": "Tri Tran", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Munchery took on the entire vertical stack: leased massive commercial kitchens, hired salaried executive chefs, and operated delivery fleets. Over-production waste ran as high as 30% of daily food prep.",
        "antiPatterns": [
            "Attempting full vertical integration (cooking + delivery + software) in low-margin perishables.",
            "Suffering catastrophic food waste through speculative daily batch cooking.",
            "Burning $125M in venture subsidies to make $14 gourmet dinners economically viable."
        ],
        "rebuildThesis": "Rebuild as a predictive AI demand forecasting and kitchen inventory management software for independent ghost kitchens.",
        "businessModel": "B2B SaaS: $149/mo per kitchen facility, cutting food spoilage waste by 40%."
    },
    {
        "name": "Sprig", "slug": "sprig", "batch": "W14", "status": "INACTIVE",
        "industry": "On-Demand Food Delivery", "location": "San Francisco, CA",
        "foundedYear": 2013, "closedYear": 2017, "capitalBurned": "$56.0M",
        "fatalFlawSummary": "Promised 15-minute organic meal delivery with warm food kept in roaming car trunks, losing $6 on every single meal delivered.",
        "ycUrl": "https://www.crunchbase.com/organization/sprig", "websiteUrl": "https://sprig.com",
        "founders": [{"name": "Gagan Biyani", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Kept warm food in roaming vehicles across San Francisco so meals could arrive in under 15 minutes. Unsold meals timed out and were discarded, while full-time courier hourly wages made unit economics impossible.",
        "antiPatterns": [
            "Operating floating delivery fleets with speculative heated inventory.",
            "Ignoring unit margin realities in high-congestion urban street networks.",
            "Subsidizing food and delivery costs simultaneously."
        ],
        "rebuildThesis": "Rebuild as an intelligent local meal-prep pre-order batching network connecting neighborhood corporate offices with local restaurants.",
        "businessModel": "15% platform commission on pre-ordered, scheduled lunch drops."
    },
    {
        "name": "SpoonRocket", "slug": "spoonrocket", "batch": "W14", "status": "INACTIVE",
        "industry": "On-Demand Food Delivery", "location": "Berkeley, CA",
        "foundedYear": 2013, "closedYear": 2016, "capitalBurned": "$13.5M",
        "fatalFlawSummary": "$8 meals delivered in 10 minutes from roaming cars collapsed under gas costs, delivery courier churn, and kitchen overhead.",
        "ycUrl": "https://www.crunchbase.com/organization/spoonrocket", "websiteUrl": "https://spoonrocket.com",
        "founders": [{"name": "Steven Hsiao", "role": "Co-founder & CEO"}],
        "fatalFlaw": "Sold $8 hot lunches with free delivery. The driver compensation alone was $10 to $15 per hour, requiring drivers to deliver 4 to 5 meals every single hour to break even—a mathematical impossibility in city traffic.",
        "antiPatterns": [
            "Racing to the bottom on price ($8 meal with free delivery).",
            "Failing to charge a delivery fee or dynamic surge pricing.",
            "Expanding into secondary college markets with poor off-peak utilization."
        ],
        "rebuildThesis": "Rebuild as a corporate catering group-ordering app for tech offices that aggregates 30+ orders into a single scheduled daily delivery.",
        "businessModel": "12% marketplace fee from restaurant vendors on $500+ bulk catering drops."
    },
    {
        "name": "Quibi", "slug": "quibi", "batch": "W19", "status": "INACTIVE",
        "industry": "Consumer Media & Streaming", "location": "Los Angeles, CA",
        "foundedYear": 2018, "closedYear": 2020, "capitalBurned": "$1750.0M",
        "fatalFlawSummary": "Hollywood executive hubris spent $1.75 Billion on 10-minute mobile videos that barred screenshots and launched into COVID lockdowns.",
        "ycUrl": "https://www.crunchbase.com/organization/quibi", "websiteUrl": "https://quibi.com",
        "founders": [{"name": "Jeffrey Katzenberg", "role": "Founder"}, {"name": "Meg Whitman", "role": "CEO"}],
        "fatalFlaw": "Refused to understand consumer mobile habits. Quibi spent up to $100,000 per minute on Hollywood productions while strictly blocking screenshots and social sharing. Consumers preferred free TikTok and YouTube.",
        "antiPatterns": [
            "Spending $1.75 Billion before testing consumer willingness-to-pay.",
            "Banning user screenshotting and meme sharing, killing all organic viral growth.",
            "Believing Hollywood executive prestige triumphs over native internet distribution."
        ],
        "rebuildThesis": "Rebuild as an AI short-form screenplay and storyboarding tool for independent micro-drama creators producing vertical video series.",
        "businessModel": "$39/mo SaaS subscription for web-novel and vertical video production teams."
    },
    {
        "name": "Theranos", "slug": "theranos", "batch": "W04", "status": "INACTIVE",
        "industry": "HealthTech & Diagnostics", "location": "Palo Alto, CA",
        "foundedYear": 2003, "closedYear": 2018, "capitalBurned": "$700.0M",
        "fatalFlawSummary": "Fraudulent 'Edison' blood-testing machine produced falsified medical diagnostic results while running tests on modified Siemens machines.",
        "ycUrl": "https://www.crunchbase.com/organization/theranos", "websiteUrl": "https://theranos.com",
        "founders": [{"name": "Elizabeth Holmes", "role": "Founder & CEO"}],
        "fatalFlaw": "The underlying micro-fluidic technology was scientifically impossible: a single drop of blood from a finger-prick is corrupted by broken cell interstitial fluid and cannot run 200 medical assays accurately.",
        "antiPatterns": [
            "Faking clinical medical laboratory test data to mislead regulators and partners.",
            "Operating in extreme secrecy and penalizing scientific whistleblowers with non-disclosure lawsuits.",
            "Appointing a corporate board of politicians and generals with zero medical or diagnostic expertise."
        ],
        "rebuildThesis": "Rebuild as an open-source clinical lab test price transparency and insurance coverage comparison engine for patients.",
        "businessModel": "Direct-to-consumer out-of-pocket savings tool: $4.99 per lab report audit + insurance rebate claims."
    },
    {
        "name": "Juicero", "slug": "juicero", "batch": "W15", "status": "INACTIVE",
        "industry": "Consumer Hardware & IoT", "location": "San Francisco, CA",
        "foundedYear": 2013, "closedYear": 2017, "capitalBurned": "$120.0M",
        "fatalFlawSummary": "Engineered a $699 Wi-Fi connected cold-press juicer until Bloomberg revealed customers could squeeze the juice packets faster by hand.",
        "ycUrl": "https://www.crunchbase.com/organization/juicero", "websiteUrl": "https://juicero.com",
        "founders": [{"name": "Doug Evans", "role": "Founder & CEO"}],
        "fatalFlaw": "Over-engineered an industrial 4-ton pressure press with airplane-grade aluminum and optical QR-code readers to squeeze a bag of pre-chopped organic fruit. The moment hand-squeezing videos went viral, the brand became a laughingstock.",
        "antiPatterns": [
            "Building high-cost custom hardware for an action that can be performed by human hands.",
            "Locking consumers into proprietary QR-coded bag DRM subscriptions.",
            "Allowing founder hubris to outpace common-sense product utility."
        ],
        "rebuildThesis": "Rebuild as an artisan cold-pressed juice concentrate subscription for boutique gyms and offices using simple tap dispensers.",
        "businessModel": "B2B recurring bag-in-box juice subscription: $199/mo per office breakroom."
    },
    {
        "name": "Solyndra", "slug": "solyndra", "batch": "W06", "status": "INACTIVE",
        "industry": "CleanTech & Energy", "location": "Fremont, CA",
        "foundedYear": 2005, "closedYear": 2011, "capitalBurned": "$1000.0M",
        "fatalFlawSummary": "Constructed cylindrical solar panels that were instantly obsoleted when traditional silicon solar panel prices dropped by 80%.",
        "ycUrl": "https://www.crunchbase.com/organization/solyndra", "websiteUrl": "https://solyndra.com",
        "founders": [{"name": "Christian Gronet", "role": "Founder & CEO"}],
        "fatalFlaw": "Built massive robotic automated factories to manufacture expensive cylindrical CIGS solar tubes based on the assumption that raw silicon prices would stay high ($400/kg). When global silicon plunged to $50/kg, Solyndra's manufacturing costs were 3x market retail.",
        "antiPatterns": [
            "Betting a billion dollars of capital expenditure on the high commodity price of a substitute material.",
            "Building lavish manufacturing facilities before securing long-term unsubsidized supply contracts.",
            "Inability to pivot fixed capital-intensive manufacturing lines when market prices shifted."
        ],
        "rebuildThesis": "Rebuild as an asset-light commercial rooftop solar feasibility and satellite shade analysis software platform.",
        "businessModel": "B2B SaaS: $249/mo per commercial solar contractor for instant CAD layout proposals."
    },
    {
        "name": "Webvan", "slug": "webvan", "batch": "W99", "status": "INACTIVE",
        "industry": "Grocery & Logistics", "location": "Foster City, CA",
        "foundedYear": 1996, "closedYear": 2001, "capitalBurned": "$800.0M",
        "fatalFlawSummary": "Dotcom casualty committed $1 Billion to build automated robotic grocery warehouses across 26 cities before proving consumer internet grocery demand.",
        "ycUrl": "https://www.crunchbase.com/organization/webvan", "websiteUrl": "https://webvan.com",
        "founders": [{"name": "Louis Borders", "role": "Founder"}],
        "fatalFlaw": "Classic 'Get Big Fast' dotcom catastrophe. Built 26 massive $30M automated distribution warehouses with custom carousels and conveyor belts in cities with zero customer density. Burn outstripped grocery margins of 1-2%.",
        "antiPatterns": [
            "Committing hundreds of millions in infrastructure capex before verifying consumer demand.",
            "Entering thin-margin grocery retail without local geographic density.",
            "Expanding to multiple nationwide regions simultaneously before unit profitability."
        ],
        "rebuildThesis": "Rebuild as an inventory forecasting and local supplier drop-shipping software for independent specialty grocery stores.",
        "businessModel": "Vertical SaaS: $129/mo per independent grocer."
    }
]

def seed_large_graveyard():
    print(f"Connecting to database at {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    seeded = 0
    updated = 0
    
    for comp in COMPANIES:
        # Check if company already exists
        cursor.execute("SELECT id FROM Company WHERE slug = ?", (comp["slug"],))
        row = cursor.fetchone()
        
        if row:
            company_id = row[0]
            # Update existing company with richer fields
            cursor.execute("""
                UPDATE Company 
                SET capitalBurned = ?, fatalFlawSummary = ?, industry = ?, ycUrl = ?, websiteUrl = ?, status = ?
                WHERE id = ?
            """, (comp["capitalBurned"], comp["fatalFlawSummary"], comp["industry"], comp["ycUrl"], comp["websiteUrl"], comp["status"], company_id))
            
            # Update or insert teardown
            cursor.execute("SELECT id FROM Teardown WHERE companyId = ?", (company_id,))
            td_row = cursor.fetchone()
            
            sections = [
                {"title": "The Rise & Market Context", "body": f"{comp['name']} raised {comp['capitalBurned']} to conquer {comp['industry']}. They expanded aggressively from their base in {comp['location']}."},
                {"title": "The Fatal Terminal Bottleneck", "body": comp["fatalFlaw"]},
                {"title": "The 2026 Lean Rebuild Blueprint", "body": comp["rebuildThesis"]}
            ]
            
            if td_row:
                cursor.execute("""
                    UPDATE Teardown
                    SET fatalFlaw = ?, antiPatterns = ?, rebuildThesis = ?, businessModel = ?, sections = ?
                    WHERE id = ?
                """, (
                    comp["fatalFlaw"],
                    json.dumps(comp["antiPatterns"]),
                    comp["rebuildThesis"],
                    comp["businessModel"],
                    json.dumps(sections),
                    td_row[0]
                ))
            else:
                cursor.execute("""
                    INSERT INTO Teardown (id, companyId, overview, fatalFlaw, antiPatterns, sections, rebuildThesis, businessModel, agentPrompt, previewChars, isPro, sources)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    str(uuid.uuid4()),
                    company_id,
                    f"{comp['name']} raised {comp['capitalBurned']} in {comp['industry']} before collapsing.",
                    comp["fatalFlaw"],
                    json.dumps(comp["antiPatterns"]),
                    json.dumps(sections),
                    comp["rebuildThesis"],
                    comp["businessModel"],
                    "",
                    3000,
                    1,
                    json.dumps([comp.get("ycUrl", "https://ycombinator.com")])
                ))
            updated += 1
            print(f"[UPDATED] {comp['name']} ({comp['capitalBurned']})")
        else:
            # Insert new company
            company_id = str(uuid.uuid4())
            cursor.execute("""
                INSERT INTO Company (id, slug, name, batch, status, tagline, industry, location, foundedYear, closedYear, capitalBurned, fatalFlawSummary, ycUrl, websiteUrl)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                company_id,
                comp["slug"],
                comp["name"],
                comp["batch"],
                comp["status"],
                comp["fatalFlawSummary"],
                comp["industry"],
                comp["location"],
                comp["foundedYear"],
                comp["closedYear"],
                comp["capitalBurned"],
                comp["fatalFlawSummary"],
                comp["ycUrl"],
                comp["websiteUrl"]
            ))
            
            # Insert Founder
            for f in comp.get("founders", []):
                cursor.execute("""
                    INSERT INTO Founder (id, companyId, name, role)
                    VALUES (?, ?, ?, ?)
                """, (str(uuid.uuid4()), company_id, f["name"], f.get("role", "Founder")))
                
            # Insert Teardown
            sections = [
                {"title": "The Rise & Market Context", "body": f"{comp['name']} was founded in {comp['foundedYear']} in {comp['location']} with {comp['capitalBurned']} in venture capital backing. They attempted to scale rapidly in {comp['industry']}."},
                {"title": "The Fatal Terminal Bottleneck", "body": comp["fatalFlaw"]},
                {"title": "The 2026 Lean Rebuild Blueprint", "body": comp["rebuildThesis"]}
            ]
            
            cursor.execute("""
                INSERT INTO Teardown (id, companyId, overview, fatalFlaw, antiPatterns, sections, rebuildThesis, businessModel, agentPrompt, previewChars, isPro, sources)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                str(uuid.uuid4()),
                company_id,
                f"{comp['name']} raised {comp['capitalBurned']} in {comp['industry']}. They attempted to scale rapidly before running into fatal unit economics.",
                comp["fatalFlaw"],
                json.dumps(comp["antiPatterns"]),
                json.dumps(sections),
                comp["rebuildThesis"],
                comp["businessModel"],
                "",
                3000,
                1,
                json.dumps([comp.get("ycUrl", "https://ycombinator.com")])
            ))
            seeded += 1
            print(f"[SEEDED NEW] {comp['name']} ({comp['capitalBurned']})")
            
    conn.commit()
    
    total = cursor.execute("SELECT COUNT(*) FROM Company").fetchone()[0]
    conn.close()
    
    print(f"\nGraveyard Population Complete!")
    print(f" - Seeded New: {seeded}")
    print(f" - Updated Existing: {updated}")
    print(f" - Total Dossiers in Database: {total}")

if __name__ == "__main__":
    seed_large_graveyard()
