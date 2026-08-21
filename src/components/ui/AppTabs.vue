<script setup>
/**
 * AppTabs
 *
 * @prop modelValue  Currently selected tab value
 * @prop items       Array<{ label: string, value: string | number, disabled?: boolean }>
 * @prop variant     'contained' (default) | 'borderless'
 *
 * Keyboard: Left/Right arrows move between tabs (roving tabindex).
 * Home/End jump to first/last. Selected tab is the tab-stop; others use tabindex="-1".
 */
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { required: true },
  items: { type: Array, required: true },
  variant: { type: String, default: 'contained', validator: (v) => ['contained', 'borderless'].includes(v) },
})
const emit = defineEmits(['update:modelValue'])

const tabsClasses = computed(() => ['tabs', `tabs--${props.variant}`])

const listRef = ref(null)

function onKeydown(e) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
  if (!keys.includes(e.key)) return
  e.preventDefault()

  const enabled = props.items.filter(t => !t.disabled)
  if (!enabled.length) return
  const cur = enabled.findIndex(t => t.value === props.modelValue)

  let next = cur
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (cur + 1) % enabled.length
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (cur - 1 + enabled.length) % enabled.length
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = enabled.length - 1

  if (next !== cur) {
    emit('update:modelValue', enabled[next].value)
    const btns = listRef.value?.querySelectorAll('[role="tab"]:not([disabled])')
    btns?.[next]?.focus()
  }
}
</script>

<template>
  <div :class="tabsClasses" role="tablist" ref="listRef" @keydown="onKeydown">
    <button
      v-for="item in items"
      :key="item.value"
      :class="['tab', { 'tab--selected': modelValue === item.value }]"
      role="tab"
      :aria-selected="modelValue === item.value"
      :tabindex="modelValue === item.value ? 0 : -1"
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
  background: var(--grey-05);
  padding: 0;
  gap: 0;
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

.tabs--borderless .tab {
  height: 40px;
  border-radius: 4px;
}

.tab:hover:not(:disabled) {
  background: var(--grey-10);
  color: var(--grey-90);
}

.tab:focus-visible {
  outline: none;
  background: var(--grey-10);
  box-shadow: inset 0 0 0 2px var(--blue-azure-50);
  color: var(--grey-90);
}

.tab--selected {
  background: var(--grey-10);
  color: var(--grey-100);
  font-weight: 600;
}

.tabs--borderless .tab--selected {
  background: var(--grey-20);
  color: var(--grey-90);
}

.tab:disabled {
  color: var(--grey-30);
  cursor: not-allowed;
}
</style>
