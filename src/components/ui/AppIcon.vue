<script setup>
import { computed } from 'vue'
import { ICONS } from '../icons/index.js'

const props = defineProps({
  name:  { type: String, required: true },
  size:  { type: Number, default: 24 },
  color: { type: String, default: 'currentColor' },
})

const icon    = computed(() => ICONS[props.name])
const viewBox = computed(() => icon.value?.vb || '0 0 24 24')
const paths   = computed(() => {
  if (!icon.value) return []
  return Array.isArray(icon.value.d) ? icon.value.d : [icon.value.d]
})
</script>

<template>
  <svg
    v-if="icon"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :fill="color"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-for="(d, i) in paths"
      :key="i"
      :d="d"
      :fill-rule="icon.fillRule || undefined"
      :clip-rule="icon.clipRule || icon.fillRule || undefined"
    />
  </svg>
</template>
