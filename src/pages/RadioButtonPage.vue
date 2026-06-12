<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Radio button</h1>
      <p class="ds-body">
        Radio buttons allow users to select exactly one option from a set. Use them when
        the list of options is short and only a single selection is allowed at a time.
        They share the same colour token family as checkboxes.
      </p>

      <!-- States -->
      <div class="ds-state-row">
        <div class="ds-state-cell">
          <div class="ds-radio"></div>
          <span class="ds-state-label">Default</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-radio ds-radio--hover"></div>
          <span class="ds-state-label">Hover</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-radio ds-radio--checked"></div>
          <span class="ds-state-label">Checked</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-radio ds-radio--disabled"></div>
          <span class="ds-state-label">Disabled</span>
        </div>
      </div>

      <!-- Example -->
      <div class="ds-example-card">
        <p class="ds-example-label">Example</p>
        <div class="ds-field-list">
          <label class="ds-field-row">
            <div class="ds-radio"></div>
            <span class="ds-field-text">Option 1</span>
          </label>
          <label class="ds-field-row">
            <div class="ds-radio ds-radio--hover"></div>
            <span class="ds-field-text">Option 2 hover</span>
          </label>
          <label class="ds-field-row">
            <div class="ds-radio ds-radio--checked"></div>
            <span class="ds-field-text">Option 3 selected</span>
          </label>
          <label class="ds-field-row">
            <div class="ds-radio ds-radio--disabled"></div>
            <span class="ds-field-text ds-field-text--disabled">Option 4 disabled</span>
          </label>
        </div>
      </div>

      <!-- Tokens -->
      <div class="ds-token-table">
        <div class="ds-token-row ds-token-row--head">
          <span>Token</span><span></span><span>Value</span><span>Usage</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">checkbox &amp; radio / color / *</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">shared</code>
          <span>Same token family as checkbox</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">checkbox &amp; radio / size / md</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">18 × 18 px</code>
          <span>Control size, border-radius 50%</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">inner dot size</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">8 × 8 px</code>
          <span>Selected indicator dot</span>
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

/* ── Field list (radio rows) ─────────────────────────────────── */
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

/* ── Radio button ────────────────────────────────────────────── */
.ds-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #9c9ea3;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 100ms;
}
.ds-radio--hover   { border-color: #6f7176; }
.ds-radio--checked { border-color: #010028; }
.ds-radio--checked::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #010028;
}
.ds-radio--disabled {
  border-color: #d8d8da;
  background: #f1f1f2;
  cursor: not-allowed;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-token-row { grid-template-columns: 1fr 24px 80px; }
  .ds-token-row > span:last-child { display: none; }
}
</style>
