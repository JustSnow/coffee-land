# Design

## Palette

Base ~90%: deep espresso / near-black chocolate. Soft alternate section surfaces: warm stone / slate. Accent ≤10%: caramel / bean-highlight gold (CTA, links). Body text on dark: warm off-white. Not cream+terracotta brochure.

## Type pair

Headings: **Newsreader**. Body: **Figtree**.

## Focal visual

Real product / lifestyle photography from locked refs (not scheme-only).

- **Hero (full-bleed):** ref A — dark roasted beans spilling from burlap on wood.
- **Alternate / texture:** ref B — beans + grounds on stone (negative space usable).
- **Below-fold lifestyle:** refs C (croissant + mug ritual) and D (cozy mug; cinnamon stick with “athena”).

## Block order

Theme: `ecommerce_product` (selling, cold).

1. Hero — `hero_offer`
2. Value / benefits — `benefit_item` ×3
3. Product — `product_offer` (exact price + primary CTA **Купить**)
4. Social proof — `review_summary` only (figures TBD until real data; slot kept — not waived)
5. FAQ / guarantees — `faq_item` + `trust_badge` (freshness / returns)
6. Final CTA — repeat **Купить** (same action)

**Skipped / waived:** `cta_form` (ecommerce O; purchase not lead); `logo_proof`; `pricing_plan` (single SKU); `how_it_works`; invented `testimonial` farms.

**R cells kept:** `hero_offer`, `product_offer`, `review_summary`.

## Layout

- Follow implement skill `landing-implement/references/surface/grid.md` (rail, gutter, gaps, breakpoints, child rules).
- Hero media: full-bleed outside the rail; offer copy + CTA on the rail (`stack`).
- Benefits: `layout: thirds`
- Product: `layout: split-2-1` (media | offer)
- Proof, FAQ, final CTA: `stack` (default; omit modifier)

## Motion

Id: `load-atmosphere` (matches CONTEXT).  
Source: **co-designed** (no dedicated load refs).

- **Phase 1:** warm-dark atmosphere plate (soft vignette / light grain in bean tones); offer/CTA not in focus; ≤ ~0.8–1.2s.
- **Phase 2:** chrome + content; nested hero cascade (headline → support → primary CTA); total load ≤ ~2s until CTA readable; then **freeze**.
- **Secondary live beat:** light primary-CTA hover (≤ ~0.2s).
- No Ken Burns, ambient loops, or post-load drift.
- `prefers-reduced-motion`: instant final frame.

## Reference lock

Four product/lifestyle photos locked in References:

| Id | Asset | Role |
|----|--------|------|
| A | beans + burlap on wood | Primary hero |
| B | beans + grounds on stone | Texture / alternate |
| C | croissant + mug + books | Lifestyle below fold |
| D | cocoa mug + autumn; “athena” on cinnamon | Brand lifestyle below fold |

Color: warm earth (espresso, caramel, burlap ochre); lifestyle cools with slate/grey + pastry gold. Density: high texture, shallow DoF; A/B leave usable negative space. Load refs: **none** — entrance co-designed above.
