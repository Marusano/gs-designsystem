<script setup>
import { ref, computed } from 'vue'
import AppButton from '../components/ui/AppButton.vue'

/* ── Filter definitions ───────────────────────────────────────── */
const FILTER_DEFS = [
  { key: 'status',  label: 'Status',       options: ['Active', 'Inactive', 'Maintenance', 'Unknown'] },
  { key: 'region',  label: 'Region',       options: ['North', 'South', 'East', 'West', 'Central'] },
  { key: 'type',    label: 'Vehicle type', options: ['HGV', 'LGV', 'Van', 'Car', 'Trailer'] },
  { key: 'driver',  label: 'Driver',       options: ['Assigned', 'Unassigned'] },
]

/* ── Interactive demo state ───────────────────────────────────── */
const openDropdown   = ref(null)
const pendingMap     = ref(Object.fromEntries(FILTER_DEFS.map(f => [f.key, []])))
const appliedMap     = ref(Object.fromEntries(FILTER_DEFS.map(f => [f.key, []])))

function openFilter(key) {
  if (openDropdown.value === key) { openDropdown.value = null; return }
  pendingMap.value[key] = [...(appliedMap.value[key] || [])]
  openDropdown.value = key
}

function toggleOption(key, option) {
  const arr = pendingMap.value[key]
  const i   = arr.indexOf(option)
  if (i === -1) arr.push(option)
  else          arr.splice(i, 1)
}

function applyChanges() {
  if (!openDropdown.value) return
  appliedMap.value[openDropdown.value] = [...pendingMap.value[openDropdown.value]]
  openDropdown.value = null
}

function removeChip(filterKey, option) {
  appliedMap.value[filterKey] = appliedMap.value[filterKey].filter(o => o !== option)
}

function clearAll() {
  FILTER_DEFS.forEach(f => { appliedMap.value[f.key] = [] })
}

const allChips   = computed(() =>
  FILTER_DEFS.flatMap(f =>
    (appliedMap.value[f.key] || []).map(opt => ({ filterKey: f.key, label: `${f.label}: ${opt}`, opt }))
  )
)
const hasFilters = computed(() => allChips.value.length > 0)

function filterCount(key) { return (appliedMap.value[key] || []).length }

/* ── Overflow demo ────────────────────────────────────────────── */
const OVERFLOW_INIT = [
  { key: 'status-active',       label: 'Status: Active' },
  { key: 'status-maintenance',  label: 'Status: Maintenance' },
  { key: 'region-north',        label: 'Region: North' },
  { key: 'region-east',         label: 'Region: East' },
  { key: 'type-hgv',            label: 'Type: HGV' },
  { key: 'type-van',            label: 'Type: Van' },
  { key: 'driver-assigned',     label: 'Driver: Assigned' },
]
const overflowChips = ref([...OVERFLOW_INIT])
function removeOverflow(key) { overflowChips.value = overflowChips.value.filter(c => c.key !== key) }
function resetOverflow()     { overflowChips.value = [...OVERFLOW_INIT] }

