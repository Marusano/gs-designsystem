<script setup>
import AppStatsCard from '../components/ui/AppStatsCard.vue'
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Stats Cards</h1>
      <p class="ds-lead">2 types · 4 divider positions · optional comparison</p>
      <p class="ds-body">
        Stats cards present key analytics and metrics at the top of a page. They highlight
        the most important numbers at a glance — driving totals, active asset counts,
        fuel consumption — giving users an immediate summary before they dive into detail views.
        Cards sit in a horizontal row and are separated by vertical dividers.
      </p>
    </section>

    <!-- ── Component Usage ─────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component usage</h2>
      <p class="ds-body">
        Place <code>AppStatsCard</code> elements inside a <code>.sc-row</code> flex container.
        Each card takes <code>flex: 1</code> so the row fills available width evenly.
        Use <code>divider="both"</code> (default) on every card — adjacent dividers overlap
        at the shared edge and appear as a single 1 px line.
      </p>

      <!-- Live demo -->
      <div class="sc-row">
        <AppStatsCard label="Total driving"         value="142h 20min" />
        <AppStatsCard label="Total active assets"   value="24/27" />
        <AppStatsCard label="Total idling"          value="38h 40min" />
        <AppStatsCard label="Total fuel"            value="5,430 kg" />
        <AppStatsCard label="Average consumption"   value="34.0/100km" />
      </div>

      <!-- Code snippet -->
      <div class="ds-code-block">
        <pre><code>&lt;div class="sc-row"&gt;
  &lt;AppStatsCard label="Total driving"       value="142h 20min" /&gt;
  &lt;AppStatsCard label="Total active assets" value="24/27" /&gt;
  &lt;AppStatsCard label="Total idling"        value="38h 40min" /&gt;
  &lt;AppStatsCard label="Total fuel"          value="5,430 kg" /&gt;
  &lt;AppStatsCard label="Average consumption" value="34.0/100km" /&gt;
&lt;/div&gt;

&lt;!-- With comparison row --&gt;
&lt;AppStatsCard
  label="Total driving"
  value="142h 20min"
  compareText="+3% vs previous 7 days"
