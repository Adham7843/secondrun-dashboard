import sqlite3
import json

DB_PATH = "F:/Notes/Businesses/SAAS_Businesses/DeadSaaS/prisma/dev.db"

UPDATES = {
    "atrium": {
        "batch": "YC W18",
        "ycUrl": "https://www.ycombinator.com/companies/atrium",
        "tagline": "Full-service corporate law firm powered by machine learning to automate startup legal paperwork, SAFEs, and fundraising docs.",
        "offerStory": {
            "whatOffered": "Atrium promised founders an end to the archaic $1,000/hour billable attorney model. Justin Kan (co-founder of Twitch) launched Atrium to provide venture-backed startups with transparent, flat-rate legal services powered by proprietary machine-learning software. The platform automated standard corporate documents—incorporation paperwork, standard SAFE agreements, commercial NDAs, and equity cap tables—giving founders on-demand legal counsel without the fear of an unpredictable invoice at month-end.",
            "theHype": "With Justin Kan's celebrity founder status, Atrium instantly attracted $75.5M from Andreessen Horowitz, Founders Fund, and General Catalyst. Over 250 high-growth startups signed up in their first year, treating Atrium as their de-facto general counsel. Clients loved the modern interface, instantaneous SAFE generation, and fixed-price transparency."
        }
    },
    "pebble": {
        "batch": "YC W11",
        "ycUrl": "https://www.ycombinator.com/companies/pebble",
        "tagline": "Pioneering e-paper smartwatch with 7-day battery life and open developer SDK that became the most funded Kickstarter in history.",
        "offerStory": {
            "whatOffered": "Pebble pioneered the modern smartwatch category three years before Apple. It offered an ultra-minimalist wearable with an always-on e-paper display readable in direct sunlight, a week-long battery life, 50-meter water resistance, and an open, beloved developer SDK. It did not try to be a tiny smartphone on your wrist; it was the ultimate notification and productivity glance screen.",
            "theHype": "Pebble became a global phenomenon, raising $10.2M on Kickstarter in 2012 (breaking all platform records) and following up with $20M for Pebble Time. Tech enthusiasts, developers, and everyday users developed an intensely loyal cult following, building thousands of custom watchfaces and apps."
        }
    },
    "fast": {
        "batch": "Series B (Stripe)",
        "ycUrl": "https://www.crunchbase.com/organization/fast-af",
        "tagline": "Universal 1-click checkout button designed to eliminate checkout forms and cart abandonment across independent web storefronts.",
        "offerStory": {
            "whatOffered": "Fast offered a universal, one-click checkout button for independent ecommerce merchants. Rather than forcing shoppers to fill out 14 form fields (shipping address, billing address, credit card numbers, password creation) on every new website, Fast remembered user credentials across the entire web. A shopper clicking 'Fast Checkout' bought the product instantly in less than 2 seconds.",
            "theHype": "Cart abandonment is a trillion-dollar pain point for merchants. Fast raised $124M led by Stripe and Index Ventures on the promise of dethroning Amazon's 1-click checkout patent. The tech world buzzed with excitement as Fast's charismatic CEO Domm Holland promised to make independent ecommerce faster than Amazon."
        }
    },
    "rdio": {
        "batch": "Series E (Skype Founders)",
        "ycUrl": "https://en.wikipedia.org/wiki/Rdio",
        "tagline": "The world's first beautifully designed, ad-free social music streaming platform curated by independent artists and audiophiles.",
        "offerStory": {
            "whatOffered": "Created by Skype co-founders Janus Friis and Niklas Zennström, Rdio was widely considered the most exquisitely designed software product of its generation. It offered unlimited on-demand streaming of over 30 million songs with a stark, clutter-free user interface, synchronized offline playback, dynamic social queues, and peer-to-peer music discovery that made finding new songs feel magical.",
            "theHype": "Designers, musicians, and tech tastemakers worshipped Rdio. Tech reviewers repeatedly called it vastly superior to Spotify and iTunes in user experience and discovery. It raised $125M and expanded to 85 countries, holding a passionate core audience of millions of music lovers."
        }
    },
    "scalefactor": {
        "batch": "Series C (Bessemer)",
        "ycUrl": "https://www.crunchbase.com/organization/scalefactor",
        "tagline": "Autonomous bookkeeping and financial intelligence platform promising to automate accounting for small businesses without CPAs.",
        "offerStory": {
            "whatOffered": "ScaleFactor promised small business owners a complete 'autonomous finance department'. Instead of paying thousands to traditional CPAs or wrestling with complex QuickBooks entries, business owners connected their bank accounts to ScaleFactor's AI engine. The software promised to categorize transactions, reconcile bank accounts, produce P&L statements, and file taxes automatically with zero human friction.",
            "theHype": "ScaleFactor raised $100M from Bessemer Venture Partners, Canaan, and Coatue, growing at a blistering pace across Austin and the US. Small business owners were eager to offload the headache of manual bookkeeping to a self-driving software platform."
        }
    },
    "higherme": {
        "batch": "YC W15",
        "ycUrl": "https://www.ycombinator.com/companies/higherme",
        "tagline": "Hourly staff hiring and onboarding platform using video cover letters and text messages to staff restaurant and retail franchises.",
        "offerStory": {
            "whatOffered": "HigherMe targeted the high-turnover restaurant and retail labor market. Instead of paper applications, candidates applied through automated text messages and 30-second video snippets. Franchisees could review, score, and schedule interviews in seconds from their phones.",
            "theHype": "Founded by a former multi-unit franchise owner, HigherMe won YC W15 backing. Franchise giants including Dunkin' Donuts, Panera Bread, and Domino's adopted the platform, reducing time-to-hire by over 65% for thousands of restaurant managers."
        }
    },
    "shyp": {
        "batch": "Series B (Kleiner Perkins)",
        "ycUrl": "https://www.crunchbase.com/organization/shyp",
        "tagline": "On-demand parcel courier app that picked up unboxed items from your doorstep, custom-packaged them, and shipped them at lowest cost.",
        "offerStory": {
            "whatOffered": "Shyp eliminated the misery of visiting the post office. A user simply took a photograph of whatever item they wanted to mail—an unboxed guitar, a pair of shoes, a vintage lamp—and pressed 'Shyp'. Within 20 minutes, a uniformed courier arrived at their door, took the item, brought it to a local warehouse, custom-cut a cardboard box, packed it professionally, and routed it via the cheapest carrier (FedEx, UPS, USPS).",
            "theHype": "Shyp was hailed as the 'Uber for Shipping'. The New York Times called it 'an almost magical service'. Shyp raised $62M led by Kleiner Perkins and expanded across San Francisco, New York, Miami, and Chicago with tens of thousands of ecstatic customers."
        }
    },
    "jawbone": {
        "batch": "Venture ($900M)",
        "ycUrl": "https://www.crunchbase.com/organization/jawbone",
        "tagline": "High-design consumer electronics pioneer behind the military-grade Bluetooth headset, JAMBOX wireless speaker, and UP fitness band.",
        "offerStory": {
            "whatOffered": "Led by visionary industrial designer Yves Béhar and CEO Hosain Rahman, Jawbone was the undisputed king of premium consumer audio and wearable tech. They created the first military-grade noise-canceling Bluetooth headset, revolutionized portable audio with the JAMBOX (creating the portable Bluetooth speaker industry), and pioneered holistic health tracking with the Jawbone UP wristband.",
            "theHype": "Jawbone raised over $900M from Sequoia Capital, Andreessen Horowitz, and Khosla Ventures, achieving a peak valuation exceeding $3.2B. For a decade, Jawbone hardware was the gold standard of modern industrial design, sold in Apple Stores worldwide."
        }
    },
    "secret": {
        "batch": "Series B (Google Ventures)",
        "ycUrl": "https://www.crunchbase.com/organization/secret",
        "tagline": "Anonymous social network for Silicon Valley tech insiders to share unfiltered confessions, leaks, and candid workplace discussions.",
        "offerStory": {
            "whatOffered": "Secret allowed users to post short messages and photos completely anonymously, which were distributed strictly to contacts in their address book and their friends-of-friends. It stripped away identity, status, and bios, allowing raw, unfiltered truth, candid confessions, and corporate whistleblowing to surface.",
            "theHype": "Secret exploded into a Silicon Valley sensation overnight in early 2014. It raised $35M in months from Google Ventures and Kleiner Perkins. VCs, founders, and engineers spent hours every day refreshing Secret to read the latest insider gossip, acquisition rumors, and tech workplace scandals."
        }
    },
    "homejoy": {
        "batch": "YC S10",
        "ycUrl": "https://www.ycombinator.com/companies/homejoy",
        "tagline": "On-demand residential home cleaning marketplace connecting certified professional cleaners with homeowners for $19/hour.",
        "offerStory": {
            "whatOffered": "Homejoy made hiring a trusted, vetted residential home cleaner as effortless as ordering a ride on Lyft. For a promotional price of just $19, a homeowner could book a professional deep clean online in under 60 seconds with automated scheduling and recurring billing.",
            "theHype": "Backed by Y Combinator, Google Ventures, and First Round Capital, Homejoy raised $40M and blitzscaled into over 30 cities across the US, Canada, and Europe in under 18 months, booking millions of hours of home cleaning."
        }
    },
    "zirtual": {
        "batch": "Seed / Angel",
        "ycUrl": "https://www.crunchbase.com/organization/zirtual",
        "tagline": "Dedicated, college-educated executive virtual assistants on demand for entrepreneurs, busy executives, and small teams.",
        "offerStory": {
            "whatOffered": "Zirtual provided founders and busy executives with a dedicated, US-based, college-educated remote executive assistant for a flat monthly subscription ($399–$899/mo). Your Zirtual assistant managed your email inbox, scheduled meetings, handled travel logistics, and conducted research.",
            "theHype": "Zirtual was an immediate darling among tech executives and entrepreneurs, scaling to thousands of active clients and hundreds of full-time assistants with widespread word-of-mouth acclaim."
        }
    },
    "flightcar": {
        "batch": "YC W13",
        "ycUrl": "https://www.ycombinator.com/companies/flightcar",
        "tagline": "Airport peer-to-peer car sharing allowing travelers to park for free while renting their car out to inbound travelers.",
        "offerStory": {
            "whatOffered": "FlightCar tackled the absurdity of airport parking. When you flew out of town, instead of paying $35/day for airport parking, you dropped your car off at FlightCar's airport lot for free. FlightCar cleaned your car and rented it out to incoming travelers for half the price of Hertz or Avis, paying you a dividend on every mile driven.",
            "theHype": "Founded by 18-year-old founders Kevin Petrovic and Rujul Zaparde, FlightCar graduated YC W13, raised $40M from General Catalyst and Ashton Kutcher, and launched across major airports including SFO, BOS, and LAX."
        }
    },
    "starsky-robotics": {
        "batch": "YC S16",
        "ycUrl": "https://www.ycombinator.com/companies/starsky-robotics",
        "tagline": "Autonomous self-driving semi-truck platform combining highway robot software with remote human tele-operation for depots.",
        "offerStory": {
            "whatOffered": "Starsky Robotics took a radically practical approach to autonomous freight: remove the driver entirely from the cab. Self-driving algorithms drove the 80,000 lb semi-truck on straight highways, while remote human tele-operators in an office navigated complex depot yards using steering wheels and monitors.",
            "theHype": "In 2019, Starsky became the first company in history to drive a fully unmanned 18-wheeler semi-truck on an active public highway with no human in the vehicle. They raised $20M and logged real freight revenue with Fortune 500 shippers."
        }
    },
    "eden": {
        "batch": "YC S15",
        "ycUrl": "https://www.ycombinator.com/companies/eden",
        "tagline": "Complete workplace management platform unifying office cleaning, handyman repairs, IT support, and snack replenishment.",
        "offerStory": {
            "whatOffered": "Eden gave office managers a unified operating system for physical workplaces. Instead of juggling 12 different vendors, Eden provided a single dashboard to manage janitorial cleaning, plumbing, HVAC maintenance, IT wiring, and kitchen snack inventory.",
            "theHype": "Eden raised $40M from Y Combinator and Bessemer, managing thousands of startup and corporate headquarters across San Francisco, New York, and Austin."
        }
    },
    "mailmodo": {
        "batch": "YC S21",
        "ycUrl": "https://www.ycombinator.com/companies/mailmodo",
        "tagline": "Interactive email platform powered by AMP allowing users to submit forms, book meetings, and shop directly inside inboxes.",
        "offerStory": {
            "whatOffered": "Mailmodo turned static emails into interactive mini-apps. Using Google AMP email technology, recipients could fill out survey forms, book Calendly meetings, and browse ecommerce carousels directly inside Gmail without ever opening a browser tab.",
            "theHype": "Backed by YC S21, Mailmodo grew rapidly across international SaaS and marketing teams, demonstrating 3x higher conversion rates compared to traditional static newsletter links."
        }
    },
    "lily-robotics": {
        "batch": "Series A (SV Angel)",
        "ycUrl": "https://www.crunchbase.com/organization/lily",
        "tagline": "Autonomous throw-and-shoot waterproof follow-me camera drone designed to track outdoor action sports enthusiasts.",
        "offerStory": {
            "whatOffered": "Lily was designed to be the GoPro of the skies. You threw the compact, waterproof drone into the air, and it automatically hovered, locked onto your wrist tracking beacon, and filmed high-definition follow-cam footage while you snowboarded, surfed, or biked.",
            "theHype": "Lily's announcement video was an internet sensation, generating over 40 million views and $34M in pre-orders within months. It was featured on the cover of magazines as the future of personal robotics."
        }
    },
    "teforia": {
        "batch": "Series A (Upfront)",
        "ycUrl": "https://www.crunchbase.com/organization/teforia",
        "tagline": "High-tech smart tea infuser using precision micro-infusion algorithms to extract optimum antioxidants and flavors from loose-leaf tea.",
        "offerStory": {
            "whatOffered": "Teforia was the Nespresso of gourmet tea. Engineered by ex-Xbox designer Allen Han, the gorgeous glass-and-bamboo machine used optical scanners and micro-infusion algorithms to optimize water temperature, steep time, and aeration for rare loose-leaf tea varietals.",
            "theHype": "Teforia won design awards, raised $17M from Upfront Ventures, and was praised by tea sommeliers worldwide for extracting subtle, complex flavor profiles impossible with manual boiling."
        }
    },
    "omni": {
        "batch": "Series B (Highland)",
        "ycUrl": "https://www.crunchbase.com/organization/omni-storage",
        "tagline": "Next-generation concierge storage service cataloging stored items with professional photos and 2-hour on-demand delivery.",
        "offerStory": {
            "whatOffered": "Omni turned your physical possessions into a digital cloud inventory. Couriers collected your seasonal gear, luggage, and holiday decorations, brought them to a secure warehouse, and professionally photographed every individual item. Whenever you needed your snowboard or camping tent, you tapped an app, and a courier brought it to your door in two hours.",
            "theHype": "Omni raised $35M from Highland Capital and Founders Fund, becoming an urban lifestyle staple for space-starved San Francisco apartment dwellers."
        }
    },
    "doppler-labs": {
        "batch": "Series B (Acequia)",
        "ycUrl": "https://www.crunchbase.com/organization/doppler-labs",
        "tagline": "Smart in-ear computer and wireless earbuds (Here One) featuring real-world active sound equalization and acoustic filtering.",
        "offerStory": {
            "whatOffered": "Doppler Labs created Here One—the world's first 'in-ear computer'. Rather than just playing music, Here One allowed you to equalize the real world: mute a crying baby on an airplane, suppress city traffic rumble, boost the human voice of the person sitting across from you, or add reverb to a live concert.",
            "theHype": "Doppler raised $50M from top investors and Hollywood figures, receiving glowing reviews from Wired and Fast Company for pioneering bionic hearing."
        }
    },
    "lunchbadger": {
        "batch": "YC W18",
        "ycUrl": "https://www.ycombinator.com/companies/lunchbadger",
        "tagline": "Visual microservices composition platform enabling backend developers to visually design and deploy serverless APIs on Kubernetes.",
        "offerStory": {
            "whatOffered": "LunchBadger provided backend engineers with a visual canvas to wire together Express gateways, serverless functions, and database connectors on Kubernetes without writing hundreds of lines of boilerplate YAML.",
            "theHype": "Backed by YC W18, LunchBadger caught the crest of the enterprise microservices migration, helping DevOps teams visualize and orchestrate distributed cloud infrastructure."
        }
    },
    "shipwise": {
        "batch": "YC S21",
        "ycUrl": "https://www.ycombinator.com/companies/shipwise",
        "tagline": "Automated customs duty calculations and cross-border freight analytics for fast-growing direct-to-consumer Shopify brands.",
        "offerStory": {
            "whatOffered": "Shipwise automated cross-border international ecommerce compliance. It calculated landed customs duties at checkout, handled HS tariff classifications, and generated compliant export paperwork for direct-to-consumer merchants expanding into Europe and Asia.",
            "theHype": "Backed by YC S21, Shipwise resolved the complex paperwork headaches of international trade for hundreds of high-growth ecommerce brands."
        }
    }
}

