<script setup>
/**
 * AppSnackbar — GSFleet Design System
 *
 * @prop type        - 'success' | 'warning' | 'danger' | 'neutral' | 'informational'
 * @prop dismissible - shows × button, emits 'dismiss' on click
 * @prop inline      - renders in document flow (no fixed overlay, no shadow, no auto-dismiss)
 * @prop persistent  - disables auto-dismiss when in global mode
 * @prop duration    - ms before auto-dismiss (global mode only, default 20 000)
 *
 * Emits: 'dismiss' — parent should v-if/unmount the component in response
 */
import { computed, onMounted, onUnmounted } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'neutral',
    validator: (v) => ['success', 'warning', 'danger', 'neutral', 'informational'].includes(v),
  },
  dismissible: { type: Boolean, default: false },
  inline:      { type: Boolean, default: false },
  persistent:  { type: Boolean, default: false },
  duration:    { type: Number,  default: 20000 },
})

const emit = defineEmits(['dismiss'])

const ICON_MAP = {
  success:       'success',
  warning:       'warning',
  danger:        'error',
  neutral:       'info',
  informational: 'info',
}

const iconName = computed(() => ICON_MAP[props.type])

const classes = computed(() => [
  'snackbar',
  `snackbar--${props.type}`,
  props.inline ? 'snackbar--inline' : 'snackbar--global',
])

let timer = null

onMounted(() => {
  if (!props.inline && !props.persistent) {
    timer = setTimeout(() => emit('dismiss'), props.duration)
  }
})

onUnmounted(() => clearTimeout(timer))

function dismiss() {
  clearTimeout(timer)
  emit('dismiss')
}
</script>

<template>
  <Teleport to="body" :disabled="inline">
    <div :class="classes" role="alert" aria-live="polite">
      <span class="snackbar__icon" aria-hidden="true">
        <AppIcon :name="iconName" :size="24" />
      </span>
      <span class="snackbar__message">
        <slot />
      </span>
      <button
        v-if="dismissible"
        type="button"
        class="snackbar__close"
        aria-label="Dismiss notification"
        @click="dismiss"
      >
        <AppIcon name="close" :size="16" />
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
/* ── Base ─────────────────────────────────────────────────────── */
.snackbar {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 48px;
  padding: 12px 16px;
  border-radius: var(--snackbar-radius);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: var(--snackbar-text);
  box-sizing: border-box;
}

/* ── Global (fixed overlay) ───────────────────────────────────── */
.snackbar--global {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9000;
  min-width: 320px;
  max-width: 520px;
  box-shadow: var(--snackbar-shadow);
  animation: snackbar-in 200ms ease-out;
}

@keyframes snackbar-in {
  from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* ── Inline (document flow) ───────────────────────────────────── */
.snackbar--inline {
  width: 100%;
}

/* ── Type backgrounds ────────────────────────────────────────── */
.snackbar--success       { background: var(--snackbar-success-bg); }
.snackbar--warning       { background: var(--snackbar-warning-bg); }
.snackbar--danger        { background: var(--snackbar-danger-bg); }
.snackbar--neutral       { background: var(--snackbar-neutral-bg); }
.snackbar--informational { background: var(--snackbar-info-bg); }

/* ── Icon colors (via currentColor → AppIcon fill) ──────────── */
.snackbar__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.snackbar--success       .snackbar__icon { color: var(--snackbar-success-icon); }
.snackbar--warning       .snackbar__icon { color: var(--snackbar-warning-icon); }
.snackbar--danger        .snackbar__icon { color: var(--snackbar-danger-icon); }
.snackbar--neutral       .snackbar__icon { color: var(--snackbar-neutral-icon); }
.snackbar--informational .snackbar__icon { color: var(--snackbar-info-icon); }

/* ── Message ─────────────────────────────────────────────────── */
.snackbar__message {
  flex: 1;
  min-width: 0;
}

/* ── Dismiss button ──────────────────────────────────────────── */
.snackbar__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  color: var(--grey-70);
  opacity: 0.7;
  transition: opacity 80ms;
}
.snackbar__close:hover        { opacity: 1; }
.snackbar__close:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 1px; }
</style>
