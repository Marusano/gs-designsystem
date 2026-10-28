<script setup>
defineOptions({ name: 'AppStatsCard' })

defineProps({
  label: { type: String, default: '' },
  value: { type: String, default: '' },
  compareText: { type: String, default: '' },
  divider: {
    type: String,
    default: 'both',
    validator: v => ['both', 'right', 'left', 'none'].includes(v),
  },
})
</script>

<template>
  <div :class="['sc', `sc--divider-${divider}`, compareText && 'sc--compare']">
    <p class="sc__label">{{ label }}</p>
    <p class="sc__value">{{ value }}</p>
    <p v-if="compareText" class="sc__compare">{{ compareText }}</p>
  </div>
</template>

<style scoped>
.sc {
  flex: 1 1 0;
  min-width: 140px;
  background: var(--grey-00);
  padding: 16px 16px 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  letter-spacing: 0.25px;
}

.sc--compare {
  padding: 8px 16px 8px 12px;
  gap: 4px;
}

/* Dividers via box-shadow to avoid layout shift */
.sc--divider-both  { box-shadow: inset 1px 0 0 var(--grey-20), inset -1px 0 0 var(--grey-20); }
.sc--divider-left  { box-shadow: inset 1px 0 0 var(--grey-20); }
.sc--divider-right { box-shadow: inset -1px 0 0 var(--grey-20); }
.sc--divider-none  { box-shadow: none; }

.sc__label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--grey-70);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sc__value {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  color: var(--grey-90);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sc__compare {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--grey-60);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
