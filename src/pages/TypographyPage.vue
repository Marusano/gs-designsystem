<script setup>
/* ─── Type scale tokens (sourced from Figma DS-GSFleet node 3983:4437) ─── */
const SIZES = [
  { token: 'xs',   px: 12,  sample: 'FLEET',          uppercase: true  },
  { token: 'sm',   px: 14,  sample: 'Fleet' },
  { token: 'md',   px: 16,  sample: 'Fleet' },
  { token: 'lg',   px: 20,  sample: 'Fleet' },
  { token: 'xl',   px: 22,  sample: 'Fleet' },
  { token: 'xxl',  px: 24,  sample: 'Fleet' },
  { token: 'xxxl', px: 32,  sample: 'Fleet' },
]

const WEIGHTS = [
  { token: 'regular', label: 'Regular', weight: 400, style: 'normal'  },
  { token: 'medium',  label: 'Medium',  weight: 600, style: 'normal'  },
  { token: 'bold',    label: 'Bold',    weight: 700, style: 'normal'  },
]

const LINE_HEIGHTS = [
  { token: 'sm',  sizePx: 12, lhPx: 14 },
  { token: 'md',  sizePx: 14, lhPx: 16 },
  { token: 'lg',  sizePx: 16, lhPx: 20 },
  { token: 'xl',  sizePx: 20, lhPx: 24 },
  { token: 'xxl', sizePx: 24, lhPx: 32 },
]

const HEADLINES = [
  { level: 'H1', size: 32, weight: 700, lh: 32, tracking: '0.25px', note: '32px · Bold · lh 32' },
  { level: 'H2', size: 24, weight: 600, lh: 32, tracking: '0.25px', note: '24px · SemiBold · lh 32' },
  { level: 'H3', size: 24, weight: 400, lh: 32, tracking: '0.25px', note: '24px · Regular · lh 32' },
  { level: 'H4', size: 20, weight: 400, lh: 24, tracking: '0.25px', note: '20px · Regular · lh 24' },
  { level: 'H5', size: 16, weight: 600, lh: 20, tracking: '0.25px', note: '16px · SemiBold · lh 20' },
  { level: 'H6', size: 14, weight: 600, lh: 16, tracking: '0.25px', note: '14px · SemiBold · lh 16' },
]

const BODY_STYLES = [
  { label: 'Body',     size: 14, weight: 400, lh: 16, tracking: 0,      color: '#36383b', note: '14px · Regular' },
  { label: 'Subtitle', size: 14, weight: 400, lh: 16, tracking: '0.25px', color: '#6f7176', note: '14px · Regular · subtle' },
  { label: 'Disabled', size: 14, weight: 400, lh: 16, tracking: '0.25px', color: '#b0b2b7', note: '14px · Regular · disabled' },
]

const BUTTON_STYLES = [
  { label: 'Button md', size: 14, weight: 600, lh: 16, tracking: 0,      color: '#36383b', sample: 'Button label' },
  { label: 'Button xl', size: 16, weight: 500, lh: 16, tracking: 0,      color: '#36383b', sample: 'Button label' },
]

const OTHER_STYLES = [
  { label: 'Link',            size: 14, weight: 400, lh: 16, tracking: 0,        color: '#0369a1', sample: 'Your fleet in one place', underline: true },
  { label: 'Label',           size: 14, weight: 600, lh: 16, tracking: '0.25px', color: '#9c9ea3', sample: 'Your fleet in one place' },
  { label: 'Supporting label',size: 12, weight: 600, lh: 16, tracking: '0.25px', color: '#6f7176', sample: 'YOUR FLEET IN ONE PLACE', uppercase: true },
  { label: 'Supporting',      size: 12, weight: 400, lh: 14, tracking: 0,        color: '#6f7176', sample: 'Your fleet in one place' },
]

const SEVERITY_STYLES = [
  { label: 'Success', size: 14, weight: 400, lh: 16, color: '#247a31', sample: 'Your fleet in one place' },
  { label: 'Warning', size: 14, weight: 400, lh: 16, color: '#927302', sample: 'Your fleet in one place' },
  { label: 'Danger',  size: 14, weight: 400, lh: 16, color: '#b91c1c', sample: 'Your fleet in one place' },
]
</script>

