<script setup>
import { ref, computed } from 'vue'
import AppButton      from '../components/ui/AppButton.vue'
import AppTag         from '../components/ui/AppTag.vue'
import AppInput       from '../components/ui/AppInput.vue'
import AppIcon        from '../components/ui/AppIcon.vue'
import AppTopBar      from '../components/ui/AppTopBar.vue'
import AppFilterMenu  from '../components/ui/AppFilterMenu.vue'
import AppPageHeader  from '../components/ui/AppPageHeader.vue'

/* ── Filter definitions ──────────────────────────────────────── */
const FILTER_DEFS = [
  { key: 'f1', label: 'Filter label', options: ['Filter option 1','Filter option 2','Filter option 3','Filter option 4','Filter option 5','Filter option 6','Filter option 7'] },
  { key: 'f2', label: 'Filter label', options: ['Filter option 1','Filter option 2','Filter option 3','Filter option 4','Filter option 5','Filter option 6','Filter option 7'] },
  { key: 'f3', label: 'Filter label', options: ['Filter option 1','Filter option 2','Filter option 3','Filter option 4','Filter option 5','Filter option 6','Filter option 7'] },
]

/* ── Interactive demo state ─────────────────────────────────── */
const searchText = ref('')
const appliedMap = ref(Object.fromEntries(FILTER_DEFS.map(f => [f.key, []])))

function removeChip(key, opt) {
  appliedMap.value[key] = appliedMap.value[key].filter(o => o !== opt)
}
function clearAll() {
  FILTER_DEFS.forEach(f => { appliedMap.value[f.key] = [] })
}

const allChips   = computed(() =>
  FILTER_DEFS.flatMap(f =>
    (appliedMap.value[f.key] || []).map(opt => ({ key: f.key, label: opt, opt }))
  )
)
const hasFilters = computed(() => allChips.value.length > 0)

/* ── State 3 static chips ───────────────────────────────────── */
const state3chips = ref(['Truck', 'Driving'])
function removeState3(label) { state3chips.value = state3chips.value.filter(c => c !== label) }
function resetState3()       { state3chips.value = ['Truck', 'Driving'] }

