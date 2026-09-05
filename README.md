# Zakaria Rajib — Personal Website

A light, superfast, quiet-luxury website for **Zakaria Rajib**, a Dhaka-based wholesale supplier of ready-made clothing, jute & handcraft, and tech accessories.

## Tech Stack

- Vanilla HTML5 + CSS3 + JavaScript (zero framework, zero dependencies)
- Google Fonts: Fraunces (serif display) + Inter (body)
- AEO/GEO compliant: JSON-LD schema, `llms.txt`, `robots.txt`, WebMCP action bindings

## File Structure

```
├── index.html          # Semantic HTML5 with JSON-LD (Person, LocalBusiness, FAQPage)
├── css/
│   └── style.css       # Custom design system with CSS variables
├── js/
│   └── main.js         # Journal controller (news.json fetcher, tab filter, WebMCP)
├── news.json           # Curated fashion-textile & business headlines
├── robots.txt          # AI-aware crawler policy (allows GPTBot, ClaudeBot, PerplexityBot)
├── llms.txt            # LLM agent discovery & guidelines file
└── assets/
    ├── favicon.png
    ├── logo.png
    └── footer-mark.png
```

## Performance

- Document: **13.2 KB** (HTML only, assets externalized)
- Zero JS frameworks, zero build steps
- `content-visibility: auto` on sections for paint performance
- Google Fonts with `display=swap` for FOUT prevention

## AEO Standards Applied

- Answer-First opening (<45 words) in hero section
- Ultra-professional declarative entity headings (no colloquial question marks)
- JSON-LD `FAQPage` schema decouples conversational queries from visual typography
- `data-mcp-action` attributes on all interactive elements for AI agent discovery
- `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Googlebot
- `llms.txt` provides structured agent guidelines

## Contact

**Email:** business@zakaria.com.bd  
**Phone:** +880 13090 77997  
**Address:** 34, Road 6/c, Sector 12, Uttara, Dhaka-1230, Bangladesh