<template>
  <div class="typo-page">

    <!-- ── Page header ─────────────────────────────────────────── -->
    <div class="ds-page-header">
      <h1 class="ds-h1">Typography</h1>
      <p class="ds-lead">Type scale, weights, line heights, and named text styles — sourced from Figma DS-GSFleet.</p>
    </div>

    <!-- ── 1. Family ───────────────────────────────────────────── -->
    <section class="ds-section">
      <div class="group-header">
        <h2 class="ds-h2">Family</h2>
      </div>

      <div class="typo-family-card">
        <div class="typo-family-specimen">
          <span class="typo-family-name">Inter</span>
          <span class="typo-family-chars">AaBbCcDdEeFfGg 0123456789</span>
        </div>
        <div class="typo-family-meta">
          <div class="typo-meta-row">
            <span class="typo-meta-label">Token</span>
            <code class="typo-token">family/primary</code>
          </div>
          <div class="typo-meta-row">
            <span class="typo-meta-label">Source</span>
            <a href="https://fonts.google.com/specimen/Inter" target="_blank" class="typo-link">fonts.google.com/specimen/Inter</a>
          </div>
          <div class="typo-meta-row">
            <span class="typo-meta-label">Note</span>
            <span class="typo-note-italic">Transitioning from Roboto to Inter</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 2. Size scale ───────────────────────────────────────── -->
    <section class="ds-section">
      <div class="group-header">
        <h2 class="ds-h2">Size</h2>
        <span class="group-count">{{ SIZES.length }} steps</span>
      </div>
      <p class="ds-body">All sizes reference the <code class="ds-code">size/*</code> token namespace.</p>

      <div class="typo-scale-row">
        <div v-for="s in SIZES" :key="s.token" class="typo-scale-cell">
          <span
            class="typo-scale-sample"
            :style="{
              fontSize: s.px + 'px',
              fontWeight: 600,
              textTransform: s.uppercase ? 'uppercase' : 'none',
              letterSpacing: '0.25px',
            }"
          >{{ s.sample }}</span>
          <span class="typo-scale-token">size/{{ s.token }}</span>
          <span class="typo-scale-px">{{ s.px }}px</span>
        </div>
      </div>
    </section>

    <!-- ── 3. Weight ───────────────────────────────────────────── -->
    <section class="ds-section">
      <div class="group-header">
        <h2 class="ds-h2">Weight</h2>
      </div>
      <p class="ds-body">Three weights defined in the token system.</p>

      <div class="typo-weight-row">
        <div v-for="w in WEIGHTS" :key="w.token" class="typo-weight-cell">
          <span class="typo-weight-sample" :style="{ fontWeight: w.weight }">{{ w.label }}</span>
          <div class="typo-weight-meta">
            <code class="typo-token">weight/{{ w.token }}</code>
            <span class="typo-scale-px">{{ w.weight }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 4. Line height ──────────────────────────────────────── -->
    <section class="ds-section">
      <div class="group-header">
        <h2 class="ds-h2">Line Height</h2>
      </div>
      <p class="ds-body">Line height values reference the <code class="ds-code">line-height/*</code> token namespace.</p>

      <div class="typo-lh-table">
        <div class="typo-lh-header">
          <span>Token</span>
          <span>Font size</span>
          <span>Line height</span>
          <span>Ratio</span>
          <span>Preview</span>
        </div>
        <div v-for="lh in LINE_HEIGHTS" :key="lh.token" class="typo-lh-row">
          <code class="typo-token">line-height/{{ lh.token }}</code>
          <span class="typo-lh-val">{{ lh.sizePx }}px</span>
          <span class="typo-lh-val">{{ lh.lhPx }}px</span>
          <span class="typo-lh-ratio">{{ (lh.lhPx / lh.sizePx).toFixed(2) }}×</span>
          <span
            class="typo-lh-preview"
            :style="{ fontSize: lh.sizePx + 'px', lineHeight: lh.lhPx + 'px' }"
          >Fleet manager</span>
        </div>
      </div>
    </section>

    <!-- ── 5. Styles ───────────────────────────────────────────── -->
    <section class="ds-section">
      <div class="group-header">
        <h2 class="ds-h2">Styles</h2>
      </div>

      <!-- Headlines -->
      <div class="typo-subsection">
        <h3 class="typo-sub-h3">Headlines</h3>
        <div class="typo-style-grid">
          <div v-for="h in HEADLINES" :key="h.level" class="typo-style-card">
            <span class="typo-style-label">{{ h.level }}</span>
            <p
              class="typo-style-sample"
              :style="{
                fontSize: h.size + 'px',
                fontWeight: h.weight,
                lineHeight: h.lh + 'px',
                letterSpacing: h.tracking,
                color: '#1f2124',
              }"
            >Your fleet in one place</p>
            <span class="typo-style-note">{{ h.note }}</span>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="typo-subsection">
        <h3 class="typo-sub-h3">Font (body)</h3>
        <div class="typo-style-grid">
          <div v-for="s in BODY_STYLES" :key="s.label" class="typo-style-card">
            <span class="typo-style-label">{{ s.label }}</span>
            <p
              class="typo-style-sample"
              :style="{
                fontSize: s.size + 'px',
                fontWeight: s.weight,
                lineHeight: s.lh + 'px',
                letterSpacing: s.tracking,
                color: s.color,
              }"
            >Your fleet in one place</p>
            <span class="typo-style-note">{{ s.note }}</span>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="typo-subsection">
        <h3 class="typo-sub-h3">Button</h3>
        <div class="typo-style-grid typo-style-grid--2col">
          <div v-for="s in BUTTON_STYLES" :key="s.label" class="typo-style-card">
            <span class="typo-style-label">{{ s.label }}</span>
            <p
              class="typo-style-sample"
              :style="{
                fontSize: s.size + 'px',
                fontWeight: s.weight,
                lineHeight: s.lh + 'px',
                color: s.color,
              }"
            >{{ s.sample }}</p>
            <span class="typo-style-note">{{ s.size }}px · {{ s.weight === 600 ? 'SemiBold' : 'Medium' }}</span>
          </div>
        </div>
      </div>

      <!-- Other -->
      <div class="typo-subsection">
        <h3 class="typo-sub-h3">Other</h3>
        <div class="typo-style-grid typo-style-grid--2col">
          <div v-for="s in OTHER_STYLES" :key="s.label" class="typo-style-card">
            <span class="typo-style-label">{{ s.label }}</span>
            <p
              class="typo-style-sample"
              :style="{
                fontSize: s.size + 'px',
                fontWeight: s.weight,
                lineHeight: s.lh + 'px',
                letterSpacing: s.tracking,
                color: s.color,
                textTransform: s.uppercase ? 'uppercase' : 'none',
                textDecoration: s.underline ? 'underline' : 'none',
              }"
            >{{ s.sample }}</p>
            <span class="typo-style-note">{{ s.size }}px · {{ s.weight >= 600 ? 'SemiBold' : 'Regular' }}</span>
          </div>
        </div>
      </div>

      <!-- Severity -->
      <div class="typo-subsection">
        <h3 class="typo-sub-h3">Severity</h3>
        <div class="typo-style-grid">
          <div v-for="s in SEVERITY_STYLES" :key="s.label" class="typo-style-card">
            <span class="typo-style-label">{{ s.label }}</span>
            <p
              class="typo-style-sample"
              :style="{
                fontSize: s.size + 'px',
                fontWeight: s.weight,
                lineHeight: s.lh + 'px',
                color: s.color,
              }"
            >{{ s.sample }}</p>
            <span class="typo-style-note typo-style-note--color" :style="{ color: s.color }">{{ s.color }}</span>
          </div>
        </div>
      </div>

    </section>

    <!-- ── Token Reference ───────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>

      <!-- Scale tokens -->
      <div class="token-group">
        <h3 class="typo-sub-h3">Scale — Typography collection</h3>
        <div class="tok-table-wrap">
          <table class="tok-table">
            <thead>
              <tr>
                <th>Size token</th><th>Value</th>
                <th>Line height token</th><th>Value</th>
                <th>Used for</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>size/xs</code></td><td>12px</td><td><code>line height/sm</code></td><td>14px</td><td>Supporting label</td></tr>
              <tr><td><code>size/sm</code></td><td>14px</td><td><code>line height/md</code></td><td>16px</td><td>Body, subtitle, label, H6, button md</td></tr>
              <tr><td><code>size/md</code></td><td>16px</td><td><code>line height/lg</code></td><td>20px</td><td>H5, button xl</td></tr>
              <tr><td><code>size/lg</code></td><td>20px</td><td><code>line height/xl</code></td><td>24px</td><td>H4</td></tr>
              <tr><td><code>size/xl</code></td><td>22px</td><td class="tok-muted">—</td><td class="tok-muted">—</td><td>Intermediate step (no paired lh)</td></tr>
              <tr><td><code>size/xxl</code></td><td>24px</td><td><code>line height/xxl</code></td><td>32px</td><td>H2, H3</td></tr>
              <tr><td><code>size/xxxl</code></td><td>32px</td><td><code>line height/xxl</code></td><td>32px</td><td>H1 (tight, 1:1 ratio)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Weight & family tokens -->
      <div class="token-group">
        <h3 class="typo-sub-h3">Weight &amp; Family — Typography collection</h3>
        <div class="tok-table-wrap">
          <table class="tok-table">
            <thead>
              <tr><th>Token</th><th>Value</th><th>CSS weight</th><th>Used for</th></tr>
            </thead>
            <tbody>
              <tr><td><code>family/primary</code></td><td>Inter</td><td class="tok-muted">—</td><td>All text styles</td></tr>
              <tr><td><code>weight/regular</code></td><td>Regular</td><td>400</td><td>Body, subtitle, link, H3, H4, severity</td></tr>
              <tr><td><code>weight/medium</code></td><td>Semi-bold</td><td>600</td><td>H2, H5, H6, label, supporting label, button md</td></tr>
              <tr><td><code>weight/bold</code></td><td>Bold</td><td>700</td><td>H1</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Font color tokens -->
      <div class="token-group">
        <h3 class="typo-sub-h3">Font colors — Mapped / font group</h3>
        <div class="tok-table-wrap">
          <table class="tok-table">
            <thead>
              <tr><th>Token</th><th>Value</th><th>Primitive</th><th>Used for</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>font-color-title-strong</code></td>
                <td><span class="swatch" style="background:#1f2124"></span>#1f2124</td>
                <td><code>grey-100</code></td>
                <td>H1 – H6 headings</td>
              </tr>
              <tr>
                <td><code>font-color-body</code></td>
                <td><span class="swatch" style="background:#36383b"></span>#36383b</td>
                <td><code>grey-90</code></td>
                <td>Default body text</td>
              </tr>
              <tr>
                <td><code>font/color/subtile</code> <span class="tok-note">(sic)</span></td>
                <td><span class="swatch" style="background:#6f7176"></span>#6f7176</td>
                <td><code>grey-70</code></td>
                <td>Subtitle, supporting label</td>
              </tr>
              <tr>
                <td><code>font/color/label</code></td>
                <td><span class="swatch" style="background:#9c9ea3"></span>#9c9ea3</td>
                <td><code>grey-60</code></td>
                <td>Labels, metadata</td>
              </tr>
              <tr>
                <td><code>font/color/disabled</code></td>
                <td><span class="swatch" style="background:#b0b2b7"></span>#b0b2b7</td>
                <td><code>grey-50</code></td>
                <td>Disabled text</td>
              </tr>
              <tr>
                <td><code>font/color/link</code></td>
                <td><span class="swatch" style="background:#0369a1"></span>#0369a1</td>
                <td><code>blue-azure-80</code></td>
                <td>Link text</td>
              </tr>
              <tr>
                <td><code>font/color/success</code></td>
                <td><span class="swatch" style="background:#247a31"></span>#247a31</td>
                <td><code>green-90</code></td>
                <td>Success / positive text</td>
              </tr>
              <tr>
                <td><code>font/color/warning</code></td>
                <td><span class="swatch" style="background:#927302"></span>#927302</td>
                <td><code>yellow-100</code></td>
                <td>Warning text</td>
              </tr>
              <tr>
                <td><code>font/color/error</code></td>
                <td><span class="swatch" style="background:#b91c1c"></span>#b91c1c</td>
                <td><code>red-80</code></td>
                <td>Error / danger text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </section>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>

<style scoped>
.typo-page {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 48px 40px 80px;
  font-family: 'Inter', 'Roboto', sans-serif;
}

/* ── Shared with other pages ────────────────────────────────── */
.ds-page-header { display: flex; flex-direction: column; gap: 6px; }
.ds-h1   { font-size: 28px; font-weight: 700; color: var(--grey-100); }
.ds-h2   { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead { font-size: 16px; color: var(--grey-70); }
.ds-body { font-size: 14px; color: var(--grey-70); line-height: 1.6; }
.ds-code { font-family: 'SFMono-Regular', 'Consolas', monospace; font-size: 12px; background: var(--grey-10); padding: 1px 5px; border-radius: 4px; color: var(--grey-80); }
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.group-header { display: flex; align-items: center; gap: 10px; }
.group-count  { font-size: 13px; font-weight: 600; color: var(--grey-60); background: var(--grey-10); padding: 2px 8px; border-radius: 20px; }

/* ── Family ─────────────────────────────────────────────────── */
.typo-family-card {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 12px;
  padding: 28px 32px;
}

.typo-family-specimen {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0 0 auto;
  min-width: 280px;
}

.typo-family-name {
  font-size: 48px;
  font-weight: 700;
  color: var(--grey-100);
  line-height: 1;
  letter-spacing: -1px;
}

.typo-family-chars {
  font-size: 16px;
  font-weight: 400;
  color: var(--grey-60);
  letter-spacing: 0.5px;
}

.typo-family-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 6px;
}

