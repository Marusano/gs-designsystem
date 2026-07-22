<script setup>
const paddingTokens = [
  { token: 'padding/2',  value: 2,  usage: 'Icon nudge, micro gaps' },
  { token: 'padding/4',  value: 4,  usage: 'Tight inline spacing' },
  { token: 'padding/6',  value: 6,  usage: 'Field internal gap' },
  { token: 'padding/8',  value: 8,  usage: 'Field vertical padding, compact items' },
  { token: 'padding/12', value: 12, usage: 'Field horizontal padding, buttons sm/md' },
  { token: 'padding/16', value: 16, usage: 'Card padding, section gaps' },
  { token: 'padding/20', value: 20, usage: 'Button xl padding-x' },
  { token: 'padding/24', value: 24, usage: 'Panel internal padding' },
  { token: 'padding/32', value: 32, usage: 'Section vertical rhythm' },
  { token: 'padding/40', value: 40, usage: 'Page section spacing' },
  { token: 'padding/48', value: 48, usage: 'Page-level top padding' },
  { token: 'padding/64', value: 64, usage: 'Hero / feature spacing' },
]

const buttonTokens = [
  { size: 'xs', height: 32, px: 10, radius: 4, usage: 'Dense tables, inline actions' },
  { size: 'sm', height: 36, px: 12, radius: 4, usage: 'Toolbar actions, card actions' },
  { size: 'md', height: 40, px: 12, radius: 4, usage: 'Default — page-level actions, modal footers' },
  { size: 'xl', height: 56, px: 20, radius: 4, usage: 'Hero CTAs, empty-state actions' },
]

const radiusTokens = [
  { token: 'button/size/radius/none', value: 0,  usage: 'No rounding — dividers, full-bleed elements' },
  { token: 'button/size/radius/sm',   value: 4,  usage: 'Buttons, input fields, tags (default)' },
  { token: 'button/size/radius/md',   value: 8,  usage: 'Cards, panels, modals' },
  { token: 'button/size/radius/lg',   value: 16, usage: 'Floating elements, tooltips' },
  { token: 'button/size/radius/xl',   value: 30, usage: 'Pill badges, toggle tracks' },
]

const borderTokens = [
  { token: 'divider/size/sm',       value: 1, usage: 'Default border — inputs, cards, dividers' },
  { token: 'button/size/border/sm', value: 1, usage: 'Button stroke (secondary, tertiary, quiet)' },
  { token: 'form/size/border/md',   value: 1, usage: 'Form field border default and hover' },
  { token: 'divider/size/md',       value: 2, usage: 'Strong divider, active tab indicator' },
  { token: 'form/size/border/lg',   value: 2, usage: 'Form field focus ring inset' },
  { token: 'button/size/border/lg', value: 3, usage: 'Active / focus ring on primary button' },
]

const iconTokens = [
  { token: 'icon/xs',  value: 12, usage: 'Compact inline indicators, badges' },
  { token: 'icon/sm',  value: 14, usage: 'Sidebar nav icons, tags' },
  { token: 'icon/md',  value: 16, usage: 'Default button icons, form icons' },
  { token: 'icon/lg',  value: 20, usage: 'Standalone action icons' },
  { token: 'icon/xl',  value: 24, usage: 'Feature icons, empty states' },
  { token: 'icon/2xl', value: 32, usage: 'Hero illustrations, large empty states' },
]

const containerTokens = [
  { token: 'container/sidebar',  value: '220px', barWidth: 44,  usage: 'App sidebar navigation width' },
  { token: 'container/panel-sm', value: '320px', barWidth: 64,  usage: 'Detail panel, filter drawer (narrow)' },
  { token: 'container/panel-md', value: '480px', barWidth: 96,  usage: 'Side panel, settings drawer' },
  { token: 'container/content',  value: '880px', barWidth: 176, usage: 'Main content max-width' },
  { token: 'container/full',     value: '100%',  barWidth: 240, usage: 'Full-width layouts, data tables' },
]

const overlayTokens = [
  { token: 'overlay-size/md', value: '104px', barWidth: 20,  usage: 'Compact overlay, tooltip panel height' },
  { token: 'overlay-size/sm', value: '512px', barWidth: 100, usage: 'Standard modal width' },
  { token: 'overlay-size/lg', value: '720px', barWidth: 144, usage: 'Wide modal, detail overlay' },
  { token: 'overlay-size/xl', value: '960px', barWidth: 192, usage: 'Full-featured modal, wizard' },
]
</script>

