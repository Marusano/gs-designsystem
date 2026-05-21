<script setup>
import { ref, computed } from 'vue'
import AppButton from '../components/ui/AppButton.vue'
import AppTag    from '../components/ui/AppTag.vue'

/* ── Filter definitions (match Figma: "Filter label" × 3, "Filter option 1–7") ── */
const FILTER_DEFS = [
  { key: 'f1', label: 'Filter label', options: ['Filter option 1','Filter option 2','Filter option 3','Filter option 4','Filter option 5','Filter option 6','Filter option 7'] },
  { key: 'f2', label: 'Filter label', options: ['Filter option 1','Filter option 2','Filter option 3','Filter option 4','Filter option 5','Filter option 6','Filter option 7'] },
  { key: 'f3', label: 'Filter label', options: ['Filter option 1','Filter option 2','Filter option 3','Filter option 4','Filter option 5','Filter option 6','Filter option 7'] },
]

/* ── Interactive demo state ─────────────────────────────────── */
const openDropdown = ref(null)
const pendingMap   = ref(Object.fromEntries(FILTER_DEFS.map(f => [f.key, []])))
const appliedMap   = ref(Object.fromEntries(FILTER_DEFS.map(f => [f.key, []])))

function openFilter(key) {
  if (openDropdown.value === key) { openDropdown.value = null; return }
  pendingMap.value[key] = [...(appliedMap.value[key] || [])]
  openDropdown.value = key
}
function toggleOption(key, opt) {
  const arr = pendingMap.value[key]
  const i   = arr.indexOf(opt)
  if (i === -1) arr.push(opt)
  else          arr.splice(i, 1)
}
function applyChanges() {
  if (!openDropdown.value) return
  appliedMap.value[openDropdown.value] = [...pendingMap.value[openDropdown.value]]
  openDropdown.value = null
}
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
function filterCount(key) { return (appliedMap.value[key] || []).length }

/* ── State 3 static chips (match Figma: "Truck" + "Driving") ── */
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

