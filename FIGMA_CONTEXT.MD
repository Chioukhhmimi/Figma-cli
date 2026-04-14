# DESIGN.md — DadyCar Design System

> Drop this file into your project root. AI coding agents (Cursor, Bolt, Lovable, v0) will
> read it automatically to generate UI that matches DadyCar's visual identity.

---

## 1. Visual Theme & Atmosphere

DadyCar is a fleet management SaaS platform for professionals — fleet managers, logistics teams,
and mobility operators. The visual identity is defined by a **cool-blue authority** paired with
a **near-black dark sidebar**, creating a dashboard that feels precise, data-driven, and
trustworthy.

The brand blue (`#0f82ea`) is vibrant but purposeful — it marks actions, statuses, and
selections without overwhelming the interface. Neutral surfaces stay clean white, letting data
and product UI carry the visual weight.

The system uses **Inter exclusively** — a single, highly legible typeface at two weights
(Regular 400, Semi Bold 600). DadyCar speaks through data density, clear hierarchy, and
spatial precision, not dramatic headlines.

**Key Characteristics:**
- Brand blue `#0f82ea` as the single accent — buttons, links, active states, selected items
- Inter only — Regular (400) and Semi Bold (600), no display typeface
- Dark sidebar `#23272f` + white content surface — strong spatial separation
- White-dominant surfaces (all Surface levels resolve to white in light mode)
- Full semantic status system: Positive (green), Negative (red), Warning (orange), Info (blue)
- Border radius scale from 2px to 64px
- Spacing on a 4px base unit
- Breakpoints: 393px (Mobile), 768px (Tablet portrait), 1024px (Tablet landscape), 1280px (Desktop)

---

## 2. Color Palette & Roles

### Brand Blue Scale
| Token      | Hex         | Use                                           |
|------------|-------------|-----------------------------------------------|
| Brand-100  | `#cfe6fb`   | Selected background, subtle brand tint        |
| Brand-200  | `#9fcdf7`   | Light brand fills                             |
| Brand-300  | `#6fb4f2`   | Light hover states                            |
| Brand-400  | `#3f9bee`   | Brand stroke / border                         |
| **Brand-500** | **`#0f82ea`** | **Primary — buttons, links, active nav**  |
| Brand-600  | `#0c68bb`   | Brand Bold text, hover on brand elements      |
| Brand-700  | `#094e8c`   | Brand pressed state, link pressed             |
| Brand-800  | `#06345e`   | Deep brand — rarely used                      |
| Brand-900  | `#031a2f`   | Deepest brand shade                           |

### Secondary (Sidebar & Dark Surfaces)
| Token             | Hex         | Use                               |
|-------------------|-------------|-----------------------------------|
| Secondary-100     | `#d3d4d5`   | Light secondary tint              |
| Secondary-400     | `#4f5259`   | Muted dark text                   |
| **Secondary-500** | **`#23272f`** | **Sidebar background**          |
| Secondary-600     | `#1c1f26`   | Sidebar hover                     |
| Secondary-700     | `#15171c`   | Darkest nav elements              |

### Natural (Neutral Grays)
| Token          | Hex         | Use                                      |
|----------------|-------------|------------------------------------------|
| Natural-50     | `#f7f7f8`   | Subtle bg, hover bg, disabled bg         |
| Natural-100    | `#efeff0`   | Subtle border, pressed bg                |
| Natural-200    | `#dcdcdd`   | Disabled border, tertiary border         |
| Natural-300    | `#c6c6c7`   | Disabled text                            |
| Natural-400    | `#afafb1`   | Secondary border                         |
| Natural-600    | `#626265`   | Tertiary text, primary border            |
| Natural-800    | `#212123`   | Secondary text                           |
| **Natural-900** | **`#09090b`** | **Primary text — near-black**        |

### Semantic Color Roles (Resolved)
| Role                  | Hex         | Notes                               |
|-----------------------|-------------|-------------------------------------|
| Content Primary       | `#09090b`   | Main body text                      |
| Content Secondary     | `#212123`   | Secondary labels                    |
| Content Tertiary      | `#626265`   | Muted descriptions                  |
| Content Disabled      | `#c6c6c7`   | Disabled text                       |
| Content Brand         | `#0f82ea`   | Brand-colored text                  |
| Content Positive      | `#41c174`   | Success text                        |
| Content Negative      | `#ef4444`   | Error text                          |
| Content Warning       | `#ff8000`   | Warning text                        |
| Content Info          | `#295bff`   | Info text (blue)                    |
| Background Primary    | `#ffffff`   | Main page background                |
| Background Subtle     | `#f7f7f8`   | Row hovers, section tints           |
| Background Selected   | `#cfe6fb`   | Selected rows/items (Brand-100)     |
| Background Brand      | `#0f82ea`   | Primary button fill                 |
| Background Inverse    | `#09090b`   | Dark overlays                       |
| Surface L0–L6         | `#ffffff`   | All surface levels — white (light)  |
| Border Primary        | `#626265`   | Default stroke                      |
| Border Subtle         | `#efeff0`   | Lightest divider                    |
| Border Secondary      | `#afafb1`   | Mid-weight borders                  |
| Border Brand          | `#0f82ea`   | Active/focus brand border           |
| Border Focus          | `#295bff`   | Keyboard focus ring                 |
| Border Negative       | `#ef4444`   | Error state border                  |
| Sidebar Background    | `#23272f`   | Dark navigation sidebar             |

