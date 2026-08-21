<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import AppButton   from './AppButton.vue'
import AppCheckbox from './AppCheckbox.vue'
import AppIcon     from './AppIcon.vue'

/**
 * AppFilterMenu — GSFleet Design System
 * Self-contained filter control: trigger button + multi-select dropdown + apply action.
 *
 * @prop {string}   label      - Button label
 * @prop {Array}    options    - string[] or { value, label }[] — list of selectable options
 * @prop {Array}    modelValue - Currently applied selections (v-model)
 * @prop {boolean}  forceOpen  - Keep panel open (docs / demo only)
 *
 * Emits: update:modelValue (Array) — when user clicks "Apply changes"
 *
 * Keyboard: Up/Down arrows move between checkboxes; Tab/Shift+Tab cycles within the panel
 * (focus trap); Escape closes and returns focus to trigger.
 */

const props = defineProps({
  label:      { type: String,  required: true },
  options:    { type: Array,   required: true },
  modelValue: { type: Array,   default: () => [] },
  forceOpen:  { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

// Normalise options to {value, label} objects
const normalised = computed(() =>
  props.options.map(o => typeof o === 'string' ? { value: o, label: o } : o)
)

const root     = ref(null)
const panelRef = ref(null)
const open     = ref(false)
// When forced open for docs, initialise pending from modelValue immediately
const pending  = ref(props.forceOpen ? [...props.modelValue] : [])

const isOpen   = computed(() => props.forceOpen || open.value)
const isActive = computed(() => props.modelValue.length > 0 || isOpen.value)
const chevron  = computed(() => isOpen.value ? 'chevron-up' : 'chevron-down')

function toggle() {
  if (open.value) {
    close()
  } else {
    pending.value = [...props.modelValue]
    open.value = true
    document.addEventListener('click', onOutside, true)
  }
}

function close() {
  open.value = false
  document.removeEventListener('click', onOutside, true)
}

function closeAndReturnFocus() {
  close()
  nextTick(() => {
    root.value?.querySelector('button:not([disabled])')?.focus()
  })
}

function onOutside(e) {
  if (root.value && !root.value.contains(e.target)) close()
}

function toggleOpt(value) {
  const i = pending.value.indexOf(value)
  if (i === -1) pending.value.push(value)
  else          pending.value.splice(i, 1)
}

function apply() {
  emit('update:modelValue', [...pending.value])
  closeAndReturnFocus()
}

// Focus first checkbox when panel opens (skip when forceOpen is docs mode)
watch(open, (val) => {
  if (val && !props.forceOpen) {
    nextTick(() => panelRef.value?.querySelector('input[type="checkbox"]')?.focus())
  }
})

// Keep pending in sync when modelValue changes while forced-open (docs use-case)
watch(() => props.modelValue, (val) => {
  if (props.forceOpen) pending.value = [...val]
})

function onPanelKeydown(e) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    closeAndReturnFocus()
    return
  }

  const focusable = [...panelRef.value.querySelectorAll(
    'input[type="checkbox"]:not([disabled]), button:not([disabled])'
  )]
  const checkboxes = focusable.filter(el => el.type === 'checkbox')
  const cur = focusable.indexOf(document.activeElement)

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const curCb = checkboxes.indexOf(document.activeElement)
    if (curCb === -1) { checkboxes[0]?.focus(); return }
    checkboxes[(curCb + 1) % checkboxes.length].focus()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    const curCb = checkboxes.indexOf(document.activeElement)
    if (curCb === -1) { checkboxes[checkboxes.length - 1]?.focus(); return }
    checkboxes[(curCb - 1 + checkboxes.length) % checkboxes.length].focus()
  } else if (e.key === 'Tab') {
    // Focus trap: wrap at boundaries
    if (e.shiftKey) {
      if (cur === 0) { e.preventDefault(); focusable[focusable.length - 1]?.focus() }
    } else {
      if (cur === focusable.length - 1) { e.preventDefault(); focusable[0]?.focus() }
    }
  }
}

onUnmounted(close)
</script>

<template>
  <div ref="root" class="fmenu">

    <!-- Trigger button -->
    <AppButton
      variant="tertiary"
      size="sm"
      :selected="isActive"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      @click="toggle"
    >
      {{ label }}
      <template #icon-right>
        <AppIcon :name="chevron" :size="12" />
      </template>
    </AppButton>

    <!-- Dropdown panel -->
    <div v-if="isOpen" ref="panelRef" class="fmenu__panel" @keydown="onPanelKeydown">
      <ul class="fmenu__list">
        <li v-for="opt in normalised" :key="opt.value" class="fmenu__item">
          <AppCheckbox
            :model-value="pending.includes(opt.value)"
            @update:model-value="toggleOpt(opt.value)"
          >{{ opt.label }}</AppCheckbox>
        </li>
      </ul>
      <div class="fmenu__footer">
        <AppButton variant="primary" size="sm" style="width:100%" @click="apply">
          Apply changes
        </AppButton>
      </div>
    </div>

  </div>
</template>

<style scoped>
.fmenu {
  position: relative;
  display: inline-flex;
}

/* ── Dropdown panel ─────────────────────────────────────────── */
.fmenu__panel {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 50;
  min-width: 200px;
  background: var(--color-surface-default);
  border: 1px solid var(--grey-30);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10);
  overflow: hidden;
}

.fmenu__list {
  list-style: none;
  padding: 4px 0;
  margin: 0;
}

.fmenu__item {
  display: flex;
  align-items: center;
  padding: 0 14px;
  cursor: pointer;
  transition: background 80ms;
}
.fmenu__item:hover { background: var(--grey-05); }

.fmenu__item :deep(.cb-wrapper) {
  width: 100%;
  padding: 8px 0;
}

/* ── Footer with action ─────────────────────────────────────── */
.fmenu__footer {
  border-top: 1px solid var(--grey-10);
  padding: 8px 12px;
}
</style>
