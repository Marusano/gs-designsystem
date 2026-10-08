<script setup>
import { ref } from 'vue'
import AppSnackbar from '../components/ui/AppSnackbar.vue'
import AppButton   from '../components/ui/AppButton.vue'
import AppIcon     from '../components/ui/AppIcon.vue'

/* ── Global overlay demo ─────────────────────────────────────── */
const activeSnackbar = ref(null)
let snackbarKey = 0

function triggerSnackbar(type, action, detail, opts = {}) {
  activeSnackbar.value = {
    key: ++snackbarKey,
    type,
    action,
    detail,
    dismissible: opts.dismissible ?? false,
    persistent:  opts.persistent  ?? false,
  }
}

function onDismiss() {
  activeSnackbar.value = null
}

/* ── Static inline catalog ───────────────────────────────────── */
const CATALOG = [
  { type: 'success',       label: 'Success',       action: 'Route created.',   detail: '"Helsinki to Tampere" was added to the schedule.' },
  { type: 'warning',       label: 'Warning',       action: 'Unsaved changes.', detail: 'Leave now and your changes will be lost.' },
  { type: 'danger',        label: 'Danger',        action: 'Action failed.',   detail: 'Unable to assign driver — check connection and retry.' },
  { type: 'neutral',       label: 'Neutral',       action: 'Export started.',  detail: 'Your report will be ready in a few minutes.' },
  { type: 'informational', label: 'Informational', action: 'Step 1 of 3.',     detail: 'Fill in the vehicle details before adding the driver.' },
]

/* ── Dismissible demo ────────────────────────────────────────── */
const showDismissible = ref(true)

/* ── Inline usage demo ────────────────────────────────────────── */
const showInlineInfo  = ref(true)
const showInlineError = ref(true)
</script>

