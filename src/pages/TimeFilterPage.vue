<script setup>
import { ref } from 'vue'
import AppTimeFilter from '../components/ui/AppTimeFilter.vue'
import AppPageHeader from '../components/ui/AppPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppIcon from '../components/ui/AppIcon.vue'

const result1 = ref(null)
const result2 = ref(null)
const result3 = ref(null)
const result4 = ref(null)

// Usage example
const showUsagePicker = ref(false)
const usageRange = ref(null)

function usageLabel() {
  if (!usageRange.value?.from) return 'Today'
  const range = usageRange.value
  const d = new Date(); d.setHours(0, 0, 0, 0)
  const from = new Date(range.from); from.setHours(0, 0, 0, 0)
  const toRaw = range.to ? new Date(range.to) : null
  if (toRaw) toRaw.setHours(0, 0, 0, 0)
  const to = toRaw

  // today
  if (from.getTime() === d.getTime() && (!to || to.getTime() === d.getTime())) return 'Today'

  // this-week (Mon–Sun)
  const dow = d.getDay() === 0 ? 6 : d.getDay() - 1
  const mon = new Date(d); mon.setDate(d.getDate() - dow)
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6)
  if (from.getTime() === mon.getTime() && to && to.getTime() === sun.getTime()) return 'This week'

  // this-month
  const mStart = new Date(d.getFullYear(), d.getMonth(), 1)
  const mEnd   = new Date(d.getFullYear(), d.getMonth() + 1, 0)
  if (from.getTime() === mStart.getTime() && to && to.getTime() === mEnd.getTime()) return 'This month'

  // last-2-days
  const ago = new Date(d); ago.setDate(d.getDate() - 2)
  if (from.getTime() === ago.getTime() && to && to.getTime() === d.getTime()) return 'Last 2 days'

  // custom range — format as dates
  const f = range.from.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  const t2 = range.to?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) ?? f
  return f === t2 ? f : `${f} – ${t2}`
}

function fmtRange(v) {
  if (!v?.from) return '—'
  const f = v.from?.toLocaleDateString('en-GB') ?? '?'
  const t = v.to?.toLocaleDateString('en-GB') ?? '?'
  return `${f} → ${t}`
}
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Time Filter</h1>
      <div class="ds-header-cols">
        <p class="ds-body">
          A date-range picker panel for filtering data by time period. Supports quick presets
          and three modes: date-only, date+time, or time-only.
          Emits <code>update:modelValue</code> with <code>{ from, to }</code> on apply, and <code>cancel</code> on dismiss.
        </p>
      </div>
    </section>

    <!-- ── Component usage ──────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component usage</h2>
      <p class="ds-body">
        The time filter is triggered from a <strong>primary button</strong> placed in the top-right corner of a
        main page header or secondary page header. The button label always reflects the currently selected
        timeframe — never a static label like "Filter". The default state is <strong>"Today"</strong>, representing
        the most recent period.
      </p>

      <!-- Entry point example — live, interactive -->
      <div class="tf-entry-example">
        <AppPageHeader type="secondary" title="The blue truck" subtitle="DK 123 24">
          <template #actions>
            <AppButton variant="tertiary" size="md">
              <template #icon-left><AppIcon name="export" :size="16" /></template>
              Export as
              <template #icon-right><AppIcon name="chevron-down" :size="16" /></template>
            </AppButton>
            <div class="tf-trigger-wrap">
              <AppButton variant="primary" size="md" @click="showUsagePicker = !showUsagePicker">
                <template #icon-left><AppIcon name="calendar" :size="16" /></template>
                {{ usageLabel() }}
                <template #icon-right><AppIcon name="chevron-down" :size="16" /></template>
              </AppButton>
              <div v-if="showUsagePicker" class="tf-usage-picker">
                <AppTimeFilter
                  v-model="usageRange"
                  :quickSelections="['today', 'this-week', 'this-month']"
                  @update:modelValue="showUsagePicker = false"
                  @cancel="showUsagePicker = false"
                />
              </div>
            </div>
          </template>
        </AppPageHeader>
        <p class="tf-entry-caption">Click the time filter button to open the picker. Label updates to reflect the active selection.</p>
      </div>

      <!-- Usage code example -->
      <div class="ds-code-block">
        <pre><code>&lt;AppPageHeader type="secondary" title="The blue truck" subtitle="DK 123 24"&gt;
  &lt;template #actions&gt;
    &lt;AppButton variant="tertiary" size="md"&gt;
      &lt;template #icon-left&gt;&lt;AppIcon name="export" :size="16" /&gt;&lt;/template&gt;
      Export as
      &lt;template #icon-right&gt;&lt;AppIcon name="chevron-down" :size="16" /&gt;&lt;/template&gt;
    &lt;/AppButton&gt;
    &lt;AppButton variant="primary" size="md" @click="showPicker = !showPicker"&gt;
      &lt;template #icon-left&gt;&lt;AppIcon name="calendar" :size="16" /&gt;&lt;/template&gt;
      {{ activeLabel }}  &lt;!-- e.g. "Today", "15 Jan – 22 Jan" --&gt;
      &lt;template #icon-right&gt;&lt;AppIcon name="chevron-down" :size="16" /&gt;&lt;/template&gt;
    &lt;/AppButton&gt;
  &lt;/template&gt;
