<script setup>
/**
 * AppButton — GSFleet Design System
 *
 * @prop {string}  variant     - 'primary' | 'secondary' | 'tertiary' | 'quiet' | 'danger'
 * @prop {string}  size        - 'xl' | 'md' | 'sm' | 'xs'
 * @prop {boolean} disabled    - disables the button
 * @prop {boolean} loading     - shows loading state (inherits disabled appearance)
 * @prop {string}  as          - HTML tag override (default 'button')
 * @prop {string}  forcedState - dev-only: force a visual state for documentation
 *                               'hover' | 'focus' | 'active' | 'disabled'
 *
 * Slots:
 *   default    — button label text
 *   icon-left  — icon placed before the label
 *   icon-right — icon placed after the label
 */

import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'tertiary', 'quiet', 'danger'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xl', 'md', 'sm', 'xs'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  as: {
    type: String,
    default: 'button',
  },
  /** Force a visual state — for design-system documentation only */
  forcedState: {
    type: String,
    default: null,
    validator: (v) => [null, 'hover', 'focus', 'active', 'disabled'].includes(v),
  },
})

const isDisabled = computed(() => props.disabled || props.loading || props.forcedState === 'disabled')

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  props.forcedState && `is-${props.forcedState}`,
])
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    :class="classes"
    :disabled="as === 'button' ? isDisabled : undefined"
    :aria-disabled="as !== 'button' ? isDisabled : undefined"
  >
    <!-- Left icon slot -->
    <span v-if="$slots['icon-left']" class="btn__icon btn__icon--left" aria-hidden="true">
      <slot name="icon-left" />
    </span>

    <!-- Label -->
    <span v-if="$slots.default" class="btn__label">
      <slot />
    </span>

    <!-- Right icon slot -->
    <span v-if="$slots['icon-right']" class="btn__icon btn__icon--right" aria-hidden="true">
      <slot name="icon-right" />
    </span>
  </component>
</template>

<style scoped>
/* ─────────────────────────────────────────────────────────────
   BASE
───────────────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  font-family: 'Roboto', sans-serif;
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  line-height: var(--btn-line-height);
  white-space: nowrap;
  text-decoration: none;

  border: none;
  border-radius: var(--btn-radius);
  cursor: pointer;
  user-select: none;
  outline: none;

  /* Box-shadow used for borders & focus rings to avoid layout shift */
  box-shadow: none;

  transition:
    background-color 120ms ease,
    color 120ms ease,
    box-shadow 120ms ease;
}

.btn:disabled,
.btn.is-disabled {
  cursor: not-allowed;
  pointer-events: none;
}

/* Icon sizing */
.btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

/* ─────────────────────────────────────────────────────────────
   SIZES
───────────────────────────────────────────────────────────── */
.btn--xl {
  height: var(--btn-height-xl);
  padding: 0 var(--btn-px-xl);
}
.btn--xl .btn__icon {
  width: 20px;
  height: 20px;
}

.btn--md {
  height: var(--btn-height-md);
  padding: 10px var(--btn-px-md);
}

.btn--sm {
  height: var(--btn-height-sm);
  padding: 8px var(--btn-px-sm);
}

.btn--xs {
  height: var(--btn-height-xs);
  padding: 6px var(--btn-px-xs);
  gap: 4px;
}
.btn--xs .btn__icon {
  width: 14px;
  height: 14px;
}

/* ─────────────────────────────────────────────────────────────
   VARIANT — PRIMARY
   bg: #010028 (navy) · text: white · no border
───────────────────────────────────────────────────────────── */
.btn--primary {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  box-shadow: none;
}

.btn--primary:hover:not(:disabled):not(.is-disabled),
.btn--primary.is-hover {
  background-color: var(--btn-primary-hover);
}

.btn--primary:focus:not(:disabled):not(.is-disabled),
.btn--primary.is-focus {
  background-color: var(--btn-primary-focus-bg);
  box-shadow: inset 0 0 0 3px var(--btn-primary-ring-focus);
}

.btn--primary:active:not(:disabled):not(.is-disabled),
.btn--primary.is-active {
  background-color: var(--btn-primary-active-bg);
  box-shadow: inset 0 0 0 3px var(--btn-primary-ring-active);
}

.btn--primary:disabled,
.btn--primary.is-disabled {
  background-color: var(--btn-disabled-bg);
  color: var(--btn-disabled-text);
  box-shadow: none;
}

/* ─────────────────────────────────────────────────────────────
   VARIANT — SECONDARY
   bg: white · text: grey-90 · border 1px grey-70
───────────────────────────────────────────────────────────── */
.btn--secondary {
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  box-shadow: inset 0 0 0 1px var(--btn-secondary-border);
}

.btn--secondary:hover:not(:disabled):not(.is-disabled),
.btn--secondary.is-hover {
  background-color: var(--btn-secondary-hover-bg);
  box-shadow: inset 0 0 0 1px var(--btn-secondary-border-hover);
}

