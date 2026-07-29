<script setup>
/**
 * AppLegend
 * Renders a row of color-coded legend items (dot or dash marker + label).
 *
 * @prop items  Array<{ label: string, color: string, dash?: boolean }>
 *              dash: true renders a short horizontal line instead of a square dot
 */
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="lg-strip">
    <div v-for="(item, i) in items" :key="i" class="lg-item">
      <span
        v-if="item.dash"
        class="lg-dash"
        :style="{ background: item.color || '#1f2124' }"
      />
      <span
        v-else
        class="lg-dot"
        :style="{ background: item.color }"
      />
      <span class="lg-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.lg-strip {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.lg-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lg-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.lg-dash {
  display: inline-block;
  width: 12px;
  height: 2px;
  border-radius: 1px;
  flex-shrink: 0;
}

.lg-label {
  font-size: 13px;
  color: var(--grey-80);
  font-family: 'Inter', sans-serif;
}
</style>
