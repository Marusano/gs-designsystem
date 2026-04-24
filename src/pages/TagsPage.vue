<script setup>
import { ref } from 'vue'
import AppTag from '../components/ui/AppTag.vue'

const types = [
  'neutral', 'neutral-outline', 'neutral-inverted',
  'success', 'success-strong', 'blue',
  'danger', 'orange', 'moderate', 'highlight',
]

const typeLabels = {
  'neutral':          'Neutral',
  'neutral-outline':  'Neutral Outline',
  'neutral-inverted': 'Neutral Inverted',
  'success':          'Success',
  'success-strong':   'Success Strong',
  'blue':             'Blue',
  'danger':           'Danger',
  'orange':           'Orange',
  'moderate':         'Moderate',
  'highlight':        'Highlight',
}

const typeDescriptions = {
  'neutral':          'Default state. Informational, no semantic weight.',
  'neutral-outline':  'Bordered variant. Subtle separation on white backgrounds.',
  'neutral-inverted': 'Dark background. Use on light surfaces for contrast.',
  'success':          'Active, online, healthy. Positive status.',
  'success-strong':   'Critical positive status. High contrast success.',
  'blue':             'Informational. Sync in progress, pending review.',
  'danger':           'Error, offline, critical fault.',
  'orange':           'Degraded, partially unavailable, recoverable warning.',
  'moderate':         'Idle, parked, moderate risk. Mid-range caution.',
  'highlight':        'Selected, featured, newly added.',
}

const IconDot = `<svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3.5"/></svg>`
const IconWifi = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 5.5C3.2 3.3 6 2 8 2s4.8 1.3 7 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M3 8c1.3-1.3 3-2 5-2s3.7.7 5 2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M5.5 10.5C6.1 10 7 9.5 8 9.5s1.9.5 2.5 1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><circle cx="8" cy="13" r="1" fill="currentColor"/></svg>`
const IconTruck = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 3.5h9v7H1V3.5z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M10 5.5h2.5l2 3V10.5h-4.5v-5z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><circle cx="3.5" cy="11.5" r="1.25" stroke="currentColor" stroke-width="1.25"/><circle cx="11.5" cy="11.5" r="1.25" stroke="currentColor" stroke-width="1.25"/></svg>`
const IconAlert = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L14.5 13H1.5L8 2z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M8 6.5v3M8 11h.01" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconFilter = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconClock  = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.25"/><path d="M8 5v3.5l2 1.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconCheck  = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

// Dismissible demo
const activeFilters = ref(['Active', 'Region: North', 'Type: HGV', 'Driver assigned'])
function removeFilter(label) {
  activeFilters.value = activeFilters.value.filter(f => f !== label)
}
function resetFilters() {
  activeFilters.value = ['Active', 'Region: North', 'Type: HGV', 'Driver assigned']
}
</script>

