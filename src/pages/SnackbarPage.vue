<script setup>
import { ref } from 'vue'
import AppSnackbar from '../components/ui/AppSnackbar.vue'
import AppButton   from '../components/ui/AppButton.vue'
import AppIcon     from '../components/ui/AppIcon.vue'

/* ── Global overlay demo ─────────────────────────────────────── */
const activeSnackbar = ref(null)
let snackbarKey = 0

function triggerSnackbar(type, message, opts = {}) {
  activeSnackbar.value = {
    key: ++snackbarKey,
    type,
    message,
    dismissible: opts.dismissible ?? false,
    persistent:  opts.persistent  ?? false,
  }
}

function onDismiss() {
  activeSnackbar.value = null
}

/* ── Static inline catalog ───────────────────────────────────── */
const CATALOG = [
  {
    type: 'success',
    label: 'Success',
    example: 'Route created. "Helsinki to Tampere" was added to the schedule.',
  },
  {
    type: 'warning',
    label: 'Warning',
    example: 'Unsaved changes. Leave now and your changes will be lost.',
  },
  {
    type: 'danger',
    label: 'Danger',
    example: 'Action failed. Unable to assign driver — check connection and retry.',
  },
  {
    type: 'neutral',
    label: 'Neutral',
    example: 'Export started. Your report will be ready in a few minutes.',
  },
  {
    type: 'informational',
    label: 'Informational',
    example: 'Step 1 of 3. Fill in the vehicle details before adding the driver.',
  },
]

/* ── Dismissible demo state ───────────────────────────────────── */
const showDismissible = ref(true)
function resetDismissible() { showDismissible.value = true }

/* ── Inline usage demo ────────────────────────────────────────── */
const showInlineInfo  = ref(true)
const showInlineError = ref(true)
</script>

