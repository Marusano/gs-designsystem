<script setup>
/**
 * AppTopBar — GSFleet Design System
 * 56 px full-width application top bar.
 *
 * Figma: w6mC7PaMgtX4fbmagiDtAq · node 312:2687
 *
 * @prop {string}  userName             - Display name of logged-in user
 * @prop {string}  [userRole]           - Role subtitle shown below name (e.g. "Fleet Manager / Basic")
 * @prop {Array}   [breadcrumbs]        - [{label:string, href?:string}] — breadcrumb trail in left zone
 * @prop {boolean} [showSearch]         - Replace left zone with a search input
 * @prop {string}  [searchPlaceholder]  - Placeholder text for the search input
 * @prop {boolean} [showBell]           - Show notification bell icon button
 * @prop {boolean} [showHelp]           - Show help (?) icon button
 * @prop {string}  [companyName]        - Multi-company context: company name (all-caps label)
 * @prop {string}  [companyRole]        - Multi-company context: active role (e.g. "Basic / Driver")
 *
 * Emits:
 *   bell-click    — bell button clicked
 *   help-click    — help (?) button clicked
 *   user-click    — user button clicked
 *   company-click — company context selector clicked
 *   search        — search input changed; payload: string value
 */
import { ref, computed } from 'vue'
import AppBreadcrumbs from './AppBreadcrumbs.vue'

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    default: null,
  },
  breadcrumbs: {
    type: Array,
    default: null,
  },
  showSearch: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'Search for page name or everything',
  },
  showBell: {
    type: Boolean,
    default: false,
  },
  showHelp: {
    type: Boolean,
    default: false,
  },
  companyName: {
    type: String,
    default: null,
  },
  companyRole: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['bell-click', 'help-click', 'user-click', 'company-click', 'search'])

const searchValue = ref('')
const searchFocused = ref(false)

const hasIcons = computed(() => props.showBell || props.showHelp)

function onSearchInput(e) {
  searchValue.value = e.target.value
  emit('search', e.target.value)
}
</script>

<template>
  <header class="topbar">

    <!-- ── Left zone: breadcrumbs or search ─────────────────── -->
    <div class="topbar__left">
      <template v-if="showSearch">
        <div :class="['topbar__search', { 'is-focused': searchFocused }]">
          <!-- Search icon -->
          <span class="topbar__search-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </span>
          <input
            class="topbar__search-input"
            type="search"
            :placeholder="searchPlaceholder"
            :value="searchValue"
            @input="onSearchInput"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
            aria-label="Search"
          />
        </div>
      </template>
      <AppBreadcrumbs v-else-if="breadcrumbs && breadcrumbs.length" :items="breadcrumbs" />
    </div>

    <!-- ── Right zone ────────────────────────────────────────── -->
    <div class="topbar__right">

      <!-- Notification bell -->
      <button
        v-if="showBell"
        class="topbar__icon-btn"
        type="button"
        aria-label="Notifications"
        @click="emit('bell-click')"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
      </button>

      <!-- Help -->
      <button
        v-if="showHelp"
        class="topbar__icon-btn"
        type="button"
        aria-label="Help"
        @click="emit('help-click')"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9.2034 7.39594C10.1269 6.17873 11.7183 5.67706 13.1729 6.14454C14.6276 6.61201 15.6288 7.94679 15.6702 9.47413C15.7099 10.9351 14.8633 12.2677 13.5184 12.8666L13.3319 12.9437C13.1481 13.0083 13.0211 13.1725 13.0007 13.3614L12.9986 13.4437C13.0298 13.9951 12.6082 14.4674 12.0568 14.4987C11.5054 14.53 11.033 14.1083 11.0017 13.5569C10.9387 12.4455 11.6182 11.4263 12.643 11.0663C13.2773 10.8238 13.6894 10.2072 13.6709 9.52843C13.6525 8.84961 13.2075 8.25638 12.561 8.04861C11.9607 7.85568 11.308 8.03415 10.8891 8.49377L10.7968 8.60479C10.4629 9.04477 9.83563 9.13083 9.39564 8.79702C8.95564 8.46321 8.86958 7.83592 9.2034 7.39594ZM12.0001 15.9999C12.5129 15.9999 12.9356 16.386 12.9934 16.8833L13.0001 17.0099C13.0001 17.5622 12.5524 18.0099 12.0001 18.0099C11.4872 18.0099 11.0646 17.6239 11.0068 17.1265L11.0001 16.9999C11.0001 16.4476 11.4478 15.9999 12.0001 15.9999Z"/>
        </svg>
      </button>

      <!-- Divider: after icon buttons, before user/context section -->
      <span v-if="hasIcons" class="topbar__divider" aria-hidden="true" />

      <!-- Company context selector -->
      <template v-if="companyName">
        <button
          class="topbar__context-btn"
          type="button"
          aria-label="Switch company context"
          @click="emit('company-click')"
        >
          <span class="topbar__context-body">
            <span class="topbar__context-company">{{ companyName }}</span>
            <span class="topbar__context-role">{{ companyRole }}</span>
          </span>
          <svg class="topbar__chevron" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>
        <span class="topbar__divider" aria-hidden="true" />
      </template>

      <!-- User button -->
      <button
        class="topbar__user-btn"
        type="button"
        @click="emit('user-click')"
      >
        <span class="topbar__user-body">
          <span class="topbar__user-name">{{ userName }}</span>
          <span v-if="userRole" class="topbar__user-role">{{ userRole }}</span>
        </span>
        <svg class="topbar__chevron" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </button>

    </div>
  </header>