&lt;/AppPageHeader&gt;

&lt;AppTimeFilter
  v-if="showPicker"
  v-model="dateRange"
  :quickSelections="['today', 'this-week', 'this-month']"
  @update:modelValue="showPicker = false"
  @cancel="showPicker = false"
/&gt;</code></pre>
      </div>

      <!-- Do / Don't -->
      <div class="tf-dodonts">
        <div class="tf-format-card">
          <p class="tf-format-label tf-format-label--do">✓ Do</p>
          <ul class="tf-rule-list">
            <li>Always reflect the active selection in the button label — e.g. <em>"Today"</em>, <em>"This week"</em>, or <em>"15 Jan – 22 Jan"</em></li>
            <li>Default to <em>"Today"</em> as the initial selection so the view is never empty on first load</li>
            <li>Place the time filter button in the top-right area of the page or section header</li>
            <li>Use the <strong>primary</strong> button variant for the main page time filter entry point</li>
            <li>Provide quick-selection presets for the most common ranges relevant to the page context</li>
          </ul>
        </div>
        <div class="tf-format-card">
          <p class="tf-format-label tf-format-label--dont">✗ Don't</p>
          <ul class="tf-rule-list">
            <li>Don't use a static label like <em>"Time filter"</em> or <em>"Filter"</em> — the label must always show the active range</li>
            <li>Don't leave the time range unset on page load — always initialise with a sensible default</li>
            <li>Don't place more than one independent time filter on the same view — use a single authoritative control</li>
            <li>Don't nest the time filter inside another dropdown or flyout menu — it needs a direct, visible trigger</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Variants ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>
      <p class="ds-desc">Four configuration modes.</p>

      <div class="tf-grid">

        <!-- 1: Default — quick presets + date inputs + calendar -->
        <div class="tf-demo">
          <p class="tf-demo__label">Default (date mode)</p>
          <AppTimeFilter
            @update:modelValue="result1 = $event"
            @cancel="result1 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result1) }}</p>
        </div>

        <!-- 2: Minimal — no quick presets -->
        <div class="tf-demo">
          <p class="tf-demo__label">Minimal (no quick presets)</p>
          <AppTimeFilter
            :showQuickSelections="false"
            @update:modelValue="result2 = $event"
            @cancel="result2 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result2) }}</p>
        </div>

        <!-- 3: Date + time mode -->
        <div class="tf-demo">
          <p class="tf-demo__label">Date &amp; time mode</p>
          <AppTimeFilter
            mode="datetime"
            :quickSelections="['today', 'last-2-days', 'this-week']"
            @update:modelValue="result3 = $event"
            @cancel="result3 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result3) }}</p>
        </div>

        <!-- 4: Time only + custom quick selections -->
        <div class="tf-demo">
          <p class="tf-demo__label">Time only + custom presets</p>
          <AppTimeFilter
            mode="time"
            :quickSelections="['today', 'last-2-days', 'this-week']"
            @update:modelValue="result4 = $event"
            @cancel="result4 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result4) }}</p>
        </div>

      </div>
    </section>

    <!-- ── Props ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Props</h2>
      <table class="ds-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>modelValue</code></td>
            <td><code>{ from: Date|null, to: Date|null }</code></td>
            <td><code>{ from: null, to: null }</code></td>
            <td>Currently applied date range (v-model)</td>
          </tr>
          <tr>
            <td><code>mode</code></td>
            <td><code>'date' | 'datetime' | 'time'</code></td>
            <td><code>'date'</code></td>
            <td>Controls which inputs are shown (date fields, time fields, or time-only)</td>
          </tr>
          <tr>
            <td><code>showQuickSelections</code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Show/hide the quick preset buttons row</td>
          </tr>
          <tr>
            <td><code>quickSelections</code></td>
            <td><code>string[] | { label, value }[]</code></td>
            <td><code>['today','this-week','this-month']</code></td>
            <td>Preset IDs or objects. Built-ins: <code>today</code>, <code>this-week</code>, <code>this-month</code>, <code>last-2-days</code></td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ── Events ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Events</h2>
      <table class="ds-table">
        <thead>
          <tr><th>Event</th><th>Payload</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>update:modelValue</code></td>
            <td><code>{ from: Date|null, to: Date|null }</code></td>
            <td>Emitted when the user clicks "Apply changes"</td>
          </tr>
          <tr>
            <td><code>cancel</code></td>
            <td>—</td>
            <td>Emitted when the user clicks "Cancel"</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ── Usage ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-code-block">
        <pre><code>&lt;!-- Default: date mode with quick presets --&gt;
