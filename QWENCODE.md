<!-- FIGMA_CONTEXT:START -->
<!-- Auto-injected from FIGMA_CONTEXT.md — edit that file, not this block -->
# Figma Context for AI Agents — DadyCar Design System

## Your Role
You control Figma Desktop via CLI commands. When the user asks you to
design something, you MUST use the available commands to build it in Figma.
Never create just a white frame with text. Every frame needs real content,
real colors from the DadyCar design system, and real Lucide icons.

***

## Design System — DadyCar

DadyCar is a **fleet management SaaS** platform. The visual identity is
cool-blue authority + near-black dark sidebar. Data-dense, precise, professional.

### Core Tokens (use these — never invent colors)

```
Brand Blue:      #0f82ea  → primary buttons, links, active nav, selected state
Brand Hover:     #0c68bb
Brand Pressed:   #094e8c
Brand Subtle:    #cfe6fb  → selected row bg, subtle brand tint

Primary Text:    #09090b
Secondary Text:  #212123
Muted Text:      #626265
Disabled Text:   #c6c6c7

Page BG:         #ffffff
Subtle BG:       #f7f7f8  → row hover, section tint
Selected BG:     #cfe6fb
Sidebar BG:      #23272f  → THE dark sidebar

Border Default:  #afafb1
Border Subtle:   #efeff0
Border Brand:    #0f82ea
Focus Ring:      #295bff

Success text:    #349a5d  bg: #d9f3e3  border: #8ddaac
Error text:      #bf3636  bg: #fcdada  border: #f58f8f
Warning text:    #cc6600  bg: #ffe6cc  border: #ffb366
Info text:       #0c68bb  bg: #cfe6fb  border: #6fb4f2
```

### Typography
- **Font: Inter ONLY** — no other font, no display typeface
- **Semi Bold (600)** → all headings, buttons, nav labels, badge text, KPI numbers
- **Regular (400)** → body text, descriptions, table cells, placeholders
- Sizes: 48px H1 | 32px H2 | 24px H3 | 20px H4 | 18px Body-L | 16px Body | 14px Small | 12px Caption
- Load: `https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap`
- **Always `tabular-nums` on numeric data** — fleet data needs aligned columns

### Spacing (4px base unit)
2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64px

### Border Radius
2px progress | 4px badges | **8px buttons + inputs + cards** | 12px panels | 16px modals | 9999px pills

### Breakpoints
393px Mobile | 768px Tablet-P | 1024px Tablet-L | 1280px Desktop (sidebar 240px)

***

## Mandatory Rules
- ALWAYS use auto-layout, never manually position elements
- ALWAYS load Inter SemiBold + Regular fonts before creating text in eval
- ALWAYS add icons using Lucide (via Icon tag or iconify command)
- NEVER add a second accent color — `#0f82ea` brand blue is the only accent
- NEVER use Inter Regular for headings — always Semi Bold (600)
- NEVER leave a frame empty — every section needs real content
- NEVER add colored side-border accents to cards — use bg tint for selection
- ALWAYS use `tabular-nums` on number data, right-aligned in tables
- ALWAYS verify after creating: `node src/index.js verify "NODE_ID"`

***

## Sidebar Pattern (signature DadyCar layout)
```
Sidebar bg:        #23272f (Secondary-500)
Nav item text:     #ffffff, 14px Inter SemiBold
Nav item hover:    #1c1f26 bg
Selected item:     white card #ffffff, #09090b text, 8px radius, 4px margin
Width:             240px desktop | 48px collapsed | hidden mobile
```

## Status Badge Pattern
```
Positive: bg #d9f3e3 | text #349a5d | border #8ddaac | radius 9999px | 12px SemiBold
Negative: bg #fcdada | text #bf3636 | border #f58f8f
Warning:  bg #ffe6cc | text #cc6600 | border #ffb366
Info:     bg #cfe6fb | text #0c68bb | border #6fb4f2
Padding: 4px top/bottom, 8px left/right
```

## KPI Card Pattern
```
bg: #ffffff | shadow: 0 1px 3px rgba(9,9,11,0.06) | radius: 8px | padding: 24px
Number: Inter 32px SemiBold #09090b, tabular-nums
Label:  Inter 14px Regular #626265
```

## Table Pattern
```
Header:        bg #f7f7f8 | text #626265 12px SemiBold | border-bottom 1px #efeff0
Body rows:     bg #ffffff | text #09090b 14px Regular
Row hover:     bg #f7f7f8
Row selected:  bg #cfe6fb | left border 2px #0f82ea
Cell padding:  12px horizontal, 10px vertical
Numbers:       tabular-nums, right-aligned
```
<!-- FIGMA_CONTEXT:END -->

