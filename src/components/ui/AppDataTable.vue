<script setup>
import { computed, ref } from 'vue'
import AppCheckbox from './AppCheckbox.vue'
import AppIcon from './AppIcon.vue'

const ICON_DOTS = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>`

const props = defineProps({
  /**
   * Column definitions.
   * [{ key: string, label: string, align?: 'left'|'right', bold?: boolean, width?: string, sortable?: boolean }]
   * - bold: renders cell value in semibold (use for primary identifier column)
   * - align: 'right' right-aligns the header and cell content
   * - width: CSS flex-basis override, e.g. '120px' (default: flex 1)
   * - sortable: show sort indicator and allow click-to-sort; cycles none → asc → desc → none
   */
  columns: { type: Array, required: true },

  /** Row data. Each object must contain the field specified by rowKey. */
  rows: { type: Array, required: true },

  /** Field name used as the unique row identifier (must be unique across rows). */
  rowKey: { type: String, default: 'id' },

  /** Enable checkbox selection column. */
  selectable: { type: Boolean, default: false },

  /**
   * Currently selected row keys (use with v-model:selected).
   * Array of rowKey values.
   */
  selected: { type: Array, default: () => [] },

  /**
   * Show the row-action dots button on every row.
   * Emits 'row-action' with { row, key } on click.
   */
  showActions: { type: Boolean, default: true },
})

const emit = defineEmits([
  'update:selected', // [key, ...] — updated selection
  'row-click',       // { row, key }
  'row-action',      // { row, key }
  'sort',            // { key: string|null, dir: 'asc'|'desc'|null }
])

const hoverKey = ref(null)

/* ── Sorting ─────────────────────────────────────────────── */
const sortKey = ref(null)
const sortDir = ref(null)

function toggleSort(key) {
  if (sortKey.value !== key) {
    sortKey.value = key
    sortDir.value = 'asc'
  } else if (sortDir.value === 'asc') {
    sortDir.value = 'desc'
  } else {
    sortKey.value = null
    sortDir.value = null
  }
  emit('sort', { key: sortKey.value, dir: sortDir.value })
}

const sortedRows = computed(() => {
  if (!sortKey.value || !sortDir.value) return props.rows
  const k = sortKey.value
  const asc = sortDir.value === 'asc'
  return [...props.rows].sort((a, b) => {
    const va = a[k]
    const vb = b[k]
    if (va == null && vb == null) return 0
    if (va == null) return 1
    if (vb == null) return -1
    if (typeof va === 'number' && typeof vb === 'number') return asc ? va - vb : vb - va
    const sa = String(va).toLowerCase()
    const sb = String(vb).toLowerCase()
    if (sa < sb) return asc ? -1 : 1
    if (sa > sb) return asc ? 1 : -1
    return 0
  })
})

const selectedSet = computed(() => new Set(props.selected))

const allSelected = computed(() =>
  props.rows.length > 0 &&
  props.rows.filter(r => !r.disabled).every(r => selectedSet.value.has(r[props.rowKey]))
)

const someSelected = computed(() =>
  !allSelected.value &&
  props.rows.some(r => selectedSet.value.has(r[props.rowKey]))
)

function toggleAll() {
  if (allSelected.value) {
    emit('update:selected', [])
  } else {
    emit('update:selected', props.rows.filter(r => !r.disabled).map(r => r[props.rowKey]))
  }
}

function toggleRow(key) {
  const next = new Set(selectedSet.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  emit('update:selected', [...next])
}

function isSelected(row) {
  return selectedSet.value.has(row[props.rowKey])
}

function rowClass(row) {
  const selected = isSelected(row)
  return {
    'dt__row--hover':    hoverKey.value === row[props.rowKey] && !selected && !row.disabled,
    'dt__row--selected': selected,
    'dt__row--disabled': !!row.disabled,
  }
}
</script>

<template>
  <div class="dt">

    <!-- ─── Header ──────────────────────────────────────────────── -->
    <div class="dt__header">
      <div v-if="selectable" class="dt__hcell dt__hcell--check" @click.stop>
        <AppCheckbox
          :model-value="allSelected"
          :indeterminate="someSelected"
          @update:model-value="toggleAll"
        />
      </div>

      <div
        v-for="col in columns"
        :key="col.key"
        class="dt__hcell"
        :class="{
          'dt__hcell--right':    col.align === 'right',
          'dt__hcell--sortable': col.sortable,
        }"
        :style="col.width ? { flex: `0 0 ${col.width}` } : {}"
        @click="col.sortable && toggleSort(col.key)"
      >
        <slot :name="`header-${col.key}`">
          <span class="dt__hcell-label">{{ col.label }}</span>
          <span v-if="col.sortable" :class="['dt__sort-icon', sortKey === col.key && 'dt__sort-icon--active']">
            <AppIcon v-if="sortKey === col.key && sortDir === 'asc'"  name="arrow-up"   :size="16" />
            <AppIcon v-else-if="sortKey === col.key && sortDir === 'desc'" name="arrow-down" :size="16" />
            <span v-else class="dt__sort-dash">–</span>
          </span>
        </slot>
      </div>

      <div v-if="showActions" class="dt__hcell dt__hcell--action" />
    </div>

    <!-- ─── Rows ─────────────────────────────────────────────────── -->
    <div
      v-for="row in sortedRows"
      :key="row[rowKey]"
      class="dt__row"
      :class="rowClass(row)"
      @mouseover="hoverKey = row[rowKey]"
      @mouseleave="hoverKey = null"
      @click="!row.disabled && emit('row-click', { row, key: row[rowKey] })"
    >
      <div v-if="selectable" class="dt__cell dt__cell--check" @click.stop>
        <AppCheckbox
          :model-value="isSelected(row)"
          :disabled="!!row.disabled"
          @update:model-value="toggleRow(row[rowKey])"
        />
      </div>

      <div
        v-for="col in columns"
        :key="col.key"
        class="dt__cell"
        :class="{
          'dt__cell--bold':     col.bold,
          'dt__cell--right':    col.align === 'right',
        }"
        :style="col.width ? { flex: `0 0 ${col.width}` } : {}"
      >
        <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
          {{ row[col.key] }}
        </slot>
      </div>

      <div v-if="showActions" class="dt__cell dt__cell--action" @click.stop>
        <button
          class="dt__action-btn"
          @click="emit('row-action', { row, key: row[rowKey] })"
        >
          <span v-html="ICON_DOTS" />
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ─── Table wrapper ─────────────────────────────────────────── */
.dt {
  box-shadow: inset 0 0 0 2px var(--grey-30);
  border-radius: 4px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  width: 100%;
}

/* ─── Header row ────────────────────────────────────────────── */
.dt__header {
  display: flex;
  align-items: center;
  height: var(--size-height-sm);
  background: var(--grey-10);
  box-shadow: inset 0 -1px 0 var(--grey-20);
  user-select: none;
}

.dt__hcell {
  flex: 1;
  min-width: 0;
  padding: 0 16px;
  font-size: var(--font-size-supporting-label);
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: var(--grey-70);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dt__hcell--check {
  flex: 0 0 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dt__hcell--action {
  flex: 0 0 40px;
  padding: 0;
}

.dt__hcell--right {
  text-align: right;
  justify-content: flex-end;
}

.dt__hcell--sortable {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.dt__hcell--sortable:hover {
  color: var(--grey-90);
}

.dt__hcell-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dt__sort-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--grey-40);
  transition: color 80ms;
}

.dt__sort-icon--active {
  color: var(--grey-70);
}

.dt__sort-dash {
  font-size: 11px;
  line-height: 1;
}

/* ─── Data rows ─────────────────────────────────────────────── */
.dt__row {
  display: flex;
  align-items: center;
  min-height: 48px;
  background: var(--grey-00);
  box-shadow: inset 0 -1px 0 var(--grey-30);
  cursor: pointer;
  transition: background 80ms;
}

.dt__row--hover {
  background: var(--grey-10);
}

.dt__row--selected {
  background: var(--blue-azure-10);
  box-shadow: inset 0 1px 0 var(--grey-30), inset 0 -1px 0 var(--grey-30);
}

.dt__row--disabled {
  background: var(--grey-00);
  cursor: default;
}

/* ─── Data cells ────────────────────────────────────────────── */
.dt__cell {
  flex: 1;
  min-width: 0;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: var(--grey-80);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dt__row--hover .dt__cell {
  color: var(--grey-90);
}

.dt__row--selected .dt__cell {
  color: var(--grey-90);
}

.dt__row--disabled .dt__cell {
  color: var(--grey-50);
}

.dt__cell--bold {
  font-weight: 600;
}

.dt__row--hover .dt__cell--bold {
  text-decoration: underline;
}

.dt__cell--right {
  text-align: right;
}

.dt__cell--check {
  flex: 0 0 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dt__cell--action {
  flex: 0 0 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ─── Action button ─────────────────────────────────────────── */
.dt__action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: var(--grey-70);
  padding: 0;
  transition: background 80ms;
}

.dt__action-btn:hover {
  background: var(--grey-20);
  color: var(--grey-90);
}
</style>
