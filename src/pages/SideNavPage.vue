<script setup>
import { ref, computed } from 'vue'
import AppButton from '../components/ui/AppButton.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import logoMarkUrl    from '../assets/logo-mark.svg'
import logoWordmarkUrl from '../assets/logo-wordmark.svg'

// ── Demo state ─────────────────────────────────────────────────
const entity       = ref('company')
const access       = ref('external')
const navType      = ref('fixed')
const expandedKeys = ref([])
const activeKey    = ref('fleet')

function toggleExpand(key) {
  const i = expandedKeys.value.indexOf(key)
  if (i === -1) expandedKeys.value.push(key)
  else          expandedKeys.value.splice(i, 1)
}
function isExpanded(k) { return expandedKeys.value.includes(k) }
function activate(item) {
  if (item.children?.length) toggleExpand(item.key)
  else activeKey.value = item.key
}

const ENTITY_OPTIONS = [
  { value: 'root',    label: 'Root',    access: ['internal'] },
  { value: 'partner', label: 'Partner', access: ['external', 'internal'] },
  { value: 'company', label: 'Company', access: ['external', 'internal'] },
  { value: 'user',    label: 'User',    access: ['external'] },
]

function selectEntity(val) {
  entity.value = val
  const opts = ENTITY_OPTIONS.find(e => e.value === val)?.access || ['external']
  if (!opts.includes(access.value)) access.value = opts[0]
  const cfg = NAV_CONFIGS[`${val}:${access.value}`] || NAV_CONFIGS['company:external']
  activeKey.value = cfg.defaultActive
  expandedKeys.value = []
}
function selectAccess(val) {
  access.value = val
  const cfg = NAV_CONFIGS[`${entity.value}:${val}`] || NAV_CONFIGS['company:external']
  activeKey.value = cfg.defaultActive
  expandedKeys.value = []
}

const NAV_CONFIGS = {
  'root:internal': {
    header: 'back-home',
    items: [
      { key: 'overview',     icon: 'placeholder', label: 'Overview' },
      { key: 'devices',      icon: 'devices',     label: 'Devices' },
      { key: 'operations',   icon: 'placeholder', label: 'Operations' },
      { key: 'packages',     icon: 'package',     label: 'Packages' },
      { key: 'system-roles', icon: 'placeholder', label: 'System roles' },
      { key: 'ui-labels',    icon: 'placeholder', label: 'UI Labels' },
    ],
    footer: null,
    defaultActive: 'overview',
  },
  'partner:external': {
    header: 'gsfleet',
    items: [
      { key: 'overview',  icon: 'placeholder', label: 'Overview' },
      { key: 'devices',   icon: 'devices',     label: 'Devices' },
      { key: 'insights',  icon: 'insights',    label: 'Insights' },
      { key: 'settings',  icon: 'settings',    label: 'Settings',
        children: ['Customization', 'General', 'Group management', 'Integrations', 'Users'] },
    ],
    footer: { initials: 'NP', name: 'Nice Partner', code: 'DK12345678' },
    defaultActive: 'overview',
  },
  'partner:internal': {
    header: 'back-home',
    items: [
      { key: 'overview',  icon: 'placeholder', label: 'Overview' },
      { key: 'devices',   icon: 'devices',     label: 'Devices' },
      { key: 'insights',  icon: 'insights',    label: 'Insights' },
      { key: 'settings',  icon: 'settings',    label: 'Settings',
        children: ['Customization', 'General', 'Group management', 'Integrations', 'Users'] },
    ],
    footer: { initials: 'NP', name: 'Nice Partner', code: 'DK12345678', viewing: true },
    defaultActive: 'overview',
  },
  'company:external': {
    header: 'gsfleet',
    items: [
      { key: 'fleet',     icon: 'truck',       label: 'Fleet' },
      { key: 'drivers',   icon: 'user',        label: 'Drivers' },
      { key: 'devices',   icon: 'devices',     label: 'Devices' },
      { key: 'insights',  icon: 'insights',    label: 'Insights' },
      { key: 'settings',  icon: 'settings',    label: 'Settings',
        children: ['Customization', 'General', 'Group management', 'Integrations', 'Users'] },
    ],
    footer: { initials: 'NC', name: 'Nice Company', code: 'DK12345678' },
    defaultActive: 'fleet',
  },
  'company:internal': {
    header: 'back-home',
    items: [
      { key: 'overview',     icon: 'placeholder', label: 'Overview' },
      { key: 'devices',      icon: 'devices',     label: 'Devices' },
      { key: 'roles',        icon: 'placeholder', label: 'Roles' },
      { key: 'permissions',  icon: 'placeholder', label: 'Permissions' },
      { key: 'packages',     icon: 'package',     label: 'Packages' },
    ],
    footer: { initials: 'NC', name: 'Nice Company', code: 'DK12345678', viewing: true },
    defaultActive: 'overview',
  },
  'user:external': {
    header: 'gsfleet',
    items: [
      { key: 'fleet',     icon: 'truck',       label: 'My Fleet' },
      { key: 'drivers',   icon: 'user',        label: 'Drivers' },
      { key: 'settings',  icon: 'settings',    label: 'Settings',
        children: ['Customization', 'General', 'Integrations', 'Users'] },
    ],
    footer: { initials: 'NC', name: 'Nice Company', code: 'DK12345678' },
    defaultActive: 'fleet',
  },
}