<template>
  <main class="sz-main">

    <section class="sz-header">
      <h1 class="sz-h1">Sizes</h1>
      <p class="sz-lead">7 categories · sourced from Figma Alias collection</p>
      <p class="sz-body">All size tokens are defined in the Figma Alias collection and reflected in <code>src/foundations/colors.css</code>. Use CSS custom properties — never hardcode pixel values.</p>
    </section>

    <!-- ── Padding ────────────────────────────────────────────── -->
    <section class="sz-section">
      <h2 class="sz-h2">Padding</h2>
      <p class="sz-desc">Base-4 spacing scale used for internal component padding, gaps, and layout spacing.</p>
      <div class="sz-spacing-grid">
        <div v-for="item in paddingTokens" :key="item.token" class="sz-spacing-row">
          <code class="sz-token">{{ item.token }}</code>
          <div class="sz-bar-wrap">
            <div class="sz-bar" :style="{ width: Math.min(item.value * 2.5, 240) + 'px' }"></div>
          </div>
          <span class="sz-value">{{ item.value }}px</span>
          <span class="sz-usage">{{ item.usage }}</span>
        </div>
      </div>
    </section>

    <!-- ── Button ─────────────────────────────────────────────── -->
    <section class="sz-section">
      <h2 class="sz-h2">Button</h2>
      <p class="sz-desc">Height, horizontal padding, and border-radius per size tier. All map to <code>--btn-*</code> tokens.</p>
      <div class="sz-table-wrap">
        <table class="sz-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Token</th>
              <th>Height</th>
              <th>Padding X</th>
              <th>Radius</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in buttonTokens" :key="b.size">
              <td><span class="sz-badge">{{ b.size }}</span></td>
              <td><code>--btn-height-{{ b.size }}</code></td>
              <td><strong>{{ b.height }}px</strong></td>
              <td>{{ b.px }}px</td>
              <td>{{ b.radius }}px</td>
              <td class="sz-td-usage">{{ b.usage }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Radius ─────────────────────────────────────────────── -->
    <section class="sz-section">
      <h2 class="sz-h2">Radius</h2>
      <p class="sz-desc">Border-radius scale from the Alias collection. <code>button/size/radius/*</code> tokens.</p>
      <div class="sz-radius-grid">
        <div v-for="r in radiusTokens" :key="r.token" class="sz-radius-card">
          <div class="sz-radius-preview" :style="{ borderRadius: r.value + 'px' }"></div>
          <code class="sz-token">{{ r.token }}</code>
          <span class="sz-value">{{ r.value }}px</span>
          <span class="sz-usage">{{ r.usage }}</span>
        </div>
      </div>
    </section>

    <!-- ── Border ─────────────────────────────────────────────── -->
    <section class="sz-section">
      <h2 class="sz-h2">Border</h2>
      <p class="sz-desc">Border stroke widths from <code>button/size/border/*</code>, <code>form/size/border/*</code>, and <code>divider/size/*</code> tokens.</p>
      <div class="sz-table-wrap">
        <table class="sz-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Preview</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in borderTokens" :key="b.token">
              <td><code>{{ b.token }}</code></td>
              <td><strong>{{ b.value }}px</strong></td>
              <td>
                <div class="sz-border-line" :style="{ height: b.value + 'px' }"></div>
              </td>
              <td class="sz-td-usage">{{ b.usage }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Icon ───────────────────────────────────────────────── -->
    <section class="sz-section">
      <h2 class="sz-h2">Icon</h2>
      <p class="sz-desc">Icon size scale. All icons in the system are SVGs — use these fixed sizes for consistency across components.</p>
      <div class="sz-icon-grid">
        <div v-for="ic in iconTokens" :key="ic.token" class="sz-icon-card">
          <div class="sz-icon-preview">
            <svg :width="ic.value" :height="ic.value" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" :r="ic.value > 16 ? 8 : 6" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 8v4l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <code class="sz-token">{{ ic.token }}</code>
          <span class="sz-value">{{ ic.value }}px</span>
          <span class="sz-usage">{{ ic.usage }}</span>
        </div>
      </div>
    </section>

    <!-- ── Container ─────────────────────────────────────────── -->
    <section class="sz-section">
      <h2 class="sz-h2">Container</h2>
      <p class="sz-desc">Fixed widths for structural UI containers. Used for sidebars, content columns, and panel layouts.</p>
      <div class="sz-table-wrap">
        <table class="sz-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Visual</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in containerTokens" :key="c.token">
              <td><code>{{ c.token }}</code></td>
              <td><strong>{{ c.value }}</strong></td>
              <td>
                <div class="sz-container-bar" :style="{ width: c.barWidth + 'px' }"></div>
              </td>
              <td class="sz-td-usage">{{ c.usage }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Overlay ────────────────────────────────────────────── -->
    <section class="sz-section">
      <h2 class="sz-h2">Overlay</h2>
      <p class="sz-desc">Width and height tokens for overlaying UI elements — modals, drawers, and detail panels. From <code>overlay-size-*</code> tokens.</p>
      <div class="sz-table-wrap">
        <table class="sz-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Visual</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in overlayTokens" :key="o.token">
              <td><code>{{ o.token }}</code></td>
              <td><strong>{{ o.value }}</strong></td>
              <td>
                <div class="sz-container-bar sz-container-bar--overlay" :style="{ width: o.barWidth + 'px' }"></div>
              </td>
              <td class="sz-td-usage">{{ o.usage }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>


<style scoped>
.sz-main {
  max-width: 920px;
  margin: 0 auto;
  padding: 48px 40px 96px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  font-family: 'Inter', sans-serif;
}

/* ── Header ────────────────────────────────────────────────────── */
.sz-h1   { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; }
.sz-lead { font-size: 16px; color: var(--grey-60); margin-top: 4px; }
.sz-body { font-size: 14px; color: var(--grey-70); line-height: 1.65; margin-top: 8px; }
.sz-header { display: flex; flex-direction: column; gap: 2px; }

/* ── Section ────────────────────────────────────────────────────── */
.sz-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sz-h2 {
  font-size: 18px;
  font-weight: 700;
  color: var(--grey-100);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--grey-20);
}

