<script setup>
import AppButton from '../components/ui/AppButton.vue'
</script>

<template>
  <main class="ds-main">

    <section class="ds-section">
      <h1 class="ds-h1">Test</h1>
      <p class="ds-lead">Scratch page for trying out components</p>
    </section>

    <section class="ds-section">
      <h2 class="ds-h2">Buttons</h2>
      <div class="pg-row">
        <AppButton variant="primary">Primary</AppButton>
        <AppButton variant="quiet">Quiet</AppButton>
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

.pg-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
}
</style>
