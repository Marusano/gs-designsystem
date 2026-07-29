# GSFleet Design System

Reference for the GSFleet product UI design system. Covers every token, component, and rule needed to implement designs from the Figma file or extend the system.

**Figma file**: `w6mC7PaMgtX4fbmagiDtAq` — `DS-GSFleet`
**Token file**: `tokens/design-tokens.json` (W3C DTCG format)
**CSS variables**: `src/foundations/colors.css`
**Vue components**: `src/components/ui/`

---

## How to use this document

- **Designers**: use the semantic token names when specifying designs. Never specify hex values — always reference a token name.
- **Developers**: every hex value in a component must come from a CSS variable defined in `src/foundations/colors.css`. The token file at `tokens/design-tokens.json` is the machine-readable equivalent.
- **AI tools**: token paths in this document map 1:1 to `tokens/design-tokens.json`. Component prop tables are authoritative — do not infer props from component names alone.

---

## Color Tokens

All colors live in `src/foundations/colors.css` as CSS custom properties. The structure is:

```
Primitive palette  →  Semantic aliases  →  Component tokens
(never use directly)   (use these)          (component internals only)
```

### Primitive palette

Raw color scales. **Never reference these directly in component styles.** Use semantic aliases instead. The only valid use of primitives is inside `colors.css` to define semantic tokens.

| Scale | Steps | Notes |
|-------|-------|-------|
| `colors.primitive.grey` | 00–100 (12 stops) | Core neutral scale. 00 = white, 100 = near-black. |
| `colors.primitive.blue.azure` | 10–100 | Primary interactive blue. 50 = brand accent. |
| `colors.primitive.blue.vivid` | 10–100 | High-saturation blue for data vis / highlights. |
| `colors.primitive.red` | 10–100 | Error and danger states. |
| `colors.primitive.green` | 10–100 | Success states. |
| `colors.primitive.yellow` | 10–100 | Warning states. |
| `colors.primitive.orange` | 10–100 | Moderate / caution states. |
| `colors.primitive.indigo` | 10–100 | Brand navy family. 100 = `#010028`. |
| `colors.primitive.purple` | 10–100 | Highlight / informational accent. |
| `colors.primitive.pink` | 10–100 | Decorative / data vis use only. |

### Semantic aliases — use these in all components and pages

#### Surface (`--color-surface-*`)

Background colors for containers and the page itself.

| Token | CSS var | Value | When to use |
|-------|---------|-------|-------------|
| `colors.surface.default` | `--color-surface-default` | `#ffffff` | Cards, modals, inputs, any content container |
| `colors.surface.subtle` | `--color-surface-subtle` | `#f7f7f8` | App background, sidebar, page canvas |
| `colors.surface.muted` | `--color-surface-muted` | `#f1f1f2` | Table headers, selected tab background, hover states on rows |

**Constraint**: never use `grey-00` / `grey-05` / `grey-10` directly — always use the surface alias.

#### Text (`--color-text-*`)

| Token | CSS var | Value | When to use |
|-------|---------|-------|-------------|
| `colors.text.primary` | `--color-text-primary` | `#1f2124` | Headings, key data, default body text |
| `colors.text.secondary` | `--color-text-secondary` | `#6f7176` | Supporting labels, metadata, placeholder supplement |
| `colors.text.disabled` | `--color-text-disabled` | `#b0b2b7` | Any text on a disabled interactive element |
| `colors.text.inverse` | `--color-text-inverse` | `#ffffff` | Text on dark/filled surfaces (primary button, dark tooltip) |
| `colors.text.link` | `--font-color-link` | `#0369a1` | Hyperlinks, clickable text in tables |
| `colors.text.error` | — | `#b91c1c` | Inline validation error messages |
| `colors.text.label` | — | `#9c9ea3` | Form labels in disabled state, caption text |

**Constraint**: only use `inverse` when the surface behind the text is dark-filled (e.g. primary button, indigo background). Do not use on grey surfaces.

#### Border (`--color-border-*`)

