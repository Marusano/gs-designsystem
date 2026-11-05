<script setup>
import { computed } from 'vue'

const props = defineProps({
  label:       { type: String,  required: true },
  value:       { type: String,  required: true },
  /**
   * Semantic type.
   * plain | success | warning | danger | overlimit
   */
  type:        { type: String,  default: 'plain' },
  /**
   * Severity bar fill, 0–100.
   * Ignored when type is 'plain' (no bar shown).
   */
  barPercent:  { type: Number,  default: 0 },
  /** Forced visual state for documentation — 'hover' */
  forcedState: { type: String,  default: null },
})

const hasBar = computed(() => props.type !== 'plain')

const fillStyle = computed(() => ({
  width: `${Math.min(100, Math.max(0, props.barPercent))}%`,
}))

const cardClass = computed(() => ({
  [`dc--${props.type}`]: true,
  'is-hover':            props.forcedState === 'hover',
}))
</script>

<template>
  <div class="dc" :class="cardClass">
    <div class="dc__body">
      <span class="dc__label">{{ label }}</span>
      <span class="dc__value">{{ value }}</span>
    </div>
    <div v-if="hasBar" class="dc__bar">
      <div class="dc__bar-fill" :style="fillStyle" />
    </div>
  </div>
</template>

<style scoped>
.dc {
  width: 192px;
  border-radius: 4px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  transition: box-shadow 80ms;
}

.dc__body {
  padding: 12px;
  background: var(--grey-05);
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 73px;
}

.dc__label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--grey-70);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dc__value {
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: var(--grey-90);
}

.dc__bar {
  height: 12px;
  background: var(--grey-10);
}

.dc__bar-fill {
  height: 100%;
  background: var(--green-40);
  transition: width 200ms ease;
}

/* Hover: inset box-shadow avoids layout shift */
.dc:hover,
.dc.is-hover {
  box-shadow: inset 0 0 0 2px var(--grey-40);
}

/* ── Type: warning ─────────────────────────────────────────── */
.dc--warning .dc__value     { color: var(--yellow-100); }
.dc--warning .dc__bar-fill  { background: var(--yellow-40); }

/* ── Type: danger ──────────────────────────────────────────── */
.dc--danger .dc__value      { color: var(--red-80); }
.dc--danger .dc__bar-fill   { background: var(--red-50); }

/* ── Type: overlimit ───────────────────────────────────────── */
.dc--overlimit .dc__body     { background: var(--red-20); }
.dc--overlimit .dc__value    { color: var(--red-80); }
.dc--overlimit .dc__bar      { background: var(--red-30); }
.dc--overlimit .dc__bar-fill { background: var(--red-50); }
</style>
