<script setup>
import { ref } from 'vue'
import AppSectionHeader from '../components/ui/AppSectionHeader.vue'
import AppButton        from '../components/ui/AppButton.vue'
import AppIcon          from '../components/ui/AppIcon.vue'

const demoExpanded     = ref(false)
const varExpanded      = ref(true)
const actionsExpanded  = ref(false)
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Section Header</h1>
      <p class="ds-lead">2 types · expand/collapse · optional actions</p>
      <p class="ds-body">
        Section header structures content within a page or overlay into logical groups.
        It can be collapsable — allowing users to hide non-primary content — or static, acting
        as a purely visual divider. Actions revealed on hover let you place contextual controls
        (download, navigate, edit) without cluttering the layout at rest.
      </p>
    </section>

    <!-- ── Component Usage ─────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component usage</h2>
      <p class="ds-body">
        Use <code>type="collapsable"</code> (default) when users may want to hide the section.
        Toggle state is managed externally via <code>v-model:expanded</code>.
        Use <code>type="static"</code> for an always-visible, non-interactive header.
      </p>

      <!-- Live demo -->
      <div class="sh-demo-wrap">
        <div class="sh-demo-col">
          <p class="sh-demo-label">Collapsable — interactive</p>
          <AppSectionHeader
            title="Driver information"
            v-model:expanded="demoExpanded"
          />
          <div v-if="demoExpanded" class="sh-demo-body">
            <p>Section content is visible when expanded is <code>true</code>.</p>
          </div>
        </div>
      </div>

      <!-- Code snippet -->
      <div class="ds-code-block">
        <pre><code>&lt;!-- Collapsable (default) --&gt;
&lt;AppSectionHeader
  title="Driver information"
  v-model:expanded="isExpanded"
/&gt;

&lt;!-- Static --&gt;
&lt;AppSectionHeader
  type="static"
  title="Legend"
/&gt;

&lt;!-- With actions (revealed on hover) --&gt;
&lt;AppSectionHeader title="Asset activity" v-model:expanded="isExpanded"&gt;
  &lt;template #actions&gt;
    &lt;AppButton variant="quiet" size="xs"&gt;
      &lt;template #icon-left&gt;&lt;AppIcon name="export" :size="16" /&gt;&lt;/template&gt;
      Export
    &lt;/AppButton&gt;
  &lt;/template&gt;
