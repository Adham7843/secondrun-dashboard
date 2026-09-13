import sqlite3
import json
import os
import uuid
import random

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "prisma", "dev.db")
JSON_OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "startups-1200.json")

# Curated real-world historical startup casualties
FAMOUS_HISTORICAL_STARTUPS = [
    {
        "name": "Better Place", "slug": "better-place", "batch": "W08", "status": "INACTIVE",
        "industry": "Hardware & IoT", "location": "Palo Alto, CA",
        "foundedYear": 2007, "closedYear": 2013, "capitalBurned": "$850.0M",
        "fatalFlawSummary": "Spent $850M building robotic battery-swap stations worldwide before major automakers agreed to standardize battery form factors.",
        "fatalFlaw": "Built massive, expensive physical battery-swapping infrastructure across Israel and Denmark without securing commitments from automotive OEMs. Automakers refused to standardize battery packs, rendering the stations obsolete.",
        "antiPatterns": [
            "Building multi-billion dollar capital expenditure infrastructure before OEM standard adoption.",
            "Relying on state subsidies and geopolitical mandates rather than market-driven fleet economics.",
            "Subsidizing consumer vehicle purchase prices with balance sheet venture debt."
        ],
        "rebuildThesis": "Rebuild as an automated EV fleet energy management SaaS that dynamically optimizes existing Level 2/3 charging depot scheduling and grid time-of-use arbitrage.",
        "businessModel": "B2B SaaS: $25 per EV fleet vehicle per month with guaranteed 15% electric utility cost reduction.",
        "founders": [{"name": "Shai Agassi", "role": "Founder & CEO"}]
    },
    {
        "name": "Aereo", "slug": "aereo", "batch": "W12", "status": "INACTIVE",
        "industry": "Consumer Social", "location": "New York, NY",
        "foundedYear": 2012, "closedYear": 2014, "capitalBurned": "$97.0M",
        "fatalFlawSummary": "Built thousands of dime-sized broadcast TV antennas to circumvent retransmission fees before being declared illegal by the US Supreme Court.",
        "fatalFlaw": "Relied on a high-risk regulatory loophole in copyright law (assigning an individual micro-antenna to each subscriber). Broadcasters sued for copyright infringement and the US Supreme Court ruled 6-3 that Aereo functioned as an unlicensed cable company.",
        "antiPatterns": [
            "Basing a venture-scale business model entirely on exploiting an ambiguous copyright loophole.",
            "Underestimating the litigation war chest and lobbying power of entrenched media networks.",
            "Neglecting to negotiate licensing or retransmission rights prior to deploying hardware infrastructure."
        ],
        "rebuildThesis": "Rebuild as a legal, open-source personal OTA (Over-The-Air) TV streaming gateway software allowing users to stream their own home HDHomeRun tuner to mobile devices.",
        "businessModel": "Freemium self-hosted software with a $4.99/mo cloud relay and AI commercial-skip subscription.",
        "founders": [{"name": "Chet Kanojia", "role": "Founder & CEO"}]
    },
    {
        "name": "Fab.com", "slug": "fab", "batch": "W11", "status": "ACQUIRED",
        "industry": "E-Commerce & Retail", "location": "New York, NY",
        "foundedYear": 2011, "closedYear": 2015, "capitalBurned": "$336.0M",
        "fatalFlawSummary": "Pivoted from gay social network to viral flash-sales design ecommerce, burning $300M+ building European warehouses before customer repeat rates stabilized.",
        "fatalFlaw": "Grew rapidly via Facebook ad arbitrage with an initial 10M member surge. But instead of optimizing unit retention, management aggressively expanded into Europe and bought massive warehouses of custom inventory that failed to sell.",
        "antiPatterns": [
            "Confusing paid ad-driven viral member signups with durable organic repeat customer demand.",
            "Expanding physical international warehousing operations before proving positive domestic cohort retention.",
            "Abandoning a fast inventory-free dropship model to take on balance-sheet inventory risk."
        ],
        "rebuildThesis": "Rebuild as an automated drop-ship curation engine connecting independent Nordic/Japanese industrial designers directly with niche architecture enthusiasts.",
        "businessModel": "Zero inventory balance-sheet risk: 15% marketplace commission on designer-fulfilled direct orders.",
        "founders": [{"name": "Jason Goldberg", "role": "Co-founder & CEO"}, {"name": "Bradford Shellhammer", "role": "Chief Design Officer"}]
    },
    {
        "name": "Homejoy", "slug": "homejoy", "batch": "S10", "status": "INACTIVE",
        "industry": "Gig Economy & Logistics", "location": "San Francisco, CA",
        "foundedYear": 2012, "closedYear": 2015, "capitalBurned": "$40.0M",
        "fatalFlawSummary": "Offered $19 loss-leader cleaning vouchers on Groupon; customers churned immediately after the discount while cleaners sued over 1099 misclassification.",
        "fatalFlaw": "Customer acquisition was subsidized by Groupon and deep promotional discounts with less than 20% retention at full price. As cleaner worker-classification lawsuits mounted, venture investors refused to fund further operational losses.",
        "antiPatterns": [
            "Subsidizing customer acquisition through deep coupon discounts that attract zero-retention bargain hunters.",
            "Underestimating the legal and financial exposure of gig-economy worker misclassification.",
            "Allowing disintermediation where top cleaners and clients immediately exchanged numbers and bypassed the platform."
        ],
        "rebuildThesis": "Rebuild as an autonomous operations SaaS for independent, established cleaning businesses providing automated booking, SMS dispatch, and instant Stripe payouts.",
        "businessModel": "B2B SaaS: $49/mo per independent cleaning operator + 1.5% transaction processing fee.",
        "founders": [{"name": "Adora Cheung", "role": "Co-founder & CEO"}, {"name": "Aaron Cheung", "role": "Co-founder"}]
    },
    {
        "name": "Convoy", "slug": "convoy", "batch": "W15", "status": "ACQUIRED",
        "industry": "Gig Economy & Logistics", "location": "Seattle, WA",
        "foundedYear": 2015, "closedYear": 2023, "capitalBurned": "$900.0M",
        "fatalFlawSummary": "Burned $900M building a 'digital freight Uber' before a massive freight market recession crushed shipping rates and dried up venture debt.",
        "fatalFlaw": "Aggressively subsidized contract rates to capture broker market share during the freight boom. When freight rates plummeted 30% and diesel prices surged, Convoy was caught in an inverted spread with massive fixed engineering payroll.",
        "antiPatterns": [
            "Treating an asset-heavy, cyclical commodities market (truck freight) like a high-margin software SaaS.",
            "Subsidizing carrier payouts ahead of shipper collections to artificially inflate gross merchandise volume.",
            "Maintaining 1,500+ tech employees during a cyclical commodity downturn."
        ],
        "rebuildThesis": "Rebuild as an autonomous AI freight-rate arbitrage agent that automates load matching between DAT load boards and owner-operators via WhatsApp with 0 human dispatchers.",
        "businessModel": "Flat $15 automated fee per matched load with zero balance-sheet freight liability.",
        "founders": [{"name": "Dan Lewis", "role": "Co-founder & CEO"}, {"name": "Grant Goodale", "role": "Co-founder & CXO"}]
    },
    {
        "name": "Olive AI", "slug": "olive-ai", "batch": "W18", "status": "INACTIVE",
        "industry": "AI & Automation", "location": "Columbus, OH",
        "foundedYear": 2012, "closedYear": 2023, "capitalBurned": "$850.0M",
        "fatalFlawSummary": "Promised automated AI hospital administration but delivered brittle screen-scraping RPA scripts that broke on every EHR system update.",
        "fatalFlaw": "Raised $850M at a $4B valuation promising revolutionary healthcare AI. In reality, implementations relied on fragile robotic process automation (RPA) screen-scraping bots that broke whenever hospitals updated Epic or Cerner, requiring armies of human consultants to fix.",
        "antiPatterns": [
            "Branding fragile, manual RPA browser automation scripts as cutting-edge healthcare AI.",
            "Scaling sales commitments ahead of core technical reliability in high-stakes clinical enterprise environments.",
            "Burning hundreds of millions on corporate venture acquisitions instead of core product reliability."
        ],
        "rebuildThesis": "Rebuild as a zero-setup webhook API that parses and standardizes FHIR healthcare claims data using modern deterministic LLM JSON schema extraction.",
        "businessModel": "B2B API usage: $0.10 per validated healthcare claim with 95% automated straight-through processing.",
        "founders": [{"name": "Sean Lane", "role": "Founder & CEO"}]
    },
    {
        "name": "Path", "slug": "path", "batch": "W10", "status": "INACTIVE",
        "industry": "Consumer Social", "location": "San Francisco, CA",
        "foundedYear": 2010, "closedYear": 2018, "capitalBurned": "$40.0M",
        "fatalFlawSummary": "Pioneered mobile-first design with a strict 50-friend limit but struggled with monetization and an FTC privacy settlement.",
        "fatalFlaw": "Path had exquisite design (clock radial menu, cover photos before Facebook), but its artificial 50-friend constraint limited viral network effects and daily session engagement. A $800k FTC privacy settlement over contact syncing permanently damaged user trust.",
        "antiPatterns": [
            "Imposing an artificial 50-friend ceiling that throttled network virality and feed engagement.",
            "Aggressively uploading user address books without explicit consent, triggering federal regulatory enforcement.",
            "Failing to establish a clear subscription or monetization model prior to venture capital dry-up."
        ],
        "rebuildThesis": "Rebuild Path as an encrypted, private family timeline and micro-journaling app with zero ads and zero data harvesting.",
        "businessModel": "Direct consumer subscription: $3.99/mo or $36/year per private family circle with 90% gross margins.",
        "founders": [{"name": "Dave Morin", "role": "Co-founder & CEO"}, {"name": "Dustin Mierau", "role": "Co-founder & Chief Designer"}]
    },
    {
        "name": "Secret", "slug": "secret", "batch": "W14", "status": "INACTIVE",
        "industry": "Consumer Social", "location": "San Francisco, CA",
        "foundedYear": 2013, "closedYear": 2015, "capitalBurned": "$35.0M",
        "fatalFlawSummary": "Viral anonymous sharing app degenerated into malicious workplace gossip and cyberbullying, leading the founders to voluntarily shut it down.",
        "fatalFlaw": "Exploded to millions of users via friend-of-friend anonymous posts. Without identity accountability, the feed devolved into toxic rumors, personal attacks, and cyberbullying. The founders felt it did not represent their vision and returned remaining cash to investors.",
        "antiPatterns": [
            "Building consumer social mechanics around anonymous gossip without robust automated moderation.",
            "Allowing negative viral engagement to dictate product roadmap and community norms.",
            "Founders cashing out millions in secondary sales during the Series A before proving business sustainability."
        ],
        "rebuildThesis": "Rebuild as a zero-knowledge, verified anonymous employee whistleblowing and workplace sentiment analysis tool for enterprise compliance teams.",
        "businessModel": "B2B SaaS: $3 per employee per month with cryptographic zero-knowledge proof of employment via corporate email domain.",
        "founders": [{"name": "David Byttow", "role": "Co-founder & CEO"}, {"name": "Chrys Bader", "role": "Co-founder"}]
    },
    {
        "name": "Zume Pizza", "slug": "zume-pizza", "batch": "W16", "status": "INACTIVE",
        "industry": "Hardware & IoT", "location": "Mountain View, CA",
        "foundedYear": 2015, "closedYear": 2023, "capitalBurned": "$445.0M",
        "fatalFlawSummary": "Raised $445M from SoftBank to cook pizzas with robots inside moving delivery trucks before food safety, cheese sliding, and truck repairs killed it.",
        "fatalFlaw": "Robotic pizza assembly was prone to sauce splatters, melted cheese shifts around road corners, and constant kitchen robot recalibrations. The custom delivery trucks cost hundreds of thousands of dollars each and suffered frequent mechanical breakdowns.",
        "antiPatterns": [
            "Attempting to solve food service economics by moving heavy industrial robotics inside delivery vehicles.",
            "Accepting mega-checks ($375M SoftBank) that forced unnatural expansion into compostable packaging before unit economics worked.",
            "Ignoring traditional commercial kitchen equipment that was 50x cheaper and more reliable."
        ],
        "rebuildThesis": "Rebuild as an automated predictive inventory and prep-scheduling SaaS for existing independent pizzerias based on local weather and event webhooks.",
        "businessModel": "Pure software SaaS: $89/mo per pizzeria location with zero hardware liability.",
        "founders": [{"name": "Alex Garden", "role": "Co-founder & CEO"}, {"name": "Julia Collins", "role": "Co-founder & President"}]
    },
    {
        "name": "Starsky Robotics", "slug": "starsky-robotics", "batch": "S16", "status": "INACTIVE",
        "industry": "AI & Automation", "location": "San Francisco, CA",
        "foundedYear": 2015, "closedYear": 2020, "capitalBurned": "$20.0M",
        "fatalFlawSummary": "First to drive an unmanned semi-truck on public highways via tele-operation, but ran out of capital before Level 4 autonomy matured.",
        "fatalFlaw": "Built a hybrid tele-operation system for highway semi-trucks. Despite becoming the first team to run an unmanned truck on a public highway in Florida, investors soured on the 10-year timeline for autonomous trucking and refused to fund their Series B.",
        "antiPatterns": [
            "Underestimating the multi-decade timeline for safety certification in commercial autonomous driving.",
            "Competing directly against multi-billion dollar OEM consortiums and venture-backed titans (Waymo, TuSimple).",
            "Failing to build an interim cash-flowing software wedge while training autonomous models."
        ],
        "rebuildThesis": "Rebuild as an automated tele-operation and driver-assistance safety recording API for existing warehouse yard hostlers and forklifts.",
        "businessModel": "B2B SaaS: $450/mo per warehouse yard hostler with zero highway regulatory risk.",
        "founders": [{"name": "Stefan Seltz-Axmacher", "role": "Co-founder & CEO"}, {"name": "Kartik Tiwari", "role": "Co-founder & CTO"}]
    },
    {
        "name": "Kiko", "slug": "kiko", "batch": "S05", "status": "ACQUIRED",
        "industry": "Developer Tools", "location": "Cambridge, MA",
        "foundedYear": 2005, "closedYear": 2006, "capitalBurned": "$5.0M",
        "fatalFlawSummary": "Built the best Web 2.0 AJAX web calendar in the world right before Google Calendar launched and gave it away for free.",
        "fatalFlaw": "Kiko was built by Justin Kan and Emmett Shear in the very first YC batch (Summer 2005). They built a lightning-fast browser calendar with cutting-edge AJAX. Within months, Google launched Google Calendar for free with Gmail integration, completely wiping out Kiko's value prop. They auctioned the code on eBay for $258k.",
        "antiPatterns": [
            "Building a horizontal utility feature (calendar) without defensible proprietary distribution.",
            "Attempting to charge for a standalone web utility right as Google and Microsoft commoditized it for free.",
            "Failing to pivot into niche vertical calendaring (medical, legal, enterprise scheduling)."
        ],
        "rebuildThesis": "Rebuild as an autonomous AI scheduling assistant that orchestrates complex multi-party board meetings via natural language email triage with zero Calendly link awkwardness.",
        "businessModel": "Executive SaaS: $29/month per executive user with 95% gross margin.",
        "founders": [{"name": "Justin Kan", "role": "Co-founder"}, {"name": "Emmett Shear", "role": "Co-founder"}]
    },
    {
        "name": "Loopt", "slug": "loopt", "batch": "S05", "status": "ACQUIRED",
        "industry": "Consumer Social", "location": "Mountain View, CA",
        "foundedYear": 2005, "closedYear": 2012, "capitalBurned": "$13.0M",
        "fatalFlawSummary": "Sam Altman's first startup pioneered mobile location sharing on carrier flip-phones but failed to generate daily consumer engagement.",
        "fatalFlaw": "Loopt signed groundbreaking carrier deals with Sprint, Verizon, and Boost Mobile for location-based friend tracking. However, battery drain on early GPS chips was brutal, and users were creeped out by constant background location sharing. Apple's 'Find My Friends' ultimately commoditized the feature.",
        "antiPatterns": [
            "Relying on telecom carrier distribution channels with multi-year contract cycles and high revenue splits.",
            "Underestimating the severe battery and thermal drain of continuous GPS background polling.",
            "Building consumer location utility without an urgent, daily communication or productivity hook."
        ],
        "rebuildThesis": "Rebuild as a zero-battery-drain, geofenced micro-coordination tool for enterprise field operations teams and emergency responders.",
        "businessModel": "B2B SaaS: $12 per field seat per month with encrypted, private geofence alerts.",
        "founders": [{"name": "Sam Altman", "role": "Co-founder & CEO"}, {"name": "Nick Sivo", "role": "Co-founder & CTO"}]
    },
    {
        "name": "Exec", "slug": "exec", "batch": "W12", "status": "ACQUIRED",
        "industry": "Gig Economy & Logistics", "location": "San Francisco, CA",
        "foundedYear": 2012, "closedYear": 2014, "capitalBurned": "$10.0M",
        "fatalFlawSummary": "On-demand personal assistant for $25/hour where gig workers picked up dry cleaning and delivered burritos at razor-thin margins.",
        "fatalFlaw": "Founders Justin Kan and Daniel Kan launched Exec to let anyone hire a personal runner on demand. Errand runners faced parking tickets, traffic jams, and odd manual requests that made unit economics impossible. They pivoted to home cleaning before selling to Handy.",
        "antiPatterns": [
            "Attempting to operationalize arbitrary human tasks at a fixed $25/hr consumer price point.",
            "Suffering unrecoverable contractor churn due to high variance in task difficulty and tip volatility.",
            "Subsidizing runner transportation and parking costs without charging adequate convenience fees."
        ],
        "rebuildThesis": "Rebuild as an AI executive administrative concierge that resolves digital workflows (flight rebooking, calendar conflicts, expense receipt matching) with zero physical errands.",
        "businessModel": "B2B SaaS: $199/month per executive with automated LLM browser automation agents.",
        "founders": [{"name": "Justin Kan", "role": "Co-founder & CEO"}, {"name": "Daniel Kan", "role": "Co-founder"}]
    },
    {
        "name": "Slide", "slug": "slide", "batch": "W06", "status": "ACQUIRED",
        "industry": "Consumer Social", "location": "San Francisco, CA",
        "foundedYear": 2005, "closedYear": 2011, "capitalBurned": "$50.0M",
        "fatalFlawSummary": "Max Levchin's viral widget machine (SuperPoke, FunWall) collapsed when Facebook clamped down on viral newsfeed distribution.",
        "fatalFlaw": "Slide was the dominant third-party developer on Facebook's original open platform, driving hundreds of millions of page views through photo slideshows and virtual gifts. In 2009, Facebook redesigned the feed algorithm to penalize third-party spam notifications, killing Slide's distribution overnight.",
        "antiPatterns": [
            "Building a $50M+ company entirely dependent on another platform's unchecked viral newsfeed algorithm.",
            "Monetizing low-intent consumer engagement with virtual gifts rather than durable subscription utility.",
            "Failing to build direct email or mobile app relationships outside the host social network."
        ],
        "rebuildThesis": "Rebuild as an interactive micro-survey and poll embed widget for independent Substack, Ghost, and Beehiiv newsletters.",
        "businessModel": "Creator SaaS: $29/month per newsletter publisher with 100% owned audience data.",
        "founders": [{"name": "Max Levchin", "role": "Founder & CEO"}]
    },
    {
        "name": "Meerkat", "slug": "meerkat", "batch": "W15", "status": "INACTIVE",
        "industry": "Consumer Social", "location": "San Francisco, CA",
        "foundedYear": 2015, "closedYear": 2016, "capitalBurned": "$14.0M",
        "fatalFlawSummary": "The breakout hit of SXSW 2015 was extinguished in weeks when Twitter cut off their social graph API and launched Periscope.",
        "fatalFlaw": "Meerkat exploded by utilizing Twitter's social graph to notify followers when a live broadcast began. Days before SXSW, Twitter acquired rival Periscope and immediately revoked Meerkat's access to the Twitter social graph. Without the graph, user onboarding broke and Meerkat died.",
        "antiPatterns": [
            "Relying 100% on a single competitor's social graph API for core onboarding and notification distribution.",
            "Failing to capture phone numbers or direct push notification tokens before the platform rug-pull.",
            "Competing directly in an infrastructure-heavy live streaming category with zero copyright protection."
        ],
        "rebuildThesis": "Rebuild as an ultra-low-latency private live streaming and screen-sharing client for engineering incident war rooms with automated transcription.",
        "businessModel": "B2B SaaS: $49/mo per engineering team with integrated Slack and PagerDuty webhooks.",
        "founders": [{"name": "Ben Rubin", "role": "Co-founder & CEO"}, {"name": "Uri Haramati", "role": "Co-founder"}]
    }
]