### Status System
| State    | Background  | Border      | Text        |
|----------|-------------|-------------|-------------|
| Positive | `#d9f3e3`   | `#8ddaac`   | `#349a5d`   |
| Negative | `#fcdada`   | `#f58f8f`   | `#bf3636`   |
| Warning  | `#ffe6cc`   | `#ffb366`   | `#cc6600`   |
| Info     | `#cfe6fb`   | `#6fb4f2`   | `#0c68bb`   |

---

## 3. Typography Rules

### Font Family
- **Single typeface: Inter** — all UI text at all levels
- **Regular (400)**: body text, descriptions, labels, table cells, placeholders
- **Semi Bold (600)**: headings, button labels, nav items, badge text, KPI numbers
- Load via: `https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap`
- Letter spacing: `0` standard, `-0.5px` at 24px+, `-1px` at 48px+

### Type Scale

| Role           | Size  | Weight | Line Height | Letter Spacing | Use                             |
|----------------|-------|--------|-------------|----------------|---------------------------------|
| Display / H1   | 48px  | 600    | 56px        | -1px           | Page heroes (rarely in app)     |
| H2 / Section   | 32px  | 600    | 40px        | -0.5px         | Section headings                |
| H3 / Card      | 24px  | 600    | 32px        | -0.5px         | Card and panel headings         |
| H4 / Widget    | 20px  | 600    | 28px        | 0              | Widget titles, sidebar headers  |
| Body Large     | 18px  | 400    | 28px        | 0              | Intro body text                 |
| Body           | 16px  | 400    | 24px        | 0              | Default body copy               |
| Body Small     | 14px  | 400    | 20px        | 0              | Secondary labels, descriptions  |
| Caption        | 12px  | 400    | 16px        | 0              | Metadata, timestamps, tooltips  |
| Caption Bold   | 12px  | 600    | 16px        | 0              | Status badges, small labels     |
| Button / Label | 14px  | 600    | 20px        | 0              | All interactive elements        |
| Micro          | 10px  | 400    | 14px        | 0              | Absolute floor — use sparingly  |

### Mobile Adjustments
- H2 → 24px | H3 → 20px | Body stays 16px | Caption stays 12px
- Section padding reduces from 48px to 24px

### Principles
- **Inter Semi Bold (600) for all headings and interactive text** — the only way to create hierarchy with a single typeface
- **16px minimum for primary body text** — DadyCar is data-dense; readability is non-negotiable
- **Tabular numbers always**: `font-variant-numeric: tabular-nums` on all KPIs, table cells, and numeric data
- Numbers are right-aligned in tables and data grids
- Negative tracking at 24px+ for tighter, professional headlines

---

## 4. Component Stylings

### Buttons
- **Primary**: `#0f82ea` bg, white text, 8px radius, Inter 14px Semi Bold
  - Hover: `#0c68bb` | Pressed: `#094e8c` | Height: 36px default, 40px large
- **Secondary / Ghost**: `#ffffff` bg, `1px solid #afafb1` border, `#09090b` text, 8px radius
  - Hover: `#f7f7f8` bg
- **Danger**: `#ef4444` bg, white text | Hover: `#bf3636`
- **Disabled**: `#f7f7f8` bg, `#c6c6c7` text, `1px solid #dcdcdd` border
- **Link**: `#0f82ea` text, no bg, underline on hover

### Cards & Containers
- Background: `#ffffff`
- Border: `1px solid #efeff0` default; `1px solid #afafb1` for emphasis
- Shadow: `0 1px 3px rgba(9,9,11,0.06), 0 1px 2px rgba(9,9,11,0.04)`
- Radius: 8px standard, 12px panels, 16px modals
- Hover: bg `#f7f7f8`, shadow `0 4px 12px rgba(9,9,11,0.08)`
- Selected: bg `#cfe6fb`, border `1px solid #3f9bee`

