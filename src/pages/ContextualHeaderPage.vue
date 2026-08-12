<script setup>
import AppContextualHeader from '../components/ui/AppContextualHeader.vue'
import AppPageHeader       from '../components/ui/AppPageHeader.vue'
import AppButton           from '../components/ui/AppButton.vue'
import AppTag              from '../components/ui/AppTag.vue'

const IconChevronDown = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconDots        = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>`
</script>

<template>
  <div class="ch-page">

    <div class="ch-page__header">
      <h1 class="ch-page__title">Contextual Header</h1>
      <p class="ch-page__desc">A persistent key-data banner displayed on secondary pages, directly below the Page Header. Maintains user orientation by showing essential entity identifiers (ID, name, status) while navigating tabs or sections.</p>
    </div>

    <!-- ─── Variants ─────────────────────────────────────────── -->
    <section class="ch-page__section">
      <h2 class="ch-page__section-title">Variants</h2>

      <div class="ch-page__row">
        <span class="ch-page__row-label">5 items · no status</span>
        <AppContextualHeader :items="[
          { label: 'Asset id',       value: 'DK 123 24' },
          { label: 'Type',           value: 'Truck + trailer' },
          { label: 'Current driver', value: 'Elisabeth B. Keen' },
          { label: 'Linked device',  value: '123456788', href: '#' },
          { label: 'Last seen',      value: '16:45:48 Today' },
        ]" />
      </div>

      <div class="ch-page__row">
        <span class="ch-page__row-label">5 items · with status</span>
        <AppContextualHeader
          :items="[
            { label: 'Asset id',       value: 'DK 123 24' },
            { label: 'Type',           value: 'Truck + trailer' },
            { label: 'Current driver', value: 'Elisabeth B. Keen' },
            { label: 'Linked device',  value: '123456788', href: '#' },
            { label: 'Last seen',      value: '16:45:48 Today' },
          ]"
          statusLabel="Status"
        >
          <template #status>
            <AppTag type="success-strong" size="sm">Driving</AppTag>
          </template>
        </AppContextualHeader>
      </div>

      <div class="ch-page__row">
        <span class="ch-page__row-label">6 items · with status</span>
        <AppContextualHeader
          :items="[
            { label: 'Asset id',       value: 'DK 123 24' },
            { label: 'Type',           value: 'Truck + trailer' },
            { label: 'Current driver', value: 'Elisabeth B. Keen' },
            { label: 'Linked device',  value: '123456788', href: '#' },
            { label: 'Last seen',      value: '16:45:48 Today' },
            { label: 'Location',       value: 'Helsinki, FI' },
          ]"
          statusLabel="Status"
        >
          <template #status>
            <AppTag type="success-strong" size="sm">Driving</AppTag>
          </template>
        </AppContextualHeader>
      </div>
    </section>

    <!-- ─── In context ───────────────────────────────────────── -->
    <section class="ch-page__section">
      <h2 class="ch-page__section-title">In context</h2>

      <div class="ch-page__row">
        <span class="ch-page__row-label">Secondary page header + contextual header</span>
        <AppPageHeader
          type="secondary"
          state="main"
          title="The blue truck"
          subtitle="DK 124 23 / Volvo 124"
        >
          <template #actions>
            <AppButton variant="tertiary" size="md">
              Action here
              <template #icon-right><span v-html="IconChevronDown" /></template>
            </AppButton>
            <AppButton variant="primary" size="md">Main action here</AppButton>
            <AppButton variant="quiet"   size="md">
              <template #icon-left><span v-html="IconDots" /></template>
            </AppButton>
          </template>
        </AppPageHeader>
        <AppContextualHeader
          :items="[
            { label: 'Asset id',       value: 'DK 123 24' },
            { label: 'Type',           value: 'Truck + trailer' },
            { label: 'Current driver', value: 'Elisabeth B. Keen' },
            { label: 'Linked device',  value: '123456788', href: '#' },
            { label: 'Last seen',      value: '16:45:48 Today' },
          ]"
          statusLabel="Status"
        >
          <template #status>
            <AppTag type="success-strong" size="sm">Driving</AppTag>
          </template>
        </AppContextualHeader>
      </div>
    </section>

  </div>
</template>

<style scoped>
.ch-page {
  padding: 40px;
  max-width: 1200px;
}

.ch-page__header {
  margin-bottom: 40px;
}

.ch-page__title {
  font-size: 28px;
  font-weight: 600;
  color: var(--grey-100);
  margin-bottom: 8px;
}

.ch-page__desc {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 20px;
  max-width: 640px;
}

.ch-page__section {
  margin-bottom: 48px;
}

.ch-page__section-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--grey-50);
  margin-bottom: 16px;
}

.ch-page__row {
  margin-bottom: 24px;
}

.ch-page__row-label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: var(--grey-60);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
