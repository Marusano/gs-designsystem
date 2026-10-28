<script setup>
import AppIcon from './AppIcon.vue'

defineOptions({ name: 'AppSectionHeader' })

const props = defineProps({
  type: {
    type: String,
    default: 'collapsable',
    validator: v => ['collapsable', 'static'].includes(v),
  },
  title: { type: String, default: '' },
  expanded: { type: Boolean, default: false },
})

const emit = defineEmits(['update:expanded'])

function toggle() {
  emit('update:expanded', !props.expanded)
}
</script>

<template>
  <div
    :class="[
      'sh',
      type === 'static' && 'sh--static',
      expanded && 'sh--expanded',
    ]"
  >
    <span class="sh__title">{{ title }}</span>

    <div class="sh__actions">
      <slot name="actions" />
    </div>

    <button
      v-if="type === 'collapsable'"
      class="sh__toggle"
      :aria-expanded="String(expanded)"
      :aria-label="expanded ? 'Collapse section' : 'Expand section'"
      @click="toggle"
    >
      <AppIcon :name="expanded ? 'minus' : 'plus'" :size="24" />
    </button>
  </div>
</template>

<style scoped>
.sh {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 4px 0 12px;
  border-radius: 4px;
  background: var(--color-surface-subtle);
}

.sh--static {
  padding: 0 12px;
}

.sh--expanded {
  background: var(--grey-00);
  box-shadow: inset 0 1px 0 var(--grey-30);
}

.sh__title {
  flex: 1 0 0;
  min-width: 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--grey-90);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sh__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 80ms;
}

.sh:hover .sh__actions {
  opacity: 1;
  pointer-events: auto;
}

.sh__toggle {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: var(--grey-90);
  transition: background 80ms;
}

.sh__toggle:hover {
  background: var(--grey-10);
}
</style>
