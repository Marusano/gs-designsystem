<script setup>
import { ref } from 'vue'
import ButtonsPage    from './pages/ButtonsPage.vue'
import ColorsPage     from './pages/ColorsPage.vue'
import IconsPage      from './pages/IconsPage.vue'
import TypographyPage from './pages/TypographyPage.vue'
import FormsPage      from './pages/FormsPage.vue'

const page = ref('buttons')

const IconColors     = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="4.5" cy="4.5" r="3" fill="#39ade3"/><circle cx="9.5" cy="4.5" r="3" fill="#f9c74f"/><circle cx="7" cy="9" r="3" fill="#64d074"/></svg>`
const IconIcons      = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>`
const IconButton     = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="12" height="6" rx="2" stroke="currentColor" stroke-width="1.25"/></svg>`
const IconTypography = `<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M1 2.5h5v1.25H4.25v7H2.75v-7H1V2.5zm6 3h4v1H9.75v4H8.25v-4H7V5.5z"/></svg>`
const IconForms      = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="3" rx="1" stroke="currentColor" stroke-width="1.1"/><rect x="1" y="8" width="12" height="3" rx="1" stroke="currentColor" stroke-width="1.1"/></svg>`
</script>

<template>
  <div class="ds-app">

    <!-- ── Top bar ──────────────────────────────────────────── -->
    <header class="ds-header">
      <div class="ds-header__brand">
        <svg width="140" height="28" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="GSFleet" style="display:block;flex-shrink:0">
          <g clip-path="url(#clip0_967_4609)">
            <path d="M76.7677 40.0714C76.4615 62.814 60.8335 79.1372 38.6545 79.1372C16.4312 79.1372 0 62.8605 0 40.6817C0 18.5754 16.2744 2.23767 38.4075 2.23767C56.8251 2.23767 72.2372 13.6235 75.6436 29.7666H62.8672C59.6309 20.2348 50.0361 14.0158 38.6545 14.0158C23.3888 14.0158 12.6077 25.0152 12.6077 40.6787C12.6077 56.4323 23.096 67.3561 38.6545 67.3561C50.7076 67.3561 60.5066 60.6693 63.3272 50.5854H36.4063V40.0684L76.7677 40.0714Z" fill="white"/>
            <path d="M83.2831 54.3778H95.8583C95.8583 62.6716 102.807 67.2545 111.659 67.2545C119.697 67.2545 126.566 63.1104 126.566 56.2871C126.566 48.9058 118.481 47.043 109.376 44.9419C97.8181 42.1841 84.561 39.0514 84.561 23.7424C84.561 10.3543 94.888 2.44983 110.981 2.44983C127.367 2.44983 137.063 11.2173 137.063 25.2099H124.809C124.809 17.8112 118.586 13.8037 110.702 13.8037C103.175 13.8037 96.9528 17.1893 96.9528 23.2251C96.9528 30.0776 104.715 31.9403 113.681 34.0414C125.424 36.9038 139.25 40.2051 139.25 56.1505C139.25 70.9916 127.057 78.8786 111.767 78.8786C94.8274 78.8786 83.2831 69.5386 83.2831 54.3778Z" fill="white"/>
            <path d="M163.254 14.9865V35.9826H191.617V47.1389H163.254V77.7423H150.863V3.55701H194.422V14.9865H163.254Z" fill="white"/>
            <path d="M204.036 0H216.011V77.7423H204.036V0Z" fill="white"/>
            <path d="M285.699 49.2632C285.699 50.5506 285.593 51.838 285.452 53.1253H238.17C239.666 62.4014 246.462 68.1031 256.001 68.1031C262.961 68.1031 268.597 64.9413 271.676 59.722H284.284C279.647 71.8053 269.011 79.1373 256.002 79.1373C238.972 79.1373 226.071 66.22 226.071 49.1266C226.071 32.0043 238.939 19.1189 256.002 19.1189C273.833 19.1189 285.702 32.6087 285.702 49.2632H285.699ZM238.469 43.5674H273.694C271.544 34.8754 264.875 29.7433 256.001 29.7433C246.992 29.7433 240.43 35.0788 238.469 43.5674Z" fill="white"/>
            <path d="M351.063 49.2632C351.063 50.5506 350.957 51.838 350.816 53.1253H303.534C305.03 62.4014 311.826 68.1031 321.365 68.1031C328.325 68.1031 333.961 64.9413 337.04 59.722H349.648C345.011 71.8053 334.375 79.1373 321.366 79.1373C304.336 79.1373 291.435 66.22 291.435 49.1266C291.435 32.0043 304.303 19.1189 321.366 19.1189C339.197 19.1189 351.066 32.6087 351.066 49.2632H351.063ZM303.833 43.5674H339.058C336.908 34.8754 330.239 29.7433 321.365 29.7433C312.356 29.7433 305.794 35.0788 303.833 43.5674Z" fill="white"/>
            <path d="M375.352 39.2604H363.386V30.601H352.966V28.3095L373.231 7.1518L375.382 7.14856" fill="#B3E1F7"/>
            <path d="M392.921 67.0543V77.7373H384.045C371.262 77.7373 363.386 70.0003 363.386 57.3533V46.9807H375.382V56.4308C375.382 63.2452 379.229 67.0543 386.287 67.0543H392.921Z" fill="white"/>
            <path d="M400 36.9768V39.2682H383.158V27.5436H390.973L400 36.9768Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_967_4609"><rect width="400" height="79.1372" fill="white"/></clipPath>
          </defs>
        </svg>
        <span class="ds-header__divider">|</span>
        <span class="ds-header__title">Design System</span>
      </div>
      <span class="ds-header__badge">v0.1.0</span>
    </header>

    <!-- ── Body: sidebar + content ─────────────────────────── -->
    <div class="ds-body">

      <aside class="ds-sidebar">
        <div class="ds-sidebar__group">
          <p class="ds-sidebar__group-label">Foundations</p>
          <button @click="page = 'colors'" :class="['ds-sidebar__item', { active: page === 'colors' }]">
            <span class="ds-sidebar__item-icon" v-html="IconColors" />
            Colors
          </button>
          <button @click="page = 'typography'" :class="['ds-sidebar__item', { active: page === 'typography' }]">
            <span class="ds-sidebar__item-icon" v-html="IconTypography" />
            Typography
          </button>
          <button @click="page = 'icons'" :class="['ds-sidebar__item', { active: page === 'icons' }]">
            <span class="ds-sidebar__item-icon" v-html="IconIcons" />
            Icons
          </button>
        </div>

        <div class="ds-sidebar__group">
          <p class="ds-sidebar__group-label">Components</p>
          <button @click="page = 'buttons'" :class="['ds-sidebar__item', { active: page === 'buttons' }]">
            <span class="ds-sidebar__item-icon" v-html="IconButton" />
            Button
          </button>
          <button @click="page = 'forms'" :class="['ds-sidebar__item', { active: page === 'forms' }]">
            <span class="ds-sidebar__item-icon" v-html="IconForms" />
            Input / Forms
          </button>
        </div>
      </aside>

      <div class="ds-content">
        <ButtonsPage    v-if="page === 'buttons'" />
        <FormsPage      v-if="page === 'forms'" />
        <ColorsPage     v-if="page === 'colors'" />
        <TypographyPage v-if="page === 'typography'" />
        <IconsPage      v-if="page === 'icons'" />
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Shell ────────────────────────────────────────────────────── */
.ds-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--grey-05);
}

/* ── Header ───────────────────────────────────────────────────── */
.ds-header {
  height: 56px;
  background: #010028;
  color: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-shrink: 0;
}

.ds-header__brand  { display: flex; align-items: center; gap: 12px; }
.ds-header__divider { color: #5d6065; font-size: 18px; }
.ds-header__title  { font-size: 14px; color: #b0b2b7; font-weight: 400; }
.ds-header__badge  {
  font-size: 11px; font-weight: 600; color: #b0b2b7;
  background: rgba(255,255,255,.08); padding: 3px 8px; border-radius: 20px;
}

/* ── Body ─────────────────────────────────────────────────────── */
.ds-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

/* ── Sidebar ──────────────────────────────────────────────────── */
.ds-sidebar {
  width: 220px;
  background: #fff;
  border-right: 1px solid var(--grey-20);
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
  overflow-y: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.ds-sidebar__group { padding: 20px 0 4px; }
.ds-sidebar__group + .ds-sidebar__group { border-top: 1px solid var(--grey-10); }

.ds-sidebar__group-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--grey-50);
  padding: 0 16px 6px;
}

.ds-sidebar__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 400;
  color: var(--grey-70);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  transition: background 100ms, color 100ms;
  position: relative;
}

.ds-sidebar__item:hover {
  background: var(--grey-05);
  color: var(--grey-90);
}

.ds-sidebar__item.active {
  background: var(--blue-azure-10);
  color: var(--blue-azure-80);
  font-weight: 500;
}

.ds-sidebar__item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--blue-azure-70);
  border-radius: 0 2px 2px 0;
}

.ds-sidebar__item-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0.65;
}

/* ── Content ──────────────────────────────────────────────────── */
.ds-content {
  flex: 1;
  min-width: 0;
  background: var(--grey-05);
  overflow-y: auto;
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-sidebar { display: none; }
  .ds-header  { padding: 0 20px; }
}
</style>