<template>
  <main class="ds-main">

    <!-- ── Title ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Snackbar</h1>
      <p class="ds-lead">5 types · global overlay · inline · dismissible · auto-dismiss</p>
      <p class="ds-body">Snackbar notifications communicate feedback after an action — success, warning, error, or neutral status. Global snackbars float over page content and auto-dismiss after ~20 seconds. Inline snackbars sit in the document flow to guide users through multi-step processes without covering content.</p>
    </section>

    <!-- ── Types ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Types</h2>
      <p class="ds-body">Five semantic types map to the nature of the feedback. Each type uses a distinct icon and background color to reinforce meaning without relying on color alone.</p>
      <div class="ds-catalog">
        <div v-for="item in CATALOG" :key="item.type" class="ds-catalog__row">
          <div class="ds-catalog__meta">
            <strong class="ds-catalog__label">{{ item.label }}</strong>
            <code class="ds-catalog__type">{{ item.type }}</code>
          </div>
          <AppSnackbar
            :type="item.type"
            :action="item.action"
            :inline="true"
            :persistent="true"
            class="ds-catalog__snackbar"
          >{{ item.detail }}</AppSnackbar>
        </div>
      </div>
    </section>

    <!-- ── States ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">States</h2>
      <p class="ds-body">Snackbars have two behavioural states — persistent (requires user action to dismiss) and auto-dismissing (disappears after 20 s). The dismissible variant adds a close button that emits <code>@dismiss</code> on click.</p>

      <div class="ds-states-grid">
        <div class="ds-state-block">
          <p class="ds-state-block__label">Default — auto-dismissing (global)</p>
          <p class="ds-body">Appears as a fixed overlay at the top of the viewport. Dismisses automatically after 20 s.</p>
          <div class="ds-state-block__demo">
            <AppButton variant="secondary" size="sm"
              @click="triggerSnackbar('success', 'Driver assigned.', 'Sam Lee is now assigned to route 42.')"
            >
              <template #icon-left><AppIcon name="success" :size="16" /></template>
              Trigger global snackbar
            </AppButton>
            <span class="ds-state-block__hint">Appears at the top of the viewport · auto-dismisses after 20 s</span>
          </div>
        </div>

        <div class="ds-state-block">
          <p class="ds-state-block__label">Dismissible</p>
          <p class="ds-body">Add <code>:dismissible="true"</code> to show a close button. Use together with <code>:persistent="true"</code> for notifications that require the user to actively acknowledge.</p>
          <div class="ds-state-block__demo">
            <AppSnackbar
              v-if="showDismissible"
              type="danger"
              action="Action failed."
              :inline="true"
              :persistent="true"
              :dismissible="true"
              @dismiss="showDismissible = false"
            >
              Unable to delete the route — it has active trips attached.
            </AppSnackbar>
            <div v-else class="ds-dismissed">
              <span class="ds-dismissed__text">Dismissed</span>
              <AppButton variant="secondary" size="sm" @click="showDismissible = true">Reset</AppButton>
            </div>
          </div>
        </div>

        <div class="ds-state-block">
          <p class="ds-state-block__label">Inline</p>
          <p class="ds-body">Set <code>:inline="true"</code> to render in document flow — no overlay, no shadow, no auto-dismiss. Use inside forms, wizards, or cards to communicate state without blocking the user.</p>
          <div class="ds-state-block__demo ds-state-block__demo--card">
            <h3 class="ds-demo-card__title">Assign driver to route</h3>
            <AppSnackbar
              v-if="showInlineInfo"
              type="informational"
              action="Step 1 of 3."
              :inline="true"
              :persistent="true"
            >Select a driver before setting departure time.</AppSnackbar>
            <div class="ds-demo-card__fields">
              <div class="ds-demo-field">
                <label class="ds-demo-field__label">Driver</label>
                <div class="ds-demo-field__input">Sam Lee</div>
              </div>
              <div class="ds-demo-field">
                <label class="ds-demo-field__label">Route</label>
                <div class="ds-demo-field__input ds-demo-field__input--placeholder">Select route…</div>
              </div>
            </div>
            <AppSnackbar
              v-if="showInlineError"
              type="danger"
              action="Conflict detected."
              :inline="true"
              :persistent="true"
              :dismissible="true"
              @dismiss="showInlineError = false"
            >Sam Lee is already assigned to Route 17 at this time.</AppSnackbar>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Usage ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Use global snackbars for feedback <strong>after an action</strong> — saving, creating, deleting, assigning.</li>
            <li>Use inline snackbars inside flows to guide users through steps or warn about state without interrupting their work.</li>
            <li>Use <strong>dismissible + persistent</strong> together for errors or warnings that require the user to acknowledge before continuing.</li>
            <li>Keep messages short and action-first: lead with what happened, follow with relevant detail.</li>
            <li>Show only <strong>one global snackbar at a time</strong>. Replace the current one when a new action triggers another.</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li><strong>Don't use snackbars for critical errors</strong> that require user input or block the flow — use a modal or inline validation instead.</li>
            <li>Don't stack multiple global snackbars simultaneously.</li>
            <li><strong>Don't use snackbars for general info</strong> that is not a response to a user action.</li>
            <li>Don't use auto-dismissing snackbars for errors — users may not see them in time; use dismissible + persistent.</li>
            <li>Don't write passive or vague messages: "Something happened" or "Updated." are not actionable.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Formatting ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <div class="ds-formatting-body">
        <p class="ds-body"><strong>Action-first copy.</strong> The message always leads with a short bold action sentence (the <code>action</code> prop), followed by optional detail text in the default slot. Example: <em>"Route created. Helsinki to Tampere was added to the schedule."</em></p>
        <p class="ds-body"><strong>Action sentence weight.</strong> The action summary renders in <strong>SemiBold (600)</strong> at 14px — equivalent to H6. The detail text is Regular (400) at 14px, inline after the action.</p>
        <p class="ds-body"><strong>Sentence case.</strong> Write both action and detail in sentence case: "User created", not "User Created". The only exception is proper nouns such as names and route identifiers.</p>
        <p class="ds-body"><strong>Brevity.</strong> Global snackbars should fit in one or two short sentences. The user has ~20 seconds to read — keep it scannable. Inline snackbars can be slightly longer but should stay within two lines.</p>
        <p class="ds-body"><strong>Type matching.</strong> Use the type that matches the outcome — <code>success</code> after a successful action, <code>danger</code> when something failed, <code>warning</code> for a recoverable risk, <code>informational</code> for step guidance, <code>neutral</code> for background operations such as exports or queued tasks.</p>
      </div>
    </section>

    <!-- ── Interaction ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction</h2>
      <div class="ds-interaction-grid">
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Global overlay</p>
          <ul class="ds-usage-list">
            <li>Renders via <code>Teleport</code> to <code>&lt;body&gt;</code>, fixed at the top-center of the viewport</li>
            <li>Enters with a fade + slide-down animation (200 ms)</li>
            <li>Auto-dismisses after 20 s (default <code>duration</code>) unless <code>:persistent="true"</code></li>
            <li>A new trigger replaces the current snackbar instantly via <code>:key</code> on the component</li>
          </ul>
        </div>
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Inline</p>
          <ul class="ds-usage-list">
            <li>Renders in document flow — no <code>Teleport</code>, no fixed position, no shadow</li>
            <li>Never auto-dismisses; controlled entirely by the parent via <code>v-if</code></li>
            <li>Full width of its container</li>
          </ul>
        </div>
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Dismiss button</p>
          <ul class="ds-usage-list">
            <li><strong>Click</strong> — emits <code>@dismiss</code>; parent should remove the component with <code>v-if</code></li>
            <li><kbd>Tab</kbd> — moves focus to the × button</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> — triggers dismiss</li>
          </ul>
        </div>
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Accessibility</p>
          <ul class="ds-usage-list">
            <li><code>role="alert"</code> and <code>aria-live="polite"</code> announce content to screen readers on mount</li>
            <li>Icon is <code>aria-hidden="true"</code> — conveyed by surrounding text</li>
            <li>Close button has <code>aria-label="Dismiss notification"</code></li>
          </ul>
        </div>
      </div>

      <!-- Global trigger demo -->
      <div class="ds-trigger-demo">
        <p class="ds-trigger-demo__label">Try it — trigger a global overlay</p>
        <div class="ds-trigger-row">
          <AppButton variant="secondary" size="sm"
            @click="triggerSnackbar('success', 'Driver assigned.', 'Sam Lee is now assigned to route 42.')"
          ><template #icon-left><AppIcon name="success" :size="16" /></template>Success</AppButton>
          <AppButton variant="secondary" size="sm"
            @click="triggerSnackbar('warning', 'GPS signal lost.', 'Location data may be inaccurate for vehicle #208.')"
          ><template #icon-left><AppIcon name="warning" :size="16" /></template>Warning</AppButton>
          <AppButton variant="secondary" size="sm"
            @click="triggerSnackbar('danger', 'Save failed.', 'Your changes could not be saved — please retry.')"
          ><template #icon-left><AppIcon name="error" :size="16" /></template>Danger</AppButton>
          <AppButton variant="secondary" size="sm"
            @click="triggerSnackbar('neutral', 'Export queued.', 'Your CSV will download shortly.')"
          ><template #icon-left><AppIcon name="info" :size="16" /></template>Neutral</AppButton>
          <AppButton variant="secondary" size="sm"
            @click="triggerSnackbar('informational', 'Step 2 of 3.', 'Confirm vehicle details before continuing.')"
          ><template #icon-left><AppIcon name="info" :size="16" /></template>Informational</AppButton>
          <AppButton variant="secondary" size="sm"
            @click="triggerSnackbar('danger', 'Session expired.', 'Please log in again to continue.', { dismissible: true, persistent: true })"
          ><template #icon-left><AppIcon name="close" :size="16" /></template>Dismissible</AppButton>
        </div>
        <p class="ds-trigger-hint">
          <AppIcon name="info" :size="14" style="vertical-align:-2px;opacity:.5;" />
          Appears at the top of the viewport. Trigger again to replace the current one.
        </p>
      </div>
    </section>

    <!-- ── API ────────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Props</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>type</code></td><td>String</td><td><code>'neutral'</code></td>
              <td><code>success</code> · <code>warning</code> · <code>danger</code> · <code>neutral</code> · <code>informational</code></td>
            </tr>
            <tr>
              <td><code>action</code></td><td>String</td><td><code>null</code></td>
              <td>Bold leading sentence (SemiBold 14px / H6). E.g. <code>"Route created."</code></td>
            </tr>
            <tr>
              <td><code>dismissible</code></td><td>Boolean</td><td><code>false</code></td>
              <td>Shows × close button; emits <code>dismiss</code> on click</td>
            </tr>
            <tr>
              <td><code>inline</code></td><td>Boolean</td><td><code>false</code></td>
              <td>Renders in document flow — no Teleport, no shadow, no auto-dismiss</td>
            </tr>
            <tr>
              <td><code>persistent</code></td><td>Boolean</td><td><code>false</code></td>
              <td>Disables auto-dismiss for global snackbars</td>
            </tr>
            <tr>
              <td><code>duration</code></td><td>Number</td><td><code>20000</code></td>
              <td>Milliseconds until auto-dismiss (global, non-persistent only)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="ds-h2" style="margin-top:8px">Slots</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Slot</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>default</code></td>
              <td>Detail text — regular weight, follows the bold action sentence</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="ds-h2" style="margin-top:8px">Events</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Event</th><th>Payload</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>dismiss</code></td><td>—</td>
              <td>Emitted on close-button click or auto-dismiss timeout. Parent should unmount with <code>v-if</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Token Reference ────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <div class="ds-token-grid">

        <div class="ds-token-card">
          <p class="ds-token-card__title">Background colors</p>
          <table class="ds-token-table">
            <thead><tr><th>Token</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td><code>--snackbar-success-bg</code></td>   <td><span class="swatch" style="background:#f1fcf2;box-shadow:inset 0 0 0 1px #c5f2cb"></span>var(--green-10)</td></tr>
              <tr><td><code>--snackbar-warning-bg</code></td>   <td><span class="swatch" style="background:#fff0e6;box-shadow:inset 0 0 0 1px #ffc49a"></span>var(--orange-10)</td></tr>
              <tr><td><code>--snackbar-danger-bg</code></td>    <td><span class="swatch" style="background:#fef2f2;box-shadow:inset 0 0 0 1px #fecaca"></span>var(--red-10)</td></tr>
              <tr><td><code>--snackbar-neutral-bg</code></td>   <td><span class="swatch" style="background:#f7f7f8;box-shadow:inset 0 0 0 1px #e6e6e7"></span>var(--grey-05)</td></tr>
              <tr><td><code>--snackbar-info-bg</code></td>      <td><span class="swatch" style="background:#e8f6ff;box-shadow:inset 0 0 0 1px #b3e1f7"></span>var(--blue-azure-10)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Icon colors</p>
          <table class="ds-token-table">
            <thead><tr><th>Token</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td><code>--snackbar-success-icon</code></td> <td><span class="swatch" style="background:#247a31"></span>var(--green-90)</td></tr>
              <tr><td><code>--snackbar-warning-icon</code></td> <td><span class="swatch" style="background:#ff6c02"></span>var(--orange-60)</td></tr>
              <tr><td><code>--snackbar-danger-icon</code></td>  <td><span class="swatch" style="background:#dc2626"></span>var(--red-70)</td></tr>
              <tr><td><code>--snackbar-neutral-icon</code></td> <td><span class="swatch" style="background:#6f7176"></span>var(--grey-70)</td></tr>
              <tr><td><code>--snackbar-info-icon</code></td>    <td><span class="swatch" style="background:#0a74a6"></span>var(--blue-azure-70)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Shared tokens</p>
          <table class="ds-token-table">
            <thead><tr><th>Token</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td><code>--snackbar-text</code></td>   <td><span class="swatch" style="background:#36383b"></span>var(--grey-90)</td></tr>
              <tr><td><code>--snackbar-radius</code></td> <td>4px</td></tr>
              <tr><td><code>--snackbar-shadow</code></td> <td>0 4px 12.5px rgba(57,57,57,.2)</td></tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>

    <!-- ── Active global snackbar ─────────────────────────────── -->
    <AppSnackbar
      v-if="activeSnackbar"
      :key="activeSnackbar.key"
      :type="activeSnackbar.type"
      :action="activeSnackbar.action"
      :dismissible="activeSnackbar.dismissible"
      :persistent="activeSnackbar.persistent"
      :duration="20000"
      @dismiss="onDismiss"
    >{{ activeSnackbar.detail }}</AppSnackbar>

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
.ds-body code, .ds-body em { font-size: 13px; }
.ds-body code { font-family: 'SFMono-Regular', 'Consolas', monospace; background: var(--grey-10); padding: 1px 5px; border-radius: 3px; color: var(--grey-90); }

