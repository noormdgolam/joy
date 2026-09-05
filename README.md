# Zakaria Rajib — Personal Website

A light, superfast, quiet-luxury website for **Zakaria Rajib**, a Dhaka-based wholesale supplier of ready-made clothing, jute & handcraft, everyday tech accessories, and corporate visa & air ticketing services.

## Features

- **Digital Visiting Card & Print-Ready QR Modal**: View Zakaria's luxury digital business card, download vector SVG / PNG QR codes for card printing, copy site link, and import vCard.
- **Glassmorphic Sticky Nav & Scroll Spy**: Smooth frosted header with backdrop blur on scroll, highlighting active navigation sections (`What I Provide`, `Journal`, `Contact`) automatically.
- **Interactive Sourcing & Quotation Builder**: Select product pillar, order requirement (wholesale, sample, custom production), and generate preformatted WhatsApp or Email inquiries in 1 click.
- **Journal Live Search & Filtering**: Instant headline keyword search alongside category tabs (`All`, `Fashion & Textile`, `Business`).
- **QR-Code Visiting Card Optimization**: Instant mobile opening when scanned from physical visiting cards (sub-second payload, zero clutter, high readability).
- **One-Tap Contact Save & WhatsApp**: Direct `assets/zakaria-rajib.vcf` (vCard) download to save Zakaria Rajib directly into iOS/Android phonebooks, plus direct WhatsApp chat integration.
- **Split Shard Splash Animation**: Introductory brand mark reveal with sessionStorage caching (displays once per session, skip on click, respects `prefers-reduced-motion`).
- **Dark Mode System**: Zero-FOUC inline detector, seamless toggle, curated dark palette tokens, and dynamic footer brand mark inversion.
- **Four Provision Pillars**: Clothing, Jute & handcraft, Tech accessories, and Tourism (Visa processing & air ticketing).
- **AEO & WebMCP Standard**: Answer-First overview (<45 words), declarative entity headings (no question marks), JSON-LD `@graph` schema (`Person`, `LocalBusiness`, `FAQPage`), `robots.txt` AI crawler allowances, `llms.txt`, and full `data-mcp-action` attribute bindings.

## Tech Stack

- Vanilla HTML5 + CSS3 + JavaScript (zero framework, zero runtime dependencies)
- Google Fonts: Fraunces (serif display) + Inter (body)
- Assets: Externalized binary PNGs and SVG QR code (~18 KB total HTML payload)

## File Structure

```
├── index.html               # Semantic HTML5 with JSON-LD, modals, and WebMCP bindings
├── css/
│   └── style.css            # Custom design system with light/dark variables, glass nav, modal, quote card
├── js/
│   └── main.js              # Splash, dark mode toggle, scroll spy, modal, quote builder, search
├── news.json                # Curated fashion-textile & business headlines
├── package.json             # Dev server & scripts (serve on port 5173)
├── robots.txt               # AI-aware crawler policy (allows GPTBot, ClaudeBot, PerplexityBot)
├── llms.txt                 # LLM agent discovery & guidelines file
└── assets/
    ├── favicon.png
    ├── logo.png
    ├── footer-mark.png      # Light theme mark
    ├── footer-mark-dark.png # Dark theme mark
    ├── qr-code.svg          # Print-ready vector QR code
    ├── qr-code.png          # High-resolution raster QR code
    └── zakaria-rajib.vcf    # Digital business card for mobile contacts
```

## Contact

**Email:** business@zakaria.com.bd  
**Phone:** +880 13090 77997  
**Address:** 34, Road 6/c, Sector 12, Uttara, Dhaka-1230, Bangladesh