.typo-meta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.typo-meta-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--grey-60);
  min-width: 56px;
}

.typo-token {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 2px 7px;
  border-radius: 4px;
  color: var(--grey-80);
}

.typo-link {
  color: var(--blue-azure-80);
  font-size: 14px;
  text-decoration: none;
}
.typo-link:hover { text-decoration: underline; }

.typo-note-italic {
  font-style: italic;
  color: var(--grey-60);
  font-size: 13px;
}

/* ── Size scale ─────────────────────────────────────────────── */
.typo-scale-row {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 12px;
  padding: 24px 28px 20px;
  overflow-x: auto;
}

.typo-scale-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 1 0;
  min-width: 64px;
  padding: 0 8px;
  border-left: 1px solid var(--grey-10);
}
.typo-scale-cell:first-child { border-left: none; }

.typo-scale-sample {
  color: var(--grey-100);
  font-family: 'Inter', sans-serif;
  line-height: 1;
}

.typo-scale-token {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 10px;
  color: var(--grey-60);
  white-space: nowrap;
}

.typo-scale-px {
  font-size: 11px;
  color: var(--grey-50);
  font-variant-numeric: tabular-nums;
}

/* ── Weight ─────────────────────────────────────────────────── */
.typo-weight-row {
  display: flex;
  gap: 4px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 12px;
  padding: 24px 28px;
  overflow-x: auto;
}