/* ── SVG icons ────────────────────────────────────────────────── */
const IconFilter  = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 3.5h11M4 7h6M6 10.5h2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconSearch  = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5.75" cy="5.75" r="3.75" stroke="currentColor" stroke-width="1.25"/><path d="M8.75 8.75L12 12" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconClose   = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`
const IconChevron = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconCheck   = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l3 3 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ───────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Filters</h1>
      <p class="ds-lead">3 layers · dropdown selection · chip dismissal · overflow wrapping</p>
      <p class="ds-body">
        The filter component provides contextual narrowing of list or table views.
        It consists of three layers: a persistent <strong>filter bar</strong> with trigger buttons,
        an optional <strong>dropdown panel</strong> with selectable checkboxes, and a
        <strong>dismissible chip strip</strong> that shows applied filters inline.
      </p>
      <div class="ds-callout">
        <strong>Design rationale —</strong> The two-step commit (Apply vs immediate remove) is intentional:
        it prevents accidental filtering mid-selection while keeping single-chip removal frictionless.
        "Clear all" only appears when filters are active, reducing noise in the default state.
      </div>
    </section>

    <!-- ── Anatomy ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Anatomy</h2>
      <div class="ds-anatomy-grid">
        <div class="ds-anatomy-card">
          <div class="ds-anatomy-card__badge">Layer 1</div>
          <strong class="ds-anatomy-card__title">Filter bar</strong>
          <p class="ds-body">Persistent toolbar row. Contains a search input on the left and one trigger button per filterable dimension. Always visible — even when no filters are active.</p>
        </div>
        <div class="ds-anatomy-card">
          <div class="ds-anatomy-card__badge">Layer 2</div>
          <strong class="ds-anatomy-card__title">Dropdown panel</strong>
          <p class="ds-body">Appears below its trigger button. Lists options as checkboxes. Changes are <em>pending</em> until "Apply changes" is confirmed. Closes on Apply, Escape, or click-outside.</p>
        </div>
        <div class="ds-anatomy-card">
          <div class="ds-anatomy-card__badge">Layer 3</div>
          <strong class="ds-anatomy-card__title">Applied-filter chips</strong>
          <p class="ds-body">Each selected value renders as an inline chip with a × dismiss button. Removal is <em>immediate</em> — no Apply step needed. "Clear all" appears only when at least one filter is active.</p>
        </div>
      </div>
    </section>

    <!-- ── States ───────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">States</h2>
      <p class="ds-body">Try the interactive demo below — it cycles through all three states as you interact.</p>

      <div class="ds-card">
        <!-- Demo context label -->
        <p class="ds-card__label">Live demo · Fleet asset list</p>

        <!-- Simulated table toolbar -->
        <div class="ds-demo-toolbar">
          <!-- Search -->
          <div class="ds-search">
            <span class="ds-search__icon" v-html="IconSearch" />
            <input class="ds-search__input" type="text" placeholder="Search assets…" readonly />
          </div>

          <!-- Filter bar -->
          <div class="ds-filterbar">
            <div
              v-for="fd in FILTER_DEFS"
              :key="fd.key"
              class="ds-filter-btn-wrap"
            >
              <AppButton
                variant="tertiary"
                size="sm"
                :class="{ 'ds-filter-btn--active': filterCount(fd.key) > 0 || openDropdown === fd.key }"
                @click="openFilter(fd.key)"
              >
                {{ fd.label }}
                <span v-if="filterCount(fd.key)" class="ds-filter-btn__badge">{{ filterCount(fd.key) }}</span>
                <template #icon-right><span v-html="IconChevron" /></template>
              </AppButton>

              <!-- Dropdown panel -->
              <div v-if="openDropdown === fd.key" class="ds-dropdown">
                <ul class="ds-dropdown__list">
                  <li
                    v-for="opt in fd.options"
                    :key="opt"
                    class="ds-dropdown__item"
                    @click="toggleOption(fd.key, opt)"
                  >
                    <span
                      class="ds-checkbox"
                      :class="{ 'ds-checkbox--checked': pendingMap[fd.key].includes(opt) }"
                    >
                      <span v-if="pendingMap[fd.key].includes(opt)" v-html="IconCheck" />
                    </span>
                    {{ opt }}
                  </li>
                </ul>
                <div class="ds-dropdown__footer">
                  <AppButton variant="primary" size="sm" style="width:100%" @click="applyChanges">Apply changes</AppButton>
                </div>
              </div>
            </div>

            <!-- Clear all — only when filters active -->
            <AppButton v-if="hasFilters" variant="quiet" size="sm" @click="clearAll">
              <template #icon-left><span v-html="IconFilter" /></template>
              Clear all
            </AppButton>
          </div>
        </div>

        <!-- Chip strip — only when filters active -->
        <div v-if="hasFilters" class="ds-chip-strip">
          <span class="ds-chip-strip__icon" v-html="IconFilter" />
          <div class="ds-chip-strip__chips">
            <button
              v-for="chip in allChips"
              :key="chip.filterKey + chip.opt"
              class="ds-chip"
              @click="removeChip(chip.filterKey, chip.opt)"
            >
              {{ chip.label }}
              <span class="ds-chip__close" v-html="IconClose" />
            </button>
          </div>
        </div>

        <!-- Simulated table -->
        <div class="ds-demo-table">
          <div class="ds-demo-table__head">
            <span>Asset</span><span>Status</span><span>Region</span><span>Type</span><span>Driver</span>
          </div>
          <div class="ds-demo-table__row" v-for="row in 4" :key="row">
            <span class="ds-demo-table__name">{{ ['Volvo FH16 · PL22 KXB','DAF XF · MN71 TRK','Merc Actros · LD70 ACT','Scania R · BX19 SCN'][row-1] }}</span>
            <span><span class="ds-tag ds-tag--success">Active</span></span>
            <span class="ds-demo-table__muted">North</span>
            <span class="ds-demo-table__muted">HGV</span>
            <span class="ds-demo-table__muted">J. Smith</span>
          </div>
        </div>

        <!-- State indicator -->
        <p class="ds-demo-state">
          <strong>Current state:</strong>
          <span v-if="!hasFilters && !openDropdown" class="ds-demo-state__pill ds-demo-state__pill--default">Default — no filters active</span>
          <span v-else-if="openDropdown"            class="ds-demo-state__pill ds-demo-state__pill--open">Dropdown open — changes pending</span>
          <span v-else                              class="ds-demo-state__pill ds-demo-state__pill--applied">Filters applied — {{ allChips.length }} chip{{ allChips.length !== 1 ? 's' : '' }} active</span>
        </p>
      </div>
    </section>

    <!-- ── State breakdown ──────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">State breakdown</h2>
      <div class="ds-table-wrap">
        <table class="ds-state-table">
          <thead>
            <tr>
              <th class="ds-state-table__label">State</th>
              <th>Filter bar</th>
              <th>Chip strip</th>
              <th>Trigger</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ds-state-table__label">
                <strong>Default</strong>
                <span>No filters selected. All records shown.</span>
              </td>
              <td>Neutral border, no badge</td>
              <td>Hidden</td>
              <td>Click a filter label</td>
            </tr>
            <tr>
              <td class="ds-state-table__label">
                <strong>Dropdown open</strong>
                <span>User is selecting options. Changes are uncommitted.</span>
              </td>
              <td>Trigger button highlighted (active outline)</td>
              <td>Hidden until Apply</td>
              <td>"Apply changes" · Escape · click-outside</td>
            </tr>
            <tr>
              <td class="ds-state-table__label">
                <strong>Filters applied</strong>
                <span>One or more filters committed.</span>
              </td>
              <td>Active button shows count badge</td>
              <td>Visible — one chip per value</td>
              <td>× on chip · "Clear all"</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Overflow ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Overflow handling</h2>
      <p class="ds-body">
        When chips exceed the available strip width they wrap to a second line.
        All chips remain fully visible — no truncation, no "show more" collapse.
        Dismiss any chip with ×, or reset to see the full set.
      </p>
      <div class="ds-card">
        <p class="ds-card__label">Overflow demo</p>
        <div class="ds-chip-strip ds-chip-strip--overflow" v-if="overflowChips.length">
          <span class="ds-chip-strip__icon" v-html="IconFilter" />
          <div class="ds-chip-strip__chips">
            <button
              v-for="chip in overflowChips"
              :key="chip.key"
              class="ds-chip"
              @click="removeOverflow(chip.key)"
            >
              {{ chip.label }}
              <span class="ds-chip__close" v-html="IconClose" />
            </button>
          </div>
        </div>
        <p v-else class="ds-body" style="color:var(--grey-50);font-style:italic">All chips dismissed.</p>
        <div style="padding: 0 20px 16px">
          <AppButton variant="tertiary" size="sm" @click="resetOverflow">↺ Reset chips</AppButton>
        </div>
      </div>
    </section>

    <!-- ── Interaction guidelines ───────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction guidelines</h2>
      <div class="ds-guidelines-grid">

        <div class="ds-guideline-card">
          <p class="ds-guideline-card__title">Apply on confirm, remove on tap</p>
          <p class="ds-body">
            Selecting options inside the dropdown does <em>not</em> update the view immediately —
            changes are committed only when the user clicks "Apply changes". Removing a chip,
            however, takes effect at once with no confirmation step.
          </p>
        </div>

        <div class="ds-guideline-card">
          <p class="ds-guideline-card__title">Clear all</p>
          <p class="ds-body">
            The "Clear all" control appears <em>only</em> when at least one filter is active.
            It sits at the trailing end of the filter bar, visually separated from the trigger buttons.
            Activating it removes every chip immediately — equivalent to clicking × on each one.
          </p>
        </div>

        <div class="ds-guideline-card">
          <p class="ds-guideline-card__title">Filter state persistence</p>
          <p class="ds-body">
            Applied filters persist while the user navigates within the same view context
            (e.g. switching between list and map mode). They reset when the user navigates
            to a new top-level route or explicitly clears them.
          </p>
        </div>

        <div class="ds-guideline-card">
          <p class="ds-guideline-card__title">Empty state with shortcut</p>
          <p class="ds-body">
            If the filtered result set is empty, show the standard empty-state illustration
            with the message <em>"No results match your filters"</em> and a
            <strong>Clear filters</strong> link inline — do not make the user hunt for
            the "Clear all" button in the bar.
          </p>
        </div>

        <div class="ds-guideline-card">
          <p class="ds-guideline-card__title">One open panel at a time</p>
          <p class="ds-body">
            Only one dropdown may be open at a time. Clicking a second filter button while
            another is open should close the first (without applying uncommitted changes)
            and open the new one.
          </p>
        </div>

        <div class="ds-guideline-card">
          <p class="ds-guideline-card__title">Accessibility</p>
          <p class="ds-body">
            Filter trigger buttons carry <code>aria-expanded</code> and <code>aria-haspopup="listbox"</code>.
            The dropdown panel is keyboard-navigable (arrow keys cycle options, Space toggles,
            Enter applies). Chips expose <code>aria-label="Remove [filter]: [value]"</code>.
            "Clear all" is a <code>&lt;button&gt;</code> — not a link.
          </p>
        </div>

      </div>
    </section>

    <!-- ── Do / Don't ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Do / Don't</h2>
      <div class="ds-do-dont-grid">

        <div class="ds-do-card ds-do-card--do">
          <p class="ds-do-card__label ds-do-card__label--do">✓ Do</p>
          <ul class="ds-do-card__list">
            <li>Use the filter bar only for dimensions that meaningfully narrow the list (status, region, type, assignment).</li>
            <li>Show a count badge on the trigger button once a filter is applied so users know the view is constrained.</li>
            <li>Preserve uncommitted pending selections if the user reopens the same dropdown before applying.</li>
            <li>Show "Clear all" inline at the trailing edge of the filter bar — not in a modal or tooltip.</li>
          </ul>
        </div>

        <div class="ds-do-card ds-do-card--dont">
          <p class="ds-do-card__label ds-do-card__label--dont">✗ Don't</p>
          <ul class="ds-do-card__list">
            <li>Don't apply filters automatically as checkboxes are ticked — this causes disorienting mid-selection flicker.</li>
            <li>Don't truncate chips with "…+3 more" — wrap to a second line instead so all active filters remain visible.</li>
            <li>Don't show "Clear all" when no filters are active — it adds noise and confusion.</li>
            <li>Don't place filter dropdowns over the content area; anchor them below the filter bar row.</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- ── Token reference ──────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token reference</h2>
      <div class="ds-token-grid">

        <div class="ds-token-card">
          <p class="ds-token-card__title">Filter button — default</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Token / value</th></tr></thead>
            <tbody>
              <tr><td>Height</td>         <td>32px</td></tr>
              <tr><td>Padding</td>        <td>0 10px</td></tr>
              <tr><td>Border</td>         <td>1px solid <span class="swatch" style="background:#c0c2c6"></span>#c0c2c6</td></tr>
              <tr><td>Background</td>     <td><span class="swatch" style="background:#ffffff;border:1px solid #d8d8da"></span>#ffffff</td></tr>
              <tr><td>Text</td>           <td><span class="swatch" style="background:#5d6065"></span>#5d6065</td></tr>
              <tr><td>Border radius</td>  <td>6px</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Filter button — active / open</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Token / value</th></tr></thead>
            <tbody>
              <tr><td>Border</td>         <td>1.5px solid <span class="swatch" style="background:#138bc3"></span>#138bc3</td></tr>
              <tr><td>Background</td>     <td><span class="swatch" style="background:#e8f5ff"></span>#e8f5ff</td></tr>
              <tr><td>Text</td>           <td><span class="swatch" style="background:#0369a1"></span>#0369a1</td></tr>
              <tr><td>Badge bg</td>       <td><span class="swatch" style="background:#138bc3"></span>#138bc3</td></tr>
              <tr><td>Badge text</td>     <td><span class="swatch" style="background:#ffffff;border:1px solid #d8d8da"></span>#ffffff</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Dropdown panel</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Token / value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>     <td><span class="swatch" style="background:#ffffff;border:1px solid #d8d8da"></span>#ffffff</td></tr>
              <tr><td>Border</td>         <td>1px solid <span class="swatch" style="background:#c0c2c6"></span>#c0c2c6</td></tr>
              <tr><td>Shadow</td>         <td>0 4px 12px rgba(0,0,0,.10)</td></tr>
              <tr><td>Min width</td>      <td>180px</td></tr>
              <tr><td>Item height</td>    <td>36px</td></tr>
              <tr><td>Item hover bg</td>  <td><span class="swatch" style="background:#f7f7f8"></span>#f7f7f8</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Applied-filter chip</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Token / value</th></tr></thead>
            <tbody>
              <tr><td>Height</td>         <td>24px</td></tr>
              <tr><td>Background</td>     <td><span class="swatch" style="background:#e8f5ff"></span>#e8f5ff</td></tr>
              <tr><td>Border</td>         <td>1px solid <span class="swatch" style="background:#61bde9"></span>#61bde9</td></tr>
              <tr><td>Text</td>           <td><span class="swatch" style="background:#013b57"></span>#013b57</td></tr>
              <tr><td>× icon</td>         <td><span class="swatch" style="background:#39ade3"></span>#39ade3</td></tr>
              <tr><td>Hover bg</td>       <td><span class="swatch" style="background:#b3e1f7"></span>#b3e1f7</td></tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────────── */
