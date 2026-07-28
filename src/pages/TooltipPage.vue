<script setup>
import AppTooltip from '../components/ui/AppTooltip.vue'
import AppButton  from '../components/ui/AppButton.vue'
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Tooltip</h1>
      <p class="ds-lead">2 variants · 3 positions · hover &amp; focus triggered</p>
      <p class="ds-body">
        Tooltips display additional information upon hover or focus that is contextual, helpful
        while providing the ability to communicate and give clarity to a user.
      </p>
    </section>

    <!-- ── Variants ───────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>
      <p class="ds-body">
        Tooltip is available in two visual variants — light and dark. The light variant is the
        default and works well on most UI backgrounds.
      </p>

      <div class="ds-state-row">
        <div class="ds-state-cell">
          <div class="tt tt--light">Tooltip text here</div>
          <span class="ds-state-label">Light (default)</span>
        </div>
        <div class="ds-state-cell">
          <div class="tt tt--dark">Tooltip text here</div>
          <span class="ds-state-label">Dark</span>
        </div>
        <div class="ds-state-cell">
          <div class="tt tt--dark" style="max-width:180px">
            Longer description that wraps across two lines
          </div>
          <span class="ds-state-label">Multi-line</span>
        </div>
      </div>
    </section>

    <!-- ── Positioning ────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">
        Tooltip is always related to another UI element and triggered on hover. Ideally, the
        tooltip always appears <strong>above</strong> the trigger element. When not possible, it
        can appear on the left or right side. Tooltip contains short text or a brief description.
      </p>

      <div class="ds-examples-grid">

        <div class="ds-example-card">
          <p class="ds-example-label">Top (default)</p>
          <div class="tt-position-demo">
            <div class="tt tt--light tt--pos-top">Show label</div>
            <button class="tt-trigger">Icon button</button>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-label">Left</p>
          <div class="tt-position-demo tt-position-demo--row">
            <div class="tt tt--light">Show label</div>
            <button class="tt-trigger">Icon button</button>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-label">Right</p>
          <div class="tt-position-demo tt-position-demo--row">
            <button class="tt-trigger">Icon button</button>
            <div class="tt tt--light">Show label</div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Live hover demo ───────────────────────────────── -->
    <!-- ── Component demo ────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component</h2>
      <p class="ds-body">AppTooltip wraps any trigger element — hover to reveal.</p>
      <div class="ds-card tt-demo-card">
        <div class="tt-demo-group">
          <p class="tt-demo-group__label">Light (default)</p>
          <div class="tt-demo-row">
            <AppTooltip content="Open settings" position="top">
              <AppButton variant="quiet" size="sm">Settings</AppButton>
            </AppTooltip>
            <AppTooltip content="Download report" position="top">
              <AppButton variant="quiet" size="sm">Download</AppButton>
            </AppTooltip>
          </div>
        </div>
        <div class="tt-demo-group">
          <p class="tt-demo-group__label">Dark variant</p>
          <div class="tt-demo-row">
            <AppTooltip content="Filter results" variant="dark" position="bottom">
              <AppButton variant="quiet" size="sm">Filter</AppButton>
            </AppTooltip>
            <AppTooltip content="Sort column ascending" variant="dark" position="bottom">
              <AppButton variant="quiet" size="sm">Sort</AppButton>
            </AppTooltip>
          </div>
        </div>
      </div>
    </section>

    <section class="ds-section">
      <h2 class="ds-h2">Live Demo</h2>
      <p class="ds-body">Hover over each element to see the tooltip appear.</p>
      <div class="ds-card tt-demo-card">

        <div class="tt-demo-group">
          <p class="tt-demo-group__label">Icon button with label</p>
          <div class="tt-demo-row">
            <div class="tt-anchor">
              <button class="tt-icon-btn" aria-label="Settings">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" stroke-width="1.25"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.93 2.93l1.06 1.06M12.01 12.01l1.06 1.06M2.93 13.07l1.06-1.06M12.01 3.99l1.06-1.06" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
              </button>
              <div class="tt tt--light tt--live">Settings</div>
            </div>
            <div class="tt-anchor">
              <button class="tt-icon-btn" aria-label="Download">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12h12" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
              </button>
              <div class="tt tt--light tt--live">Download</div>
            </div>
            <div class="tt-anchor">
              <button class="tt-icon-btn" aria-label="Delete">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div class="tt tt--light tt--live">Delete</div>
            </div>
          </div>
        </div>

        <div class="tt-demo-group">
          <p class="tt-demo-group__label">Definition tooltip on inline text</p>
          <p class="ds-body">
            The vehicle's
            <span class="tt-anchor tt-anchor--inline">
              <span class="tt-definition-trigger">ELD compliance</span>
              <div class="tt tt--light tt--live tt--wide">Electronic Logging Device — records Hours of Service automatically</div>
            </span>
            status is automatically updated every 15 minutes via the telematics module.
          </p>
        </div>

        <div class="tt-demo-group">
          <p class="tt-demo-group__label">Dark variant</p>
          <div class="tt-demo-row">
            <div class="tt-anchor">
              <button class="tt-icon-btn" aria-label="Filter">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
              </button>
              <div class="tt tt--dark tt--live">Filter results</div>
            </div>
            <div class="tt-anchor">
              <button class="tt-icon-btn" aria-label="Sort">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5h12M4 8h8M6 11h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
              </button>
              <div class="tt tt--dark tt--live">Sort column</div>
            </div>
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
              <strong>Labelling icon buttons</strong> — show names of controls that lack visual labels.
            </li>
            <li>
              <strong>Providing additional context</strong> — help users make informed decisions for focusable elements.
            </li>
            <li>
              <strong>Inline definitions</strong> — define a term or give extra help within text, labels, or compact spaces like data tables where extra icons would clutter the interface.
            </li>
            <li>
              <strong>Offering explanation</strong> — offer more context for specific elements without disrupting the layout.
            </li>
          </ul>
        </div>

        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Do not use when</p>
          <ul class="ds-usage-list">
            <li>
              <strong>Communicating critical information or actions</strong> — use an inline message, modal, or alert instead.
            </li>
            <li>
              <strong>Including interactive elements</strong> — tooltips must not contain buttons, links, or other interactive content.
            </li>
          </ul>
        </div>

      </div>
    </section>

    <!-- ── Interaction & States ───────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction &amp; States</h2>
      <p class="ds-body">
        Tooltip has two states: <strong>visible</strong> (on hover or focus) and
        <strong>hidden</strong> (default). By default, the tooltip is hidden and inactive.
      </p>

      <div class="ds-state-row">
        <div class="ds-state-cell">
          <div class="tt-state-demo tt-state-demo--hidden">
            <div class="tt-trigger-small">Trigger</div>
          </div>
          <span class="ds-state-label">Hidden (default)</span>
        </div>
        <div class="ds-state-cell">
          <div class="tt-state-demo">
            <div class="tt tt--dark" style="margin-bottom:8px">Tooltip label</div>
            <div class="tt-trigger-small tt-trigger-small--active">Trigger</div>
          </div>
          <span class="ds-state-label">Visible (hover / focus)</span>
        </div>
      </div>

      <div class="ds-interaction-grid">
        <div class="ds-interaction-card">
          <div class="ds-interaction-card__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 4.5l5 5.5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="4.5" r="1.5" fill="currentColor"/></svg>
          </div>
          <div>
            <strong class="ds-interaction-card__title">Mouse</strong>
            <p class="ds-body">
              Tooltips are triggered when the mouse hovers over the UI trigger. The tooltip
              persists if the mouse remains over the active container or the trigger. It is
              dismissed by hovering away to another element.
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
              Users can navigate to the UI trigger and display the tooltip by pressing
              <kbd>Tab</kbd>. The tooltip can be dismissed by pressing the <kbd>Esc</kbd> key.
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

