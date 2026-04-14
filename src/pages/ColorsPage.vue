<script setup>
const PALETTES = [
  {
    name: 'Grey', prefix: 'grey',
    description: 'Backgrounds, text, borders, and structural UI elements.',
    stops: [
      { stop: '100', hex: '#1f2124' }, { stop: '90', hex: '#36383b' },
      { stop: '80', hex: '#5d6065' },  { stop: '70', hex: '#6f7176' },
      { stop: '60', hex: '#9c9ea3' },  { stop: '50', hex: '#b0b2b7' },
      { stop: '40', hex: '#c0c2c6' },  { stop: '30', hex: '#d8d8da' },
      { stop: '20', hex: '#e6e6e7' },  { stop: '10', hex: '#f1f1f2' },
      { stop: '05', hex: '#f7f7f8' },  { stop: '00', hex: '#ffffff' },
    ],
  },
  {
    name: 'Azure Blue', prefix: 'blue-azure',
    description: 'Primary brand color. Links, interactive elements, accent.',
    stops: [
      { stop: '100', hex: '#013b57' }, { stop: '90', hex: '#075985' },
      { stop: '80', hex: '#0369a1' },  { stop: '70', hex: '#0a74a6' },
      { stop: '60', hex: '#138cc4' },  { stop: '50', hex: '#39ade3' },
      { stop: '40', hex: '#61bde9' },  { stop: '30', hex: '#b3e1f7' },
      { stop: '20', hex: '#d7eff9' },  { stop: '10', hex: '#e8f6ff' },
    ],
  },
  {
    name: 'Vivid Blue', prefix: 'blue-vivid',
    description: 'High-saturation blue for interactive highlights.',
    stops: [
      { stop: '100', hex: '#072e63' }, { stop: '90', hex: '#0f4082' },
      { stop: '80', hex: '#065cd1' },  { stop: '70', hex: '#0068f4' },
      { stop: '60', hex: '#227df8' },  { stop: '50', hex: '#4490f6' },
      { stop: '40', hex: '#5ba1ff' },  { stop: '30', hex: '#7cb4ff' },
      { stop: '20', hex: '#b2d3ff' },  { stop: '10', hex: '#e5f0fe' },
    ],
  },
  {
    name: 'Red', prefix: 'red',
    description: 'Errors, destructive actions, and danger states.',
    stops: [
      { stop: '100', hex: '#781212' }, { stop: '90', hex: '#991b1b' },
      { stop: '80', hex: '#b91c1c' },  { stop: '70', hex: '#dc2626' },
      { stop: '60', hex: '#f94144' },  { stop: '50', hex: '#f87171' },
      { stop: '40', hex: '#fca5a5' },  { stop: '30', hex: '#fecaca' },
      { stop: '20', hex: '#fee2e2' },  { stop: '10', hex: '#fef2f2' },
    ],
  },
  {
    name: 'Green', prefix: 'green',
    description: 'Success states, confirmations, and positive indicators.',
    stops: [
      { stop: '100', hex: '#12591c' }, { stop: '90', hex: '#247a31' },
      { stop: '80', hex: '#469852' },  { stop: '70', hex: '#59b767' },
      { stop: '60', hex: '#64d074' },  { stop: '50', hex: '#8be598' },
      { stop: '40', hex: '#a8ebb2' },  { stop: '30', hex: '#c5f2cb' },
      { stop: '20', hex: '#e2f8e5' },  { stop: '10', hex: '#f1fcf2' },
    ],
  },
  {
    name: 'Yellow', prefix: 'yellow',
    description: 'Warnings, cautions, and attention-required indicators.',
    stops: [
      { stop: '100', hex: '#927302' }, { stop: '90', hex: '#be9103' },
      { stop: '80', hex: '#d6a201' },  { stop: '70', hex: '#eab308' },
      { stop: '60', hex: '#f9c74f' },  { stop: '50', hex: '#ffd164' },
      { stop: '40', hex: '#fbdd95' },  { stop: '30', hex: '#fde9b9' },
      { stop: '20', hex: '#ffeec7' },  { stop: '10', hex: '#fff6d7' },
    ],
  },
  {
    name: 'Orange', prefix: 'orange',
    description: 'High-visibility warnings and notification badges.',
    stops: [
      { stop: '100', hex: '#702822' }, { stop: '90', hex: '#aa381a' },
      { stop: '80', hex: '#d15801' },  { stop: '70', hex: '#e66304' },
      { stop: '60', hex: '#ff6c02' },  { stop: '50', hex: '#ff8935' },
      { stop: '40', hex: '#ffa767' },  { stop: '30', hex: '#ffc49a' },
      { stop: '20', hex: '#ffe2cc' },  { stop: '10', hex: '#fff0e6' },
    ],
  },
  {
    name: 'Indigo', prefix: 'indigo',
    description: 'Brand backgrounds, deep UI surfaces, and emphasis.',
    stops: [
      { stop: '100', hex: '#010028' }, { stop: '90', hex: '#02005f' },
      { stop: '80', hex: '#553698' },  { stop: '70', hex: '#6a3fc8' },
      { stop: '60', hex: '#8251f4' },  { stop: '50', hex: '#a078fb' },
      { stop: '40', hex: '#bea3fd' },  { stop: '30', hex: '#d8c8ff' },
      { stop: '20', hex: '#e4daff' },  { stop: '10', hex: '#f1ecff' },
    ],
  },
  {
    name: 'Pink', prefix: 'pink', tag: 'Not in use',
    description: 'Reserved — do not add to production.',
    stops: [
      { stop: '100', hex: '#5e1640' }, { stop: '90', hex: '#a01f65' },
      { stop: '80', hex: '#be2478' },  { stop: '70', hex: '#d22483' },
      { stop: '60', hex: '#df4e9d' },  { stop: '50', hex: '#f085c0' },
      { stop: '40', hex: '#f8b0cd' },  { stop: '30', hex: '#f7d3e1' },
      { stop: '20', hex: '#f8e3ee' },  { stop: '10', hex: '#fff3fa' },
    ],
  },
]

