<script setup>
import { ref } from 'vue'
import AppTopBar      from '../components/ui/AppTopBar.vue'
import AppAccountMenu from '../components/ui/AppAccountMenu.vue'

/* ── Interactive example state ─────────────────────────────── */
const helpOpen   = ref(false)
const userOpen   = ref(false)
const lastEvent  = ref(null)
const accountTab = ref('default')

function handleBell()    { lastEvent.value = 'bell-click'; helpOpen.value = false; userOpen.value = false }
function handleHelp()    { helpOpen.value = !helpOpen.value; userOpen.value = false; lastEvent.value = 'help-click' }
function handleUser()    { userOpen.value = !userOpen.value; helpOpen.value = false; lastEvent.value = 'user-click' }
function handleCompany() { lastEvent.value = 'company-click' }
function handleSearch(v) { lastEvent.value = `search: "${v}"` }

const IconHelp     = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-3 2-3 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>`
const IconExternal = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 1.5h8M9.5 1.5v8M1.5 9.5l8-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Title ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Top bar</h1>
      <p class="ds-lead">56 px application shell — breadcrumbs · search · notifications · user profile</p>
      <p class="ds-body">The top bar spans the full width at the top of every application page. It anchors breadcrumb navigation (or a search input) on the left, and exposes notification, help, and user actions on the right. A company context selector appears when the user belongs to multiple organisations.</p>
    </section>

    <!-- ── Interactive example ──────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component Usage</h2>

      <div class="tpb-demo-wrap">
        <!-- Live component -->
        <div class="tpb-demo-topbar">
          <AppTopBar
            user-name="Aaro Saarinnen"
            user-role="Fleet Manager / Basic"
            :breadcrumbs="[{label:'Settings',href:'#'},{label:'User Management',href:'#'},{label:'Aaro Saarinen'}]"
            :show-bell="true"
            :show-help="true"
            @bell-click="handleBell"
            @help-click="handleHelp"
            @user-click="handleUser"
          />
        </div>

        <!-- Help dropdown (shown as overlay below top bar) -->
        <div class="tpb-dropdown-zone">
          <div v-if="helpOpen" class="tpb-dropdown tpb-dropdown--help">
            <a href="#" class="tpb-dropdown-item" @click.prevent="helpOpen = false">
              Help Center
              <span v-html="IconExternal" class="tpb-dropdown-icon-right" />
            </a>
            <a href="#" class="tpb-dropdown-item" @click.prevent="helpOpen = false">
              GSFleet Manager website
              <span v-html="IconExternal" class="tpb-dropdown-icon-right" />
            </a>
          </div>
          <div v-if="userOpen" class="tpb-account-wrap">
            <!-- Tab selector -->
            <div class="tpb-account-tabs">
              <button
                v-for="tab in ['default','login-as','context']" :key="tab"
                class="tpb-account-tab"
                :class="{ 'tpb-account-tab--active': accountTab === tab }"
                @click="accountTab = tab"
              >{{ tab === 'default' ? 'Default' : tab === 'login-as' ? 'With login as' : 'With context' }}</button>
            </div>

            <AppAccountMenu
              :variant="accountTab"
              user-name="Aaro Saarinnen"
              user-email="aaro@gsfleet.io"
              login-as-name="Elisabeth B. Keen"
              login-as-email="elisabeth@nicecompany.com"
              company-initials="GS"
              company-name="GSFLEET"
              company-role="Fleet Manager / Basic"
              @account-click="userOpen = false; lastEvent = 'account-click'"
              @feedback-click="userOpen = false; lastEvent = 'feedback-click'"
              @logout-click="userOpen = false; lastEvent = 'logout-click'"
              @switch-click="userOpen = false; lastEvent = 'switch-click'"
              @context-click="lastEvent = 'context-click'"
            />
          </div>
        </div>

        <div class="tpb-demo-hint">
          Click <strong v-html="IconHelp" style="display:inline-flex;vertical-align:middle;margin:0 2px" /> or <strong>Aaro Saarinnen</strong> to open the dropdowns.
          <span v-if="lastEvent" class="tpb-last-event">Last event: <code>{{ lastEvent }}</code></span>
        </div>
      </div>
    </section>

    <!-- ── Variants ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>
      <div class="tpb-variants">

        <!-- Plain -->
        <div class="tpb-variant">
          <p class="tpb-variant-label">Plain — user only</p>
          <AppTopBar user-name="Aaro Saarinnen" />
        </div>

        <!-- Primary / 1 action -->
        <div class="tpb-variant">
          <p class="tpb-variant-label">Breadcrumbs · help · user</p>
          <AppTopBar
            user-name="Aaro Saarinnen"
            :breadcrumbs="[{label:'Settings'}]"
            :show-help="true"
          />
        </div>

        <!-- Primary / 2 actions + role -->
        <div class="tpb-variant">
          <p class="tpb-variant-label">Breadcrumbs · bell · help · user with role</p>
          <AppTopBar
            user-name="Aaro Saarinnen"
            user-role="Fleet Manager / Basic"
            :breadcrumbs="[{label:'Settings'}]"
            :show-bell="true"
            :show-help="true"
          />
        </div>

        <!-- Primary / w context -->
        <div class="tpb-variant">
          <p class="tpb-variant-label">Breadcrumbs · bell · help · company context · user</p>
          <AppTopBar
            user-name="Aaro Saarinnen"
            :breadcrumbs="[{label:'Settings'}]"
            :show-bell="true"
            :show-help="true"
            company-name="NICE COMPANY"
            company-role="Basic / Driver"
          />
        </div>

        <!-- Multi-level breadcrumbs -->
        <div class="tpb-variant">
          <p class="tpb-variant-label">Deep breadcrumbs · bell · help · user with role</p>
          <AppTopBar
            user-name="Aaro Saarinnen"
            user-role="Fleet Manager / Basic"
            :breadcrumbs="[{label:'Settings',href:'#'},{label:'User Management',href:'#'},{label:'Aaro Saarinen'}]"
            :show-bell="true"
            :show-help="true"
          />
        </div>

        <!-- Search, idle -->
        <div class="tpb-variant">
          <p class="tpb-variant-label">Search (idle) · bell · help · user with role</p>
          <AppTopBar
            user-name="Aaro Saarinnen"
            user-role="Fleet Manager / Basic"
            :show-search="true"
            :show-bell="true"
            :show-help="true"
          />
        </div>

        <!-- Search, focused -->
        <div class="tpb-variant">
          <p class="tpb-variant-label">Search (click to focus) · user only</p>
          <AppTopBar
            user-name="Aaro Saarinnen"
            :show-search="true"
            search-placeholder="Typing here…"
          />
        </div>

      </div>
    </section>

    <!-- ── Props ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Props</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>userName</code> <span class="ds-required">required</span></td>
              <td><code>String</code></td>
              <td>—</td>
              <td>Display name of the logged-in user</td>
            </tr>
            <tr>
              <td><code>userRole</code></td>
              <td><code>String</code></td>
              <td><code>null</code></td>
              <td>Optional role subtitle shown below the user name (e.g. "Fleet Manager / Basic")</td>
            </tr>
            <tr>
              <td><code>breadcrumbs</code></td>
              <td><code>Array</code></td>
              <td><code>null</code></td>
              <td>Navigation path: <code>[{ label: string, href?: string }]</code>. Omit to show a plain bar with no left-zone content.</td>
            </tr>
            <tr>
              <td><code>showSearch</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>Replace the left zone with a search input. Mutually exclusive with <code>breadcrumbs</code>.</td>
            </tr>
            <tr>
              <td><code>searchPlaceholder</code></td>
              <td><code>String</code></td>
              <td><code>"Search for page name or everything"</code></td>
              <td>Placeholder text for the search input</td>
            </tr>
            <tr>
              <td><code>showBell</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>Show the notification bell icon button</td>
            </tr>
            <tr>
              <td><code>showHelp</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>Show the help (?) icon button</td>
            </tr>
            <tr>
              <td><code>companyName</code></td>
              <td><code>String</code></td>
              <td><code>null</code></td>
              <td>Shows a company context selector. Displayed in all-caps above <code>companyRole</code>.</td>
            </tr>
            <tr>
              <td><code>companyRole</code></td>
              <td><code>String</code></td>
              <td><code>null</code></td>
              <td>Active role within the selected company (e.g. "Basic / Driver")</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Events ────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Events</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Event</th><th>Payload</th><th>When fired</th></tr>
          </thead>
          <tbody>
            <tr><td><code>bell-click</code></td><td>—</td><td>Notification bell button clicked</td></tr>
            <tr><td><code>help-click</code></td><td>—</td><td>Help (?) button clicked</td></tr>
            <tr><td><code>user-click</code></td><td>—</td><td>User menu button clicked</td></tr>
            <tr><td><code>company-click</code></td><td>—</td><td>Company context selector clicked</td></tr>
            <tr><td><code>search</code></td><td><code>string</code></td><td>Search input value changes</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Usage ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Keep the top bar present and consistent on every application page.</li>
            <li>Use breadcrumbs to reflect the user's current location in the navigation hierarchy.</li>
            <li>Show the user's name so they always know which account they are operating under.</li>
            <li>Add <code>userRole</code> when the application is role-sensitive — it saves users from having to guess their permissions.</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li><strong>Don't place page-level actions in the top bar.</strong> Primary actions belong in the page header or toolbar.</li>
            <li><strong>Don't show both breadcrumbs and search simultaneously.</strong> Pass either <code>breadcrumbs</code> or <code>showSearch</code>, not both.</li>
            <li>Don't add icons or decorations to the breadcrumb trail — text-only keeps it scannable.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Formatting ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <div class="ds-formatting-body">
        <p class="ds-body"><strong>Breadcrumbs.</strong> The left zone shows the navigation path via the <code>AppBreadcrumbs</code> component. The current page is always the rightmost item, rendered in a darker weight. Ancestor levels are styled as links.</p>
        <p class="ds-body"><strong>Search.</strong> When <code>showSearch</code> is true the left zone renders a search input that emits a <code>search</code> event on every keystroke. Use it for global/page-level search. The input gains a 2 px focus ring on focus, matching the standard field convention.</p>
        <p class="ds-body"><strong>Notification bell.</strong> Optional. Set <code>showBell</code> to add the bell action. The parent is responsible for opening the notifications panel on <code>bell-click</code>.</p>
        <p class="ds-body"><strong>Help.</strong> Optional. Set <code>showHelp</code> to add the help (?) button. Handle <code>help-click</code> to open a dropdown with Help Center and product links.</p>
        <p class="ds-body"><strong>Company context selector.</strong> Shown only when the user belongs to multiple organisations. Pass both <code>companyName</code> and <code>companyRole</code>. It appears to the left of the user button, separated by a divider.</p>
        <p class="ds-body"><strong>User button.</strong> Always present. Shows the user's name; when <code>userRole</code> is set, the role is displayed on a second line. Handle <code>user-click</code> to open the profile dropdown.</p>
      </div>
    </section>

    <!-- ── Interaction ───────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction</h2>
      <div class="ds-interaction-grid">
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Mouse</p>
          <ul class="ds-usage-list">
            <li>Click a breadcrumb ancestor to navigate to that level</li>
            <li>Click bell / help / user / company buttons — each fires its event</li>
            <li>Click outside an open dropdown to dismiss it (parent responsibility)</li>
          </ul>
        </div>
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Keyboard</p>
          <ul class="ds-usage-list">
            <li><kbd>Tab</kbd> — moves focus through breadcrumb links, then action buttons</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> — activates the focused button or link</li>
            <li><kbd>Esc</kbd> — parent should close the active dropdown on this key</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Tokens ────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Tokens</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Element</th><th>Property</th><th>Token</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>Top bar</td><td>Background</td><td><code>--color-surface-default</code></td><td>#ffffff</td></tr>
            <tr><td>Top bar</td><td>Height</td><td>—</td><td>56 px</td></tr>
            <tr><td>Top bar</td><td>Border bottom</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
            <tr><td>Breadcrumb — ancestor</td><td>Color</td><td><code>--grey-60</code></td><td>#9c9ea3</td></tr>
            <tr><td>Breadcrumb — current</td><td>Color</td><td><code>--grey-90</code></td><td>#36383b</td></tr>
            <tr><td>Search input</td><td>Border (default)</td><td><code>--grey-30</code></td><td>#d8d8da</td></tr>
            <tr><td>Search input</td><td>Border (focus, 2 px)</td><td><code>--grey-80</code></td><td>#5d6065</td></tr>
            <tr><td>Icon buttons</td><td>Color</td><td><code>--grey-70</code></td><td>#6f7176</td></tr>
            <tr><td>Icon buttons</td><td>Hover bg</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
            <tr><td>User name</td><td>Color</td><td><code>--grey-80</code></td><td>#5d6065</td></tr>
            <tr><td>User role</td><td>Color</td><td><code>--grey-70</code></td><td>#6f7176</td></tr>
            <tr><td>Dividers</td><td>Color</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead    { font-size: 16px; color: var(--grey-70); margin-top: -8px; }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

/* ── Interactive demo ────────────────────────────────────────── */
.tpb-demo-wrap {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: visible;
  position: relative;
}

.tpb-demo-topbar {
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.tpb-demo-hint {
  padding: 16px 20px;
  font-size: 13px;
  color: var(--grey-70);
  background: var(--grey-05);
  border-top: 1px solid var(--grey-10);
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.tpb-last-event {
  margin-left: auto;
  font-size: 12px;
  color: var(--grey-60);
}
.tpb-last-event code {
  font-size: 11px;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  background: var(--grey-10);
  padding: 2px 5px;
  border-radius: 3px;
  color: var(--grey-80);
}

/* ── Dropdown simulation ─────────────────────────────────────── */
.tpb-dropdown-zone {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
}

.tpb-dropdown {
  position: absolute;
  top: 4px;
  right: 16px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,.14);
  padding: 4px;
  z-index: 10;
  min-width: 200px;
}
.tpb-dropdown--help { min-width: 220px; }
.tpb-dropdown--user { min-width: 220px; }

.tpb-dropdown-item {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  border-radius: 3px;
  font-size: 13px;
  color: var(--grey-90);
  cursor: pointer;
  text-decoration: none;
  gap: 10px;
  transition: background 80ms;
}
.tpb-dropdown-item:hover { background: var(--grey-05); }
.tpb-dropdown-item--danger { color: var(--red-70); }

.tpb-dropdown-icon-right {
  margin-left: auto;
  color: var(--grey-50);
  display: inline-flex;
  align-items: center;
}
.tpb-dropdown-icon {
  display: inline-flex;
  align-items: center;
  color: var(--grey-60);
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}
.tpb-dropdown-item--danger .tpb-dropdown-icon { color: var(--red-70); }

/* ── Account menu variant selector ──────────────────────────── */
.tpb-account-wrap {
  position: absolute;
  top: 4px;
  right: 16px;
  z-index: 10;
}

.tpb-account-tabs {
  display: flex;
  gap: 0;
  border: 1px solid var(--grey-20);
  border-radius: 6px 6px 0 0;
  border-bottom: none;
  overflow: hidden;
  width: fit-content;
  background: var(--grey-05);
}
.tpb-account-tab {
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  color: var(--grey-60);
  background: none;
  border: none;
  border-right: 1px solid var(--grey-20);
  cursor: pointer;
  transition: background 100ms, color 100ms;
  white-space: nowrap;
}
.tpb-account-tab:last-child { border-right: none; }
.tpb-account-tab:hover { background: var(--grey-10); color: var(--grey-80); }
.tpb-account-tab--active {
  background: #fff;
  color: var(--grey-90);
  font-weight: 500;
}

/* acm border-radius override: top-left is square when tabs sit above */
.tpb-account-wrap .acm { border-radius: 0 4px 4px 4px; }

/* ── Variants ────────────────────────────────────────────────── */
.tpb-variants { display: flex; flex-direction: column; gap: 12px; }

.tpb-variant {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
}

.tpb-variant-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--grey-70);
  background: var(--grey-05);
  padding: 8px 16px;
  border-bottom: 1px solid var(--grey-10);
}

/* ── Required badge ──────────────────────────────────────────── */
.ds-required {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: var(--red-70);
  background: var(--red-10);
  padding: 1px 5px;
  border-radius: 3px;
  margin-left: 5px;
  vertical-align: middle;
}

/* ── Usage / Formatting / Interaction ────────────────────────── */
.ds-usage-grid       { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-usage-card       { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; padding-top: 0; overflow: hidden; }
.ds-usage-card--do   { border-top: 3px solid var(--green-60); }
.ds-usage-card--dont { border-top: 3px solid var(--red-60); }
.ds-usage-card__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; padding-top: 16px; }
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }
.ds-usage-list { padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ds-usage-list li { font-size: 13px; color: var(--grey-80); line-height: 1.5; padding-left: 14px; position: relative; }
.ds-usage-list li::before { content: '·'; position: absolute; left: 0; color: var(--grey-50); }

.ds-formatting-body  { display: flex; flex-direction: column; gap: 12px; }
.ds-interaction-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-interaction-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-interaction-card__title { font-size: 13px; font-weight: 600; color: var(--grey-90); margin-bottom: 12px; }
kbd {
  display: inline-block;
  font-size: 11px;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  background: var(--grey-10);
  border: 1px solid var(--grey-30);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-80);
}

/* ── Tokens table ────────────────────────────────────────────── */
.ds-table-wrap   { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-guide-table  { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-guide-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 10px 16px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-guide-table tbody td { padding: 12px 16px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-80); }
.ds-guide-table tbody tr:last-child td { border-bottom: none; }
.ds-guide-table code { font-size: 11px; font-family: 'SFMono-Regular', 'Consolas', monospace; color: var(--grey-80); background: var(--grey-05); padding: 2px 5px; border-radius: 3px; }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-usage-grid, .ds-interaction-grid { grid-template-columns: 1fr; }
}
</style>