/* ── Tooltip component ───────────────────────────────────────── */
.tt {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
}
.tt--dark  { background: var(--grey-100); color: #fff; }
.tt--light { background: #fff; color: var(--grey-90); box-shadow: inset 0 0 0 1px var(--grey-20); }
.tt--wide  { white-space: normal; max-width: 220px; }

/* ── State strip ─────────────────────────────────────────────── */
.ds-state-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  padding: 28px 24px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  align-items: flex-end;
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

/* ── Positioning demos ───────────────────────────────────────── */
.ds-examples-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
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

.tt-position-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 0 8px;
}
.tt-position-demo--row {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 0;
}
.tt-trigger {
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--grey-80);
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 6px;
  padding: 6px 14px;
  cursor: default;
  white-space: nowrap;
}

/* ── Live hover demo ─────────────────────────────────────────── */
.ds-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.tt-demo-card { gap: 24px; }
.tt-demo-group { display: flex; flex-direction: column; gap: 10px; }
.tt-demo-group__label {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .07em;
}
.tt-demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* Anchor: positions the tooltip absolutely above trigger */
.tt-anchor {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.tt-anchor--inline {
  display: inline;
}

/* Tooltip in live mode: hidden by default, shown on hover */
.tt--live {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms;
  z-index: 10;
  white-space: nowrap;
}
.tt-anchor--inline .tt--live {
  left: 0;
  transform: none;
}
.tt-anchor:hover .tt--live,
.tt-anchor:focus-within .tt--live {
  opacity: 1;
}

/* Icon button trigger */
.tt-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--grey-20);
  background: var(--grey-05);
  color: var(--grey-70);
  cursor: pointer;
  transition: background 100ms, color 100ms, border-color 100ms;
}
.tt-icon-btn:hover {
  background: var(--grey-10);
  color: var(--grey-90);
  border-color: var(--grey-30);
}

/* Definition tooltip trigger */
.tt-definition-trigger {
  color: var(--blue-azure-70);
  text-decoration: underline;
  text-decoration-style: dotted;
  cursor: help;
}

/* ── State demos ─────────────────────────────────────────────── */
.tt-state-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  min-height: 60px;
  justify-content: flex-end;
}
.tt-state-demo--hidden {
  justify-content: flex-end;
}
.tt-trigger-small {
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  color: var(--grey-70);
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 4px;
  padding: 4px 10px;
}
.tt-trigger-small--active {
  border-color: var(--blue-azure-50);
  box-shadow: 0 0 0 2px rgba(57, 173, 227, .25);
}

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

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-examples-grid { grid-template-columns: 1fr; }
  .ds-usage-grid { grid-template-columns: 1fr; }
  .ds-interaction-grid { grid-template-columns: 1fr; }
}
</style>
