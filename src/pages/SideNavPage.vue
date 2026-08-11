<script setup>
import { ref, computed } from 'vue'

const collapsed   = ref(false)
const accessType  = ref('external')
const activeItem  = ref('my-vehicles')
const expanded    = ref(['vehicles'])

function toggleExpand(key) {
  const i = expanded.value.indexOf(key)
  if (i === -1) expanded.value.push(key)
  else          expanded.value.splice(i, 1)
}
function isExpanded(key) { return expanded.value.includes(key) }
function activate(key)   { activeItem.value = key }

const NAV_EXTERNAL = [
  { key: 'dashboard', label: 'Dashboard',  icon: 'dashboard' },
  { key: 'vehicles',  label: 'Vehicles',   icon: 'vehicle', children: [
    { key: 'fleet-overview', label: 'Fleet overview' },
    { key: 'my-vehicles',    label: 'My vehicles' },
    { key: 'schedules',      label: 'Schedules' },
  ]},
  { key: 'drivers',   label: 'Drivers',    icon: 'driver', children: [
    { key: 'driver-list',   label: 'Driver list' },
    { key: 'driver-groups', label: 'Driver groups' },
  ]},
  { key: 'reports',   label: 'Reports',    icon: 'report' },
  { key: 'settings',  label: 'Settings',   icon: 'settings', disabled: true },
]

const NAV_INTERNAL = [
  { key: 'customers', label: 'Customers',    icon: 'building' },
  { key: 'users',     label: 'Users',        icon: 'users', children: [
    { key: 'all-users',   label: 'All users' },
    { key: 'user-roles',  label: 'Roles & permissions' },
  ]},
  { key: 'support',   label: 'Support',      icon: 'support' },
  { key: 'config',    label: 'Configuration',icon: 'settings', children: [
    { key: 'integrations', label: 'Integrations' },
    { key: 'audit-log',    label: 'Audit log' },
  ]},
]

const navItems = computed(() => accessType.value === 'external' ? NAV_EXTERNAL : NAV_INTERNAL)