function isLight(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.50
}
</script>

<template>
  <main class="ds-main">

    <!-- Title -->
    <section class="ds-section">
      <h1 class="ds-h1">Colors</h1>
      <p class="ds-lead">9 families · 10–12 stops · sourced from Figma variables</p>
    </section>

    <!-- Primary Colors -->
    <section class="ds-section">
      <h2 class="ds-h2">Primary Colors</h2>
      <p class="ds-body">Core brand colors. The foundation for interactive elements, backgrounds, and typography.</p>
      <div class="primary-grid">
        <div class="primary-swatch" style="background:#010028">
          <span class="ps-label" style="color:#ffffff">Indigo 100</span>
          <span class="ps-hex"   style="color:rgba(255,255,255,0.75)">#010028</span>
          <span class="ps-token" style="color:rgba(255,255,255,0.45)">--indigo-100</span>
        </div>
        <div class="primary-swatch" style="background:#d7eff9">
          <span class="ps-label" style="color:#013b57">Azure Blue 20</span>
          <span class="ps-hex"   style="color:#0a74a6">#D7EFF9</span>
          <span class="ps-token" style="color:#39ade3">--blue-azure-20</span>
        </div>
        <div class="primary-swatch" style="background:#ffffff; border:1px solid #e6e6e7">
          <span class="ps-label" style="color:#1f2124">White</span>
          <span class="ps-hex"   style="color:#6f7176">#FFFFFF</span>
          <span class="ps-token" style="color:#9c9ea3">--grey-00</span>
        </div>
      </div>
    </section>

    <!-- Extended Palette -->
    <section class="ds-section">
      <h2 class="ds-h2">Extended Palette</h2>
      <p class="ds-body">Hover over a swatch to reveal its hex value.</p>
      <div class="palettes-list">
        <div v-for="p in PALETTES" :key="p.prefix" class="palette-row">
          <div class="palette-header">
            <span class="palette-name">{{ p.name }}</span>
            <span v-if="p.tag" class="palette-tag">{{ p.tag }}</span>
            <span class="palette-desc">{{ p.description }}</span>
          </div>
          <div class="palette-strip">
            <div
              v-for="s in p.stops"
              :key="s.stop"
              class="palette-swatch"
              :style="{ background: s.hex }"
              :title="`${p.prefix}/${s.stop} · ${s.hex.toUpperCase()}`"
            >
              <span class="sw-stop" :style="{ color: isLight(s.hex) ? '#1f2124' : '#ffffff' }">{{ s.stop }}</span>
              <span class="sw-hex"  :style="{ color: isLight(s.hex) ? '#36383b' : '#ffffff' }">{{ s.hex.toUpperCase() }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Token Reference -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <p class="ds-body">
        All color variables from Figma. Reference in CSS as <code>var(--blue-azure-70)</code>.
      </p>
      <div class="color-token-grid">
        <div v-for="p in PALETTES" :key="p.prefix" class="token-card">
          <p class="token-card-title">
            {{ p.name }}
            <span v-if="p.tag" class="token-card-tag"> &ndash; {{ p.tag }}</span>
          </p>
          <table class="token-table">
            <thead>
              <tr>
                <th class="col-stop">Stop</th>
                <th>Variable</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in p.stops" :key="s.stop">
                <td class="cell-stop">{{ s.stop }}</td>
                <td><code>--{{ p.prefix }}-{{ s.stop }}</code></td>
                <td class="cell-value">
                  <span class="stop-swatch" :style="{ background: s.hex }" />
                  <span class="cell-hex">{{ s.hex.toUpperCase() }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ─── Layout ────────────────────────────────────────────────── */
.ds-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead    { font-size: 16px; color: var(--grey-70); margin-top: -8px; }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

/* ─── Primary swatches ──────────────────────────────────────── */
.primary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.primary-swatch {
  border-radius: 8px;
  padding: 20px;
  min-height: 128px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 3px;
  border: 1px solid rgba(0, 0, 0, 0.07);
}

.ps-label { font-size: 13px; font-weight: 600; }
.ps-hex   { font-size: 12px; font-family: 'SFMono-Regular', 'Consolas', monospace; }
.ps-token { font-size: 11px; font-family: 'SFMono-Regular', 'Consolas', monospace; opacity: 0.6; }

/* ─── Palette strips ────────────────────────────────────────── */
.palettes-list { display: flex; flex-direction: column; gap: 24px; }

.palette-row   { display: flex; flex-direction: column; gap: 8px; }
.palette-header { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.palette-name  { font-size: 14px; font-weight: 600; color: var(--grey-90); }
.palette-tag   {
  font-size: 11px; font-weight: 500; color: var(--grey-60);
  background: var(--grey-10); border: 1px solid var(--grey-20);
  border-radius: 3px; padding: 1px 6px;
}
.palette-desc  { font-size: 12px; color: var(--grey-60); }

.palette-strip {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  height: 88px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.palette-swatch {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 8px 6px;
  transition: flex 0.15s ease;
  cursor: default;
}

.palette-swatch:hover { flex: 2.8; }

.sw-stop {
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 4px;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
}

.sw-hex {
  font-size: 10px;
  line-height: 1;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  opacity: 0;
  transition: opacity 0.12s;
  white-space: nowrap;
}

.palette-swatch:hover .sw-hex { opacity: 1; }

/* ─── Token reference ───────────────────────────────────────── */
.color-token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.token-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
}

.token-card-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-70);
  padding: 12px 16px;
  background: var(--grey-05);
  border-bottom: 1px solid var(--grey-20);
}

.token-card-tag {
  font-weight: 400;
  text-transform: none;
  font-size: 11px;
  opacity: 0.6;
  letter-spacing: 0;
}

.token-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.token-table th {
  text-align: left;
  padding: 8px 12px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--grey-60);
  font-weight: 600;
  border-bottom: 1px solid var(--grey-10);
  background: none;
}

.token-table td {
  padding: 7px 12px;
  border-bottom: 1px solid var(--grey-10);
  vertical-align: middle;
}

.token-table tr:last-child td { border-bottom: none; }

.col-stop  { width: 40px; }
.cell-stop { color: var(--grey-60); font-family: 'SFMono-Regular', 'Consolas', monospace; font-size: 11px; }
.cell-value { display: flex; align-items: center; }
.cell-hex  { font-family: 'SFMono-Regular', 'Consolas', monospace; font-size: 12px; color: var(--grey-80); }

.stop-swatch {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  flex-shrink: 0;
}

/* ─── Responsive ────────────────────────────────────────────── */
@media (max-width: 900px) {
  .primary-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .color-token-grid { grid-template-columns: 1fr; }
}
</style>
