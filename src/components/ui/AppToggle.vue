<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  size:       { type: String,  default: 'md', validator: (v) => ['sm', 'md'].includes(v) },
  disabled:   { type: Boolean, default: false },
  label:      { type: String,  default: null },
})
const emit = defineEmits(['update:modelValue'])

import { computed } from 'vue'

const trackClasses = computed(() => [
  'tog-track',
  `tog-track--${props.size}`,
  props.modelValue ? 'tog-track--on' : 'tog-track--off',
  props.disabled   ? 'tog-track--disabled' : '',
])

const thumbClasses = computed(() => [
  'tog-thumb',
  props.size === 'md' ? 'tog-thumb--md' : '',
  props.disabled ? 'tog-thumb--dim' : '',
])
</script>

<template>
  <label :class="['tog-wrapper', { 'tog-wrapper--disabled': disabled }]">
    <input
      class="tog-input"
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      @change="emit('update:modelValue', $event.target.checked)"
    />
    <div :class="trackClasses">
      <div :class="thumbClasses" />
    </div>
    <span v-if="label" class="tog-label">{{ label }}</span>
    <slot v-else />
  </label>
</template>

<style scoped>
.tog-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.tog-wrapper--disabled { cursor: not-allowed; }

.tog-input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

/* track — matches ds-toggle from TogglePage */
.tog-track {
  position: relative;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 140ms;
  flex-shrink: 0;
}

/* md variant (24px height, explicit bg) */
.tog-track--md { width: 44px; }
.tog-track--md.tog-track--off      { background: #d8d8da; }
.tog-track--md.tog-track--on       { background: #010028; }
.tog-track--md.tog-track--disabled { background: #e6e6e7; }

/* sm variant (matches ds-toggle--sm pattern — track drawn with ::before) */
.tog-track--sm { width: 36px; background: transparent; }
.tog-track--sm::before {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 10px;
  transition: background 140ms;
}
.tog-track--sm.tog-track--off::before      { background: #d8d8da; }
.tog-track--sm.tog-track--on::before       { background: #010028; }
.tog-track--sm.tog-track--disabled::before { background: #e6e6e7; }

.tog-input:focus-visible ~ .tog-track {
  outline: 2px solid var(--blue-azure-50);
  outline-offset: 2px;
}

/* thumb */
.tog-thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.28);
  transition: left 140ms;
}

/* md thumb positions */
.tog-track--md.tog-track--off  .tog-thumb { left: 2px; }
.tog-track--md.tog-track--on   .tog-thumb { left: 22px; }
.tog-track--md.tog-track--disabled .tog-thumb { left: 2px; }

/* md thumb size */
.tog-thumb--md { width: 20px; height: 20px; }

/* sm thumb positions */
.tog-track--sm.tog-track--off  .tog-thumb { left: 0; }
.tog-track--sm.tog-track--on   .tog-thumb { left: 16px; }
.tog-track--sm.tog-track--disabled .tog-thumb { left: 0; }

/* disabled thumb */
.tog-thumb--dim { background: #f0f0f1; box-shadow: none; }

.tog-label {
  font-size: 14px;
  color: var(--grey-80);
}
.tog-wrapper--disabled .tog-label { color: var(--grey-40); }
</style>
