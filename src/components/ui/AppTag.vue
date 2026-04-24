<script setup>
/**
 * AppTag — GSFleet Design System
 *
 * @prop {string}  type       - 'neutral' | 'neutral-outline' | 'neutral-inverted' |
 *                              'success' | 'success-strong' | 'informational' |
 *                              'danger' | 'warning' | 'moderate' | 'highlight'
 * @prop {string}  size       - 'sm' (24px, default) | 'md' (56px card tag)
 * @prop {boolean} dismissible - shows × button, emits 'dismiss' on click
 * @prop {string}  cardTitle  - top label for md card variant
 *
 * Slots:
 *   default  — tag label (or card subtitle in md)
 *   icon     — left icon (16×16)
 */
import { useSlots, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'neutral',
    validator: (v) => [
      'neutral', 'neutral-outline', 'neutral-inverted',
      'success', 'success-strong', 'informational',
      'danger', 'warning', 'moderate', 'highlight',
    ].includes(v),
  },
  size:        { type: String,  default: 'sm', validator: (v) => ['sm', 'md'].includes(v) },
  dismissible: { type: Boolean, default: false },
  cardTitle:   String,
})

const emit = defineEmits(['dismiss'])
const slots = useSlots()

const hasIcon    = computed(() => !!slots.icon)
const hasLabel   = computed(() => !!slots.default)
const isIconOnly = computed(() => hasIcon.value && !hasLabel.value && !props.dismissible)

const classes = computed(() => [
  'tag',
  `tag--${props.type}`,
  `tag--${props.size}`,
  hasIcon.value    && 'tag--has-icon',
  isIconOnly.value && 'tag--icon-only',
  props.dismissible && 'tag--dismissible',
])
</script>

<template>
  <div :class="classes">

    <!-- Left icon slot -->
    <span v-if="hasIcon" class="tag__icon" aria-hidden="true">
      <slot name="icon" />
    </span>

    <!-- MD card body -->
    <template v-if="size === 'md'">
      <div class="tag__card-body">
        <span class="tag__card-title">{{ cardTitle }}</span>
        <span class="tag__card-sub"><slot /></span>
      </div>
    </template>

    <!-- SM label -->
    <span v-else-if="hasLabel" class="tag__label">
      <slot />
    </span>

    <!-- Dismiss button -->
    <button
      v-if="dismissible"
      type="button"
      class="tag__close"
      aria-label="Remove"
      @click.stop="emit('dismiss')"
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M7 1L1 7M1 1l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>

  </div>
</template>

<style scoped>
/* ── Base ──────────────────────────────────────────────────── */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
}

/* ── SM size (default) ─────────────────────────────────────── */
.tag--sm              { height: 24px; padding: 6px 13px; }
.tag--sm.tag--has-icon   { padding: 4px 8px 4px 4px; }
.tag--sm.tag--icon-only  { padding: 4px; }
.tag--sm.tag--dismissible { padding: 6px 6px 6px 8px; }

/* ── MD size (card tag) ─────────────────────────────────────── */
.tag--md {
  height: 56px;
  min-width: 198px;
  padding: 10px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 11px;
  white-space: nowrap;
}
.tag__card-body  { display: flex; flex-direction: column; gap: 11px; }
.tag__card-title { font-size: 12px; font-weight: 400; line-height: 1; }
.tag__card-sub   { font-size: 12px; font-weight: 400; line-height: 1; color: #36383b; }

/* ── Icon ──────────────────────────────────────────────────── */
.tag__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

/* ── Dismiss button ────────────────────────────────────────── */
.tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  color: inherit;
  opacity: 0.65;
  transition: opacity 120ms ease;
}
.tag__close:hover        { opacity: 1; }
.tag__close:focus-visible { outline: 2px solid currentColor; outline-offset: 1px; }

/* ── Type — Neutral ────────────────────────────────────────── */
.tag--neutral { background: #e6e6e7; color: #5d6065; }
.tag--neutral:hover { border-color: #c0c2c6; color: #36383b; }

/* ── Type — Neutral Outline ────────────────────────────────── */
.tag--neutral-outline { background: #ffffff; color: #6f7176; border-color: #c0c2c6; }
.tag--neutral-outline:hover { background: #f7f7f8; color: #36383b; }

/* ── Type — Neutral Inverted ───────────────────────────────── */
.tag--neutral-inverted { background: #6f7176; color: #f1f1f2; }
.tag--neutral-inverted:hover { background: #5d6065; border-color: #6f7176; }

/* ── Type — Success ────────────────────────────────────────── */
.tag--success { background: #c5f2cb; color: #12591c; }
.tag--success:hover { background: #a8ebb2; border-color: #64d074; }

/* ── Type — Success Strong ─────────────────────────────────── */
.tag--success-strong { background: #247a31; color: #f1fcf2; }
.tag--success-strong:hover { background: #12591c; border-color: #469852; }

/* ── Type — Informational ──────────────────────────────────── */
.tag--informational { background: #b3e1f7; color: #013b57; }
.tag--informational:hover { border-color: #61bde9; }

/* ── Type — Danger ─────────────────────────────────────────── */
.tag--danger { background: #fecaca; color: #781212; }
.tag--danger:hover { border-color: #fca5a5; }

/* ── Type — Warning ────────────────────────────────────────── */
.tag--warning { background: #ffe2cc; color: #702822; }
.tag--warning:hover { border-color: #ffa767; }

/* ── Type — Moderate ───────────────────────────────────────── */
.tag--moderate { background: #ffeec7; color: #927302; }
.tag--moderate:hover { border-color: #fde9b9; }

/* ── Type — Highlight ──────────────────────────────────────── */
.tag--highlight { background: #e4daff; color: #553698; }
.tag--highlight:hover { border-color: #bea3fd; color: #02005f; }

/* ── MD card title color per type ──────────────────────────── */
.tag--md.tag--highlight .tag__card-title { color: #553698; }
.tag--md.tag--neutral   .tag__card-title { color: #5d6065; }
.tag--md.tag--success   .tag__card-title { color: #12591c; }
.tag--md.tag--informational .tag__card-title { color: #013b57; }
</style>