<template>
  <main class="ds-main">

    <!-- Header -->
    <section class="ds-section">
      <h1 class="ds-h1">Tag</h1>
      <p class="ds-lead">10 types · 2 sizes · icon support · dismissible</p>
      <p class="ds-body">
        Tags communicate status, category, or metadata at a glance.
        Use them on vehicle lists, driver cards, and filter bars.
        Tags are non-interactive by default — add <code>dismissible</code> only when the user can remove them.
      </p>
    </section>

    <!-- All types -->
    <section class="ds-section">
      <h2 class="ds-h2">Types</h2>
      <p class="ds-body">All 10 semantic types. Hover each row to see the hover state.</p>
      <div class="ds-table-wrap">
        <table class="ds-state-table">
          <thead>
            <tr>
              <th class="ds-state-table__label">Type</th>
              <th>Tag</th>
              <th>With icon</th>
              <th>Dismissible</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in types" :key="t">
              <td class="ds-state-table__label">
                <strong>{{ typeLabels[t] }}</strong>
                <span>{{ typeDescriptions[t] }}</span>
              </td>
              <td>
                <AppTag :type="t">{{ typeLabels[t] }}</AppTag>
              </td>
              <td>
                <AppTag :type="t">
                  <template #icon><span v-html="IconDot" /></template>
                  {{ typeLabels[t] }}
                </AppTag>
              </td>
              <td>
                <AppTag :type="t" :dismissible="true">{{ typeLabels[t] }}</AppTag>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Icon variants -->
    <section class="ds-section">
      <h2 class="ds-h2">Icon Variants</h2>
      <p class="ds-body">
        Pass any 16×16 icon into the <code>#icon</code> slot.
        When only an icon is provided (no label, not dismissible), padding collapses to a square.
      </p>
      <div class="ds-card">
        <div class="ds-tag-group">
          <p class="ds-tag-group__label">Icon + Label</p>
          <div class="ds-tag-row">
            <AppTag type="success">
              <template #icon><span v-html="IconDot" /></template>
              Online
            </AppTag>
            <AppTag type="danger">
              <template #icon><span v-html="IconAlert" /></template>
              Fault detected
            </AppTag>
            <AppTag type="blue">
              <template #icon><span v-html="IconWifi" /></template>
              Syncing
            </AppTag>
            <AppTag type="moderate">
              <template #icon><span v-html="IconClock" /></template>
              Idle
            </AppTag>
            <AppTag type="highlight">
              <template #icon><span v-html="IconCheck" /></template>
              Inspected
            </AppTag>
          </div>
        </div>
        <div class="ds-tag-group">
          <p class="ds-tag-group__label">Label only</p>
          <div class="ds-tag-row">
            <AppTag type="neutral">Neutral</AppTag>
            <AppTag type="success">Active</AppTag>
            <AppTag type="danger">Offline</AppTag>
            <AppTag type="orange">Warning</AppTag>
            <AppTag type="blue">Pending</AppTag>
          </div>
        </div>
        <div class="ds-tag-group">
          <p class="ds-tag-group__label">Icon only</p>
          <div class="ds-tag-row">
            <AppTag type="success" :aria-label="'Online'">
              <template #icon><span v-html="IconDot" /></template>
            </AppTag>
            <AppTag type="danger" :aria-label="'Fault'">
              <template #icon><span v-html="IconAlert" /></template>
            </AppTag>
            <AppTag type="blue" :aria-label="'Syncing'">
              <template #icon><span v-html="IconWifi" /></template>
            </AppTag>
            <AppTag type="moderate" :aria-label="'Idle'">
              <template #icon><span v-html="IconClock" /></template>
            </AppTag>
            <AppTag type="highlight" :aria-label="'Selected'">
              <template #icon><span v-html="IconCheck" /></template>
            </AppTag>
          </div>
        </div>
        <div class="ds-tag-group">
          <p class="ds-tag-group__label">Icon + Dismissible</p>
          <div class="ds-tag-row">
            <AppTag type="neutral" :dismissible="true">
              <template #icon><span v-html="IconFilter" /></template>
              Active
            </AppTag>
            <AppTag type="blue" :dismissible="true">
              <template #icon><span v-html="IconTruck" /></template>
              HGV
            </AppTag>
            <AppTag type="highlight" :dismissible="true">
              <template #icon><span v-html="IconCheck" /></template>
              Inspected
            </AppTag>
          </div>
        </div>
      </div>
    </section>

    <!-- Sizes -->
    <section class="ds-section">
      <h2 class="ds-h2">Sizes</h2>
      <div class="ds-sizes-grid">
        <div class="ds-sizes-card">
          <p class="ds-sizes-card__title">SM — 24px (default)</p>
          <p class="ds-body" style="margin-bottom:16px">
            Standard tag. Used inline with text, in table cells, and on list items.
          </p>
          <div class="ds-tag-row">
            <AppTag type="neutral" size="sm">Label</AppTag>
            <AppTag type="success" size="sm">
              <template #icon><span v-html="IconDot" /></template>
              Active
            </AppTag>
            <AppTag type="danger" size="sm" :dismissible="true">Fault</AppTag>
          </div>
        </div>
        <div class="ds-sizes-card">
          <p class="ds-sizes-card__title">MD — 56px (card tag)</p>
          <p class="ds-body" style="margin-bottom:16px">
            Two-line card tag: <code>cardTitle</code> above, slot content below.
            Used as a prominent status indicator on vehicle or driver cards.
          </p>
          <div class="ds-tag-row">
            <AppTag type="success" size="md" card-title="Vehicle status">
              Active
            </AppTag>
            <AppTag type="danger" size="md" card-title="Fault code">
              P0401
            </AppTag>
            <AppTag type="blue" size="md" card-title="Last sync">
              2 min ago
            </AppTag>
            <AppTag type="highlight" size="md" card-title="Region">
              North
            </AppTag>
          </div>
        </div>
      </div>
    </section>

    <!-- Dismissible demo -->
    <section class="ds-section">
      <h2 class="ds-h2">Dismissible</h2>
      <p class="ds-body">
        Add <code>dismissible</code> to show the × button. The tag emits a <code>dismiss</code> event —
        remove it from your list on that event. Never use dismissible on status-only tags.
      </p>
      <div class="ds-card">
        <p class="ds-example-card__label">Active filters</p>
        <div class="ds-dismiss-demo">
          <div class="ds-tag-row" v-if="activeFilters.length">
            <AppTag
              v-for="label in activeFilters"
              :key="label"
              type="neutral-outline"
              :dismissible="true"
              @dismiss="removeFilter(label)"
            >{{ label }}</AppTag>
          </div>
          <p v-else class="ds-body" style="color:var(--grey-50);font-style:italic">All filters cleared.</p>
          <button class="ds-reset-btn" @click="resetFilters">Reset</button>
        </div>
      </div>
    </section>

    <!-- Usage examples -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage Examples</h2>
      <div class="ds-examples">

        <div class="ds-example-card">
          <p class="ds-example-card__label">Vehicle list row</p>
          <div class="ds-example-card__body">
            <div class="ds-list-row">
              <span class="ds-list-label">Volvo FH16 · PL22 KXB</span>
              <div class="ds-tag-row">
                <AppTag type="success">
                  <template #icon><span v-html="IconDot" /></template>
                  Online
                </AppTag>
                <AppTag type="neutral">HGV</AppTag>
                <AppTag type="blue">Syncing</AppTag>
              </div>
            </div>
            <div class="ds-list-row">
              <span class="ds-list-label">DAF XF · MN71 TRK</span>
              <div class="ds-tag-row">
                <AppTag type="danger">
                  <template #icon><span v-html="IconDot" /></template>
                  Offline
                </AppTag>
                <AppTag type="orange">Engine warning</AppTag>
              </div>
            </div>
            <div class="ds-list-row">
              <span class="ds-list-label">Mercedes Actros · LD70 ACT</span>
              <div class="ds-tag-row">
                <AppTag type="moderate">
                  <template #icon><span v-html="IconDot" /></template>
                  Idle
                </AppTag>
                <AppTag type="neutral">Van</AppTag>
              </div>
            </div>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-card__label">Driver card — status badges</p>
          <div class="ds-example-card__body">
            <div class="ds-driver-card">
              <div class="ds-driver-info">
                <div class="ds-driver-avatar">JD</div>
                <div>
                  <strong>James Davies</strong>
                  <p style="font-size:12px;color:var(--grey-60)">Driver · LIC-4821</p>
                </div>
              </div>
              <div class="ds-tag-row" style="margin-top:12px">
                <AppTag type="success-strong">On duty</AppTag>
                <AppTag type="highlight">Inspected</AppTag>
                <AppTag type="blue">HGV certified</AppTag>
              </div>
            </div>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-card__label">Vehicle card — MD card tags</p>
          <div class="ds-example-card__body">
            <div class="ds-vehicle-card">
              <div class="ds-vehicle-card__header">
                <strong>Volvo FH16</strong>
                <span style="font-size:12px;color:var(--grey-60)">PL22 KXB</span>
              </div>
              <div class="ds-tag-row" style="margin-top:12px;flex-wrap:wrap">
                <AppTag type="success" size="md" card-title="Status">Online</AppTag>
                <AppTag type="neutral" size="md" card-title="Mileage">142,300 km</AppTag>
                <AppTag type="blue"    size="md" card-title="Last sync">4 min ago</AppTag>
              </div>
            </div>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-card__label">Filter bar</p>
          <div class="ds-example-card__body">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="font-size:12px;font-weight:600;color:var(--grey-60)">Filters:</span>
              <AppTag type="neutral-outline" :dismissible="true">
                <template #icon><span v-html="IconFilter" /></template>
                Status: Active
              </AppTag>
              <AppTag type="neutral-outline" :dismissible="true">Region: North</AppTag>
              <AppTag type="neutral-outline" :dismissible="true">Type: HGV</AppTag>
              <AppTag type="highlight" :dismissible="true">Selected: 12</AppTag>
            </div>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-card__label">Fault / alert context</p>
          <div class="ds-example-card__body">
            <div class="ds-fault-row">
              <AppTag type="danger">
                <template #icon><span v-html="IconAlert" /></template>
                Critical
              </AppTag>
              <span class="ds-fault-text">ABS sensor failure — rear axle</span>
            </div>
            <div class="ds-fault-row">
              <AppTag type="orange">
                <template #icon><span v-html="IconAlert" /></template>
                Warning
              </AppTag>
              <span class="ds-fault-text">Tyre pressure low — front left</span>
            </div>
            <div class="ds-fault-row">
              <AppTag type="moderate">
                <template #icon><span v-html="IconClock" /></template>
                Scheduled
              </AppTag>
              <span class="ds-fault-text">Service due in 1,200 km</span>
            </div>
            <div class="ds-fault-row">
              <AppTag type="success">
                <template #icon><span v-html="IconCheck" /></template>
                Resolved
              </AppTag>
              <span class="ds-fault-text">Brake fluid replaced</span>
            </div>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-card__label">Do / Don't</p>
          <div class="ds-example-card__body">
            <div class="ds-do-dont">
              <div class="ds-do">
                <p class="ds-do__label ds-do__label--do">✓ Do</p>
                <div class="ds-tag-row">
                  <AppTag type="success">Active</AppTag>
                  <AppTag type="danger">Offline</AppTag>
                  <AppTag type="moderate">Idle</AppTag>
                </div>
                <p class="ds-do__note">Consistent semantic colours for vehicle status.</p>
              </div>
              <div class="ds-do">
                <p class="ds-do__label ds-do__label--dont">✗ Don't</p>
                <div class="ds-tag-row">
                  <AppTag type="highlight">Active</AppTag>
                  <AppTag type="orange">Offline</AppTag>
                  <AppTag type="success">Idle</AppTag>
                </div>
                <p class="ds-do__note">Mismatched types break meaning and confuse users.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Token reference -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <div class="ds-token-grid">

        <div class="ds-token-card">
          <p class="ds-token-card__title">Neutral</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td><td><span class="swatch" style="background:#e6e6e7"></span>#e6e6e7</td></tr>
              <tr><td>Text</td>      <td><span class="swatch" style="background:#5d6065"></span>#5d6065</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#c0c2c6"></span>#c0c2c6</td></tr>
              <tr><td>Hover text</td>  <td><span class="swatch" style="background:#36383b"></span>#36383b</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Neutral Outline</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#ffffff;border:1px solid #d8d8da"></span>#ffffff</td></tr>
              <tr><td>Border</td>      <td><span class="swatch" style="background:#c0c2c6"></span>#c0c2c6</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#6f7176"></span>#6f7176</td></tr>
              <tr><td>Hover bg</td>    <td><span class="swatch" style="background:#f7f7f8"></span>#f7f7f8</td></tr>
              <tr><td>Hover text</td>  <td><span class="swatch" style="background:#36383b"></span>#36383b</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Neutral Inverted</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#6f7176"></span>#6f7176</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#f1f1f2;border:1px solid #d8d8da"></span>#f1f1f2</td></tr>
              <tr><td>Hover bg</td>    <td><span class="swatch" style="background:#5d6065"></span>#5d6065</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#6f7176"></span>#6f7176</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Success</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#c5f2cb"></span>#c5f2cb</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#12591c"></span>#12591c</td></tr>
              <tr><td>Hover bg</td>    <td><span class="swatch" style="background:#a8ebb2"></span>#a8ebb2</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#64d074"></span>#64d074</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Success Strong</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#247a31"></span>#247a31</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#f1fcf2;border:1px solid #d8d8da"></span>#f1fcf2</td></tr>
              <tr><td>Hover bg</td>    <td><span class="swatch" style="background:#12591c"></span>#12591c</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#469852"></span>#469852</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Blue</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#b3e1f7"></span>#b3e1f7</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#013b57"></span>#013b57</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#61bde9"></span>#61bde9</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Danger</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#fecaca"></span>#fecaca</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#781212"></span>#781212</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#fca5a5"></span>#fca5a5</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Orange</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#ffe2cc"></span>#ffe2cc</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#702822"></span>#702822</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#ffa767"></span>#ffa767</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Moderate</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#ffeec7"></span>#ffeec7</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#927302"></span>#927302</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#fde9b9"></span>#fde9b9</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Highlight</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#e4daff"></span>#e4daff</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#553698"></span>#553698</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#bea3fd"></span>#bea3fd</td></tr>
              <tr><td>Hover text</td>  <td><span class="swatch" style="background:#02005f"></span>#02005f</td></tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead    { font-size: 16px; color: var(--grey-70); margin-top: -8px; }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

