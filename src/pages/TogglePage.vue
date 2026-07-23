<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Toggle</h1>
      <p class="ds-lead">2 sizes · on / off / disabled · label &amp; state text</p>
      <p class="ds-body">
        Toggle switches are digital on/off switches. They prompt users to choose between two
        mutually exclusive options and always have a default value. Toggles should provide
        immediate results, giving users the freedom to control their preferences as needed.
      </p>
    </section>

    <!-- ── Interaction & States ───────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction &amp; States</h2>
      <p class="ds-body">
        Toggle has two main states: on and off, plus a disabled state. The toggle component is
        triggered on click, switching between "on" and "off". It also has a visible focus state
        when selected, ensuring keyboard accessibility.
      </p>

      <!-- Size × state grid -->
      <div class="ds-toggle-grid">
        <span class="ds-tg-head"></span>
        <span class="ds-tg-head">Off</span>
        <span class="ds-tg-head">On</span>
        <span class="ds-tg-head">Disabled</span>

        <span class="ds-tg-size-label">sm</span>
        <div class="ds-toggle ds-toggle--sm ds-toggle--off"><div class="ds-toggle__thumb"></div></div>
        <div class="ds-toggle ds-toggle--sm ds-toggle--on"><div class="ds-toggle__thumb"></div></div>
        <div class="ds-toggle ds-toggle--sm ds-toggle--disabled"><div class="ds-toggle__thumb ds-toggle__thumb--dim"></div></div>

        <span class="ds-tg-size-label">md</span>
        <div class="ds-toggle ds-toggle--md ds-toggle--off"><div class="ds-toggle__thumb ds-toggle__thumb--md"></div></div>
        <div class="ds-toggle ds-toggle--md ds-toggle--on"><div class="ds-toggle__thumb ds-toggle__thumb--md"></div></div>
        <div class="ds-toggle ds-toggle--md ds-toggle--disabled"><div class="ds-toggle__thumb ds-toggle__thumb--md ds-toggle__thumb--dim"></div></div>
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
              Toggle has two clickable areas: the toggle switch itself and the label associated
              with it. Users can click either area to change the toggle's state.
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
              Users can focus the toggle using <kbd>Tab</kbd>, providing a visible focus ring.
              Pressing <kbd>Enter</kbd> or <kbd>Space</kbd> changes the toggle's state between
              "on" and "off".
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Formatting ─────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">
        The toggle component is available in two sizes: medium and small. Both sizes are comprised
        of a label text, a toggle button, and a state text. Default toggles are required to display
        a label and state text; for the small toggle both elements are optional depending on the
        use case.
      </p>
      <p class="ds-body">
        Use <strong>adjectives</strong> rather than verbs to describe the state of the object
        affected (e.g. "Active" not "Activate", "Enabled" not "Enable").
      </p>

      <div class="ds-examples-grid">

        <div class="ds-example-card">
          <p class="ds-example-label">MD — label + state text (required)</p>
          <div class="ds-toggle-row-list">
            <div class="ds-toggle-row">
              <span class="ds-toggle-label">Email notifications</span>
              <div class="ds-toggle ds-toggle--md ds-toggle--on"><div class="ds-toggle__thumb ds-toggle__thumb--md"></div></div>
              <span class="ds-state-text ds-state-text--on">On</span>
            </div>
            <div class="ds-toggle-row">
              <span class="ds-toggle-label">SMS alerts</span>
              <div class="ds-toggle ds-toggle--md ds-toggle--off"><div class="ds-toggle__thumb ds-toggle__thumb--md"></div></div>
              <span class="ds-state-text ds-state-text--off">Off</span>
            </div>
            <div class="ds-toggle-row">
              <span class="ds-toggle-label ds-toggle-label--disabled">Push notifications</span>
              <div class="ds-toggle ds-toggle--md ds-toggle--disabled"><div class="ds-toggle__thumb ds-toggle__thumb--md ds-toggle__thumb--dim"></div></div>
              <span class="ds-state-text ds-state-text--disabled">Off</span>
            </div>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-label">SM — label &amp; state text optional</p>
          <div class="ds-toggle-row-list">
            <div class="ds-toggle-row">
              <span class="ds-toggle-label">Dark mode</span>
              <div class="ds-toggle ds-toggle--sm ds-toggle--on"><div class="ds-toggle__thumb"></div></div>
              <span class="ds-state-text ds-state-text--on">Active</span>
            </div>
            <div class="ds-toggle-row">
              <span class="ds-toggle-label">Compact view</span>
              <div class="ds-toggle ds-toggle--sm ds-toggle--off"><div class="ds-toggle__thumb"></div></div>
              <span class="ds-state-text ds-state-text--off">Inactive</span>
            </div>
            <div class="ds-toggle-row ds-toggle-row--icon-only">
              <div class="ds-toggle ds-toggle--sm ds-toggle--on"><div class="ds-toggle__thumb"></div></div>
            </div>
          </div>
          <p class="ds-example-sublabel">Last row: SM without label or state text</p>
        </div>

      </div>

      <!-- Size spec -->
      <div class="ds-spec-note">
        <div class="ds-spec-note__item"><strong>sm</strong> container 36 × 20 px · track 36 × 14 px · thumb 20 × 20 px</div>
        <div class="ds-spec-note__item"><strong>md</strong> container 36 × 20 px · track 36 × 20 px · thumb 16 × 16 px</div>
      </div>
    </section>

    <!-- ── Usage ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">

        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Use when</p>
          <ul class="ds-usage-list">
            <li>Turning a single option on or off that affects the system or page settings.</li>
            <li>Ideal for settings or preferences that can be <strong>immediately applied</strong>.</li>
            <li>Recommended for actions where the change is <strong>reversible</strong> without additional confirmation.</li>
          </ul>
        </div>

        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Do not use when</p>
          <ul class="ds-usage-list">
            <li>The action requires <strong>confirmation</strong> before applying (e.g. deleting a file).</li>
            <li>There are <strong>more than two options</strong> — use a dropdown, radio button, or checkbox instead.</li>
            <li>The setting is <strong>not binary</strong> or doesn't provide instant application — use a checkbox, button, or combination.</li>
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
          <code class="ds-token-name">toggle / color / main</code>
          <div class="ds-swatch" style="background:#d8d8da"></div>
          <code class="ds-token-val">#d8d8da</code>
          <span>Off track</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">toggle / color / selected</code>
          <div class="ds-swatch" style="background:#010028"></div>
          <code class="ds-token-val">#010028</code>
          <span>On track</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">toggle / color / disabled</code>
          <div class="ds-swatch" style="background:#e6e6e7"></div>
          <code class="ds-token-val">#e6e6e7</code>
          <span>Disabled track</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">toggle / size / md</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">20 px</code>
          <span>Track height (both sizes)</span>
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