.typo-weight-cell {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  padding: 0 16px;
  border-left: 1px solid var(--grey-10);
}
.typo-weight-cell:first-child { border-left: none; }

.typo-weight-sample {
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  color: var(--grey-100);
  line-height: 1;
}

.typo-weight-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Line height ────────────────────────────────────────────── */
.typo-lh-table {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 12px;
  overflow: hidden;
}

.typo-lh-header,
.typo-lh-row {
  display: grid;
  grid-template-columns: 1fr 80px 100px 60px 1fr;
  gap: 8px;
  padding: 12px 24px;
  align-items: center;
  font-size: 13px;
}

.typo-lh-header {
  background: var(--grey-05);
  border-bottom: 1px solid var(--grey-10);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--grey-60);
}

.typo-lh-row {
  border-bottom: 1px solid var(--grey-10);
  color: var(--grey-80);
}
.typo-lh-row:last-child { border-bottom: none; }
.typo-lh-row:hover { background: var(--grey-05); }

.typo-lh-val   { color: var(--grey-80); font-variant-numeric: tabular-nums; }
.typo-lh-ratio { color: var(--grey-60); font-size: 12px; }

.typo-lh-preview {
  font-family: 'Inter', sans-serif;
  color: var(--grey-90);
  white-space: nowrap;
}

