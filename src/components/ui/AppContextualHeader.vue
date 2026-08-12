<script setup>
/**
 * AppContextualHeader — GSFleet Design System
 * Persistent key-data banner displayed on secondary pages, directly below PageHeader.
 * Maintains user orientation by showing essential entity identifiers while navigating tabs.
 *
 * Figma: w6mC7PaMgtX4fbmagiDtAq · nodes 4420:26139, 4420:26283
 *
 * @prop {Array}   items         - Data fields: [{ label, value, href? }]. Typically 4–6 items.
 * @prop {string}  [statusLabel] - Column heading for the #status slot. Required when slot is used.
 *
 * Slots:
 *   #status — Optional status badge for the rightmost column.
 *             Typically an <AppTag> (e.g. type="success-strong").
 *             When omitted, no status column is rendered.
 */

defineProps({
  items: {
    type: Array,
    required: true,
  },
  statusLabel: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div class="ch">

    <!-- Data point columns -->
    <div v-for="(item, i) in items" :key="i" class="ch__item">
      <span class="ch__label">{{ item.label }}</span>
      <a v-if="item.href" :href="item.href" class="ch__value ch__value--link">{{ item.value }}</a>
      <span v-else class="ch__value">{{ item.value }}</span>
    </div>

    <!-- Status column (opt-in via #status slot) -->
    <div v-if="$slots.status" class="ch__item ch__item--status">
      <span class="ch__label">{{ statusLabel }}</span>
      <slot name="status" />
    </div>

  </div>
</template>

<style scoped>
/* ─── Root ──────────────────────────────────────────────────── */
.ch {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 75px;
  padding: 12px 16px;
  background: var(--color-surface-subtle);
  box-shadow: inset 0 -1px 0 var(--grey-20);
  font-family: 'Inter', sans-serif;
  width: 100%;
  box-sizing: border-box;
}

/* ─── Data point ────────────────────────────────────────────── */
.ch__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

/* ─── Status column ─────────────────────────────────────────── */
.ch__item--status {
  flex: 0 0 auto;
  align-items: flex-end;
  min-width: 64px;
}

/* ─── Label ─────────────────────────────────────────────────── */
.ch__label {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: var(--grey-60);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── Value ─────────────────────────────────────────────────── */
.ch__value {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: var(--grey-90);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ch__value--link {
  color: var(--blue-vivid-70);
  text-decoration: none;
}

.ch__value--link:hover {
  text-decoration: underline;
}
</style>
