<script setup>
/**
 * AppSideNavigation — GSFleet Design System
 * Hierarchical vertical navigation anchored to the left side of the screen.
 * Supports fixed (230 px) and collapsed (64 px, icon-only) layouts.
 *
 * Figma: w6mC7PaMgtX4fbmagiDtAq · DS GSFleet library · SideNavig / sidenavig/header / sidenavig/footer
 *
 * @prop {Array}   items        - Nav items: [{ key: string, icon: string, label: string, children?: string[] }]
 * @prop {string}  [modelValue] - Active item key (v-model); sub-items use "parentKey:subLabel"
 * @prop {string}  [type]       - 'fixed' (default) | 'collapsed'  (v-model:type)
 * @prop {string}  [headerType] - 'gsfleet' (default, external) | 'back-home' (internal)
 * @prop {Object}  [footer]     - { initials: string, name: string, code: string, viewing?: boolean } | null
 *
 * Emits:
 *   update:modelValue — string — newly selected item key
 *   update:type       — 'fixed' | 'collapsed' — when user toggles expand/collapse
 *   item-click        — { key: string, item: Object } — every time any item is activated
 */

import { ref, computed, nextTick } from 'vue'
import AppButton from './AppButton.vue'
import AppIcon   from './AppIcon.vue'
import logoMarkUrl     from '../../assets/logo-mark.svg'
import logoWordmarkUrl from '../../assets/logo-wordmark.svg'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'fixed',
    validator: (v) => ['fixed', 'collapsed'].includes(v),
  },
  headerType: {
    type: String,
    default: 'gsfleet',
    validator: (v) => ['gsfleet', 'back-home'].includes(v),
  },
  footer: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'update:type', 'item-click'])

/* ── Internal state ──────────────────────────────────────────── */
const expandedKeys = ref([])

const isCollapsed = computed(() => props.type === 'collapsed')

function isExpanded(key) { return expandedKeys.value.includes(key) }

function toggleExpand(key) {
  const i = expandedKeys.value.indexOf(key)
  if (i === -1) expandedKeys.value.push(key)
  else          expandedKeys.value.splice(i, 1)
}

function activate(item) {
  if (item.children?.length) {
    toggleExpand(item.key)
  } else {
    emit('update:modelValue', item.key)
    emit('item-click', { key: item.key, item })
  }
}

function activateSub(item, sub) {
  const key = `${item.key}:${sub}`
  emit('update:modelValue', key)
  emit('item-click', { key, item: { key, label: sub } })
}

function collapse() { emit('update:type', 'collapsed') }
function expand()   { emit('update:type', 'fixed') }

/* ── Keyboard navigation ─────────────────────────────────────── */
const bodyRef = ref(null)

function onBodyKeydown(e) {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
  e.preventDefault()
  const items = [...bodyRef.value.querySelectorAll('button:not([disabled])')]
  const cur = items.indexOf(document.activeElement)
  if (cur === -1) { items[0]?.focus(); return }
  if (e.key === 'ArrowDown') items[(cur + 1) % items.length]?.focus()
  else items[(cur - 1 + items.length) % items.length]?.focus()
}
</script>

<template>
  <nav
    class="snav"
    :class="{ 'snav--collapsed': isCollapsed }"
    role="navigation"
  >

    <!-- ── Header ──────────────────────────────────────────────── -->
    <div class="snav__header">
      <!-- Collapsed: logo mark with expand-on-hover + click -->
      <template v-if="isCollapsed">
        <button type="button" class="snav__logo-mark" @click="expand" aria-label="Expand navigation">
          <img :src="logoMarkUrl" width="36" height="36" alt="GSFleet" class="snav__logo-default" />
          <div class="snav__logo-hover" aria-hidden="true">
            <AppIcon name="chevron-double-right" :size="16" />
          </div>
        </button>
      </template>

      <!-- Fixed: gsfleet wordmark or back-home + collapse button -->
      <template v-else>
        <div class="snav__header-left">
          <template v-if="headerType === 'back-home'">
            <AppIcon name="home" :size="14" class="snav__icon-home" />
            <span class="snav__back-label">Back home</span>
          </template>
          <template v-else>
            <img :src="logoWordmarkUrl" height="18" alt="GSFleet" class="snav__wordmark" />
          </template>
        </div>
        <button class="snav__collapse-btn" @click="collapse" title="Collapse" aria-label="Collapse navigation" type="button">
          <AppIcon name="chevron-double-left" :size="14" />
        </button>
      </template>
    </div>

    <!-- ── Body ────────────────────────────────────────────────── -->
    <div ref="bodyRef" class="snav__body" @keydown="onBodyKeydown">
      <template v-for="item in items" :key="item.key">

        <!-- Primary item -->
        <AppButton
          variant="quiet"
          :size="isCollapsed ? 'md' : 'sm'"
          class="snav__item"
          :class="{
            'snav__item--selected': !item.children && modelValue === item.key,
            'snav__item--expanded': item.children && isExpanded(item.key),
          }"
          @click="activate(item)"
          :title="isCollapsed ? item.label : undefined"
          :aria-current="(!item.children && modelValue === item.key) ? 'page' : undefined"
        >
          <template #icon-left>
            <AppIcon :name="item.icon" :size="16" />
          </template>
          <template v-if="!isCollapsed">{{ item.label }}</template>
          <template v-if="item.children && !isCollapsed" #icon-right>
            <AppIcon :name="isExpanded(item.key) ? 'chevron-up' : 'chevron-down'" :size="12" />
          </template>
        </AppButton>

        <!-- Sub-items — revealed when parent is expanded -->
        <template v-if="item.children && isExpanded(item.key) && !isCollapsed">
          <AppButton
            v-for="sub in item.children"
            :key="sub"
            variant="quiet"
            size="xs"
            class="snav__subitem"
            :class="{ 'snav__subitem--selected': modelValue === `${item.key}:${sub}` }"
            @click="activateSub(item, sub)"
            :aria-current="modelValue === `${item.key}:${sub}` ? 'page' : undefined"
          >{{ sub }}</AppButton>
        </template>

      </template>
    </div>

    <!-- ── Footer ──────────────────────────────────────────────── -->
    <div v-if="footer" class="snav__footer">
      <div v-if="footer.viewing && !isCollapsed" class="snav__viewing-label">Viewing</div>
      <div class="snav__footer-row">
        <div class="snav__avatar">{{ footer.initials }}</div>
        <div v-if="!isCollapsed" class="snav__entity-info">
          <span class="snav__entity-name">{{ footer.name }}</span>
          <span class="snav__entity-code">{{ footer.code }}</span>
        </div>
      </div>
    </div>

  </nav>