const navConfig  = computed(() => NAV_CONFIGS[`${entity.value}:${access.value}`] || NAV_CONFIGS['company:external'])
const accessOpts = computed(() => ENTITY_OPTIONS.find(e => e.value === entity.value)?.access || ['external'])

// ── Static data for non-setup sections ─────────────────────────
const LEVELS = [
  {
    key: 'primary', name: 'Primary',
    desc: 'Top-level sections. Always carry an icon (required for the collapsed state). Clicking navigates if there are no sub-items; clicking toggles expansion when sub-items exist. A chevron appears on the right to signal expandability.',
    rule: 'Icon 16 px · Label · Chevron (if children)',
  },
  {
    key: 'secondary', name: 'Secondary',
    desc: 'Sub-pages under a primary item. Text-only — no icon. Hidden by default; revealed when the parent is expanded. Indented 32 px from the primary item left edge.',
    rule: 'No icon · Indent 32 px · Label only',
  },
  {
    key: 'tertiary', name: 'Tertiary',
    desc: 'Deepest navigational level. Further indented, text-only. Use sparingly — avoid deep nesting where possible.',
    rule: 'No icon · Further indent · Label only',
  },
]

const STATES = [
  { label: 'Default',  icon: 'truck',    itemLabel: 'Fleet' },
  { label: 'Hover',    icon: 'user',     itemLabel: 'Drivers',  forcedState: 'hover' },
  { label: 'Selected', icon: 'devices',  itemLabel: 'Devices',  selected: true },
  { label: 'Disabled', icon: 'insights', itemLabel: 'Insights', disabled: true },
  {
    label: 'Expanded',  icon: 'settings', itemLabel: 'Settings',
    showChevUp: true,
    subs: ['Customization', 'General', 'Group management', 'Integrations', 'Users'], activeSub: 'General',
  },
]