| Token | CSS var | Value | When to use |
|-------|---------|-------|-------------|
| `colors.border.default` | `--color-border-default` | `#e6e6e7` | Default input border, card outlines, dividers |
| `colors.border.strong` | `--color-border-strong` | `#c0c2c6` | Hover borders on inputs and selects |
| `colors.border.focus` | — | `#b3e1f7` | Keyboard focus ring (always `box-shadow: inset 0 0 0 2px`) |

**Constraint**: always use `box-shadow: inset 0 0 0 1px <color>` for borders on interactive elements — never `border`. This prevents layout shift when border width changes on state.

#### Accent (`--color-accent-*`)

| Token | CSS var | Value | When to use |
|-------|---------|-------|-------------|
| `colors.accent.main` | `--color-accent-main` | `#39ade3` | Checkbox/radio/toggle selected state, focus rings on form elements |
| `colors.accent.hover` | `--color-accent-hover` | `#138cc4` | Hover over accent-colored controls |

#### Status

Used for feedback states in notifications, tags, and alert banners.

| Token | CSS var | Value | Use |
|-------|---------|-------|-----|
| `colors.status.success` | `--color-success` | `#64d074` | Positive outcome, confirmed action |
| `colors.status.warning` | `--color-warning` | `#f9c74f` | Caution, needs attention |
| `colors.status.danger` | `--color-danger` | `#f94144` | Error, destructive action, failed state |
| `colors.status.info` | `--color-info` | `#138cc4` | Informational, in-progress |

**Constraint**: status colors are for icons and indicator dots — do not use them as background fills directly. For backgrounds, use the corresponding 10-stop primitive (e.g. `--green-10` for success background).

#### Brand

| Token | Value | Use |
|-------|-------|-----|
| `colors.brand.navy` | `#010028` | Primary button background, logo mark, brand-level calls to action |
| `colors.brand.azure` | `#61bde9` | Logo accent mark only |
| `colors.brand.neutral` | `#9c9ea3` | Logo on neutral/grey backgrounds |

---

## Typography

**Family**: Inter (all weights, loaded via Google Fonts in `index.html`). No other typeface is used.

### Font sizes

| Token | Value | Use |
|-------|-------|-----|
| `typography.size.xs` | 12px | Captions, badge text, tooltip text |
| `typography.size.sm` | 13px | Secondary supporting text |
| `typography.size.base` | 14px | **Default** — all buttons, inputs, selects, tags, table cells |
| `typography.size.md` | 16px | Section subheadings |
| `typography.size.lg` | 20px | Page headings |
| `typography.size.xl` | 24px | Display headings |
| `typography.size.xxl` | 32px | Hero / large display |

**Constraint**: component internals always use `14px` (`typography.size.base`). Only page-level heading hierarchy uses larger sizes.

### Font weights

| Token | Value | Use |
|-------|-------|-----|
| `typography.weight.regular` | 400 | Body text, secondary labels, unselected tab labels |
| `typography.weight.medium` | 500 | Button labels (default) |
| `typography.weight.semibold` | 600 | Selected tab labels, form field labels, notification text |
| `typography.weight.bold` | 700 | Page headings, strong emphasis |

### Line heights

| Token | Value | Use |
|-------|-------|-----|
| `typography.lineHeight.tight` | 16px | Button labels, field text |
| `typography.lineHeight.base` | 20px | Body paragraphs |
| `typography.lineHeight.relaxed` | 24px | Long-form content |

---

## Spacing

### Field spacing

Used inside all form controls (input, select, textarea).

| Token | CSS var | Value | Use |
|-------|---------|-------|-----|
| `spacing.field.px` | `--field-px` | 12px | Horizontal padding inside inputs and selects |
| `spacing.field.py` | `--field-py` | 8px | Vertical padding inside inputs |
| `spacing.field.gap` | `--field-gap` | 6px | Gap between leading icon and input text |

### Button spacing

Horizontal padding inside buttons at each size step.