/* ── Overflow demo chips ────────────────────────────────────── */
const OVERFLOW_INIT = [
  { key: 'a', label: 'Filter label: option 3' },
  { key: 'b', label: 'Filter label: option 6' },
  { key: 'c', label: 'Filter label: option 1' },
  { key: 'd', label: 'Filter label: option 4' },
  { key: 'e', label: 'Filter label: option 2' },
  { key: 'f', label: 'Filter label: option 5' },
]
const overflowChips = ref([...OVERFLOW_INIT])
function removeOverflow(key) { overflowChips.value = overflowChips.value.filter(c => c.key !== key) }
function resetOverflow()     { overflowChips.value = [...OVERFLOW_INIT] }
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Filters</h1>
      <div class="ds-header-cols">
        <p class="ds-body">
          The filter component provides contextual narrowing of list or table views. It consists of three layers:
          a persistent filter bar, an optional dropdown with selectable options, and a dismissible applied-filters
          strip below the content area.
        </p>
        <div class="ds-callout">
          <strong>Note:</strong> The two-step commit (apply vs immediate remove) is intentional — it prevents
          accidental filtering mid-selection while keeping single-chip removal frictionless. The "Clear all"
          control only appears when filters are active, reducing noise in the default state.
        </div>
      </div>
    </section>

    <!-- ── Component Usage ───────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component Usage</h2>

      <div class="ds-frame">

        <!-- Top bar -->
        <AppTopBar
          class="fp-topbar"
          userName="Aaro Saarinen"
          :showHelp="true"
          :breadcrumbs="[
            { label: 'Settings' },
            { label: 'User Management' },
            { label: 'Aaro Saarinen' },
          ]"
        />

        <!-- Page header -->
        <AppPageHeader type="primary" state="welcome" title="Hello, Aaro" subtitle="Welcome back to Fleet Manager">
          <template #actions>
            <AppButton variant="secondary" size="sm">
              <template #icon-left><AppIcon name="plus" :size="14" /></template>
              Button label here
            </AppButton>
            <AppButton variant="primary" size="sm">
              Button
              <template #icon-right><AppIcon name="chevron-down" :size="12" /></template>
            </AppButton>
          </template>
        </AppPageHeader>

        <!-- Filter toolbar: [search] [chip container if active] [filter buttons right] -->
        <div class="ds-toolbar-row">
          <div class="fp-search-wrap">
            <AppInput type="search" placeholder="Search" v-model="searchText" />
          </div>

          <!-- Chip container: inline between search and filter buttons -->
          <div v-if="hasFilters" class="ds-chip-container">
            <button class="ds-clear-icon" @click="clearAll" title="Clear all filters">
              <span class="ds-clear-icon__default"><AppIcon name="filter" :size="14" /></span>
              <span class="ds-clear-icon__hover"><AppIcon name="close" :size="14" /></span>
              <span class="ds-clear-icon__tooltip">Clear all filters</span>
            </button>
            <AppTag
              v-for="chip in allChips"
              :key="chip.key + chip.opt"
              type="neutral-outline"
              :dismissible="true"
              @dismiss="removeChip(chip.key, chip.opt)"
            >{{ chip.label }}</AppTag>
          </div>

          <div class="ds-filterbar">
            <AppFilterMenu
              v-for="fd in FILTER_DEFS"
              :key="fd.key"
              :label="fd.label"
              :options="fd.options"
              v-model="appliedMap[fd.key]"
            />
          </div>
        </div>

        <!-- Content placeholder -->
        <div class="ds-content-placeholder" />
      </div>
    </section>

    <!-- ── States ────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">States</h2>

      <!-- State 1 — Default -->
      <div class="ds-state-block">
        <p class="ds-state-block__name">Default (No filters applied)</p>
        <p class="ds-body">
          Show all records by default. Filter buttons are inactive (neutral border, no badge).
          No applied-filters strip is rendered. Do not pre-select any option.
          "Show all" is the implicit default.
        </p>
        <div class="ds-mock ds-mock--col">
          <div class="ds-mock-row">
            <div class="fp-search-wrap"><AppInput type="search" placeholder="Search" /></div>
            <div class="ds-filterbar">
              <AppFilterMenu v-for="n in 3" :key="n" label="Filter label" :options="FILTER_DEFS[0].options" :model-value="[]" />
            </div>
          </div>
        </div>
      </div>

      <!-- State 2 — Dropdown open -->
      <div class="ds-state-block">
        <p class="ds-state-block__name">State 2 — Dropdown open</p>
        <p class="ds-body">
          Clicking a filter label opens a checkbox list. Multiple selections are allowed.
          Changes are pending until "Apply changes" is pressed — do not filter live on individual
          checkbox ticks. Panel closes on "Apply changes", on Escape, or on click-outside.
          The trigger button stays in active state while the panel is open.
        </p>
        <div class="ds-mock ds-mock--col">
          <div class="ds-mock-row ds-mock-row--top">
            <div class="fp-search-wrap"><AppInput type="search" placeholder="Search" /></div>
            <div class="ds-filterbar" style="align-items: flex-start">
              <AppFilterMenu label="Filter label" :options="FILTER_DEFS[0].options" :model-value="[]" />
              <AppFilterMenu label="Filter label" :options="FILTER_DEFS[0].options" :model-value="['Filter option 3', 'Filter option 6']" force-open />
              <AppFilterMenu label="Filter label" :options="FILTER_DEFS[0].options" :model-value="[]" />
            </div>
          </div>
        </div>
      </div>

      <!-- State 3 — Filters applied -->
      <div class="ds-state-block">
        <p class="ds-state-block__name">State 3 — Filters applied</p>
        <p class="ds-body">
          Each active filter renders as a chip with a dismiss "×" directly in the filter bar.
          Chips appear right of the search, separated by a filter icon. Removing a chip applies
          the change immediately — no "Apply" step needed for individual removal. Remove all option
          also does not require additional approval.
        </p>
        <div class="ds-mock ds-mock--col">
          <div class="ds-mock-row">
            <div class="fp-search-wrap"><AppInput type="search" placeholder="Search" /></div>
            <div v-if="state3chips.length" class="ds-chip-container">
              <button class="ds-clear-icon" @click="resetState3" title="Clear all filters">
                <span class="ds-clear-icon__default"><AppIcon name="filter" :size="14" /></span>
                <span class="ds-clear-icon__hover"><AppIcon name="close" :size="14" /></span>
                <span class="ds-clear-icon__tooltip">Clear all filters</span>
              </button>
              <AppTag v-for="c in state3chips" :key="c" type="neutral-outline" :dismissible="true" @dismiss="removeState3(c)">{{ c }}</AppTag>
            </div>
            <div class="ds-filterbar">
              <AppFilterMenu v-for="n in 3" :key="n" label="Filter label" :options="FILTER_DEFS[0].options" :model-value="[]" />
            </div>
          </div>
          <div v-if="!state3chips.length" style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--color-surface-default)">
            <span style="font-size:12px;color:var(--grey-50);font-style:italic">All chips dismissed.</span>
            <AppButton variant="tertiary" size="sm" @click="resetState3">↺ Reset</AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Overflow handling ──────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Overflow handling</h2>
      <p class="ds-body">
        When chips in the filter bar exceed the available width, wrap to a second line below the search.
        In the secondary strip, always show all chips regardless of count.
      </p>

      <div class="ds-mock ds-mock--col">
        <!-- Row 1: search + filter buttons -->
        <div class="ds-mock-row">
          <div class="fp-search-wrap"><AppInput type="search" placeholder="Search" /></div>
          <div class="ds-filterbar">
            <AppFilterMenu v-for="n in 3" :key="n" label="Filter label" :options="FILTER_DEFS[0].options" :model-value="[]" />
          </div>
        </div>
        <!-- Row 2: chip container -->
        <div v-if="overflowChips.length" class="ds-mock-chip-row">
          <div class="ds-chip-container">
            <button class="ds-clear-icon" @click="resetOverflow" title="Clear all filters">
              <span class="ds-clear-icon__default"><AppIcon name="filter" :size="14" /></span>
              <span class="ds-clear-icon__hover"><AppIcon name="close" :size="14" /></span>
              <span class="ds-clear-icon__tooltip">Clear all filters</span>
            </button>
            <AppTag
              v-for="chip in overflowChips" :key="chip.key"
              type="neutral-outline" :dismissible="true"
              @dismiss="removeOverflow(chip.key)"
            >{{ chip.label }}</AppTag>
          </div>
        </div>
        <div v-if="!overflowChips.length" style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--color-surface-default)">
          <span style="font-size:12px;color:var(--grey-50);font-style:italic">All chips dismissed.</span>
          <AppButton variant="tertiary" size="sm" @click="resetOverflow">↺ Reset chips</AppButton>
        </div>
      </div>
    </section>

    <!-- ── Formatting ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">
        Place the filter toolbar directly above the content it filters — never below or in a sidebar.
        Show the filter icon button first, followed by active chips left-to-right in the order they were applied.
        Limit visible chips to the available width; overflow chips collapse into a "+N more" count badge.
        Keep the "Clear all filters" link at the far right of the toolbar row, visible only when filters are active.
      </p>
      <div class="ds-format-row">
        <div class="ds-format-card">
          <p class="ds-format-label ds-format-label--do">✓ Do — chips inline, clear action far right</p>
          <p class="ds-body">Chips appear immediately after the filter trigger. The clear action is at the end of the row so it doesn't compete with individual chip dismiss.</p>
        </div>
        <div class="ds-format-card">
          <p class="ds-format-label ds-format-label--dont">✗ Don't — place filters below the table or in a sidebar</p>
          <p class="ds-body">Filters separated from the content they control force users to shift attention. Inline placement makes the cause-and-effect relationship immediate.</p>
        </div>
      </div>
    </section>

    <!-- ── Interaction guidelines ─────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction guidelines</h2>
      <ul class="ds-guidelines">
        <li class="ds-guideline">
          <strong>Apply on confirm, remove on tap</strong>
          Selections inside a dropdown are committed only on "Apply changes." Removing a chip (via ×) is immediate with no confirmation step.
        </li>
        <li class="ds-guideline">
          <strong>Clear all</strong>
          The "Clear all filters" button removes every active filter at once and returns the view to its default state. It appears only when at least one filter is active. Accessible on hover on filter icon — hidden but there when you need it.
        </li>
        <li class="ds-guideline">
          <strong>Filter state persistence</strong>
          Preserve filter state across pagination and sorting actions. Navigating away and back should restore the last applied filters unless the user explicitly cleared them.
        </li>
        <li class="ds-guideline">
          <strong>Empty states</strong>
          If the combination of active filters returns zero results, show a contextual empty state with a "Clear filters" shortcut — not a generic empty screen and use copy like: "No results match your filters. Try removing one or adjusting your selection."
        </li>
        <li class="ds-guideline">
          <strong>Accessibility</strong>
          Dropdown panels must be keyboard-navigable (Tab, Space to toggle checkbox, Enter to apply, Escape to close). Chips must be focusable and dismissible via keyboard (focus chip, press Delete or Backspace).
        </li>
      </ul>
    </section>

    <!-- ── Token Reference ────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <div class="ds-table-wrap">
        <table class="ds-token-table">
          <thead>
            <tr><th>Property</th><th>Token</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>Toolbar background</td><td><code>--color-surface-default</code></td><td><span class="swatch" style="background:#fff"></span>#fff</td></tr>
            <tr><td>Toolbar border</td><td><code>--color-border-default</code> / <code>--grey-20</code></td><td><span class="swatch" style="background:var(--grey-20)"></span>#e6e6e7</td></tr>
            <tr><td>Filter icon button bg</td><td><code>--grey-05</code></td><td><span class="swatch" style="background:var(--grey-05)"></span>#f7f7f8</td></tr>
            <tr><td>Filter icon button bg (active)</td><td><code>--blue-azure-10</code></td><td><span class="swatch" style="background:var(--blue-azure-10)"></span>#e8f6ff</td></tr>
            <tr><td>Chip background</td><td><code>--blue-azure-10</code></td><td><span class="swatch" style="background:var(--blue-azure-10)"></span>#e8f6ff</td></tr>
            <tr><td>Chip text</td><td><code>--blue-azure-70</code></td><td><span class="swatch" style="background:var(--blue-azure-70)"></span>#0a74a6</td></tr>
            <tr><td>Chip dismiss icon</td><td><code>--blue-azure-70</code></td><td><span class="swatch" style="background:var(--blue-azure-70)"></span>#0a74a6</td></tr>
            <tr><td>Dropdown panel background</td><td><code>--color-surface-default</code></td><td><span class="swatch" style="background:#fff"></span>#fff</td></tr>
            <tr><td>Dropdown panel shadow</td><td>elevation-sm (4px blur)</td><td>—</td></tr>
            <tr><td>Dropdown item text</td><td><code>--color-text-primary</code> / <code>--grey-100</code></td><td><span class="swatch" style="background:var(--grey-100)"></span>#1f2124</td></tr>
            <tr><td>Dropdown item hover bg</td><td><code>--grey-05</code></td><td><span class="swatch" style="background:var(--grey-05)"></span>#f7f7f8</td></tr>
            <tr><td>Clear all text</td><td><code>--blue-azure-70</code></td><td><span class="swatch" style="background:var(--blue-azure-70)"></span>#0a74a6</td></tr>
            <tr><td>Chip height</td><td>—</td><td>28px</td></tr>
            <tr><td>Chip font size</td><td>—</td><td>13px</td></tr>
            <tr><td>Chip border-radius</td><td>—</td><td>4px</td></tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Formatting cards ──────────────────────────────────────── */
