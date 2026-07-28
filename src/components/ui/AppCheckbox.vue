<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue:    { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false },
  disabled:      { type: Boolean, default: false },
  label:         { type: String,  default: null },
})
const emit = defineEmits(['update:modelValue'])

const iconCheck = `<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const iconDash  = `<svg width="8"  height="2" viewBox="0 0 8 2"  fill="none"><path d="M0 1H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`

const icon = computed(() => props.indeterminate ? iconDash : (props.modelValue ? iconCheck : ''))

const boxClasses = computed(() => [
  'cb-box',
  props.modelValue && !props.indeterminate ? 'cb-box--checked' : '',
  props.indeterminate ? 'cb-box--partial' : '',
  props.disabled      ? 'cb-box--disabled' : '',
])
</script>

<template>
  <label :class="['cb-wrapper', { 'cb-wrapper--disabled': disabled }]">
    <input
      class="cb-input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <div :class="boxClasses" v-html="icon" aria-hidden="true" />
    <span v-if="label" class="cb-label">{{ label }}</span>
    <slot v-else />
  </label>
</template>

<style scoped>
.cb-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.cb-wrapper--disabled { cursor: not-allowed; }

/* visually hidden native input */
.cb-input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

/* custom visual box — matches ds-cb from CheckboxPage */
.cb-box {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1.5px solid #9c9ea3;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: border-color 100ms, background 100ms;
}

.cb-input:focus-visible ~ .cb-box {
  outline: 2px solid var(--blue-azure-50);
  outline-offset: 2px;
}

.cb-wrapper:not(.cb-wrapper--disabled):hover .cb-box { border-color: #6f7176; }

.cb-box--checked  { background: #010028; border-color: #010028; }
.cb-wrapper:not(.cb-wrapper--disabled):hover .cb-box--checked { background: #36383b; border-color: #36383b; }
.cb-box--partial  { background: #010028; border-color: #010028; }
.cb-box--disabled { background: #f1f1f2; border-color: #d8d8da; }
.cb-box--disabled.cb-box--checked { background: #d8d8da; border-color: #d8d8da; }

.cb-label {
  font-size: 14px;
  color: var(--grey-80);
  line-height: 1.4;
}
.cb-wrapper--disabled .cb-label { color: var(--grey-40); }
</style>
