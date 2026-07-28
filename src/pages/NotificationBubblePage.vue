<script setup>
import AppNotificationBubble from '../components/ui/AppNotificationBubble.vue'

const IconBell = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#5d6065" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#5d6065" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Notification bubble</h1>
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
          <span>Count bubble · border-radius 12px · Inter SemiBold 14px</span>
        </div>
      </div>
    </section>

    <!-- ── Component demo ────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component</h2>
      <p class="ds-body">AppNotificationBubble in use — on an icon and standalone.</p>
      <div class="ds-card ds-demo-flex">
        <div class="ds-demo-item">
          <div class="demo-icon-wrap">
            <span v-html="IconBell" />
            <AppNotificationBubble :count="3" variant="elevated" style="position:absolute;top:-4px;right:-4px;" />
          </div>
          <span class="ds-state-label">Elevated · count</span>
        </div>
        <div class="ds-demo-item">
          <div class="demo-icon-wrap" style="background: var(--indigo-100); border-radius: 8px; padding: 6px;">
            <span v-html="IconBell" style="color:#fff" />
            <AppNotificationBubble :count="12" variant="flat" style="position:absolute;top:-4px;right:-4px;" />
          </div>
          <span class="ds-state-label">Flat · count</span>
        </div>
        <div class="ds-demo-item">
          <div class="demo-icon-wrap">
            <span v-html="IconBell" />
            <AppNotificationBubble dot variant="elevated" style="position:absolute;top:-2px;right:-2px;" />
          </div>
          <span class="ds-state-label">Dot indicator</span>
        </div>
        <div class="ds-demo-item">
          <AppNotificationBubble :count="99" variant="elevated" />
          <span class="ds-state-label">Max count</span>
        </div>
        <div class="ds-demo-item">
          <AppNotificationBubble :count="142" variant="elevated" />
          <span class="ds-state-label">Over 99</span>
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
.ds-card       { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-demo-flex  { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-end; }
.ds-demo-item  { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.demo-icon-wrap { position: relative; display: inline-flex; }
.ds-state-label { font-size: 11px; color: var(--grey-60); text-align: center; }

code {
  font-family: 'Fira Code', 'Courier New', monospace;
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
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
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

/* ── Notification bubble ─────────────────────────────────────── */
.ds-bubble {
  min-width: 24px;
  height: 24px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-token-row { grid-template-columns: 1fr 24px 80px; }
  .ds-token-row > span:last-child { display: none; }
}
</style>
