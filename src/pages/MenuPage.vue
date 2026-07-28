<script setup>
import { ref } from 'vue'
import AppButton from '../components/ui/AppButton.vue'
import AppTag   from '../components/ui/AppTag.vue'
import AppMenu  from '../components/ui/AppMenu.vue'

defineEmits(['navigate'])

/* ── Interactive optional-menu demo ──────────────────── */
const demoOpen   = ref(false)
const demoSel    = ref(null)
function pickOption(opt) { demoSel.value = opt; demoOpen.value = false }

/* ── Multi-select demo ───────────────────────────────── */
const multiSel     = ref([])
const multiOpen    = ref(false)
const appliedMulti = ref([])
const MULTI_OPTS   = ['Option 1','Option 2','Option 3','Option 4','Option 5']
function toggleMulti(o) {
  const i = multiSel.value.indexOf(o)
  if (i === -1) multiSel.value.push(o)
  else multiSel.value.splice(i, 1)
}
function applyMulti() { appliedMulti.value = [...multiSel.value]; multiOpen.value = false }
function removeApplied(o) {
  appliedMulti.value = appliedMulti.value.filter(x => x !== o)
  multiSel.value     = multiSel.value.filter(x => x !== o)
}

/* ── Account menu variant selector ──────────────────── */
const accountTab = ref('default')

