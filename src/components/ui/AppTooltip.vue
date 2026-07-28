<script setup>
/**
 * AppTooltip
 * Wraps a trigger element and shows a tooltip on hover/focus.
 *
 * @prop content  Tooltip text
 * @prop variant  'light' (default) | 'dark'
 * @prop position 'top' (default) | 'bottom' | 'left' | 'right'
 *
 * Slot: trigger element (the thing the tooltip appears on)
 */
defineProps({
  content:  { type: String, required: true },
  variant:  { type: String, default: 'light', validator: (v) => ['light', 'dark'].includes(v) },
  position: { type: String, default: 'top',   validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v) },
})
</script>

<template>
  <span class="tt-anchor">
    <slot />
    <span :class="['tt', `tt--${variant}`, `tt--${position}`, 'tt--live']" role="tooltip">
      {{ content }}
    </span>
  </span>
</template>

<style scoped>
/* tooltip text — matches .tt from TooltipPage */
.tt {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  position: absolute;
  z-index: 200;
}
.tt--dark  { background: var(--grey-100); color: #fff; }
.tt--light { background: #fff; color: var(--grey-90); box-shadow: inset 0 0 0 1px var(--grey-20); }

/* anchor — positions the tooltip */
.tt-anchor {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* hidden by default, shown on hover/focus */
.tt--live {
  opacity: 0;
  visibility: hidden;
  transition: opacity 120ms, visibility 120ms;
}
.tt-anchor:hover .tt--live,
.tt-anchor:focus-within .tt--live {
  opacity: 1;
  visibility: visible;
}

/* position variants */
.tt--top    { bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); }
.tt--bottom { top: calc(100% + 6px);    left: 50%; transform: translateX(-50%); }
.tt--left   { right: calc(100% + 6px);  top: 50%;  transform: translateY(-50%); }
.tt--right  { left: calc(100% + 6px);   top: 50%;  transform: translateY(-50%); }
</style>
