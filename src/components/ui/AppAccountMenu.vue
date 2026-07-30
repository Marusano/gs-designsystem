<script setup>
/**
 * AppAccountMenu — GSFleet Design System
 * Figma: w6mC7PaMgtX4fbmagiDtAq · node 3803:18876
 *
 * Dropdown menu triggered from the user button in AppTopBar.
 * Three variants cover default auth, impersonation, and multi-company contexts.
 *
 * @prop {string}  variant         - 'default' | 'login-as' | 'context'
 * @prop {string}  userName        - Authenticated user's display name
 * @prop {string}  userEmail       - Authenticated user's email
 * @prop {string}  [loginAsName]   - Impersonated user's name  (login-as variant)
 * @prop {string}  [loginAsEmail]  - Impersonated user's email (login-as variant)
 * @prop {string}  [companyInitials] - 1–2 letter avatar initials (context variant)
 * @prop {string}  [companyName]   - Company name — displayed all-caps (context variant)
 * @prop {string}  [companyRole]   - Active role / module (context variant)
 *
 * Emits:
 *   account-click  — "My account" row clicked
 *   feedback-click — "Send feedback" row clicked
 *   logout-click   — "Logout" row clicked
 *   switch-click   — "Switch to your account" button clicked (login-as variant)
 *   context-click  — Company context row clicked (context variant)
 */

import AppButton from './AppButton.vue'

defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'login-as', 'context'].includes(v),
  },
  userName:         { type: String, required: true },
  userEmail:        { type: String, required: true },
  loginAsName:      { type: String, default: null },
  loginAsEmail:     { type: String, default: null },
  companyInitials:  { type: String, default: null },
  companyName:      { type: String, default: null },
  companyRole:      { type: String, default: null },
})

const emit = defineEmits(['account-click', 'feedback-click', 'logout-click', 'switch-click', 'context-click'])
</script>

<template>
  <div class="acm">

    <!-- ── Header: user identity ─────────────────────────────── -->
    <div class="acm__header">
      <span class="acm__name">{{ variant === 'login-as' ? loginAsName : userName }}</span>
      <span class="acm__email">{{ variant === 'login-as' ? loginAsEmail : userEmail }}</span>
    </div>

    <!-- ── Login-as: real account info + switch button ──────── -->
    <template v-if="variant === 'login-as'">
      <div class="acm__divider" />
      <div class="acm__loginas">
        <span class="acm__loginas-label">Logged in as</span>
        <span class="acm__loginas-name">{{ userName }}</span>
        <span class="acm__loginas-email">{{ userEmail }}</span>
        <AppButton variant="primary" size="sm" @click="emit('switch-click')">
          Switch to your account
        </AppButton>
      </div>
    </template>

    <!-- ── Context: company selector row ────────────────────── -->
    <template v-if="variant === 'context'">
      <div class="acm__divider" />
      <button class="acm__context" type="button" @click="emit('context-click')">
        <div class="acm__context-avatar">{{ companyInitials }}</div>
        <div class="acm__context-info">
          <span class="acm__context-company">{{ companyName }}</span>
          <span class="acm__context-role">{{ companyRole }}</span>
        </div>
        <svg class="acm__context-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4.5 3l3 3-3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </template>

    <!-- ── Account actions ────────────────────────────────────── -->
    <div class="acm__divider" />
    <div class="acm__body">
      <button class="acm__item" type="button" @click="emit('account-click')">
        <svg class="acm__item-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.25"/>
          <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
        </svg>
        My account
      </button>
      <button class="acm__item" type="button" @click="emit('feedback-click')">
        <svg class="acm__item-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M14 2L2 7l5 2 2 5 5-12z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Send feedback
      </button>
    </div>
    <div class="acm__divider" />
    <div class="acm__body">
      <button class="acm__item acm__item--danger" type="button" @click="emit('logout-click')">
        <svg class="acm__item-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 11v2.5H2V2.5h8V5M7 8h7M14 8l-2-2M14 8l-2 2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Logout
      </button>
    </div>

  </div>
</template>

<style scoped>
/* ── Container ───────────────────────────────────────────────── */
.acm {
  display: flex;
  flex-direction: column;
  width: 297px;
  background: var(--color-surface-default, #fff);
  border-radius: var(--btn-radius, 4px);
  box-shadow: 0 4px 25px rgba(57, 57, 57, .25);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* ── Header ──────────────────────────────────────────────────── */
.acm__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  background: var(--grey-05);
}
.acm__name  { font-size: 14px; font-weight: 500; color: var(--grey-90); line-height: 1.3; }
.acm__email { font-size: 13px; font-weight: 400; color: var(--grey-80); line-height: 1.3; }

/* ── Divider ─────────────────────────────────────────────────── */
.acm__divider { height: 1px; background: var(--grey-20); flex-shrink: 0; }

/* ── Action body ─────────────────────────────────────────────── */
.acm__body { display: flex; flex-direction: column; padding: 4px; }

.acm__item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 30px;
  padding: 0 8px;
  background: transparent;
  border: none;
  border-radius: 2px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: var(--grey-90);
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background 80ms;
  box-sizing: border-box;
}
.acm__item:hover { background: var(--grey-10); }
.acm__item:focus-visible {
  outline: 2px solid var(--blue-azure-30);
  outline-offset: -1px;
}

.acm__item-icon {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--grey-80);
}

.acm__item--danger            { color: var(--red-80); }
.acm__item--danger .acm__item-icon { color: var(--red-80); }

/* ── Login-as section ────────────────────────────────────────── */
.acm__loginas {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
}
.acm__loginas-label { font-size: 14px; font-weight: 500; color: var(--grey-80); }
.acm__loginas-name  { font-size: 14px; font-weight: 400; color: var(--grey-70); }
.acm__loginas-email { font-size: 12px; font-weight: 400; color: var(--grey-70); }

/* ── Context section ─────────────────────────────────────────── */
.acm__context {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-family: 'Inter', sans-serif;
  transition: background 80ms;
}
.acm__context:hover { background: var(--grey-05); }
.acm__context:focus-visible {
  outline: 2px solid var(--blue-azure-30);
  outline-offset: -1px;
}

.acm__context-avatar {
  width: 28px;
  height: 28px;
  border-radius: var(--btn-radius, 4px);
  background: var(--grey-10);
  color: var(--grey-80);
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.acm__context-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
}

.acm__context-company {
  font-size: 12px;
  font-weight: 500;
  color: var(--grey-70);
  letter-spacing: .03em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.acm__context-role {
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-70);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.acm__context-chevron {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--grey-60);
}
</style>
