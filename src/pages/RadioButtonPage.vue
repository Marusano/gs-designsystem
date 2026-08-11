<script setup>
import { ref } from 'vue'
import AppRadio from '../components/ui/AppRadio.vue'

const demoFleet = ref('gps')
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Radio button</h1>
      <p class="ds-lead">Single selection · mutually exclusive choices</p>
      <p class="ds-body">
        Use radio buttons when you have a group of mutually exclusive choices and only one selection
        from the group is allowed. Only one radio button can be selected at a time. When a user
        chooses a new item, the previous choice is automatically deselected.
      </p>
    </section>

    <!-- ── Component demo ────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component Usage</h2>
      <p class="ds-body">Select a tracking method — only one option can be active at a time.</p>
      <div class="ds-card ds-demo-row">
        <AppRadio v-model="demoFleet" value="gps"      label="GPS tracking"      name="demo-fleet" />
        <AppRadio v-model="demoFleet" value="cellular" label="Cellular tracking"  name="demo-fleet" />
        <AppRadio v-model="demoFleet" value="manual"   label="Manual entry"       name="demo-fleet" />
        <AppRadio v-model="demoFleet" value="disabled" label="Satellite (unavailable)" name="demo-fleet" :disabled="true" />
      </div>
    </section>

    <!-- ── Interaction & States ───────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction &amp; States</h2>
      <p class="ds-body">
        The radio button input allows for two states: unselected and selected — each with a hover
        variant. The default view of a radio button group is having no option preselected. Only one
        radio button should be selected at a time; when a user chooses a new item, the previous
        choice is automatically deselected.
      </p>

      <!-- State strip -->
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
          <span class="ds-state-label">Selected</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-radio ds-radio--checked ds-radio--hover"></div>
          <span class="ds-state-label">Selected hover</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-radio ds-radio--disabled"></div>
          <span class="ds-state-label">Disabled</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-radio ds-radio--disabled ds-radio--checked"></div>
          <span class="ds-state-label">Disabled selected</span>
        </div>
      </div>

      <!-- Interaction cards -->
      <div class="ds-interaction-grid">
        <div class="ds-interaction-card">
          <div class="ds-interaction-card__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 4.5l5 5.5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="4.5" r="1.5" fill="currentColor"/></svg>
          </div>
          <div>
            <strong class="ds-interaction-card__title">Mouse</strong>
            <p class="ds-body">
              Users can trigger an item by clicking the radio button input directly or by clicking
              the radio button label. Having both regions interactive creates a more accessible
              click target.
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
              By default, no option is preselected. Users can navigate between radio inputs using
              <kbd>↑</kbd> <kbd>↓</kbd> arrow keys (or <kbd>←</kbd> <kbd>→</kbd> for horizontal
              layout). If landing on an unselected group, press <kbd>Space</kbd> to select the
              focused button, or press an arrow key to move and select the next one.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Formatting ─────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">
        The radio button component is built of a set of clickable circles (the inputs) with text
        labels positioned to the right. If there is a group of radio buttons, a group label can
        be added. They can be laid out vertically or horizontally depending on the use case and
        the structure of the UI.
      </p>

      <div class="ds-examples-grid">

        <div class="ds-example-card">
          <p class="ds-example-label">Vertical group</p>
          <div class="ds-field-group-label">Assign to region</div>
          <div class="ds-field-list">
            <label class="ds-field-row">
              <div class="ds-radio"></div>
              <span class="ds-field-text">North</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-radio ds-radio--checked"></div>
              <span class="ds-field-text">East</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-radio"></div>
              <span class="ds-field-text">South</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-radio ds-radio--disabled"></div>
              <span class="ds-field-text ds-field-text--disabled">West (unavailable)</span>
            </label>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-label">Horizontal group</p>
          <div class="ds-field-group-label">View mode</div>
          <div class="ds-field-list ds-field-list--horizontal">
            <label class="ds-field-row">
              <div class="ds-radio ds-radio--checked"></div>
              <span class="ds-field-text">List</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-radio"></div>
              <span class="ds-field-text">Map</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-radio"></div>
              <span class="ds-field-text">Timeline</span>
            </label>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-label">Settings context</p>
          <div class="ds-field-group-label">Report frequency</div>
          <div class="ds-field-list">
            <label class="ds-field-row">
              <div class="ds-radio"></div>
              <span class="ds-field-text">Daily</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-radio ds-radio--checked"></div>
              <span class="ds-field-text">Weekly</span>
            </label>
            <label class="ds-field-row">
              <div class="ds-radio"></div>
              <span class="ds-field-text">Monthly</span>
            </label>
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
              <strong>Forms</strong> — can be used in data tables, cards, modals, side panels, and in forms on full pages.
            </li>
            <li>
              <strong>Settings</strong> — used to change from one setting to another in a menu, page, or component. Can act as a filtering mechanism when only a single option is supported.
            </li>
          </ul>
        </div>

        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Do not use when</p>
          <ul class="ds-usage-list">
            <li>
              <strong>Multiple selections are allowed</strong> — use checkboxes instead. Radio buttons allow the user to select only one item in a set whereas checkboxes allow the user to select multiple items.
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
          <span>Selected border &amp; inner dot</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">checkbox &amp; radio / color / disabled</code>
          <div class="ds-swatch" style="background:#d8d8da"></div>
          <code class="ds-token-val">#d8d8da</code>
          <span>Disabled border &amp; fill</span>
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
.ds-card      { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-demo-row  { display: flex; flex-direction: column; gap: 12px; }

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
.ds-examples-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
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
.ds-field-list--horizontal { flex-direction: row; flex-wrap: wrap; gap: 16px; }
.ds-field-row {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.ds-field-text           { font-size: 14px; color: var(--grey-80); }
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
.ds-radio--hover { border-color: #6f7176; }
.ds-radio--checked { border-color: #010028; }
.ds-radio--checked::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #010028;
}
.ds-radio--checked.ds-radio--hover { border-color: #36383b; }
.ds-radio--checked.ds-radio--hover::after { background: #36383b; }
.ds-radio--disabled {
  border-color: #d8d8da;
  background: #f1f1f2;
  cursor: not-allowed;
}
.ds-radio--disabled.ds-radio--checked::after {
  background: #d8d8da;
}

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