/* ── States grid ─────────────────────────────────────────────── */
.ds-toggle-grid {
  display: grid;
  grid-template-columns: 36px repeat(3, 1fr);
  align-items: center;
  gap: 16px 32px;
  padding: 28px 24px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
}
.ds-tg-head {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .06em;
}
.ds-tg-size-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--grey-60);
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
.ds-examples-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.ds-example-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ds-example-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .06em;
}
.ds-example-sublabel {
  font-size: 12px;
  color: var(--grey-50);
  font-style: italic;
  margin-top: -4px;
}

/* Toggle row: label — switch — state text */
.ds-toggle-row-list { display: flex; flex-direction: column; gap: 14px; }
.ds-toggle-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ds-toggle-row--icon-only { margin-top: 4px; }
.ds-toggle-label {
  flex: 1;
  font-size: 14px;
  color: var(--grey-80);
  min-width: 0;
}
.ds-toggle-label--disabled { color: var(--grey-40); }
.ds-state-text {
  font-size: 13px;
  font-weight: 500;
  min-width: 44px;
}
.ds-state-text--on       { color: var(--grey-90); }
.ds-state-text--off      { color: var(--grey-50); }
.ds-state-text--disabled { color: var(--grey-40); }

/* ── Spec note ───────────────────────────────────────────────── */
.ds-spec-note {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding: 12px 16px;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 6px;
  font-size: 13px;
  color: var(--grey-60);
}
.ds-spec-note__item strong { color: var(--grey-80); font-weight: 600; margin-right: 4px; }

/* ── Usage cards ─────────────────────────────────────────────── */
.ds-usage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
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

/* ── Toggle ──────────────────────────────────────────────────── */
.ds-toggle {
  position: relative;
  display: inline-block;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  flex-shrink: 0;
}
.ds-toggle--disabled { cursor: not-allowed; }

/* sm: transparent container, ::before draws 14px track */
.ds-toggle--sm { width: 36px; background: transparent; }
.ds-toggle--sm::before {
  content: '';
  position: absolute;
  left: 0; right: 0;
  top: 3px; bottom: 3px;
  border-radius: 7px;
  transition: background 150ms;
}
.ds-toggle--sm.ds-toggle--off::before      { background: #d8d8da; }
.ds-toggle--sm.ds-toggle--on::before       { background: #010028; }
.ds-toggle--sm.ds-toggle--disabled::before { background: #e6e6e7; }

.ds-toggle--sm .ds-toggle__thumb            { width: 20px; height: 20px; }
.ds-toggle--sm.ds-toggle--off  .ds-toggle__thumb { left: 0; }
.ds-toggle--sm.ds-toggle--on   .ds-toggle__thumb { left: 16px; }
.ds-toggle--sm.ds-toggle--disabled .ds-toggle__thumb { left: 0; }

/* md: full 20px track */
.ds-toggle--md { width: 36px; }
.ds-toggle--md.ds-toggle--off      { background: #d8d8da; }
.ds-toggle--md.ds-toggle--on       { background: #010028; }
.ds-toggle--md.ds-toggle--disabled { background: #e6e6e7; }

.ds-toggle__thumb--md               { width: 16px; height: 16px; }
.ds-toggle--md.ds-toggle--off  .ds-toggle__thumb { left: 2px; }
.ds-toggle--md.ds-toggle--on   .ds-toggle__thumb { left: 18px; }
.ds-toggle--md.ds-toggle--disabled .ds-toggle__thumb { left: 2px; }

/* Thumb base */
.ds-toggle__thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.22);
  transition: left 150ms;
  z-index: 1;
}
.ds-toggle__thumb--dim { background: #f0f0f1; box-shadow: none; }

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
