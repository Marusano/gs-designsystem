<script setup>
import { computed } from 'vue'

const props = defineProps({
  count:   { type: Number, default: null },
  variant: { type: String, default: 'elevated', validator: (v) => ['elevated', 'flat'].includes(v) },
  dot:     { type: Boolean, default: false },
})

const classes = computed(() => [
  'nb',
  `nb--${props.variant}`,
  props.dot ? 'nb--dot' : '',
])

const label = computed(() => {
  if (props.dot || props.count === null) return ''
  return props.count > 99 ? '99+' : String(props.count)
})
</script>

<template>
  <div :class="classes" role="status" :aria-label="dot ? 'Notification' : `${count} notifications`">
    {{ label }}
  </div>
</template>

<style scoped>
/* matches ds-bubble from NotificationBubblePage */
.nb {
  min-width: 24px;
  height: 24px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}
.nb--elevated { background: #d7eff9; color: #36383b; }
.nb--flat     { background: #1f2124; color: #fff; }
.nb--dot {
  min-width: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  padding: 0;
}
.nb--dot.nb--elevated { background: #d7eff9; }
.nb--dot.nb--flat     { background: #1f2124; }
</style>