.ds-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1  { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2  { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead{ font-size: 16px; color: var(--grey-70); margin-top: -8px; }
.ds-body{ font-size: 14px; color: var(--grey-70); line-height: 1.6; }

/* ── Callout ────────────────────────────────────────────────────── */
.ds-callout {
  background: #fffbeb;
  border: 1px solid #f9c74f;
  border-left: 3px solid #f9c74f;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 13px;
  color: var(--grey-80);
  line-height: 1.55;
}

/* ── Anatomy ────────────────────────────────────────────────────── */
.ds-anatomy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.ds-anatomy-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ds-anatomy-card__badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--blue-azure-70, #0369a1);
  background: var(--blue-azure-10, #e8f5ff);
  border-radius: 4px;
  padding: 2px 7px;
  width: fit-content;
}
.ds-anatomy-card__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--grey-90);
  display: block;
}

/* ── Card ───────────────────────────────────────────────────────── */
.ds-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}
.ds-card__label {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-60);
  text-transform: uppercase;
  letter-spacing: .07em;
  padding: 10px 20px;
  background: var(--grey-05);
  border-bottom: 1px solid var(--grey-20);
}

/* ── Demo toolbar ───────────────────────────────────────────────── */
.ds-demo-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--grey-10);
  flex-wrap: wrap;
}