| Token | CSS var | Value |
|-------|---------|-------|
| `spacing.button.px.xs` | `--btn-px-xs` | 10px |
| `spacing.button.px.sm` | `--btn-px-sm` | 12px |
| `spacing.button.px.md` | `--btn-px-md` | 12px |
| `spacing.button.px.xl` | `--btn-px-xl` | 20px |

---

## Sizing

### Heights

All interactive elements snap to one of four height steps. Do not create intermediate heights.

| Token | CSS var | Value | Components |
|-------|---------|-------|------------|
| `size.height.xs` | `--btn-height-xs` | 32px | Button xs |
| `size.height.sm` | `--btn-height-sm` | 36px | Button sm, tag sm, checkbox/radio (18px hit area) |
| `size.height.md` | `--btn-height-md` | 40px | Button md, all inputs/selects, tab strip |
| `size.height.xl` | `--btn-height-xl` | 56px | Button xl, page header, tag md (card variant) |

### Border radius

| Token | CSS var | Value | Use |
|-------|---------|-------|-----|
| `size.radius.none` | — | 0px | Flat / flush elements |
| `size.radius.sm` | `--btn-radius`, `--field-radius` | 4px | **Default** — all buttons, inputs, tags, checkboxes |
| `size.radius.md` | — | 8px | Cards, modals, larger containers |
| `size.radius.lg` | — | 16px | Floating panels |
| `size.radius.xl` | — | 30px | Pill buttons / fully rounded |
| `size.radius.full` | — | 9999px | Circle avatars, dot indicators |

**Constraint**: component radius is always `4px` (`size.radius.sm`). Only layout containers (cards, modals) use larger values.

### Border widths

| Token | Value | Use |
|-------|-------|-----|
| `size.border.sm` | 1px | Default component border (via `box-shadow: inset 0 0 0 1px`) |
| `size.border.lg` | 3px | Not currently used — reserved |

---

## Component Library

Every component is a Vue 3 SFC (`<script setup>`) in `src/components/ui/`. Import by name; no global registration.

---

### `AppButton`

**File**: `src/components/ui/AppButton.vue`
**Use**: All clickable actions — primary CTAs, secondary actions, icon-only controls, destructive operations.

#### Variants

| Variant | When to use |
|---------|-------------|
| `primary` | Single highest-priority action per view. Uses brand navy background. |
| `secondary` | Paired with primary as a cancel/alternative. Outlined, no fill. |
| `tertiary` | Low-emphasis action. Ghost with border — use in toolbars, filter rows. |
| `quiet` | Minimal footprint — icon-adjacent text actions, table row controls. |
| `danger` | Destructive or irreversible actions (delete, remove, revoke). Always confirm before triggering. |

#### Sizes

| Size | Height | Use |
|------|--------|-----|
| `xl` | 56px | Hero / landing page CTAs |
| `md` | 40px | **Default** — most form actions, dialogs |
| `sm` | 36px | Compact toolbars, filter bars |
| `xs` | 32px | Dense tables, inline actions |

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `primary \| secondary \| tertiary \| quiet \| danger` | `primary` | |
| `size` | `xl \| md \| sm \| xs` | `md` | |
| `disabled` | Boolean | `false` | Applies visual and functional disabled state |
| `loading` | Boolean | `false` | Shows spinner; disables click |
| `as` | String (tag) | `button` | Use `a` for link-styled buttons |
| `forcedState` | `hover \| focus \| active \| disabled` | `null` | Documentation only — forces visual state |

**Slots**: `#icon-left`, default (label), `#icon-right`
**`$attrs`** pass-through: all attributes land on the native `<button>` element.

**Constraints**:
- Never use `primary` more than once per view.
- `danger` must always be preceded by a confirmation step or dialog.
- Icon-only buttons must have an `aria-label` passed via `$attrs`.

---

### `AppInput`

**File**: `src/components/ui/AppInput.vue`
**Use**: All text entry — single-line fields for text, email, password, search, date, and time.

#### Input types