const TOKENS = [
  { token: '--color-surface-default', swatch: '#ffffff',  value: '#ffffff',   usage: 'Navigation background' },
  { token: '--color-border-default',  swatch: '#e6e6e7',  value: '--grey-20', usage: 'Right border · Footer top border' },
  { token: '--blue-azure-10',         swatch: '#e8f6ff',  value: '#e8f6ff',   usage: 'Active item background' },
  { token: '--blue-azure-50',         swatch: '#39ade3',  value: '#39ade3',   usage: 'Active item left indicator (2 px)' },
  { token: '--grey-100',              swatch: '#1f2124',  value: '#1f2124',   usage: 'Active item text · Entity name' },
  { token: '--grey-80',               swatch: '#5d6065',  value: '#5d6065',   usage: 'Default item text' },
  { token: '--grey-60',               swatch: '#9c9ea3',  value: '#9c9ea3',   usage: 'Icon color · "manager" text · Code text' },
  { token: '--grey-10',               swatch: '#f1f1f2',  value: '#f1f1f2',   usage: 'Item hover background' },
  { token: '--grey-20',               swatch: '#e6e6e7',  value: '#e6e6e7',   usage: 'Avatar background' },
  { token: '--grey-05',               swatch: '#f7f7f8',  value: '#f7f7f8',   usage: 'Footer background' },
  { token: '—',   swatch: null, value: '230 px / 64 px', usage: 'Width: fixed / collapsed' },
  { token: '—',   swatch: null, value: '56 px',           usage: 'Header height' },
  { token: '—',   swatch: null, value: '36 px',           usage: 'Primary item height' },
  { token: '—',   swatch: null, value: '32 px',           usage: 'Sub-item height' },
  { token: '--btn-radius', swatch: null, value: '4 px',   usage: 'Item border-radius' },
]
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Side navigation</h1>
      <div class="snp-chips">
        <span class="snp-chip">entity</span>
        <span class="snp-chip">type</span>
        <span class="snp-chip">menu item</span>
        <span class="snp-chip">access</span>
      </div>
      <p class="ds-body ds-body--wide">
        Hierarchical vertical navigation anchored to the left side of the screen. Always visible,
        collapsible to icon-only, and scoped to the current entity and user access level.
        Keeps primary navigation accessible while letting the content area take full focus.
      </p>
    </section>

    <!-- ── Component Usage ─────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component Usage</h2>
      <p class="ds-body">Select entity and access to see the correct scope. Toggle fixed / collapsed layout.</p>

      <div class="snp-controls">
        <div class="snp-control-group">
          <span class="snp-control-label">Entity</span>
          <div class="snp-tab-group">
            <button v-for="e in ENTITY_OPTIONS" :key="e.value"
              :class="['snp-tab', { 'snp-tab--active': entity === e.value }]"
              @click="selectEntity(e.value)">{{ e.label }}</button>
          </div>
        </div>
        <div class="snp-control-group" v-if="accessOpts.length > 1">
          <span class="snp-control-label">Access</span>
          <div class="snp-tab-group">
            <button v-for="a in accessOpts" :key="a"
              :class="['snp-tab', { 'snp-tab--active': access === a }]"
              @click="selectAccess(a)">{{ a === 'external' ? 'External' : 'Internal' }}</button>
          </div>
        </div>
        <div class="snp-control-group">
          <span class="snp-control-label">Type</span>
          <div class="snp-tab-group">
            <button :class="['snp-tab', { 'snp-tab--active': navType === 'fixed' }]"     @click="navType = 'fixed'">Fixed</button>
            <button :class="['snp-tab', { 'snp-tab--active': navType === 'collapsed' }]" @click="navType = 'collapsed'">Collapsed</button>
          </div>
        </div>
      </div>

      <div class="snp-demo-wrap">

        <!-- Side nav -->
        <nav :class="['snp-nav', { 'snp-nav--collapsed': navType === 'collapsed' }]">

          <!-- Header -->
          <div class="snp-nav-header">
            <template v-if="navType === 'collapsed'">
              <div class="snp-logo-mark-center" @click="navType = 'fixed'" title="Expand">
                <img :src="logoMarkUrl" width="36" height="36" alt="GSFleet" />
              </div>
            </template>
            <template v-else>
              <div class="snp-header-left">
                <template v-if="navConfig.header === 'back-home'">
                  <AppIcon name="home" :size="14" class="snp-icon-home" />
                  <span class="snp-back-label">Back home</span>
                </template>
                <template v-else>
                  <img :src="logoWordmarkUrl" height="18" alt="GSFleet" class="snp-wordmark-img" />
                </template>
              </div>
              <button class="snp-collapse-btn" @click="navType = 'collapsed'" title="Collapse">
                <AppIcon name="chevron-double-left" :size="14" />
              </button>
            </template>
          </div>

          <!-- Body -->
          <div class="snp-nav-body">
            <template v-for="item in navConfig.items" :key="item.key">
              <AppButton
                variant="quiet"
                :size="navType === 'collapsed' ? 'md' : 'sm'"
                class="snp-item"
                :class="{
                  'snp-item--selected': !item.children && activeKey === item.key,
                  'snp-item--expanded': item.children && isExpanded(item.key),
                }"
                @click="activate(item)"
                :title="navType === 'collapsed' ? item.label : undefined"
              >
                <template #icon-left><AppIcon :name="item.icon" :size="16" /></template>
                <template v-if="navType !== 'collapsed'">{{ item.label }}</template>
                <template v-if="item.children && navType !== 'collapsed'" #icon-right>
                  <AppIcon :name="isExpanded(item.key) ? 'chevron-up' : 'chevron-down'" :size="12" />
                </template>
              </AppButton>
              <template v-if="item.children && isExpanded(item.key) && navType !== 'collapsed'">
                <AppButton
                  v-for="sub in item.children" :key="sub"
                  variant="quiet"
                  size="xs"
                  class="snp-subitem"
                  :class="{ 'snp-subitem--selected': activeKey === `${item.key}:${sub}` }"
                  @click="activeKey = `${item.key}:${sub}`"
                >{{ sub }}</AppButton>
              </template>
            </template>
          </div>

          <!-- Footer -->
          <div v-if="navConfig.footer" class="snp-nav-footer">
            <div v-if="navConfig.footer.viewing && navType !== 'collapsed'" class="snp-viewing-label">Viewing</div>
            <div class="snp-footer-row">
              <div class="snp-avatar">{{ navConfig.footer.initials }}</div>
              <div v-if="navType !== 'collapsed'" class="snp-entity-info">
                <span class="snp-entity-name">{{ navConfig.footer.name }}</span>
                <span class="snp-entity-code">{{ navConfig.footer.code }}</span>
              </div>
            </div>
          </div>
        </nav>

        <!-- Content placeholder -->
        <div class="snp-demo-content">
          <div class="snp-demo-topbar" />
          <div class="snp-demo-body">
            <span class="snp-demo-placeholder">Content area</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Types & Variants ─────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Types & Variants</h2>
      <p class="ds-body">Four variant dimensions control what the nav looks like and what it contains.</p>

      <div class="snp-dim-table">
        <div class="snp-dim-row snp-dim-row--head">
          <span>Dimension</span><span>Values</span><span>Notes</span>
        </div>
        <div class="snp-dim-row">
          <code>entity</code>
          <div class="snp-pills">
            <span v-for="v in ['any','root','partner','company','company-view','user']" :key="v" class="snp-pill">{{ v }}</span>
          </div>
          <span>Controls which nav items appear and which header/footer is shown.</span>
        </div>
        <div class="snp-dim-row">
          <code>type</code>
          <div class="snp-pills">
            <span class="snp-pill">fixed</span><span class="snp-pill">collapsed</span>
          </div>
          <span><strong>Fixed</strong> 230 px — labels visible. <strong>Collapsed</strong> 64 px — icon-only strip. State persists per user.</span>
        </div>
        <div class="snp-dim-row">
          <code>menu item</code>
          <div class="snp-pills">
            <span class="snp-pill">collapsed</span><span class="snp-pill">expanded</span>
          </div>
          <span>Whether a primary item with children is currently expanded. Only primary items expand.</span>
        </div>
        <div class="snp-dim-row">
          <code>access</code>
          <div class="snp-pills">
            <span class="snp-pill">external</span><span class="snp-pill">internal</span>
          </div>
          <span><strong>External</strong> — fleet managers, admins, drivers. <strong>Internal</strong> — sys-admin, god-admin. Determines the header type.</span>
        </div>
      </div>

      <p class="ds-body">Valid entity + access combinations, their header type, and footer content:</p>
      <div class="snp-matrix">
        <div class="snp-matrix-head">
          <span>Entity</span>
          <span>Access</span>
          <span>Header</span>
          <span>Footer</span>
        </div>
        <div class="snp-matrix-row">
          <strong>Root</strong>
          <span class="snp-abadge snp-abadge--int">internal only</span>
          <span class="snp-mono">Back home</span>
          <span>None</span>
        </div>
        <div class="snp-matrix-row">
          <strong>Partner</strong>
          <span class="snp-abadge snp-abadge--both">ext · int</span>
          <span class="snp-mono">logo / back home</span>
          <span>Entity name + code</span>
        </div>
        <div class="snp-matrix-row">
          <strong>Company</strong>
          <span class="snp-abadge snp-abadge--both">ext · int</span>
          <span class="snp-mono">logo / back home</span>
          <span>Entity name + code · Viewing label (int)</span>
        </div>
        <div class="snp-matrix-row">
          <strong>User</strong>
          <span class="snp-abadge snp-abadge--ext">external only</span>
          <span class="snp-mono">GSFleet logo</span>
          <span>Entity name + code</span>
        </div>
      </div>

      <p class="ds-body">Navigation items per entity + access combination:</p>
      <div class="snp-items-grid">
        <div v-for="(cfg, key) in NAV_CONFIGS" :key="key" class="snp-items-card">
          <div class="snp-items-card__head">
            <code class="snp-items-card__entity">{{ key.split(':')[0] }}</code>
            <span :class="['snp-abadge', key.split(':')[1] === 'external' ? 'snp-abadge--ext' : 'snp-abadge--int']">
              {{ key.split(':')[1] }}
            </span>
          </div>
          <div class="snp-items-card__hdr">
            <template v-if="cfg.header === 'back-home'">
              <AppIcon name="home" :size="12" />
              <span>Back home</span>
            </template>
            <template v-else>
              <img :src="logoMarkUrl" width="14" height="14" alt="GSFleet" style="border-radius:2px" />
              <span>GSFleet logo</span>
            </template>
          </div>
          <ul class="snp-items-card__list">
            <li v-for="item in cfg.items" :key="item.key" class="snp-items-card__item">
              <AppIcon :name="item.icon" :size="12" class="snp-items-card__icon" />
              <span>{{ item.label }}</span>
              <span v-if="item.children" class="snp-sub-count"> +{{ item.children.length }}</span>
            </li>
          </ul>
          <div class="snp-items-card__foot" :class="{ 'snp-items-card__foot--none': !cfg.footer }">
            <template v-if="cfg.footer">
              <div class="snp-avatar snp-avatar--xs">{{ cfg.footer.initials }}</div>
              <span>{{ cfg.footer.name }}</span>
              <span v-if="cfg.footer.viewing" class="snp-viewing-chip">Viewing</span>
            </template>
            <template v-else><span>No footer</span></template>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Formatting ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">The nav is composed of three stacked regions: header (fixed), body (scrollable, grows), footer (pinned).</p>

      <div class="snp-anatomy">
        <div class="snp-anatomy-nav">
          <div class="snp-anatomy-region snp-anatomy-region--header">
            <span class="snp-anatomy-tag">SideNavHeader</span>
            <span class="snp-anatomy-hint">Logo · Back home · Toggle<br>56 px tall</span>
          </div>
          <div class="snp-anatomy-region snp-anatomy-region--body">
            <span class="snp-anatomy-tag">SideNavBody</span>
            <span class="snp-anatomy-hint">Primary items · Subitems<br>flex: 1 · overflow-y: auto</span>
          </div>
          <div class="snp-anatomy-region snp-anatomy-region--footer">
            <span class="snp-anatomy-tag">SideNavFooter</span>
            <span class="snp-anatomy-hint">Avatar · Entity name · Code<br>78–85 px tall</span>
          </div>
        </div>

        <div class="snp-anatomy-detail">
          <div class="snp-spec-block">
            <div class="snp-spec-title">Dimensions</div>
            <div class="snp-spec-row"><span>Fixed width</span><code>230 px</code></div>
            <div class="snp-spec-row"><span>Collapsed width</span><code>64 px</code></div>
            <div class="snp-spec-row"><span>Header height</span><code>56 px</code></div>
            <div class="snp-spec-row"><span>Primary item height</span><code>36 px</code></div>
            <div class="snp-spec-row"><span>Sub-item height</span><code>32 px</code></div>
            <div class="snp-spec-row"><span>Item border-radius</span><code>4 px</code></div>
            <div class="snp-spec-row"><span>Body padding (H)</span><code>8 px</code></div>
            <div class="snp-spec-row"><span>Sub-item indent</span><code>32 px</code></div>
            <div class="snp-spec-row"><span>Active left indicator</span><code>2 px</code></div>
          </div>
          <div class="snp-spec-block">
            <div class="snp-spec-title">Header variants</div>
            <div class="snp-header-exs">
              <div class="snp-header-ex">
                <div class="snp-header-preview">
                  <img :src="logoWordmarkUrl" height="16" alt="GSFleet" style="max-width:140px" />
                  <span class="snp-icon-muted" style="margin-left:auto">
                    <AppIcon name="chevron-double-left" :size="13" />
                  </span>
                </div>
                <span class="snp-spec-sub">External (GSFleet logo)</span>
              </div>
              <div class="snp-header-ex">
                <div class="snp-header-preview">
                  <AppIcon name="home" :size="14" class="snp-icon-home" />
                  <span class="snp-back-label" style="margin-left:8px">Back home</span>
                  <span class="snp-icon-muted" style="margin-left:auto">
                    <AppIcon name="chevron-double-left" :size="13" />
                  </span>
                </div>
                <span class="snp-spec-sub">Internal (viewing child entity)</span>
              </div>
            </div>
          </div>
          <div class="snp-spec-block">
            <div class="snp-spec-title">Footer variants</div>
            <div class="snp-footer-exs">
              <div class="snp-footer-ex">
                <div class="snp-footer-preview">
                  <div class="snp-avatar">NC</div>
                  <div class="snp-entity-info">
                    <span class="snp-entity-name">Nice Company</span>
                    <span class="snp-entity-code">DK12345678</span>
                  </div>
                </div>
                <span class="snp-spec-sub">type=entity</span>
              </div>
              <div class="snp-footer-ex">
                <div class="snp-footer-preview" style="flex-direction:column;align-items:flex-start;gap:4px">
                  <div class="snp-viewing-label" style="position:static">Viewing</div>
                  <div class="snp-footer-row">
                    <div class="snp-avatar">NC</div>
                    <div class="snp-entity-info">
                      <span class="snp-entity-name">Nice Company</span>
                      <span class="snp-entity-code">DK12345678</span>
                    </div>
                  </div>
                </div>
                <span class="snp-spec-sub">type=viewing entity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="snp-levels">
        <div v-for="lv in LEVELS" :key="lv.key" class="snp-level-row">
          <span :class="['snp-level-badge', `snp-level-badge--${lv.key}`]">{{ lv.name }}</span>
          <div class="snp-level-detail">
            <p>{{ lv.desc }}</p>
            <code class="snp-level-rule">{{ lv.rule }}</code>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Interaction & States ─────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction & States</h2>
      <p class="ds-body">Navigation items respond to pointer interaction. The active page is always clearly highlighted via a background tint and a 2 px left indicator.</p>

      <div class="snp-states-grid">
        <div v-for="st in STATES" :key="st.label" class="snp-state-demo">
          <div class="snp-state-nav">
            <AppButton
              variant="quiet"
              size="sm"
              class="snp-item"
              :class="{ 'snp-item--selected': st.selected, 'snp-item--expanded': st.showChevUp }"
              :forcedState="st.forcedState ?? null"
              :disabled="!!st.disabled"
              style="cursor:default; pointer-events:none;"
            >
              <template #icon-left><AppIcon :name="st.icon" :size="16" /></template>
              {{ st.itemLabel }}
              <template v-if="st.showChevUp" #icon-right>
                <AppIcon name="chevron-up" :size="12" />
              </template>
            </AppButton>
            <template v-if="st.subs">
              <AppButton
                v-for="s in st.subs" :key="s"
                variant="quiet"
                size="xs"
                class="snp-subitem"
                :class="{ 'snp-subitem--selected': st.activeSub === s }"
                style="cursor:default; pointer-events:none;"
              >{{ s }}</AppButton>
            </template>
          </div>
          <span class="snp-state-label">{{ st.label }}</span>
        </div>
      </div>
    </section>

    <!-- ── Usage ────────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="snp-usage-cols">
        <div class="snp-usage-card snp-usage-card--do">
          <span class="snp-usage-badge snp-usage-badge--do">Do</span>
          <ul class="snp-usage-list">
            <li>Include an icon for every primary-level item — required when collapsed.</li>
            <li>Keep primary labels short (1–2 words). Shorten the copy if it would truncate.</li>
            <li>Show "Back home" header when internal users are viewing a child entity.</li>
            <li>Auto-expand a primary group if it has only one sub-item.</li>
            <li>Show entity name and code in SideNavFooter for all entities that have one.</li>
            <li>Add the "Viewing" label when an internal admin is viewing another entity's nav.</li>
            <li>Order items by frequency — most-used sections first, Settings last.</li>
            <li>Add <code>aria-current="page"</code> to the active item for screen readers.</li>
          </ul>
        </div>
        <div class="snp-usage-card snp-usage-card--dont">
          <span class="snp-usage-badge snp-usage-badge--dont">Don't</span>
          <ul class="snp-usage-list">
            <li>Don't add icons to sub-items — secondary and tertiary levels are text-only.</li>
            <li>Don't hide temporarily unavailable items — show them as disabled instead.</li>
            <li>Don't place actions (delete, export) in the nav — it is navigation only.</li>
            <li>Don't show "Back home" for external users — always use the GSFleet logo header.</li>
            <li>Don't nest beyond two levels. If you need a third, reconsider the IA.</li>
            <li>Don't allow multiple expanded groups if the nav body would overflow.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Token Reference ──────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <div class="snp-token-table">
        <div class="snp-token-row snp-token-row--head">
          <span>Token</span><span></span><span>Value</span><span>Usage</span>
        </div>
        <div v-for="tok in TOKENS" :key="tok.token" class="snp-token-row">
          <code>{{ tok.token }}</code>
          <div class="snp-swatch" :style="tok.swatch ? `background:${tok.swatch}` : ''"
            :class="{ 'snp-swatch--none': !tok.swatch }" />
          <code>{{ tok.value }}</code>
          <span>{{ tok.usage }}</span>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────── */
