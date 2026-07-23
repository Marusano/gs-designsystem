<script setup>
import { ref } from 'vue'

const demoTab1 = ref(0)
const demoTab2 = ref(0)
const demoTab3 = ref(0)
</script>

<template>
  <main class="ds-main">

    <!-- Title -->
    <section class="ds-section">
      <h1 class="ds-h1">Tabs</h1>
      <p class="ds-lead">Contained and borderless variants · selected, unselected, hover, focus, disabled</p>
      <p class="ds-body">Tabs are used to organize related content. They allow the user to navigate between groups of information that appear within the same context.</p>
      <p class="ds-body">Tabs are used to group different but related content, allowing users to navigate views without leaving the page. Tabs can be used on full page layouts or in components such as modals.</p>
    </section>

    <!-- States -->
    <section class="ds-section">
      <h2 class="ds-h2">States</h2>
      <p class="ds-body">One tab is always selected by default. Hover, focus, and disabled states are shown below.</p>
      <div class="tb-states-grid">
        <div class="tb-state-card">
          <p class="tb-state-card__label">Default (first selected)</p>
          <div class="tb-tabs tb-tabs--contained">
            <button class="tb-tab tb-tab--selected">Tab 1</button>
            <button class="tb-tab">Tab 2</button>
            <button class="tb-tab">Tab 3</button>
          </div>
        </div>
        <div class="tb-state-card">
          <p class="tb-state-card__label">Hover</p>
          <div class="tb-tabs tb-tabs--contained">
            <button class="tb-tab tb-tab--selected">Tab 1</button>
            <button class="tb-tab tb-tab--hover">Tab 2</button>
            <button class="tb-tab">Tab 3</button>
          </div>
        </div>
        <div class="tb-state-card">
          <p class="tb-state-card__label">Focus</p>
          <div class="tb-tabs tb-tabs--contained">
            <button class="tb-tab tb-tab--selected">Tab 1</button>
            <button class="tb-tab tb-tab--focus">Tab 2</button>
            <button class="tb-tab">Tab 3</button>
          </div>
        </div>
        <div class="tb-state-card">
          <p class="tb-state-card__label">Disabled</p>
          <div class="tb-tabs tb-tabs--contained">
            <button class="tb-tab tb-tab--selected">Tab 1</button>
            <button class="tb-tab">Tab 2</button>
            <button class="tb-tab" disabled>Tab 3</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Variants -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>
      <div class="tb-variants-grid">

        <div class="tb-variant-card">
          <p class="tb-variant-card__label">Contained</p>
          <p class="ds-body tb-variant-desc">Tabs sit inside a bordered container. Use in cards, panels, modals, and data tables.</p>
          <div class="tb-tabs tb-tabs--contained">
            <button
              v-for="(tab, i) in ['Monitoring', 'Asset details', 'History']"
              :key="i"
              :class="['tb-tab', { 'tb-tab--selected': demoTab1 === i }]"
              @click="demoTab1 = i"
            >{{ tab }}</button>
          </div>
          <div class="tb-panel">
            <p class="ds-body" style="color: var(--grey-50)">
              {{ ['Monitoring view content', 'Asset details content', 'History content'][demoTab1] }}
            </p>
          </div>
        </div>

        <div class="tb-variant-card">
          <p class="tb-variant-card__label">Borderless</p>
          <p class="ds-body tb-variant-desc">No outer container border. Use on full-page layouts where tabs sit directly on the page surface.</p>
          <div class="tb-tabs tb-tabs--borderless">
            <button
              v-for="(tab, i) in ['Overview', 'Details', 'Settings']"
              :key="i"
              :class="['tb-tab', { 'tb-tab--selected': demoTab2 === i }]"
              @click="demoTab2 = i"
            >{{ tab }}</button>
          </div>
          <div class="tb-panel tb-panel--borderless">
            <p class="ds-body" style="color: var(--grey-50)">
              {{ ['Overview content', 'Details content', 'Settings content'][demoTab2] }}
            </p>
          </div>
        </div>

        <div class="tb-variant-card">
          <p class="tb-variant-card__label">Compact (2 tabs)</p>
          <p class="ds-body tb-variant-desc">Minimum of two tabs. Common in side panels and compact modal headers.</p>
          <div class="tb-tabs tb-tabs--contained">
            <button
              v-for="(tab, i) in ['Monitoring', 'Asset details']"
              :key="i"
              :class="['tb-tab', { 'tb-tab--selected': demoTab3 === i }]"
              @click="demoTab3 = i"
            >{{ tab }}</button>
          </div>
        </div>

      </div>
    </section>

    <!-- Usage -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Use tabs to group related information into different categories to help reduce cognitive load.</li>
            <li>Use to organize content such as forms, settings, and dashboards so users do not have to navigate away from their workflow.</li>
            <li>Use short, clear, specific labels — one to two words — so they are easy to scan.</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li><strong>Don't use to indicate progress.</strong> When the user needs to work through a step-by-step linear process, use a stepper instead.</li>
            <li><strong>Don't use when users need to compare content</strong> across groups — clicking back and forth to complete a task creates unnecessary friction.</li>
            <li>Don't use icons inside tab labels unless in icon-only tabs for mobile or tightly constrained spaces.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Formatting -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <div class="ds-formatting-body">
        <p class="ds-body"><strong>Two zones.</strong> The tab component consists of two distinct zones: selected and unselected. One tab is always selected by default.</p>
        <p class="ds-body"><strong>Minimum tabs.</strong> There are always at least two tabs in non-dismissible tab groups and at least one in dismissible tab groups.</p>
        <p class="ds-body"><strong>Labels.</strong> Use short tab labels that are clear and specific — one to two words — as these are easier to scan.</p>
        <p class="ds-body"><strong>Icons.</strong> Icons are optional and not recommended in most cases. Icon-only tabs are supported for mobile breakpoints and can be used in small, defined spaces.</p>
        <p class="ds-body"><strong>Scrollable tabs.</strong> When your page requires more tabs than can fit, or needs to adapt to a new browser size, tabs should become horizontally scrollable.</p>
      </div>
    </section>

    <!-- Interaction -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction</h2>
      <div class="ds-interaction-grid">
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Mouse</p>
          <ul class="ds-usage-list">
            <li>Click anywhere in the tab container area to select it</li>
            <li>Only one tab can be selected at a time — the previous tab is automatically deselected</li>
            <li>If a user navigates away, the selected tab remains until the user changes it</li>
          </ul>
        </div>
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Keyboard</p>
          <ul class="ds-usage-list">
            <li><kbd>Tab</kbd> — moves focus to the tab group</li>
            <li><kbd>←</kbd> <kbd>→</kbd> — navigate between tabs</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> — selects the focused tab</li>
            <li>One tab is pre-selected by default (usually the first)</li>
          </ul>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead    { font-size: 16px; color: var(--grey-70); margin-top: -8px; }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

