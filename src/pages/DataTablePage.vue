<script setup>
import { ref } from 'vue'
import AppDataTable from '../components/ui/AppDataTable.vue'
import AppTag       from '../components/ui/AppTag.vue'

/* ── Sample data ─────────────────────────────────────────── */
const assetsColumns = [
  { key: 'name',    label: 'Display name',   bold: true },
  { key: 'assetId', label: 'Asset ID' },
  { key: 'type',    label: 'Type' },
  { key: 'driver',  label: 'Current driver' },
  { key: 'lastSeen',label: 'Last seen' },
  { key: 'status',  label: 'Status', align: 'right' },
]

const assets = [
  { id: 'a1', name: 'The blue truck',  assetId: 'DK 124 23', type: 'Truck',   driver: 'Elisabeth B. Keen', lastSeen: '10.09.2025 16:22', status: 'Driving',  statusType: 'success-strong' },
  { id: 'a2', name: 'Van 002',         assetId: 'DK 345 67', type: 'Van',     driver: 'John A. Smith',     lastSeen: '11.09.2025 09:15', status: 'Parked',   statusType: 'neutral-outline' },
  { id: 'a3', name: 'Red trailer',     assetId: 'DK 678 89', type: 'Trailer', driver: '—',                 lastSeen: '08.09.2025 22:01', status: 'Idle',     statusType: 'warning' },
]

const usersColumns = [
  { key: 'name',    label: 'Display name', bold: true },
  { key: 'email',   label: 'Email' },
  { key: 'roles',   label: 'Access control' },
  { key: 'lastLogin', label: 'Last login' },
  { key: 'status',  label: 'State', align: 'right' },
]

const users = [
  { id: 'u1', name: 'Name Surname',  email: 'email@email.com', roles: 'Role 1, Role 2', lastLogin: '12.10.2025  15:55', status: 'Active',   statusType: 'success', disabled: false },
  { id: 'u2', name: 'Name Surname',  email: 'email@email.com', roles: 'Role 1, Role 2', lastLogin: '12.10.2025  15:55', status: 'Active',   statusType: 'success', disabled: false },
  { id: 'u3', name: 'Name Surname',  email: 'email@email.com', roles: 'Role 1, Role 2', lastLogin: '10.10.2025  16:30', status: 'Active',   statusType: 'success', disabled: false },
  { id: 'u4', name: 'Name Surname',  email: 'email@email.com', roles: 'Role 1, Role 2', lastLogin: 'Never',            status: 'Inactive', statusType: 'neutral-outline', disabled: true },
]

const basicColumns = [
  { key: 'name',  label: 'Label here', bold: true },
  { key: 'col2',  label: 'Label here' },
  { key: 'col3',  label: 'Label here' },
]

const basicRows = [
  { id: 1, name: 'Data entry name here', col2: 'Data here', col3: 'Data here' },
  { id: 2, name: 'Data entry name here', col2: 'Data here', col3: 'Data here' },
  { id: 3, name: 'Data entry name here', col2: 'Data here', col3: 'Data here' },
]

const fourColColumns = [
  { key: 'name',  label: 'Label here', bold: true },
  { key: 'col2',  label: 'Label here' },
  { key: 'col3',  label: 'Label here' },
  { key: 'col4',  label: 'Label here' },
]

const fourColRows = [
  { id: 1, name: 'Data entry name here', col2: 'Data here', col3: '12.10.2025  15:55', col4: 'Data here' },
  { id: 2, name: 'Data entry name here', col2: 'Data here', col3: '12.10.2025  15:55', col4: 'Data here' },
  { id: 3, name: 'Data entry name here', col2: 'Data here', col3: '12.10.2025  15:55', col4: 'Data here' },
]

/* ── Selection state ──────────────────────────────────────── */
const selectedAssets = ref([])
const selectedUsers  = ref([])
const selectedBasic  = ref([])
const selectedFour   = ref([])
</script>

