<script setup>
import { computed } from 'vue'

defineOptions({ name: 'AppContextualOverlay' })

const props = defineProps({
  type: {
    type: String,
    default: 'plain',
    validator: v => ['plain', 'asset', 'driver', 'trip'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['md', 'sm'].includes(v),
  },
  status: {
    type: String,
    default: 'main',
    validator: v => ['main', 'driver-driving', 'driver-rest', 'driver-otherwork', 'asset-driving', 'asset-idling', 'asset-engineoff', 'asset-parking'].includes(v),
  },
  title:    { type: String, default: '' },
  subtitle: { type: String, default: '' },
  subtitle2: { type: String, default: '' },
})

const headerBg = computed(() => ({
  'driver-driving':   'var(--green-10)',
  'asset-driving':    'var(--green-10)',
  'asset-idling':     'var(--blue-azure-10)',
  'asset-parking':    'var(--blue-azure-20)',
  'asset-engineoff':  'var(--grey-05)',
  'driver-rest':      'var(--grey-10)',
  'driver-otherwork': 'var(--indigo-10)',
  main:               'var(--grey-00)',
})[props.status] ?? 'var(--grey-00)')

const tagConfig = computed(() => ({
  'driver-driving':   { label: 'Driving',    bg: 'var(--green-90)',       color: 'var(--green-10)',      icon: 'driving' },
  'asset-driving':    { label: 'Driving',    bg: 'var(--green-90)',       color: 'var(--green-10)',      icon: 'asset-driving' },
  'asset-idling':     { label: 'Idling',     bg: 'var(--blue-azure-90)',  color: 'var(--grey-00)',       icon: 'idling' },
  'asset-parking':    { label: 'Parked',     bg: 'transparent',           color: 'var(--blue-azure-90)', icon: 'parked', shadow: 'inset 0 0 0 1px var(--blue-azure-30)' },
  'asset-engineoff':  { label: 'Engine off', bg: 'var(--grey-20)',        color: 'var(--grey-70)',       icon: 'off' },
  'driver-rest':      { label: 'Resting',    bg: 'var(--grey-20)',        color: 'var(--grey-80)',       icon: 'rest' },
  'driver-otherwork': { label: 'Other work', bg: 'var(--indigo-20)',      color: 'var(--indigo-90)',     icon: 'otherwork' },
})[props.status] ?? null)

const showTag = computed(() => props.type !== 'plain' && tagConfig.value !== null)
</script>

<template>
  <div :class="['co', `co--${size}`, `co--type-${type}`, `co--status-${status}`]">

    <!-- Header -->
    <div class="co__header" :style="{ background: headerBg }">
      <div class="co__header-text">
        <span :class="['co__title', size === 'sm' && 'co__title--sm']">{{ title }}</span>
        <span v-if="subtitle" :class="['co__subtitle', size === 'sm' && 'co__subtitle--sm']">{{ subtitle }}</span>
        <span v-if="subtitle2 && size === 'md'" class="co__subtitle2">{{ subtitle2 }}</span>
      </div>

      <!-- Right side: auto status tag, or custom override -->
      <slot name="header-right">
        <div
          v-if="showTag"
          :class="['co__tag', size === 'sm' && tagConfig.icon && 'co__tag--icon-only']"
          :style="{ background: tagConfig.bg, color: tagConfig.color, boxShadow: tagConfig.shadow }"
        >
          <img v-if="tagConfig.icon === 'driving'"       src="../../assets/overlay-icons/icon-driving.svg"       class="co__tag-icon" alt="" />
          <img v-if="tagConfig.icon === 'asset-driving'" src="../../assets/overlay-icons/icon-asset-driving.svg" class="co__tag-icon" alt="" />
          <img v-if="tagConfig.icon === 'rest'"      src="../../assets/overlay-icons/icon-rest.svg"      class="co__tag-icon" alt="" />
          <img v-if="tagConfig.icon === 'otherwork'" src="../../assets/overlay-icons/icon-otherwork.svg" class="co__tag-icon" alt="" />
          <img v-if="tagConfig.icon === 'parked'"    src="../../assets/overlay-icons/icon-parked.svg"    class="co__tag-icon" alt="" />
          <img v-if="tagConfig.icon === 'idling'"    src="../../assets/overlay-icons/icon-idling.svg"    class="co__tag-icon" alt="" />
          <img v-if="tagConfig.icon === 'off'"       src="../../assets/overlay-icons/icon-off.svg"       class="co__tag-icon" alt="" />
          <span v-if="size === 'md' || !tagConfig.icon" class="co__tag-label">{{ tagConfig.label }}</span>
        </div>
      </slot>
    </div>

    <!-- Divider (shown when there is content below header) -->
    <div v-if="$slots.body || $slots.section || $slots.footer" class="co__divider" />

    <!-- Body slot -->
    <div v-if="$slots.body" class="co__body">
      <slot name="body" />
    </div>

    <!-- Section slot (grey bg, e.g. driver info in fleet expanded) -->
    <slot name="section" />

    <!-- Footer divider + footer -->
    <template v-if="$slots.footer">
      <div v-if="$slots.body || $slots.section" class="co__divider" />
      <div class="co__footer">
        <slot name="footer" />
      </div>
    </template>

  </div>
</template>

<style scoped>
/* ── Container ────────────────────────────────────────────── */
.co {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: var(--grey-00);
  filter: drop-shadow(0 4px 7.5px rgba(0, 0, 0, 0.25));
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.co--md { width: 341px; }
.co--sm { width: 232px; }

/* ── Header ───────────────────────────────────────────────── */
.co__header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  flex-shrink: 0;
}

.co__header-text {
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.co__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: var(--grey-90);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.co__title--sm {
  font-size: 12px;
  letter-spacing: 0.25px;
}

.co__subtitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: var(--grey-70);
  letter-spacing: 0.25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
}

.co__subtitle--sm {
  font-size: 12px;
}

.co__subtitle2 {
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  color: var(--grey-70);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
}

/* ── Status tag ───────────────────────────────────────────── */
.co__tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
}

.co__tag-icon {
  width: 16px;
  height: 16px;
  display: block;
  flex-shrink: 0;
}

.co__tag-label {
  line-height: 14px;
}

/* ── Divider ──────────────────────────────────────────────── */
.co__divider {
  height: 1px;
  background: var(--grey-20);
  flex-shrink: 0;
}

/* ── Body ─────────────────────────────────────────────────── */
.co__body {
  background: var(--grey-00);
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ── Footer ───────────────────────────────────────────────── */
.co__footer {
  background: var(--grey-00);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  min-height: 40px;
}

.co--sm .co__footer {
  justify-content: center;
}

.co__tag--icon-only {
  padding: 4px;
}
</style>