/* Tab component */
.tb-tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  width: 100%;
}

.tb-tabs--contained {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 4px;
}

.tb-tabs--borderless {
  background: transparent;
  padding: 0;
  gap: 0;
}

.tb-tab {
  height: 36px;
  padding: 0 16px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-70);
  cursor: pointer;
  transition: background 120ms, color 120ms;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
}

.tb-tabs--borderless .tb-tab {
  border-radius: 0;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tb-tab:hover:not(:disabled),
.tb-tab--hover {
  background: var(--grey-05);
  color: var(--grey-90);
}

.tb-tab--focus,
.tb-tab:focus-visible {
  outline: none;
  background: var(--grey-05);
  box-shadow: inset 0 0 0 2px var(--blue-azure-50);
  color: var(--grey-90);
}

.tb-tab--selected {
  background: var(--grey-10);
  color: var(--grey-100);
  font-weight: 600;
}

.tb-tabs--borderless .tb-tab--selected {
  background: var(--grey-10);
  border-bottom-color: var(--grey-90);
}

.tb-tab:disabled {
  color: var(--grey-30);
  cursor: not-allowed;
}

/* Panel (tab content area) */
.tb-panel {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  min-height: 80px;
  display: flex;
  align-items: center;
}

.tb-panel--borderless {
  border-top: 1px solid var(--grey-20);
  border-radius: 0 0 8px 8px;
}

/* States grid */
.tb-states-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.tb-state-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tb-state-card__label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--grey-60);
}

/* Variants grid */
.tb-variants-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.tb-variants-grid > .tb-variant-card:last-child {
  grid-column: 1 / -1;
}

.tb-variant-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tb-variant-card__label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--grey-60);
}

.tb-variant-desc { margin: -8px 0 0; }

/* Usage cards */
.ds-usage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-usage-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; padding-top: 0; overflow: hidden; }
.ds-usage-card--do   { border-top: 3px solid var(--green-60); }
.ds-usage-card--dont { border-top: 3px solid var(--red-60); }
.ds-usage-card__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; padding-top: 16px; }
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }
.ds-usage-list { padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ds-usage-list li { font-size: 13px; color: var(--grey-80); line-height: 1.5; padding-left: 14px; position: relative; }
.ds-usage-list li::before { content: '·'; position: absolute; left: 0; color: var(--grey-50); }

/* Formatting */
.ds-formatting-body { display: flex; flex-direction: column; gap: 12px; }
.ds-formatting-body .ds-body { margin: 0; }

/* Interaction cards */
.ds-interaction-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-interaction-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-interaction-card__title { font-size: 13px; font-weight: 600; color: var(--grey-90); margin-bottom: 14px; }
kbd { display: inline-block; font-size: 11px; font-family: 'SFMono-Regular', 'Consolas', monospace; color: var(--grey-80); background: var(--grey-05); border: 1px solid var(--grey-20); border-radius: 4px; padding: 1px 6px; margin: 0 1px; }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .tb-states-grid, .tb-variants-grid, .ds-usage-grid, .ds-interaction-grid { grid-template-columns: 1fr; }
  .tb-variants-grid > .tb-variant-card:last-child { grid-column: auto; }
}
</style>