/&gt;</code></pre>
      </div>

      <!-- Do / Don't -->
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Place stats cards at the very top of the page, above all other content</li>
            <li>Keep labels short — 2–4 words, all lowercase (e.g. <em>"total driving"</em>)</li>
            <li>Use <code>compareText</code> consistently — either all cards in a row compare or none do</li>
            <li>Show 3–6 cards per row; more than 6 becomes too dense to scan</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li>Don't mix compare and non-compare cards in the same row — heights will differ</li>
            <li>Don't use stats cards for non-numeric content — use a list or table instead</li>
            <li>Don't truncate values — format numbers to fit (e.g. abbreviate large counts)</li>
            <li>Don't add icons or action buttons inside stats cards — keep them scannable</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Variants ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>

      <div class="sc-variant-block">
        <p class="sc-variant-label">Simple</p>
        <div class="sc-row">
          <AppStatsCard label="Total driving"       value="142h 20min" />
          <AppStatsCard label="Total active assets" value="24/27" />
          <AppStatsCard label="Total idling"        value="38h 40min" />
          <AppStatsCard label="Total fuel"          value="5,430 kg" />
          <AppStatsCard label="Average consumption" value="34.0/100km" />
          <AppStatsCard label="Total distance"      value="12,345 km" />
        </div>
      </div>

      <div class="sc-variant-block">
        <p class="sc-variant-label">With comparison</p>
        <div class="sc-row">
          <AppStatsCard label="Total driving"       value="142h 20min" compareText="+3% vs previous 7 days" />
          <AppStatsCard label="Total active assets" value="24/27"      compareText="−2 vs previous 7 days" />
          <AppStatsCard label="Total idling"        value="38h 40min"  compareText="+12% vs previous 7 days" />
          <AppStatsCard label="Total fuel"          value="5,430 kg"   compareText="−5% vs previous 7 days" />
          <AppStatsCard label="Average consumption" value="34.0/100km" compareText="+1% vs previous 7 days" />
          <AppStatsCard label="Total distance"      value="12,345 km"  compareText="+8% vs previous 7 days" />
        </div>
      </div>
    </section>

    <!-- ── Divider positions ───────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Divider positions</h2>
      <p class="ds-body">
        The <code>divider</code> prop controls which vertical borders are drawn.
        Using <code>"both"</code> (default) on every card in a row is the standard pattern —
        adjacent dividers share the same pixel and appear as a single line.
      </p>

      <div class="sc-divider-grid">
        <div class="sc-divider-item">
          <p class="sc-variant-label">both (default)</p>
          <div class="sc-demo-single">
            <AppStatsCard label="Total driving" value="142h 20min" divider="both" />
          </div>
        </div>
        <div class="sc-divider-item">
          <p class="sc-variant-label">right</p>
          <div class="sc-demo-single">
            <AppStatsCard label="Total driving" value="142h 20min" divider="right" />
          </div>
        </div>
        <div class="sc-divider-item">
          <p class="sc-variant-label">left</p>
          <div class="sc-demo-single">
            <AppStatsCard label="Total driving" value="142h 20min" divider="left" />
          </div>
        </div>
        <div class="sc-divider-item">
          <p class="sc-variant-label">none</p>
          <div class="sc-demo-single">
            <AppStatsCard label="Total driving" value="142h 20min" divider="none" />
          </div>
        </div>
      </div>
    </section>

    <!-- ── Props ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Props</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>label</code></td>
              <td><code>String</code></td>
              <td><code>''</code></td>
              <td>Stat label — the metric name shown above the value. Keep to 2–4 words.</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>String</code></td>
              <td><code>''</code></td>
              <td>Primary stat value displayed in large type (24 px). Format numbers before passing.</td>
            </tr>
            <tr>
              <td><code>compareText</code></td>
              <td><code>String</code></td>
              <td><code>''</code></td>
              <td>
                Optional comparison line shown below the value (e.g. <em>"+3% vs previous 7 days"</em>).
                When set, the card switches to the taller compare layout (88 px vs 74 px).
              </td>
            </tr>
            <tr>
              <td><code>divider</code></td>
              <td><code>'both' | 'right' | 'left' | 'none'</code></td>
              <td><code>'both'</code></td>
              <td>
                Controls which vertical 1 px divider lines are drawn. Use <code>'both'</code>
                for every card in a row — adjacent borders share the same pixel and read as one line.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Tokens ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Tokens</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Element</th><th>Property</th><th>Token</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>Card</td><td>Background</td><td><code>--grey-00</code></td><td>#ffffff</td></tr>
            <tr><td>Card</td><td>Padding (simple)</td><td>—</td><td>16px top · 11px bottom · 12px left · 16px right</td></tr>
            <tr><td>Card</td><td>Padding (compare)</td><td>—</td><td>8px vertical · 12px left · 16px right</td></tr>
            <tr><td>Card</td><td>Divider color</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
            <tr><td>Label</td><td>Font size</td><td>—</td><td>12 px</td></tr>
            <tr><td>Label</td><td>Font weight</td><td>—</td><td>500</td></tr>
            <tr><td>Label</td><td>Color</td><td><code>--grey-70</code></td><td>#6f7176</td></tr>
            <tr><td>Label</td><td>Letter spacing</td><td>—</td><td>0.25 px</td></tr>
            <tr><td>Value</td><td>Font size</td><td>—</td><td>24 px</td></tr>
            <tr><td>Value</td><td>Font weight</td><td>—</td><td>400</td></tr>
            <tr><td>Value</td><td>Color</td><td><code>--grey-90</code></td><td>#36383b</td></tr>
            <tr><td>Compare text</td><td>Font size</td><td>—</td><td>12 px</td></tr>
            <tr><td>Compare text</td><td>Font weight</td><td>—</td><td>500</td></tr>
            <tr><td>Compare text</td><td>Color</td><td><code>--grey-60</code></td><td>#9c9ea3</td></tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main    { max-width: none; margin: 0; padding: 48px 40px 80px; display: flex; flex-direction: column; gap: 56px; }
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead    { font-size: 16px; color: var(--grey-70); font-weight: 400; }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

@media (max-width: 768px) { .ds-main { padding: 32px 20px 60px; } }

/* Card row */
.sc-row {
  display: flex;
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20);
  border-radius: 4px;
  overflow: hidden;
}

/* Variant blocks */
.sc-variant-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sc-variant-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-50);
  margin: 0;
}

/* Divider demo */
.sc-divider-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 640px) {
  .sc-divider-grid { grid-template-columns: 1fr 1fr; }
}

.sc-divider-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sc-demo-single {
  display: flex;
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20);
  border-radius: 4px;
  overflow: hidden;
}

/* Code block */
.ds-code-block {
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
}
.ds-code-block pre { margin: 0; }
.ds-code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: var(--grey-90);
  line-height: 1.6;
}

/* Do / Don't */
.ds-usage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 640px) { .ds-usage-grid { grid-template-columns: 1fr; } }

.ds-usage-card {
  padding: 16px 20px;
  border-radius: 6px;
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20);
}
.ds-usage-card--do   { box-shadow: inset 0 0 0 1px var(--green-60); }
.ds-usage-card--dont { box-shadow: inset 0 0 0 1px var(--red-60); }

.ds-usage-card__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin: 0 0 10px;
}
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }

.ds-usage-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ds-usage-list li {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.5;
}

/* Tables */
.ds-table-wrap { overflow-x: auto; }
.ds-guide-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.ds-guide-table th {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-60);
  padding: 10px 12px;
  border-bottom: 1px solid var(--grey-20);
  background: var(--grey-05);
}
.ds-guide-table td {
  padding: 10px 12px;
  color: var(--grey-80);
  border-bottom: 1px solid var(--grey-10);
  line-height: 1.45;
  vertical-align: top;
}
.ds-guide-table tr:last-child td { border-bottom: none; }
.ds-guide-table tr:hover td { background: var(--grey-05); }
.ds-guide-table code {
  font-size: 11px;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  color: var(--grey-80);
  background: var(--grey-05);
  padding: 2px 5px;
  border-radius: 3px;
}
</style>
