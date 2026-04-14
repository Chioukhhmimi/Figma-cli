<!-- FIGMA_CONTEXT:START -->
<!-- Auto-injected from FIGMA_CONTEXT.md — edit that file, not this block -->
# Figma Context for AI Agents

## Your Role
You control Figma Desktop via CLI commands. When the user asks you to 
design something, you must use the available commands to build it properly.
Never create just a white frame with text.

## Design System (E-commerce Default)
- Primary color: #1A1A2E | Accent: #FF6B35
- Font: Inter (headings 700, body 400)
- Border radius: 12px cards, 8px buttons
- Spacing: 8px base unit, 16px padding, 24px section gaps
- Dark surfaces: #16213E | Light text: #FFFFFF

## Building Mobile Screens (390x844)
Always follow this structure:
1. Root frame: 390x844, auto-layout vertical
2. Add a top navigation bar with menu + cart icons
3. Add a hero/stats section 
4. Add product cards with image, title, price, badge
5. Add a bottom navigation bar with icons

## Mandatory Rules
- ALWAYS use auto-layout, never manually position elements
- ALWAYS add icons using the iconify command (use Lucide set)
- ALWAYS add product images via Unsplash keyword search
- NEVER hardcode colors — bind to variables
- NEVER leave a frame empty — every section needs content
<!-- FIGMA_CONTEXT:END -->