/* ── Catalog ─────────────────────────────────────────────────── */
.ds-catalog { display: flex; flex-direction: column; gap: 8px; }
.ds-catalog__row {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  gap: 16px;
}
.ds-catalog__meta { display: flex; flex-direction: column; gap: 3px; text-align: right; }
.ds-catalog__label { font-size: 13px; font-weight: 600; color: var(--grey-90); }
.ds-catalog__type  { font-size: 11px; font-family: 'SFMono-Regular', 'Consolas', monospace; color: var(--grey-60); background: var(--grey-10); padding: 1px 5px; border-radius: 3px; align-self: flex-end; }

/* ── States ──────────────────────────────────────────────────── */
.ds-states-grid { display: flex; flex-direction: column; gap: 16px; }
.ds-state-block { background: var(--grey-00); border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.ds-state-block__label { font-size: 12px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .06em; }
.ds-state-block__demo { display: flex; flex-direction: column; gap: 10px; }
.ds-state-block__hint { font-size: 12px; color: var(--grey-60); }
.ds-state-block__demo--card { background: var(--grey-05); border-radius: 6px; padding: 16px; gap: 14px; }
.ds-demo-card__title { font-size: 14px; font-weight: 600; color: var(--grey-100); }
.ds-demo-card__fields { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ds-demo-field { display: flex; flex-direction: column; gap: 4px; }
.ds-demo-field__label { font-size: 12px; font-weight: 600; color: var(--grey-90); }
.ds-demo-field__input { height: 40px; padding: 0 12px; border-radius: 4px; box-shadow: inset 0 0 0 1px var(--grey-30); display: flex; align-items: center; font-size: 14px; color: var(--grey-90); background: var(--grey-00); }
.ds-demo-field__input--placeholder { color: var(--grey-60); }

.ds-dismissed { display: flex; align-items: center; gap: 12px; height: 48px; padding: 0 16px; background: var(--grey-05); border-radius: 4px; }
.ds-dismissed__text { font-size: 13px; color: var(--grey-60); }

/* ── Usage cards ─────────────────────────────────────────────── */
.ds-usage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-usage-card { background: var(--grey-00); border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; padding-top: 0; overflow: hidden; }
.ds-usage-card--do   { border-top: 3px solid var(--green-60); }
.ds-usage-card--dont { border-top: 3px solid var(--red-60); }
.ds-usage-card__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; padding-top: 16px; }
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }
.ds-usage-list { padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ds-usage-list li { font-size: 13px; color: var(--grey-80); line-height: 1.5; padding-left: 14px; position: relative; }
.ds-usage-list li::before { content: '·'; position: absolute; left: 0; color: var(--grey-50); }

/* ── Formatting ──────────────────────────────────────────────── */
.ds-formatting-body { display: flex; flex-direction: column; gap: 12px; }

/* ── Interaction ─────────────────────────────────────────────── */
.ds-interaction-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-interaction-card { background: var(--grey-00); border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-interaction-card__title { font-size: 13px; font-weight: 600; color: var(--grey-90); margin-bottom: 14px; }
kbd { display: inline-block; font-size: 11px; font-family: 'SFMono-Regular','Consolas',monospace; color: var(--grey-80); background: var(--grey-05); border: 1px solid var(--grey-20); border-radius: 4px; padding: 1px 6px; margin: 0 1px; }

.ds-trigger-demo { background: var(--grey-05); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.ds-trigger-demo__label { font-size: 12px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .06em; }
.ds-trigger-row { display: flex; flex-wrap: wrap; gap: 8px; }
.ds-trigger-hint { font-size: 12px; color: var(--grey-60); display: flex; align-items: center; gap: 6px; }

/* ── Guide table (Props / Slots / Events) ────────────────────── */
.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-guide-table { width: 100%; border-collapse: collapse; background: var(--grey-00); font-size: 13px; }
.ds-guide-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 10px 16px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-guide-table tbody td { padding: 12px 16px; border-bottom: 1px solid var(--grey-10); vertical-align: top; color: var(--grey-80); line-height: 1.5; }
.ds-guide-table tbody tr:last-child td { border-bottom: none; }
.ds-guide-table tbody tr:hover > td { background: var(--grey-05); }
.ds-guide-table code { font-size: 11px; font-family: 'SFMono-Regular','Consolas',monospace; color: var(--grey-80); background: var(--grey-05); padding: 2px 5px; border-radius: 3px; }

/* ── Token reference ─────────────────────────────────────────── */
.ds-token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
.ds-token-card { background: var(--grey-00); border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.ds-token-card__title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); padding: 12px 16px; background: var(--grey-05); border-bottom: 1px solid var(--grey-20); }
.ds-token-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.ds-token-table th { text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--grey-60); font-weight: 600; border-bottom: 1px solid var(--grey-10); }
.ds-token-table td { padding: 8px 12px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-80); }
.ds-token-table tr:last-child td { border-bottom: none; }
.ds-token-table code { font-size: 11px; font-family: 'SFMono-Regular','Consolas',monospace; color: var(--grey-80); background: var(--grey-05); padding: 2px 5px; border-radius: 3px; }
.swatch { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: middle; margin-right: 6px; flex-shrink: 0; }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-catalog__row { grid-template-columns: 1fr; }
  .ds-catalog__meta { text-align: left; flex-direction: row; align-items: center; gap: 8px; }
  .ds-usage-grid, .ds-interaction-grid { grid-template-columns: 1fr; }
  .ds-demo-card__fields { grid-template-columns: 1fr; }
  .ds-token-grid { grid-template-columns: 1fr; }
}
</style>