/* ── Styles subsections ─────────────────────────────────────── */
.typo-subsection {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.typo-sub-h3 {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--grey-60);
}

.typo-style-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.typo-style-grid--2col {
  grid-template-columns: repeat(2, 1fr);
}

.typo-style-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 10px;
  padding: 16px 20px 14px;
}

.typo-style-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--grey-60);
}

.typo-style-sample {
  font-family: 'Inter', sans-serif;
  margin: 4px 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.typo-style-note {
  font-size: 11px;
  color: var(--grey-50);
  font-family: 'SFMono-Regular', 'Consolas', monospace;
}

.typo-style-note--color {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  opacity: 0.8;
}

/* ── Token Reference ────────────────────────────────────────── */
.token-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tok-table-wrap {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--grey-20);
}

.tok-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 13px;
}

.tok-table thead th {
  background: var(--grey-05);
  border-bottom: 1px solid var(--grey-20);
  padding: 10px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-60);
  white-space: nowrap;
}

.tok-table td {
  padding: 9px 16px;
  border-bottom: 1px solid var(--grey-10);
  color: var(--grey-80);
  vertical-align: middle;
}

.tok-table tr:last-child td { border-bottom: none; }
.tok-table tr:hover > td    { background: var(--grey-05); }

.tok-table code {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 11px;
  background: var(--grey-05);
  padding: 2px 5px;
  border-radius: 3px;
  color: var(--grey-80);
}

.tok-muted { color: var(--grey-40); }

.tok-note {
  font-size: 11px;
  color: var(--grey-50);
  font-style: italic;
}

.swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 6px;
  flex-shrink: 0;
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .typo-family-card  { flex-direction: column; }
  .typo-style-grid   { grid-template-columns: 1fr 1fr; }
  .typo-style-grid--2col { grid-template-columns: 1fr; }
}
</style>
