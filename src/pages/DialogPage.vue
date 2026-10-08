<script setup>
import { ref } from 'vue'
import AppDialog    from '../components/ui/AppDialog.vue'
import AppButton    from '../components/ui/AppButton.vue'
import AppDataPoint from '../components/ui/AppDataPoint.vue'

/* ── Catalog ─────────────────────────────────────────────────── */
const VARIANTS = [
  {
    id: 'confirm-plain',
    label: 'Confirm — plain',
    type: 'confirm', state: 'plain',
    title: 'Remove Toby from Delivery crew',
    description: 'Toby will lose access to all routes and assignments in this crew. You can re-add them at any time.',
  },
  {
    id: 'change-context',
    label: 'Change — with context',
    type: 'change', state: 'plain',
    title: 'Change manager role',
    description: 'Updating the role will affect this user\'s permissions across all active routes.',
    hasBody: true,
  },
  {
    id: 'change-warning',
    label: 'Change — warning',
    type: 'change', state: 'warning',
    title: 'Change departure time',
    description: 'Updating the departure time will reschedule all dependent stops.',
    hasBody: true,
    infoText: 'This route is currently active. Changes may affect real-time tracking for drivers already on route.',
  },
  {
    id: 'change-moderate',
    label: 'Change — moderate',
    type: 'change', state: 'moderate',
    title: 'Change vehicle assignment',
    description: 'The vehicle will be reassigned across all active routes for this period.',
    hasBody: true,
    infoText: 'The vehicle has an upcoming service scheduled in 3 days. Consider timing this change accordingly.',
  },
  {
    id: 'change-info',
    label: 'Change — informational',
    type: 'change', state: 'informational',
    title: 'Update fleet region',
    description: 'The fleet region determines which routes and drivers are visible to this manager.',
    hasBody: true,
    infoText: 'Changing the region will update visibility settings for all members of this fleet group.',
  },
  {
    id: 'danger-context',
    label: 'Danger — with context',
    type: 'danger', state: 'plain',
    title: 'Delete route "Helsinki to Tampere"',
    description: 'This will permanently remove the route and all associated stops, assignments, and history.',
    hasBody: true,
  },
  {
    id: 'danger-plain',
    label: 'Danger — plain',
    type: 'danger', state: 'plain',
    title: 'Permanently delete account',
    description: 'All your data — routes, assignments, reports, and settings — will be permanently erased. This cannot be undone.',
    confirmQuestion: 'Are you sure you want to proceed?',
  },
]

const openVariant = ref(null)

function openDemo(variant) {
  openVariant.value = variant
}
function closeDemo() {
  openVariant.value = null
}
</script>

