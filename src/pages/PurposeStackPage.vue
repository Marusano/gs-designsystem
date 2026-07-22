<script setup>
</script>

<template>
  <main class="ps-main">

    <!-- ── Hero ────────────────────────────────────────────────── -->
    <section class="ps-hero">
      <p class="ps-eyebrow">About · v0.1.0</p>
      <h1 class="ps-title">GSFleet Design System</h1>
      <p class="ps-lead">
        The shared visual language for the GSFleet fleet-management product.
        Every component, token, and pattern is rendered interactively in the browser.
        This site is the source of truth for behaviour and exact rendering.
      </p>
      <div class="ps-links">
        <a href="https://www.figma.com/design/w6mC7PaMgtX4fbmagiDtAq" target="_blank" rel="noopener" class="ps-link">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Figma file
        </a>
        <a href="https://github.com/Marusano/gs-designsystem" target="_blank" rel="noopener" class="ps-link">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          GitHub
        </a>
      </div>
    </section>

    <!-- ── Purpose ──────────────────────────────────────────────── -->
    <section class="ps-section">
      <p class="ps-section-eyebrow">Purpose</p>
      <h2 class="ps-h2">Why this exists</h2>
      <p class="ps-body">
        The design system exists so that new UI work starts from a stable, shared baseline —
        no re-inventing colour usage, sizing, or component behaviour from scratch each sprint.
        Designers reference the Figma file. Engineers reference the live site and this document.
        Both tools are kept in sync with the same token source:
        <code>src/foundations/colors.css</code>.
      </p>

      <div class="ps-audience-row">
        <div class="ps-audience-card">
          <div class="ps-audience-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 16.5h7M10 13v3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </div>
          <h3 class="ps-audience-title">Designers</h3>
          <p class="ps-audience-body">
            Use the Figma file as the primary design tool. All components,
            colour styles, and spacing are tokenised — changes to a token
            propagate across the entire file automatically.
          </p>
        </div>
        <div class="ps-audience-card">
          <div class="ps-audience-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7l-3 3 3 3M15 7l3 3-3 3M12 4l-4 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="ps-audience-title">Engineers</h3>
          <p class="ps-audience-body">
            Import components from <code>src/components/ui/</code> and use
            CSS custom properties from <code>src/foundations/colors.css</code>.
            Never hardcode hex values — always reference a token.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Stack ─────────────────────────────────────────────────── -->
    <section class="ps-section">
      <p class="ps-section-eyebrow">Stack</p>
      <h2 class="ps-h2">Technical foundation</h2>
      <p class="ps-body">
        The documentation site is a Vue 3 app built with Vite. All styling
        uses CSS custom properties in scoped <code>&lt;style&gt;</code> blocks —
        no utility-class frameworks in components.
      </p>

      <div class="ps-spec-grid">
        <div class="ps-spec-card">
          <div class="ps-spec-label">Framework</div>
          <div class="ps-spec-value">Vue 3 · Composition API · <code>&lt;script setup&gt;</code></div>
        </div>
        <div class="ps-spec-card">
          <div class="ps-spec-label">Build tool</div>
          <div class="ps-spec-value">Vite 5</div>
        </div>
        <div class="ps-spec-card">
          <div class="ps-spec-label">Styling</div>
          <div class="ps-spec-value">CSS custom properties · scoped <code>&lt;style&gt;</code></div>
        </div>
        <div class="ps-spec-card">
          <div class="ps-spec-label">Font</div>
          <div class="ps-spec-value">Inter — all weights via Google Fonts</div>
        </div>
        <div class="ps-spec-card">
          <div class="ps-spec-label">Token source</div>
          <div class="ps-spec-value"><code>src/foundations/colors.css</code></div>
        </div>
        <div class="ps-spec-card">
          <div class="ps-spec-label">Figma file key</div>
          <div class="ps-spec-value"><code>w6mC7PaMgtX4fbmagiDtAq</code></div>
        </div>
        <div class="ps-spec-card">
          <div class="ps-spec-label">Deploy</div>
          <div class="ps-spec-value">GitHub Actions → GitHub Pages on push to <code>main</code></div>
        </div>
        <div class="ps-spec-card">
          <div class="ps-spec-label">Version</div>
          <div class="ps-spec-value">v0.1.0</div>
        </div>
      </div>
    </section>

    <!-- ── Key conventions ───────────────────────────────────────── -->
    <section class="ps-section">
      <p class="ps-section-eyebrow">Conventions</p>
      <h2 class="ps-h2">Key rules to know</h2>

      <div class="ps-callout">
        <strong>Borders use <code>box-shadow: inset 0 0 0 1px &lt;token&gt;</code>, not <code>border</code>.</strong>
        This avoids layout shift when border width changes on state transitions.
        Apply the same technique when building new components.
      </div>

      <div class="ps-rule-list">
        <div class="ps-rule">
          <div class="ps-rule-badge ps-rule-badge--do">✓</div>
          <p>Reference CSS variables everywhere — <code>var(--grey-70)</code>, not <code>#6f7176</code>.</p>
        </div>
        <div class="ps-rule">
          <div class="ps-rule-badge ps-rule-badge--do">✓</div>
          <p>Use <code>&lt;style scoped&gt;</code> in every <code>.vue</code> file. Global tokens only in <code>colors.css</code>.</p>
        </div>
        <div class="ps-rule">
          <div class="ps-rule-badge ps-rule-badge--do">✓</div>
          <p>Follow the class naming prefix: <code>ds-</code> for shell elements, page-prefix for page internals.</p>
        </div>
        <div class="ps-rule">
          <div class="ps-rule-badge ps-rule-badge--dont">✕</div>
          <p>Don't hardcode hex values, pixel sizes, or font families without a token. Always map to <code>colors.css</code> first.</p>
        </div>
        <div class="ps-rule">
          <div class="ps-rule-badge ps-rule-badge--dont">✕</div>
          <p>Don't use <code>border</code> for interactive component borders — use <code>box-shadow: inset</code> to avoid layout shift.</p>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ps-main {
  max-width: 880px;
  margin: 0 auto;
  padding: 48px 40px 96px;
  display: flex;
  flex-direction: column;
  gap: 64px;
  font-family: 'Inter', sans-serif;
}