&lt;/AppSectionHeader&gt;</code></pre>
      </div>

      <!-- Do / Don't -->
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Use <strong>collapsable</strong> type when users may want to temporarily hide secondary content</li>
            <li>Keep titles short and descriptive — 2–4 words works best</li>
            <li>Use the <code>#actions</code> slot for contextual quick-actions relevant to that section</li>
            <li>Manage expanded state externally so parent components can persist or synchronise it</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li>Don't use section header as primary navigation — use Side Navigation instead</li>
            <li>Don't nest section headers inside section headers — keep hierarchy flat</li>
            <li>Don't put destructive actions in the <code>#actions</code> slot without a confirmation step</li>
            <li>Don't use <strong>static</strong> type when users would benefit from being able to collapse the section</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Variants ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>
      <p class="ds-body">All four configurations of the section header.</p>

      <div class="sh-variants-grid">

        <div class="sh-variant">
          <p class="sh-variant__label">Collapsable — collapsed</p>
          <AppSectionHeader title="Driver information" :expanded="false" />
        </div>

        <div class="sh-variant">
          <p class="sh-variant__label">Collapsable — expanded</p>
          <AppSectionHeader
            title="Asset activity"
            v-model:expanded="varExpanded"
          />
        </div>

        <div class="sh-variant">
          <p class="sh-variant__label">Static</p>
          <AppSectionHeader type="static" title="Legend" />
        </div>

        <div class="sh-variant">
          <p class="sh-variant__label">With actions (hover to reveal)</p>
          <AppSectionHeader
            title="Fleet overview"
            v-model:expanded="actionsExpanded"
          >
            <template #actions>
              <AppButton variant="quiet" size="xs">
                <template #icon-left><AppIcon name="export" :size="16" /></template>
                Export
              </AppButton>
              <AppButton variant="quiet" size="xs">
                <template #icon-left><AppIcon name="link" :size="16" /></template>
                Share
              </AppButton>
            </template>
          </AppSectionHeader>
        </div>

      </div>
    </section>

    <!-- ── Props ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Props</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>type</code></td>
              <td><code>'collapsable' | 'static'</code></td>
              <td><code>'collapsable'</code></td>
              <td>Controls whether a toggle button is shown. Static headers are always visible and non-interactive.</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>String</code></td>
              <td><code>''</code></td>
              <td>Section label text. Keep to 2–4 words.</td>
            </tr>
            <tr>
              <td><code>expanded</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>
                Controls the expand/collapse state. Use <code>v-model:expanded</code> for two-way binding.
                Only meaningful when <code>type="collapsable"</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Slots ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Slots</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Slot</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>#actions</code></td>
              <td>
                Optional action buttons placed to the right of the title, before the toggle.
                Hidden by default — revealed on <code>:hover</code> via opacity transition.
                Use <code>&lt;AppButton variant="quiet" size="xs"&gt;</code> for items in this slot.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Tokens ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Tokens</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Element</th><th>Property</th><th>Token</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>Root</td><td>Height</td><td>—</td><td>40 px</td></tr>
            <tr><td>Root</td><td>Border radius</td><td>—</td><td>4 px</td></tr>
            <tr><td>Root</td><td>Background (default)</td><td><code>--color-surface-subtle</code></td><td>#f7f7f8</td></tr>
            <tr><td>Root</td><td>Background (expanded)</td><td><code>--grey-00</code></td><td>#ffffff</td></tr>
            <tr><td>Root</td><td>Top border (expanded)</td><td><code>--grey-30</code></td><td>#d8d8da</td></tr>
            <tr><td>Title</td><td>Font size</td><td>—</td><td>14 px</td></tr>
            <tr><td>Title</td><td>Font weight</td><td>—</td><td>500</td></tr>
            <tr><td>Title</td><td>Color</td><td><code>--grey-90</code></td><td>#36383b</td></tr>
            <tr><td>Toggle button</td><td>Size</td><td>—</td><td>32 × 32 px</td></tr>
            <tr><td>Toggle button</td><td>Icon size</td><td>—</td><td>24 px</td></tr>
            <tr><td>Toggle button</td><td>Background (hover)</td><td><code>--grey-10</code></td><td>#f1f1f2</td></tr>
            <tr><td>Actions</td><td>Opacity (at rest)</td><td>—</td><td>0</td></tr>
            <tr><td>Actions</td><td>Opacity (hovered)</td><td>—</td><td>1</td></tr>
            <tr><td>Actions</td><td>Transition</td><td>—</td><td>opacity 80 ms</td></tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main    { max-width: none; margin: 0; padding: 48px 40px 80px; display: flex; flex-direction: column; gap: 56px; }
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead    { font-size: 16px; color: var(--grey-70); font-weight: 400; }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

@media (max-width: 768px) { .ds-main { padding: 32px 20px 60px; } }

/* Live demo */
.sh-demo-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sh-demo-col {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 520px;
}

.sh-demo-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-50);
  margin: 0 0 8px;
}

.sh-demo-body {
  padding: 16px 12px;
  background: var(--grey-00);
  border-radius: 0 0 4px 4px;
}

.sh-demo-body p {
  margin: 0;
  font-size: 13px;
  color: var(--grey-70);
}

.sh-demo-body code {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 5px;
  border-radius: 3px;
  color: var(--grey-80);
}

/* Variants grid */
.sh-variants-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
}

@media (max-width: 700px) {
  .sh-variants-grid { grid-template-columns: 1fr; }
}

.sh-variant {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sh-variant__label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-50);
  margin: 0;
}

/* Do / Don't */
.ds-usage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) { .ds-usage-grid { grid-template-columns: 1fr; } }

.ds-usage-card {
  padding: 16px 20px;
  border-radius: 6px;
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20);
}

.ds-usage-card--do  { box-shadow: inset 0 0 0 1px var(--green-30, var(--green-60)); }
.ds-usage-card--dont { box-shadow: inset 0 0 0 1px var(--red-20, var(--red-60)); }

.ds-usage-card__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin: 0 0 10px;
}

.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }

.ds-usage-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ds-usage-list li {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.5;
}

/* Code block */
.ds-code-block {
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
}

.ds-code-block pre { margin: 0; }
.ds-code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: var(--grey-90);
  line-height: 1.6;
}

/* Tables */
.ds-table-wrap { overflow-x: auto; }

.ds-guide-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.ds-guide-table th {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-60);
  padding: 10px 12px;
  border-bottom: 1px solid var(--grey-20);
  background: var(--grey-05);
}

.ds-guide-table td {
  padding: 10px 12px;
  color: var(--grey-80);
  border-bottom: 1px solid var(--grey-10);
  line-height: 1.45;
  vertical-align: top;
}

.ds-guide-table tr:last-child td { border-bottom: none; }
.ds-guide-table tr:hover td { background: var(--grey-05); }
.ds-guide-table code {
  font-size: 11px;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  color: var(--grey-80);
  background: var(--grey-05);
  padding: 2px 5px;
  border-radius: 3px;
}
</style>