<template>
  <main class="ds-main">

    <!-- ── Title ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Dialog</h1>
      <p class="ds-lead">3 types · 4 info states · confirm / change / danger</p>
      <p class="ds-body">
        Dialogs interrupt the current flow to request user confirmation or collect a critical input
        before proceeding. They block interaction with the rest of the page and require an explicit
        choice — confirm, save, or cancel — before control returns to the caller.
      </p>
    </section>

    <!-- ── Types ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Types</h2>
      <p class="ds-body">Three types reflect the nature of the action being confirmed.</p>
      <div class="dlg-type-grid">
        <div class="dlg-type-card">
          <div class="dlg-type-label">Confirm</div>
          <p class="dlg-type-desc">Asks the user to confirm a destructive-but-recoverable action, such as removing a member from a crew.</p>
        </div>
        <div class="dlg-type-card">
          <div class="dlg-type-label">Change</div>
          <p class="dlg-type-desc">Asks the user to review and save a change to an existing record. Often includes a form row or select showing the current and new value.</p>
        </div>
        <div class="dlg-type-card">
          <div class="dlg-type-label">Danger</div>
          <p class="dlg-type-desc">Confirms an irreversible action. Uses a red confirm button and may include a bold closing question to reinforce the permanence.</p>
        </div>
      </div>
    </section>

    <!-- ── Info states ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Info states</h2>
      <p class="ds-body">The Change type supports four info panel states that appear below the form rows to communicate additional context about the impact of the change.</p>
      <div class="dlg-info-samples">
        <div class="dlg-info-sample dlg-info-sample--warning">
          <strong>Warning</strong> — active condition may be disrupted
        </div>
        <div class="dlg-info-sample dlg-info-sample--moderate">
          <strong>Moderate</strong> — upcoming concern worth noting
        </div>
        <div class="dlg-info-sample dlg-info-sample--informational">
          <strong>Informational</strong> — neutral context about the change
        </div>
      </div>
    </section>

    <!-- ── Variants catalog ───────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>
      <p class="ds-body">Click any example to open it as a live dialog.</p>
      <div class="dlg-catalog">
        <div
          v-for="v in VARIANTS"
          :key="v.id"
          class="dlg-catalog__item"
        >
          <div class="dlg-catalog__label">{{ v.label }}</div>
          <div class="dlg-catalog__preview">

            <!-- Inline static preview -->
            <div class="dlg-preview">
              <div class="dlg-preview__head">
                <div class="dlg-preview__title">{{ v.title }}</div>
                <div class="dlg-preview__desc">{{ v.description }}</div>
                <div v-if="v.confirmQuestion" class="dlg-preview__question">{{ v.confirmQuestion }}</div>
              </div>
              <div v-if="v.hasBody" class="dlg-preview__body">
                <AppDataPoint variant="contextual" label="Current role" model-value="Fleet manager" />
                <AppDataPoint variant="contextual" label="New role" model-value="Driver" />
              </div>
              <div v-if="v.infoText" :class="['dlg-preview__info', `dlg-preview__info--${v.state}`]">
                {{ v.infoText }}
              </div>
              <div class="dlg-preview__actions">
                <AppButton variant="secondary" size="md" :tabindex="-1">Cancel</AppButton>
                <AppButton :variant="v.type === 'danger' ? 'danger' : 'primary'" size="md" :tabindex="-1">
                  {{ v.type === 'danger' ? 'Yes, permanently delete' : v.type === 'change' ? 'Save changes' : 'Confirm' }}
                </AppButton>
              </div>
            </div>

          </div>
          <div class="dlg-catalog__open">
            <AppButton variant="tertiary" size="sm" @click="openDemo(v)">Open live</AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ── States ────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">States</h2>
      <p class="ds-body">Dialogs have a single active state — open. When open, interaction with underlying content is blocked by a semi-transparent backdrop. Closing happens via Cancel, backdrop click, or the confirm action.</p>
      <div class="dlg-states-grid">
        <div class="dlg-state">
          <div class="dlg-state__label">Open</div>
          <p class="dlg-state__desc">Dialog is mounted, backdrop is visible, focus is trapped inside the modal.</p>
        </div>
        <div class="dlg-state">
          <div class="dlg-state__label">Closed</div>
          <p class="dlg-state__desc">Component is unmounted (v-if). Emits <code>cancel</code> or <code>confirm</code> before closing.</p>
        </div>
      </div>
    </section>

    <!-- ── Usage ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <div class="ds-usage-card__label ds-usage-card__label--do">Do</div>
          <ul class="ds-usage-card__list">
            <li>Use dialogs for actions that are irreversible or have significant side effects.</li>
            <li>Keep the title specific to the record being affected (e.g. "Remove Toby from Delivery crew").</li>
            <li>Use the Change type when the user needs to see current state before confirming.</li>
            <li>Use the Danger type for permanent deletions — reinforce with a bold confirmation sentence.</li>
            <li>Use info panels to surface active conditions or constraints the user may not be aware of.</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <div class="ds-usage-card__label ds-usage-card__label--dont">Don't</div>
          <ul class="ds-usage-card__list">
            <li>Don't use dialogs for non-critical confirmations — use inline warnings or toasts instead.</li>
            <li>Don't stack dialogs — resolve the current one before triggering another.</li>
            <li>Don't put long forms inside a dialog — use a dedicated page or drawer for complex inputs.</li>
            <li>Don't make the confirm label generic ("OK", "Yes") — describe the action being taken.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Formatting ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">Dialogs have a fixed width of 486 px and adapt to narrower screens by shrinking to the viewport with 16 px side gutters. The structure is always: head → (body) → (info panel) → actions.</p>
      <div class="dlg-anatomy">
        <div class="dlg-anatomy__zone dlg-anatomy__zone--head">
          <div class="dlg-anatomy__zone-label">Head — title + description</div>
          <div class="dlg-anatomy__zone-detail">20px top · 16px bottom · 24px sides</div>
        </div>
        <div class="dlg-anatomy__zone dlg-anatomy__zone--body">
          <div class="dlg-anatomy__zone-label">Body — form rows (optional)</div>
          <div class="dlg-anatomy__zone-detail">0 24px 8px</div>
        </div>
        <div class="dlg-anatomy__zone dlg-anatomy__zone--info">
          <div class="dlg-anatomy__zone-label">Info panel (optional)</div>
          <div class="dlg-anatomy__zone-detail">margin 0 24px 8px · padding 12px 16px</div>
        </div>
        <div class="dlg-anatomy__zone dlg-anatomy__zone--actions">
          <div class="dlg-anatomy__zone-label">Actions — Cancel + Confirm</div>
          <div class="dlg-anatomy__zone-detail">16px top · 24px bottom · 24px sides · flex-end</div>
        </div>
      </div>
    </section>

    <!-- ── Interaction ───────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction</h2>
      <div class="dlg-interaction-grid">
        <div class="dlg-ic">
          <div class="dlg-ic__title">Confirm</div>
          <p class="dlg-ic__desc">Emits <code>confirm</code>, then <code>update:modelValue</code> → <code>false</code>. Parent handles the action.</p>
        </div>
        <div class="dlg-ic">
          <div class="dlg-ic__title">Cancel</div>
          <p class="dlg-ic__desc">Emits <code>cancel</code>, then <code>update:modelValue</code> → <code>false</code>. Triggered by Cancel button or backdrop click.</p>
        </div>
        <div class="dlg-ic">
          <div class="dlg-ic__title">Backdrop</div>
          <p class="dlg-ic__desc">Clicking outside the dialog triggers Cancel. The dialog does not close on Escape by default — add a keydown handler in the parent if needed.</p>
        </div>
      </div>
    </section>

    <!-- ── Token Reference ───────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token reference</h2>
      <div class="ds-table-wrap">
        <table class="ds-token-table">
          <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
          <tbody>
            <tr>
              <td><code>--dlg-bg</code></td>
              <td><span class="swatch" style="background:var(--grey-00);box-shadow:inset 0 0 0 1px var(--grey-20)"></span> <code>--grey-00</code></td>
              <td>Dialog surface background</td>
            </tr>
            <tr>
              <td><code>--dlg-radius</code></td>
              <td>8px</td>
              <td>Container corner radius</td>
            </tr>
            <tr>
              <td><code>--dlg-width</code></td>
              <td>486px</td>
              <td>Fixed dialog width</td>
            </tr>
            <tr>
              <td><code>--dlg-title-color</code></td>
              <td><span class="swatch" style="background:var(--grey-90)"></span> <code>--grey-90</code></td>
              <td>Title + confirm-question text</td>
            </tr>
            <tr>
              <td><code>--dlg-desc-color</code></td>
              <td><span class="swatch" style="background:var(--grey-80)"></span> <code>--grey-80</code></td>
              <td>Description / subtitle text</td>
            </tr>
            <tr>
              <td><code>--dlg-row-border</code></td>
              <td><span class="swatch" style="background:var(--grey-20)"></span> <code>--grey-20</code></td>
              <td>Separator between body rows</td>
            </tr>
            <tr>
              <td><code>--dlg-info-warning-bg</code></td>
              <td><span class="swatch" style="background:var(--orange-10)"></span> <code>--orange-10</code></td>
              <td>Warning info panel background</td>
            </tr>
            <tr>
              <td><code>--dlg-info-warning-border</code></td>
              <td><span class="swatch" style="background:var(--orange-30)"></span> <code>--orange-30</code></td>
              <td>Warning info panel border</td>
            </tr>
            <tr>
              <td><code>--dlg-info-moderate-bg</code></td>
              <td><span class="swatch" style="background:var(--yellow-10)"></span> <code>--yellow-10</code></td>
              <td>Moderate info panel background</td>
            </tr>
            <tr>
              <td><code>--dlg-info-moderate-border</code></td>
              <td><span class="swatch" style="background:var(--yellow-50)"></span> <code>--yellow-50</code></td>
              <td>Moderate info panel border</td>
            </tr>
            <tr>
              <td><code>--dlg-info-info-bg</code></td>
              <td><span class="swatch" style="background:var(--blue-vivid-10)"></span> <code>--blue-vivid-10</code></td>
              <td>Informational info panel background</td>
            </tr>
            <tr>
              <td><code>--dlg-info-info-border</code></td>
              <td><span class="swatch" style="background:var(--blue-vivid-30)"></span> <code>--blue-vivid-30</code></td>
              <td>Informational info panel border</td>
            </tr>
            <tr>
              <td><code>--dlg-backdrop</code></td>
              <td>rgba(0,0,0,0.48)</td>
              <td>Overlay behind the dialog</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>

  <!-- ── Live dialog instances ─────────────────────────────────── -->
  <AppDialog
    v-if="openVariant"
    :model-value="!!openVariant"
    :type="openVariant.type"
    :state="openVariant.state"
    :title="openVariant.title"
    :description="openVariant.description"
    :confirm-question="openVariant.confirmQuestion"
    @update:model-value="closeDemo"
    @confirm="closeDemo"
    @cancel="closeDemo"
  >
    <template v-if="openVariant.hasBody" #default>
      <div class="dlg-live-rows">
        <AppDataPoint variant="contextual" label="Current role" model-value="Fleet manager" />
        <AppDataPoint variant="contextual" label="New role" model-value="Driver" />
      </div>
    </template>
    <template v-if="openVariant.infoText" #info>
      {{ openVariant.infoText }}
    </template>
  </AppDialog>
