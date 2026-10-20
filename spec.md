# Spec

## Problem Statement

Urban coffee drinkers (~25–40) are stuck between mediocre supermarket beans and expensive café visits. They want a reliable café-quality cup at home without joining a snobby specialty ritual or learning roast jargon.

## Solution

A single selling landing for **Athena** that presents one clear specialty-coffee SKU (whole bean or ground), shows why it fits “café at home,” and drives purchase via an on-page product offer plus a buy stub modal (no real checkout).

## User Stories

1. As a cold visitor, I want a clear first-screen offer (what / for whom / why) plus a **Купить** CTA, so that I immediately understand Athena and how to buy.
2. As a visitor deciding whether this is for me, I want three outcome-focused benefits, so that I can self-qualify without roast education.
3. As a buyer, I want a product block with pack details, bean/ground variants, exact price, and **Купить**, so that I can purchase without hunting.
4. As a skeptical buyer, I want a review summary (rating, count, source), so that social proof is visible even if detailed quotes are not yet real.
5. As a hesitant buyer, I want FAQ answers and a short trust/guarantee cue in the HTML, so that common objections are handled without a form.
6. As a ready buyer mid-page, I want the same **Купить** action repeated in the final CTA, so that I do not scroll back to buy.
7. As a mobile visitor, I want the story readable in one column on small screens with catalog multi-col patterns only from agreed breakpoints, so that the page works on phone and desktop.
8. As a visitor with reduced motion, I want the final loaded frame without a phased entrance, so that content and CTA are never blank or blocked.
9. As a site owner previewing on GitHub Pages, I want `noindex` and a filled SEO contract, so that draft URLs do not compete with a future production URL.
10. As Athena, I want Russian **ты** copy without medical claims; proof quotes may be marked placeholders until real reviews exist, so that the proof block is not empty on preview.

## Implementation Decisions

### Landing axes

- **Type:** selling  
- **Theme:** `ecommerce_product`  
- **Audience familiarity:** cold  
- **Primary CTA:** label **Купить** → in-page `#product` (hero/header). Product + final **Купить** open a buy stub **modal** (email + зерно/помол). Variant groups are separate (`variant` / `modal-variant`) and stay in sync via JS both ways, including empty selection. Form does not submit anywhere: submit hover tooltip explains stub; submit click closes modal. No page-level lead `cta_form`.  
- **Price:** exact **890 RUB** per 250 g pack; shown in `product_offer` only (not in first-viewport hero).  
- **Page copy language / tone:** Russian; **ты**; calm; no barista snobbery; bans: medical claims. Placeholder testimonials allowed in proof only when marked `placeholder: true` (replace before production).  
- **Analytics:** none  
- **Stack / deploy:** prerendered static HTML on GitHub Pages; no server backend.  
- **Chrome:** minimal header (brand name + Купить); not sticky. Footer: © Athena + one-line “not medical advice”; no INN/offer text unless added later.  
- **Grid:** follow implement skill `landing-implement/references/surface/grid.md` (rail, gutter, gaps, breakpoints, child rules). Named patterns only below.  
- **Theme / elements / motion norms:** repo `references/shared/` (`themes.md`, `elements.md`, `motion.md`).

### Theme elements

| Element | Inclusion |
|---------|-----------|
| `hero_offer` | R — include |
| `product_offer` | R — include |
| `review_summary` | R — include (`placeholder: true` until real figures) |
| `benefit_item` | E — ×3 |
| `faq_item` | E — include (HTML `<details>`/`<summary>`) |
| `trust_badge` | E — freshness / returns |
| `testimonial` | O — 6 placeholder quotes in a proof slider (`placeholder: true`) |
| `cta_form`, `logo_proof`, `pricing_plan`, `how_it_works` | skip |

### Section order and layouts

1. **Hero** — `hero_offer`; media full-bleed outside rail; copy on rail `stack`  
   - Headline (H1): Кофейня дома — без снобизма  
   - Support: Свежая обжарка Athena: понятный вкус в каждой пачке.  
   - Primary CTA: Купить → `#product`  
   - Hero media: ref **A** (beans + burlap on wood)  