</template>

<style scoped>
/* ─────────────────────────────────────────────────────────────
   SHELL
───────────────────────────────────────────────────────────── */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 56px;
  padding: 0 16px;
  background: var(--color-surface-default);
  /* Bottom border via box-shadow — no layout shift */
  box-shadow: inset 0 -1px 0 var(--grey-20);
  font-family: 'Inter', sans-serif;
  width: 100%;
  box-sizing: border-box;
}

/* ─────────────────────────────────────────────────────────────
   LEFT ZONE
───────────────────────────────────────────────────────────── */
.topbar__left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
}

/* ── Search input ── */
.topbar__search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  max-width: 560px;
  width: 100%;
  padding: 0 var(--field-px, 12px);
  background: var(--field-bg, var(--grey-00));
  border-radius: var(--field-radius, 4px);
  /* Use box-shadow for border — matches project convention */
  box-shadow: inset 0 0 0 1px var(--field-border, var(--grey-30));
  transition: box-shadow 120ms;
  box-sizing: border-box;
}

.topbar__search.is-focused {
  box-shadow: inset 0 0 0 2px var(--field-focus-border, var(--grey-80));
}

.topbar__search-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--field-placeholder, var(--grey-70));
}

.topbar__search-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Inter', sans-serif;
  font-size: var(--field-font-size, 14px);
  color: var(--field-text, var(--grey-90));
  line-height: 1;

  /* Remove native search clear button */
  -webkit-appearance: none;
  appearance: none;
}

.topbar__search-input::placeholder {
  color: var(--field-placeholder, var(--grey-70));
}

.topbar__search-input::-webkit-search-cancel-button,
.topbar__search-input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

/* ─────────────────────────────────────────────────────────────
   RIGHT ZONE
───────────────────────────────────────────────────────────── */
.topbar__right {
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
}

/* ── Vertical divider ── */
.topbar__divider {
  display: block;
  width: 1px;
  height: 24px;
  background: var(--grey-20);
  margin: 0 8px;
  flex-shrink: 0;
}

/* ── Icon buttons (bell, help) ── */
.topbar__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--btn-radius, 4px);
  cursor: pointer;
  color: var(--btn-quiet-text, var(--grey-70));
  transition: background 120ms, color 120ms;
  flex-shrink: 0;
}

.topbar__icon-btn:hover {
  background: var(--btn-quiet-hover-bg, var(--grey-20));
  color: var(--btn-quiet-hover-text, var(--grey-90));
}

.topbar__icon-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 1px;
}

.topbar__icon-btn:active {
  background: var(--btn-quiet-active-bg, var(--grey-20));
  color: var(--btn-quiet-active-text, var(--grey-90));
}

/* ── Company context selector ── */
.topbar__context-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 10px;
  background: transparent;
  border: none;
  border-radius: var(--btn-radius, 4px);
  cursor: pointer;
  text-align: left;
  font-family: 'Inter', sans-serif;
  transition: background 120ms;
  flex-shrink: 0;
}

.topbar__context-btn:hover { background: var(--grey-10); }
.topbar__context-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 1px;
}

.topbar__context-body {
  display: flex;
  flex-direction: column;
  gap: 1px;
  align-items: flex-start;
}

.topbar__context-company {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-60);
  line-height: 1.2;
  white-space: nowrap;
}

.topbar__context-role {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-80);
  line-height: 1.2;
  white-space: nowrap;
}

/* ── User button ── */
.topbar__user-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 10px;
  background: transparent;
  border: none;
  border-radius: var(--btn-radius, 4px);
  cursor: pointer;
  text-align: left;
  font-family: 'Inter', sans-serif;
  transition: background 120ms;
  flex-shrink: 0;
}

.topbar__user-btn:hover { background: var(--grey-10); }
.topbar__user-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 1px;
}
.topbar__user-btn:active { background: var(--grey-20); }

.topbar__user-body {
  display: flex;
  flex-direction: column;
  gap: 1px;
  align-items: flex-start;
}

.topbar__user-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--grey-80);
  line-height: 1.2;
  white-space: nowrap;
}

.topbar__user-role {
  font-size: 11px;
  font-weight: 400;
  color: var(--grey-70);
  line-height: 1.2;
  white-space: nowrap;
}

/* ── Chevron icon shared by user + context buttons ── */
.topbar__chevron {
  flex-shrink: 0;
  color: var(--grey-60);
}
</style>
