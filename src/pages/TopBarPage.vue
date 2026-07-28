<script setup>
import { ref } from 'vue'

const helpOpen = ref(false)
const userOpen = ref(false)

function toggleHelp() {
  helpOpen.value = !helpOpen.value
  if (helpOpen.value) userOpen.value = false
}
function toggleUser() {
  userOpen.value = !userOpen.value
  if (userOpen.value) helpOpen.value = false
}
</script>

<template>
  <main class="ds-main">

    <!-- Title -->
    <section class="ds-section">
      <h1 class="ds-h1">Top bar</h1>
      <p class="ds-lead">Breadcrumb navigation · help menu · user profile</p>
      <p class="ds-body">The top bar spans the full width at the top of every application page. It anchors breadcrumb navigation on the left and exposes the help menu and user profile on the right. Optionally it includes a notification bell and a company/role selector for multi-role accounts.</p>
    </section>

    <!-- Interactive example -->
    <section class="ds-section">
      <h2 class="ds-h2">Example</h2>
      <div class="tpb-demo-wrap">
        <div class="tpb-bar">
          <nav class="tpb-breadcrumb" aria-label="Breadcrumb">
            <span class="tpb-crumb tpb-crumb--link">Settings</span>
            <span class="tpb-sep">›</span>
            <span class="tpb-crumb tpb-crumb--link">User Management</span>
            <span class="tpb-sep">›</span>
            <span class="tpb-crumb tpb-crumb--current">Aaro Saarinen</span>
          </nav>
          <div class="tpb-right">
            <!-- Help -->
            <div class="tpb-popover-wrap">
              <button class="tpb-icon-btn" :class="{ 'is-active': helpOpen }" @click="toggleHelp" aria-label="Help">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/>
                  <path d="M6.5 6a1.5 1.5 0 1 1 2.12 1.37C8.2 7.6 8 8 8.5 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                  <circle cx="8" cy="11" r=".75" fill="currentColor"/>
                </svg>
              </button>
              <div v-if="helpOpen" class="tpb-dropdown tpb-dropdown--help">
                <a href="#" class="tpb-dropdown-item" @click.prevent>
                  Help Center
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 1.5h8M9.5 1.5v8M1.5 9.5l8-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                </a>
                <a href="#" class="tpb-dropdown-item" @click.prevent>
                  GSFleet Manager website
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 1.5h8M9.5 1.5v8M1.5 9.5l8-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                </a>
              </div>
            </div>
            <!-- User -->
            <div class="tpb-popover-wrap">
              <button class="tpb-user-btn" :class="{ 'is-active': userOpen }" @click="toggleUser">
                Aaro Saarinen
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div v-if="userOpen" class="tpb-dropdown tpb-dropdown--user">
                <div class="tpb-user-header">
                  <p class="tpb-user-name">Elisabeth Keen</p>
                  <p class="tpb-user-email">elisabeth@email.com</p>
                </div>
                <div class="tpb-divider"></div>
                <button class="tpb-dropdown-item" @click="userOpen = false">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="currentColor" stroke-width="1.1"/><path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
                  My account
                </button>
                <button class="tpb-dropdown-item" @click="userOpen = false">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9.5l1.5-4 6-3.5 1.5 2.5-6 4.5L2 9.5z" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Send feedback
                </button>
                <div class="tpb-divider"></div>
                <button class="tpb-dropdown-item tpb-dropdown-item--danger" @click="userOpen = false">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 7h6M9 5l2 2-2 2M8.5 2.5H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="tpb-demo-hint">
          Click <strong>?</strong> or <strong>Aaro Saarinen</strong> to open the dropdowns.
        </div>
      </div>
    </section>

    <!-- Variants -->
    <section class="ds-section">
      <h2 class="ds-h2">Variants</h2>
      <div class="tpb-variants-list">

        <div class="tpb-variant-card">
          <p class="tpb-variant-label">Plain — user menu only</p>
          <div class="tpb-bar">
            <div class="tpb-right">
              <button class="tpb-user-btn">
                Aaro Saarinen
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="tpb-variant-card">
          <p class="tpb-variant-label">1-level breadcrumb · help · user</p>
          <div class="tpb-bar">
            <nav class="tpb-breadcrumb">
              <span class="tpb-crumb tpb-crumb--current">Settings</span>
            </nav>
            <div class="tpb-right">
              <button class="tpb-icon-btn" aria-label="Help">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 6a1.5 1.5 0 1 1 2.12 1.37C8.2 7.6 8 8.5 8.5 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="11" r=".75" fill="currentColor"/></svg>
              </button>
              <button class="tpb-user-btn">
                Aaro Saarinen
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="tpb-variant-card">
          <p class="tpb-variant-label">1-level breadcrumb · notifications · help · user with role</p>
          <div class="tpb-bar">
            <nav class="tpb-breadcrumb">
              <span class="tpb-crumb tpb-crumb--current">Settings</span>
            </nav>
            <div class="tpb-right">
              <button class="tpb-icon-btn" aria-label="Notifications">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a4.5 4.5 0 0 0-4.5 4.5V10l-1 1.5h11L12.5 10V6.5A4.5 4.5 0 0 0 8 2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" stroke-width="1.2"/></svg>
              </button>
              <button class="tpb-icon-btn" aria-label="Help">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 6a1.5 1.5 0 1 1 2.12 1.37C8.2 7.6 8 8.5 8.5 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="11" r=".75" fill="currentColor"/></svg>
              </button>
              <button class="tpb-user-btn tpb-user-btn--with-role">
                <span class="tpb-user-line">
                  <span class="tpb-user-main">Aaro Saarinen</span>
                  <span class="tpb-user-role">Fleet Manager / Basic</span>
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="tpb-variant-card">
          <p class="tpb-variant-label">1-level breadcrumb · notifications · help · company selector · user</p>
          <div class="tpb-bar">
            <nav class="tpb-breadcrumb">
              <span class="tpb-crumb tpb-crumb--current">Settings</span>
            </nav>
            <div class="tpb-right">
              <button class="tpb-icon-btn" aria-label="Notifications">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a4.5 4.5 0 0 0-4.5 4.5V10l-1 1.5h11L12.5 10V6.5A4.5 4.5 0 0 0 8 2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" stroke-width="1.2"/></svg>
              </button>
              <button class="tpb-icon-btn" aria-label="Help">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 6a1.5 1.5 0 1 1 2.12 1.37C8.2 7.6 8 8.5 8.5 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="11" r=".75" fill="currentColor"/></svg>
              </button>
              <button class="tpb-user-btn tpb-user-btn--company">
                <span class="tpb-user-line">
                  <span class="tpb-company-name">NICE COMPANY</span>
                  <span class="tpb-user-role">Basic / Driver</span>
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button class="tpb-user-btn">
                Aaro Saarinen
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="tpb-variant-card">
          <p class="tpb-variant-label">3-level breadcrumb · help · user</p>
          <div class="tpb-bar">
            <nav class="tpb-breadcrumb">
              <span class="tpb-crumb tpb-crumb--link">Settings</span>
              <span class="tpb-sep">›</span>
              <span class="tpb-crumb tpb-crumb--link">User Management</span>
              <span class="tpb-sep">›</span>
              <span class="tpb-crumb tpb-crumb--current">Aaro Saarinen</span>
            </nav>
            <div class="tpb-right">
              <button class="tpb-icon-btn" aria-label="Help">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 6a1.5 1.5 0 1 1 2.12 1.37C8.2 7.6 8 8.5 8.5 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="11" r=".75" fill="currentColor"/></svg>
              </button>
              <button class="tpb-user-btn">
                Aaro Saarinen
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Usage -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Keep the top bar present and consistent on every application page.</li>
            <li>Use breadcrumbs to reflect the user's current location in the navigation hierarchy.</li>
            <li>Show the user's name and role so they always know which account and permission level they are operating under.</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li><strong>Don't place page-level actions in the top bar.</strong> Primary actions belong in the page header or toolbar, not in the application shell.</li>
            <li><strong>Don't truncate the user name</strong> without a tooltip — the full name helps users confirm the correct account.</li>
            <li>Don't add icons or decorations to the breadcrumb trail — text-only keeps it scannable.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Formatting -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <div class="ds-formatting-body">
        <p class="ds-body"><strong>Breadcrumbs.</strong> The left zone shows the navigation path as a series of text links separated by a chevron. The current page is always the rightmost item and is rendered in a darker, heavier weight. Ancestor levels are styled as links.</p>
        <p class="ds-body"><strong>Help section.</strong> The help icon button opens a small dropdown with links to the Help Center and the GSFleet Manager website. Both links open in a new tab.</p>
        <p class="ds-body"><strong>User menu.</strong> The user button shows the logged-in username. For multi-role accounts it also shows the role on a second line. Clicking it opens a dropdown with the full name, email, account links, and a logout action.</p>
        <p class="ds-body"><strong>Notifications.</strong> When enabled, a bell icon sits to the left of the help button. It is optional and only present on pages where notification context is relevant.</p>
        <p class="ds-body"><strong>Company selector.</strong> Shown only when the user belongs to multiple companies. Appears between the help icon and the user button, and allows switching context without logging out.</p>
      </div>
    </section>

    <!-- Interaction -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction</h2>
      <div class="ds-interaction-grid">
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Mouse</p>
          <ul class="ds-usage-list">
            <li>Click a breadcrumb ancestor to navigate to that level</li>
            <li>Click <strong>?</strong> to open or close the help dropdown</li>
            <li>Click the user button to open or close the profile dropdown</li>
            <li>Click anywhere outside a dropdown to dismiss it</li>
          </ul>
        </div>
        <div class="ds-interaction-card">
          <p class="ds-interaction-card__title">Keyboard</p>
          <ul class="ds-usage-list">
            <li><kbd>Tab</kbd> — moves focus through breadcrumb links, then the icon buttons</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> — activates the focused button or link</li>
            <li><kbd>Esc</kbd> — closes the open dropdown and returns focus to the trigger</li>
            <li><kbd>↓</kbd> / <kbd>↑</kbd> — moves between items inside an open dropdown</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tokens -->
    <section class="ds-section">
      <h2 class="ds-h2">Tokens</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr>
              <th>Element</th>
              <th>Property</th>
              <th>CSS variable</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Top bar</td><td>Background</td><td><code>—</code></td><td>#ffffff</td></tr>
            <tr><td>Top bar</td><td>Border bottom</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
            <tr><td>Top bar</td><td>Height</td><td><code>—</code></td><td>48px</td></tr>
            <tr><td>Breadcrumb — ancestor</td><td>Color</td><td><code>--grey-70</code></td><td>#6f7176</td></tr>
            <tr><td>Breadcrumb — current</td><td>Color</td><td><code>--grey-100</code></td><td>#1f2124</td></tr>
            <tr><td>Breadcrumb separator</td><td>Color</td><td><code>--grey-30</code></td><td>#d0d1d3</td></tr>
            <tr><td>Icon button</td><td>Border</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
            <tr><td>Icon button</td><td>Icon color</td><td><code>--grey-70</code></td><td>#6f7176</td></tr>
            <tr><td>Icon button — hover</td><td>Background</td><td><code>--grey-05</code></td><td>#f7f7f8</td></tr>
            <tr><td>User button</td><td>Border</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
            <tr><td>User button</td><td>Text color</td><td><code>--grey-90</code></td><td>#36383b</td></tr>
            <tr><td>User role label</td><td>Color</td><td><code>--grey-70</code></td><td>#6f7176</td></tr>
            <tr><td>Dropdown</td><td>Background</td><td><code>—</code></td><td>#ffffff</td></tr>
            <tr><td>Dropdown</td><td>Border</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
            <tr><td>Dropdown item — hover</td><td>Background</td><td><code>--grey-05</code></td><td>#f7f7f8</td></tr>
            <tr><td>Dropdown item — danger</td><td>Color</td><td><code>--red-60</code></td><td>#f94144</td></tr>
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

