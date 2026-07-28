<script setup>
const props = defineProps({
  modelValue: { default: null },
  value:      { required: true },
  label:      { type: String, default: null },
  disabled:   { type: Boolean, default: false },
  name:       { type: String, default: null },
})
const emit = defineEmits(['update:modelValue'])

import { computed } from 'vue'
const checked = computed(() => props.modelValue === props.value)
</script>

<template>
  <label :class="['rb-wrapper', { 'rb-wrapper--disabled': disabled }]">
    <input
      class="rb-input"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="emit('update:modelValue', value)"
    />
    <div :class="['rb-dot', { 'rb-dot--checked': checked, 'rb-dot--disabled': disabled }]" aria-hidden="true" />
    <span v-if="label" class="rb-label">{{ label }}</span>
    <slot v-else />
  </label>
</template>

<style scoped>
.rb-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.rb-wrapper--disabled { cursor: not-allowed; }

.rb-input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

/* custom visual — matches ds-radio from RadioButtonPage */
.rb-dot {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1.5px solid #9c9ea3;
  background: #fff;
  position: relative;
  transition: border-color 100ms;
}
.rb-dot::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: transparent;
  transition: background 100ms;
}

.rb-input:focus-visible ~ .rb-dot {
  outline: 2px solid var(--blue-azure-50);
  outline-offset: 2px;
}

.rb-wrapper:not(.rb-wrapper--disabled):hover .rb-dot { border-color: #6f7176; }

.rb-dot--checked { border-color: #010028; }
.rb-dot--checked::after { background: #010028; }
.rb-wrapper:not(.rb-wrapper--disabled):hover .rb-dot--checked { border-color: #36383b; }
.rb-wrapper:not(.rb-wrapper--disabled):hover .rb-dot--checked::after { background: #36383b; }

.rb-dot--disabled { background: #f1f1f2; border-color: #d8d8da; }
.rb-dot--disabled::after { background: #d8d8da; }

.rb-label {
  font-size: 14px;
  color: var(--grey-80);
  line-height: 1.4;
}
.rb-wrapper--disabled .rb-label { color: var(--grey-40); }
</style>