/* ── Search ─────────────────────────────────────────────────────── */
.ds-search {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--grey-20);
  border-radius: 6px;
  background: #fff;
  flex-shrink: 0;
}
.ds-search__icon { display: flex; align-items: center; color: var(--grey-50); }
.ds-search__input {
  border: none;
  outline: none;
  font-size: 13px;
  color: var(--grey-70);
  font-family: 'Roboto', sans-serif;
  background: transparent;
  width: 160px;
}

/* ── Filter bar ─────────────────────────────────────────────────── */
.ds-filterbar {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.ds-filter-btn-wrap { position: relative; }

/* Active/open state override on top of AppButton tertiary */
.ds-filter-btn--active.btn--tertiary {
  box-shadow: inset 0 0 0 1.5px #138bc3;
  background: #e8f5ff;
  color: #0369a1;
  font-weight: 500;
}
.ds-filter-btn--active.btn--tertiary:hover {
  background: #d4edf9;
}

.ds-filter-btn__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #138bc3;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 8px;
}

/* ── Dropdown ───────────────────────────────────────────────────── */
.ds-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 50;
  min-width: 180px;
  background: #fff;
  border: 1px solid var(--grey-30, #c0c2c6);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,.10);
  overflow: hidden;
}
.ds-dropdown__list {
  list-style: none;
  padding: 4px 0;
  margin: 0;
}
.ds-dropdown__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  font-size: 13px;
  color: var(--grey-80);
  cursor: pointer;
  transition: background 80ms;
  user-select: none;
}
.ds-dropdown__item:hover { background: var(--grey-05); }

