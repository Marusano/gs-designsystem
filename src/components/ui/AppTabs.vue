<script setup>
/**
 * AppTabs
 *
 * @prop modelValue  Currently selected tab value
 * @prop items       Array<{ label: string, value: string | number, disabled?: boolean }>
 * @prop variant     'contained' (default) | 'borderless'
 */
import { computed } from 'vue'

const props = defineProps({
  modelValue: { required: true },
  items: { type: Array, required: true },
  variant: { type: String, default: 'contained', validator: (v) => ['contained', 'borderless'].includes(v) },
})
const emit = defineEmits(['update:modelValue'])

const tabsClasses = computed(() => [
  'tabs',
  `tabs--${props.variant}`,
])
</script>

<template>
  <div :class="tabsClasses" role="tablist">
    <button
      v-for="item in items"
      :key="item.value"
      :class="['tab', { 'tab--selected': modelValue === item.value }]"
      role="tab"
      :aria-selected="modelValue === item.value"
      :disabled="item.disabled"
      @click="!item.disabled && emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
/* matches tb-tabs / tb-tab from TabsPage */
.tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  width: 100%;
}

.tabs--contained {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 4px;
}

.tabs--borderless {
  background: transparent;
  padding: 0;
  gap: 2px;
}

.tab {
  height: 36px;
  padding: 0 16px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-70);
  cursor: pointer;
  transition: background 120ms, color 120ms;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
}

.tab:hover:not(:disabled) {
  background: var(--grey-05);
  color: var(--grey-90);
}

.tab:focus-visible {
  outline: none;
  background: var(--grey-05);
  box-shadow: inset 0 0 0 2px var(--blue-azure-50);
  color: var(--grey-90);
}

.tab--selected {
  background: var(--grey-10);
  color: var(--grey-100);
  font-weight: 600;
}

.tab:disabled {
  color: var(--grey-30);
  cursor: not-allowed;
}
</style>
