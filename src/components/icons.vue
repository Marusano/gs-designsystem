<script setup>
/**
 * icons.vue — GSFleet Design System
 * Spinner icon component
 *
 * Translates Figma node 4384:20310 (icons/spinner, Size=24, Style=filled).
 * Track (Ellipse 26): --grey-30 · stroke-width 4 on r=9 in 22px SVG canvas
 * Arc   (Ellipse 27): angular gradient --grey-90 transparent→opaque, 0→360°
 *
 * @prop {number}  size        - 16 (sm) or 24 (md, default); maps to size.icon.sm/lg tokens
 * @prop {boolean} disabled    - pauses animation and mutes the palette
 * @prop {string}  forcedState - docs-only: force a visual state for documentation
 *                               'hover' | 'active' | 'disabled'
 */
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 24,
    validator: (v) => [16, 24].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  /** Force a visual state — for design-system documentation only */
  forcedState: {
    type: String,
    default: null,
    validator: (v) => [null, 'hover', 'active', 'disabled'].includes(v),
  },
})

const isDisabled = computed(() => props.disabled || props.forcedState === 'disabled')

const classes = computed(() => [
  'spinner',
  props.size === 16 ? 'spinner--sm' : 'spinner--md',
  isDisabled.value && 'spinner--disabled',
  props.forcedState && `is-${props.forcedState}`,
])
</script>

<template>
  <span
    :class="classes"
    :style="{ '--sz': `${size}px` }"
    role="status"
    aria-label="Loading"
  />
</template>

<style scoped>
/* ─────────────────────────────────────────────────────────────
   BASE
   Two-layer ring: ::before = static track, ::after = rotating arc
   Geometry (24px): 1px inset, 4px stroke on r=9 circle (22px canvas)
   Track ring:  inner 7px · outer 11px from parent centre
   Arc mask:    inner 58% · outer 92% of parent half-width
───────────────────────────────────────────────────────────── */
.spinner {
  --sz:    24px;
  --track: var(--grey-30);
  --arc:   var(--grey-90);

  position:     relative;
  display:      inline-block;
  flex-shrink:  0;
  width:        var(--sz);
  height:       var(--sz);
}

.spinner::before,
.spinner::after {
  content:       '';
  position:      absolute;
  border-radius: 50%;
}

/* ── Track: full ring via inset box-shadow (no layout shift) */
.spinner::before {
  inset:      1px;
  box-shadow: inset 0 0 0 4px var(--track);
}

/* ── Arc: conic gradient fade masked to the same ring geometry, rotates */
.spinner::after {
  inset: 0;
  /* transparent→arc over 360° starting at 90° (3 o'clock), comet-tail fade */
  background: conic-gradient(
    from 90deg,
    color-mix(in srgb, var(--arc) 0%, transparent) 0deg,
    var(--arc) 360deg
  );
  -webkit-mask: radial-gradient(
    circle,
    transparent 57%, black 58%,
    black 91%,   transparent 92%
  );
  mask: radial-gradient(
    circle,
    transparent 57%, black 58%,
    black 91%,   transparent 92%
  );
  animation: spinner-spin 700ms linear infinite;
}

/* ─────────────────────────────────────────────────────────────
   SIZES
   sm (16px): proportional ring — 3px stroke, outer 7px / inner 4px from centre
───────────────────────────────────────────────────────────── */
.spinner--sm::before { box-shadow: inset 0 0 0 3px var(--track); }
.spinner--sm::after {
  -webkit-mask: radial-gradient(circle, transparent 49%, black 51%, black 86%, transparent 88%);
  mask:         radial-gradient(circle, transparent 49%, black 51%, black 86%, transparent 88%);
}

/* ─────────────────────────────────────────────────────────────
   STATES
   hover / active are docs-only (forcedState); disabled pauses + mutes
───────────────────────────────────────────────────────────── */
.spinner.is-hover  { --arc: var(--grey-100); }
.spinner.is-active { --arc: var(--grey-70);  }

.spinner--disabled,
.spinner.is-disabled {
  --track: var(--grey-20);
  --arc:   var(--grey-40);
}

.spinner--disabled::after,
.spinner.is-disabled::after {
  animation-play-state: paused;
}

/* ─────────────────────────────────────────────────────────────
   ANIMATION
───────────────────────────────────────────────────────────── */
@keyframes spinner-spin {
  to { transform: rotate(360deg); }
}
</style>