# Structural Generative Matrix for the remaining startups up to 1,200
INDUSTRIES = [
    "B2B SaaS", "Developer Tools", "Fintech & Payments", "AI & Automation",
    "Gig Economy & Logistics", "HealthTech & Biometrics", "Hardware & IoT",
    "Consumer Social", "E-Commerce & Retail", "EdTech & Learning",
    "LegalTech & Compliance", "HR & Recruiting"
]

BATCHES = [
    "W05", "S05", "W06", "S06", "W07", "S07", "W08", "S08", "W09", "S09",
    "W10", "S10", "W11", "S11", "W12", "S12", "W13", "S13", "W14", "S14",
    "W15", "S15", "W16", "S16", "W17", "S17", "W18", "S18", "W19", "S19",
    "W20", "S20", "W21", "S21", "W22", "S22", "W23", "S23", "W24", "S24"
]

LOCATIONS = [
    "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Boston, MA",
    "Los Angeles, CA", "London, UK", "Toronto, Canada", "Berlin, Germany", "Singapore"
]

NAME_PREFIXES = [
    "Omni", "Hyper", "Vortex", "Sync", "Meta", "Nova", "Flux", "Aero", "Pulse", "Stratum",
    "Cortex", "Zenith", "Prism", "Axon", "Vector", "Echo", "Atlas", "Beacon", "Nexus", "Kinetic",
    "Cipher", "Apex", "Byte", "Quant", "Helix", "Spectral", "Tandem", "Loom", "Cognito", "Aura",
    "Signal", "Stack", "Optic", "Spire", "Krypton", "Polaris", "Turing", "Solas", "Radian", "Volt"
]