# figma-ds-cli

CLI that controls Figma Desktop directly. No API key needed.

## Quick Reference

| User says | Command |
|-----------|---------|
| "connect to figma" | `node src/index.js connect` |
| "add shadcn colors" | `node src/index.js tokens preset shadcn` |
| "add tailwind colors" | `node src/index.js tokens tailwind` |
| "show colors on canvas" | `node src/index.js var visualize` |
| "create dashboard" | `node src/index.js blocks create dashboard-01` |
| "list blocks" | `node src/index.js blocks list` |
| "create cards/buttons" | `render-batch` + `node to-component` |
| "create a rectangle/frame" | `node src/index.js render '<Frame>...'` |
| "convert to component" | `node src/index.js node to-component "ID"` |
| "list variables" | `node src/index.js var list` |
| "find nodes named X" | `node src/index.js find "X"` |
| "what's on canvas" | `node src/index.js canvas info` |
| "export as PNG/SVG" | `node src/index.js export png` |
| "show all variants" | `node src/index.js combos` |
| "create size variants" | `node src/index.js sizes --base small` |
| "create a slot" | `node src/index.js slot create "Name"` |
| "list slots" | `node src/index.js slot list` |
| "reset slot" | `node src/index.js slot reset` |
| "verify creation" | `node src/index.js verify` |

**Full command reference:** See REFERENCE.md

***

## AI Verification (Internal)

After creating any component, run `verify` to get a screenshot for validation:

```bash
node src/index.js verify              # Screenshot of selection
node src/index.js verify "123:456"    # Screenshot of specific node
```

Returns JSON with base64 image (max 2000px, auto-scaled to stay under API limits).

**Always verify after:**
- `render` or `render-batch`
- `node to-component`
- Any visual creation

***

## Blocks (Pre-built UI Layouts)

**ALWAYS use `blocks create` for dashboards and page layouts.**

```bash
node src/index.js blocks list                    # Show available blocks
node src/index.js blocks create dashboard-01     # Create dashboard in Figma
```

**dashboard-01** includes: sidebar with Lucide icons, stats cards, area chart,
data table with pagination. All colors bound to shadcn variables (Light/Dark mode).

**Dark mode copy:**
```javascript
// Via eval:
var clone = dashboard.clone();
clone.name = 'Dashboard (Dark)';
clone.setExplicitVariableModeForCollection(semanticCollection, darkModeId);
```

***

## Design Tokens

```bash
node src/index.js tokens preset shadcn   # 244 primitives + 32 semantic (Light/Dark)
node src/index.js tokens tailwind        # 242 primitive colors only
node src/index.js tokens ds              # IDS Base colors
node src/index.js var delete-all                    # Delete all collections
node src/index.js var delete-all -c "primitives"    # Delete specific collection
```

**Note:** `var list` only SHOWS existing variables. Use `tokens` commands to CREATE them.

***

## Fast Variable Binding (var: syntax)

```bash
node src/index.js create rect "Card" --fill "var:card" --stroke "var:border"
node src/index.js create text "Hello" -c "var:foreground"
node src/index.js create frame "Section" --fill "var:background"
node src/index.js set fill "var:primary"
node src/index.js set stroke "var:border"
```

**JSX render with var:**
```bash
node src/index.js render '<Frame bg="var:card" stroke="var:border" rounded={12} p={24}>
  <Text color="var:foreground" size={18}>Title</Text>
</Frame>'
```

**Available variables:** `background`, `foreground`, `card`, `primary`, `secondary`,
`muted`, `accent`, `border`, and their `-foreground` variants.

***

## Connection Modes

### Yolo Mode (Recommended)
```bash
node src/index.js connect
```

### Safe Mode
```bash
node src/index.js connect --safe
```
Then: Plugins → Development → FigCli

**Safe Mode CRITICAL:** `render-batch` does NOT render text properly in Safe Mode!
Use `eval` with direct Figma API for all components with text.

***

## Creating Components (Safe Mode — eval pattern)

