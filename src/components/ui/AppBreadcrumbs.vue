<script setup>
/**
 * AppBreadcrumbs
 *
 * @prop items  Array<{ label: string, href?: string }> — navigation path, last item is current page
 */
defineProps({
  items: { type: Array, required: true },
})

const IconChevron = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
</script>

<template>
  <nav class="bc-nav" aria-label="Breadcrumb">
    <ol class="bc-list">
      <template v-for="(item, i) in items" :key="i">
        <li v-if="i < items.length - 1" class="bc-item">
          <a :href="item.href || '#'" class="bc-link" @click.prevent="item.href ? undefined : $event.preventDefault()">
            {{ item.label }}
          </a>
        </li>
        <li v-if="i < items.length - 1" class="bc-sep" aria-hidden="true" v-html="IconChevron" />
        <li v-else class="bc-item">
          <span class="bc-current" aria-current="page">{{ item.label }}</span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<style scoped>
/* matches bc-* from BreadcrumbsPage */
.bc-nav  { display: inline-block; }
.bc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
}
.bc-item { display: flex; align-items: center; }
.bc-sep  { display: flex; align-items: center; color: var(--grey-40); flex-shrink: 0; }

.bc-link {
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-60);
  text-decoration: none;
  padding: 2px 0;
  border-radius: 2px;
  transition: color 100ms;
}
.bc-link:hover { color: var(--grey-90); text-decoration: underline; }
.bc-link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

.bc-current {
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-90);
}
</style>