| Type | Behaviour |
|------|-----------|
| `text` | Plain text entry |
| `email` | Email keyboard on mobile, basic format hint |
| `password` | Masked with show/hide toggle |
| `search` | Prepends magnifier icon; clear button appears on value |
| `date` | Native date picker |
| `time` | Native time picker |

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `modelValue` | String | — | `v-model` binding |
| `label` | String | — | Floating label above the field |
| `type` | String | `text` | See types table above |
| `placeholder` | String | — | |
| `hint` | String | — | Helper text below the field |
| `error` | String | — | Error message; triggers error visual state |
| `disabled` | Boolean | `false` | |
| `forcedState` | `hover \| focus` | `null` | Documentation only |

**Constraints**:
- Always provide `label` — unlabelled inputs are inaccessible.
- Use `error` (not `hint`) for validation messages so screen readers announce them correctly.
- Height is always `40px` (`size.height.md`). Do not override.

---

### `AppSelect`

**File**: `src/components/ui/AppSelect.vue`
**Use**: Single-value selection from a bounded option list. Renders a native `<select>` with a custom chevron overlay.

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `modelValue` | any | — | `v-model` binding |
| `label` | String | — | Label above the select |
| `options` | `Array<{ value, label, disabled? }>` | — | Required |
| `placeholder` | String | — | Shown when no value selected |
| `disabled` | Boolean | `false` | |
| `error` | String | — | Validation error |

**Constraints**:
- Use for lists of ≤ ~20 items. For longer or searchable lists, use a combobox pattern (not yet in library).
- Always provide `label`.

---

### `AppTag`

**File**: `src/components/ui/AppTag.vue`
**Use**: Status labels, category badges, filterable facet pills, card metadata.

#### Types (visual styles)

| Type | Background | Text | Use |
|------|-----------|------|-----|
| `neutral` | `grey-10` | `grey-80` | Default, uncategorised |
| `neutral-outline` | transparent | `grey-80` | Subtle label, no fill |
| `neutral-inverted` | `grey-100` | white | High-contrast label on light bg |
| `success` | `green-10` | `green-80` | Active, confirmed, healthy |
| `success-strong` | `green-80` | white | Strong positive emphasis |
| `informational` | `blue-azure-10` | `blue-azure-80` | In-progress, informational |
| `informational-strong` | `blue-azure-80` | white | Strong info emphasis |
| `informational-inverted` | `indigo-100` | white | Brand-coloured informational |
| `danger` | `red-10` | `red-80` | Error, failed, blocked |
| `warning` | `yellow-10` | `yellow-80` | Caution, pending |
| `moderate` | `orange-10` | `orange-80` | Moderate severity |
| `highlight` | `purple-10` | `purple-80` | Special / highlighted items |

#### Sizes

| Size | Height | Use |
|------|--------|-----|
| `sm` | 24px | **Default** — inline status labels, filter chips |
| `md` | 56px | Card-level tag with title label above value |

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `type` | (see types above) | `neutral` | |
| `size` | `sm \| md` | `sm` | |
| `dismissible` | Boolean | `false` | Shows × button; emits `dismiss` |
| `cardTitle` | String | — | Top label for `md` card variant |

**Slots**: `#icon` (prepends icon), default (tag content)

**Constraints**:
- `md` size is only for standalone card-level metadata — not for inline use in text or table cells.
- Dismissible tags emit `dismiss` but do not remove themselves — the parent must handle state.

---

### `AppTabs`

**File**: `src/components/ui/AppTabs.vue`
**Use**: In-page navigation between related content panels. Not for top-level app routing.

#### Variants

| Variant | Visual | Use |
|---------|--------|-----|
| `contained` | White bg, 8px radius pill, grey-20 border | Floating tab group — use inside cards or panels |
| `borderless` | grey-05 bg, no border, selected tab highlighted | Full-width section tabs, page-level sub-navigation |

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `modelValue` | any | — | `v-model` — currently selected tab value |
| `items` | `Array<{ label, value, disabled? }>` | — | Tab list |
| `variant` | `contained \| borderless` | `contained` | |

**Constraints**:
- Maximum 5 tabs per group. Beyond that, consider a Select or sidebar navigation.
- Disabled tabs remain visible but are not keyboard-focusable.

---

### `AppCheckbox`