/* ── SVG icons ──────────────────────────────────────────────── */
const IconFilter  = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 3.5h11M4 7h6M6 10.5h2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconX       = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
const IconSearch  = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5.75" cy="5.75" r="3.75" stroke="currentColor" stroke-width="1.25"/><path d="M8.75 8.75L12 12" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconChevron = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconCheck   = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l3 3 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconHelp    = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.25"/><path d="M6.5 6.5a1.5 1.5 0 0 1 3 .5c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><circle cx="8" cy="11.5" r=".75" fill="currentColor"/></svg>`
const IconUser    = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.25"/><path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconChevronRight = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3l3 3-3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconChevronDown  = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────────────── -->
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

    <!-- ── Example ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Example</h2>

      <div class="ds-frame">
        <!-- Top bar -->
        <div class="ds-topbar">
          <div class="ds-breadcrumb">
            <span>Settings</span>
            <span class="ds-breadcrumb__sep" v-html="IconChevronRight" />
            <span>User Management</span>
            <span class="ds-breadcrumb__sep" v-html="IconChevronRight" />
            <span class="ds-breadcrumb__active">Aaro Saarinen</span>
          </div>
          <div class="ds-topbar__right">
            <button class="ds-topbar__icon-btn" v-html="IconHelp" />
            <button class="ds-topbar__user">
              Aaro Saarinen
              <span v-html="IconChevronDown" />
            </button>
          </div>
        </div>

        <!-- Page header -->
        <div class="ds-page-header">
          <div>
            <h2 class="ds-page-header__title">Hello, Anna</h2>
            <p class="ds-page-header__sub">Welcome back to Fleet Manager</p>
          </div>
          <div class="ds-page-header__actions">
            <AppButton variant="secondary" size="sm">
              <template #icon-left><span class="ds-btn-icon-placeholder" /></template>
              Button label here
            </AppButton>
            <AppButton variant="primary" size="sm">
              Button
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
          </div>
        </div>

        <!-- Filter toolbar: [search] [chip container if active] [filter buttons right] -->
        <div class="ds-toolbar-row">
          <div class="ds-search">
            <span class="ds-search__icon" v-html="IconSearch" />
            <input class="ds-search__input" type="text" placeholder="Search" readonly />
          </div>

          <!-- Chip container: inline between search and filter buttons, grey bg wraps only chips -->
          <div v-if="hasFilters" class="ds-chip-container">
            <button class="ds-clear-icon" @click="clearAll" title="Clear all filters">
              <span class="ds-clear-icon__default" v-html="IconFilter" />
              <span class="ds-clear-icon__hover" v-html="IconX" />
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
            <div v-for="fd in FILTER_DEFS" :key="fd.key" class="ds-filter-btn-wrap">
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

              <div v-if="openDropdown === fd.key" class="ds-dropdown">
                <ul class="ds-dropdown__list">
                  <li
                    v-for="opt in fd.options"
                    :key="opt"
                    class="ds-dropdown__item"
                    @click="toggleOption(fd.key, opt)"
                  >
                    <span class="ds-checkbox" :class="{ 'ds-checkbox--checked': pendingMap[fd.key].includes(opt) }">
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
          </div>
        </div>

        <!-- Content placeholder -->
        <div class="ds-content-placeholder" />
      </div>
    </section>

    <!-- ── States ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">States</h2>

      <!-- State 1 -->
      <div class="ds-state-block">
        <p class="ds-state-block__name">Default (No filters applied)</p>
        <p class="ds-body">
          Show all records by default. Filter buttons are inactive (neutral border, no badge).
          No applied-filters strip is rendered. Do not pre-select any option.
          "Show all" is the implicit default.
        </p>
        <div class="ds-mock ds-mock--col">
          <div class="ds-mock-row">
            <div class="ds-search">
              <span class="ds-search__icon" v-html="IconSearch" />
              <input class="ds-search__input" type="text" placeholder="Search" readonly />
            </div>
            <div class="ds-filterbar">
              <AppButton variant="tertiary" size="sm" v-for="n in 3" :key="n">
                Filter label
                <template #icon-right><span v-html="IconChevron" /></template>
              </AppButton>
            </div>
          </div>
        </div>
      </div>

      <!-- State 2 -->
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
            <div class="ds-search">
              <span class="ds-search__icon" v-html="IconSearch" />
              <input class="ds-search__input" type="text" placeholder="Search" readonly />
            </div>
            <div class="ds-filterbar" style="align-items: flex-start">
              <AppButton variant="tertiary" size="sm" style="align-self: flex-start">
                Filter label
                <template #icon-right><span v-html="IconChevron" /></template>
              </AppButton>
              <!-- Second button shown as active/open -->
              <div class="ds-filter-btn-wrap">
                <AppButton variant="tertiary" size="sm" class="ds-filter-btn--active">
                  Filter label
                  <template #icon-right><span v-html="IconChevron" /></template>
                </AppButton>
                <div class="ds-dropdown ds-dropdown--static">
                  <ul class="ds-dropdown__list">
                    <li class="ds-dropdown__item"><span class="ds-checkbox" />Filter option 1</li>
                    <li class="ds-dropdown__item"><span class="ds-checkbox" />Filter option 2</li>
                    <li class="ds-dropdown__item"><span class="ds-checkbox ds-checkbox--checked"><span v-html="IconCheck" /></span>Filter option 3</li>
                    <li class="ds-dropdown__item"><span class="ds-checkbox" />Filter option 4</li>
                    <li class="ds-dropdown__item"><span class="ds-checkbox" />Filter option 5</li>
                    <li class="ds-dropdown__item"><span class="ds-checkbox ds-checkbox--checked"><span v-html="IconCheck" /></span>Filter option 6</li>
                    <li class="ds-dropdown__item"><span class="ds-checkbox" />Filter option 7</li>
                  </ul>
                  <div class="ds-dropdown__footer">
                    <AppButton variant="primary" size="sm" style="width:100%">Apply changes</AppButton>
                  </div>
                </div>
              </div>
              <AppButton variant="tertiary" size="sm" style="align-self: flex-start">
                Filter label
                <template #icon-right><span v-html="IconChevron" /></template>
              </AppButton>
            </div><!-- end .ds-filterbar -->
          </div><!-- end .ds-mock-row -->
        </div><!-- end .ds-mock -->
      </div>

      <!-- State 3 -->
      <div class="ds-state-block">
        <p class="ds-state-block__name">State 3 — Filters applied</p>
        <p class="ds-body">
          Each active filter renders as a chip with a dismiss "×" directly in the filter bar.
          Chips appear right of the search, separated by a filter icon. Removing a chip applies
          the change immediately — no "Apply" step needed for individual removal. Remove all option
          also does not require additional approval.
        </p>
        <div class="ds-mock ds-mock--col">
          <!-- Single row: [search] [chip container inline] [filter buttons right] -->
          <div class="ds-mock-row">
            <div class="ds-search">
              <span class="ds-search__icon" v-html="IconSearch" />
              <input class="ds-search__input" type="text" placeholder="Search" readonly />
            </div>
            <!-- Chip container inline between search and filter buttons -->
            <div v-if="state3chips.length" class="ds-chip-container">
              <button class="ds-clear-icon" @click="resetState3" title="Clear all filters">
                <span class="ds-clear-icon__default" v-html="IconFilter" />
                <span class="ds-clear-icon__hover" v-html="IconX" />
                <span class="ds-clear-icon__tooltip">Clear all filters</span>
              </button>
              <AppTag v-for="c in state3chips" :key="c" type="neutral-outline" :dismissible="true" @dismiss="removeState3(c)">{{ c }}</AppTag>
            </div>
            <div class="ds-filterbar">
              <AppButton variant="tertiary" size="sm" v-for="n in 3" :key="n">
                Filter label
                <template #icon-right><span v-html="IconChevron" /></template>
              </AppButton>
            </div>
          </div>
          <div v-if="!state3chips.length" style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:#fff">
            <span style="font-size:12px;color:var(--grey-50);font-style:italic">All chips dismissed.</span>
            <AppButton variant="tertiary" size="sm" @click="resetState3">↺ Reset</AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Overflow handling ────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Overflow handling</h2>
      <p class="ds-body">
        When chips in the filter bar exceed the available width, wrap to a second line below the search.
        In the secondary strip, always show all chips regardless of count.
      </p>

      <div class="ds-mock ds-mock--col">
        <!-- Row 1: search + filter buttons -->
        <div class="ds-mock-row">
          <div class="ds-search">
            <span class="ds-search__icon" v-html="IconSearch" />
            <input class="ds-search__input" type="text" placeholder="Search" readonly />
          </div>
          <div class="ds-filterbar">
            <AppButton variant="tertiary" size="sm" v-for="n in 3" :key="n">
              Filter label
              <template #icon-right><span v-html="IconChevron" /></template>
            </AppButton>
          </div>
        </div>
        <!-- Row 2: chip container — bg wraps only the chips, not the full row -->
        <div v-if="overflowChips.length" class="ds-mock-chip-row">
          <div class="ds-chip-container">
            <button class="ds-clear-icon" @click="resetOverflow" title="Clear all filters">
              <span class="ds-clear-icon__default" v-html="IconFilter" />
              <span class="ds-clear-icon__hover" v-html="IconX" />
              <span class="ds-clear-icon__tooltip">Clear all filters</span>
            </button>
            <AppTag
              v-for="chip in overflowChips" :key="chip.key"
              type="neutral-outline" :dismissible="true"
              @dismiss="removeOverflow(chip.key)"
            >{{ chip.label }}</AppTag>
          </div>
        </div>
        <div v-if="!overflowChips.length" style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:#fff">
          <span style="font-size:12px;color:var(--grey-50);font-style:italic">All chips dismissed.</span>
          <AppButton variant="tertiary" size="sm" @click="resetOverflow">↺ Reset chips</AppButton>
        </div>
      </div>
    </section>

    <!-- ── Interaction guidelines ───────────────────────────────── -->
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

  </main>