.ds-format-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.ds-format-card {
  background: var(--grey-05);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ds-format-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.ds-format-label--do   { color: var(--green-90); }
.ds-format-label--dont { color: var(--red-80); }

/* ── Token table ────────────────────────────────────────────── */
.swatch {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 6px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.12);
}
.ds-table-wrap { overflow-x: auto; }
.ds-token-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.ds-token-table th,
.ds-token-table td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid var(--grey-10);
  color: var(--grey-90);
}
.ds-token-table th { font-weight: 600; background: var(--grey-05); color: var(--grey-70); }
.ds-token-table code { font-size: 12px; background: var(--grey-10); padding: 2px 5px; border-radius: 3px; }

/* ── Layout ─────────────────────────────────────────────────── */
.ds-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1  { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2  { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-body{ font-size: 14px; color: var(--grey-70); line-height: 1.6; }

/* ── Header two-column layout ───────────────────────────────── */
.ds-header-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

/* ── Callout ────────────────────────────────────────────────── */
.ds-callout {
  background: var(--yellow-10);
  border: 1px solid var(--yellow-60);
  border-left: 3px solid var(--yellow-60);
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 13px;
  color: var(--grey-80);
  line-height: 1.55;
}

/* ── Example frame ──────────────────────────────────────────── */
.ds-frame {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  background: var(--grey-05);
  overflow: visible;
}

/* ── AppTopBar inside frame: round top corners ──────────────── */
.fp-topbar { border-radius: 8px 8px 0 0; }

/* ── Search wrapper: controls width without polluting AppInput attrs ── */
.fp-search-wrap { width: 180px; flex-shrink: 0; }

/* ── Toolbar ────────────────────────────────────────────────── */
.ds-toolbar-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--color-surface-default);
  border-bottom: 1px solid var(--grey-10);
}