.sz-desc {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.6;
  max-width: 640px;
}

/* ── Table ──────────────────────────────────────────────────────── */
.sz-table-wrap { overflow-x: auto; }

.sz-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: var(--grey-80);
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
}

.sz-table thead th {
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--grey-50);
  background: var(--grey-05);
  padding: 9px 14px;
  border-bottom: 1px solid var(--grey-20);
  white-space: nowrap;
}

.sz-table tbody td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--grey-10);
  vertical-align: middle;
}

.sz-table tbody tr:last-child td { border-bottom: none; }
.sz-table tbody tr:nth-child(even) td { background: var(--grey-05); }

.sz-td-usage { color: var(--grey-60); }

code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-80);
  white-space: nowrap;
}

.sz-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  background: var(--grey-10);
  color: var(--grey-80);
  border-radius: 4px;
  padding: 2px 8px;
  text-transform: uppercase;
  letter-spacing: .05em;
}

/* ── Spacing rows ───────────────────────────────────────────────── */
.sz-spacing-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sz-spacing-row {
  display: grid;
  grid-template-columns: 130px 260px 52px 1fr;
  align-items: center;
  gap: 12px;
  padding: 7px 14px;
  background: #fff;
  border: 1px solid var(--grey-10);
  border-radius: 6px;
  font-size: 13px;
}

.sz-bar-wrap {
  display: flex;
  align-items: center;
  height: 18px;
}

.sz-bar {
  height: 10px;
  background: var(--blue-azure-50);
  border-radius: 2px;
  min-width: 2px;
  opacity: .75;
}

.sz-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-90);
  white-space: nowrap;
}

.sz-token {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 11px;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-80);
  white-space: nowrap;
}

.sz-usage { font-size: 12px; color: var(--grey-60); }

/* ── Radius grid ────────────────────────────────────────────────── */
.sz-radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.sz-radius-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.sz-radius-preview {
  width: 56px;
  height: 40px;
  background: var(--blue-azure-10);
  border: 2px solid var(--blue-azure-50);
}

/* ── Border preview ─────────────────────────────────────────────── */
.sz-border-line {
  width: 80px;
  background: var(--grey-70);
  border-radius: 1px;
  min-height: 1px;
}

/* ── Icon grid ──────────────────────────────────────────────────── */
.sz-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
}

.sz-icon-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.sz-icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 40px;
  background: var(--grey-05);
  border-radius: 6px;
  color: var(--grey-80);
}

/* ── Container / Overlay bars ───────────────────────────────────── */
.sz-container-bar {
  height: 12px;
  background: var(--blue-azure-20);
  border-radius: 3px;
  min-width: 4px;
  max-width: 240px;
}

.sz-container-bar--overlay {
  background: var(--indigo-20, #e8eaf6);
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .sz-main { padding: 32px 20px 60px; }
  .sz-spacing-row { grid-template-columns: 110px 1fr 44px; }
  .sz-spacing-row > .sz-usage { display: none; }
  .sz-radius-grid { grid-template-columns: repeat(3, 1fr); }
  .sz-icon-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