.ds-checkbox {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--grey-30, #c0c2c6);
  border-radius: 3px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 100ms, background 100ms;
}
.ds-checkbox--checked {
  background: #138bc3;
  border-color: #138bc3;
  color: #fff;
}

.ds-dropdown__footer {
  border-top: 1px solid var(--grey-10);
  padding: 8px 12px;
}

/* ── Chip strip ─────────────────────────────────────────────────── */
.ds-chip-strip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--grey-10);
}
.ds-chip-strip__icon {
  display: flex;
  align-items: center;
  color: var(--grey-50);
  flex-shrink: 0;
  margin-top: 4px;
}
.ds-chip-strip__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ds-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #013b57;
  background: #e8f5ff;
  border: 1px solid #61bde9;
  border-radius: 4px;
  cursor: pointer;
  transition: background 100ms, border-color 100ms;
  white-space: nowrap;
}
.ds-chip:hover { background: #b3e1f7; border-color: #39ade3; }
.ds-chip__close { display: flex; align-items: center; color: #39ade3; }

/* ── Demo table ─────────────────────────────────────────────────── */
.ds-demo-table { padding: 0 20px 4px; }
.ds-demo-table__head {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  padding: 10px 0;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--grey-50);
  border-bottom: 1px solid var(--grey-10);
}
.ds-demo-table__row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--grey-10);
  font-size: 13px;
  align-items: center;
}
.ds-demo-table__row:last-child { border-bottom: none; }
.ds-demo-table__name { font-weight: 500; color: var(--grey-90); }
.ds-demo-table__muted { color: var(--grey-60); }