const ICONS = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.25"/><rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.25"/><rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.25"/><rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.25"/></svg>`,
  vehicle:   `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 11V8l2-4h8l2 4v3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><rect x="1" y="11" width="16" height="4" rx="1" stroke="currentColor" stroke-width="1.25"/><circle cx="5" cy="15" r="1.5" stroke="currentColor" stroke-width="1.25"/><circle cx="13" cy="15" r="1.5" stroke="currentColor" stroke-width="1.25"/></svg>`,
  driver:    `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="currentColor" stroke-width="1.25"/><path d="M3 15c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`,
  report:    `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`,
  settings:  `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" stroke-width="1.25"/><path d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M4.05 4.05l1.06 1.06M12.89 12.89l1.06 1.06M4.05 13.95l1.06-1.06M12.89 5.11l1.06-1.06" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`,
  building:  `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="1" stroke="currentColor" stroke-width="1.25"/><path d="M6 16V11h6v5M9 3V1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><rect x="5" y="6" width="2.5" height="2.5" rx=".5" stroke="currentColor" stroke-width="1.1"/><rect x="10.5" y="6" width="2.5" height="2.5" rx=".5" stroke="currentColor" stroke-width="1.1"/></svg>`,
  users:     `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="6" r="2.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 15c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M13 8c1.1 0 2 .9 2 2M15 15c0-1.66-.9-3.12-2.24-3.9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`,
  support:   `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.25"/><path d="M6.5 6.5a2.5 2.5 0 0 1 5 .833c0 1.667-2.5 2.5-2.5 4.167" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><circle cx="9" cy="13.5" r="1" fill="currentColor"/></svg>`,
  chevronDown:  `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25l3.5 3.5 3.5-3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.25 3.5l3.5 3.5-3.5 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  collapse:  `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.25"/><path d="M5.5 1.5v13M5.5 8H3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`,
  expand:    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.25"/><path d="M5.5 1.5v13M8 8h2.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`,
  arrowLeft: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3.5L5.5 7 9 10.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Side navigation</h1>
      <div class="snp-chips">
        <span class="snp-chip">Fixed</span>
        <span class="snp-chip">Collapsed</span>
        <span class="snp-chip snp-chip--blue">Internal</span>
        <span class="snp-chip snp-chip--green">External</span>
      </div>
      <p class="ds-body ds-body--wide">
        Hierarchical vertical navigation placed on the left side of the screen.
        Always visible, collapsible, and tailored to the user's access level and entity context.
        Keeps primary navigation items accessible while allowing the content area to take full focus.
      </p>
    </section>

    <!-- ── Component Usage ─────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component Usage</h2>
      <p class="ds-body">Click nav items and the toggle button — primary items with children expand on click.</p>

      <div class="snp-controls">
        <div class="snp-tab-group">
          <button
            v-for="t in ['external', 'internal']" :key="t"
            :class="['snp-tab', { 'snp-tab--active': accessType === t }]"
            @click="accessType = t; activeItem = t === 'external' ? 'my-vehicles' : 'all-users'; expanded = t === 'external' ? ['vehicles'] : ['users']"
          >{{ t === 'external' ? 'External access' : 'Internal access' }}</button>
        </div>
        <div class="snp-tab-group">
          <button :class="['snp-tab', { 'snp-tab--active': !collapsed }]" @click="collapsed = false">Fixed</button>
          <button :class="['snp-tab', { 'snp-tab--active': collapsed }]"  @click="collapsed = true">Collapsed</button>
        </div>
      </div>

      <div class="snp-demo-wrap">
        <!-- Side nav -->
        <nav :class="['snp-nav', { 'snp-nav--collapsed': collapsed }]" aria-label="Side navigation demo">

          <!-- Header -->
          <div class="snp-nav__header">
            <div class="snp-nav__header-left">
              <template v-if="accessType === 'internal' && !collapsed">
                <button class="snp-nav__back-btn">
                  <span v-html="ICONS.arrowLeft" class="snp-icon" />
                  <span class="snp-nav__back-label">Root</span>
                </button>
              </template>
              <template v-else>
                <div class="snp-nav__logo" v-if="!collapsed">
                  <span class="snp-logo-gs">GS</span><span class="snp-logo-fleet">fleet</span>
                </div>
                <div class="snp-nav__logo-sm" v-else>GS</div>
              </template>
            </div>
            <button class="snp-nav__toggle" @click="collapsed = !collapsed" :title="collapsed ? 'Expand' : 'Collapse'">
              <span v-html="collapsed ? ICONS.expand : ICONS.collapse" class="snp-icon" />
            </button>
          </div>

          <!-- Body -->
          <div class="snp-nav__body">
            <template v-for="item in navItems" :key="item.key">
              <!-- Primary item -->
              <div
                :class="['snp-nav-item', {
                  'snp-nav-item--active': activeItem === item.key && !item.children,
                  'snp-nav-item--disabled': item.disabled,
                  'snp-nav-item--expanded': item.children && isExpanded(item.key),
                }]"
                @click="item.disabled ? null : (item.children ? toggleExpand(item.key) : activate(item.key))"
                :title="item.label"
              >
                <span class="snp-nav-item__icon" v-html="ICONS[item.icon]" aria-hidden="true" />
                <span class="snp-nav-item__label" v-if="!collapsed">{{ item.label }}</span>
                <span
                  v-if="item.children && !collapsed"
                  class="snp-nav-item__chevron"
                  v-html="isExpanded(item.key) ? ICONS.chevronDown : ICONS.chevronRight"
                />
              </div>
              <!-- Secondary items (expanded or collapsed popover placeholder) -->
              <template v-if="item.children && isExpanded(item.key) && !collapsed">
                <div
                  v-for="child in item.children" :key="child.key"
                  :class="['snp-nav-sub', { 'snp-nav-sub--active': activeItem === child.key }]"
                  @click="activate(child.key)"
                >
                  {{ child.label }}
                </div>
              </template>
            </template>
          </div>

          <!-- Footer -->
          <div class="snp-nav__footer">
            <div class="snp-entity">
              <div class="snp-entity__avatar">{{ accessType === 'internal' ? 'AN' : 'GS' }}</div>
              <div class="snp-entity__info" v-if="!collapsed">
                <span class="snp-entity__name">{{ accessType === 'internal' ? 'Nice Company' : 'GSFleet' }}</span>
                <span class="snp-entity__role">{{ accessType === 'internal' ? 'Viewing' : 'Fleet Manager / Basic' }}</span>
              </div>
            </div>
          </div>

        </nav>

        <!-- Content placeholder -->
        <div class="snp-demo-content">
          <div class="snp-demo-topbar">
            <span class="snp-demo-breadcrumb">Settings <span class="snp-demo-sep">›</span> {{ navItems.find(i => i.children?.some(c => c.key === activeItem))?.label ?? navItems.find(i => i.key === activeItem)?.label ?? '—' }}</span>
          </div>
          <div class="snp-demo-body">
            <div class="snp-demo-placeholder">Content area</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Types & Variants ─────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Types & Variants</h2>
      <p class="ds-body">Side navigation varies by access type and layout state. Access determines which items appear and whether root navigation is available.</p>

      <div class="snp-variant-grid">
        <div class="snp-variant-card">
          <div class="snp-variant-card__label snp-variant-card__label--blue">Fixed</div>
          <p class="snp-variant-card__desc">Navigation panel is always open. Items remain visible as the user scrolls. Recommended for most experiences.</p>
          <div class="snp-variant-card__detail">Width: 230px · Always visible</div>
        </div>
        <div class="snp-variant-card">
          <div class="snp-variant-card__label snp-variant-card__label--neutral">Collapsed</div>
          <p class="snp-variant-card__desc">Compressed to icon-only view. User can expand via the toggle button. Collapse state is remembered. All primary items must have icons.</p>
          <div class="snp-variant-card__detail">Width: 56px · Icon-only · Toggle to expand</div>
        </div>
        <div class="snp-variant-card">
          <div class="snp-variant-card__label snp-variant-card__label--green">External access</div>
          <p class="snp-variant-card__desc">Used by Fleet Manager, Admin, and Driver user types. Navigation reflects what the logged-in user has access to. Entity info shown in footer.</p>
          <div class="snp-variant-card__detail">User types: Fleet Manager · Admin · Driver</div>
        </div>
        <div class="snp-variant-card">
          <div class="snp-variant-card__label snp-variant-card__label--indigo">Internal access</div>
          <p class="snp-variant-card__desc">Used by Sys-admin and God-admin. When viewing a company entity, SideNavHeader shows a back-to-root navigation. Footer displays which entity is being viewed.</p>
          <div class="snp-variant-card__detail">User types: Sys-admin · God-admin</div>
        </div>
      </div>

      <div class="snp-entity-table">
        <div class="snp-entity-table__head">
          <span>Entity</span><span>Access</span><span>Header</span><span>Footer</span>
        </div>
        <div class="snp-entity-table__row">
          <span><strong>Root</strong></span>
          <span>Internal only</span>
          <span>Logo + toggle</span>
          <span>Internal user info</span>
        </div>
        <div class="snp-entity-table__row">
          <span><strong>Partner</strong></span>
          <span>Internal · External</span>
          <span>Logo + toggle</span>
          <span>Partner entity info</span>
        </div>
        <div class="snp-entity-table__row">
          <span><strong>Company</strong></span>
          <span>Internal · External</span>
          <span>Back-to-root (internal) · Logo (external)</span>
          <span>Company entity info</span>
        </div>
        <div class="snp-entity-table__row">
          <span><strong>User</strong></span>
          <span>External</span>
          <span>Logo + toggle</span>
          <span>User / company info</span>
        </div>
      </div>
    </section>

    <!-- ── Formatting ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">The side nav is composed of three structural regions. Body grows to fill available height, pushing the footer to the bottom.</p>

      <div class="snp-anatomy">
        <div class="snp-anatomy__nav">
          <div class="snp-anatomy__region snp-anatomy__region--header">
            <span class="snp-anatomy__tag">SideNavHeader</span>
            <span class="snp-anatomy__hint">Logo · Toggle button · Back-to-root</span>
          </div>
          <div class="snp-anatomy__region snp-anatomy__region--body">
            <span class="snp-anatomy__tag">SideNavBody</span>
            <span class="snp-anatomy__hint">Navigation items · Grows to fill space</span>
          </div>
          <div class="snp-anatomy__region snp-anatomy__region--footer">
            <span class="snp-anatomy__tag">SideNavFooter</span>
            <span class="snp-anatomy__hint">Entity info · Pinned to bottom</span>
          </div>
        </div>
        <div class="snp-anatomy__details">
          <div class="snp-detail-block">
            <strong>SideNavHeader</strong>
            <p>Top region. Contains the logo and the <code>SideNavToggleButton</code> for expand/collapse. In internal access, when viewing a company entity, replaced with a back-to-root button.</p>
          </div>
          <div class="snp-detail-block">
            <strong>SideNavBody</strong>
            <p>Middle region. Holds all navigation items. Uses <code>flex: 1</code> to grow and push the footer down. Can scroll independently when list overflows. Only primary levels have icons. Secondary and tertiary levels are text-only, indented, and hidden by default — revealed via chevron/click.</p>
          </div>
          <div class="snp-detail-block">
            <strong>SideNavFooter</strong>
            <p>Bottom region. Displays entity information: avatar initials, entity name, and the user's role or relationship to the entity. In collapsed mode, only the avatar is shown.</p>
          </div>
        </div>
      </div>

      <div class="snp-levels">
        <div class="snp-level-row">
          <div class="snp-level-badge snp-level-badge--primary">Primary</div>
          <div class="snp-level-content">
            <p>Top-level navigation sections. Always have an icon (required for collapsed mode). May have a chevron if sub-levels exist. Clicking navigates directly if no children; expands the group if children exist.</p>
            <div class="snp-level-rule">Icon + Label + Chevron (if children)</div>
          </div>
        </div>
        <div class="snp-level-row">
          <div class="snp-level-badge snp-level-badge--secondary">Secondary</div>
          <div class="snp-level-content">
            <p>Sub-pages under a primary item. Text-only — no icon. Hidden by default, revealed when the parent is expanded. Currently the lowest navigational level.</p>
            <div class="snp-level-rule">Label only · No icon · Indented</div>
          </div>
        </div>
        <div class="snp-level-row">
          <div class="snp-level-badge snp-level-badge--tertiary">Tertiary</div>
          <div class="snp-level-content">
            <p>Deepest level, if it exists. Text-only, further indented. Use sparingly — avoid deep nesting where possible.</p>
            <div class="snp-level-rule">Label only · No icon · Further indented</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Interaction & States ─────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction & States</h2>
      <p class="ds-body">Navigation items respond to pointer and keyboard. The active page is always clearly indicated. Disabled items remain visible but non-interactive.</p>

      <div class="snp-states-grid">
        <div class="snp-state-demo">
          <div class="snp-state-nav">
            <div class="snp-nav-item snp-nav-item--demo">
              <span class="snp-nav-item__icon" v-html="ICONS.dashboard" />
              <span class="snp-nav-item__label">Dashboard</span>
            </div>
          </div>
          <span class="snp-state-label">Default</span>
        </div>
        <div class="snp-state-demo">
          <div class="snp-state-nav">
            <div class="snp-nav-item snp-nav-item--demo snp-nav-item--demo-hover">
              <span class="snp-nav-item__icon" v-html="ICONS.dashboard" />
              <span class="snp-nav-item__label">Dashboard</span>
            </div>
          </div>
          <span class="snp-state-label">Hover</span>
        </div>
        <div class="snp-state-demo">
          <div class="snp-state-nav">
            <div class="snp-nav-item snp-nav-item--demo snp-nav-item--active">
              <span class="snp-nav-item__icon" v-html="ICONS.dashboard" />
              <span class="snp-nav-item__label">Dashboard</span>
            </div>
          </div>
          <span class="snp-state-label">Active</span>
        </div>
        <div class="snp-state-demo">
          <div class="snp-state-nav">
            <div class="snp-nav-item snp-nav-item--demo snp-nav-item--expanded">
              <span class="snp-nav-item__icon" v-html="ICONS.vehicle" />
              <span class="snp-nav-item__label">Vehicles</span>
              <span class="snp-nav-item__chevron" v-html="ICONS.chevronDown" />
            </div>
            <div class="snp-nav-sub snp-nav-sub--demo snp-nav-sub--active">My vehicles</div>
            <div class="snp-nav-sub snp-nav-sub--demo">Schedules</div>
          </div>
          <span class="snp-state-label">Expanded</span>
        </div>
        <div class="snp-state-demo">
          <div class="snp-state-nav">
            <div class="snp-nav-item snp-nav-item--demo snp-nav-item--disabled">
              <span class="snp-nav-item__icon" v-html="ICONS.settings" />
              <span class="snp-nav-item__label">Settings</span>
            </div>
          </div>
          <span class="snp-state-label">Disabled</span>
        </div>
        <div class="snp-state-demo">
          <div class="snp-state-nav snp-state-nav--collapsed">
            <div class="snp-nav-item snp-nav-item--demo snp-nav-item--icon-only">
              <span class="snp-nav-item__icon" v-html="ICONS.dashboard" />
            </div>
            <div class="snp-nav-item snp-nav-item--demo snp-nav-item--icon-only snp-nav-item--active">
              <span class="snp-nav-item__icon" v-html="ICONS.vehicle" />
            </div>
            <div class="snp-nav-item snp-nav-item--demo snp-nav-item--icon-only">
              <span class="snp-nav-item__icon" v-html="ICONS.driver" />
            </div>
          </div>
          <span class="snp-state-label">Collapsed</span>
        </div>
      </div>
    </section>

    <!-- ── Usage ────────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="snp-usage-cols">
        <div class="snp-usage-card snp-usage-card--do">
          <div class="snp-usage-card__header">
            <span class="snp-usage-badge snp-usage-badge--do">Do</span>
          </div>
          <ul class="snp-usage-list">
            <li>Use icons for all primary-level items — required for collapsed mode to remain navigable.</li>
            <li>Keep text labels short and readable. Avoid truncation.</li>
            <li>Use chevron on the right to indicate nested levels.</li>
            <li>Expand primary groups with only one secondary item automatically.</li>
            <li>Order items by importance — least used pages at the bottom.</li>
            <li>Use SideNavHeader for back-to-root navigation in internal access only.</li>
            <li>Display entity information in SideNavFooter for all access types.</li>
            <li>Add aria-labels to icons for screen reader accessibility.</li>
          </ul>
        </div>
        <div class="snp-usage-card snp-usage-card--dont">
          <div class="snp-usage-card__header">
            <span class="snp-usage-badge snp-usage-badge--dont">Don't</span>
          </div>
          <ul class="snp-usage-list">
            <li>Don't add icons to secondary or tertiary level items.</li>
            <li>Don't use arbitrary icons — they must be universally recognizable and match the label meaning.</li>
            <li>Don't hide items that are temporarily unavailable — prefer disabling them.</li>
            <li>Don't create deeply nested structures beyond tertiary level.</li>
            <li>Don't use the side nav for actions — it is navigation only.</li>
            <li>Don't truncate labels — shorten the label copy instead.</li>
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
        <div class="snp-token-row">
          <code>--indigo-100</code>
          <div class="snp-swatch" style="background: var(--indigo-100)"></div>
          <code>#010028</code>
          <span>Navigation background</span>
        </div>
        <div class="snp-token-row">
          <code>--indigo-90</code>
          <div class="snp-swatch" style="background: var(--indigo-90)"></div>
          <code>#02005f</code>
          <span>Active item background</span>
        </div>
        <div class="snp-token-row">
          <code>--blue-azure-50</code>
          <div class="snp-swatch" style="background: var(--blue-azure-50)"></div>
          <code>#39ade3</code>
          <span>Active item left border indicator</span>
        </div>
        <div class="snp-token-row">
          <code>--grey-00</code>
          <div class="snp-swatch" style="background: var(--grey-00); box-shadow: inset 0 0 0 1px var(--grey-20)"></div>
          <code>#ffffff</code>
          <span>Primary label text</span>
        </div>
        <div class="snp-token-row">
          <code>—</code>
          <div class="snp-swatch" style="background: rgba(255,255,255,0.55)"></div>
          <code>rgba(255,255,255,0.55)</code>
          <span>Secondary label text · Icon color</span>
        </div>
        <div class="snp-token-row">
          <code>—</code>
          <div class="snp-swatch" style="background: rgba(255,255,255,0.06)"></div>
          <code>rgba(255,255,255,0.06)</code>
          <span>Item hover background</span>
        </div>
        <div class="snp-token-row">
          <code>—</code>
          <div class="snp-swatch" style="background: rgba(255,255,255,0.08)"></div>
          <code>rgba(255,255,255,0.08)</code>
          <span>Footer separator · Region borders</span>
        </div>
        <div class="snp-token-row">
          <code>--btn-radius</code>
          <div class="snp-swatch snp-swatch--none"></div>
          <code>4px</code>
          <span>Item border radius</span>
        </div>
        <div class="snp-token-row">
          <code>—</code>
          <div class="snp-swatch snp-swatch--none"></div>
          <code>230px / 56px</code>
          <span>Nav width: expanded / collapsed</span>
        </div>
        <div class="snp-token-row">
          <code>—</code>
          <div class="snp-swatch snp-swatch--none"></div>
          <code>36px</code>
          <span>Primary item height</span>
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
.ds-section { display: flex; flex-direction: column; gap: 24px; }
.ds-h1 { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2 { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-body { font-size: 14px; color: var(--grey-70); line-height: 1.7; max-width: 640px; }
.ds-body--wide { max-width: 800px; }

code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  background: var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-90);
}