.ds-main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 40px 96px;
  display: flex;
  flex-direction: column;
  gap: 64px;
  font-family: 'Inter', sans-serif;
}
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1  { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2  { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-body { font-size: 14px; color: var(--grey-70); line-height: 1.7; max-width: 640px; }
.ds-body--wide { max-width: 820px; }

code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  background: var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-90);
}

/* ── Chips ───────────────────────────────────────────────────── */
.snp-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.snp-chip {
  font-size: 11px; font-weight: 500; padding: 3px 10px;
  border-radius: 100px; background: var(--grey-10); color: var(--grey-70);
  font-family: 'Fira Code', monospace;
}

/* ── Controls ────────────────────────────────────────────────── */
.snp-controls { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end; }
.snp-control-group { display: flex; flex-direction: column; gap: 6px; }
.snp-control-label { font-size: 11px; font-weight: 600; color: var(--grey-60); text-transform: uppercase; letter-spacing: .05em; }
.snp-tab-group { display: flex; box-shadow: inset 0 0 0 1px var(--grey-20); border-radius: 6px; overflow: hidden; }
.snp-tab {
  height: 32px; padding: 0 14px; font-size: 13px; font-family: 'Inter', sans-serif;
  font-weight: 400; color: var(--grey-70); background: transparent; border: none;
  cursor: pointer; transition: background 80ms, color 80ms; white-space: nowrap;
}
.snp-tab:hover { background: var(--grey-05); }
.snp-tab--active { background: var(--grey-10); color: var(--grey-100); font-weight: 500; }

