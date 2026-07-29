# CLAUDE.md — GSFleet Design System

Reference guide for working in the `gs-design-system` Vue 3 app. Keep this in sync when adding pages, components, or tokens.

---

## Project Overview

**Repo**: `~/Claude_M/gs-design-system`
**Purpose**: Living design-system documentation site — every component, token, and pattern in the GSFleet product UI, rendered and interactive in the browser.
**Stack**: Vue 3 (Composition API, `<script setup>`) · Vite 5 · Tailwind CSS (installed but rarely used; most styling is CSS custom properties + scoped `<style>` blocks)
**Font**: Inter (all weights) loaded via Google Fonts in `index.html`
**Deploy**: GitHub Actions → GitHub Pages at `https://<org>.github.io/gs-designsystem/` on every push to `main`
**Version**: v0.1.0

---

## File Map (critical files only)

```
src/
├── App.vue                        ← Shell: header, sidebar nav, page router (ref `page`)
├── main.js                        ← createApp, mounts #app, imports foundations/colors.css
├── foundations/
│   └── colors.css                 ← ALL design tokens as CSS custom properties + Tailwind base
├── components/ui/
│   ├── AppButton.vue              ← Button component (5 variants, 4 sizes)
│   ├── AppInput.vue               ← Text/search/date input
│   ├── AppSelect.vue              ← Native select with custom chevron
│   └── AppTag.vue                 ← Tag/badge (12 types, sm/md sizes)
└── pages/
    ├── ButtonsPage.vue            ← Foundations › Colors
    ├── ColorsPage.vue             ← Foundations › Colors
    ├── TypographyPage.vue         ← Foundations › Typography
    ├── IconsPage.vue              ← Foundations › Icons
    ├── FormsPage.vue              ← Components › Input / Forms
    ├── TagsPage.vue               ← Components › Tag
    ├── ElementsPage.vue           ← Components › Elements (Checkbox, Radio, Toggle, Notif bubble)
    ├── FiltersPage.vue            ← Design blocks › Filters
    └── MenuPage.vue               ← Design blocks › Menu
```

**To add a new page**: edit `src/App.vue` only — add import, icon SVG constant, sidebar `<button>`, and `<NewPage v-if="page === '...'" />` in the content area.

---

## Navigation Structure (`src/App.vue`)

```
Foundations      → colors · typography · icons
Components       → buttons · forms · tags · elements
Design blocks    → filters · menu
```

`page` is a `ref('buttons')` — clicking a sidebar item sets it, the content area conditionally renders the matching page component.

---

## Design Tokens (`src/foundations/colors.css`)

This is the single source of truth for tokens in code. All CSS custom properties are defined in `:root` here.

### Color Primitives

| Scale | Range | Key values |
|-------|-------|-----------|
| `--grey-*` | 00–100 (12 stops) | `--grey-05` #f7f7f8 · `--grey-10` #f1f1f2 · `--grey-20` #e6e6e7 · `--grey-70` #6f7176 · `--grey-90` #36383b · `--grey-100` #1f2124 |
| `--blue-azure-*` | 10–100 | `--blue-azure-10` #e8f6ff · `--blue-azure-50` #39ade3 · `--blue-azure-70` #0a74a6 · `--blue-azure-100` #013b57 |
| `--blue-vivid-*` | 10–100 | `--blue-vivid-50` #4490f6 · `--blue-vivid-70` #0068f4 |
| `--red-*` | 10–100 | `--red-60` #f94144 · `--red-70` #dc2626 · `--red-80` #b91c1c |
| `--green-*` | 10–100 | `--green-60` #64d074 · `--green-90` #247a31 |
| `--yellow-*` | 10–100 | `--yellow-60` #f9c74f |
| `--orange-*` | 10–100 | `--orange-40` #ffa767 |
| `--indigo-*` | 10–100 | `--indigo-100` #010028 (brand navy) |
| `--pink-*` | 10–100 | `--pink-60` #df4e9d |

### Semantic Tokens

```css
--color-success / warning / danger / info          /* status */
--color-surface-default / subtle / muted           /* backgrounds */
--color-text-primary / secondary / disabled / inverse
--color-border-default / strong
--color-accent-main / hover
```

