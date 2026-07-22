<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Process</h1>
      <p class="ds-body ds-body--wide">
        How a pattern becomes a component, how it gets published, and how the loop stays tight
        between design and code. This covers both sides of the work — Figma and Vue — so
        designers and developers share the same mental model.
      </p>
    </section>

    <!-- ── Phase 1: Add ────────────────────────────────────── -->
    <section class="ds-section">
      <div class="ds-phase-header">
        <span class="ds-eyebrow">Phase 1</span>
        <h2 class="ds-h2">Adding a new component</h2>
        <p class="ds-body">
          A component earns its place in the system when the same pattern appears in three or
          more places in the product, or when a new feature introduces a UI element that will
          recur. One-off solutions stay in product code.
        </p>
      </div>

      <div class="ds-steps">

        <div class="ds-step">
          <div class="ds-step__track">
            <div class="ds-step__num">1</div>
            <div class="ds-step__line"></div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Identify the need</span>
              <span class="ds-badge ds-badge--both">Both</span>
            </div>
            <p class="ds-step__desc">
              Notice a recurring UI pattern or receive a request for a new element. Check whether
              something close already exists before starting. If it does, consider refining rather
              than adding.
            </p>
          </div>
        </div>

        <div class="ds-step">
          <div class="ds-step__track">
            <div class="ds-step__num">2</div>
            <div class="ds-step__line"></div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Design in Figma</span>
              <span class="ds-badge ds-badge--designer">Designer</span>
            </div>
            <p class="ds-step__desc">
              Finalise all variants, sizes, and states in the Figma design file
              (<code>w6mC7PaMgtX4fbmagiDtAq</code>). Assign tokens from the existing primitive
              and semantic scales — avoid raw hex values. Document the component's anatomy with
              annotations before handing off.
            </p>
          </div>
        </div>

        <div class="ds-step">
          <div class="ds-step__track">
            <div class="ds-step__num">3</div>
            <div class="ds-step__line"></div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Extract specs</span>
              <span class="ds-badge ds-badge--both">Both</span>
            </div>
            <p class="ds-step__desc">
              Use <code>get_design_context</code> with the node ID to pull sizing, spacing,
              and token values from Figma. Map every colour back to a CSS custom property in
              <code>src/foundations/colors.css</code>. If a needed token doesn't exist, add
              it there — not inline.
            </p>
          </div>
        </div>

        <div class="ds-step">
          <div class="ds-step__track">
            <div class="ds-step__num">4</div>
            <div class="ds-step__line"></div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Implement in Vue</span>
              <span class="ds-badge ds-badge--developer">Developer</span>
            </div>
            <p class="ds-step__desc">
              Create <code>src/components/ui/App{Name}.vue</code> using the Composition API
              (<code>&lt;script setup&gt;</code>). Follow the existing component API conventions —
              props named consistently, slots for icons, <code>$attrs</code> passed through.
              Style with scoped CSS using only design tokens.
            </p>
          </div>
        </div>

        <div class="ds-step">
          <div class="ds-step__track">
            <div class="ds-step__num">5</div>
            <div class="ds-step__line"></div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Document in this site</span>
              <span class="ds-badge ds-badge--developer">Developer</span>
            </div>
            <p class="ds-step__desc">
              Add <code>src/pages/{Name}Page.vue</code> with a live state grid, example card,
              token table, and an interactive demo where relevant. Wire it into
              <code>src/App.vue</code> — import, sidebar button, and conditional render. Keep
              the copy tight: one sentence of purpose, no padding text.
            </p>
          </div>
        </div>

        <div class="ds-step ds-step--last">
          <div class="ds-step__track">
            <div class="ds-step__num">6</div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Review</span>
              <span class="ds-badge ds-badge--both">Both</span>
            </div>
            <p class="ds-step__desc">
              Designer checks the rendered output against Figma — states, spacing, token
              fidelity. Developer checks the API is consistent with existing components.
              Both sign off before publishing.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Phase 2: Publish ─────────────────────────────────── -->
    <section class="ds-section">
      <div class="ds-phase-header">
        <span class="ds-eyebrow">Phase 2</span>
        <h2 class="ds-h2">Publishing</h2>
        <p class="ds-body">
          Publishing is automatic. Every push to <code>main</code> triggers a GitHub Actions
          build and deploys the updated site to GitHub Pages.
        </p>
      </div>

      <div class="ds-publish-flow">
        <div class="ds-publish-step">
          <div class="ds-publish-step__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v9M6 8l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 14v1.5A1.5 1.5 0 004.5 17h11a1.5 1.5 0 001.5-1.5V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="ds-publish-step__label">Push to <code>main</code></div>
        </div>
        <div class="ds-publish-arrow">→</div>
        <div class="ds-publish-step">
          <div class="ds-publish-step__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
              <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ds-publish-step__label">GitHub Actions runs <code>npm run build</code></div>
        </div>
        <div class="ds-publish-arrow">→</div>
        <div class="ds-publish-step">
          <div class="ds-publish-step__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <path d="M6 8h8M6 11h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="ds-publish-step__label">Live on GitHub Pages</div>
        </div>
      </div>

      <div class="ds-callout-row">
        <div class="ds-callout ds-callout--info">
          <strong>Dev commands</strong>
          <div class="ds-cmd-list">
            <div class="ds-cmd"><code>npm run dev</code><span>Local dev server with HMR</span></div>
            <div class="ds-cmd"><code>npm run build</code><span>Production build → dist/</span></div>
            <div class="ds-cmd"><code>npm run preview</code><span>Preview the built output locally</span></div>
          </div>
        </div>
        <div class="ds-callout ds-callout--neutral">
          <strong>Branch rules</strong>
          <p>Work on a feature branch and open a PR for review. Merge to <code>main</code>
          only after both designer and developer sign off. Direct pushes to main should be
          reserved for small, isolated fixes.</p>
        </div>
      </div>
    </section>

    <!-- ── Phase 3: Use ────────────────────────────────────── -->
    <section class="ds-section">
      <div class="ds-phase-header">
        <span class="ds-eyebrow">Phase 3</span>
        <h2 class="ds-h2">Using components</h2>
      </div>

      <div class="ds-use-cols">
        <div class="ds-use-card">
          <div class="ds-use-card__role ds-use-card__role--designer">Designer</div>
          <ul class="ds-use-list">
            <li>Use components from the Figma library — pull instances, don't redraw from scratch</li>
            <li>Stick to the token scales in <strong>primitives</strong> and <strong>semantic</strong> layers; avoid detaching</li>
            <li>Reference this site for which variant fits the context</li>
            <li>File a refinement request before overriding a component in product mockups</li>
          </ul>
        </div>
        <div class="ds-use-card">
          <div class="ds-use-card__role ds-use-card__role--developer">Developer</div>
          <ul class="ds-use-list">
            <li>Import from <code>src/components/ui/</code> — <code>AppButton</code>, <code>AppInput</code>, <code>AppSelect</code>, <code>AppTag</code></li>
            <li>Pass only documented props; use slots for icons and custom content</li>
            <li>Never hardcode hex values — always reference a CSS custom property</li>
            <li>Check the token table on each component's doc page before adding custom CSS</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Phase 4: Refine ─────────────────────────────────── -->
    <section class="ds-section">
      <div class="ds-phase-header">
        <span class="ds-eyebrow">Phase 4</span>
        <h2 class="ds-h2">Refining</h2>
        <p class="ds-body">
          Refinements follow the same path as additions — Figma first, code second — but the
          scope is narrower. The goal is to keep the system honest: if the docs don't match
          reality, update the docs.
        </p>
      </div>

      <div class="ds-steps">

        <div class="ds-step">
          <div class="ds-step__track">
            <div class="ds-step__num ds-step__num--sm">1</div>
            <div class="ds-step__line"></div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">File a change request</span>
              <span class="ds-badge ds-badge--both">Both</span>
            </div>
            <p class="ds-step__desc">
              Describe what's wrong or missing and where it surfaces in the product. Screenshots
              and Figma links help. Keep requests scoped — one component or token per thread.
            </p>
          </div>
        </div>

        <div class="ds-step">
          <div class="ds-step__track">
            <div class="ds-step__num ds-step__num--sm">2</div>
            <div class="ds-step__line"></div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Update Figma first</span>
              <span class="ds-badge ds-badge--designer">Designer</span>
            </div>
            <p class="ds-step__desc">
              Update the component in the Figma file. Adjust tokens if the change is a token
              value; adjust the component anatomy if it's structural. Tag the developer when
              the Figma update is ready for handoff.
            </p>
          </div>
        </div>

        <div class="ds-step">
          <div class="ds-step__track">
            <div class="ds-step__num ds-step__num--sm">3</div>
            <div class="ds-step__line"></div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Update code and docs</span>
              <span class="ds-badge ds-badge--developer">Developer</span>
            </div>
            <p class="ds-step__desc">
              Apply the change to the component file and its documentation page. If the prop
              API changes, update both the component and any pages that use it. If a token
              value changes, update <code>src/foundations/colors.css</code> — it propagates
              everywhere automatically.
            </p>
          </div>
        </div>

        <div class="ds-step ds-step--last">
          <div class="ds-step__track">
            <div class="ds-step__num ds-step__num--sm">4</div>
          </div>
          <div class="ds-step__body">
            <div class="ds-step__meta">
              <span class="ds-step__title">Publish and notify</span>
              <span class="ds-badge ds-badge--both">Both</span>
            </div>
            <p class="ds-step__desc">
              Push to <code>main</code>, confirm the deploy goes through, and post a brief
              changelog note so the team knows what changed. Link to the updated doc page
              so people can see the before/after quickly.
            </p>
          </div>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────── */
