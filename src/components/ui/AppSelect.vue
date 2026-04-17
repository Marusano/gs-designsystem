<script setup>
/**
 * AppSelect — GSFleet Design System
 *
 * @prop {string}        label       - field label (shown above)
 * @prop {boolean}       optional    - appends "(Optional)" to label
 * @prop {string}        placeholder - empty-value option text
 * @prop {string|number} modelValue  - v-model value
 * @prop {Array}         options     - [{value, label, disabled?}]
 * @prop {string}        error       - error message (enables error state when truthy)
 * @prop {string}        hint        - helper text (hidden when error is shown)
 * @prop {boolean}       disabled
 * @prop {string}        id          - override the auto-generated id
 * @prop {string}        forcedState - docs only: 'hover' | 'focus'
 */
import { computed, getCurrentInstance } from 'vue'

const props = defineProps({
  label:       String,
  optional:    Boolean,
  placeholder: { type: String, default: 'Please select' },
  modelValue:  { type: [String, Number], default: '' },
  options:     { type: Array, default: () => [] },
  error:       String,
  hint:        String,
  disabled:    Boolean,
  id:          String,
  forcedState: {
    type: String,
    default: null,
    validator: (v) => [null, 'hover', 'focus'].includes(v),
  },
})

const emit = defineEmits(['update:modelValue'])

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const selectId = computed(() => props.id || `gs-select-${uid}`)

const hasError = computed(() => !!props.error)
const hasValue = computed(() => props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined)

const classes = computed(() => ({
  'field':           true,
  'field--select':   true,
  'field--error':    hasError.value,
  'field--disabled': props.disabled,
  'is-hover':        props.forcedState === 'hover',
  'is-focus':        props.forcedState === 'focus',
}))
</script>

<template>
  <div :class="classes">
    <!-- Label -->
    <label v-if="label" :for="selectId" class="field__label">
      {{ label }}<span v-if="optional" class="field__opt"> (Optional)</span>
    </label>

    <!-- Control wrapper -->
    <div class="field__ctrl">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :aria-invalid="hasError ? true : undefined"
        :aria-describedby="(hasError && error ? `${selectId}-err` : null) || (hint ? `${selectId}-hint` : null) || undefined"
        class="field__select"
        :class="!hasValue && 'field__select--ph'"
        v-bind="$attrs"
        @change="emit('update:modelValue', $event.target.value)"
      >
        <option value="" disabled :selected="!hasValue">{{ placeholder }}</option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </option>
      </select>

      <!-- Custom chevron -->
      <span class="field__chevron" aria-hidden="true">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>

    <!-- Helper text -->
    <p v-if="hint && !hasError" :id="`${selectId}-hint`" class="field__hint">{{ hint }}</p>

    <!-- Error message -->
    <p v-if="hasError" :id="`${selectId}-err`" class="field__msg" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
/* ── Structure ──────────────────────────────────────────────── */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--field-gap, 6px);
}

/* ── Label ──────────────────────────────────────────────────── */
.field__label {
  display: inline-flex;
  align-items: center;
  font-size: var(--field-font-size, 14px);
  font-weight: var(--field-label-weight, 600);
  line-height: 16px;
  letter-spacing: 0.25px;
  color: var(--field-label-color);
  cursor: pointer;
  user-select: none;
}
.field--disabled .field__label { color: var(--field-disabled-label); }
.field__opt { font-weight: 400; color: var(--grey-60); margin-left: 2px; }

/* ── Control wrapper ────────────────────────────────────────── */
.field__ctrl { position: relative; }

/* ── Chevron ────────────────────────────────────────────────── */
.field__chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: var(--grey-80);
  pointer-events: none;
  transition: color 120ms ease;
}
.field--disabled .field__chevron { color: var(--grey-40); }

/* ── Select element ─────────────────────────────────────────── */
.field__select {
  display: block;
  width: 100%;
  height: var(--field-height, 40px);
  padding: var(--field-py, 8px) var(--field-px, 12px);
  padding-right: 34px;   /* room for chevron */
  font-family: 'Roboto', sans-serif;
  font-size: var(--field-font-size, 14px);
  font-weight: 400;
  line-height: var(--field-line-height, 16px);
  color: var(--field-text);
  background: var(--field-bg);
  border: 1px solid var(--field-border);
  border-radius: var(--field-radius, 4px);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    box-shadow 120ms ease;
}

/* Placeholder styling (empty value selected) */
.field__select--ph { color: var(--field-placeholder); }

/* ── Hover ──────────────────────────────────────────────────── */
.field:not(.field--disabled):not(.field--error) .field__select:hover,
.is-hover:not(.field--disabled):not(.field--error) .field__select {
  background: var(--field-hover-bg);
  border-color: var(--field-hover-border);
}

/* ── Focus ──────────────────────────────────────────────────── */
.field:not(.field--disabled) .field__select:focus,
.is-focus:not(.field--disabled) .field__select {
  background: var(--field-focus-bg);
  border-color: var(--field-focus-border);
  box-shadow: 0 0 0 1px var(--field-focus-border);
}

/* ── Error ──────────────────────────────────────────────────── */
.field--error .field__select {
  background: var(--field-error-bg);
  border-color: var(--field-error-border);
}
.field--error .field__select:focus {
  box-shadow: 0 0 0 1px var(--field-error-border);
}

/* ── Disabled ───────────────────────────────────────────────── */
.field--disabled .field__select {
  background: var(--field-disabled-bg);
  border-color: var(--field-disabled-border);
  color: var(--field-disabled-text);
  cursor: not-allowed;
}

/* ── Messages ───────────────────────────────────────────────── */
.field__msg  { font-size: 13px; line-height: 1.4; color: var(--field-error-text); }
.field__hint { font-size: 13px; line-height: 1.4; color: var(--grey-60); }
</style>