/* ── AppMenu component demo ──────────────────────────── */
const cmOpen      = ref(false)
const cmSelected  = ref(null)
const cmItems = [
  { label: 'Edit',       icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3L5 14H2v-3L11 2z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { label: 'Export',     icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 5l3-3 3 3M3 10v3.5h10V10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { label: 'Assign to',  icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.25"/><path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>` },
  { divider: true },
  { label: 'Delete', danger: true, icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
]

/* ── Icons ───────────────────────────────────────────── */
const IconChevronRight = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3l3 3-3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconCheck        = `<svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l4 4 6-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconPlaceholder  = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" fill="#9c9ea3"/></svg>`
const IconUser         = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.25"/><path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconSend         = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 2L2 7l5 2 2 5 5-12z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconLogout       = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 11v2.5H2V2.5h8V5M7 8h7M14 8l-2-2M14 8l-2 2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconEdit         = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3L5 14H2v-3L11 2z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconTrash        = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2h6v2M3 4l1 10h8l1-10M6 7v4M10 7v4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconExport       = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 5l3-3 3 3M3 10v3.5h10V10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconHelp         = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.25"/><path d="M6.5 6.5a1.5 1.5 0 0 1 3 .5c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><circle cx="8" cy="11.5" r=".75" fill="currentColor"/></svg>`
const IconChevronDown  = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Menu</h1>
      <div class="ds-header-cols">
        <p class="ds-body">
          A supplementary action menu that provides access to contextual operations and secondary
          functions related to the current entity or page. Typically appears as an overflow menu
          (kebab / three-dot) or action button set, offering less frequent but important actions
          that don't warrant primary placement in the interface.
        </p>
        <div class="ds-callout">
          <strong>Single vs multi-select</strong><br>
          The optional menu is always <em>single-selection</em>. For multi-selections — typically
          used for filtering — use the multi-selection menu variant with checkboxes and action buttons.
        </div>
      </div>
    </section>

    <!-- ── Component demo ────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component</h2>
      <p class="ds-body">AppMenu manages open/close state and emits a <code>select</code> event. Click the button to open the menu.</p>
      <div class="ds-card" style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
        <AppMenu v-model:open="cmOpen" :items="cmItems" @select="cmSelected = $event.label">
          <template #trigger>
            <AppButton variant="tertiary" size="sm">
              Bulk actions
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
          </template>
        </AppMenu>
        <p v-if="cmSelected" class="ds-body">Selected: <strong>{{ cmSelected }}</strong></p>
      </div>
    </section>

    <!-- ── Menu item states ────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Item states</h2>
      <p class="ds-body">Each row in the menu is a 30 px item with 8 px padding and a 2 px border-radius. Six states cover all interaction and configuration combinations.</p>

      <div class="ds-state-grid">
        <!-- Default -->
        <div class="ds-state-col">
          <span class="ds-state-col__label">Default</span>
          <div class="ds-menu-item">Option here</div>
        </div>
        <!-- Hover -->
        <div class="ds-state-col">
          <span class="ds-state-col__label">Hover</span>
          <div class="ds-menu-item ds-menu-item--hover">Option here</div>
        </div>
        <!-- Selected -->
        <div class="ds-state-col">
          <span class="ds-state-col__label">Selected</span>
          <div class="ds-menu-item ds-menu-item--selected">
            Option here
            <span class="ds-menu-item__icon-right" v-html="IconCheck" />
          </div>
        </div>
        <!-- Danger -->
        <div class="ds-state-col">
          <span class="ds-state-col__label">Danger</span>
          <div class="ds-menu-item ds-menu-item--danger">Danger option here</div>
        </div>
        <!-- With left icon -->
        <div class="ds-state-col">
          <span class="ds-state-col__label">Left icon</span>
          <div class="ds-menu-item ds-menu-item--icon-left">
            <span class="ds-menu-item__icon" v-html="IconEdit" />
            Option here
          </div>
        </div>
        <!-- With right chevron (submenu) -->
        <div class="ds-state-col">
          <span class="ds-state-col__label">Right icon</span>
          <div class="ds-menu-item">
            Option here
            <span class="ds-menu-item__icon-right" v-html="IconChevronRight" />
          </div>
        </div>
      </div>

      <!-- Icon variants row -->
      <div class="ds-example-card">
        <p class="ds-example-label">Icon variants — both sides</p>
        <div class="ds-menu-item-row">
          <div class="ds-menu-item ds-menu-item--icon-left">
            <span class="ds-menu-item__icon" v-html="IconPlaceholder" />
            Icon left
          </div>
          <div class="ds-menu-item ds-menu-item--selected">
            Icon left + check
            <span class="ds-menu-item__icon-right" v-html="IconCheck" />
          </div>
          <div class="ds-menu-item">
            Submenu
            <span class="ds-menu-item__icon-right" v-html="IconChevronRight" />
          </div>
          <div class="ds-menu-item ds-menu-item--icon-left">
            <span class="ds-menu-item__icon" v-html="IconPlaceholder" />
            Both sides
            <span class="ds-menu-item__icon-right" v-html="IconChevronRight" />
          </div>
        </div>
      </div>

      <!-- Multi-select item -->
      <div class="ds-example-card">
        <p class="ds-example-label">Multi-select items (checkbox left)</p>
        <div class="ds-menu-item-row">
          <div class="ds-menu-item ds-menu-item--multi">
            <div class="ds-cb-sm"></div>
            Option here
          </div>
          <div class="ds-menu-item ds-menu-item--multi ds-menu-item--hover">
            <div class="ds-cb-sm ds-cb-sm--hover"></div>
            Option here
          </div>
          <div class="ds-menu-item ds-menu-item--multi">
            <div class="ds-cb-sm ds-cb-sm--checked"><span v-html="IconCheck" /></div>
            Option here
          </div>
        </div>
      </div>
    </section>

    <!-- ── Single-select menu ──────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Optional menu (single-select)</h2>
      <p class="ds-body">
        Consolidates secondary actions — edit, export, archive, delete — without cluttering the primary interface.
        Typically triggered by a kebab (⋮) button in contextual headers, table rows, or cards.
        Always single-selection; selecting an item immediately executes the action.
      </p>

      <!-- Static examples side by side -->
      <div class="ds-menus-row">
        <!-- Plain 5-item + danger -->
        <div class="ds-menu-example">
          <p class="ds-example-label">No icons</p>
          <div class="ds-menu">
            <div class="ds-menu-item">Edit</div>
            <div class="ds-menu-item">Duplicate</div>
            <div class="ds-menu-item">Export</div>
            <div class="ds-menu-item">Archive</div>
            <div class="ds-menu-item ds-menu-item--danger">Delete permanently</div>
          </div>
        </div>

        <!-- With left icons -->
        <div class="ds-menu-example">
          <p class="ds-example-label">Left icons</p>
          <div class="ds-menu">
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconEdit" />Edit
            </div>
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconExport" />Export
            </div>
            <div class="ds-menu-item ds-menu-item--hover ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconUser" />Assign
            </div>
            <div class="ds-menu-item ds-menu-item--icon-left ds-menu-item--danger">
              <span class="ds-menu-item__icon" v-html="IconTrash" />Delete
            </div>
          </div>
        </div>

        <!-- Selected state + submenu -->
        <div class="ds-menu-example">
          <p class="ds-example-label">Selected + submenu</p>
          <div class="ds-menu">
            <div class="ds-menu-item ds-menu-item--selected">
              Option here
              <span class="ds-menu-item__icon-right" v-html="IconCheck" />
            </div>
            <div class="ds-menu-item">Option here</div>
            <div class="ds-menu-item">
              More options
              <span class="ds-menu-item__icon-right" v-html="IconChevronRight" />
            </div>
            <div class="ds-menu-item">Option here</div>
            <div class="ds-menu-item ds-menu-item--danger">Delete permanently</div>
          </div>
        </div>
      </div>

      <!-- Interactive demo -->
      <div class="ds-interactive-demo">
        <p class="ds-example-label">Interactive demo</p>
        <div class="ds-demo-area">
          <div class="ds-demo-trigger-wrap">
            <AppButton variant="tertiary" size="sm" @click="demoOpen = !demoOpen">
              <template #icon-right><span v-html="IconChevronDown" /></template>
              Bulk actions
            </AppButton>
            <div v-if="demoOpen" class="ds-menu ds-menu--positioned">
              <div class="ds-menu-item ds-menu-item--icon-left" @click="pickOption('edit')">
                <span class="ds-menu-item__icon" v-html="IconEdit" />Edit
              </div>
              <div class="ds-menu-item ds-menu-item--icon-left" @click="pickOption('export')">
                <span class="ds-menu-item__icon" v-html="IconExport" />Export
              </div>
              <div class="ds-menu-item ds-menu-item--icon-left" @click="pickOption('user')">
                <span class="ds-menu-item__icon" v-html="IconUser" />Assign to
              </div>
              <div class="ds-menu-item ds-menu-item--icon-left ds-menu-item--danger" @click="pickOption('delete')">
                <span class="ds-menu-item__icon" v-html="IconTrash" />Delete
              </div>
            </div>
          </div>
          <p v-if="demoSel" class="ds-demo-feedback">Selected: <strong>{{ demoSel }}</strong></p>
        </div>
      </div>
    </section>

    <!-- ── Multi-select menu ───────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Multi-select menu</h2>
      <p class="ds-body">
        Used for filtering and bulk operations where multiple options can be selected simultaneously.
        Always includes checkbox items. Optionally paired with action buttons in the footer
        — use <strong>one action</strong> (e.g. Apply) or <strong>two actions</strong>
        (Cancel + Primary) depending on the context.
      </p>

      <div class="ds-menus-row">
        <!-- Multi — no actions -->
        <div class="ds-menu-example">
          <p class="ds-example-label">No actions (5 items)</p>
          <div class="ds-menu">
            <div class="ds-menu-item ds-menu-item--multi">
              <div class="ds-cb-sm ds-cb-sm--checked"><span v-html="IconCheck" /></div>Option 1
            </div>
            <div class="ds-menu-item ds-menu-item--multi">
              <div class="ds-cb-sm"></div>Option 2
            </div>
            <div class="ds-menu-item ds-menu-item--multi">
              <div class="ds-cb-sm ds-cb-sm--checked"><span v-html="IconCheck" /></div>Option 3
            </div>
            <div class="ds-menu-item ds-menu-item--multi">
              <div class="ds-cb-sm"></div>Option 4
            </div>
            <div class="ds-menu-item ds-menu-item--multi">
              <div class="ds-cb-sm"></div>Option 5
            </div>
          </div>
        </div>

        <!-- Multi — two actions -->
        <div class="ds-menu-example">
          <p class="ds-example-label">Two actions</p>
          <div class="ds-menu ds-menu--w-footer">
            <div class="ds-menu__body">
              <div class="ds-menu-item ds-menu-item--multi">
                <div class="ds-cb-sm ds-cb-sm--checked"><span v-html="IconCheck" /></div>Option 1
              </div>
              <div class="ds-menu-item ds-menu-item--multi">
                <div class="ds-cb-sm"></div>Option 2
              </div>
              <div class="ds-menu-item ds-menu-item--multi">
                <div class="ds-cb-sm ds-cb-sm--checked"><span v-html="IconCheck" /></div>Option 3
              </div>
              <div class="ds-menu-item ds-menu-item--multi">
                <div class="ds-cb-sm"></div>Option 4
              </div>
              <div class="ds-menu-item ds-menu-item--multi">
                <div class="ds-cb-sm"></div>Option 5
              </div>
            </div>
            <div class="ds-menu__footer ds-menu__footer--two">
              <AppButton variant="secondary" size="sm">Cancel</AppButton>
              <AppButton variant="primary" size="sm" style="flex:1">Apply</AppButton>
            </div>
          </div>
        </div>

        <!-- Multi — one action -->
        <div class="ds-menu-example">
          <p class="ds-example-label">One action (7 items)</p>
          <div class="ds-menu ds-menu--w-footer ds-menu--wide">
            <div class="ds-menu__body">
              <div v-for="n in 7" :key="n" class="ds-menu-item ds-menu-item--multi">
                <div class="ds-cb-sm" :class="{'ds-cb-sm--checked': n===2||n===5}">
                  <span v-if="n===2||n===5" v-html="IconCheck" />
                </div>Option {{ n }}
              </div>
            </div>
            <div class="ds-menu__footer">
              <AppButton variant="primary" size="sm" style="width:100%">Apply changes</AppButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive multi-select -->
      <div class="ds-interactive-demo">
        <p class="ds-example-label">Interactive demo</p>
        <div class="ds-demo-area">
          <div class="ds-demo-trigger-wrap">
            <AppButton variant="tertiary" size="sm" @click="multiOpen = !multiOpen">
              Filter
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
            <div v-if="multiOpen" class="ds-menu ds-menu--positioned ds-menu--w-footer">
              <div class="ds-menu__body">
                <div v-for="opt in MULTI_OPTS" :key="opt" class="ds-menu-item ds-menu-item--multi" @click="toggleMulti(opt)">
                  <div class="ds-cb-sm" :class="{'ds-cb-sm--checked': multiSel.includes(opt)}">
                    <span v-if="multiSel.includes(opt)" v-html="IconCheck" />
                  </div>
                  {{ opt }}
                </div>
              </div>
              <div class="ds-menu__footer">
                <AppButton variant="primary" size="sm" style="width:100%" @click="applyMulti">Apply</AppButton>
              </div>
            </div>
          </div>
          <div v-if="appliedMulti.length" class="ds-demo-feedback ds-demo-feedback--chips">
            <span>Selected:</span>
            <div class="ds-chip-container">
              <AppTag
                v-for="opt in appliedMulti" :key="opt"
                type="neutral-outline" :dismissible="true"
                @dismiss="removeApplied(opt)"
              >{{ opt }}</AppTag>
            </div>
          </div>
        </div>
        <a href="#" class="ds-demo-link" @click.prevent="$emit('navigate', 'filters')">Take me to filters design block</a>
      </div>
    </section>

    <!-- ── Account menu ────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Account menu</h2>
      <p class="ds-body">
        Triggered from the user avatar or name in the top navigation. Always shows user identity
        in the header area, followed by account actions. Three variants cover the main auth contexts.
      </p>

      <!-- Tab selector -->
      <div class="ds-tab-row">
        <button
          v-for="tab in ['default','login-as','context']" :key="tab"
          class="ds-tab"
          :class="{ 'ds-tab--active': accountTab === tab }"
          @click="accountTab = tab"
        >
          {{ tab === 'default' ? 'Default' : tab === 'login-as' ? 'With login as' : 'With context' }}
        </button>
      </div>

      <!-- Default -->
      <div v-if="accountTab === 'default'" class="ds-example-card">
        <p class="ds-example-label">Default — user info + account actions</p>
        <div class="ds-account-menu">
          <div class="ds-account-menu__header">
            <span class="ds-account-menu__name">Elisabeth Keen</span>
            <span class="ds-account-menu__email">elisabeth@email.com</span>
          </div>
          <div class="ds-account-menu__body">
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconUser" />My account
            </div>
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconSend" />Send feedback
            </div>
          </div>
          <div class="ds-account-menu__divider"></div>
          <div class="ds-account-menu__body">
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconLogout" />Logout
            </div>
          </div>
        </div>
      </div>

      <!-- With login as -->
      <div v-if="accountTab === 'login-as'" class="ds-example-card">
        <p class="ds-example-label">With login as — shows impersonated user</p>
        <div class="ds-account-menu">
          <div class="ds-account-menu__header">
            <span class="ds-account-menu__name">Aaro Saarinen</span>
            <span class="ds-account-menu__email">aaro@nicecompany.com</span>
          </div>
          <div class="ds-account-menu__divider"></div>
          <div class="ds-account-menu__loginas">
            <span class="ds-account-menu__loginas-label">Logged in as</span>
            <span class="ds-account-menu__loginas-name">Elisabeth B. Keen</span>
            <span class="ds-account-menu__loginas-email">elisabeth@nicecompany.com</span>
            <AppButton variant="primary" size="sm">Switch to your account</AppButton>
          </div>
          <div class="ds-account-menu__divider"></div>
          <div class="ds-account-menu__body">
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconUser" />My account
            </div>
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconSend" />Send feedback
            </div>
          </div>
          <div class="ds-account-menu__divider"></div>
          <div class="ds-account-menu__body">
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconLogout" />Logout
            </div>
          </div>
        </div>
      </div>

      <!-- With context -->
      <div v-if="accountTab === 'context'" class="ds-example-card">
        <p class="ds-example-label">With context — shows company / module context</p>
        <div class="ds-account-menu">
          <div class="ds-account-menu__header">
            <span class="ds-account-menu__name">Elisabeth Keen</span>
            <span class="ds-account-menu__email">elisabeth@email.com</span>
          </div>
          <div class="ds-account-menu__divider"></div>
          <div class="ds-account-menu__context">
            <div class="ds-account-menu__context-avatar">NC</div>
            <div class="ds-account-menu__context-info">
              <span class="ds-account-menu__context-company">NICE COMPANY</span>
              <span class="ds-account-menu__context-role">Module / Role here</span>
            </div>
            <span class="ds-account-menu__context-chevron" v-html="IconChevronRight" />
          </div>
          <div class="ds-account-menu__divider"></div>
          <div class="ds-account-menu__body">
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconUser" />My account
            </div>
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconSend" />Send feedback
            </div>
          </div>
          <div class="ds-account-menu__divider"></div>
          <div class="ds-account-menu__body">
            <div class="ds-menu-item ds-menu-item--icon-left">
              <span class="ds-menu-item__icon" v-html="IconLogout" />Logout
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Help menu ───────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Help menu</h2>
      <p class="ds-body">Triggered from the help (?) icon in the top navigation. Simple three-item single-select menu.</p>

      <div class="ds-example-card">
        <p class="ds-example-label">Help menu</p>
        <div class="ds-menu" style="width:180px">
          <div class="ds-menu-item">Help Center</div>
          <div class="ds-menu-item">Submit Feedback</div>
          <div class="ds-menu-item">About Fleet Manager</div>
        </div>
      </div>
    </section>

    <!-- ── Tokens ──────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Tokens</h2>
      <div class="ds-token-table">
        <div class="ds-token-row ds-token-row--head">
          <span>Token</span><span></span><span>Value</span><span>Usage</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">menu / color / bcg / main</code>
          <div class="ds-swatch" style="background:#fff;border:1px solid #e6e6e7"></div>
          <code class="ds-token-val">#ffffff</code>
          <span>Item default background</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">menu / color / bcg / hover</code>
          <div class="ds-swatch" style="background:#f1f1f2"></div>
          <code class="ds-token-val">#f1f1f2</code>
          <span>Item hover background</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">menu / color / bcg / selected</code>
          <div class="ds-swatch" style="background:#e8f6ff"></div>
          <code class="ds-token-val">#e8f6ff</code>
          <span>Selected item background</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">menu / color / text / main</code>
          <div class="ds-swatch" style="background:#36383b"></div>
          <code class="ds-token-val">#36383b</code>
          <span>Default + hover label</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">menu / color / text / danger</code>
          <div class="ds-swatch" style="background:#b91c1c"></div>
          <code class="ds-token-val">#b91c1c</code>
          <span>Destructive action label</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">divider / color / border / subtile</code>
          <div class="ds-swatch" style="background:#e6e6e7"></div>
          <code class="ds-token-val">#e6e6e7</code>
          <span>Menu border + internal dividers</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">item height</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">30 px</code>
          <span>All item rows</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">item padding</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">8 px</code>
          <span>Horizontal + vertical padding</span>
        </div>
        <div class="ds-token-row">
          <code class="ds-token-name">container shadow</code>
          <div class="ds-swatch ds-swatch--none"></div>
          <code class="ds-token-val">0 4px 7.5px rgba(0,0,0,.24)</code>
          <span>Elevated container drop shadow</span>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────── */
.ds-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}
.ds-card    { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1  { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2  { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-body { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

.ds-header-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
.ds-callout {
  background: #fffbeb;
  border: 1px solid #f9c74f;
  border-left: 3px solid #f9c74f;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 13px;
  color: var(--grey-80);
  line-height: 1.55;
}

.ds-example-card {
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 8px;
  padding: 16px 20px;
}
.ds-example-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 14px;
  font-family: 'Inter', sans-serif;
}

/* ── Menu item ───────────────────────────────────────────────── */
.ds-menu-item {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 8px;
  border-radius: 2px;
  font-size: 14px;
  color: #36383b;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  gap: 0;
  flex-shrink: 0;
  width: 100%;
  transition: background 80ms;
  box-sizing: border-box;
  user-select: none;
}
.ds-menu-item:hover                      { background: #f1f1f2; }
.ds-menu-item--hover                     { background: #f1f1f2 !important; }
.ds-menu-item--selected                  { background: #e8f6ff; }
.ds-menu-item--danger                    { color: #b91c1c; }
.ds-menu-item--icon-left                 { gap: 12px; }
.ds-menu-item--multi                     { gap: 12px; }

.ds-menu-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #5d6065;
}
.ds-menu-item--danger .ds-menu-item__icon { color: #b91c1c; }

.ds-menu-item__icon-right {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: auto;
  color: #9c9ea3;
}
.ds-menu-item--selected .ds-menu-item__icon-right { color: #0369a1; }

/* flex spacer so label fills available width */
.ds-menu-item:not(.ds-menu-item--multi) > :not(.ds-menu-item__icon):not(.ds-menu-item__icon-right) {
  flex: 1;
  min-width: 0;
}

/* ── Mini checkbox (multi-select items) ──────────────────────── */
.ds-cb-sm {
  width: 16px; height: 16px;
  border-radius: 4px;
  border: 1.5px solid #9c9ea3;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
}
.ds-cb-sm--hover   { border-color: #6f7176; }
.ds-cb-sm--checked { background: #010028; border-color: #010028; }

/* ── Menu container ──────────────────────────────────────────── */
.ds-menu {
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e6e6e7;
  border-radius: 4px;
  box-shadow: 0 4px 7.5px rgba(0,0,0,.24);
  padding: 4px;
  min-width: 180px;
}
.ds-menu--wide { min-width: 220px; }
.ds-menu--w-footer { padding: 0; }
.ds-menu__body { display: flex; flex-direction: column; padding: 4px; }
.ds-menu__footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-top: 1px solid #e6e6e7;
  border-radius: 0 0 4px 4px;
}
.ds-menu__footer--two { justify-content: stretch; }

/* Positioned (dropdown from button) */
.ds-menu--positioned {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 50;
}

/* ── State grid ──────────────────────────────────────────────── */
.ds-state-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 24px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
}
.ds-state-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 140px;
}
.ds-state-col__label {
  font-size: 11px;
  color: var(--grey-50);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  font-family: 'Inter', sans-serif;
}

/* Item row (inline, not in container) */
.ds-menu-item-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ds-menu-item-row .ds-menu-item {
  width: auto;
  min-width: 140px;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 4px;
}

/* ── Menus displayed side by side ────────────────────────────── */
.ds-menus-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: flex-start;
}
.ds-menu-example {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ── Interactive demo ────────────────────────────────────────── */
.ds-interactive-demo {
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 8px;
  padding: 16px 20px;
}
.ds-demo-area {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}
.ds-demo-trigger-wrap {
  position: relative;
  display: inline-block;
}
.ds-demo-feedback {
  font-size: 13px;
  color: var(--grey-70);
  padding-top: 6px;
  font-family: 'Inter', sans-serif;
}
.ds-demo-feedback strong { color: var(--grey-90); }
.ds-demo-feedback--chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

/* Chip container — matches Filters page pattern */
.ds-chip-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  background: var(--grey-05);
  border: 1px solid var(--grey-10);
  border-radius: 6px;
  padding: 3px 8px;
}

/* Link to another design block */
.ds-demo-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 13px;
  color: var(--color-accent-main);
  text-decoration: underline;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
}
.ds-demo-link:hover { color: var(--color-accent-hover); }

/* ── Tab selector (account variants) ────────────────────────── */
.ds-tab-row {
  display: flex;
  gap: 0;
  border: 1px solid var(--grey-20);
  border-radius: 6px;
  overflow: hidden;
  width: fit-content;
  background: var(--grey-05);
}
.ds-tab {
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  color: var(--grey-60);
  background: none;
  border: none;
  border-right: 1px solid var(--grey-20);
  cursor: pointer;
  transition: background 100ms, color 100ms;
}
.ds-tab:last-child { border-right: none; }
.ds-tab:hover { background: var(--grey-10); color: var(--grey-80); }
.ds-tab--active {
  background: #fff;
  color: var(--grey-90);
  font-weight: 500;
}

/* ── Account menu ────────────────────────────────────────────── */
.ds-account-menu {
  display: inline-flex;
  flex-direction: column;
  width: 297px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 25px rgba(57,57,57,.25);
  overflow: hidden;
}
.ds-account-menu__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  background: var(--grey-05);
}
.ds-account-menu__name  { font-size: 14px; font-weight: 500; color: #36383b; font-family: 'Inter', sans-serif; }
.ds-account-menu__email { font-size: 13px; color: #6f7176; font-family: 'Inter', sans-serif; }

.ds-account-menu__body  { display: flex; flex-direction: column; padding: 4px; }
.ds-account-menu__divider { height: 1px; background: #e6e6e7; flex-shrink: 0; }

/* login-as section */
.ds-account-menu__loginas {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
}
.ds-account-menu__loginas-label {
  font-size: 14px;
  font-weight: 500;
  color: #5d6065;
  font-family: 'Inter', sans-serif;
}
.ds-account-menu__loginas-name  { font-size: 14px; color: #6f7176; font-family: 'Inter', sans-serif; }
.ds-account-menu__loginas-email { font-size: 12px; color: #6f7176; font-family: 'Inter', sans-serif; }

/* context section */
.ds-account-menu__context {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
}
.ds-account-menu__context-avatar {
  width: 28px; height: 28px;
  border-radius: 4px;
  background: var(--grey-10);
  color: #5d6065;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  flex-shrink: 0;
}
.ds-account-menu__context-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}
.ds-account-menu__context-company {
  font-size: 12px;
  font-weight: 500;
  color: #6f7176;
  font-family: 'Inter', sans-serif;
  letter-spacing: .03em;
}
.ds-account-menu__context-role {
  font-size: 14px;
  color: #6f7176;
  font-family: 'Inter', sans-serif;
}
.ds-account-menu__context-chevron {
  display: flex;
  align-items: center;
  color: var(--grey-50);
  flex-shrink: 0;
}

/* ── Token table ─────────────────────────────────────────────── */
.ds-token-table {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}
.ds-token-row {
  display: grid;
  grid-template-columns: 2fr 24px 200px 1fr;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--grey-10);
  font-size: 13px;
  color: var(--grey-70);
  font-family: 'Inter', sans-serif;
}
.ds-token-row:last-child { border-bottom: none; }
.ds-token-row--head {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .06em;
  background: var(--grey-05);
}
.ds-token-name { font-family: 'Fira Code', 'Courier New', monospace; font-size: 12px; color: var(--grey-80); }
.ds-token-val  { font-family: 'Fira Code', 'Courier New', monospace; font-size: 12px; color: var(--grey-60); }
.ds-swatch {
  width: 20px; height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,.08);
  flex-shrink: 0;
}
.ds-swatch--none { background: transparent; border: none; }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ds-header-cols { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
}
</style>
