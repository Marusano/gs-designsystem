<script setup>
import AppDataCard from '../components/ui/AppDataCard.vue'
</script>

<template>
  <div class="dcp">

    <!-- ─── Header ──────────────────────────────────────────────── -->
    <div class="dcp__header">
      <h1 class="dcp__title">Data Card</h1>
      <p class="dcp__desc">
        Compact KPI tiles that communicate a single metric with a semantic severity bar.
        Used in dashboard rows, fleet summaries, and driver compliance panels.
        The severity bar fills left-to-right and changes color to reflect urgency.
      </p>
    </div>

    <!-- ─── Types ───────────────────────────────────────────────── -->
    <section class="dcp__section">
      <h2 class="dcp__section-title">Types</h2>
      <p class="dcp__section-desc">
        Five semantic types. <code>plain</code> has no severity bar.
        All others show a 12px bar at the bottom whose fill width is controlled by <code>barPercent</code>.
      </p>

      <div class="dcp__type-grid">

        <div class="dcp__type-item">
          <span class="dcp__type-label">plain</span>
          <AppDataCard
            label="Label here"
            value="Data here"
            type="plain"
          />
          <p class="dcp__type-desc">No bar. Use for non-critical metrics or display-only values.</p>
        </div>

        <div class="dcp__type-item">
          <span class="dcp__type-label">success</span>
          <AppDataCard
            label="Time until break"
            value="6h 30min"
            type="success"
            :bar-percent="89"
          />
          <p class="dcp__type-desc">Positive. Plenty of time or quota remaining.</p>
        </div>

        <div class="dcp__type-item">
          <span class="dcp__type-label">warning</span>
          <AppDataCard
            label="Time until break"
            value="6h 30min"
            type="warning"
            :bar-percent="42"
          />
          <p class="dcp__type-desc">Caution. Approaching a threshold — act soon.</p>
        </div>

        <div class="dcp__type-item">
          <span class="dcp__type-label">danger</span>
          <AppDataCard
            label="Time until break"
            value="3h 30min"
            type="danger"
            :bar-percent="16"
          />
          <p class="dcp__type-desc">Critical. Near or at the limit — action required.</p>
        </div>

        <div class="dcp__type-item">
          <span class="dcp__type-label">overlimit</span>
          <AppDataCard
            label="Time until break"
            value="3h 30min over limit"
            type="overlimit"
            :bar-percent="6"
          />
          <p class="dcp__type-desc">Exceeded. Card background turns red — limit breached.</p>
        </div>

      </div>
    </section>

    <!-- ─── States ──────────────────────────────────────────────── -->
    <section class="dcp__section">
      <h2 class="dcp__section-title">States</h2>
      <p class="dcp__section-desc">
        Hover adds a 2px border (<code>--grey-40</code>). Use <code>forcedState="hover"</code> to preview it in docs.
      </p>

      <div class="dcp__state-row">
        <div class="dcp__state-item">
          <span class="dcp__row-label">Default</span>
          <AppDataCard label="Time until break" value="6h 30min" type="success" :bar-percent="89" />
        </div>
        <div class="dcp__state-item">
          <span class="dcp__row-label">Hover</span>
          <AppDataCard label="Time until break" value="6h 30min" type="success" :bar-percent="89" forced-state="hover" />
        </div>
        <div class="dcp__state-item">
          <span class="dcp__row-label">Plain · default</span>
          <AppDataCard label="Label here" value="Data here" type="plain" />
        </div>
        <div class="dcp__state-item">
          <span class="dcp__row-label">Plain · hover</span>
          <AppDataCard label="Label here" value="Data here" type="plain" forced-state="hover" />
        </div>
      </div>
    </section>

    <!-- ─── Usage ────────────────────────────────────────────────── -->
    <section class="dcp__section">
      <h2 class="dcp__section-title">Usage · real-world example</h2>
      <p class="dcp__section-desc">
        A typical fleet dashboard row shows four to six cards side by side. The bar fills convey relative urgency at a glance.
      </p>

      <div class="dcp__usage-row">
        <AppDataCard label="Total driving time" value="8h 12min" type="danger"   :bar-percent="12" />
        <AppDataCard label="Time until break"   value="6h 30min" type="success"  :bar-percent="89" />
        <AppDataCard label="Remaining quota"    value="2h 15min" type="warning"  :bar-percent="37" />
        <AppDataCard label="Weekly hours"       value="38h 00min over limit" type="overlimit" :bar-percent="4" />
        <AppDataCard label="Violations today"   value="0"        type="plain" />
      </div>
    </section>

    <!-- ─── Props ────────────────────────────────────────────────── -->
    <section class="dcp__section">
      <h2 class="dcp__section-title">Props</h2>

      <div class="dcp__table-wrap">
        <table class="dcp__props-table">
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
              <td><code>label</code></td>
              <td>String</td>
              <td>—</td>
              <td>Card label (top line, required)</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td>String</td>
              <td>—</td>
              <td>Metric value (bottom line, required)</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>String</td>
              <td><code>'plain'</code></td>
              <td><code>plain</code> · <code>success</code> · <code>warning</code> · <code>danger</code> · <code>overlimit</code></td>
            </tr>
            <tr>
              <td><code>barPercent</code></td>
              <td>Number</td>
              <td><code>0</code></td>
              <td>Severity bar fill width, 0–100. Ignored when <code>type</code> is <code>'plain'</code>.</td>
            </tr>
            <tr>
              <td><code>forcedState</code></td>
              <td>String</td>
              <td><code>null</code></td>
              <td><code>'hover'</code> — doc-only forced state.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ─── Color tokens ─────────────────────────────────────────── -->
    <section class="dcp__section">
      <h2 class="dcp__section-title">Color tokens</h2>

      <div class="dcp__tokens">

        <div class="dcp__token-group">
          <h3 class="dcp__token-group-title">Card backgrounds</h3>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--grey-05); box-shadow: inset 0 0 0 1px var(--grey-20);"></span>
            <code class="dcp__token-name">--grey-05</code>
            <span class="dcp__token-desc">Default body</span>
          </div>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--red-20);"></span>
            <code class="dcp__token-name">--red-20</code>
            <span class="dcp__token-desc">Overlimit body</span>
          </div>
        </div>

        <div class="dcp__token-group">
          <h3 class="dcp__token-group-title">Value text</h3>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--grey-90);"></span>
            <code class="dcp__token-name">--grey-90</code>
            <span class="dcp__token-desc">plain · success</span>
          </div>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--yellow-100);"></span>
            <code class="dcp__token-name">--yellow-100</code>
            <span class="dcp__token-desc">warning</span>
          </div>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--red-80);"></span>
            <code class="dcp__token-name">--red-80</code>
            <span class="dcp__token-desc">danger · overlimit</span>
          </div>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--grey-70);"></span>
            <code class="dcp__token-name">--grey-70</code>
            <span class="dcp__token-desc">Label (all types)</span>
          </div>
        </div>

        <div class="dcp__token-group">
          <h3 class="dcp__token-group-title">Severity bar</h3>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--grey-10);"></span>
            <code class="dcp__token-name">--grey-10</code>
            <span class="dcp__token-desc">Track · default types</span>
          </div>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--red-30);"></span>
            <code class="dcp__token-name">--red-30</code>
            <span class="dcp__token-desc">Track · overlimit</span>
          </div>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--green-40);"></span>
            <code class="dcp__token-name">--green-40</code>
            <span class="dcp__token-desc">Fill · success</span>
          </div>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--yellow-40);"></span>
            <code class="dcp__token-name">--yellow-40</code>
            <span class="dcp__token-desc">Fill · warning</span>
          </div>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--red-50);"></span>
            <code class="dcp__token-name">--red-50</code>
            <span class="dcp__token-desc">Fill · danger · overlimit</span>
          </div>
        </div>

        <div class="dcp__token-group">
          <h3 class="dcp__token-group-title">Hover border</h3>
          <div class="dcp__token-row">
            <span class="dcp__token-swatch" style="background: var(--grey-40);"></span>
            <code class="dcp__token-name">--grey-40</code>
            <span class="dcp__token-desc">2px inset box-shadow on hover</span>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.dcp {
  padding: 48px 40px 80px;
  max-width: 1100px;
}