</template>

<style scoped>
/* ── Page layout ─────────────────────────────────────────────── */
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
.ds-body code { font-family: 'SFMono-Regular', 'Consolas', monospace; background: var(--grey-10); padding: 1px 5px; border-radius: 3px; color: var(--grey-90); }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
}

/* ── Type cards ──────────────────────────────────────────────── */
.dlg-type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}
.dlg-type-card {
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20);
  border-radius: 6px;
  padding: 16px;
}
.dlg-type-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-90);
  margin-bottom: 6px;
}
.dlg-type-desc {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.5;
}

/* ── Info panel samples ──────────────────────────────────────── */
.dlg-info-samples {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
.dlg-info-sample {
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--grey-90);
}
.dlg-info-sample--warning {
  background: var(--dlg-info-warning-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-warning-border);
}
.dlg-info-sample--moderate {
  background: var(--dlg-info-moderate-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-moderate-border);
}
.dlg-info-sample--informational {
  background: var(--dlg-info-info-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-info-border);
}

/* ── Catalog ─────────────────────────────────────────────────── */
.dlg-catalog {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
}
.dlg-catalog__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dlg-catalog__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-70);
}
.dlg-catalog__open {
  display: flex;
  justify-content: flex-start;
}

/* ── Static preview card ──────────────────────────────────────── */
.dlg-preview {
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20), 0 2px 8px rgba(0,0,0,0.07);
  border-radius: 8px;
  width: 486px;
  max-width: 100%;
  font-family: 'Inter', sans-serif;
  pointer-events: none;
  user-select: none;
}
.dlg-preview__head {
  padding: 20px 24px 16px;
}
.dlg-preview__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--grey-90);
  margin-bottom: 6px;
}
.dlg-preview__desc {
  font-size: 14px;
  color: var(--grey-80);
  line-height: 1.5;
}
.dlg-preview__question {
  font-size: 14px;
  font-weight: 700;
  color: var(--grey-90);
  margin-top: 10px;
}
.dlg-preview__body {
  /* No horizontal padding — DataPoint contextual handles its own 14px indent */
  padding: 0 0 0;
}
.dlg-preview__info {
  margin: 0 24px 8px;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--grey-90);
}
.dlg-preview__info--warning {
  background: var(--dlg-info-warning-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-warning-border);
}
.dlg-preview__info--moderate {
  background: var(--dlg-info-moderate-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-moderate-border);
}
.dlg-preview__info--informational {
  background: var(--dlg-info-info-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-info-border);
}
.dlg-preview__actions {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* ── States grid ─────────────────────────────────────────────── */
.dlg-states-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}
.dlg-state {
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20);
  border-radius: 6px;
  padding: 16px;
}
.dlg-state__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-90);
  margin-bottom: 6px;
}
.dlg-state__desc {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.5;
}

