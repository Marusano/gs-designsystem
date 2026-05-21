<script setup>
const IconCheck = `<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconDash  = `<svg width="8" height="2" viewBox="0 0 8 2" fill="none"><path d="M0 1H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
const IconBell  = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#5d6065" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#5d6065" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Elements</h1>
      <p class="ds-body">
        Foundational form controls and feedback indicators used throughout the GSFleet interface.
        Each element follows the shared <code>checkbox &amp; radio</code> and <code>toggle</code>
        token families for consistent colour, size, and interaction behaviour.
      </p>
    </section>

    <!-- ── Checkbox ───────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Checkbox</h2>
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

    <!-- ── Radio button ────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Radio button</h2>
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

      <!-- Tokens note -->
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

    <!-- ── Toggle ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Toggle</h2>
      <p class="ds-body">
        Toggle switches are digital on/off switches. They prompt users to choose between two
        mutually exclusive options and always have a default value. Toggles should provide
        immediate results, giving users the freedom to control their preferences as needed.
      </p>

      <!-- Size × state grid -->
      <div class="ds-toggle-grid">
        <span class="ds-tg-head"></span>
        <span class="ds-tg-head">Off</span>
        <span class="ds-tg-head">On</span>
        <span class="ds-tg-head">Disabled</span>

        <span class="ds-tg-size-label">S</span>
        <div class="ds-toggle ds-toggle--s ds-toggle--off"><div class="ds-toggle__thumb"></div></div>
        <div class="ds-toggle ds-toggle--s ds-toggle--on"><div class="ds-toggle__thumb"></div></div>
        <div class="ds-toggle ds-toggle--s ds-toggle--disabled"><div class="ds-toggle__thumb ds-toggle__thumb--dim"></div></div>

        <span class="ds-tg-size-label">M</span>
        <div class="ds-toggle ds-toggle--m ds-toggle--off"><div class="ds-toggle__thumb ds-toggle__thumb--m"></div></div>
        <div class="ds-toggle ds-toggle--m ds-toggle--on"><div class="ds-toggle__thumb ds-toggle__thumb--m"></div></div>
        <div class="ds-toggle ds-toggle--m ds-toggle--disabled"><div class="ds-toggle__thumb ds-toggle__thumb--m ds-toggle__thumb--dim"></div></div>
      </div>

      <!-- Size spec note -->
      <div class="ds-spec-note">
        <div class="ds-spec-note__item"><strong>S track</strong> 36 × 20 px · thumb 20 × 20 px · border-radius 10px</div>
        <div class="ds-spec-note__item"><strong>M track</strong> 36 × 20 px · thumb 16 × 16 px · border-radius 10px</div>
      </div>

      <!-- Tokens -->
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

    <!-- ── Notification bubble ─────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Notification bubble</h2>
      <p class="ds-body">
        A compact count indicator that sits on top of icons, avatars, or navigation items to
        signal pending notifications or unread items. Two variants: <strong>elevated</strong>
        (light blue, for white/light surfaces) and <strong>flat</strong> (dark, for dark or
        image surfaces).
      </p>

      <!-- Variants -->
      <div class="ds-state-row">
        <div class="ds-state-cell">
          <div class="ds-bubble ds-bubble--elevated">2</div>
          <span class="ds-state-label">Elevated</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-bubble ds-bubble--flat">2</div>
          <span class="ds-state-label">Flat</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-bubble ds-bubble--elevated">12</div>
          <span class="ds-state-label">Multi-digit</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-bubble ds-bubble--elevated ds-bubble--dot"></div>
          <span class="ds-state-label">Dot (elevated)</span>
        </div>
        <div class="ds-state-cell">
          <div class="ds-bubble ds-bubble--flat ds-bubble--dot"></div>
          <span class="ds-state-label">Dot (flat)</span>
        </div>
      </div>

      <!-- In-context example -->
      <div class="ds-example-card">
        <p class="ds-example-label">Example</p>
        <div class="ds-bubble-examples">
          <div class="ds-bubble-example">
            <div class="ds-icon-wrap">
              <span v-html="IconBell"></span>
              <div class="ds-bubble ds-bubble--elevated ds-bubble--sm">4</div>
            </div>
            <span class="ds-state-label">Icon + elevated</span>
          </div>
          <div class="ds-bubble-example">
            <div class="ds-icon-wrap">
              <div class="ds-avatar">AS</div>
              <div class="ds-bubble ds-bubble--flat ds-bubble--sm">7</div>
            </div>
            <span class="ds-state-label">Avatar + flat</span>
          </div>
          <div class="ds-bubble-example">
            <div class="ds-icon-wrap">
              <span v-html="IconBell"></span>
              <div class="ds-bubble ds-bubble--elevated ds-bubble--dot ds-bubble--sm-dot"></div>
            </div>
            <span class="ds-state-label">Icon + dot</span>
          </div>
        </div>
      </div>

      <!-- Tokens -->
      <div class="ds-token-table">
        <div class="ds-token-row ds-token-row--head">
          <span>Token</span><span></span><span>Value</span><span>Usage</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">blue-azure / 20</code>
          <div class="ds-swatch" style="background:#d7eff9"></div>
          <code class="ds-token-val">#d7eff9</code>
          <span>Elevated background</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">grey / 100</code>
          <div class="ds-swatch" style="background:#1f2124"></div>
          <code class="ds-token-val">#1f2124</code>
          <span>Flat background</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">font-color / body</code>
          <div class="ds-swatch" style="background:#36383b"></div>
          <code class="ds-token-val">#36383b</code>
          <span>Elevated text</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">font-color / title-strong</code>
          <div class="ds-swatch" style="background:#fff;border:1px solid #d8d8da"></div>
          <code class="ds-token-val">#ffffff</code>
          <span>Flat text</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">size</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">24 × 24 px</code>
          <span>Count bubble · border-radius 12px · Roboto SemiBold 14px</span>
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
.ds-h2  { font-size: 20px; font-weight: 600; color: var(--grey-90); }
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