</template>

<style scoped>
/* ── Root ────────────────────────────────────────────────────── */
.snav {
  width: 230px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-default);
  box-shadow: inset -1px 0 0 var(--color-border-default);
  transition: width 200ms cubic-bezier(.4, 0, .2, 1);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}
.snav--collapsed {
  width: 64px;
}

/* ── Header ──────────────────────────────────────────────────── */
.snav__header {
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 14px;
  gap: 8px;
  box-shadow: inset 0 -1px 0 var(--color-border-default);
}

.snav--collapsed .snav__header {
  padding: 0;
  cursor: pointer;
}

/* Logo mark (collapsed header) — is a <button>, reset native styles */
.snav__logo-mark {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.snav__logo-default {
  transition: opacity 120ms;
}

/* Gradient hover overlay — matches logo_icon_hover.svg (brand asset, not a token) */
.snav__logo-hover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: linear-gradient(135deg, #17294F 0%, #39ade3 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 120ms;
}

.snav__logo-mark:hover .snav__logo-default { opacity: 0; }
.snav__logo-mark:hover .snav__logo-hover   { opacity: 1; }

/* Fixed header left zone */
.snav__header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow: hidden;
  flex: 1;
}

.snav__wordmark {
  height: 18px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  object-position: left center;
  flex-shrink: 0;
}

.snav__icon-home {
  color: var(--grey-70);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.snav__back-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--grey-80);
  white-space: nowrap;
}

/* Collapse toggle button */
.snav__collapse-btn {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey-60);
  transition: background 80ms, color 80ms;
}
.snav__collapse-btn:hover {
  background: var(--grey-10);
  color: var(--grey-90);
}

/* ── Body ────────────────────────────────────────────────────── */
.snav__body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.snav__body::-webkit-scrollbar { width: 4px; }
.snav__body::-webkit-scrollbar-thumb {
  background: var(--grey-30);
  border-radius: 2px;
}

/* ── Primary items ───────────────────────────────────────────── */
.snav__item {
  width: 100% !important;
  justify-content: flex-start !important;
  border-radius: 4px !important;
  flex-shrink: 0;
}

.snav__item :deep(.btn__label) {
  flex: 1 !important;
  text-align: left !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px !important;
  font-weight: 400 !important;
  color: var(--grey-80) !important;
}

.snav__item :deep(.btn__icon--left)  { color: var(--grey-60) !important; }
.snav__item :deep(.btn__icon--right) { color: var(--grey-50) !important; }

/* Selected */
.snav__item--selected {
  background-color: var(--blue-azure-10) !important;
}
.snav__item--selected :deep(.btn__label) {
  color: var(--grey-100) !important;
  font-weight: 500 !important;
}
.snav__item--selected :deep(.btn__icon--left) { color: var(--grey-90) !important; }

/* Collapsed: 40×40, centred in the 64px strip */
.snav--collapsed .snav__item {
  width: 40px !important;
  margin: 0 auto !important;
}

/* ── Sub-items ───────────────────────────────────────────────── */
.snav__subitem {
  width: 100% !important;
  justify-content: flex-start !important;
  border-radius: 4px !important;
  padding-left: 32px !important;
  flex-shrink: 0;
}

.snav__subitem :deep(.btn__label) {
  text-align: left !important;
  font-size: 13px !important;
  color: var(--grey-70) !important;
}

.snav__subitem--selected :deep(.btn__label) {
  color: var(--grey-100) !important;
  font-weight: 500 !important;
}

/* ── Footer ──────────────────────────────────────────────────── */
.snav__footer {
  flex-shrink: 0;
  background: var(--grey-05);
  box-shadow: inset 0 1px 0 var(--color-border-default);
  padding: 12px;
}

.snav__viewing-label {
  font-size: 11px;
  color: var(--grey-60);
  margin-bottom: 6px;
}

.snav__footer-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  overflow: hidden;
}

.snav__avatar {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: var(--grey-20);
  color: var(--grey-70);
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.snav__entity-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.snav__entity-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-100);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.snav__entity-code {
  font-size: 11px;
  color: var(--grey-60);
}
</style>