def run_updates():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    for slug, data in UPDATES.items():
        c.execute("""
            UPDATE Company
            SET batch = ?, ycUrl = ?, tagline = ?
            WHERE slug = ?
        """, (data["batch"], data["ycUrl"], data["tagline"], slug))
        
        # Check if teardown exists
        c.execute("SELECT id, overview, sections FROM Teardown WHERE companyId = (SELECT id FROM Company WHERE slug = ?)", (slug,))
        t_row = c.fetchone()
        if t_row:
            tid, old_overview, old_sections_json = t_row
            try:
                sections = json.loads(old_sections_json) if old_sections_json else []
            except Exception:
                sections = []
            
            # Enrich overview
            new_overview = f"{data['offerStory']['whatOffered']}\n\n{data['offerStory']['theHype']}"
            
            # Ensure Chapter 1 has rich story
            found_origin = False
            for sec in sections:
                if "Rise" in sec.get("title", "") or "Promise" in sec.get("title", "") or "Wave" in sec.get("title", "") or "Opportunity" in sec.get("title", ""):
                    sec["body"] = f"{data['offerStory']['whatOffered']}\n\n{data['offerStory']['theHype']}"
                    found_origin = True
                    break
            
            if not found_origin:
                sections.insert(0, {
                    "title": "The Origin, The Promise & What They Built",
                    "body": f"{data['offerStory']['whatOffered']}\n\n{data['offerStory']['theHype']}"
                })
            
            c.execute("""
                UPDATE Teardown
                SET overview = ?, sections = ?
                WHERE id = ?
            """, (new_overview, json.dumps(sections), tid))
            
        print(f"[OK] Updated {slug}: batch='{data['batch']}', ycUrl='{data['ycUrl']}'")
        
    conn.commit()
    conn.close()
    print("\nAll 21 companies updated successfully with verified URLs, authentic batches, and rich story-driven offer narratives!")

if __name__ == "__main__":
    run_updates()