**File**: `src/components/ui/AppCheckbox.vue`
**Use**: Boolean on/off selection. Also supports an indeterminate (partial-select) state for parent checkboxes in tree selections.

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `modelValue` | Boolean | `false` | `v-model` binding |
| `indeterminate` | Boolean | `false` | Renders a dash; overrides checked icon |
| `disabled` | Boolean | `false` | |
| `label` | String | — | Inline label; alternatively use default slot |

**Slots**: default (label content, alternative to `label` prop)

**Constraints**:
- Use `indeterminate` only on parent checkboxes in a select-all pattern, never for tristate semantics.
- Size is fixed at `18px` (`checbox-radio-size-md`).

---

### `AppRadio`

**File**: `src/components/ui/AppRadio.vue`
**Use**: Single selection within a mutually exclusive group. Always render 2+ radios together with the same `name`.

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `modelValue` | any | `null` | `v-model` — shared across the group |
| `value` | any | required | The value this radio represents |
| `label` | String | — | Inline label |
| `disabled` | Boolean | `false` | |
| `name` | String | — | Groups radios for keyboard navigation |

**Constraints**:
- Always provide `name` — without it, keyboard arrow-key navigation between radios won't work.
- For ≥ 5 options, prefer `AppSelect` over a radio group.

---

### `AppToggle`

**File**: `src/components/ui/AppToggle.vue`
**Use**: Immediate on/off setting that takes effect without a submit action (e.g. enable notifications, show advanced options).

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `modelValue` | Boolean | `false` | `v-model` |
| `size` | `sm \| md` | `md` | |
| `disabled` | Boolean | `false` | |
| `label` | String | — | Inline label |

**Constraints**:
- Do not use for form inputs that require a Save action — use `AppCheckbox` instead.
- Always pair with a visible label; icon-only toggles require `aria-label` via `$attrs`.

---

### `AppTooltip`

**File**: `src/components/ui/AppTooltip.vue`
**Use**: Short supplementary text that appears on hover/focus over an element. Max one line of text.

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `content` | String | required | Tooltip text |
| `variant` | `light \| dark` | `light` | `dark` = `grey-100` bg; `light` = white + border |
| `position` | `top \| bottom \| left \| right` | `top` | |

**Slots**: default (the trigger element the tooltip appears on)

**Constraints**:
- Tooltip content must be purely supplementary — never put critical information only in a tooltip.
- Max ~60 characters. For longer content use a popover pattern.
- Always activated by both hover AND focus (keyboard accessible).

---

### `AppMenu`

**File**: `src/components/ui/AppMenu.vue`
**Use**: Dropdown context menu triggered by a button. Use for overflow actions, contextual actions on a row/card.

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `Array<{ label, icon?, danger?, divider?, disabled? }>` | required | Menu items |
| `open` | Boolean | `false` | `v-model` |
| `align` | `left \| right` | `left` | Alignment relative to trigger |
| `wide` | Boolean | `false` | 220px min-width instead of 160px |

**Slots**: `#trigger` (the button that opens the menu)
**Emits**: `update:open`, `select(item)`

**Item shape**:
```js
{ label: 'Delete', icon: '<svg>...</svg>', danger: true }
{ divider: true }  // renders a separator
```

**Constraints**:
- `danger: true` items render in red — use only for destructive actions.
- Close on `Esc` is built-in. Close on outside-click must be implemented by the parent.

---

### `AppBreadcrumbs`

**File**: `src/components/ui/AppBreadcrumbs.vue`
**Use**: Wayfinding trail showing the user's current location in the app hierarchy.

#### Props

| Prop | Type | Notes |
|------|------|-------|
| `items` | `Array<{ label, href? }>` | Last item is the current page (no link). All others render as links. |

**Constraints**:
- Always show at least 2 items (root + current). A single-item breadcrumb is meaningless.
- The current page item must not have an `href`.

---

### `AppLegend`

**File**: `src/components/ui/AppLegend.vue`
**Use**: Color key for charts, maps, or any data visualisation. Renders a horizontal strip of labelled color markers.

#### Props