/* ── Demo ────────────────────────────────────────────────────── */
.snp-demo-wrap {
  display: flex;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.08), 0 0 0 1px var(--grey-20);
}

/* Side nav (LIGHT THEME) */
.snp-nav {
  width: 230px;
  flex-shrink: 0;
  background: var(--color-surface-default);
  display: flex;
  flex-direction: column;
  box-shadow: inset -1px 0 0 var(--color-border-default);
  transition: width 200ms cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
.snp-nav--collapsed { width: 64px; }

/* Header */
.snp-nav-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 14px;
  flex-shrink: 0;
  box-shadow: inset 0 -1px 0 var(--color-border-default);
  gap: 8px;
}
.snp-header-left {
  display: flex; align-items: center; gap: 8px;
  min-width: 0; overflow: hidden; flex: 1;
}
.snp-logo-mark-center {
  display: flex; align-items: center; justify-content: center; flex: 1;
}
.snp-nav--collapsed .snp-nav-header { padding: 0; cursor: pointer; }
.snp-nav--collapsed .snp-logo-mark-center { width: 100%; height: 100%; }
.snp-wordmark-img {
  width: auto;
  height: 18px;
  object-fit: contain;
  object-position: left center;
  flex-shrink: 0;
  max-width: 150px;
}

.snp-back-label { font-size: 13px; font-weight: 500; color: var(--grey-80); white-space: nowrap; }
.snp-icon-home { color: var(--grey-70); display: flex; align-items: center; flex-shrink: 0; }
.snp-icon-muted { display: flex; align-items: center; color: var(--grey-60); }