.ds-main {
  max-width: 880px;
  margin: 0 auto;
  padding: 48px 40px 96px;
  display: flex;
  flex-direction: column;
  gap: 64px;
}
.ds-section { display: flex; flex-direction: column; gap: 28px; }

/* ── Typography ──────────────────────────────────────────────── */
.ds-h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--grey-100);
  line-height: 1.1;
  margin-bottom: 4px;
}
.ds-h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--grey-100);
  line-height: 1.2;
  margin: 0;
}
.ds-body {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 1.7;
  max-width: 640px;
}
.ds-body--wide { max-width: 760px; }

code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  background: var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-90);
}

/* ── Phase header ────────────────────────────────────────────── */
.ds-phase-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--grey-20);
}
.ds-eyebrow {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--blue-azure-50);
}

/* ── Step stepper ────────────────────────────────────────────── */
.ds-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.ds-step {
  display: flex;
  gap: 20px;
}
.ds-step__track {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 28px;
}
.ds-step__num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--indigo-100, #010028);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
}
.ds-step__num--sm {
  background: var(--grey-20);
  color: var(--grey-80);
}
.ds-step__line {
  width: 1px;
  flex: 1;
  background: var(--grey-20);
  min-height: 24px;
  margin: 4px 0;
}
.ds-step__body {
  padding-bottom: 32px;
  flex: 1;
}
.ds-step--last .ds-step__body { padding-bottom: 0; }
.ds-step__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  margin-top: 2px;
}
.ds-step__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--grey-100);
}
.ds-step__desc {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 1.65;
  max-width: 600px;
}