```javascript
node src/index.js eval "(async () => {
  // 1. Load Inter fonts FIRST (DadyCar uses SemiBold + Regular only)
  await figma.loadFontAsync({ family: 'Inter', style: 'SemiBold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  // 2. Create frame with FIXED width
  const card = figma.createFrame();
  card.name = 'Vehicle Card';
  card.x = 100; card.y = 100;
  card.resize(340, 1);
  card.layoutMode = 'HORIZONTAL';
  card.primaryAxisSizingMode = 'FIXED';
  card.counterAxisSizingMode = 'AUTO';
  card.paddingTop = card.paddingBottom = card.paddingLeft = card.paddingRight = 24;
  card.itemSpacing = 16;
  card.cornerRadius = 8;
  card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; // #ffffff

  // 3. Content frame FILL
  const content = figma.createFrame();
  content.fills = [];
  content.layoutMode = 'VERTICAL';
  content.itemSpacing = 4;
  card.appendChild(content);
  content.layoutSizingHorizontal = 'FILL';

  // 4. Title — SemiBold #09090b
  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Toyota Corolla 2024';
  title.fontSize = 14;
  title.fills = [{ type: 'SOLID', color: { r: 0.035, g: 0.035, b: 0.043 } }];
  content.appendChild(title);
  title.layoutSizingHorizontal = 'FILL';

  // 5. Label — Regular #626265
  const label = figma.createText();
  label.fontName = { family: 'Inter', style: 'Regular' };
  label.characters = 'Fleet ID: VH-001';
  label.fontSize = 12;
  label.fills = [{ type: 'SOLID', color: { r: 0.384, g: 0.384, b: 0.396 } }];
  content.appendChild(label);
  label.layoutSizingHorizontal = 'FILL';

  const comp = figma.createComponentFromNode(card);
  return { id: comp.id, name: comp.name };
})()"
```

**Auto-Layout Rules — Text Cut-Off Prevention:**
1. Parent frame: `resize(WIDTH, 1)` + `primaryAxisSizingMode = 'FIXED'`
2. Child frames: `layoutSizingHorizontal = 'FILL'` AFTER `appendChild`
3. ALL text nodes: `layoutSizingHorizontal = 'FILL'` AFTER `appendChild`
4. Order is critical: `appendChild` first, then set `layoutSizingHorizontal`

**Check positions before creating (avoid overlap):**
```javascript
const nodes = figma.currentPage.children.map(n => ({ name: n.name, x: n.x, width: n.width }));
const maxX = Math.max(0, ...nodes.map(n => n.x + n.width)) + 100;
```

**NEVER delete existing nodes.**

***

## JSX Syntax (render command)

```jsx
// Layout
flex="row"            flex="col"
gap={16}              p={24}    px={16} py={8}
justify="center"      items="center"

// Size
w={320} h={200}       w="fill" h="fill"

// Appearance — USE DADYCAR TOKENS
bg="#ffffff"          bg="#0f82ea"         bg="#23272f"
stroke="#afafb1"      strokeWidth={1}
rounded={8}           rounded={9999}       // pill badges

// Text — Inter only, SemiBold headings
<Text size={14} weight="semibold" color="#09090b" w="fill">Heading</Text>
<Text size={14} weight="regular" color="#626265" w="fill">Label</Text>

// Icons — Lucide always
<Icon name="lucide:car" size={16} color="#626265" />
<Icon name="lucide:layout-dashboard" size={16} color="#ffffff" />
<Icon name="lucide:truck" size={16} color="#0f82ea" />
<Icon name="lucide:alert-triangle" size={16} color="#cc6600" />
<Icon name="lucide:check-circle" size={16} color="#349a5d" />
```

### DadyCar JSX Component Recipes

**Primary Button:**
```bash
node src/index.js render '<Frame bg="#0f82ea" rounded={8} h={36} px={16} flex="row" justify="center" items="center">
  <Text size={14} weight="semibold" color="#ffffff">Add Vehicle</Text>
</Frame>'
```

**Sidebar Navigation:**
```bash
node src/index.js render '<Frame name="Sidebar" bg="#23272f" w={240} h={800} flex="col" gap={4} p={12}>
  <Frame rounded={8} px={12} py={8} flex="row" items="center" gap={8}>
    <Icon name="lucide:layout-dashboard" size={16} color="#ffffff" />
    <Text size={14} weight="semibold" color="#ffffff" w="fill">Dashboard</Text>
  </Frame>
  <Frame bg="#ffffff" rounded={8} px={12} py={8} flex="row" items="center" gap={8}>
    <Icon name="lucide:car" size={16} color="#09090b" />
    <Text size={14} weight="semibold" color="#09090b" w="fill">Vehicles</Text>
  </Frame>
  <Frame rounded={8} px={12} py={8} flex="row" items="center" gap={8}>
    <Icon name="lucide:users" size={16} color="#ffffff" />
    <Text size={14} weight="semibold" color="#ffffff" w="fill">Drivers</Text>
  </Frame>
  <Frame rounded={8} px={12} py={8} flex="row" items="center" gap={8}>
    <Icon name="lucide:bar-chart-3" size={16} color="#ffffff" />
    <Text size={14} weight="semibold" color="#ffffff" w="fill">Reports</Text>
  </Frame>
</Frame>'
```