.btn--secondary:focus:not(:disabled):not(.is-disabled),
.btn--secondary.is-focus {
  background-color: var(--btn-secondary-focus-bg);
  box-shadow: inset 0 0 0 3px var(--btn-secondary-ring-focus);
}

.btn--secondary:active:not(:disabled):not(.is-disabled),
.btn--secondary.is-active {
  background-color: var(--btn-secondary-active-bg);
  box-shadow: inset 0 0 0 3px var(--btn-secondary-ring-active);
}

.btn--secondary:disabled,
.btn--secondary.is-disabled {
  background-color: var(--btn-secondary-bg);
  color: var(--btn-disabled-text);
  box-shadow: inset 0 0 0 1px var(--btn-secondary-disabled-border);
}

/* ─────────────────────────────────────────────────────────────
   VARIANT — TERTIARY
   bg: transparent · text: grey-70 · border 1px grey-30
───────────────────────────────────────────────────────────── */
.btn--tertiary {
  background-color: var(--btn-tertiary-bg);
  color: var(--btn-tertiary-text);
  box-shadow: inset 0 0 0 1px var(--btn-tertiary-border);
}

.btn--tertiary:hover:not(:disabled):not(.is-disabled),
.btn--tertiary.is-hover {
  background-color: var(--btn-tertiary-hover-bg);
  color: var(--btn-tertiary-hover-text);
  box-shadow: inset 0 0 0 1px var(--btn-tertiary-border);
}

.btn--tertiary:focus:not(:disabled):not(.is-disabled),
.btn--tertiary.is-focus {
  background-color: var(--btn-tertiary-focus-bg);
  color: var(--btn-tertiary-focus-text);
  box-shadow: inset 0 0 0 3px var(--btn-tertiary-ring-focus);
}

.btn--tertiary:active:not(:disabled):not(.is-disabled),
.btn--tertiary.is-active {
  background-color: var(--btn-tertiary-active-bg);
  color: var(--btn-tertiary-active-text);
  box-shadow: inset 0 0 0 3px var(--btn-tertiary-ring-active);
}

.btn--tertiary:disabled,
.btn--tertiary.is-disabled {
  background-color: var(--btn-disabled-bg);
  color: var(--btn-disabled-text);
  box-shadow: inset 0 0 0 1px var(--grey-20);
}

/* ─────────────────────────────────────────────────────────────
   VARIANT — QUIET
   bg: transparent · text: grey-70 · no border
───────────────────────────────────────────────────────────── */
.btn--quiet {
  background-color: var(--btn-quiet-bg);
  color: var(--btn-quiet-text);
  box-shadow: none;
}

/* Override vertical padding for quiet (8px vs 10px in md) */
.btn--quiet.btn--md { padding-top: 8px; padding-bottom: 8px; }
.btn--quiet.btn--sm { padding-top: 6px; padding-bottom: 6px; }

.btn--quiet:hover:not(:disabled):not(.is-disabled),
.btn--quiet.is-hover {
  background-color: var(--btn-quiet-hover-bg);
  color: var(--btn-quiet-hover-text);
}

.btn--quiet:focus:not(:disabled):not(.is-disabled),
.btn--quiet.is-focus {
  background-color: var(--btn-quiet-focus-bg);
  color: var(--btn-quiet-focus-text);
  box-shadow: inset 0 0 0 3px var(--btn-quiet-ring-focus);
}

.btn--quiet:active:not(:disabled):not(.is-disabled),
.btn--quiet.is-active {
  background-color: var(--btn-quiet-active-bg);
  color: var(--btn-quiet-active-text);
  box-shadow: inset 0 0 0 3px var(--btn-quiet-ring-active);
}

.btn--quiet:disabled,
.btn--quiet.is-disabled {
  background-color: transparent;
  color: var(--btn-disabled-text);
  box-shadow: none;
}

/* ─────────────────────────────────────────────────────────────
   VARIANT — DANGER
   bg: red-50 (#dc2626) · text: white · no border
───────────────────────────────────────────────────────────── */
.btn--danger {
  background-color: var(--btn-danger-bg);
  color: var(--btn-danger-text);
  box-shadow: none;
}

.btn--danger:hover:not(:disabled):not(.is-disabled),
.btn--danger.is-hover {
  background-color: var(--btn-danger-hover-bg);
}

.btn--danger:focus:not(:disabled):not(.is-disabled),
.btn--danger.is-focus {
  background-color: var(--btn-danger-focus-bg);
  box-shadow: inset 0 0 0 3px var(--btn-danger-ring-focus);
}

.btn--danger:active:not(:disabled):not(.is-disabled),
.btn--danger.is-active {
  background-color: var(--btn-danger-active-bg);
  box-shadow: inset 0 0 0 3px var(--btn-danger-ring-active);
}

.btn--danger:disabled,
.btn--danger.is-disabled {
  background-color: var(--btn-disabled-bg);
  color: var(--btn-disabled-text);
  box-shadow: none;
}
</style>
