<script setup>
import { ref } from 'vue'
import AppTimeFilter from '../components/ui/AppTimeFilter.vue'

const result1 = ref(null)
const result2 = ref(null)
const result3 = ref(null)
const result4 = ref(null)

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

      <!-- Entry point example -->
      <div class="tf-entry-example">
        <div class="tf-entry-topbar">
          <span class="tf-entry-page-title">Fleet overview</span>
          <button class="tf-entry-btn">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
              <path d="M5 8H11M3 4H13M7 12H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Today
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <p class="tf-entry-caption">Entry point — primary button, top-right of page header. Label reflects active selection.</p>
      </div>

      <!-- Usage code example -->
      <div class="ds-code-block">
        <pre><code>&lt;!-- Entry point: primary button triggers the picker panel --&gt;
&lt;AppButton variant="primary" size="md" @click="showPicker = true"&gt;
  {{ activeLabel }}  &lt;!-- e.g. "Today", "Last 7 days", "15 Jan – 22 Jan" --&gt;
&lt;/AppButton&gt;

&lt;AppTimeFilter
  v-if="showPicker"
  v-model="dateRange"
  :quickSelections="['today', 'this-week', 'this-month']"
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
}
.tf-entry-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--grey-00);
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px var(--grey-20);
}
.tf-entry-page-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--grey-90);
}
.tf-entry-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 12px;
  background: var(--btn-primary-bg);
  color: #fff;
  border: none;
  border-radius: var(--btn-radius);
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: default;
}
.tf-entry-caption {
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