<template>
  <div class="sb-page">

    <!-- ── Page header ─────────────────────────────────────────── -->
    <div class="sb-page__header">
      <h1 class="sb-page__title">Snackbar notifications</h1>
      <p class="sb-page__desc">
        Snackbar notifications communicate feedback after an action — success, warning, error, or neutral
        status. Global snackbars float over page content and auto-dismiss after ~20 seconds. Inline
        snackbars sit in the document flow to guide users through multi-step processes without covering content.
      </p>
      <p class="sb-page__desc">
        <strong>Copy format:</strong> action first, then detail. Example — success:
        "Route created. Helsinki to Tampere was added to the schedule."
      </p>
    </div>

    <!-- ── Section: All types (inline catalog) ────────────────── -->
    <section class="sb-section">
      <h2 class="sb-section__title">Types</h2>
      <p class="sb-section__sub">All five variants shown as inline (non-overlaying) elements.</p>

      <div class="sb-catalog">
        <div v-for="item in CATALOG" :key="item.type" class="sb-catalog__row">
          <span class="sb-catalog__label">{{ item.label }}</span>
          <AppSnackbar :type="item.type" :inline="true" :persistent="true" class="sb-catalog__snackbar">
            {{ item.example }}
          </AppSnackbar>
        </div>
      </div>
    </section>

    <!-- ── Section: Dismissible ────────────────────────────────── -->
    <section class="sb-section">
      <h2 class="sb-section__title">Dismissible</h2>
      <p class="sb-section__sub">
        Add <code>:dismissible="true"</code> to show a close button. The parent controls visibility;
        listen for the <code>@dismiss</code> event and unmount (v-if) in response.
      </p>

      <div class="sb-dismissible-demo">
        <AppSnackbar
          v-if="showDismissible"
          type="danger"
          :inline="true"
          :persistent="true"
          :dismissible="true"
          @dismiss="showDismissible = false"
        >
          Action failed. Unable to delete the route — it has active trips attached.
        </AppSnackbar>
        <div v-else class="sb-dismissed-state">
          <span class="sb-dismissed-state__text">Dismissed</span>
          <AppButton variant="secondary" size="sm" @click="resetDismissible">Reset</AppButton>
        </div>
      </div>
    </section>

    <!-- ── Section: Global overlay demo ───────────────────────── -->
    <section class="sb-section">
      <h2 class="sb-section__title">Global overlay</h2>
      <p class="sb-section__sub">
        Default mode — rendered via <code>Teleport</code> to <code>&lt;body&gt;</code>, fixed at the
        top of the viewport. Auto-dismisses after 20 s. Use <code>:persistent="true"</code> and
        <code>:dismissible="true"</code> together for notifications that require the user to read and close.
      </p>

      <div class="sb-trigger-grid">
        <AppButton
          variant="secondary" size="sm"
          @click="triggerSnackbar('success', 'Driver assigned. Sam Lee is now assigned to route 42.')"
        >
          <template #icon-left><AppIcon name="success" :size="16" /></template>
          Success
        </AppButton>
        <AppButton
          variant="secondary" size="sm"
          @click="triggerSnackbar('warning', 'GPS signal lost. Location data may be inaccurate for vehicle #208.')"
        >
          <template #icon-left><AppIcon name="warning" :size="16" /></template>
          Warning
        </AppButton>
        <AppButton
          variant="secondary" size="sm"
          @click="triggerSnackbar('danger', 'Save failed. Your changes could not be saved — please retry.')"
        >
          <template #icon-left><AppIcon name="error" :size="16" /></template>
          Danger
        </AppButton>
        <AppButton
          variant="secondary" size="sm"
          @click="triggerSnackbar('neutral', 'Export queued. Your CSV will download shortly.')"
        >
          <template #icon-left><AppIcon name="info" :size="16" /></template>
          Neutral
        </AppButton>
        <AppButton
          variant="secondary" size="sm"
          @click="triggerSnackbar('informational', 'Step 2 of 3. Confirm vehicle details before continuing.')"
        >
          <template #icon-left><AppIcon name="info" :size="16" /></template>
          Informational
        </AppButton>
        <AppButton
          variant="secondary" size="sm"
          @click="triggerSnackbar('danger', 'Session expired. Please log in again to continue.', { dismissible: true, persistent: true })"
        >
          <template #icon-left><AppIcon name="close" :size="16" /></template>
          Dismissible (persistent)
        </AppButton>
      </div>

      <p class="sb-trigger-hint">
        <AppIcon name="info" :size="14" style="vertical-align:-2px;opacity:.6;" />
        Snackbar appears at the top of the viewport. Trigger another to replace the current one.
      </p>
    </section>

    <!-- ── Section: Inline usage ───────────────────────────────── -->
    <section class="sb-section">
      <h2 class="sb-section__title">Inline usage</h2>
      <p class="sb-section__sub">
        Set <code>:inline="true"</code> to render the snackbar in document flow — no overlay, no
        shadow, no auto-dismiss. Useful inside forms, wizards, or cards where you need to communicate
        state without blocking the user.
      </p>

      <div class="sb-inline-demo">
        <div class="sb-card">
          <h3 class="sb-card__title">Assign driver to route</h3>
          <AppSnackbar
            v-if="showInlineInfo"
            type="informational"
            :inline="true"
            :persistent="true"
          >
            Step 1 of 3. Select a driver before setting departure time.
          </AppSnackbar>

          <div class="sb-card__form-row">
            <div class="sb-card__field">
              <label class="sb-card__label">Driver</label>
              <div class="sb-card__input-mock">Sam Lee</div>
            </div>
            <div class="sb-card__field">
              <label class="sb-card__label">Route</label>
              <div class="sb-card__input-mock sb-card__input-mock--placeholder">Select route…</div>
            </div>
          </div>

          <AppSnackbar
            v-if="showInlineError"
            type="danger"
            :inline="true"
            :persistent="true"
            :dismissible="true"
            @dismiss="showInlineError = false"
          >
            Conflict detected. Sam Lee is already assigned to Route 17 at this time.
          </AppSnackbar>
        </div>
      </div>
    </section>

    <!-- ── Section: API reference ──────────────────────────────── -->
    <section class="sb-section">
      <h2 class="sb-section__title">API</h2>

      <table class="sb-api-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>type</code></td>
            <td>String</td>
            <td><code>'neutral'</code></td>
            <td>success · warning · danger · neutral · informational</td>
          </tr>
          <tr>
            <td><code>dismissible</code></td>
            <td>Boolean</td>
            <td><code>false</code></td>
            <td>Shows × button; emits <code>dismiss</code> on click</td>
          </tr>
          <tr>
            <td><code>inline</code></td>
            <td>Boolean</td>
            <td><code>false</code></td>
            <td>Renders in document flow (no Teleport, no shadow, no auto-dismiss)</td>
          </tr>
          <tr>
            <td><code>persistent</code></td>
            <td>Boolean</td>
            <td><code>false</code></td>
            <td>Disables auto-dismiss for global snackbars</td>
          </tr>
          <tr>
            <td><code>duration</code></td>
            <td>Number</td>
            <td><code>20000</code></td>
            <td>ms until auto-dismiss (global, non-persistent only)</td>
          </tr>
        </tbody>
      </table>

      <div class="sb-events">
        <strong>Events</strong>
        <p><code>@dismiss</code> — emitted on close-button click or auto-dismiss timeout. Parent should unmount with <code>v-if</code>.</p>
      </div>
    </section>

    <!-- ── Active global snackbar ─────────────────────────────── -->
    <AppSnackbar
      v-if="activeSnackbar"
      :key="activeSnackbar.key"
      :type="activeSnackbar.type"
      :dismissible="activeSnackbar.dismissible"
      :persistent="activeSnackbar.persistent"
      :duration="20000"
      @dismiss="onDismiss"
    >
      {{ activeSnackbar.message }}
    </AppSnackbar>

  </div>