.dcp__header {
  margin-bottom: 40px;
}

.dcp__title {
  font-size: 32px;
  font-weight: 700;
  color: var(--grey-100);
  line-height: 1.1;
  margin-bottom: 4px;
}

.dcp__desc {
  font-size: 16px;
  color: var(--grey-70);
  line-height: 1.6;
  max-width: 680px;
}

.dcp__section {
  margin-bottom: 48px;
}

.dcp__section-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--grey-50);
  margin-bottom: 8px;
}

.dcp__section-desc {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 18px;
  margin-bottom: 16px;
}

.dcp__section-desc code {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 4px;
  border-radius: 3px;
  color: var(--grey-90);
}

/* ─── Types grid ─────────────────────────────────────────────── */
.dcp__type-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.dcp__type-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dcp__type-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--grey-60);
}

.dcp__type-desc {
  font-size: 12px;
  color: var(--grey-70);
  max-width: 192px;
  line-height: 1.5;
}

/* ─── States row ─────────────────────────────────────────────── */
.dcp__state-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.dcp__state-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dcp__row-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--grey-60);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ─── Usage row ──────────────────────────────────────────────── */
.dcp__usage-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* ─── Props table ────────────────────────────────────────────── */
.dcp__table-wrap {
  overflow-x: auto;
}

.dcp__props-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
}

.dcp__props-table th {
  text-align: left;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-60);
  border-bottom: 1px solid var(--grey-20);
}

.dcp__props-table td {
  padding: 10px 12px;
  color: var(--grey-80);
  border-bottom: 1px solid var(--grey-10);
  vertical-align: top;
}

.dcp__props-table td:first-child {
  white-space: nowrap;
}

.dcp__props-table code {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 4px;
  border-radius: 3px;
  color: var(--grey-90);
}

/* ─── Token docs ─────────────────────────────────────────────── */
.dcp__tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.dcp__token-group {
  min-width: 260px;
}

.dcp__token-group-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--grey-60);
  margin-bottom: 10px;
}

.dcp__token-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.dcp__token-swatch {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  flex-shrink: 0;
}

.dcp__token-name {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 12px;
  color: var(--grey-90);
  background: var(--grey-10);
  padding: 2px 6px;
  border-radius: 3px;
  flex-shrink: 0;
}

.dcp__token-desc {
  font-size: 13px;
  color: var(--grey-70);
}
</style>
