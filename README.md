# Zakaria Rajib — Personal Website

A light, superfast, quiet-luxury website for **Zakaria Rajib**, a Dhaka-based wholesale supplier of ready-made clothing, jute & handcraft, everyday tech accessories, and corporate visa & air ticketing services.

## Features

- **Split Shard Splash Animation**: Subtle introductory brand mark reveal with sessionStorage caching (displays once per session, skip on click, respects `prefers-reduced-motion`).
- **Dark Mode System**: Zero-FOUC inline detector, seamless toggle, curated dark palette tokens, and dynamic footer brand mark inversion.
- **Four Provision Pillars**: Clothing, Jute & handcraft, Tech accessories, and Tourism (Visa processing & air ticketing).
- **Automated Daily Journal**: Live client-side rendering from `news.json` with category filtering (`All`, `Fashion & Textile`, `Business`).
- **AEO & WebMCP Standard**: Answer-First overview (<45 words), declarative entity headings (no question marks), JSON-LD `@graph` schema (`Person`, `LocalBusiness`, `FAQPage`), `robots.txt` AI crawler allowances, `llms.txt`, and full `data-mcp-action` attribute bindings.

## Tech Stack

- Vanilla HTML5 + CSS3 + JavaScript (zero framework, zero runtime dependencies)
- Google Fonts: Fraunces (serif display) + Inter (body)
- Assets: Externalized binary PNGs for ultra-fast payload delivery (~15 KB HTML)

## File Structure

```
├── index.html               # Semantic HTML5 with JSON-LD and WebMCP bindings
├── css/
│   └── style.css            # Custom design system with light/dark CSS variables and splash styles
├── js/
│   └── main.js              # Splash, dark mode toggle, journal controller, WebMCP actions
├── news.json                # Curated fashion-textile & business headlines
├── robots.txt               # AI-aware crawler policy (allows GPTBot, ClaudeBot, PerplexityBot)
├── llms.txt                 # LLM agent discovery & guidelines file
└── assets/
    ├── favicon.png
    ├── logo.png
    ├── footer-mark.png      # Light theme mark
    └── footer-mark-dark.png # Dark theme mark
```

## Contact

**Email:** business@zakaria.com.bd  
**Phone:** +880 13090 77997  
**Address:** 34, Road 6/c, Sector 12, Uttara, Dhaka-1230, Bangladesh