</template>

<style scoped>
/* ── Page shell ──────────────────────────────────────────────── */
.sb-page {
  max-width: 840px;
  margin: 0 auto;
  padding: 40px 32px 80px;
}

/* ── Header ──────────────────────────────────────────────────── */
.sb-page__header { margin-bottom: 40px; }
.sb-page__title  { font-size: 24px; font-weight: 600; color: var(--grey-100); margin-bottom: 12px; }
.sb-page__desc   { font-size: 14px; line-height: 20px; color: var(--grey-90); margin-bottom: 8px; }
.sb-page__desc strong { font-weight: 600; }

/* ── Sections ────────────────────────────────────────────────── */
.sb-section {
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--grey-10);
}
.sb-section:last-child { border-bottom: none; }

.sb-section__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--grey-100);
  margin-bottom: 6px;
}
.sb-section__sub {
  font-size: 13px;
  line-height: 20px;
  color: var(--grey-70);
  margin-bottom: 20px;
}
.sb-section__sub code {
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 5px;
  border-radius: 3px;
  color: var(--grey-90);
}

/* ── Catalog ─────────────────────────────────────────────────── */
.sb-catalog { display: flex; flex-direction: column; gap: 8px; }

.sb-catalog__row {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 16px;
}

.sb-catalog__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--grey-70);
  text-align: right;
}

.sb-catalog__snackbar {
  border-radius: var(--snackbar-radius);
}

/* ── Dismissible demo ────────────────────────────────────────── */
.sb-dismissible-demo { max-width: 560px; }

.sb-dismissed-state {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 16px;
  background: var(--grey-05);
  border-radius: 4px;
}
.sb-dismissed-state__text {
  font-size: 13px;
  color: var(--grey-60);
}

/* ── Trigger grid ────────────────────────────────────────────── */
.sb-trigger-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.sb-trigger-hint {
  font-size: 12px;
  color: var(--grey-60);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── Inline demo card ────────────────────────────────────────── */
.sb-inline-demo { max-width: 560px; }

.sb-card {
  background: var(--grey-00);
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sb-card__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--grey-100);
}

.sb-card__form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.sb-card__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sb-card__label {
  font-size: 12px;
  font-weight: 600;
  color: var(--grey-90);
}

.sb-card__input-mock {
  height: 40px;
  padding: 0 12px;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px var(--grey-30);
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--grey-90);
  background: var(--grey-00);
}

.sb-card__input-mock--placeholder { color: var(--grey-60); }

/* ── API table ───────────────────────────────────────────────── */
.sb-api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 16px;
}
.sb-api-table th {
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  color: var(--grey-70);
  padding: 6px 12px;
  border-bottom: 1px solid var(--grey-20);
}
.sb-api-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--grey-10);
  color: var(--grey-90);
  vertical-align: top;
}
.sb-api-table td:first-child { white-space: nowrap; }
.sb-api-table code {
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 5px;
  border-radius: 3px;
}

/* ── Events note ─────────────────────────────────────────────── */
.sb-events {
  font-size: 13px;
  color: var(--grey-90);
  line-height: 20px;
}
.sb-events strong { font-weight: 600; display: block; margin-bottom: 4px; }
.sb-events code {
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 5px;
  border-radius: 3px;
}
</style>