/* ── Header chips ────────────────────────────────────────────── */
.snp-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.snp-chip {
  font-size: 11px; font-weight: 500; padding: 3px 10px;
  border-radius: 100px; background: var(--grey-10); color: var(--grey-70);
}
.snp-chip--blue  { background: var(--blue-azure-10); color: var(--blue-azure-70); }
.snp-chip--green { background: var(--green-10); color: var(--green-90); }

/* ── Controls ────────────────────────────────────────────────── */
.snp-controls { display: flex; gap: 12px; flex-wrap: wrap; }
.snp-tab-group { display: flex; gap: 0; box-shadow: inset 0 0 0 1px var(--grey-20); border-radius: 6px; overflow: hidden; }
.snp-tab {
  height: 32px; padding: 0 14px; font-size: 13px; font-family: 'Inter', sans-serif;
  font-weight: 400; color: var(--grey-70); background: transparent;
  border: none; cursor: pointer; transition: background 80ms, color 80ms;
}
.snp-tab:hover { background: var(--grey-05); }
.snp-tab--active { background: var(--grey-10); color: var(--grey-100); font-weight: 500; }

/* ── Demo layout ─────────────────────────────────────────────── */
.snp-demo-wrap {
  display: flex;
  height: 460px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,.12);
}

/* ── Side nav (interactive demo) ─────────────────────────────── */
.snp-nav {
  width: 230px;
  flex-shrink: 0;
  background: var(--indigo-100);
  display: flex;
  flex-direction: column;
  transition: width 220ms cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
.snp-nav--collapsed { width: 56px; }

.snp-nav__header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 14px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.snp-nav__header-left { display: flex; align-items: center; min-width: 0; overflow: hidden; }

.snp-nav__logo {
  display: flex;
  align-items: center;
  gap: 1px;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
}
.snp-logo-gs    { color: #fff; }
.snp-logo-fleet { color: var(--blue-azure-40); }

.snp-nav__logo-sm {
  width: 28px; height: 28px;
  background: var(--indigo-90);
  border-radius: 4px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.snp-nav__back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,.7);
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  white-space: nowrap;
  transition: background 80ms, color 80ms;
}
.snp-nav__back-btn:hover { background: rgba(255,255,255,.08); color: #fff; }
.snp-nav__back-label { font-weight: 500; }

.snp-nav__toggle {
  width: 28px; height: 28px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,.5);
  flex-shrink: 0;
  transition: background 80ms, color 80ms;
}
.snp-nav__toggle:hover { background: rgba(255,255,255,.08); color: #fff; }

.snp-nav__body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.snp-nav__body::-webkit-scrollbar { width: 4px; }
.snp-nav__body::-webkit-scrollbar-track { background: transparent; }
.snp-nav__body::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 2px; }

/* Primary nav item */
.snp-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 80ms;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
}
.snp-nav-item:hover { background: rgba(255,255,255,.06); }
.snp-nav-item--active {
  background: var(--indigo-90);
  box-shadow: inset 3px 0 0 var(--blue-azure-50);
}
.snp-nav-item--expanded { background: rgba(255,255,255,.04); }
.snp-nav-item--disabled { opacity: .4; cursor: not-allowed; pointer-events: none; }