/* ── Filter bar ─────────────────────────────────────────────── */
.ds-filterbar {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: auto;
}

/* ── Chip container ─────────────────────────────────────────── */
.ds-chip-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 6px;
  padding: 3px 8px;
}

/* ── Overflow chip row ──────────────────────────────────────── */
.ds-mock-chip-row {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  background: var(--color-surface-default);
}

/* ── Clear-all icon: filter lines → × on hover ──────────────── */
.ds-clear-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: var(--color-surface-default);
  border: 1px solid var(--grey-20);
  border-radius: 4px;
  color: var(--grey-60);
  cursor: pointer;
  transition: color 120ms, border-color 120ms, background 120ms;
}
.ds-clear-icon:hover { color: var(--grey-90); border-color: var(--grey-40); }

.ds-clear-icon__default { display: flex; align-items: center; }
.ds-clear-icon__hover   { display: none;  align-items: center; }
.ds-clear-icon:hover .ds-clear-icon__default { display: none; }
.ds-clear-icon:hover .ds-clear-icon__hover   { display: flex; }

.ds-clear-icon__tooltip {
  display: none;
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-inverse);
  background: var(--grey-90);
  border-radius: 4px;
  padding: 4px 8px;
  pointer-events: none;
  z-index: 10;
}
.ds-clear-icon__tooltip::after {
  content: '';
  position: absolute;
  top: 100%; left: 50%; transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--grey-90);
}
.ds-clear-icon:hover .ds-clear-icon__tooltip { display: block; }

