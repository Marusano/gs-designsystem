<script setup>
/**
 * AppPageHeader — GSFleet Design System
 * Full-width page header: title, optional subtitle, optional logo, right-side actions.
 *
 * Figma: w6mC7PaMgtX4fbmagiDtAq · nodes 312:2123, 1217:4827
 *
 * @prop {string}  type       - 'primary' | 'secondary' — secondary adds a back-arrow button
 * @prop {string}  state      - 'main' | 'welcome' | 'viewing' — controls title weight & colour
 * @prop {string}  title      - Page title text. For 'viewing' state this is the entity name
 *                              shown after the muted "Viewing" prefix.
 * @prop {string}  [subtitle] - Optional subtitle line below the title
 * @prop {boolean} [logo]     - Show a 48 × 48 brand-logo avatar before the title
 *
 * Slots:
 *   #logo    — Custom logo content (default: indigo-30 placeholder square)
 *   #actions — Right-side action buttons (use AppButton)
 *
 * Emits:
 *   back — fired when the secondary back-arrow button is clicked
 */

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary'].includes(v),
  },
  state: {
    type: String,
    default: 'main',
    validator: (v) => ['main', 'welcome', 'viewing'].includes(v),
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: null,
  },
  logo: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['back'])
</script>

<template>
  <div class="ph" :class="[`ph--${type}`, `ph--${state}`]">

    <!-- ── Left zone ─────────────────────────────────────────── -->
    <div class="ph__left">

      <!-- Brand logo (opt-in via :logo="true") -->
      <div v-if="logo" class="ph__logo">
        <slot name="logo">
          <div class="ph__logo-bg" aria-hidden="true">
            <img
              src="https://www.figma.com/api/mcp/asset/38fc372d-8738-47b2-a4de-f955107d2448.svg"
              alt=""
              width="27"
              height="27"
            />
          </div>
        </slot>
      </div>

      <!-- Back button (secondary type only) -->
      <button
        v-if="type === 'secondary'"
        class="ph__back"
        type="button"
        aria-label="Go back"
        @click="emit('back')"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      <!-- Title + subtitle block -->
      <div class="ph__text">

        <!-- Viewing: two-tone "Viewing Entity" -->
        <div v-if="state === 'viewing'" class="ph__title ph__title--viewing">
          <span class="ph__viewing-prefix">Viewing</span>
          <span class="ph__viewing-entity"> {{ title }}</span>
        </div>

        <!-- Welcome / main: plain title with per-state weight -->
        <div v-else class="ph__title" :class="`ph__title--${state}`">{{ title }}</div>

        <div v-if="subtitle" class="ph__subtitle">{{ subtitle }}</div>
      </div>

    </div>

    <!-- ── Right zone: action buttons ───────────────────────── -->
    <div v-if="$slots.actions" class="ph__actions">
      <slot name="actions" />
    </div>

  </div>
</template>

<style scoped>
/* ─── Root ──────────────────────────────────────────────────── */
.ph {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 74px;
  padding: 11px 16px;
  background: var(--color-surface-default);
  /* Bottom divider via box-shadow — avoids layout shift */
  box-shadow: inset 0 -1px 0 var(--color-border-default);
  font-family: 'Inter', sans-serif;
  width: 100%;
  box-sizing: border-box;
}

/* ─── Left zone ─────────────────────────────────────────────── */
.ph__left {
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
}

/* Logo avatar */
.ph__logo {
  flex-shrink: 0;
  margin-right: 15px;
}

.ph__logo-bg {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background: var(--indigo-30);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Back button */
.ph__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: 0;
  margin-right: 4px;
  background: transparent;
  border: none;
  border-radius: var(--btn-radius, 4px);
  cursor: pointer;
  color: var(--grey-70);
  transition: background 120ms ease, color 120ms ease;
}

.ph__back:hover {
  background: var(--grey-10);
  color: var(--grey-90);
}

.ph__back:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Text block */
.ph__text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

/* ─── Title variants ────────────────────────────────────────── */
.ph__title {
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* welcome — semi-bold, strongest text colour */
.ph__title--welcome {
  font-weight: 600;
  color: var(--grey-100);
}

/* main — regular weight */
.ph__title--main {
  font-weight: 400;
  color: var(--grey-90);
}

/* viewing — two-tone spans */
.ph__title--viewing {
  font-weight: 400;
}

.ph__viewing-prefix {
  font-weight: 600;
  color: var(--grey-60);
}

.ph__viewing-entity {
  color: var(--grey-90);
}

/* ─── Subtitle ──────────────────────────────────────────────── */
.ph__subtitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: var(--grey-70);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── Right zone ────────────────────────────────────────────── */
.ph__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
</style>