/* ── Top bar component ────────────────────────────────────────── */
.tpb-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: #fff;
  box-shadow: inset 0 -1px 0 var(--grey-20);
  position: relative;
}

/* Breadcrumb */
.tpb-breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow: hidden;
}

.tpb-crumb {
  font-size: 14px;
  white-space: nowrap;
}

.tpb-crumb--link {
  color: var(--grey-70);
  cursor: pointer;
}
.tpb-crumb--link:hover { color: var(--grey-90); }

.tpb-crumb--current {
  color: var(--grey-100);
  font-weight: 600;
}

.tpb-sep {
  color: var(--grey-30);
  font-size: 14px;
  user-select: none;
}

/* Right side */
.tpb-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Icon button (help, bell) */
.tpb-icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--grey-70);
  box-shadow: inset 0 0 0 1px var(--grey-20);
  transition: background 120ms, color 120ms;
}
.tpb-icon-btn:hover,
.tpb-icon-btn.is-active {
  background: var(--grey-05);
  color: var(--grey-90);
}

/* User button */
.tpb-user-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  border: none;
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--grey-20);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--grey-90);
  cursor: pointer;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  transition: background 120ms;
}
.tpb-user-btn:hover,
.tpb-user-btn.is-active {
  background: var(--grey-05);
}

