<script setup>
import { ref } from 'vue'
import AppTimeFilter from '../components/ui/AppTimeFilter.vue'

const result1 = ref(null)
const result2 = ref(null)
const result3 = ref(null)
const result4 = ref(null)
const result5 = ref(null)
const result6 = ref(null)

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
          A date-range picker panel for filtering data by time period. Supports quick presets,
          single and dual calendar views, and date-only, date+time, or time-only modes.
          Emits <code>update:modelValue</code> with <code>{ from, to }</code> on apply, and <code>cancel</code> on dismiss.
        </p>
      </div>
    </section>

    <!-- ── Variants ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>
      <p class="ds-desc">Six configuration modes matching the Figma spec.</p>

      <div class="tf-grid">

        <!-- 1: Default — quick + current date + single calendar -->
        <div class="tf-demo">
          <p class="tf-demo__label">Default (date mode)</p>
          <AppTimeFilter
            @update:modelValue="result1 = $event"
            @cancel="result1 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result1) }}</p>
        </div>

        <!-- 2: Dual calendar -->
        <div class="tf-demo">
          <p class="tf-demo__label">Dual calendar (2 months)</p>
          <AppTimeFilter
            :monthCount="2"
            @update:modelValue="result2 = $event"
            @cancel="result2 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result2) }}</p>
        </div>

        <!-- 3: No current date -->
        <div class="tf-demo">
          <p class="tf-demo__label">No current date display</p>
          <AppTimeFilter
            :showCurrentDate="false"
            @update:modelValue="result3 = $event"
            @cancel="result3 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result3) }}</p>
        </div>

        <!-- 4: No quick selections, no current date -->
        <div class="tf-demo">
          <p class="tf-demo__label">Minimal (no quick, no date)</p>
          <AppTimeFilter
            :showQuickSelections="false"
            :showCurrentDate="false"
            @update:modelValue="result4 = $event"
            @cancel="result4 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result4) }}</p>
        </div>

        <!-- 5: Date + time mode -->
        <div class="tf-demo">
          <p class="tf-demo__label">Date & time mode</p>
          <AppTimeFilter
            mode="datetime"
            @update:modelValue="result5 = $event"
            @cancel="result5 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result5) }}</p>
        </div>

        <!-- 6: Time only + custom quick selections -->
        <div class="tf-demo">
          <p class="tf-demo__label">Time only + custom presets</p>
          <AppTimeFilter
            mode="time"
            :quickSelections="['today', 'last-2-days', 'this-week']"
            @update:modelValue="result6 = $event"
            @cancel="result6 = null"
          />
          <p class="tf-demo__out">{{ fmtRange(result6) }}</p>
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
            <td><code>showCurrentDate</code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Show/hide the "Tue, Mar 4" current date label</td>
          </tr>
          <tr>
            <td><code>quickSelections</code></td>
            <td><code>string[] | { label, value }[]</code></td>
            <td><code>['today','this-week','this-month']</code></td>
            <td>Preset IDs or objects. Built-ins: <code>today</code>, <code>this-week</code>, <code>this-month</code>, <code>last-2-days</code></td>
          </tr>
          <tr>
            <td><code>monthCount</code></td>
            <td><code>1 | 2</code></td>
            <td><code>1</code></td>
            <td>Show one or two calendar months side-by-side</td>
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
        <pre><code>&lt;AppTimeFilter
  v-model="dateRange"
  mode="date"
  :monthCount="1"
  :showQuickSelections="true"
  :showCurrentDate="true"
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

      <div class="ds-code-block">
        <pre><code>&lt;!-- Two-month calendar --&gt;
&lt;AppTimeFilter
  v-model="range"
  :monthCount="2"
  :showCurrentDate="false"
/&gt;</code></pre>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main   { padding: 40px 48px; max-width: 1200px; }
.ds-section { margin-bottom: 48px; }
.ds-h1     { font-size: 28px; font-weight: 700; color: var(--grey-100); margin: 0 0 16px; }
.ds-h2     { font-size: 18px; font-weight: 600; color: var(--grey-90); margin: 0 0 12px; }
.ds-desc   { font-size: 14px; color: var(--grey-70); margin: 0 0 20px; }
.ds-body   { font-size: 14px; color: var(--grey-70); line-height: 1.6; margin: 0; }

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