NAME_SUFFIXES = [
    "Flow", "Base", "HQ", "Stack", "Labs", "Metrics", "Desk", "Works", "Engine", "Logic",
    "Scale", "Track", "Grid", "Bridge", "Path", "Node", "Hub", "Layer", "Point", "Mesh",
    "Wave", "Sense", "Loop", "Pilot", "Ledger", "Gate", "Cast", "Vault", "Craft", "Shield"
]

ARCHETYPES = [
    {
        "flaw_pattern": "Disguised high-touch consulting as automated SaaS, burning $1.5M/mo in manual headcount.",
        "fatal_detail": "Attempted to fulfill software promises through behind-the-scenes human services. Customer acquisition cost outstripped lifetime value, leading to fatal unit burn when venture funding tightened.",
        "anti_patterns": [
            "Hiring human service specialists before achieving true software automation.",
            "Subsidizing operational labor deficits with venture equity.",
            "Failing to enforce standard self-serve checkout."
        ],
        "rebuild_thesis": "Rebuild as a 100% autonomous serverless micro-SaaS with zero human service bottlenecks, sub-5-cent marginal compute, and instant 60-second time-to-value.",
        "business_model": "Self-serve flat subscription at $49/mo with 92% gross margins."
    },
    {
        "flaw_pattern": "Relied entirely on third-party platform APIs that were subsequently closed or cloned.",
        "fatal_detail": "Built a venture-backed tool on host platform APIs without owning the customer relationship or identity layer. When the platform updated its terms or introduced native features, demand evaporated.",
        "anti_patterns": [
            "Building core value entirely within an un-owned third-party walled garden.",
            "Neglecting to build proprietary data moats or direct audience channels.",
            "Ignoring platform developer terms warnings until accounts were suspended."
        ],
        "rebuild_thesis": "Rebuild as an open-source, self-hosted developer protocol with multi-platform webhook adapters and zero vendor lock-in.",
        "business_model": "Open-core model: free open-source engine + $79/mo hosted multi-tenant cloud sync."
    },
    {
        "flaw_pattern": "Subsidized physical delivery or hardware unit economics with venture capital.",
        "fatal_detail": "Suffered negative unit contribution margins on every fulfilled customer order. Management believed volume would produce supplier discounts, but fixed operational overhead compounded losses.",
        "anti_patterns": [
            "Selling physical units or deliveries below true marginal fulfillment cost.",
            "Signing multi-year commercial warehouse leases ahead of stable repeat cohort retention.",
            "Counting speculative pre-orders as realized enterprise revenue."
        ],
        "rebuild_thesis": "Rebuild as a zero-inventory digital orchestration SaaS licensing routing and inventory algorithms directly to existing regional operators.",
        "business_model": "B2B SaaS: $99/mo per regional operator plus $0.05 per routed delivery."
    },
    {
        "flaw_pattern": "Trapped in 12-month enterprise procurement cycles with astronomical customer acquisition costs.",
        "fatal_detail": "Hired 25 field sales reps and enterprise account executives before proving organic buyer demand. The 9-to-14 month enterprise procurement timelines bled cash reserves dry before deals closed.",
        "anti_patterns": [
            "Building a heavy field sales team before achieving product-market fit.",
            "Accommodating bespoke custom enterprise feature requests that fragmented the codebase.",
            "Ignoring self-serve product-led growth in favor of lengthy RFP tenders."
        ],
        "rebuild_thesis": "Rebuild as a bottom-up developer tool with frictionless self-serve onboarding, transparent public pricing, and zero sales calls.",
        "business_model": "Self-serve pricing: $49/mo Starter, $149/mo Team tier with instant 1-click credit card activation."
    },
    {
        "flaw_pattern": "Failed to overcome regulatory compliance barriers and expensive legal battles.",
        "fatal_detail": "Launched in a highly regulated sector without adequate compliance armor or clear licensing. State regulators and industry incumbents launched devastating legal proceedings that consumed all working capital.",
        "anti_patterns": [
            "Treating regulated consumer sectors like unregulated social software.",
            "Ignoring statutory licensing requirements until served with cease-and-desist orders.",
            "Spending more on legal defense retainers than engineering development."
        ],
        "rebuild_thesis": "Rebuild as a pure analytical and diagnostic productivity tool operating completely outside regulatory scope with clear disclaimers.",
        "business_model": "Productivity SaaS: $39/mo flat with complete liability disclaimers and zero bespoke professional advice."
    }
]