2. **Benefits** — `benefit_item` ×3; `layout: thirds`  
   - Outcomes aligned to pain: reliable taste at home; fresh roast without snobbery; clear profile vs supermarket/café spend (copy finalized at build from this intent).  
   - Optional lifestyle stills (refs C/D) in the same section: `layout: media-row-2`.  
3. **Product** — `product_offer`; `layout: split-2-1` (media \| offer); id `#product`  
   - Title: Athena Espresso Blend  
   - Description: 250 g specialty pack; café-at-home espresso-leaning blend  
   - Variants: зерно \| помол  
   - Price: 890 ₽; availability InStock  
   - Media: product-forward stills from refs A/B (and pack shot if added later)  
   - primary_cta_label: Купить → opens buy modal stub  

4. **Proof** — `review_summary` + `testimonial` ×6 in a horizontal slider; `stack` (slider is in-section chrome, not a rail-grid pattern)  
   - rating_avg: 4.8; review_count: 36; source_label: покупатели Athena; **placeholder: true**  
   - Testimonials: name, city, quote; grey avatar; all **placeholder: true**; mobile-first flex peek slider (≈85% slide → 2 @768 → 3 @1024), prev/next + scroll-snap; no autoplay loop
5. **FAQ + trust** — `faq_item` + `trust_badge`; `stack`  
   - FAQ topics (copy at build): freshness/roast date; bean vs ground; shipping/returns; how strong/bitter vs café. Answers in DOM without JS.  
   - Trust: freshness and/or easy returns label.  
6. **Final CTA** — repeat Купить → buy modal stub; `stack`

Lifestyle refs **C** and **D** may appear as atmospheric stills in benefits or beside FAQ — not as hero.

### Visual system (from DESIGN)

- Palette: espresso near-black ~90%; warm stone alternate sections; caramel/gold accent ≤10%; warm off-white text on dark.  
- Type: Newsreader (headings) + Figtree (body).  
- Focal: real photography; primary hero A; B alternate/texture; C/D below fold.

### Motion

- Id: **`load-atmosphere`** (co-designed; no dedicated load refs).  
- Phase 1: warm-dark vignette/grain plate (bean tones); offer/CTA not in focus; ≤ ~0.8–1.2s.  
- Phase 2: chrome + nested hero cascade (headline → support → CTA); total ≤ ~2s until CTA readable; then freeze.  
- Secondary beat: light primary-CTA hover ≤ ~0.2s.  
- No Ken Burns / ambient loops.  
- `prefers-reduced-motion`: instant final frame.

### SEO contract

```yaml
seo:
  environment: preview
  indexing: noindex
  production_url: null
  canonical_url: null
  html_lang: ru

  keywords:
    primary: "купить specialty кофе"
    secondary:
      - "свежая обжарка"
      - "кофе в зёрнах"
      - "домашний эспрессо"
    intent: transactional

  title: "Athena — купить specialty кофе домой"
  meta_description: "Свежая обжарка Athena: понятный вкус без снобизма. Пачка 250 г, зерно или помол — 890 ₽."

  open_graph:
    type: website
    title: "Athena — купить specialty кофе домой"
    description: "Свежая обжарка Athena: понятный вкус без снобизма. Пачка 250 г — 890 ₽."
    url: null
    site_name: "Athena"
    locale: ru_RU
    image_url: null
    image_alt: "Тёмные зёрна кофе высыпаются из джутового мешка"

  twitter_card:
    card: summary_large_image
    title: "Athena — купить specialty кофе домой"
    description: "Свежая обжарка Athena: понятный вкус без снобизма. Пачка 250 г — 890 ₽."
    image_url: null
    site: null
    creator: null

  json_ld:
    organization:
      type: Organization
      name: "Athena"
      url: null
      logo_url: null
      same_as: []
    web_page:
      name: "Athena — купить specialty кофе домой"
      url: null
    offer:
      name: "Athena Espresso Blend 250 г"
      price: "890"
      price_currency: "RUB"
      url: null
      availability: "https://schema.org/InStock"

  on_page:
    h1: "Кофейня дома — без снобизма"
    faq_in_html: true
```