### Data Tables
- Header: `#f7f7f8` bg, `#626265` text, 12px Semi Bold, `1px solid #efeff0` bottom border
- Body rows: `#ffffff` bg, `#09090b` text, 14px Regular
- Row hover: `#f7f7f8` bg
- Row selected: `#cfe6fb` bg, `2px solid #0f82ea` left border
- Cell padding: 12px horizontal, 10px vertical
- Numbers: `tabular-nums`, right-aligned

### Status Badges
- Radius: 9999px (pill)
- Size: 12px Semi Bold, 4px/8px padding
- Positive: `#d9f3e3` bg, `#349a5d` text, `1px solid #8ddaac` border
- Negative: `#fcdada` bg, `#bf3636` text, `1px solid #f58f8f` border
- Warning: `#ffe6cc` bg, `#cc6600` text, `1px solid #ffb366` border
- Info: `#cfe6fb` bg, `#0c68bb` text, `1px solid #6fb4f2` border

### Navigation Sidebar
- Background: `#23272f`
- Nav item text: `#ffffff`, 14px Semi Bold
- Nav item hover: `#1c1f26` bg
- Selected item: white card bg `#ffffff`, `#09090b` text, 8px radius, 4px margin
- Width: 240px desktop, 48px collapsed (icon-only), hidden on mobile

### Form Inputs
- Background: `#ffffff`, border `1px solid #afafb1`
- Focus: `2px solid #295bff` border (no outline)
- Error: `1px solid #ef4444` border
- Disabled: `#f7f7f8` bg, `1px solid #dcdcdd` border, `#c6c6c7` text
- Placeholder: `#626265`
- Radius: 8px | Height: 40px default, 36px compact

---

## 5. Layout Principles

### Spacing Scale (4px Base Unit)
| Value | Use                                          |
|-------|----------------------------------------------|
| 2px   | Micro gaps, icon-to-text spacing             |
| 4px   | Badge padding, tight row gaps                |
| 8px   | Component internal gaps                      |
| 12px  | Compact card padding                         |
| 16px  | Default component padding                    |
| 20px  | Section gaps within panels                   |
| 24px  | Card padding standard                        |
| 32px  | Section-level internal spacing               |
| 40px  | Large layout gaps                            |
| 48px  | Between major page sections                  |
| 64px  | Page-level vertical rhythm                   |

### Border Radius Scale
| Value  | Use                                          |
|--------|----------------------------------------------|
| 2px    | Progress bars, inline elements               |
| 4px    | Badges, chips, small buttons                 |
| 8px    | Inputs, default buttons, standard cards      |
| 12px   | Panels, modal inner cards                    |
| 16px   | Modal containers, large cards                |
| 24px   | Hero banners, feature cards                  |
| 9999px | Full pill — rounded tags, avatar rings       |

### Breakpoints
| Name              | Width   | Layout                                   |
|-------------------|---------|------------------------------------------|
| Mobile            | 393px   | Single column, sidebar hidden            |
| Tablet portrait   | 768px   | Sidebar as overlay or bottom nav         |
| Tablet landscape  | 1024px  | Sidebar collapsed to icons (48px)        |
| Desktop           | 1280px  | Full sidebar (240px) + content area      |

### Border Widths
- 1px (XS) — default borders, dividers
- 1.5px (S) — subtle focus option
- 2px (M) — active/focus states, selected row accent
- 4px (L) — accent bar highlights
- 8px (XL) — decorative thick borders (rarely used)

---

## 6. Depth & Elevation

| Level             | Shadow Definition                                                                | Use                           |
|-------------------|----------------------------------------------------------------------------------|-------------------------------|
| Level 0 (Flat)    | None                                                                             | Page bg, table rows           |
| Level 1 (Subtle)  | `0 1px 2px rgba(9,9,11,0.05)`                                                    | Stat widgets, inline cards    |
| Level 2 (Default) | `0 1px 3px rgba(9,9,11,0.06), 0 1px 2px rgba(9,9,11,0.04)`                      | Standard cards, panels        |
| Level 3 (Raised)  | `0 4px 12px rgba(9,9,11,0.08), 0 1px 3px rgba(9,9,11,0.06)`                     | Hover cards, dropdowns        |
| Level 4 (Float)   | `0 12px 32px rgba(9,9,11,0.12), 0 4px 8px rgba(9,9,11,0.06)`                    | Modals, overlays, popovers    |
| Level 5 (Deep)    | `0 24px 48px rgba(9,9,11,0.16)`                                                  | Full-screen modals            |

