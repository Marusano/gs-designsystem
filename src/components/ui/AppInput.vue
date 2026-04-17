<script setup>
/**
 * AppInput — GSFleet Design System
 *
 * @prop {string}  label       - field label (shown above)
 * @prop {boolean} optional    - appends "(Optional)" to label
 * @prop {string}  placeholder - placeholder text
 * @prop {string}  modelValue  - v-model value
 * @prop {string}  error       - error message (enables error state when truthy)
 * @prop {string}  hint        - helper text (hidden when error is shown)
 * @prop {boolean} disabled
 * @prop {string}  type        - 'text' | 'email' | 'password' | 'search' | 'date' | 'time'
 * @prop {string}  id          - override the auto-generated id
 * @prop {string}  forcedState - docs only: 'hover' | 'focus'
 */
import { computed, getCurrentInstance } from 'vue'

const props = defineProps({
  label:       String,
  optional:    Boolean,
  placeholder: { type: String, default: 'Type here' },
  modelValue:  { type: String, default: '' },
  error:       String,
  hint:        String,
  disabled:    Boolean,
  type:        { type: String, default: 'text' },
  id:          String,
  forcedState: {
    type: String,
    default: null,
    validator: (v) => [null, 'hover', 'focus'].includes(v),
  },
})

const emit = defineEmits(['update:modelValue'])

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id || `gs-input-${uid}`)

const hasError    = computed(() => !!props.error)
const isSearch    = computed(() => props.type === 'search')

const classes = computed(() => ({
  'field':           true,
  'field--error':    hasError.value,
  'field--disabled': props.disabled,
  'is-hover':        props.forcedState === 'hover',
  'is-focus':        props.forcedState === 'focus',
}))
</script>

<template>
  <div :class="classes">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="field__label">
      {{ label }}<span v-if="optional" class="field__opt"> (Optional)</span>
    </label>

    <!-- Control wrapper -->
    <div class="field__ctrl">
      <span v-if="isSearch" class="field__ico" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </span>
      <input
        :id="inputId"
        :type="isSearch ? 'text' : type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :aria-invalid="hasError ? true : undefined"
        :aria-describedby="(hasError && error ? `${inputId}-err` : null) || (hint ? `${inputId}-hint` : null) || undefined"
        class="field__input"
        :class="isSearch && 'field__input--ico'"
        v-bind="$attrs"
        @input="emit('update:modelValue', $event.target.value)"
      />
    </div>

    <!-- Helper text -->
    <p v-if="hint && !hasError" :id="`${inputId}-hint`" class="field__hint">{{ hint }}</p>

    <!-- Error message -->
    <p v-if="hasError" :id="`${inputId}-err`" class="field__msg" role="alert">{{ error }}</p>
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

.field__ico {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: var(--field-placeholder);
  pointer-events: none;
  z-index: 1;
}

/* ── Input element ──────────────────────────────────────────── */
.field__input {
  display: block;
  width: 100%;
  height: var(--field-height, 40px);
  padding: var(--field-py, 8px) var(--field-px, 12px);
  font-family: 'Roboto', sans-serif;
  font-size: var(--field-font-size, 14px);
  font-weight: 400;
  line-height: var(--field-line-height, 16px);
  color: var(--field-text);
  background: var(--field-bg);
  border: 1px solid var(--field-border);
  border-radius: var(--field-radius, 4px);
  outline: none;
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    box-shadow 120ms ease;
  appearance: none;
  -webkit-appearance: none;
}

.field__input::placeholder { color: var(--field-placeholder); }
.field__input--ico          { padding-left: 34px; }

/* ── Hover ──────────────────────────────────────────────────── */
.field:not(.field--disabled):not(.field--error) .field__input:hover,
.is-hover:not(.field--disabled):not(.field--error) .field__input {
  background: var(--field-hover-bg);
  border-color: var(--field-hover-border);
}

/* ── Focus ──────────────────────────────────────────────────── */
.field:not(.field--disabled) .field__input:focus,
.is-focus:not(.field--disabled) .field__input {
  background: var(--field-focus-bg);
  border-color: var(--field-focus-border);
  box-shadow: 0 0 0 1px var(--field-focus-border);
}

/* ── Error ──────────────────────────────────────────────────── */
.field--error .field__input {
  background: var(--field-error-bg);
  border-color: var(--field-error-border);
}
.field--error .field__input:focus {
  box-shadow: 0 0 0 1px var(--field-error-border);
}

/* ── Disabled ───────────────────────────────────────────────── */
.field--disabled .field__input {
  background: var(--field-disabled-bg);
  border-color: var(--field-disabled-border);
  color: var(--field-disabled-text);
  cursor: not-allowed;
}
.field--disabled .field__input::placeholder { color: var(--field-disabled-text); }

/* ── Messages ───────────────────────────────────────────────── */
.field__msg  { font-size: 13px; line-height: 1.4; color: var(--field-error-text); }
.field__hint { font-size: 13px; line-height: 1.4; color: var(--grey-60); }
</style>