.snp-collapse-btn {
  width: 24px; height: 24px; flex-shrink: 0;
  background: transparent; border: none; border-radius: 4px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--grey-60);
  transition: background 80ms, color 80ms;
  padding: 0;
}
.snp-collapse-btn:hover { background: var(--grey-10); color: var(--grey-90); }

/* Body */
.snp-nav-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.snp-nav-body::-webkit-scrollbar { width: 4px; }
.snp-nav-body::-webkit-scrollbar-thumb { background: var(--grey-30); border-radius: 2px; }

/* Primary items — AppButton quiet override for nav context */
.snp-item {
  width: 100% !important;
  justify-content: flex-start !important;
  border-radius: 4px !important;
  flex-shrink: 0;
}
.snp-item :deep(.btn__label) {
  flex: 1 !important;
  text-align: left !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px !important;
  font-weight: 400 !important;
  color: var(--grey-80) !important;
}
.snp-item :deep(.btn__icon--left) { color: var(--grey-60) !important; }
.snp-item :deep(.btn__icon--right) { color: var(--grey-50) !important; }

/* Selected state */
.snp-item--selected {
  background-color: var(--blue-azure-10) !important;
}
.snp-item--selected :deep(.btn__label) {
  color: var(--grey-100) !important;
  font-weight: 500 !important;
}
.snp-item--selected :deep(.btn__icon--left) { color: var(--grey-90) !important; }

/* Collapsed — icon-only, 40×40, centered */
.snp-nav--collapsed .snp-item {
  width: 40px !important;
  margin: 0 auto !important;
}

/* Subitems — AppButton quiet xs override */
.snp-subitem {
  width: 100% !important;
  justify-content: flex-start !important;
  border-radius: 4px !important;
  padding-left: 32px !important;
  flex-shrink: 0;
}
.snp-subitem :deep(.btn__label) {
  text-align: left !important;
  font-size: 13px !important;
  color: var(--grey-70) !important;
}
.snp-subitem--selected :deep(.btn__label) {
  color: var(--grey-100) !important;
  font-weight: 500 !important;
}

