<script setup>
import { ref } from 'vue'
import AppDataPoint from '../components/ui/AppDataPoint.vue'

// Live demo values
const assetId     = ref('DK 135 48')
const mileage     = ref('124 500 km')
const fleet       = ref('')
const category    = ref('Truck')
const description = ref('')

const fleetOptions = [
  { value: 'fleet-a', label: 'Fleet A — Nordic' },
  { value: 'fleet-b', label: 'Fleet B — Central EU' },
  { value: 'fleet-c', label: 'Fleet C — Southern' },
]

const categoryOptions = [
  { value: 'truck',      label: 'Truck' },
  { value: 'van',        label: 'Van' },
  { value: 'trailer',    label: 'Trailer' },
  { value: 'passenger',  label: 'Passenger car' },
]
</script>

<template>
  <main class="ds-main">

    <!-- Title -->
    <section class="ds-section">
      <h1 class="ds-h1">Data Point</h1>
      <p class="ds-lead">Card and contextual variants · read-only and editable · text, link, tag values</p>
      <p class="ds-body">Data points display labelled values sourced from different parts of the system. Access (read / write) is controlled by roles &amp; permissions. Read-only data points display the value as plain text, a link, or a tag. Editable data points show a dark 2 px border and an Edit button on hover; clicking Edit switches the field to an inline input or dropdown with Save and Cancel actions.</p>
    </section>

    <!-- ── Live demo ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Live demo</h2>
      <p class="ds-body">Click Edit to modify the values inline. Changes are applied on Save and discarded on Cancel.</p>
      <div class="dp-demo-grid">
        <AppDataPoint label="Asset ID"      v-model="assetId"   :editable="true"  />
        <AppDataPoint label="Mileage"       v-model="mileage"   :editable="true"  />
        <AppDataPoint
          label="Fleet assignment"
          v-model="fleet"
          :editable="true"
          inputType="select"
          :options="fleetOptions"
          emptyText="Not assigned"
        />
        <AppDataPoint
          label="Category"
          v-model="category"
          :editable="true"
          inputType="select"
          :options="categoryOptions"
        />
        <AppDataPoint
          label="Status"
          value="Active"
          modelValue="Active"
          valueType="tag"
          tagType="success"
        />
        <AppDataPoint
          label="Tracker URL"
          modelValue="Open tracker"
          valueType="link"
          linkHref="#"
        />
      </div>
    </section>

    <!-- ── States: card / default ─────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">States — Card</h2>
      <div class="dp-states-grid">

        <div class="dp-state-card">
          <p class="dp-state-label">Default (read-only)</p>
          <AppDataPoint label="Label" modelValue="Data here" />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Editable — default</p>
          <AppDataPoint label="Label" modelValue="Data here" :editable="true" />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Editable — hover</p>
          <AppDataPoint label="Label" modelValue="Data here" :editable="true" forcedState="hover" />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Editing — text input</p>
          <AppDataPoint label="Label" modelValue="Data here" :editable="true" forcedState="editing" />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Editing — select</p>
          <AppDataPoint
            label="Label"
            modelValue="Option A"
            :editable="true"
            inputType="select"
            :options="[{value:'a', label:'Option A'},{value:'b', label:'Option B'},{value:'c', label:'Option C'}]"
            forcedState="editing"
          />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Empty state</p>
          <AppDataPoint label="Label" modelValue="" emptyText="Not provided" />
        </div>

      </div>
    </section>

    <!-- ── Value types ─────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Value types</h2>
      <div class="dp-states-grid">

        <div class="dp-state-card">
          <p class="dp-state-label">Text (default)</p>
          <AppDataPoint label="VIN" modelValue="WBA5A5C5XGD123456" />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Link</p>
          <AppDataPoint
            label="Tracker link"
            modelValue="View on map"
            valueType="link"
            linkHref="#"
          />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Tag — success</p>
          <AppDataPoint
            label="Status"
            modelValue="Active"
            valueType="tag"
            tagType="success"
          />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Tag — moderate</p>
          <AppDataPoint
            label="Driver status"
            modelValue="Driving"
            valueType="tag"
            tagType="moderate"
          />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Tag — warning</p>
          <AppDataPoint
            label="Maintenance"
            modelValue="Due soon"
            valueType="tag"
            tagType="warning"
          />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">With description</p>
          <AppDataPoint
            label="Registration"
            description="Vehicle registration plate"
            modelValue="DK 135 48"
          />
        </div>

      </div>
    </section>

    <!-- ── Sizes ───────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Sizes</h2>
      <div class="dp-states-grid">

        <div class="dp-state-card">
          <p class="dp-state-label">Small (sm)</p>
          <AppDataPoint label="Mileage" modelValue="124 500 km" size="sm" />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Medium (md) — default</p>
          <AppDataPoint label="Fleet" modelValue="Fleet A — Nordic" size="md" />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Large (lg)</p>
          <AppDataPoint label="Total assets" modelValue="2 847" size="lg" />
        </div>

        <div class="dp-state-card">
          <p class="dp-state-label">Small — editable, hover</p>
          <AppDataPoint label="Category" modelValue="Truck" size="sm" :editable="true" forcedState="hover" />
        </div>

      </div>
    </section>

    <!-- ── Contextual variant ──────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Variant — Contextual</h2>
      <p class="ds-body">Used in condensed views like data panels or property lists. Three columns: label, primary value (bold), and an optional secondary value.</p>
      <div class="dp-contextual-list">
        <AppDataPoint variant="contextual" label="Asset ID"      modelValue="DK 135 48"        secondary="Truck" />
        <AppDataPoint variant="contextual" label="Fleet"         modelValue="Fleet A — Nordic"  secondary="" />
        <AppDataPoint variant="contextual" label="Driver"        modelValue="Jana Novák"        secondary="Active" />
        <AppDataPoint variant="contextual" label="Mileage"       modelValue="124 500 km"        secondary="" />
        <AppDataPoint variant="contextual" label="Last location" modelValue=""                  emptyText="No data available" secondary="" />
        <AppDataPoint variant="contextual" label="Status"        modelValue="Maintenance"       secondary="Scheduled" />
      </div>
    </section>

    <!-- ── Usage ───────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Use card variant as the default for asset detail pages and form-like layouts.</li>
            <li>Use contextual variant in condensed side panels, tables, and overview rows.</li>
            <li>Use editable data points only for fields the current user has write access to.</li>
            <li>Show empty state text when a value is absent so the field remains legible.</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li><strong>Don't use an editable data point</strong> for actions with side-effects (e.g. sending a command) — use a dedicated form instead.</li>
            <li><strong>Don't mix read-only and editable</strong> card sizes within the same group — keep sizes consistent per section.</li>
            <li>Don't leave the emptyText blank on editable fields — users need to know a value can be added.</li>
          </ul>
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

/* Live demo grid */
.dp-demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 8px;
}

/* States grid */
.dp-states-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.dp-state-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dp-state-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--grey-60);
}

/* Contextual list */
.dp-contextual-list {
  display: flex;
  flex-direction: column;
  background: var(--color-surface-default);
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px var(--color-border-default);
  overflow: hidden;
}

.dp-contextual-list .dp--contextual:last-child {
  box-shadow: none;
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

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .dp-states-grid, .dp-demo-grid, .ds-usage-grid { grid-template-columns: 1fr; }
}
</style>
