<script setup>
import AppPageHeader from '../components/ui/AppPageHeader.vue'
import AppButton     from '../components/ui/AppButton.vue'

const IconChevronDown = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconDots        = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>`
</script>

<template>
  <div class="ph-page">

    <div class="ph-page__header">
      <h1 class="ph-page__title">Page Header</h1>
      <p class="ph-page__desc">Full-width header shown at the top of each content page. Supports three states (main, welcome, viewing) and two types (primary, secondary).</p>
    </div>

    <!-- ─── Primary / welcome ────────────────────────────────── -->
    <section class="ph-page__section">
      <h2 class="ph-page__section-title">Primary · Welcome</h2>

      <div class="ph-page__row">
        <span class="ph-page__row-label">Without logo</span>
        <AppPageHeader
          type="primary"
          state="welcome"
          title="Hello, Anna"
          subtitle="Welcome back to Fleet Manager"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">Button label here</AppButton>
            <AppButton variant="primary"  size="md">
              Add new
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
      </div>

      <div class="ph-page__row">
        <span class="ph-page__row-label">With logo</span>
        <AppPageHeader
          type="primary"
          state="welcome"
          title="Hello, Anna"
          subtitle="Welcome back to Fleet Manager"
          :logo="true"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">Button label here</AppButton>
            <AppButton variant="primary"  size="md">
              Add new
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
      </div>
    </section>

    <!-- ─── Primary / viewing ────────────────────────────────── -->
    <section class="ph-page__section">
      <h2 class="ph-page__section-title">Primary · Viewing</h2>

      <div class="ph-page__row">
        <span class="ph-page__row-label">2 actions</span>
        <AppPageHeader
          type="primary"
          state="viewing"
          title="Nice Company"
          subtitle="Your fleet in one place"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">Button label here</AppButton>
            <AppButton variant="primary"  size="md">
              Add new
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
      </div>

      <div class="ph-page__row">
        <span class="ph-page__row-label">3 actions</span>
        <AppPageHeader
          type="primary"
          state="viewing"
          title="Nice Company"
          subtitle="Your fleet in one place"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">
              Action here
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
            <AppButton variant="primary"  size="md">Main action here</AppButton>
            <AppButton variant="quiet"    size="md">
              <template #icon-left><span v-html="IconDots" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
      </div>
    </section>

    <!-- ─── Primary / main ───────────────────────────────────── -->
    <section class="ph-page__section">
      <h2 class="ph-page__section-title">Primary · Main</h2>

      <div class="ph-page__row">
        <span class="ph-page__row-label">With subtitle</span>
        <AppPageHeader
          type="primary"
          state="main"
          title="Page title here"
          subtitle="Subtitle here"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">
              Action here
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
            <AppButton variant="primary"  size="md">Main action here</AppButton>
            <AppButton variant="quiet"    size="md">
              <template #icon-left><span v-html="IconDots" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
      </div>

      <div class="ph-page__row">
        <span class="ph-page__row-label">Without subtitle</span>
        <AppPageHeader
          type="primary"
          state="main"
          title="Page title here"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">
              Action here
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
            <AppButton variant="primary"  size="md">Main action here</AppButton>
            <AppButton variant="quiet"    size="md">
              <template #icon-left><span v-html="IconDots" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
      </div>
    </section>

    <!-- ─── Secondary / main ─────────────────────────────────── -->
    <section class="ph-page__section">
      <h2 class="ph-page__section-title">Secondary · Main</h2>

      <div class="ph-page__row">
        <span class="ph-page__row-label">With subtitle · 3 actions</span>
        <AppPageHeader
          type="secondary"
          state="main"
          title="Secondary page title here"
          subtitle="Subtitle here if needed"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">
              Action here
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
            <AppButton variant="primary"  size="md">Main action here</AppButton>
            <AppButton variant="quiet"    size="md">
              <template #icon-left><span v-html="IconDots" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
      </div>

      <div class="ph-page__row">
        <span class="ph-page__row-label">Without subtitle · 3 actions</span>
        <AppPageHeader
          type="secondary"
          state="main"
          title="Secondary page title here"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">
              Action here
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
            <AppButton variant="primary"  size="md">Main action here</AppButton>
            <AppButton variant="quiet"    size="md">
              <template #icon-left><span v-html="IconDots" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
      </div>

      <div class="ph-page__row">
        <span class="ph-page__row-label">With subtitle · 1 action</span>
        <AppPageHeader
          type="secondary"
          state="main"
          title="Secondary page title here"
          subtitle="Subtitle here if needed"
        >
          <template #actions>
            <AppButton variant="primary" size="md">Button label</AppButton>
          </template>
        </AppPageHeader>
      </div>
    </section>

  </div>
</template>

<style scoped>
.ph-page {
  padding: 40px;
  max-width: 1200px;
}

.ph-page__header {
  margin-bottom: 40px;
}

.ph-page__title {
  font-size: 28px;
  font-weight: 600;
  color: var(--grey-100);
  margin-bottom: 8px;
}

.ph-page__desc {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 20px;
}

.ph-page__section {
  margin-bottom: 48px;
}

.ph-page__section-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--grey-50);
  margin-bottom: 16px;
}

.ph-page__row {
  margin-bottom: 24px;
}

.ph-page__row-label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: var(--grey-60);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