/* ── Field list (checkbox / radio rows) ──────────────────────── */
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

/* ── Toggle ──────────────────────────────────────────────────── */
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
  font-family: 'Roboto', sans-serif;
}
.ds-tg-size-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--grey-60);
  font-family: 'Roboto', sans-serif;
}

/* Track */
.ds-toggle {
  position: relative;
  display: inline-block;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 150ms;
  flex-shrink: 0;
}
.ds-toggle--off      { background: #d8d8da; }
.ds-toggle--on       { background: #010028; }
.ds-toggle--disabled { background: #e6e6e7; cursor: not-allowed; }

/* S: 36px wide, thumb 20×20 */
.ds-toggle--s { width: 36px; }
.ds-toggle--s .ds-toggle__thumb { width: 20px; height: 20px; }
.ds-toggle--s.ds-toggle--off  .ds-toggle__thumb { left: 0; }
.ds-toggle--s.ds-toggle--on   .ds-toggle__thumb { left: 16px; }  /* 36-20 */
.ds-toggle--s.ds-toggle--disabled .ds-toggle__thumb { left: 0; }

/* M: 36px wide, thumb 16×16 */
.ds-toggle--m { width: 36px; }
.ds-toggle--m .ds-toggle__thumb { width: 16px; height: 16px; }
.ds-toggle--m.ds-toggle--off  .ds-toggle__thumb { left: 2px; }
.ds-toggle--m.ds-toggle--on   .ds-toggle__thumb { left: 18px; }  /* 36-16-2 */
.ds-toggle--m.ds-toggle--disabled .ds-toggle__thumb { left: 2px; }

/* Thumb */
.ds-toggle__thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.22);
  transition: left 150ms;
}
.ds-toggle__thumb--dim { background: #f0f0f1; box-shadow: none; }

/* Spec note */
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
  font-family: 'Roboto', sans-serif;
}
.ds-spec-note__item strong { color: var(--grey-80); font-weight: 600; margin-right: 4px; }

/* ── Notification bubble ─────────────────────────────────────── */
.ds-bubble {
  min-width: 24px;
  height: 24px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}
.ds-bubble--elevated { background: #d7eff9; color: #36383b; }
.ds-bubble--flat     { background: #1f2124; color: #fff; }
.ds-bubble--dot {
  min-width: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  padding: 0;
}
.ds-bubble--dot.ds-bubble--elevated { background: #d7eff9; }
.ds-bubble--dot.ds-bubble--flat     { background: #1f2124; }

/* in-context examples */
.ds-bubble-examples {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  align-items: flex-start;
}
.ds-bubble-example {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ds-icon-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* small bubble variant used on icons */
.ds-bubble--sm {
  position: absolute;
  top: -8px;
  right: -10px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  padding: 0 4px;
}
.ds-bubble--sm-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  padding: 0;
}

.ds-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e8f5ff;
  color: #0369a1;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-token-row { grid-template-columns: 1fr 24px 80px; }
  .ds-token-row > span:last-child { display: none; }
}
</style>
