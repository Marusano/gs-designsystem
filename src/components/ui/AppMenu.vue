<script setup>
/**
 * AppMenu
 * A dropdown menu positioned relative to a trigger.
 *
 * @prop items   Array<{ label: string, icon?: string (svg html), danger?: boolean, divider?: boolean, disabled?: boolean }>
 * @prop open    v-model for open state
 * @prop align   'left' (default) | 'right'
 * @prop wide    Wider min-width (220px)
 *
 * Slot "trigger": the element that opens the menu
 * Emits: 'update:open', 'select' (item)
 */
defineProps({
  items: { type: Array, required: true },
  open:  { type: Boolean, default: false },
  align: { type: String, default: 'left', validator: (v) => ['left', 'right'].includes(v) },
  wide:  { type: Boolean, default: false },
})
const emit = defineEmits(['update:open', 'select'])

function select(item) {
  if (item.disabled || item.divider) return
  emit('select', item)
  emit('update:open', false)
}
</script>

<template>
  <div class="menu-wrap" @keydown.esc="emit('update:open', false)">
    <div @click="emit('update:open', !open)">
      <slot name="trigger" />
    </div>
    <div
      v-if="open"
      :class="['menu', align === 'right' ? 'menu--right' : '', wide ? 'menu--wide' : '']"
      role="menu"
    >
      <template v-for="(item, i) in items" :key="i">
        <div v-if="item.divider" class="menu-divider" role="separator" />
        <div
          v-else
          :class="['menu-item', item.icon ? 'menu-item--icon' : '', item.danger ? 'menu-item--danger' : '', item.disabled ? 'menu-item--disabled' : '']"
          role="menuitem"
          :aria-disabled="item.disabled"
          @click="select(item)"
        >
          <span v-if="item.icon" class="menu-item__icon" v-html="item.icon" aria-hidden="true" />
          {{ item.label }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.menu-wrap { position: relative; display: inline-flex; }

/* matches ds-menu from MenuPage */
.menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 100;
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e6e6e7;
  border-radius: 4px;
  box-shadow: 0 4px 7.5px rgba(0,0,0,.24);
  padding: 4px;
  min-width: 180px;
}
.menu--right { left: auto; right: 0; }
.menu--wide  { min-width: 220px; }

/* matches ds-menu-item from MenuPage */
.menu-item {
  display: flex;
  align-items: center;
  gap: 0;
  height: 30px;
  padding: 8px;
  border-radius: 2px;
  font-size: 14px;
  color: #36383b;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 80ms;
  box-sizing: border-box;
  user-select: none;
  width: 100%;
}
.menu-item:hover:not(.menu-item--disabled)  { background: #f1f1f2; }
.menu-item--icon  { gap: 12px; }
.menu-item--danger { color: #b91c1c; }
.menu-item--disabled { color: var(--grey-40); cursor: not-allowed; }

.menu-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #5d6065;
}
.menu-item--danger .menu-item__icon { color: #b91c1c; }

.menu-divider {
  height: 1px;
  background: var(--grey-10);
  margin: 4px 0;
}
</style>