### Component Tokens (Button)

Defined per variant: `--btn-primary-*`, `--btn-secondary-*`, `--btn-tertiary-*`, `--btn-quiet-*`, `--btn-danger-*`
Shared: `--btn-disabled-bg` / `--btn-disabled-text`
Sizing: `--btn-height-xl/md/sm/xs`, `--btn-px-xl/md/sm/xs`, `--btn-radius` 4px, `--btn-font-size` 14px

### Component Tokens (Field/Input)

`--field-height` 40px · `--field-radius` 4px · `--field-px` 12px · `--field-font-size` 14px
States: default, hover, focus, error, disabled — all tokenised.

---

## UI Components

### `AppButton`

```vue
<AppButton variant="primary" size="md" :disabled="false">
  <template #icon-left><svg .../></template>
  Label
  <template #icon-right><svg .../></template>
</AppButton>
```

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `primary` `secondary` `tertiary` `quiet` `danger` | `primary` |
| `size` | `xl` `md` `sm` `xs` | `md` |
| `disabled` | Boolean | false |
| `loading` | Boolean | false |
| `as` | HTML tag | `button` |
| `forcedState` | `hover` `focus` `active` `disabled` (docs only) | null |

`$attrs` passes through to the native element — `style`, `class`, event listeners all land on `<button>`.

### `AppInput`

```vue
<AppInput label="Email" v-model="val" type="email" hint="..." error="..." />
```

Types: `text` · `email` · `password` · `search` (adds magnifier icon) · `date` · `time`
`forcedState`: `hover` | `focus` (docs only)

### `AppSelect`

```vue
<AppSelect label="Fleet" v-model="val" :options="[{value:'a', label:'Fleet A'}]" />
```

`options`: `Array<{ value, label, disabled? }>`

### `AppTag`

```vue
<AppTag type="success" size="sm" dismissible @dismiss="...">
  <template #icon><svg .../></template>
  Active
</AppTag>
```

| Prop | Values |
|------|--------|
| `type` | `neutral` `neutral-outline` `neutral-inverted` `success` `success-strong` `informational` `informational-strong` `informational-inverted` `danger` `warning` `moderate` `highlight` |
| `size` | `sm` (24px, default) · `md` (56px card tag) |
| `dismissible` | Boolean — shows × button, emits `dismiss` |
| `cardTitle` | String — top label for md card variant |

---

## Styling Conventions

### Class naming

- Design system shell elements: `ds-` prefix (e.g. `ds-header`, `ds-sidebar`, `ds-content`)
- Page section elements: page-specific prefix (e.g. `ds-toolbar-row`, `ds-menu`, `ds-toggle`)
- BEM-inspired but not strict; modifier classes use `--` (e.g. `btn--primary`, `tag--success`)
- Forced/documentation states: `is-hover`, `is-focus`, `is-active`, `is-disabled`

### Border technique

Use `box-shadow: inset 0 0 0 1px <color>` instead of `border` for component borders. This avoids layout shift when border width changes on state.

### Scoped styles

Every `.vue` file uses `<style scoped>`. Global tokens live only in `src/foundations/colors.css`. Never hardcode hex values — always reference a CSS variable.

### Typography

- Body / UI: `font-family: 'Inter', sans-serif`
- Base size: 14px (`--btn-font-size`, `--field-font-size`)
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

## Figma MCP Integration Rules

These rules govern every Figma-driven task. Follow them in order — do not skip steps.

**File key**: `w6mC7PaMgtX4fbmagiDtAq`
**URL pattern**: `figma.com/design/w6mC7PaMgtX4fbmagiDtAq/...?node-id=XXXX-YYYY`
→ convert node-id dashes to colons when calling tools: `XXXX:YYYY`

### Required workflow (do not skip)