/* ── Content placeholder ────────────────────────────────────── */
.ds-content-placeholder {
  height: 120px;
  background: var(--grey-05);
  border-radius: 0 0 8px 8px;
}

/* ── State blocks ───────────────────────────────────────────── */
.ds-state-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: var(--color-surface-default);
  border: 1px solid var(--grey-20);
  border-radius: 8px;
}
.ds-state-block__name {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-70);
  text-transform: uppercase;
  letter-spacing: .05em;
}

/* ── Mock filter bar (state illustrations) ──────────────────── */
.ds-mock {
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 6px;
  overflow: visible;
}
/* Clip row backgrounds to the mock's rounded corners */
.ds-mock-row:first-child { border-radius: 6px 6px 0 0; }
.ds-mock-row:last-child  { border-radius: 0 0 6px 6px; }
.ds-mock--col { display: flex; flex-direction: column; }
.ds-mock-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--color-surface-default);
  border-bottom: 1px solid var(--grey-10);
}
/* State 2: top-align because of the open static dropdown */
.ds-mock-row--top { align-items: flex-start; }
.ds-mock-row--top .ds-filterbar { align-items: flex-start; }

/* ── Interaction guidelines ─────────────────────────────────── */
.ds-guidelines {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-surface-default);
}
.ds-guideline {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 1.6;
  padding: 16px 24px;
  border-bottom: 1px solid var(--grey-10);
}
.ds-guideline:last-child { border-bottom: none; }
.ds-guideline strong {
  color: var(--grey-90);
  font-weight: 600;
  margin-right: 6px;
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ds-header-cols { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-filterbar { margin-left: 0; }
}
</style>