.snp-nav-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: rgba(255,255,255,.6);
}
.snp-nav-item--active .snp-nav-item__icon { color: rgba(255,255,255,.9); }

.snp-nav-item__label {
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255,255,255,.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.snp-nav-item--active .snp-nav-item__label { color: #fff; font-weight: 500; }

.snp-nav-item__chevron {
  display: flex;
  align-items: center;
  color: rgba(255,255,255,.35);
  flex-shrink: 0;
}

/* Secondary items */
.snp-nav-sub {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px 0 36px;
  border-radius: 4px;
  font-size: 13px;
  color: rgba(255,255,255,.6);
  cursor: pointer;
  transition: background 80ms, color 80ms;
  white-space: nowrap;
  flex-shrink: 0;
}
.snp-nav-sub:hover { background: rgba(255,255,255,.05); color: rgba(255,255,255,.85); }
.snp-nav-sub--active {
  color: #fff;
  font-weight: 500;
}

/* Footer */
.snp-nav__footer {
  flex-shrink: 0;
  border-top: 1px solid rgba(255,255,255,.08);
  padding: 12px 10px;
}
.snp-entity {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  overflow: hidden;
}
.snp-entity__avatar {
  width: 28px; height: 28px;
  border-radius: 4px;
  background: var(--indigo-90);
  color: rgba(255,255,255,.8);
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.snp-entity__info { display: flex; flex-direction: column; gap: 2px; min-width: 0; overflow: hidden; }
.snp-entity__name { font-size: 13px; font-weight: 500; color: rgba(255,255,255,.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.snp-entity__role { font-size: 11px; color: rgba(255,255,255,.45); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ── Demo content area ───────────────────────────────────────── */
.snp-demo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--grey-05);
  min-width: 0;
}
.snp-demo-topbar {
  height: 56px;
  background: #fff;
  border-bottom: 1px solid var(--grey-20);
  display: flex;
  align-items: center;
  padding: 0 24px;
  flex-shrink: 0;
}
.snp-demo-breadcrumb { font-size: 13px; color: var(--grey-70); }
.snp-demo-sep { margin: 0 6px; color: var(--grey-40); }
.snp-demo-body { flex: 1; display: flex; align-items: center; justify-content: center; }
.snp-demo-placeholder {
  font-size: 13px; color: var(--grey-40);
  border: 1px dashed var(--grey-30);
  border-radius: 8px;
  padding: 32px 48px;
}

.snp-icon { display: flex; align-items: center; justify-content: center; }

/* ── Variant cards ───────────────────────────────────────────── */
.snp-variant-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.snp-variant-card {
  padding: 18px 20px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.snp-variant-card__label {
  font-size: 12px; font-weight: 600; padding: 2px 10px; border-radius: 100px;
  display: inline-flex; width: fit-content;
}
.snp-variant-card__label--blue    { background: var(--blue-azure-10); color: var(--blue-azure-70); }
.snp-variant-card__label--neutral { background: var(--grey-10); color: var(--grey-70); }
.snp-variant-card__label--green   { background: var(--green-10); color: var(--green-90); }
.snp-variant-card__label--indigo  { background: var(--indigo-10); color: var(--indigo-80); }
.snp-variant-card__desc  { font-size: 13px; color: var(--grey-70); line-height: 1.6; margin: 0; }
.snp-variant-card__detail{ font-size: 11px; color: var(--grey-50); font-weight: 500; }

/* ── Entity table ────────────────────────────────────────────── */
.snp-entity-table {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
  font-size: 13px;
}
.snp-entity-table__head, .snp-entity-table__row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.8fr 1.5fr;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--grey-10);
  align-items: center;
}
.snp-entity-table__row:last-child { border-bottom: none; }
.snp-entity-table__head { font-size: 11px; font-weight: 600; color: var(--grey-50); text-transform: uppercase; letter-spacing: .06em; background: var(--grey-05); }
.snp-entity-table__row { color: var(--grey-70); }
.snp-entity-table__row strong { color: var(--grey-90); }

/* ── Anatomy ─────────────────────────────────────────────────── */
.snp-anatomy {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  align-items: start;
}
.snp-anatomy__nav {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,.12);
}
.snp-anatomy__region {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  background: var(--indigo-100);
  border-bottom: 1px solid rgba(255,255,255,.08);
  position: relative;
}
.snp-anatomy__region--header { min-height: 52px; }
.snp-anatomy__region--body   { min-height: 100px; flex: 1; }
.snp-anatomy__region--footer { border-bottom: none; min-height: 52px; }
.snp-anatomy__region::before {
  content: '';
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 3px;
  background: var(--blue-azure-50);
}
.snp-anatomy__tag  { font-size: 11px; font-weight: 600; color: var(--blue-azure-40); font-family: 'Fira Code', monospace; }
.snp-anatomy__hint { font-size: 11px; color: rgba(255,255,255,.45); }

.snp-anatomy__details { display: flex; flex-direction: column; gap: 20px; }
.snp-detail-block strong { display: block; font-size: 14px; font-weight: 600; color: var(--grey-90); margin-bottom: 6px; }
.snp-detail-block p { font-size: 13px; color: var(--grey-70); line-height: 1.65; margin: 0; }

/* ── Levels ──────────────────────────────────────────────────── */
.snp-levels { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.snp-level-row {
  display: flex;
  gap: 20px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--grey-10);
  align-items: flex-start;
}
.snp-level-row:last-child { border-bottom: none; }
.snp-level-badge {
  font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
  white-space: nowrap; flex-shrink: 0;
}
.snp-level-badge--primary   { background: var(--indigo-10); color: var(--indigo-80); }
.snp-level-badge--secondary { background: var(--grey-10); color: var(--grey-70); }
.snp-level-badge--tertiary  { background: var(--grey-05); color: var(--grey-60); }
.snp-level-content { flex: 1; }
.snp-level-content p { font-size: 13px; color: var(--grey-70); line-height: 1.6; margin: 0 0 8px; }
.snp-level-rule {
  font-size: 12px; font-weight: 500; color: var(--grey-60);
  padding: 3px 10px; background: var(--grey-05); border-radius: 4px; display: inline-block;
}

/* ── States grid ─────────────────────────────────────────────── */
.snp-states-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.snp-state-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.snp-state-nav {
  background: var(--indigo-100);
  border-radius: 6px;
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
}
.snp-state-nav--collapsed { width: 52px; }
.snp-state-label { font-size: 11px; color: var(--grey-50); font-weight: 500; text-transform: uppercase; letter-spacing: .05em; }

/* reuse live nav styles with --demo modifier for the states grid */
.snp-nav-item--demo { margin: 0; }
.snp-nav-item--demo-hover { background: rgba(255,255,255,.06); }
.snp-nav-item--icon-only { justify-content: center; padding: 0; width: 36px; height: 36px; }

.snp-nav-sub--demo { background: transparent; }

/* ── Usage cards ─────────────────────────────────────────────── */
.snp-usage-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.snp-usage-card {
  padding: 20px 22px;
  border-radius: 8px;
  border: 1px solid var(--grey-20);
  background: #fff;
}
.snp-usage-card__header { margin-bottom: 14px; }
.snp-usage-badge {
  font-size: 11px; font-weight: 700; padding: 3px 10px;
  border-radius: 100px; text-transform: uppercase; letter-spacing: .04em;
}
.snp-usage-badge--do   { background: var(--green-10); color: var(--green-90); }
.snp-usage-badge--dont { background: var(--red-10); color: var(--red-80); }
.snp-usage-list {
  margin: 0; padding: 0 0 0 16px;
  display: flex; flex-direction: column; gap: 8px;
}
.snp-usage-list li { font-size: 13px; color: var(--grey-70); line-height: 1.55; }

/* ── Token table ─────────────────────────────────────────────── */
.snp-token-table { border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; background: #fff; }
.snp-token-row {
  display: grid;
  grid-template-columns: 2fr 24px 120px 1fr;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--grey-10);
  font-size: 13px;
  color: var(--grey-70);
}
.snp-token-row:last-child { border-bottom: none; }
.snp-token-row--head {
  font-size: 11px; font-weight: 600; color: var(--grey-50);
  text-transform: uppercase; letter-spacing: .06em; background: var(--grey-05);
}
.snp-swatch {
  width: 20px; height: 20px; border-radius: 4px;
  border: 1px solid rgba(0,0,0,.08); flex-shrink: 0;
}
.snp-swatch--none { background: transparent; border: none; }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 860px) {
  .ds-main { padding: 32px 20px 64px; }
  .snp-variant-grid, .snp-usage-cols { grid-template-columns: 1fr; }
  .snp-states-grid { grid-template-columns: repeat(2, 1fr); }
  .snp-anatomy { grid-template-columns: 1fr; }
  .snp-entity-table__head, .snp-entity-table__row { grid-template-columns: 1fr 1fr; }
  .snp-entity-table__head span:nth-child(3),
  .snp-entity-table__head span:nth-child(4),
  .snp-entity-table__row span:nth-child(3),
  .snp-entity-table__row span:nth-child(4) { display: none; }
}
</style>