/* Footer */
.snp-nav-footer {
  flex-shrink: 0;
  background: var(--grey-05);
  box-shadow: inset 0 1px 0 var(--color-border-default);
  padding: 12px;
}
.snp-viewing-label {
  font-size: 11px; color: var(--grey-60); margin-bottom: 6px;
}
.snp-footer-row { display: flex; align-items: center; gap: 10px; min-width: 0; overflow: hidden; }
.snp-avatar {
  width: 32px; height: 32px; border-radius: 4px;
  background: var(--grey-20); color: var(--grey-70);
  font-size: 11px; font-weight: 600;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.snp-avatar--xs { width: 22px; height: 22px; font-size: 9px; }
.snp-entity-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.snp-entity-name { font-size: 13px; font-weight: 600; color: var(--grey-100); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.snp-entity-code { font-size: 11px; color: var(--grey-60); }

/* Content area */
.snp-demo-content { flex: 1; display: flex; flex-direction: column; background: var(--grey-05); min-width: 0; }
.snp-demo-topbar  { height: 56px; background: var(--grey-00); box-shadow: inset 0 -1px 0 var(--grey-20); flex-shrink: 0; }
.snp-demo-body    { flex: 1; display: flex; align-items: center; justify-content: center; }
.snp-demo-placeholder { font-size: 13px; color: var(--grey-40); border: 1px dashed var(--grey-30); border-radius: 8px; padding: 28px 40px; }

/* ── Dimension table ─────────────────────────────────────────── */
.snp-dim-table { border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.snp-dim-row {
  display: grid; grid-template-columns: 130px 1fr 1.8fr;
  align-items: start; gap: 16px; padding: 12px 16px;
  border-bottom: 1px solid var(--grey-10); font-size: 13px; color: var(--grey-70);
}
.snp-dim-row:last-child { border-bottom: none; }
.snp-dim-row--head {
  font-size: 11px; font-weight: 600; color: var(--grey-50);
  text-transform: uppercase; letter-spacing: .06em; background: var(--grey-05);
}
.snp-pills { display: flex; flex-wrap: wrap; gap: 4px; }
.snp-pill {
  font-size: 11px; font-weight: 500; padding: 2px 8px;
  background: var(--grey-10); color: var(--grey-70); border-radius: 100px;
  font-family: 'Fira Code', monospace;
}

/* ── Matrix ──────────────────────────────────────────────────── */
.snp-matrix { border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.snp-matrix-head, .snp-matrix-row {
  display: grid; grid-template-columns: 1fr 1fr 1.3fr 1.6fr;
  gap: 8px; padding: 10px 16px;
  border-bottom: 1px solid var(--grey-10); align-items: center; font-size: 13px;
}
.snp-matrix-row:last-child { border-bottom: none; }
.snp-matrix-head { font-size: 11px; font-weight: 600; color: var(--grey-50); text-transform: uppercase; letter-spacing: .06em; background: var(--grey-05); }
.snp-matrix-row  { color: var(--grey-70); }
.snp-matrix-row strong { color: var(--grey-90); }

.snp-abadge {
  font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 100px;
  white-space: nowrap; display: inline-block;
}
.snp-abadge--ext  { background: var(--blue-azure-10); color: var(--blue-azure-70); }
.snp-abadge--int  { background: var(--indigo-10); color: var(--indigo-80); }
.snp-abadge--both { background: var(--grey-10); color: var(--grey-70); }
.snp-mono { font-family: 'Fira Code', monospace; font-size: 11px; color: var(--grey-80); }

/* ── Items grid ──────────────────────────────────────────────── */
.snp-items-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.snp-items-card { border: 1px solid var(--grey-20); border-radius: 8px; background: var(--grey-00); overflow: hidden; }
.snp-items-card__head {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 12px 8px; border-bottom: 1px solid var(--grey-10);
}
.snp-items-card__entity { font-size: 13px; font-weight: 600; }
.snp-items-card__hdr {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 12px; font-size: 11px; color: var(--grey-60);
  border-bottom: 1px solid var(--grey-10);
}
.snp-items-card__list {
  padding: 6px 12px 8px 12px; margin: 0;
  list-style: none; font-size: 12px; color: var(--grey-70);
  display: flex; flex-direction: column; gap: 2px;
}
.snp-items-card__item {
  display: flex; align-items: center; gap: 5px;
}
.snp-items-card__icon { color: var(--grey-50); flex-shrink: 0; display: flex; align-items: center; }
.snp-sub-count { font-size: 10px; color: var(--grey-50); }
.snp-items-card__foot {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-top: 1px solid var(--grey-10);
  background: var(--grey-05); font-size: 12px; color: var(--grey-70);
}
.snp-items-card__foot--none { font-style: italic; color: var(--grey-50); }
.snp-viewing-chip {
  font-size: 10px; font-weight: 600; padding: 1px 6px;
  border-radius: 100px; background: var(--indigo-10); color: var(--indigo-80);
  margin-left: auto;
}

/* ── Anatomy ─────────────────────────────────────────────────── */
.snp-anatomy { display: grid; grid-template-columns: 160px 1fr; gap: 32px; align-items: start; }
.snp-anatomy-nav {
  display: flex; flex-direction: column;
  border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden;
}
.snp-anatomy-region {
  display: flex; flex-direction: column; gap: 4px;
  padding: 10px 12px; border-bottom: 1px solid var(--grey-20);
  position: relative; background: var(--grey-00);
}
.snp-anatomy-region::before {
  content: '';
  position: absolute; top: 0; left: 0; bottom: 0; width: 3px;
  background: var(--blue-azure-50);
}
.snp-anatomy-region--header { min-height: 48px; }
.snp-anatomy-region--body   { min-height: 90px; flex: 1; }
.snp-anatomy-region--footer { border-bottom: none; min-height: 48px; }
.snp-anatomy-tag  { font-size: 10px; font-weight: 600; color: var(--blue-azure-60); font-family: 'Fira Code', monospace; }
.snp-anatomy-hint { font-size: 10px; color: var(--grey-60); line-height: 1.5; }

.snp-anatomy-detail { display: flex; flex-direction: column; gap: 20px; }
.snp-spec-block { display: flex; flex-direction: column; gap: 0; }
.snp-spec-title { font-size: 11px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 6px; }
.snp-spec-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--grey-70); padding: 4px 0; border-bottom: 1px solid var(--grey-10); }
.snp-spec-sub { font-size: 11px; color: var(--grey-60); }

.snp-header-exs, .snp-footer-exs { display: flex; flex-direction: column; gap: 8px; }
.snp-header-ex, .snp-footer-ex { display: flex; flex-direction: column; gap: 4px; }
.snp-header-preview {
  display: flex; align-items: center;
  padding: 7px 12px; border: 1px solid var(--grey-20); border-radius: 6px;
  background: var(--grey-00); font-size: 13px;
}
.snp-footer-preview {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; border: 1px solid var(--grey-20); border-radius: 6px;
  background: var(--grey-05);
}

/* ── Level table ─────────────────────────────────────────────── */
.snp-levels { border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.snp-level-row {
  display: flex; gap: 16px; align-items: flex-start;
  padding: 14px 16px; border-bottom: 1px solid var(--grey-10);
}
.snp-level-row:last-child { border-bottom: none; }
.snp-level-badge {
  font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
  white-space: nowrap; flex-shrink: 0; margin-top: 2px;
}
.snp-level-badge--primary   { background: var(--blue-azure-10); color: var(--blue-azure-70); }
.snp-level-badge--secondary { background: var(--grey-10); color: var(--grey-70); }
.snp-level-badge--tertiary  { background: var(--grey-05); color: var(--grey-60); }
.snp-level-detail { flex: 1; }
.snp-level-detail p { font-size: 13px; color: var(--grey-70); line-height: 1.6; margin: 0 0 6px; }
.snp-level-rule { display: inline-block; font-size: 11px; }

/* ── States ──────────────────────────────────────────────────── */
.snp-states-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
.snp-state-demo { display: flex; flex-direction: column; align-items: stretch; gap: 8px; }
.snp-state-nav {
  background: var(--grey-00);
  border: 1px solid var(--grey-20); border-radius: 6px;
  padding: 6px; display: flex; flex-direction: column; gap: 1px;
}
.snp-state-label { font-size: 11px; color: var(--grey-50); font-weight: 500; text-align: center; text-transform: uppercase; letter-spacing: .05em; }

/* ── Usage ───────────────────────────────────────────────────── */
.snp-usage-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.snp-usage-card { padding: 20px 22px; border-radius: 8px; border: 1px solid var(--grey-20); background: var(--grey-00); }
.snp-usage-badge {
  display: inline-block; font-size: 11px; font-weight: 700;
  padding: 3px 10px; border-radius: 100px;
  text-transform: uppercase; letter-spacing: .04em; margin-bottom: 12px;
}
.snp-usage-badge--do   { background: var(--green-10); color: var(--green-90); }
.snp-usage-badge--dont { background: var(--red-10); color: var(--red-80); }
.snp-usage-list { margin: 0; padding: 0 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
.snp-usage-list li { font-size: 13px; color: var(--grey-70); line-height: 1.55; }

/* ── Token table ─────────────────────────────────────────────── */
.snp-token-table { border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; background: var(--grey-00); }
.snp-token-row {
  display: grid; grid-template-columns: 2fr 24px 110px 1fr;
  align-items: center; gap: 12px; padding: 10px 16px;
  border-bottom: 1px solid var(--grey-10); font-size: 13px; color: var(--grey-70);
}
.snp-token-row:last-child { border-bottom: none; }
.snp-token-row--head {
  font-size: 11px; font-weight: 600; color: var(--grey-50);
  text-transform: uppercase; letter-spacing: .06em; background: var(--grey-05);
}
.snp-swatch { width: 20px; height: 20px; border-radius: 4px; border: 1px solid rgba(0,0,0,.08); flex-shrink: 0; }
.snp-swatch--none { background: transparent !important; border-color: transparent; }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ds-main { padding: 32px 20px 64px; }
  .snp-items-grid { grid-template-columns: 1fr 1fr; }
  .snp-states-grid { grid-template-columns: repeat(3, 1fr); }
  .snp-anatomy { grid-template-columns: 1fr; }
  .snp-usage-cols { grid-template-columns: 1fr; }
  .snp-dim-row { grid-template-columns: 1fr; }
  .snp-matrix-head, .snp-matrix-row { grid-template-columns: 1fr 1fr; }
  .snp-matrix-head > *:nth-child(n+3), .snp-matrix-row > *:nth-child(n+3) { display: none; }
}
</style>
