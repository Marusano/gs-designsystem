<script setup>
import AppButton from '../components/ui/AppButton.vue'

const variants = ['primary', 'secondary', 'tertiary', 'quiet', 'danger']
const sizes    = ['xl', 'md', 'sm', 'xs']
const states   = ['main', 'hover', 'focus', 'active', 'disabled']

const variantLabels = {
  primary:   'Primary',
  secondary: 'Secondary',
  tertiary:  'Tertiary',
  quiet:     'Quiet',
  danger:    'Danger',
}

const variantDescriptions = {
  primary:   'Main call-to-action. Use once per screen.',
  secondary: 'Negative action paired with a primary: Cancel, Back, Close. Never use alone or for positive actions.',
  tertiary:  'Less prominent positive/neutral actions. Often paired with primary.',
  quiet:     'Least pronounced: filters, standalone icons.',
  danger:    'Destructive actions (delete, remove).',
}

const sizeLabels = {
  xl: 'XL — 56px',
  md: 'MD — 40px',
  sm: 'SM — 36px',
  xs: 'XS — 32px',
}

const IconPlus     = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3.333v9.334M3.333 8h9.334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
const IconArrow    = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconArrowLeft= `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconTrash    = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.333 4V2.667h5.334V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333h8L12.667 4H3.333z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconDownload = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3M2.667 11.333v1.334A.667.667 0 003.333 13h9.334a.667.667 0 00.666-.667v-1.334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconMore     = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="3" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="13" cy="8" r="1.5" fill="currentColor"/></svg>`
const IconX        = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <section class="ds-section">
      <h1 class="ds-h1">Button</h1>
      <p class="ds-lead">5 variants · 4 sizes · 5 states · icon support</p>
    </section>

    <!-- States matrix -->
    <section class="ds-section">
      <h2 class="ds-h2">States × Variants</h2>
      <p class="ds-body">
        All interactive states shown side-by-side. <code>forcedState</code> prop used for
        documentation rendering — does not affect real interactivity.
      </p>
      <div class="ds-table-wrap">
        <table class="ds-state-table">
          <thead>
            <tr>
              <th class="ds-state-table__label">Variant</th>
              <th v-for="state in states" :key="state">{{ state }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="variant in variants" :key="variant">
              <td class="ds-state-table__label">
                <strong>{{ variantLabels[variant] }}</strong>
                <span>{{ variantDescriptions[variant] }}</span>
              </td>
              <td v-for="state in states" :key="state">
                <AppButton :variant="variant" size="md" :forced-state="state === 'main' ? null : state">
                  Button
                </AppButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Sizes -->
    <section class="ds-section">
      <h2 class="ds-h2">Sizes</h2>
      <p class="ds-body">Heights: XL 56px · MD 40px · SM 36px · XS 32px</p>
      <div class="ds-sizes-grid">
        <div v-for="variant in variants" :key="variant" class="ds-sizes-card">
          <p class="ds-sizes-card__title">{{ variantLabels[variant] }}</p>
          <div class="ds-sizes-row">
            <div v-for="size in sizes" :key="size" class="ds-sizes-item">
              <AppButton :variant="variant" :size="size">
                {{ sizeLabels[size].split(' ')[0] }}
              </AppButton>
              <span class="ds-sizes-item__label">{{ sizeLabels[size] }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Icon variants -->
    <section class="ds-section">
      <h2 class="ds-h2">Icon Variants</h2>
      <p class="ds-body">
        Use <code>#icon-left</code>, <code>#icon-right</code>, or both slots.
        Icon-only buttons should have an <code>aria-label</code>.
      </p>
      <div class="ds-icon-grid">
        <div class="ds-icon-group">
          <p class="ds-icon-group__label">Icon Left</p>
          <div class="ds-icon-row">
            <AppButton variant="primary"   size="md"><template #icon-left><span v-html="IconPlus"     /></template>Create</AppButton>
            <AppButton variant="secondary" size="md"><template #icon-left><span v-html="IconX"        /></template>Cancel</AppButton>
            <AppButton variant="tertiary"  size="md"><template #icon-left><span v-html="IconDownload" /></template>Export</AppButton>
            <AppButton variant="quiet"     size="md"><template #icon-left><span v-html="IconDownload" /></template>Download</AppButton>
            <AppButton variant="danger"    size="md"><template #icon-left><span v-html="IconTrash"    /></template>Delete</AppButton>
          </div>
        </div>
        <div class="ds-icon-group">
          <p class="ds-icon-group__label">Icon Right</p>
          <div class="ds-icon-row">
            <AppButton variant="primary"   size="md">Continue  <template #icon-right><span v-html="IconArrow"     /></template></AppButton>
            <AppButton variant="secondary" size="md"><template #icon-left><span v-html="IconArrowLeft"/></template>Back</AppButton>
            <AppButton variant="tertiary"  size="md">More      <template #icon-right><span v-html="IconArrow"     /></template></AppButton>
            <AppButton variant="quiet"     size="md">Options   <template #icon-right><span v-html="IconArrow"     /></template></AppButton>
            <AppButton variant="danger"    size="md">Remove    <template #icon-right><span v-html="IconTrash"     /></template></AppButton>
          </div>
        </div>
        <div class="ds-icon-group">
          <p class="ds-icon-group__label">Icon Both</p>
          <div class="ds-icon-row">
            <AppButton variant="primary"   size="md"><template #icon-left><span v-html="IconPlus"     /></template>Add Item   <template #icon-right><span v-html="IconArrow" /></template></AppButton>
            <AppButton variant="tertiary"  size="md"><template #icon-left><span v-html="IconDownload" /></template>Export All <template #icon-right><span v-html="IconArrow" /></template></AppButton>
            <AppButton variant="danger"    size="md"><template #icon-left><span v-html="IconTrash"    /></template>Delete All <template #icon-right><span v-html="IconArrow" /></template></AppButton>
          </div>
        </div>
        <div class="ds-icon-group">
          <p class="ds-icon-group__label">Icon Only</p>
          <div class="ds-icon-row">
            <AppButton variant="primary"   size="md" aria-label="Create">  <template #icon-left><span v-html="IconPlus"  /></template></AppButton>
            <AppButton variant="secondary" size="md" aria-label="Close">   <template #icon-left><span v-html="IconX"     /></template></AppButton>
            <AppButton variant="tertiary"  size="md" aria-label="Navigate"><template #icon-left><span v-html="IconArrow" /></template></AppButton>
            <AppButton variant="quiet"     size="md" aria-label="Options"> <template #icon-left><span v-html="IconMore"  /></template></AppButton>
            <AppButton variant="danger"    size="md" aria-label="Delete">  <template #icon-left><span v-html="IconTrash" /></template></AppButton>
          </div>
        </div>
        <div class="ds-icon-group">
          <p class="ds-icon-group__label">Icon Only — Sizes (Primary)</p>
          <div class="ds-icon-row" style="align-items:flex-end">
            <AppButton v-for="size in sizes" :key="size" variant="primary" :size="size" :aria-label="`Create (${size})`">
              <template #icon-left><span v-html="IconPlus" /></template>
            </AppButton>
          </div>
        </div>
        <div class="ds-icon-group">
          <p class="ds-icon-group__label">Icon Only — Sizes (Quiet)</p>
          <div class="ds-icon-row" style="align-items:flex-end">
            <AppButton v-for="size in sizes" :key="size" variant="quiet" :size="size" :aria-label="`Options (${size})`">
              <template #icon-left><span v-html="IconMore" /></template>
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Usage examples -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage Examples</h2>
      <div class="ds-examples">
        <div class="ds-example-card">
          <p class="ds-example-card__label">Dialog / Modal Footer</p>
          <div class="ds-example-card__body">
            <div class="ds-btn-group ds-btn-group--right">
              <AppButton variant="secondary" size="md">Cancel</AppButton>
              <AppButton variant="tertiary"  size="md">Save draft</AppButton>
              <AppButton variant="primary"   size="md">Publish</AppButton>
            </div>
          </div>
        </div>
        <div class="ds-example-card">
          <p class="ds-example-card__label">Destructive Confirmation</p>
          <div class="ds-example-card__body">
            <div class="ds-btn-group ds-btn-group--right">
              <AppButton variant="secondary" size="md">Cancel</AppButton>
              <AppButton variant="danger"    size="md">
                <template #icon-left><span v-html="IconTrash" /></template>
                Delete permanently
              </AppButton>
            </div>
          </div>
        </div>
        <div class="ds-example-card">
          <p class="ds-example-card__label">Multi-step Wizard</p>
          <div class="ds-example-card__body">
            <div class="ds-btn-group ds-btn-group--right">
              <AppButton variant="secondary" size="md">
                <template #icon-left><span v-html="IconArrowLeft" /></template>Back
              </AppButton>
              <AppButton variant="primary" size="md">
                Next<template #icon-right><span v-html="IconArrow" /></template>
              </AppButton>
            </div>
          </div>
        </div>
        <div class="ds-example-card">
          <p class="ds-example-card__label">Toolbar</p>
          <div class="ds-example-card__body">
            <div class="ds-btn-group">
              <AppButton variant="primary"  size="sm"><template #icon-left><span v-html="IconPlus"     /></template>Add vehicle</AppButton>
              <AppButton variant="tertiary" size="sm"><template #icon-left><span v-html="IconDownload" /></template>Export</AppButton>
              <AppButton variant="quiet"    size="sm" aria-label="More options"><template #icon-left><span v-html="IconMore" /></template></AppButton>
            </div>
          </div>
        </div>
        <div class="ds-example-card">
          <p class="ds-example-card__label">Hero / Full-width CTA</p>
          <div class="ds-example-card__body">
            <div class="ds-btn-group">
              <AppButton variant="primary"  size="xl">Get started<template #icon-right><span v-html="IconArrow" /></template></AppButton>
              <AppButton variant="tertiary" size="xl">Learn more</AppButton>
            </div>
          </div>
        </div>
        <div class="ds-example-card">
          <p class="ds-example-card__label">Disabled State in Context</p>
          <div class="ds-example-card__body">
            <div class="ds-btn-group">
              <AppButton variant="secondary" size="md" disabled>Cancel</AppButton>
              <AppButton variant="tertiary"  size="md" disabled>Save draft</AppButton>
              <AppButton variant="primary"   size="md" disabled>Submit form</AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Token reference -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <div class="ds-token-grid">
        <div v-for="variant in variants" :key="variant" class="ds-token-card">
          <p class="ds-token-card__title">{{ variantLabels[variant] }}</p>
          <table class="ds-token-table">
            <thead><tr><th>State</th><th>CSS Variable</th><th>Value</th></tr></thead>
            <tbody>
              <template v-if="variant === 'primary'">
                <tr><td>Main</td>       <td><code>--btn-primary-bg</code></td>           <td><span class="swatch" style="background:#010028"></span>#010028</td></tr>
                <tr><td>Hover</td>      <td><code>--btn-primary-hover</code></td>         <td><span class="swatch" style="background:#5d6065"></span>#5d6065</td></tr>
                <tr><td>Focus ring</td> <td><code>--btn-primary-ring-focus</code></td>   <td><span class="swatch" style="background:#b3e1f7"></span>#b3e1f7</td></tr>
                <tr><td>Active ring</td><td><code>--btn-primary-ring-active</code></td>  <td><span class="swatch" style="background:#61bde9"></span>#61bde9</td></tr>
                <tr><td>Disabled bg</td><td><code>--btn-disabled-bg</code></td>          <td><span class="swatch" style="background:#f1f1f2;border:1px solid #d8d8da"></span>#f1f1f2</td></tr>
              </template>
              <template v-if="variant === 'secondary'">
                <tr><td>Main border</td> <td><code>--btn-secondary-border</code></td>        <td><span class="swatch" style="background:#5d6065"></span>#5d6065</td></tr>
                <tr><td>Hover bg</td>    <td><code>--btn-secondary-hover-bg</code></td>      <td><span class="swatch" style="background:#f1f1f2;border:1px solid #d8d8da"></span>#f1f1f2</td></tr>
                <tr><td>Hover border</td><td><code>--btn-secondary-border-hover</code></td>  <td><span class="swatch" style="background:#36383b"></span>#36383b</td></tr>
                <tr><td>Focus ring</td>  <td><code>--btn-secondary-ring-focus</code></td>    <td><span class="swatch" style="background:#b3e1f7"></span>#b3e1f7</td></tr>
                <tr><td>Active ring</td> <td><code>--btn-secondary-ring-active</code></td>   <td><span class="swatch" style="background:#61bde9"></span>#61bde9</td></tr>
              </template>
              <template v-if="variant === 'tertiary'">
                <tr><td>Main border</td><td><code>--btn-tertiary-border</code></td>         <td><span class="swatch" style="background:#d8d8da"></span>#d8d8da</td></tr>
                <tr><td>Hover bg</td>   <td><code>--btn-tertiary-hover-bg</code></td>       <td><span class="swatch" style="background:#f1f1f2;border:1px solid #d8d8da"></span>#f1f1f2</td></tr>
                <tr><td>Active bg</td>  <td><code>--btn-tertiary-active-bg</code></td>      <td><span class="swatch" style="background:#e6e6e7;border:1px solid #d8d8da"></span>#e6e6e7</td></tr>
                <tr><td>Focus ring</td> <td><code>--btn-tertiary-ring-focus</code></td>     <td><span class="swatch" style="background:#b3e1f7"></span>#b3e1f7</td></tr>
                <tr><td>Active ring</td><td><code>--btn-tertiary-ring-active</code></td>    <td><span class="swatch" style="background:#61bde9"></span>#61bde9</td></tr>
              </template>
              <template v-if="variant === 'quiet'">
                <tr><td>Main</td>       <td><code>--btn-quiet-bg</code></td>               <td><span class="swatch" style="background:transparent;border:1px solid #d8d8da"></span>transparent</td></tr>
                <tr><td>Hover bg</td>   <td><code>--btn-quiet-hover-bg</code></td>         <td><span class="swatch" style="background:#e6e6e7"></span>#e6e6e7</td></tr>
                <tr><td>Focus bg</td>   <td><code>--btn-quiet-focus-bg</code></td>         <td><span class="swatch" style="background:#f1f1f2;border:1px solid #d8d8da"></span>#f1f1f2</td></tr>
                <tr><td>Focus ring</td> <td><code>--btn-quiet-ring-focus</code></td>       <td><span class="swatch" style="background:#b3e1f7"></span>#b3e1f7</td></tr>
                <tr><td>Active ring</td><td><code>--btn-quiet-ring-active</code></td>      <td><span class="swatch" style="background:#61bde9"></span>#61bde9</td></tr>
              </template>
              <template v-if="variant === 'danger'">
                <tr><td>Main</td>       <td><code>--btn-danger-bg</code></td>              <td><span class="swatch" style="background:#dc2626"></span>#dc2626</td></tr>
                <tr><td>Hover</td>      <td><code>--btn-danger-hover-bg</code></td>        <td><span class="swatch" style="background:#b91c1c"></span>#b91c1c</td></tr>
                <tr><td>Focus bg</td>   <td><code>--btn-danger-focus-bg</code></td>        <td><span class="swatch" style="background:#f94144"></span>#f94144</td></tr>
                <tr><td>Focus ring</td> <td><code>--btn-danger-ring-focus</code></td>      <td><span class="swatch" style="background:#fca5a5"></span>#fca5a5</td></tr>
                <tr><td>Active ring</td><td><code>--btn-danger-ring-active</code></td>     <td><span class="swatch" style="background:#f87171"></span>#f87171</td></tr>
              </template>
            </tbody>
          </table>
        </div>
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

.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-state-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-state-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 12px 20px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-state-table tbody td { padding: 16px 20px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; }
.ds-state-table tbody tr:last-child td { border-bottom: none; }
.ds-state-table tbody tr:hover > td { background: var(--grey-05); }
.ds-state-table__label { min-width: 200px; }
.ds-state-table__label strong { display: block; font-size: 13px; font-weight: 600; color: var(--grey-90); margin-bottom: 3px; }
.ds-state-table__label span   { display: block; font-size: 12px; color: var(--grey-60); line-height: 1.4; }

.ds-sizes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
.ds-sizes-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-sizes-card__title { font-size: 13px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 16px; }
.ds-sizes-row { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
.ds-sizes-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.ds-sizes-item__label { font-size: 11px; color: var(--grey-60); white-space: nowrap; }

.ds-icon-grid { display: flex; flex-direction: column; gap: 20px; background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 24px; }
.ds-icon-group__label { font-size: 12px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 12px; }
.ds-icon-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }

.ds-examples { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px; }
.ds-example-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.ds-example-card__label { font-size: 11px; font-weight: 600; color: var(--grey-60); text-transform: uppercase; letter-spacing: .07em; padding: 10px 16px; background: var(--grey-05); border-bottom: 1px solid var(--grey-20); }
.ds-example-card__body { padding: 24px 16px; }
.ds-btn-group { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ds-btn-group--right { justify-content: flex-end; }

.ds-token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 16px; }
.ds-token-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.ds-token-card__title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); padding: 12px 16px; background: var(--grey-05); border-bottom: 1px solid var(--grey-20); }
.ds-token-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.ds-token-table th { text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--grey-60); font-weight: 600; border-bottom: 1px solid var(--grey-10); }
.ds-token-table td { padding: 8px 12px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-80); }
.ds-token-table tr:last-child td { border-bottom: none; }
.ds-token-table code { font-size: 11px; font-family: 'SFMono-Regular', 'Consolas', monospace; color: var(--grey-80); background: var(--grey-05); padding: 2px 5px; border-radius: 3px; }

.swatch { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: middle; margin-right: 6px; flex-shrink: 0; }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-examples, .ds-sizes-grid, .ds-token-grid { grid-template-columns: 1fr; }
}
</style>