**Philosophy**: Cool-dark near-black shadows at very low opacity. No warm or colored shadows.
Shadow elevates functionally — every elevated element has a reason to be elevated.

---

## 7. Do's and Don'ts

### Do
- Use `#0f82ea` as the single brand accent — CTAs, active nav, selected states, links
- Use the dark sidebar `#23272f` to create clear spatial separation from white content
- Apply Inter Semi Bold (600) for all headings, buttons, and nav items
- Use status subtle backgrounds (Brand-100, Green-100, Red-100, Orange-100) for badges and banners
- Keep all content surfaces white `#ffffff` — use Natural-50 only for hover and row tints
- Apply `font-variant-numeric: tabular-nums` and right-align all numeric data
- Use the exact Sidebar tokens: `#23272f` bg → white nav text → white card for selected item

### Don't
- Don't add a second accent color or introduce gradients — the blue is sufficient
- Don't use Inter Regular for headings — Semi Bold is the only heading weight
- Don't add colored side-border accents to cards — use bg tint + brand border for selection
- Don't use Green-500/Red-500/Orange-500 as large background fills — use their 100-scale subtle variants
- Don't reduce padding below 8px on interactive elements — DadyCar runs on tablets
- Don't use type below 12px except for extreme edge cases

---

## 8. Dark Mode

In Dark mode, Surface tokens flip to the Natural dark scale:

| Surface | Dark Hex    |
|---------|-------------|
| L0      | `#050506`   |
| L1      | `#09090b`   |
| L2      | `#151517`   |
| L3      | `#212123`   |
| L4      | `#303033`   |
| L5      | `#404042`   |
| L6      | `#515153`   |

- Primary text → `#ffffff`
- Brand-500 `#0f82ea` stays unchanged in dark mode
- Sidebar → deepen to Secondary-700 `#15171c` for better contrast against dark content

---

## 9. Agent Prompt Guide

### Quick Color Reference
```
Brand Blue:       #0f82ea  → buttons, links, active states
Brand Hover:      #0c68bb
Brand Pressed:    #094e8c
Primary Text:     #09090b
Secondary Text:   #212123
Muted Text:       #626265
Disabled Text:    #c6c6c7
Page Background:  #ffffff
Subtle BG:        #f7f7f8
Selected BG:      #cfe6fb
Sidebar BG:       #23272f
Border Default:   #afafb1
Border Subtle:    #efeff0
Focus Ring:       #295bff
Success (text):   #349a5d  (bg: #d9f3e3)
Error (text):     #bf3636  (bg: #fcdada)
Warning (text):   #cc6600  (bg: #ffe6cc)
Info (text):      #0c68bb  (bg: #cfe6fb)
```

### Example Component Prompts
- **Dashboard layout**: "Create a fleet dashboard: `#23272f` left sidebar 240px with white Inter
  14px Semi Bold nav items, selected item as white card `#ffffff` with `#09090b` text and
  `2px solid #0f82ea` left accent. Content area `#ffffff`, top bar with `1px solid #efeff0`
  bottom border."
- **Status badge**: "`#d9f3e3` background, `#349a5d` text, `1px solid #8ddaac` border, 9999px
  radius, Inter 12px Semi Bold, 4px/8px padding. Label: 'Active'."
- **Data table**: "Header `#f7f7f8` bg, Inter 12px Semi Bold `#626265`. Body rows `#ffffff`,
  Inter 14px Regular `#09090b`, `tabular-nums` right-aligned numbers. Hover row `#f7f7f8`.
  Selected row `#cfe6fb` with `2px solid #0f82ea` left border."
- **Primary button**: "`#0f82ea` bg, white Inter 14px Semi Bold, 8px radius, 36px height.
  Hover `#0c68bb`. Disabled `#f7f7f8` bg, `#c6c6c7` text."
- **KPI card**: "White bg, `0 1px 3px rgba(9,9,11,0.06)` shadow, 8px radius, 24px padding.
  Large number Inter 32px Semi Bold `#09090b` tabular-nums. Label below Inter 14px Regular
  `#626265`. Trend badge bottom-right using status system."

### Iteration Guide
When refining screens using this design system:
1. Verify all content surfaces are `#ffffff` — no gray card backgrounds
2. Confirm sidebar is `#23272f` with white text — sharp contrast with white content
3. Check `#0f82ea` is the only non-neutral UI color — no additional accent hues
4. Ensure Inter Semi Bold on all headings, buttons, nav items — Regular for body only
5. Status colors must use subtle bg variants on large surfaces — not raw saturated fills
6. All numbers in tables: `tabular-nums`, right-aligned
7. Overall tone: serious, data-dense, fleet-management tool — clean, cool, functional, zero decoration