1. Call `get_design_context(fileKey, nodeId)` to fetch structured specs and a screenshot for the exact node(s)
2. If the response is too large or truncated, call `get_metadata(fileKey, nodeId)` to get the node map, then re-fetch specific children with `get_design_context`
3. Map every color value from the Figma output back to a CSS variable in `src/foundations/colors.css` — **never use hex literals**
4. Check `src/components/ui/` for an existing component before creating anything new
5. Implement as `src/pages/*.vue` (new page) or extend an existing component in `src/components/ui/`
6. Wire new pages into `src/App.vue`: import + sidebar `<button>` + `<NewPage v-if="page === '...'" />`
7. Validate the rendered output visually against the Figma screenshot before marking complete
8. Commit and push to `main` → GitHub Actions deploys to GitHub Pages automatically

### Translation rules (Figma MCP output → project code)

- The Figma MCP server returns **React + Tailwind** — treat this as a design spec, not final code
- IMPORTANT: Convert all React JSX to **Vue 3 `<script setup>` SFC** syntax
- IMPORTANT: Replace every Tailwind utility class with **CSS custom properties** in a `<style scoped>` block
- Use `box-shadow: inset 0 0 0 1px <var>` for borders — never use `border` on interactive elements (avoids layout shift on state change)
- Follow existing class naming: `ds-` prefix for shell elements, page-specific prefix for page content, BEM `--` modifiers for variants, `is-hover`/`is-focus`/`is-active`/`is-disabled` for doc-only forced states
- Font is always `'Inter', sans-serif` — never reference another typeface

### Token mapping (Figma → CSS variable)

When the Figma output contains hardcoded hex values, map them:

| Hex | CSS variable |
|-----|-------------|
| `#f7f7f8` | `--grey-05` |
| `#f1f1f2` | `--grey-10` |
| `#e6e6e7` | `--grey-20` |
| `#6f7176` | `--grey-70` |
| `#36383b` | `--grey-90` |
| `#1f2124` | `--grey-100` |
| `#39ade3` | `--blue-azure-50` |
| `#0a74a6` | `--blue-azure-70` |
| `#4490f6` | `--blue-vivid-50` |
| `#0068f4` | `--blue-vivid-70` |
| `#f94144` | `--red-60` |
| `#dc2626` | `--red-70` |
| `#64d074` | `--green-60` |
| `#f9c74f` | `--yellow-60` |
| `#010028` | `--indigo-100` |

For unlisted values, find the closest stop in `src/foundations/colors.css` and use that variable.

### Component reuse

IMPORTANT: Always check these before creating new markup:

| Need | Use |
|------|-----|
| Button (any variant/size) | `<AppButton>` from `src/components/ui/AppButton.vue` |
| Text / search / date input | `<AppInput>` from `src/components/ui/AppInput.vue` |
| Native select | `<AppSelect>` from `src/components/ui/AppSelect.vue` |
| Tag / badge | `<AppTag>` from `src/components/ui/AppTag.vue` |
| Tabs | `<AppTabs>` from `src/components/ui/AppTabs.vue` |
| Checkbox | `<AppCheckbox>` from `src/components/ui/AppCheckbox.vue` |
| Radio | `<AppRadio>` from `src/components/ui/AppRadio.vue` |
| Toggle | `<AppToggle>` from `src/components/ui/AppToggle.vue` |
| Tooltip | `<AppTooltip>` from `src/components/ui/AppTooltip.vue` |
| Icon | `<AppIcon>` from `src/components/ui/AppIcon.vue` |

### Asset handling

- IMPORTANT: If the Figma MCP response includes a localhost or remote asset URL, use it directly — do not substitute placeholders
- IMPORTANT: Do not install icon packages — all icons come from `<AppIcon>` or inline SVG from the Figma payload
- Static assets (downloaded from Figma) go in `src/assets/`

### Token JSON files (reference only, `~/Downloads/`)

| File | Purpose |
|------|---------|
| `tokens_primitives.json` | Raw color palette |
| `tokens.json` | Semantic alias tokens |
| `tokens_mapped.json` | Component-specific tokens (19 component families) |
| `tokens_mapped_colors.json` | Per-component, per-state color mappings |

These are Figma plugin exports for reference only. The live source of truth is `src/foundations/colors.css`.

---

## Dev Commands

```bash
cd ~/Claude_M/gs-design-system
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview built output
```

Push to `main` → GitHub Actions builds and deploys automatically to GitHub Pages.