Share image at build: use hero ref A asset path; absolute `image_url` / canonical stay `null` until production URL is agreed. Flip to `environment: production` / `indexing: index` only on cutover.

Sources folded in: `CONTEXT.md`, `DESIGN.md`, References lock, gap-fill Q20–Q24.

## Acceptance Criteria

- AC-1: First viewport shows brand Athena, H1 «Кофейня дома — без снобизма», one support line, and primary CTA «Купить» with a real hero photo (ref A). Evidence: hero / `hero_offer`.
- AC-2: Hero/header «Купить» → `#product`; product + final «Купить» open the buy modal stub (same label). Evidence: hero + product + final CTA + modal.
- AC-3: Benefits section contains exactly three `benefit_item` outcomes (not dry roast specs). Evidence: benefits; `layout: thirds`.
- AC-4: `#product` shows Athena Espresso Blend, 250 g, зерно/помол variants, exact **890 ₽**, InStock, and «Купить». Evidence: `product_offer`; `layout: split-2-1`.
- AC-5: Exact price does not appear in the first-viewport hero. Evidence: hero vs product.
- AC-6: Review summary shows 4.8 · 36 · покупатели Athena and is marked/treated as placeholder until replaced. Evidence: proof / `review_summary`.
- AC-7: FAQ answers exist in HTML without JS (`details`/`summary` or equivalent); at least one `trust_badge` for freshness or returns. Evidence: FAQ / trust.
- AC-8: No page-level lead form; buy stub modal (email + synced variant) does not POST; no medical claims; proof testimonials marked placeholder. Evidence: page + modal + proof + footer.
- AC-9: Multi-col sections use only catalog patterns (`thirds`, `split-2-1`, `media-row-2` for benefits lifestyle stills); other story sections `stack`; rail/gutter per implement `grid.md`. Evidence: section layouts.
- AC-10: Motion id is `load-atmosphere` with Phase 1 plate then Phase 2 chrome + hero cascade, freeze after; CTA readable within ~2s when motion allowed. Evidence: load entrance.
- AC-11: Under `prefers-reduced-motion`, the instant final frame is shown (no blank Phase-2 content). Evidence: reduced-motion behavior.
- AC-12: `seo.environment` is preview and `seo.indexing` is noindex; `html_lang` is `ru`; single H1 matches `seo.on_page.h1`. Evidence: `<head>` / H1.
- AC-13: Visible product name + 890 RUB match JSON-LD `offer` when Offer is emitted; no FAQPage/QAPage JSON-LD. Evidence: product HTML + JSON-LD.
- AC-14: Page is prerendered static HTML suitable for GitHub Pages with no required backend. Evidence: deploy/stack.
- AC-15: Header is non-sticky; footer includes © Athena and non-medical disclaimer. Evidence: chrome.

## Out of Scope

- Real payment/checkout, cart, CRM, email capture backend (buy modal is a non-submitting stub)  
- Analytics IDs, ads pixels, A/B frameworks  
- Sticky nav, sitemap.xml, robots.txt strategy, hreflang  
- FAQPage / QAPage rich-result JSON-LD  
- Multi-SKU pricing table, logo proof strip, how-it-works, lead magnet  
- Production indexing / canonical until `production_url` is agreed  
- Building or deploying the page (belongs to `landing-implement`)

## Further Notes

- Reference lock: four assets in project `assets/` — A hero; B texture; C/D lifestyle below fold; no load-entrance refs (motion co-designed).  
- Replace buy-modal stub with real checkout and review placeholders before production.  
- CONTEXT.md and DESIGN.md were inputs; **this `spec.md` is the single build source of truth** after confirmation.