/* ── Hero ──────────────────────────────────────────────────────── */
.ps-hero {
  background: var(--indigo-100);
  border-radius: 10px;
  padding: 40px 44px;
  border-bottom: 3px solid var(--blue-azure-50);
}

.ps-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--blue-azure-50);
  margin-bottom: 10px;
}

.ps-title {
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 12px;
}

.ps-lead {
  font-size: 14px;
  color: rgba(255, 255, 255, .65);
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 24px;
}

.ps-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.ps-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, .7);
  text-decoration: none;
  padding: 5px 12px;
  border: 1px solid rgba(255, 255, 255, .18);
  border-radius: 4px;
  transition: border-color 120ms, color 120ms;
}

.ps-link:hover {
  color: #fff;
  border-color: var(--blue-azure-50);
}

/* ── Section ────────────────────────────────────────────────────── */
.ps-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ps-section-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--blue-azure-70);
}

.ps-h2 {
  font-size: 22px;
  font-weight: 700;
  color: var(--grey-100);
  line-height: 1.2;
  margin-top: -8px;
}

.ps-body {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 1.7;
  max-width: 620px;
}

/* ── Audience cards ─────────────────────────────────────────────── */
.ps-audience-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 4px;
}

.ps-audience-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ps-audience-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--blue-azure-10);
  color: var(--blue-azure-70);
  flex-shrink: 0;
}

.ps-audience-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--grey-100);
}

.ps-audience-body {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.6;
}

/* ── Spec grid ──────────────────────────────────────────────────── */
.ps-spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 4px;
}

.ps-spec-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 14px 16px;
}

.ps-spec-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--grey-50);
  margin-bottom: 5px;
}

.ps-spec-value {
  font-size: 13px;
  font-weight: 500;
  color: var(--grey-90);
  line-height: 1.4;
}

/* ── Callout ─────────────────────────────────────────────────────── */
.ps-callout {
  background: var(--blue-azure-10);
  border-left: 3px solid var(--blue-azure-50);
  padding: 12px 16px;
  border-radius: 0 6px 6px 0;
  font-size: 13px;
  color: var(--grey-90);
  line-height: 1.6;
}

/* ── Rules ───────────────────────────────────────────────────────── */
.ps-rule-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ps-rule {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--grey-80);
  line-height: 1.55;
}

.ps-rule p { margin: 0; }

.ps-rule-badge {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

.ps-rule-badge--do   { background: #d3f5d8; color: #12591c; }
.ps-rule-badge--dont { background: #fce8e8; color: #7b1212; }

code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-80);
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ps-main { padding: 32px 20px 60px; }
  .ps-hero { padding: 28px 24px; }
  .ps-audience-row { grid-template-columns: 1fr; }
  .ps-spec-grid { grid-template-columns: 1fr 1fr; }
}
</style>