/* ── Role badges ─────────────────────────────────────────────── */
.ds-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 100px;
  letter-spacing: .02em;
}
.ds-badge--designer {
  background: var(--blue-azure-10, #e8f6ff);
  color: var(--blue-azure-70, #0a74a6);
}
.ds-badge--developer {
  background: #edfbf0;
  color: var(--green-90, #247a31);
}
.ds-badge--both {
  background: var(--grey-10);
  color: var(--grey-70);
}

/* ── Publish flow ────────────────────────────────────────────── */
.ds-publish-flow {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 24px 28px;
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 8px;
}
.ds-publish-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  flex: 1;
  min-width: 120px;
}
.ds-publish-step__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--grey-20);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey-80);
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.ds-publish-step__label {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.4;
}
.ds-publish-arrow {
  font-size: 18px;
  color: var(--grey-30);
  flex-shrink: 0;
  margin-top: -16px;
}

/* ── Callout row ─────────────────────────────────────────────── */
.ds-callout-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.ds-callout {
  padding: 18px 20px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
}
.ds-callout strong { display: block; font-weight: 600; margin-bottom: 12px; color: var(--grey-100); }
.ds-callout p { color: var(--grey-70); margin: 0; }
.ds-callout--info {
  background: var(--blue-azure-10, #e8f6ff);
  border: 1px solid #c5e8f8;
}
.ds-callout--neutral {
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
}
.ds-callout--info code { background: rgba(0,0,0,.06); }

.ds-cmd-list { display: flex; flex-direction: column; gap: 8px; }
.ds-cmd {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}
.ds-cmd code {
  font-size: 12px;
  white-space: nowrap;
  background: rgba(0,0,0,.07);
  color: var(--grey-90);
}
.ds-cmd span { color: var(--grey-70); }

/* ── Use cols ────────────────────────────────────────────────── */
.ds-use-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.ds-use-card {
  padding: 20px 22px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
}
.ds-use-card__role {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 14px;
  padding: 4px 10px;
  border-radius: 100px;
  display: inline-block;
}
.ds-use-card__role--designer {
  background: var(--blue-azure-10, #e8f6ff);
  color: var(--blue-azure-70, #0a74a6);
}
.ds-use-card__role--developer {
  background: #edfbf0;
  color: var(--green-90, #247a31);
}
.ds-use-list {
  margin: 0;
  padding: 0 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ds-use-list li {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 1.55;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 720px) {
  .ds-main { padding: 32px 20px 64px; }
  .ds-callout-row,
  .ds-use-cols { grid-template-columns: 1fr; }
  .ds-publish-flow { flex-direction: column; }
  .ds-publish-arrow { transform: rotate(90deg); margin: 0; }
}
</style>
