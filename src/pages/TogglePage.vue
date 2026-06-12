<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Toggle</h1>
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

        <span class="ds-tg-size-label">sm</span>
        <div class="ds-toggle ds-toggle--sm ds-toggle--off"><div class="ds-toggle__thumb"></div></div>
        <div class="ds-toggle ds-toggle--sm ds-toggle--on"><div class="ds-toggle__thumb"></div></div>
        <div class="ds-toggle ds-toggle--sm ds-toggle--disabled"><div class="ds-toggle__thumb ds-toggle__thumb--dim"></div></div>

        <span class="ds-tg-size-label">md</span>
        <div class="ds-toggle ds-toggle--md ds-toggle--off"><div class="ds-toggle__thumb ds-toggle__thumb--md"></div></div>
        <div class="ds-toggle ds-toggle--md ds-toggle--on"><div class="ds-toggle__thumb ds-toggle__thumb--md"></div></div>
        <div class="ds-toggle ds-toggle--md ds-toggle--disabled"><div class="ds-toggle__thumb ds-toggle__thumb--md ds-toggle__thumb--dim"></div></div>
      </div>

      <!-- Size spec note -->
      <div class="ds-spec-note">
        <div class="ds-spec-note__item"><strong>sm</strong> container 36 × 20 px · base (track) 36 × 14 px · thumb 20 × 20 px</div>
        <div class="ds-spec-note__item"><strong>md</strong> container 36 × 20 px · base (track) 36 × 20 px · thumb 16 × 16 px</div>
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

/* Track wrapper — both sizes share base rules */
.ds-toggle {
  position: relative;
  display: inline-block;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  flex-shrink: 0;
}
.ds-toggle--disabled { cursor: not-allowed; }

/* ── sm: 36px wide, base (track) 14px tall via ::before ── */
/* container is transparent; ::before draws the 14px coloured track */
.ds-toggle--sm { width: 36px; background: transparent; }
.ds-toggle--sm::before {
  content: '';
  position: absolute;
  left: 0; right: 0;
  top: 3px; bottom: 3px;   /* 20px - 3 - 3 = 14px */
  border-radius: 7px;
  transition: background 150ms;
}
.ds-toggle--sm.ds-toggle--off::before      { background: #d8d8da; }
.ds-toggle--sm.ds-toggle--on::before       { background: #010028; }
.ds-toggle--sm.ds-toggle--disabled::before { background: #e6e6e7; }

/* sm thumb: 20×20 — overhangs the 14px track by 3px top & bottom */
.ds-toggle--sm .ds-toggle__thumb            { width: 20px; height: 20px; }
.ds-toggle--sm.ds-toggle--off  .ds-toggle__thumb { left: 0; }
.ds-toggle--sm.ds-toggle--on   .ds-toggle__thumb { left: 16px; }   /* 36-20 */
.ds-toggle--sm.ds-toggle--disabled .ds-toggle__thumb { left: 0; }

/* ── md: 36px wide, base (track) full 20px ── */
.ds-toggle--md { width: 36px; }
.ds-toggle--md.ds-toggle--off      { background: #d8d8da; }
.ds-toggle--md.ds-toggle--on       { background: #010028; }
.ds-toggle--md.ds-toggle--disabled { background: #e6e6e7; }

/* md thumb: 16×16 inset 2px from each edge */
.ds-toggle__thumb--md               { width: 16px; height: 16px; }
.ds-toggle--md.ds-toggle--off  .ds-toggle__thumb { left: 2px; }
.ds-toggle--md.ds-toggle--on   .ds-toggle__thumb { left: 18px; }   /* 36-16-2 */
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
  z-index: 1;   /* sit above ::before track */
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

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-token-row { grid-template-columns: 1fr 24px 80px; }
  .ds-token-row > span:last-child { display: none; }
}
</style>