&lt;AppTimeFilter
  v-model="dateRange"
  :quickSelections="['today', 'this-week', 'this-month']"
  @cancel="closePicker"
/&gt;</code></pre>
      </div>

      <div class="ds-code-block">
        <pre><code>&lt;!-- Date + time variant --&gt;
&lt;AppTimeFilter
  v-model="range"
  mode="datetime"
  :quickSelections="['today', 'last-2-days', 'this-week']"
/&gt;</code></pre>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main    { max-width: none; margin: 0; padding: 48px 40px 80px; display: flex; flex-direction: column; gap: 56px; }
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-desc    { font-size: 14px; color: var(--grey-70); }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

@media (max-width: 768px) { .ds-main { padding: 32px 20px 60px; } }

.ds-header-cols { display: grid; grid-template-columns: 1fr; gap: 16px; }

/* Demo grid */
.tf-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px 24px;
  align-items: flex-start;
}

.tf-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tf-demo__label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-50);
  margin: 0;
}

.tf-demo__out {
  font-size: 12px;
  color: var(--grey-60);
  font-family: 'Inter', monospace;
  margin: 0;
  min-height: 16px;
}

/* Props table */
.ds-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.ds-table th {
  text-align: left;
  padding: 8px 12px;
  background: var(--grey-05);
  font-weight: 600;
  color: var(--grey-80);
  border-bottom: 1px solid var(--grey-20);
}

.ds-table td {
  padding: 8px 12px;
  color: var(--grey-70);
  border-bottom: 1px solid var(--grey-10);
  vertical-align: top;
}

.ds-table code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 4px;
  border-radius: 3px;
  color: var(--grey-90);
}

/* ── Entry point example ────────────────────────────────────── */
.tf-entry-example {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px var(--grey-20);
}
.tf-trigger-wrap {
  position: relative;
}
.tf-usage-picker {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 50;
}
.tf-entry-caption {
  padding: 0 16px 12px;
  font-size: 12px;
  color: var(--grey-60);
  font-style: italic;
}

/* ── Do / Don't ─────────────────────────────────────────────── */
.tf-dodonts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.tf-format-card {
  background: var(--grey-05);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tf-format-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.tf-format-label--do   { color: var(--green-90); }
.tf-format-label--dont { color: var(--red-80); }
.tf-rule-list {
  margin: 0;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.tf-rule-list li {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 1.5;
}

/* Code blocks */
.ds-code-block {
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 12px;
  overflow-x: auto;
}

.ds-code-block pre { margin: 0; }
.ds-code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: var(--grey-90);
  line-height: 1.6;
}
</style>