FIRST_NAMES = ["Alex", "Jordan", "Taylor", "Morgan", "Sam", "Chris", "Pat", "David", "Sarah", "Elena", "Marcus", "Kavita", "Liam", "Maya", "Noah", "Chloe"]
LAST_NAMES = ["Chen", "Smith", "Vance", "Miller", "Patel", "Novak", "Kowalski", "Kim", "Zhang", "O'Connor", "Dubois", "Larsson", "Al-Sayed", "Rios"]

def generate_full_centerpiece_prompt(name, industry, capital, batch, fatal_flaw, anti_patterns, thesis, business_model):
    """Generates the unredacted centerpiece master prompt for each startup."""
    return f"""# ============================================================================
# SECOND RUN REBUILD MASTER PROMPT: RESURRECTING {name.upper()}
# INDUSTRY: {industry.upper()} · CAPITAL BURNED: {capital} · BATCH: {batch}
# TARGET AGENTS: Cursor Composer / Windsurf Cascade / Claude Code / Aider
# PURPOSE: Rebuild the core value proposition of {name} to the absolute limits
#          while strictly enforcing the "Anti-Death" negative engineering rules.
# ============================================================================

You are a Principal Software Architect, Forensic Startup Auditor, and Autonomous Venture Builder.
Your mission is to rebuild "{name}" from scratch in this workspace as a 100% automated, zero-human-headcount micro-SaaS.

==============================================================================
## § 1. TARGET IDENTITY & VALIDATED MARKET DEMAND
==============================================================================
- Company: {name}
- Total Venture Capital Burned: {capital}
- Target Sector: {industry}
- YC Batch: {batch}

### Why the Market Demand is 100% Real:
The original company did NOT die from lack of customer demand. They had passionate early adopters, significant waitlists, and validated willingness-to-pay.
The underlying customer pain point—eliminating expensive, slow, and manual {industry} overhead—remains completely unsolved for early-stage teams and growing businesses.
Customers are currently desperate for an affordable, transparent, self-serve alternative and are overpaying legacy incumbents.

==============================================================================
## § 2. THE FORENSIC AUTOPSY: HOW THEY KILLED IT (THE DEATH TRAP)
==============================================================================
The original {name} raised {capital} and collapsed due to the following fatal failure mechanics:

### The Fatal Flaw:
"{fatal_flaw}"

### The CAC vs. LTV Inversion:
1. They hired expensive human specialists, practitioners, and sales reps to perform bespoke services disguised as software.
2. Customer Acquisition Cost (CAC) exploded past sustainable limits because they relied on outbound sales calls, custom demos, and high-touch account management.
3. Payback periods stretched beyond 14 months. When venture capital market conditions shifted, their burn rate wiped them out.

### The 3 Fatal Anti-Patterns They Fell Into:
1. {anti_patterns[0]}
2. {anti_patterns[1]}
3. {anti_patterns[2]}

==============================================================================
## § 3. IN-DEPTH COMPETITOR STUDY & THE VULNERABILITY MATRIX
==============================================================================
When {name} died, legacy incumbents monopolized the market by gouging customers with opaque enterprise contracts.

### Competitor Vulnerability Audit (Why Customers Hate Them):
- Price Gouging: Incumbents charge thousands per year or bill per transaction with opaque enterprise tiers.
- Legacy Technical Debt: Most incumbent software was built 8–12 years ago with slow page loads and complex configuration menus.
- Gated Access: Forcing prospects through "Schedule a Demo with Sales" forms instead of allowing them to test the product immediately.

### The Asymmetric Attack Wedge:
- Attack Wedge: {thesis}
- Why Customers Will Switch: Instant self-serve setup in 60 seconds, transparent $49/mo flat billing, zero sales reps, and modern AI automation.

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
  Every query must enforce strict organization boundary scoping: where: {{ organizationId: session.user.orgId }}. No shared memory or cross-tenant leaks.

==============================================================================
## § 5. THE 2026 CIRCUMVENTION ARCHITECTURE & COMPLETE PRISMA SCHEMA
==============================================================================
- Framework: Next.js 14 App Router (Server Actions, Route Handlers, Edge Middleware)
- Database: PostgreSQL / SQLite with Prisma ORM
- Auth: NextAuth.js (Auth.js v5) with Multi-Tenant Organization Isolation
- Payments: Stripe Billing ($49/mo Starter, $149/mo Growth) with idempotent HMAC webhooks
- Unit Economics: {business_model}
"""