| Prop | Type | Notes |
|------|------|-------|
| `items` | `Array<{ label, color, dash? }>` | `dash: true` renders a short line (for line charts) instead of a square dot |

**Constraints**:
- Colors in legend items are arbitrary (data-vis palette) and are the only place raw hex values are acceptable.
- Keep labels short (≤ 20 chars) to prevent wrapping in compact views.

---

### `AppNotificationBubble`

**File**: `src/components/ui/AppNotificationBubble.vue`
**Use**: Numeric badge or dot indicator overlaid on a navigation icon or avatar to signal unread count or new activity.

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `count` | Number | `null` | Displays number; capped at `99+` |
| `variant` | `elevated \| flat` | `elevated` | `elevated` = light blue bg; `flat` = dark bg (for light surfaces) |
| `dot` | Boolean | `false` | Dot-only mode — no number, just presence indicator |

**Constraints**:
- This component does not position itself — wrap it with `position: relative` on the parent and use `position: absolute` to place the bubble.
- `dot` mode takes precedence over `count`.

---

### `AppIcon`

**File**: `src/components/ui/AppIcon.vue`
**Use**: Inline SVG icon from the GSFleet icon registry.

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `name` | String | required | Key from `src/components/icons/index.js` |
| `size` | Number | `24` | Pixel size (width = height) |
| `color` | String | `currentColor` | Fill color; inherits text color by default |

**Constraints**:
- All icons are `aria-hidden="true"` — always pair with visible text or `aria-label` on the parent button.
- Do not install external icon packages. All icons must be in `src/components/icons/index.js`.
- Default size is `20px` in button/field contexts (`size.icon.md`).

---

## Design Conventions

### Border implementation

Always use `box-shadow: inset 0 0 0 1px <color>` for component borders. Using `border` causes layout shift when border width changes between states.

```css
/* Correct */
box-shadow: inset 0 0 0 1px var(--color-border-default);

/* Wrong — causes layout shift */
border: 1px solid var(--color-border-default);
```

### State layering

Interactive states are applied in this order (each builds on the previous):

1. **Default** — base appearance
2. **Hover** — subtle background shift, border darkens
3. **Focus** — focus ring via `box-shadow` (`--color-border-focus`), not outline
4. **Active** — pressed state, slightly darker than hover
5. **Disabled** — `--btn-disabled-bg` / `--btn-disabled-text`; `cursor: not-allowed`

### Forced states (documentation only)

Components accept a `forcedState` prop (`hover | focus | active | disabled`) to freeze a component in a specific visual state for documentation pages. This prop has no runtime behaviour and must never be used in product code.

### CSS class naming

| Context | Convention | Example |
|---------|-----------|---------|
| Shell elements | `ds-` prefix | `ds-header`, `ds-sidebar` |
| Page content | Page-specific prefix | `ds-toolbar-row`, `tb-tabs` |
| Variant modifiers | `--` | `btn--primary`, `tag--success` |
| State classes | `is-` | `is-hover`, `is-focus`, `is-disabled` |

### No hardcoded values

Every hex color in a `.vue` file must reference a CSS variable. The only exception is `AppLegend` item colors (data-vis palette).

---

## Adding to the system

### New component

1. Create `src/components/ui/AppXxx.vue` with `<style scoped>`
2. All tokens via CSS variables — no hex literals
3. Add a `forcedState` prop if the component has interactive states (for docs use)
4. Create `src/pages/XxxPage.vue` to document it
5. Wire into `src/App.vue`: import + sidebar button + conditional render
6. Update `design-system.md` (this file) with the component entry
7. Add the new component to the reuse table in `CLAUDE.md`

### New token

1. Add the CSS custom property to `src/foundations/colors.css`
2. Add the W3C DTCG entry to `tokens/design-tokens.json`
3. Update the relevant token table in this file
4. Update the mapping table in `CLAUDE.md` if it's a color

### Commit and deploy

```bash
cd ~/Claude_M/gs-design-system
git add -p
git commit -m "..."
git push   # triggers GitHub Actions → GitHub Pages deploy
```