/* ── Table ─────────────────────────────────────────────────────── */
.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-state-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-state-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 12px 20px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-state-table tbody td { padding: 14px 20px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; }
.ds-state-table tbody tr:last-child td { border-bottom: none; }
.ds-state-table tbody tr:hover > td { background: var(--grey-05); }
.ds-state-table__label { min-width: 200px; }
.ds-state-table__label strong { display: block; font-size: 13px; font-weight: 600; color: var(--grey-90); margin-bottom: 3px; }
.ds-state-table__label span   { display: block; font-size: 12px; color: var(--grey-60); line-height: 1.4; }

/* ── Card container ─────────────────────────────────────────────── */
.ds-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 24px; display: flex; flex-direction: column; gap: 24px; }

/* ── Tag row / group ─────────────────────────────────────────────── */
.ds-tag-row   { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.ds-tag-group { display: flex; flex-direction: column; gap: 12px; }
.ds-tag-group__label { font-size: 12px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .06em; }

/* ── Sizes ───────────────────────────────────────────────────────── */
.ds-sizes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
.ds-sizes-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-sizes-card__title { font-size: 13px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; }

/* ── Dismissible demo ─────────────────────────────────────────────── */
.ds-dismiss-demo { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.ds-reset-btn {
  font-size: 12px; font-family: 'Roboto', sans-serif;
  color: var(--grey-70); background: none; border: 1px solid var(--grey-20);
  border-radius: 4px; padding: 4px 10px; cursor: pointer;
  transition: background 100ms, border-color 100ms;
}
.ds-reset-btn:hover { background: var(--grey-05); border-color: var(--grey-40); }

/* ── Examples ─────────────────────────────────────────────────────── */
.ds-examples { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px; }
.ds-example-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.ds-example-card__label { font-size: 11px; font-weight: 600; color: var(--grey-60); text-transform: uppercase; letter-spacing: .07em; padding: 10px 16px; background: var(--grey-05); border-bottom: 1px solid var(--grey-20); }
.ds-example-card__body { padding: 20px 16px; }

/* Vehicle list */
.ds-list-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--grey-10); flex-wrap: wrap; }
.ds-list-row:last-child { border-bottom: none; }
.ds-list-label { font-size: 13px; font-weight: 500; color: var(--grey-90); }