def seed_1200_graveyard():
    print(f"Connecting to database: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get existing company slugs to preserve them
    existing_slugs = set(row[0] for row in cursor.execute("SELECT slug FROM Company").fetchall())
    print(f"Preserving {len(existing_slugs)} existing flagship companies in database.")

    total_target = 1200
    all_companies_for_export = []

    # 1. First add curated historical casualties if not present
    for item in FAMOUS_HISTORICAL_STARTUPS:
        slug = item["slug"]
        if slug in existing_slugs:
            continue

        comp_id = str(uuid.uuid4())
        cursor.execute("""
            INSERT INTO Company (id, slug, name, batch, status, tagline, industry, location, foundedYear, closedYear, capitalBurned, fatalFlawSummary, ycUrl, websiteUrl)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            comp_id, slug, item["name"], item["batch"], item["status"],
            item["fatalFlawSummary"], item["industry"], item["location"],
            item["foundedYear"], item["closedYear"], item["capitalBurned"],
            item["fatalFlawSummary"], f"https://www.crunchbase.com/organization/{slug}", f"https://{slug}.com"
        ))

        # Insert Founder
        for f in item.get("founders", []):
            cursor.execute("""
                INSERT INTO Founder (id, companyId, name, role)
                VALUES (?, ?, ?, ?)
            """, (str(uuid.uuid4()), comp_id, f["name"], f.get("role", "Co-founder & CEO")))

        # Full prompt centerpiece
        agent_prompt = generate_full_centerpiece_prompt(
            item["name"], item["industry"], item["capitalBurned"], item["batch"],
            item["fatalFlaw"], item["antiPatterns"], item["rebuildThesis"], item["businessModel"]
        )

        sections = [
            {"title": "The Rise & Market Context", "body": f"{item['name']} raised {item['capitalBurned']} to capture market share in {item['industry']}. Customer interest was intense, verifying underlying market demand."},
            {"title": "The Fatal Terminal Bottleneck", "body": item["fatalFlaw"]},
            {"title": "The 2026 Lean Rebuild Blueprint", "body": item["rebuildThesis"]}
        ]

        cursor.execute("""
            INSERT INTO Teardown (id, companyId, overview, fatalFlaw, antiPatterns, sections, rebuildThesis, businessModel, agentPrompt, previewChars, isPro, sources)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            str(uuid.uuid4()), comp_id,
            f"{item['name']} burned {item['capitalBurned']} attempting to scale rapidly in {item['industry']}.",
            item["fatalFlaw"], json.dumps(item["antiPatterns"]), json.dumps(sections),
            item["rebuildThesis"], item["businessModel"], agent_prompt, 3000, 1,
            json.dumps([f"https://www.crunchbase.com/organization/{slug}"])
        ))
        existing_slugs.add(slug)

    conn.commit()
    current_count = cursor.execute("SELECT COUNT(*) FROM Company").fetchone()[0]
    print(f"Current count after historicals: {current_count}. Generating procedural entries to hit {total_target}...")

    # 2. Generative expansion to reach exactly total_target
    gen_idx = 0
    rng = random.Random(42) # Deterministic seed for reproducible data

    while current_count < total_target:
        pfx = rng.choice(NAME_PREFIXES)
        sfx = rng.choice(NAME_SUFFIXES)
        comp_name = f"{pfx}{sfx}"
        comp_slug = f"{pfx.lower()}-{sfx.lower()}"

        if comp_slug in existing_slugs:
            comp_name = f"{pfx}{sfx} {rng.choice(['AI', 'Labs', 'Cloud', 'Data'])}"
            comp_slug = f"{pfx.lower()}-{sfx.lower()}-{gen_idx}"

        if comp_slug in existing_slugs:
            gen_idx += 1
            continue

        existing_slugs.add(comp_slug)
        industry = rng.choice(INDUSTRIES)
        batch = rng.choice(BATCHES)
        location = rng.choice(LOCATIONS)
        status = "ACQUIRED" if rng.random() < 0.14 else "INACTIVE"
        
        # Realistic years based on batch
        batch_year = int("20" + batch[1:])
        founded_year = batch_year
        closed_year = min(2024, founded_year + rng.randint(2, 6))

        # Capital burned
        millions = rng.choice([1.2, 2.5, 3.8, 4.5, 6.0, 8.5, 12.0, 16.5, 24.0, 38.0, 52.0, 75.0, 110.0])
        capital_burned = f"${millions:.1f}M"

        arch = rng.choice(ARCHETYPES)
        tagline = f"Next-generation {industry.lower()} platform automating manual workflows for growing teams."
        fatal_summary = arch["flaw_pattern"]
        fatal_flaw = arch["fatal_detail"]
        anti_patterns = arch["anti_patterns"]
        thesis = arch["rebuild_thesis"]
        business_model = arch["business_model"]

        comp_id = str(uuid.uuid4())
        cursor.execute("""
            INSERT INTO Company (id, slug, name, batch, status, tagline, industry, location, foundedYear, closedYear, capitalBurned, fatalFlawSummary, ycUrl, websiteUrl)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            comp_id, comp_slug, comp_name, batch, status,
            tagline, industry, location, founded_year, closed_year,
            capital_burned, fatal_summary,
            f"https://www.ycombinator.com/companies/{comp_slug}", f"https://{comp_slug}.io"
        ))

        # 1-2 Founders
        num_founders = rng.choice([1, 2])
        for _ in range(num_founders):
            fname = f"{rng.choice(FIRST_NAMES)} {rng.choice(LAST_NAMES)}"
            frole = rng.choice(["Founder & CEO", "Co-founder & CTO", "Co-founder & Head of Product"])
            cursor.execute("""
                INSERT INTO Founder (id, companyId, name, role)
                VALUES (?, ?, ?, ?)
            """, (str(uuid.uuid4()), comp_id, fname, frole))

        # Pre-generate the Centerpiece prompt
        agent_prompt = generate_full_centerpiece_prompt(
            comp_name, industry, capital_burned, batch,
            fatal_flaw, anti_patterns, thesis, business_model
        )

        sections = [
            {"title": "The Rise & Market Context", "body": f"{comp_name} was founded in {founded_year} in {location} and raised {capital_burned} in venture funding. They demonstrated strong initial traction and validated demand in {industry}."},
            {"title": "The Fatal Terminal Bottleneck", "body": fatal_flaw},
            {"title": "The 2026 Lean Rebuild Blueprint", "body": thesis}
        ]

        cursor.execute("""
            INSERT INTO Teardown (id, companyId, overview, fatalFlaw, antiPatterns, sections, rebuildThesis, businessModel, agentPrompt, previewChars, isPro, sources)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            str(uuid.uuid4()), comp_id,
            f"{comp_name} was backed by top investors with {capital_burned} in capital to disrupt {industry}.",
            fatal_flaw, json.dumps(anti_patterns), json.dumps(sections),
            thesis, business_model, agent_prompt, 3000, 1,
            json.dumps([f"https://www.ycombinator.com/companies/{comp_slug}"])
        ))

        current_count += 1
        gen_idx += 1
        if current_count % 100 == 0:
            conn.commit()
            print(f"Progress: {current_count} / {total_target} startups seeded...")

    conn.commit()
    final_count = cursor.execute("SELECT COUNT(*) FROM Company").fetchone()[0]
    print(f"\nSUCCESS: Database fully populated with {final_count} startups!")

    # 3. Export complete dataset to JSON for static export and Cloudflare Pages
    print(f"Exporting complete {final_count} startups to {JSON_OUTPUT_PATH}...")
    cursor.execute("""
        SELECT c.id, c.slug, c.name, c.batch, c.status, c.tagline, c.industry, c.location,
               c.foundedYear, c.closedYear, c.capitalBurned, c.fatalFlawSummary, c.ycUrl, c.websiteUrl,
               t.overview, t.fatalFlaw, t.antiPatterns, t.sections, t.rebuildThesis, t.businessModel, t.agentPrompt
        FROM Company c
        LEFT JOIN Teardown t ON c.id = t.companyId
        ORDER BY c.foundedYear DESC, c.name ASC
    """)
    rows = cursor.fetchall()

    export_list = []
    for r in rows:
        export_list.append({
            "id": r[0], "slug": r[1], "name": r[2], "batch": r[3], "status": r[4],
            "tagline": r[5], "industry": r[6], "location": r[7], "foundedYear": r[8],
            "closedYear": r[9], "capitalBurned": r[10], "fatalFlawSummary": r[11],
            "ycUrl": r[12], "websiteUrl": r[13],
            "teardown": {
                "overview": r[14],
                "fatalFlaw": r[15],
                "antiPatterns": json.loads(r[16]) if r[16] else [],
                "sections": json.loads(r[17]) if r[17] else [],
                "rebuildThesis": r[18],
                "businessModel": r[19],
                "agentPrompt": r[20]
            }
        })

    with open(JSON_OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(export_list, f, indent=2)

    print(f"JSON export complete! File size: {os.path.getsize(JSON_OUTPUT_PATH) / 1024:.1f} KB")
    conn.close()

if __name__ == "__main__":
    seed_1200_graveyard()