.tpb-user-btn--with-role,
.tpb-user-btn--company {
  height: 36px;
  align-items: center;
}

.tpb-user-line {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.tpb-user-main   { font-size: 13px; font-weight: 500; color: var(--grey-90); line-height: 1.2; }
.tpb-user-role   { font-size: 11px; font-weight: 400; color: var(--grey-70); line-height: 1.2; }
.tpb-company-name { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); line-height: 1.2; }

/* Popover anchor */
.tpb-popover-wrap { position: relative; }

/* Dropdowns */
.tpb-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: #fff;
  box-shadow: inset 0 0 0 1px var(--grey-20), 0 4px 16px rgba(0,0,0,.1);
  border-radius: 8px;
  padding: 4px;
  z-index: 100;
  min-width: 200px;
}

.tpb-dropdown--help { min-width: 210px; }
.tpb-dropdown--user { min-width: 220px; padding-bottom: 4px; }

.tpb-user-header {
  padding: 12px 12px 10px;
}
.tpb-user-name  { font-size: 13px; font-weight: 600; color: var(--grey-100); margin-bottom: 2px; }
.tpb-user-email { font-size: 12px; color: var(--grey-70); }

.tpb-divider {
  height: 1px;
  background: var(--grey-10);
  margin: 4px 0;
}