/* ── Usage cards ─────────────────────────────────────────────── */
.ds-usage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}
.ds-usage-card {
  border-radius: 6px;
  padding: 16px;
}
.ds-usage-card--do   { background: var(--green-10); box-shadow: inset 0 0 0 1px var(--green-30); }
.ds-usage-card--dont { background: var(--red-10);   box-shadow: inset 0 0 0 1px var(--red-20); }
.ds-usage-card__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }
.ds-usage-card__list {
  padding-left: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ds-usage-card__list li {
  font-size: 13px;
  color: var(--grey-90);
  line-height: 1.5;
}

/* ── Anatomy ─────────────────────────────────────────────────── */
.dlg-anatomy {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 486px;
  max-width: 100%;
}
.dlg-anatomy__zone {
  border-radius: 4px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.dlg-anatomy__zone--head    { background: var(--blue-azure-10); }
.dlg-anatomy__zone--body    { background: var(--grey-10); }
.dlg-anatomy__zone--info    { background: var(--yellow-10); }
.dlg-anatomy__zone--actions { background: var(--green-10); }
.dlg-anatomy__zone-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-90);
}
.dlg-anatomy__zone-detail {
  font-size: 12px;
  color: var(--grey-70);
  font-family: 'Inter', monospace;
}

/* ── Interaction grid ────────────────────────────────────────── */
.dlg-interaction-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}
.dlg-ic {
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20);
  border-radius: 6px;
  padding: 16px;
}
.dlg-ic__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-90);
  margin-bottom: 6px;
}
.dlg-ic__desc {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.5;
}

/* ── Token table ─────────────────────────────────────────────── */
.swatch {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 4px;
  flex-shrink: 0;
}
.ds-table-wrap {
  overflow-x: auto;
  margin-top: 16px;
}
.ds-token-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.ds-token-table th,
.ds-token-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--grey-10);
  vertical-align: middle;
}
.ds-token-table th {
  font-weight: 600;
  color: var(--grey-70);
  background: var(--grey-05);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.ds-token-table code {
  background: var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  font-size: 12px;
}

/* ── Live dialog body rows ────────────────────────────────────── */
/* Negative margin cancels the dialog's 24px body padding so     */
/* DataPoint contextual rows bleed edge-to-edge as in Figma.     */
.dlg-live-rows {
  margin: 0 -24px;
}

</style>