**Status Badge — Active:**
```bash
node src/index.js render '<Frame bg="#d9f3e3" rounded={9999} px={8} py={4} flex="row" items="center" stroke="#8ddaac" strokeWidth={1}>
  <Text size={12} weight="semibold" color="#349a5d">Active</Text>
</Frame>'
```

**KPI Card:**
```bash
node src/index.js render '<Frame bg="#ffffff" rounded={8} p={24} flex="col" gap={8} w={200} shadow="0 1px 3px rgba(9,9,11,0.06)" stroke="#efeff0" strokeWidth={1}>
  <Text size={32} weight="semibold" color="#09090b" w="fill">142</Text>
  <Text size={14} weight="regular" color="#626265" w="fill">Total Vehicles</Text>
</Frame>'
```

**Table Row:**
```bash
node src/index.js render '<Frame bg="#ffffff" w={800} h={44} flex="row" items="center" px={12} stroke="#efeff0" strokeWidth={1}>
  <Text size={14} weight="regular" color="#09090b" w="fill">Toyota Corolla</Text>
  <Text size={14} weight="regular" color="#09090b" w="fill">VH-001</Text>
  <Frame bg="#d9f3e3" rounded={9999} px={8} py={4}>
    <Text size={12} weight="semibold" color="#349a5d">Active</Text>
  </Frame>
</Frame>'
```

### Common Pitfalls

**Text cut off — CRITICAL:**
```jsx
// BAD — no w="fill", clips at one line
<Text size={14} weight="semibold" color="#09090b">Vehicle Name</Text>

// GOOD — always w="fill" on ALL text
<Text size={14} weight="semibold" color="#09090b" w="fill">Vehicle Name</Text>
```

**Wrong font weight:**
```jsx
// BAD — Regular on a heading
<Text size={20} color="#09090b">Section Title</Text>

// GOOD — SemiBold on headings always
<Text size={20} weight="semibold" color="#09090b" w="fill">Section Title</Text>
```

**Wrong sidebar color:**
```jsx
// BAD — dark gray but not DadyCar
<Frame bg="#1a1a2e">...</Frame>

// GOOD — exact DadyCar sidebar token
<Frame bg="#23272f">...</Frame>
```

**No emojis — use Lucide:**
```jsx
// BAD
<Text>🚗 Vehicle</Text>

// GOOD
<Frame flex="row" items="center" gap={8}>
  <Icon name="lucide:car" size={16} color="#626265" />
  <Text size={14} color="#09090b" w="fill">Vehicle</Text>
</Frame>
```

***

## Key Rules

1. **Always use `render` for frames** — has smart positioning
2. **Never use `eval` to create** — no positioning, overlaps at (0,0)
3. **For multiple frames:** Use `render-batch`
4. **Convert to components:** `node to-component` after creation
5. **Font for DadyCar:** Inter only — `weight="semibold"` headings, `weight="regular"` body
6. **Sidebar always:** `bg="#23272f"` white text → selected item is white card
7. **Brand accent:** `#0f82ea` only — no second colors, no gradients

***

## Onboarding ("Initiate Project")

**Never show terminal commands to users.** Run silently, give friendly feedback.

1. Run `npm install` silently
2. Ask connection mode (Yolo or Safe)
3. Run `node src/index.js connect` (or `--safe`)
4. When connected: "Connected to Figma! What would you like to build?"

If permission error (macOS): System Settings → Privacy → Full Disk Access → Add Terminal

***

## Variable Visualization

```bash
node src/index.js var visualize              # All collections
node src/index.js var visualize "primitives" # Filter by name
```

***

## Slots

```bash
node src/index.js slot create "Content" --flex col --gap 8 --padding 16
node src/index.js slot list
node src/index.js slot preferred "Slot#1:2" "component-id"
node src/index.js slot reset
node src/index.js slot convert --name "Actions"
```

**CRITICAL:** `isSlot = true` does NOT work in eval!
Always use: `node src/index.js slot convert "frame-id" --name "SlotName"`

***

## Speed Daemon

```bash
node src/index.js daemon status
node src/index.js daemon restart
```