.tpb-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  color: var(--grey-80);
  cursor: pointer;
  text-align: left;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  justify-content: space-between;
  transition: background 100ms;
}
.tpb-dropdown-item:hover { background: var(--grey-05); }

.tpb-dropdown-item--danger { color: var(--red-60); }
.tpb-dropdown-item--danger:hover { background: var(--red-10); }

/* Demo wrapper */
.tpb-demo-wrap {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: visible;
}
.tpb-demo-wrap > .tpb-bar {
  border-radius: 8px 8px 0 0;
}
.tpb-demo-hint {
  padding: 20px 20px;
  font-size: 13px;
  color: var(--grey-70);
  background: var(--grey-05);
  border-top: 1px solid var(--grey-10);
  border-radius: 0 0 8px 8px;
}

/* Variants list */
.tpb-variants-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tpb-variant-card {
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
}
.tpb-variant-card > .tpb-bar {
  box-shadow: none;
  border-bottom: 1px solid var(--grey-10);
}

.tpb-variant-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--grey-70);
  background: var(--grey-05);
  padding: 8px 16px;
}

/* Usage cards */
.ds-usage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-usage-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; padding-top: 0; overflow: hidden; }
.ds-usage-card--do   { border-top: 3px solid var(--green-60); }
.ds-usage-card--dont { border-top: 3px solid var(--red-60); }
.ds-usage-card__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; padding-top: 16px; }
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }
.ds-usage-list { padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ds-usage-list li { font-size: 13px; color: var(--grey-80); line-height: 1.5; padding-left: 14px; position: relative; }
.ds-usage-list li::before { content: '·'; position: absolute; left: 0; color: var(--grey-50); }

/* Formatting */
.ds-formatting-body { display: flex; flex-direction: column; gap: 12px; }

/* Interaction */
.ds-interaction-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-interaction-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-interaction-card__title { font-size: 13px; font-weight: 600; color: var(--grey-90); margin-bottom: 12px; }
kbd { display: inline-block; font-size: 11px; font-family: 'SFMono-Regular', 'Consolas', monospace; background: var(--grey-10); border: 1px solid var(--grey-30); border-radius: 3px; padding: 1px 5px; color: var(--grey-80); }

/* Guide table */
.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-guide-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-guide-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 10px 16px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-guide-table tbody td { padding: 12px 16px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-80); font-size: 13px; line-height: 1.5; }
.ds-guide-table tbody tr:last-child td { border-bottom: none; }
.ds-guide-table code { font-size: 11px; font-family: 'SFMono-Regular', 'Consolas', monospace; color: var(--grey-80); background: var(--grey-05); padding: 2px 5px; border-radius: 3px; }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-usage-grid, .ds-interaction-grid { grid-template-columns: 1fr; }
}
</style>