</template>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────────── */
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

/* ── Header two-column layout ───────────────────────────────────── */
.ds-header-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

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

/* ── Example frame ──────────────────────────────────────────────── */
.ds-frame {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  background: var(--grey-05);
  overflow: visible;
}

/* ── Top bar ────────────────────────────────────────────────────── */
.ds-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 48px;
  background: #fff;
  border-bottom: 1px solid var(--grey-10);
  border-radius: 8px 8px 0 0;
  gap: 12px;
}
.ds-breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--grey-60);
}
.ds-breadcrumb__sep { display: flex; align-items: center; color: var(--grey-30); }
.ds-breadcrumb__active { color: var(--grey-90); font-weight: 500; }
.ds-topbar__right { display: flex; align-items: center; gap: 8px; }
.ds-topbar__icon-btn {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 6px;
  background: none; border: 1px solid var(--grey-20);
  color: var(--grey-60); cursor: pointer;
}
.ds-topbar__user {
  display: flex; align-items: center; gap: 4px;
  height: 32px; padding: 0 10px;
  background: none; border: 1px solid var(--grey-20);
  border-radius: 6px; font-size: 13px; color: var(--grey-80);
  font-family: 'Roboto', sans-serif; cursor: pointer;
}

/* ── Page header ────────────────────────────────────────────────── */
.ds-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid var(--grey-10);
  gap: 12px;
}
.ds-page-header__title { font-size: 22px; font-weight: 700; color: var(--grey-100); }
.ds-page-header__sub   { font-size: 13px; color: var(--grey-60); margin-top: 2px; }
.ds-page-header__actions { display: flex; align-items: center; gap: 8px; }
.ds-btn-icon-placeholder { display: inline-block; width: 12px; height: 12px; background: var(--grey-30); border-radius: 2px; }