<template>
  <div class="dt-page">

    <div class="dt-page__header">
      <h1 class="dt-page__title">Data Table</h1>
      <p class="dt-page__desc">Table design supports four common user tasks: find records that fit specific criteria, compare data, view or edit a single row's data, and take actions on records. The whole table is outlined with a 2px border matching the row-divider color.</p>
    </div>

    <!-- ─── Basic table ──────────────────────────────────────── -->
    <section class="dt-page__section">
      <h2 class="dt-page__section-title">Basic · 3 columns</h2>

      <div class="dt-page__row">
        <span class="dt-page__row-label">No selection</span>
        <AppDataTable :columns="basicColumns" :rows="basicRows" />
      </div>

      <div class="dt-page__row">
        <span class="dt-page__row-label">With selection</span>
        <AppDataTable
          :columns="basicColumns"
          :rows="basicRows"
          :selectable="true"
          v-model:selected="selectedBasic"
        />
        <p v-if="selectedBasic.length" class="dt-page__note">Selected: {{ selectedBasic.join(', ') }}</p>
      </div>
    </section>

    <!-- ─── 4-column table ───────────────────────────────────── -->
    <section class="dt-page__section">
      <h2 class="dt-page__section-title">4 columns · with selection</h2>

      <div class="dt-page__row">
        <AppDataTable
          :columns="fourColColumns"
          :rows="fourColRows"
          :selectable="true"
          v-model:selected="selectedFour"
        />
      </div>
    </section>

    <!-- ─── Assets table ─────────────────────────────────────── -->
    <section class="dt-page__section">
      <h2 class="dt-page__section-title">Assets · real-world example</h2>
      <p class="dt-page__section-desc">Status column uses <code>AppTag</code> for the cell value. Row selection, actions button, and a disabled-state row are included.</p>

      <div class="dt-page__row">
        <AppDataTable
          :columns="assetsColumns"
          :rows="assets"
          :selectable="true"
          v-model:selected="selectedAssets"
        >
          <template #cell-status="{ row }">
            <AppTag :type="row.statusType" size="sm">{{ row.status }}</AppTag>
          </template>
        </AppDataTable>
        <p v-if="selectedAssets.length" class="dt-page__note">Selected: {{ selectedAssets.join(', ') }}</p>
      </div>
    </section>

    <!-- ─── Users table ──────────────────────────────────────── -->
    <section class="dt-page__section">
      <h2 class="dt-page__section-title">Users · real-world example</h2>
      <p class="dt-page__section-desc">Disabled rows remain visible but cannot be selected or clicked.</p>

      <div class="dt-page__row">
        <AppDataTable
          :columns="usersColumns"
          :rows="users"
          :selectable="true"
          v-model:selected="selectedUsers"
        >
          <template #cell-status="{ row }">
            <AppTag :type="row.statusType" size="sm">{{ row.status }}</AppTag>
          </template>
        </AppDataTable>
      </div>
    </section>

    <!-- ─── No actions ───────────────────────────────────────── -->
    <section class="dt-page__section">
      <h2 class="dt-page__section-title">Without actions column</h2>

      <div class="dt-page__row">
        <AppDataTable
          :columns="basicColumns"
          :rows="basicRows"
          :show-actions="false"
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
.dt-page {
  padding: 40px;
  max-width: 1100px;
}

.dt-page__header {
  margin-bottom: 40px;
}

.dt-page__title {
  font-size: 28px;
  font-weight: 600;
  color: var(--grey-100);
  margin-bottom: 8px;
}

.dt-page__desc {
  font-size: 14px;
  color: var(--grey-70);
  line-height: 20px;
  max-width: 680px;
}

.dt-page__section {
  margin-bottom: 48px;
}

.dt-page__section-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--grey-50);
  margin-bottom: 8px;
}

.dt-page__section-desc {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 18px;
  margin-bottom: 12px;
}

.dt-page__section-desc code {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 4px;
  border-radius: 3px;
  color: var(--grey-90);
}

.dt-page__row {
  margin-bottom: 24px;
}

.dt-page__row-label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: var(--grey-60);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dt-page__note {
  margin-top: 8px;
  font-size: 12px;
  color: var(--grey-70);
}
</style>