.ds-tag {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 7px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}
.ds-tag--success { background: #c5f2cb; color: #12591c; }

/* ── State indicator ────────────────────────────────────────────── */
.ds-demo-state {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--grey-60);
  border-top: 1px solid var(--grey-10);
  background: var(--grey-05);
}
.ds-demo-state__pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}
.ds-demo-state__pill--default  { background: #f1f1f2; color: #5d6065; }
.ds-demo-state__pill--open     { background: #fffbeb; color: #92400e; border: 1px solid #f9c74f; }
.ds-demo-state__pill--applied  { background: #e8f5ff; color: #0369a1; border: 1px solid #61bde9; }

/* ── State table ────────────────────────────────────────────────── */
.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-state-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-state-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 12px 20px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-state-table tbody td { padding: 14px 20px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-70); }
.ds-state-table tbody tr:last-child td { border-bottom: none; }
.ds-state-table__label { min-width: 200px; }
.ds-state-table__label strong { display: block; font-size: 13px; font-weight: 600; color: var(--grey-90); margin-bottom: 3px; }
.ds-state-table__label span   { display: block; font-size: 12px; color: var(--grey-60); line-height: 1.4; }

/* ── Overflow demo ──────────────────────────────────────────────── */
.ds-chip-strip--overflow { padding: 16px 20px; border-bottom: none; }

/* ── Guidelines ─────────────────────────────────────────────────── */
.ds-guidelines-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
.ds-guideline-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ds-guideline-card__title { font-size: 14px; font-weight: 600; color: var(--grey-90); }

/* ── Do / Don't ─────────────────────────────────────────────────── */
.ds-do-dont-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-do-card {
  border-radius: 8px;
  border: 1px solid var(--grey-20);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ds-do-card--do   { background: #f0fdf4; border-color: #86efac; }
.ds-do-card--dont { background: #fff5f5; border-color: #fca5a5; }
.ds-do-card__label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.ds-do-card__label--do   { color: #15803d; }
.ds-do-card__label--dont { color: #b91c1c; }
.ds-do-card__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ds-do-card__list li {
  font-size: 13px;
  color: var(--grey-80);
  line-height: 1.5;
  padding-left: 16px;
  position: relative;
}
.ds-do-card--do   .ds-do-card__list li::before { content: '✓'; position: absolute; left: 0; color: #15803d; font-weight: 700; }
.ds-do-card--dont .ds-do-card__list li::before { content: '✗'; position: absolute; left: 0; color: #b91c1c; font-weight: 700; }

/* ── Token reference ────────────────────────────────────────────── */
.ds-token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.ds-token-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.ds-token-card__title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); padding: 10px 16px; background: var(--grey-05); border-bottom: 1px solid var(--grey-20); }
.ds-token-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.ds-token-table th { text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--grey-60); font-weight: 600; border-bottom: 1px solid var(--grey-10); }
.ds-token-table td { padding: 7px 12px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-80); }
.ds-token-table tr:last-child td { border-bottom: none; }
.swatch { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: middle; margin-right: 6px; flex-shrink: 0; }

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .ds-anatomy-grid { grid-template-columns: 1fr 1fr; }
  .ds-do-dont-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-anatomy-grid  { grid-template-columns: 1fr; }
  .ds-demo-table__head,
  .ds-demo-table__row { grid-template-columns: 1fr 1fr; }
  .ds-demo-table__head span:nth-child(n+3),
  .ds-demo-table__row  span:nth-child(n+3) { display: none; }
  .ds-token-grid { grid-template-columns: 1fr; }
  .ds-guidelines-grid { grid-template-columns: 1fr; }
}
</style>
