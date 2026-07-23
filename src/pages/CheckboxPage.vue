<script setup>
const IconCheck = `<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconDash  = `<svg width="8" height="2" viewBox="0 0 8 2" fill="none"><path d="M0 1H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Checkbox</h1>
      <p class="ds-lead">3 states · label support · group &amp; nested lists</p>
      <p class="ds-body">
        Checkboxes are used when there are multiple items to select in a list. Checkboxes allow
        users to select one, some, or none of items from a list. They can be used standalone, in
        checkbox lists, or nested checkbox lists.
      </p>
    </section>

    <!-- ── States ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction &amp; States</h2>
      <p class="ds-body">
        The checkbox input allows these states: unselected, selected, and indeterminate — each with
        a hover variant. The default view of a set of checkboxes is having no option selected.
      </p>
      <p class="ds-body">
        Use the <strong>indeterminate</strong> state when the checkbox contains a sublist of
        selections, some of which are selected and some unselected.
      </p>

      <!-- State strip -->
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
          <div class="ds-cb ds-cb--checked ds-cb--hover" v-html="IconCheck"></div>
          <span class="ds-state-label">Checked hover</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-cb ds-cb--partial" v-html="IconDash"></div>
          <span class="ds-state-label">Indeterminate</span>
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

      <!-- Interaction -->
      <div class="ds-interaction-grid">
        <div class="ds-interaction-card">
          <div class="ds-interaction-card__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 4.5l5 5.5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="4.5" r="1.5" fill="currentColor"/></svg>
          </div>
          <div>
            <strong class="ds-interaction-card__title">Mouse</strong>
            <p class="ds-body">
              Users can trigger an item by clicking the checkbox input directly or by clicking the
              checkbox label. Having both regions interactive creates a more accessible click target.
            </p>
          </div>
        </div>
        <div class="ds-interaction-card">
          <div class="ds-interaction-card__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="3" width="10" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 7h4M8 10h4M8 13h2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
          </div>
          <div>
            <strong class="ds-interaction-card__title">Keyboard</strong>
            <p class="ds-body">
              Users can navigate to and between checkbox inputs by pressing <kbd>Tab</kbd> or
              <kbd>Shift + Tab</kbd>. Users can trigger a state change by pressing
              <kbd>Space</kbd> while the checkbox input has focus.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Formatting ─────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">
        The checkbox component is built of a checkbox input and a checkbox label. If there is a
        group of checkboxes, a group label can be added. Checkbox labels are positioned to the
        right of their inputs.
      </p>

      <div class="ds-examples-grid">

        <div class="ds-example-card">
          <p class="ds-example-label">Standalone</p>
          <label class="ds-field-row">
            <div class="ds-cb ds-cb--checked" v-html="IconCheck"></div>
            <span class="ds-field-text">Remember me for 30 days</span>
          </label>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-label">Checkbox group</p>
          <div class="ds-field-group-label">Notification preferences</div>
          <div class="ds-field-list">
            <label class="ds-field-row">
              <div class="ds-cb ds-cb--checked" v-html="IconCheck"></div>
              <span class="ds-field-text">Email alerts</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-cb ds-cb--checked" v-html="IconCheck"></div>
              <span class="ds-field-text">SMS alerts</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-cb"></div>
              <span class="ds-field-text">Push notifications</span>
            </label>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-label">Nested list (indeterminate parent)</p>
          <div class="ds-field-list">
            <label class="ds-field-row">
              <div class="ds-cb ds-cb--partial" v-html="IconDash"></div>
              <span class="ds-field-text ds-field-text--strong">All regions</span>
            </label>
            <div class="ds-field-nested">
              <label class="ds-field-row">
                <div class="ds-cb ds-cb--checked" v-html="IconCheck"></div>
                <span class="ds-field-text">North</span>
              </label>
              <label class="ds-field-row">
                <div class="ds-cb ds-cb--checked" v-html="IconCheck"></div>
                <span class="ds-field-text">East</span>
              </label>
              <label class="ds-field-row">
                <div class="ds-cb"></div>
                <span class="ds-field-text">South</span>
              </label>
              <label class="ds-field-row">
                <div class="ds-cb"></div>
                <span class="ds-field-text">West</span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Usage ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">

        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Use when</p>
          <ul class="ds-usage-list">
            <li>
              <strong>Forms &amp; dialogs</strong> — can be used in forms on a full page, in modals, or menus.
            </li>
            <li>
              <strong>Filtering</strong> — used to filter data on a page, in a menu, or within a component. Also found in data tables for batch editing.
            </li>
            <li>
              <strong>Agreements</strong> — terms &amp; conditions, "Remember me", and similar toggles where the user explicitly opts in or out.
            </li>
            <li>
              <strong>Lists with sub-selections</strong> — used when there is a parent and child relationship. The parent checkbox makes a bulk selection; unchecking it deselects all children. Selecting children individually when the parent is unchecked triggers the indeterminate state.
            </li>
          </ul>
        </div>

        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Do not use when</p>
          <ul class="ds-usage-list">
            <li>
              <strong>Only one option can be selected</strong> — use radio buttons instead. Checkboxes allow multiple selections; radio buttons allow exactly one.
            </li>
          </ul>
        </div>

      </div>
    </section>

    <!-- ── Token reference ─────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
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
          <span>Checked &amp; indeterminate fill</span>
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
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1   { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2   { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead { font-size: 16px; color: var(--grey-70); margin-top: -8px; }
.ds-body { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-80);
}

kbd {
  font-family: 'Inter', monospace;
  font-size: 12px;
  font-weight: 500;
  background: var(--grey-10);
  border: 1px solid var(--grey-30);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--grey-80);
}