/* ── Toolbar ────────────────────────────────────────────────────── */
/* Row: [search] [chip container, auto width] [filter buttons, pinned right] */
.ds-toolbar-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid var(--grey-10);
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
.ds-search--mock { background: #fff; }
.ds-search__icon { display: flex; align-items: center; color: var(--grey-50); flex-shrink: 0; }
.ds-search__input {
  border: none; outline: none;
  font-size: 13px; color: var(--grey-70);
  font-family: 'Roboto', sans-serif;
  background: transparent; width: 140px;
}

/* ── Filter bar ─────────────────────────────────────────────────── */
.ds-filterbar {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: auto; /* always pins to the right */
}
.ds-filter-btn-wrap { position: relative; }

.ds-filter-btn--active.btn--tertiary {
  box-shadow: inset 0 0 0 1.5px #138bc3;
  background: #e8f5ff;
  color: #0369a1;
  font-weight: 500;
}
.ds-filter-btn--active.btn--tertiary:hover { background: #d4edf9; }

.ds-filter-btn__badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 16px; height: 16px; padding: 0 4px;
  background: #138bc3; color: #fff;
  font-size: 10px; font-weight: 700; border-radius: 8px;
}

/* ── Dropdown ───────────────────────────────────────────────────── */
.ds-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 50;
  min-width: 200px;
  background: #fff;
  border: 1px solid var(--grey-30, #c0c2c6);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,.10);
  overflow: hidden;
}
/* Static (non-positioned) dropdown for State 2 illustration */
.ds-dropdown--static {
  position: static;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
  margin-top: 4px;
}
.ds-dropdown__list { list-style: none; padding: 4px 0; margin: 0; }
.ds-dropdown__item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; font-size: 13px; color: var(--grey-80);
  cursor: pointer; user-select: none;
  transition: background 80ms;
}
.ds-dropdown__item:hover { background: var(--grey-05); }

.ds-checkbox {
  width: 16px; height: 16px;
  border: 1.5px solid var(--grey-30, #c0c2c6);
  border-radius: 3px; background: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: border-color 100ms, background 100ms;
}
.ds-checkbox--checked { background: var(--btn-primary-bg); border-color: var(--btn-primary-bg); color: #fff; }

.ds-dropdown__footer { border-top: 1px solid var(--grey-10); padding: 8px 12px; }

/* chips rendered by AppTag neutral-outline + dismissible — no custom CSS needed */

/* ── Chip container — inline grey bubble, only wraps its content ─── */
.ds-chip-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;          /* take only content width — no stretching */
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 6px;
  padding: 3px 8px;
}

/* ── Overflow row — second row housing the chip container ──────────── */
/* Row has white bg; only the chip container inside has grey bg */
/* No border-top needed — ds-mock-row above already has border-bottom */
.ds-mock-chip-row {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  background: #fff;
}

/* ── Clear-all icon: filter lines → × on hover ──────────────────── */
.ds-clear-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: #fff;
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
  color: #fff;
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

/* ── Content placeholder ────────────────────────────────────────── */
.ds-content-placeholder {
  height: 120px;
  background: var(--grey-05);
  border-radius: 0 0 8px 8px;
}

/* ── State blocks ───────────────────────────────────────────────── */
.ds-state-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: #fff;
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

/* ── Mock filter bar (state illustrations) ──────────────────────── */
.ds-mock {
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 6px;
  overflow: hidden;
}
.ds-mock--col { display: flex; flex-direction: column; }
/* Row inside mock: [search] [chip container?] [filter buttons right] */
.ds-mock-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #fff;
  border-bottom: 1px solid var(--grey-10);
}
/* State 2 needs top-align because of the open static dropdown */
.ds-mock-row--top { align-items: flex-start; }
/* Also top-align items inside the filterbar itself — otherwise the plain buttons
   center against the taller active-button+dropdown wrapper */
.ds-mock-row--top .ds-filterbar { align-items: flex-start; }

/* ── Interaction guidelines ─────────────────────────────────────── */
.ds-guidelines {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
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

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ds-header-cols { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-toolbar { gap: 6px; }
  .ds-filterbar { margin-left: 0; }
}
</style>
