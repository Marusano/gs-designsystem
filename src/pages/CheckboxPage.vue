<script setup>
const IconCheck = `<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconDash  = `<svg width="8" height="2" viewBox="0 0 8 2" fill="none"><path d="M0 1H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Checkbox</h1>
      <p class="ds-body">
        Checkboxes allow users to select one, some, or none of items from a list.
        They can be used standalone, in checkbox lists, or nested checkbox lists.
      </p>

      <!-- States -->
      <div class="ds-state-row">
        <div class="ds-state-cell">
          <div class="ds-cb"></div>
          <span class="ds-state-label">Default</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-cb ds-cb--hover"></div>
          <span class="ds-state-label">Hover</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-cb ds-cb--checked" v-html="IconCheck"></div>
          <span class="ds-state-label">Checked</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-cb ds-cb--partial" v-html="IconDash"></div>
          <span class="ds-state-label">Partial</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-cb ds-cb--disabled"></div>
          <span class="ds-state-label">Disabled</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-cb ds-cb--disabled ds-cb--checked" v-html="IconCheck"></div>
          <span class="ds-state-label">Disabled checked</span>
        </div>
      </div>

      <!-- Example -->
      <div class="ds-example-card">
        <p class="ds-example-label">Example</p>
        <div class="ds-field-list">
          <label class="ds-field-row">
            <div class="ds-cb ds-cb--checked" v-html="IconCheck"></div>
            <span class="ds-field-text">Remember me for 30 days</span>
          </label>
          <label class="ds-field-row">
            <div class="ds-cb"></div>
            <span class="ds-field-text">Send me all the promo emails</span>
          </label>
        </div>
      </div>

      <!-- Tokens -->
      <div class="ds-token-table">
        <div class="ds-token-row ds-token-row--head">
          <span>Token</span><span></span><span>Value</span><span>Usage</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">checkbox &amp; radio / color / main</code>
          <div class="ds-swatch" style="background:#9c9ea3"></div>
          <code class="ds-token-val">#9c9ea3</code>
          <span>Default border</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">checkbox &amp; radio / color / hover</code>
          <div class="ds-swatch" style="background:#6f7176"></div>
          <code class="ds-token-val">#6f7176</code>
          <span>Hover border</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">checkbox &amp; radio / color / selected</code>
          <div class="ds-swatch" style="background:#010028"></div>
          <code class="ds-token-val">#010028</code>
          <span>Checked &amp; partial fill</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">checkbox &amp; radio / color / disabled</code>
          <div class="ds-swatch" style="background:#d8d8da"></div>
          <code class="ds-token-val">#d8d8da</code>
          <span>Disabled fill / border</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">checkbox &amp; radio / size / sm</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">16 × 16 px</code>
          <span>Control size, border-radius 4px</span>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────── */
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
.ds-body { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

code {
  font-family: 'Roboto Mono', 'Courier New', monospace;
  font-size: 12px;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-80);
}

/* ── State row ───────────────────────────────────────────────── */
.ds-state-row {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  padding: 28px 24px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
}
.ds-state-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ds-state-label {
  font-size: 11px;
  color: var(--grey-50);
  white-space: nowrap;
  font-family: 'Roboto', sans-serif;
}

/* ── Example card ────────────────────────────────────────────── */
.ds-example-card {
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 8px;
  padding: 16px 20px;
}
.ds-example-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

/* ── Field list (checkbox rows) ──────────────────────────────── */
.ds-field-list { display: flex; flex-direction: column; gap: 12px; }
.ds-field-row  {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.ds-field-text { font-size: 14px; color: var(--grey-80); font-family: 'Roboto', sans-serif; }
.ds-field-text--disabled { color: var(--grey-40); }

/* ── Token table ─────────────────────────────────────────────── */
.ds-token-table {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}
.ds-token-row {
  display: grid;
  grid-template-columns: 2fr 24px 96px 1fr;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--grey-10);
  font-size: 13px;
  color: var(--grey-70);
  font-family: 'Roboto', sans-serif;
}
.ds-token-row:last-child { border-bottom: none; }
.ds-token-row--head {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .06em;
  background: var(--grey-05);
}
.ds-token-name { font-size: 12px; color: var(--grey-80); background: none; border: none; padding: 0; }
.ds-token-val  { font-size: 12px; color: var(--grey-60); background: none; border: none; padding: 0; }
.ds-swatch {
  width: 20px; height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,.08);
  flex-shrink: 0;
}
.ds-swatch--none { background: transparent; border: none; }

/* ── Checkbox ────────────────────────────────────────────────── */
.ds-cb {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid #9c9ea3;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  transition: border-color 100ms, background 100ms;
}
.ds-cb--hover   { border-color: #6f7176; }
.ds-cb--checked { background: #010028; border-color: #010028; }
.ds-cb--partial { background: #010028; border-color: #010028; }
.ds-cb--disabled { background: #f1f1f2; border-color: #d8d8da; cursor: not-allowed; }
.ds-cb--disabled.ds-cb--checked { background: #d8d8da; border-color: #d8d8da; }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-token-row { grid-template-columns: 1fr 24px 80px; }
  .ds-token-row > span:last-child { display: none; }
}
</style>