/* ── State strip ─────────────────────────────────────────────── */
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
}

/* ── Interaction cards ───────────────────────────────────────── */
.ds-interaction-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-interaction-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.ds-interaction-card__icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey-70);
  margin-top: 1px;
}
.ds-interaction-card__title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--grey-90);
  margin-bottom: 6px;
}

/* ── Formatting examples ─────────────────────────────────────── */
.ds-examples-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.ds-example-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.ds-example-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .06em;
}
.ds-field-group-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--grey-70);
  margin-bottom: -4px;
}
.ds-field-list { display: flex; flex-direction: column; gap: 12px; }
.ds-field-nested {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 24px;
  border-left: 2px solid var(--grey-10);
  margin-left: 7px;
}
.ds-field-row {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.ds-field-text          { font-size: 14px; color: var(--grey-80); }
.ds-field-text--strong  { font-size: 14px; font-weight: 500; color: var(--grey-90); }
.ds-field-text--disabled { color: var(--grey-40); }

/* ── Usage cards ─────────────────────────────────────────────── */
.ds-usage-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 16px; }
.ds-usage-card {
  padding: 20px;
  border-radius: 8px;
  border-top: 3px solid;
  background: #fff;
  border-left: 1px solid var(--grey-20);
  border-right: 1px solid var(--grey-20);
  border-bottom: 1px solid var(--grey-20);
}
.ds-usage-card--do   { border-top-color: var(--green-60); }
.ds-usage-card--dont { border-top-color: var(--red-60); }

.ds-usage-card__label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 14px;
}
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }

.ds-usage-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ds-usage-list li {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 1.55;
  padding-left: 14px;
  position: relative;
}
.ds-usage-list li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--grey-40);
  font-weight: 700;
}
.ds-usage-list li strong { color: var(--grey-90); font-weight: 600; }

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
.ds-cb--checked.ds-cb--hover { background: #36383b; border-color: #36383b; }
.ds-cb--partial { background: #010028; border-color: #010028; }
.ds-cb--disabled { background: #f1f1f2; border-color: #d8d8da; cursor: not-allowed; }
.ds-cb--disabled.ds-cb--checked { background: #d8d8da; border-color: #d8d8da; }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-examples-grid { grid-template-columns: 1fr; }
  .ds-interaction-grid { grid-template-columns: 1fr; }
  .ds-usage-grid { grid-template-columns: 1fr; }
  .ds-token-row { grid-template-columns: 1fr 24px 80px; }
  .ds-token-row > span:last-child { display: none; }
}
</style>