/* Driver card */
.ds-driver-card { background: var(--grey-05); border-radius: 8px; padding: 16px; }
.ds-driver-info { display: flex; align-items: center; gap: 12px; }
.ds-driver-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--grey-20); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: var(--grey-70); flex-shrink: 0; }
.ds-driver-info strong { font-size: 14px; font-weight: 600; color: var(--grey-90); display: block; }

/* Vehicle card */
.ds-vehicle-card { background: var(--grey-05); border-radius: 8px; padding: 16px; }
.ds-vehicle-card__header { display: flex; flex-direction: column; gap: 2px; }
.ds-vehicle-card__header strong { font-size: 14px; font-weight: 600; color: var(--grey-90); }

/* Fault rows */
.ds-fault-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; border-bottom: 1px solid var(--grey-10); }
.ds-fault-row:last-child { border-bottom: none; }
.ds-fault-text { font-size: 13px; color: var(--grey-80); }

/* Do / Don't */
.ds-do-dont { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-do { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 6px; background: var(--grey-05); }
.ds-do__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 2px; }
.ds-do__label--do   { color: #12591c; }
.ds-do__label--dont { color: #781212; }
.ds-do__note { font-size: 11px; color: var(--grey-60); line-height: 1.4; margin-top: 4px; }

/* ── Token reference ──────────────────────────────────────────────── */
.ds-token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.ds-token-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.ds-token-card__title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); padding: 10px 16px; background: var(--grey-05); border-bottom: 1px solid var(--grey-20); }
.ds-token-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.ds-token-table th { text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--grey-60); font-weight: 600; border-bottom: 1px solid var(--grey-10); }
.ds-token-table td { padding: 7px 12px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-80); }
.ds-token-table tr:last-child td { border-bottom: none; }

.swatch { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: middle; margin-right: 6px; flex-shrink: 0; }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-examples, .ds-sizes-grid, .ds-token-grid { grid-template-columns: 1fr; }
  .ds-do-dont { grid-template-columns: 1fr; }
}
</style>
