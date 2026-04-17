<script setup>
import { ref, reactive } from 'vue'
import AppInput  from '../components/ui/AppInput.vue'
import AppSelect from '../components/ui/AppSelect.vue'
import AppButton from '../components/ui/AppButton.vue'

/* ── State showcase values ──────────────────────────────────── */
const demoFilled   = ref('email@email.com')
const demoHover    = ref('email@email.com')
const demoFocus    = ref('Typing in here…')
const demoError    = ref('email@email.com')
const demoDisabled = ref('email@email.com')

const demoSelectFilled   = ref('sedan')
const demoSelectHover    = ref('sedan')
const demoSelectFocus    = ref('sedan')
const demoSelectError    = ref('')
const demoSelectDisabled = ref('sedan')

const vehicleTypeOptions = [
  { value: 'sedan',   label: 'Sedan' },
  { value: 'suv',     label: 'SUV' },
  { value: 'van',     label: 'Van' },
  { value: 'truck',   label: 'Truck' },
  { value: 'trailer', label: 'Trailer' },
]

const fuelTypeOptions = [
  { value: 'diesel',   label: 'Diesel' },
  { value: 'petrol',   label: 'Petrol' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid',   label: 'Hybrid' },
]

/* ── Form example ───────────────────────────────────────────── */
const form = reactive({
  name:         '',
  registration: '',
  vehicleType:  '',
  fuelType:     '',
  vin:          '',
  notes:        '',
})
const formErrors = reactive({})
const formSubmitted = ref(false)

function validateForm() {
  Object.keys(formErrors).forEach(k => delete formErrors[k])
  if (!form.name)         formErrors.name         = 'Vehicle name is required'
  if (!form.registration) formErrors.registration = 'Registration number is required'
  if (!form.vehicleType)  formErrors.vehicleType  = 'Please select a vehicle type'
  if (!form.fuelType)     formErrors.fuelType     = 'Please select a fuel type'
  return Object.keys(formErrors).length === 0
}

function handleSubmit() {
  if (validateForm()) formSubmitted.value = true
}

function handleReset() {
  Object.assign(form, { name: '', registration: '', vehicleType: '', fuelType: '', vin: '', notes: '' })
  Object.keys(formErrors).forEach(k => delete formErrors[k])
  formSubmitted.value = false
}

const SearchIconAdd = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3.333v9.334M3.333 8h9.334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Input / Forms</h1>
      <p class="ds-lead">3 components · 6 states · WCAG AA accessible</p>
    </section>

    <!-- ── Text Input states ────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Text Input — States</h2>
      <p class="ds-body">
        All states are driven by native CSS pseudo-classes. <code>forcedState</code> is
        available for documentation rendering only.
      </p>
      <div class="states-grid">

        <div class="state-card">
          <span class="state-badge">Main</span>
          <AppInput label="Label" placeholder="Type here" model-value="" />
          <p class="state-desc">Empty, awaiting input. Border: grey-30.</p>
        </div>

        <div class="state-card">
          <span class="state-badge">Filled</span>
          <AppInput label="Label" v-model="demoFilled" />
          <p class="state-desc">Value entered. Same border as main.</p>
        </div>

        <div class="state-card">
          <span class="state-badge">Hover</span>
          <AppInput label="Label" v-model="demoHover" forced-state="hover" />
          <p class="state-desc">bg: grey-10, border: grey-80.</p>
        </div>

        <div class="state-card">
          <span class="state-badge">Focus</span>
          <AppInput label="Label" v-model="demoFocus" forced-state="focus" />
          <p class="state-desc">bg: white, border: grey-80 + 1px ring.</p>
        </div>

        <div class="state-card">
          <span class="state-badge state-badge--error">Error</span>
          <AppInput label="Label" v-model="demoError" error="Error message here" />
          <p class="state-desc">bg: red-10, border: red-70. Error below.</p>
        </div>

        <div class="state-card">
          <span class="state-badge state-badge--muted">Disabled</span>
          <AppInput label="Label" v-model="demoDisabled" :disabled="true" />
          <p class="state-desc">border: grey-20, text: grey-50, label: grey-60.</p>
        </div>

      </div>
    </section>

    <!-- ── Dropdown states ──────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Dropdown — States</h2>
      <p class="ds-body">
        Native <code>&lt;select&gt;</code> with a custom chevron overlay.
        Inherits all field tokens.
      </p>
      <div class="states-grid">

        <div class="state-card">
          <span class="state-badge">Main</span>
          <AppSelect label="Label" :options="vehicleTypeOptions" model-value="" />
          <p class="state-desc">Empty placeholder state.</p>
        </div>

        <div class="state-card">
          <span class="state-badge">Selected</span>
          <AppSelect label="Label" :options="vehicleTypeOptions" v-model="demoSelectFilled" />
          <p class="state-desc">Option chosen, value color: grey-90.</p>
        </div>

        <div class="state-card">
          <span class="state-badge">Hover</span>
          <AppSelect label="Label" :options="vehicleTypeOptions" v-model="demoSelectHover" forced-state="hover" />
          <p class="state-desc">bg: grey-10, border: grey-80.</p>
        </div>

        <div class="state-card">
          <span class="state-badge">Focus</span>
          <AppSelect label="Label" :options="vehicleTypeOptions" v-model="demoSelectFocus" forced-state="focus" />
          <p class="state-desc">bg: white, border: grey-80 + 1px ring.</p>
        </div>

        <div class="state-card">
          <span class="state-badge state-badge--error">Error</span>
          <AppSelect label="Label" :options="vehicleTypeOptions" v-model="demoSelectError"
            error="Please select an option" />
          <p class="state-desc">bg: red-10, border: red-70.</p>
        </div>

        <div class="state-card">
          <span class="state-badge state-badge--muted">Disabled</span>
          <AppSelect label="Label" :options="vehicleTypeOptions" v-model="demoSelectDisabled" :disabled="true" />
          <p class="state-desc">border: grey-20, text: grey-50.</p>
        </div>

      </div>
    </section>

    <!-- ── Search input ──────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Search</h2>
      <p class="ds-body">
        Search is a variant of <code>AppInput</code> with <code>type="search"</code>.
        The icon slot is built-in; no label is shown by convention.
      </p>
      <div class="search-row">
        <AppInput type="search" placeholder="Search vehicles, drivers…" style="max-width: 320px" />
        <AppInput type="search" placeholder="Search vehicles, drivers…" style="max-width: 320px" forced-state="focus" />
      </div>
    </section>

    <!-- ── Optional indicator ───────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Optional Indicator</h2>
      <p class="ds-body">
        Add the <code>optional</code> prop to append "(Optional)" in secondary weight
        next to the label. Use on fields that are genuinely not required — avoid
        marking everything as optional.
      </p>
      <div class="optional-row">
        <AppInput label="Notes" :optional="true" placeholder="Add a note…" style="max-width: 320px" />
        <AppInput label="Notes" :optional="true"
          hint="Internal note, not visible to drivers."
          placeholder="Add a note…" style="max-width: 320px" />
        <AppSelect label="Assigned driver" :optional="true" :options="[]"
          placeholder="Unassigned" style="max-width: 320px" />
      </div>
    </section>

    <!-- ── Hint text ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Hint Text</h2>
      <p class="ds-body">
        Use the <code>hint</code> prop for secondary guidance below the field.
        Hint is hidden when an error message is shown.
      </p>
      <div class="optional-row">
        <AppInput label="VIN"
          hint="17-character vehicle identification number."
          placeholder="e.g. 1HGBH41JXMN109186"
          style="max-width: 320px" />
        <AppInput label="VIN" error="Must be exactly 17 characters"
          hint="17-character vehicle identification number."
          model-value="1HGBH41JX"
          style="max-width: 320px" />
      </div>
    </section>

    <!-- ── Form example ─────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage Example — Add Vehicle</h2>
      <p class="ds-body">
        A realistic fleet management form. Required fields are validated on submit.
        Try submitting with empty required fields to see error states.
      </p>

      <div class="form-example">
        <template v-if="!formSubmitted">
          <div class="form-grid">
            <AppInput
              label="Vehicle name"
              v-model="form.name"
              :error="formErrors.name"
              placeholder="e.g. Fleet Truck 04"
              hint="Used for display in the dashboard."
            />
            <AppInput
              label="Registration"
              v-model="form.registration"
              :error="formErrors.registration"
              placeholder="e.g. ABC-1234"
            />
            <AppSelect
              label="Vehicle type"
              v-model="form.vehicleType"
              :options="vehicleTypeOptions"
              :error="formErrors.vehicleType"
            />
            <AppSelect
              label="Fuel type"
              v-model="form.fuelType"
              :options="fuelTypeOptions"
              :error="formErrors.fuelType"
            />
            <AppInput
              label="VIN"
              :optional="true"
              v-model="form.vin"
              placeholder="17-character identifier"
              hint="Vehicle Identification Number (optional)."
              class="form-full"
            />
            <AppInput
              label="Notes"
              :optional="true"
              v-model="form.notes"
              placeholder="Any additional information…"
              hint="Visible only to fleet managers."
              class="form-full"
            />
          </div>
          <div class="form-footer">
            <AppButton variant="tertiary" size="md" @click="handleReset">Cancel</AppButton>
            <AppButton variant="primary"  size="md" @click="handleSubmit">
              <template #icon-left><span v-html="SearchIconAdd" /></template>
              Add vehicle
            </AppButton>
          </div>
        </template>

        <div v-else class="form-success">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="var(--green-10)" stroke="var(--green-70)" stroke-width="1.5"/>
            <path d="M8 12l3 3 5-5" stroke="var(--green-70)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="form-success__title">Vehicle added</p>
          <p class="form-success__sub">{{ form.name }} has been successfully registered.</p>
          <AppButton variant="tertiary" size="md" @click="handleReset">Add another</AppButton>
        </div>
      </div>
    </section>

    <!-- ── Token reference ───────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <div class="ds-table-wrap">
        <table class="ds-token-table">
          <thead>
            <tr><th>Token</th><th>Primitive</th><th>Value</th><th>Used for</th></tr>
          </thead>
          <tbody>
            <tr><td><code>--field-bg</code></td><td><code>grey-00</code></td><td><span class="swatch" style="background:#fff;border:1px solid #e6e6e7"></span>#ffffff</td><td>Default background</td></tr>
            <tr><td><code>--field-border</code></td><td><code>grey-30</code></td><td><span class="swatch" style="background:#d8d8da"></span>#d8d8da</td><td>Default border</td></tr>
            <tr><td><code>--field-text</code></td><td><code>grey-90</code></td><td><span class="swatch" style="background:#36383b"></span>#36383b</td><td>Input value text</td></tr>
            <tr><td><code>--field-placeholder</code></td><td><code>grey-70</code></td><td><span class="swatch" style="background:#6f7176"></span>#6f7176</td><td>Placeholder &amp; search icon</td></tr>
            <tr><td><code>--field-label-color</code></td><td><code>grey-90</code></td><td><span class="swatch" style="background:#36383b"></span>#36383b</td><td>Label text</td></tr>
            <tr><td><code>--field-hover-bg</code></td><td><code>grey-10</code></td><td><span class="swatch" style="background:#f1f1f2"></span>#f1f1f2</td><td>Hover background</td></tr>
            <tr><td><code>--field-hover-border</code></td><td><code>grey-80</code></td><td><span class="swatch" style="background:#5d6065"></span>#5d6065</td><td>Hover border</td></tr>
            <tr><td><code>--field-focus-border</code></td><td><code>grey-80</code></td><td><span class="swatch" style="background:#5d6065"></span>#5d6065</td><td>Focus border + ring</td></tr>
            <tr><td><code>--field-error-bg</code></td><td><code>red-10</code></td><td><span class="swatch" style="background:#fef2f2"></span>#fef2f2</td><td>Error background</td></tr>
            <tr><td><code>--field-error-border</code></td><td><code>red-70</code></td><td><span class="swatch" style="background:#dc2626"></span>#dc2626</td><td>Error border</td></tr>
            <tr><td><code>--field-error-text</code></td><td><code>red-90</code></td><td><span class="swatch" style="background:#991b1b"></span>#991b1b</td><td>Error message text</td></tr>
            <tr><td><code>--field-disabled-border</code></td><td><code>grey-20</code></td><td><span class="swatch" style="background:#e6e6e7"></span>#e6e6e7</td><td>Disabled border</td></tr>
            <tr><td><code>--field-disabled-text</code></td><td><code>grey-50</code></td><td><span class="swatch" style="background:#b0b2b7"></span>#b0b2b7</td><td>Disabled input text</td></tr>
            <tr><td><code>--field-disabled-label</code></td><td><code>grey-60</code></td><td><span class="swatch" style="background:#9c9ea3"></span>#9c9ea3</td><td>Disabled label text</td></tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Page shell ──────────────────────────────────────────────── */
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
.ds-body code {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  padding: 1px 5px;
  border-radius: 3px;
  color: var(--grey-80);
}

/* ── States grid ─────────────────────────────────────────────── */
.states-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.state-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.state-badge {
  display: inline-flex;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-70);
  background: var(--grey-10);
  padding: 2px 8px;
  border-radius: 20px;
}
.state-badge--error { color: var(--red-80); background: var(--red-10); }
.state-badge--muted { color: var(--grey-60); background: var(--grey-05); }

.state-desc {
  font-size: 12px;
  color: var(--grey-60);
  line-height: 1.4;
}

/* ── Search row ──────────────────────────────────────────────── */
.search-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}

/* ── Optional / Hint row ─────────────────────────────────────── */
.optional-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}

/* ── Form example ────────────────────────────────────────────── */
.form-example {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 28px 28px 24px;
  max-width: 700px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.form-full { grid-column: 1 / -1; }

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--grey-10);
}

.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 0;
  text-align: center;
}
.form-success__title { font-size: 16px; font-weight: 600; color: var(--grey-90); }
.form-success__sub   { font-size: 14px; color: var(--grey-70); margin-bottom: 8px; }

/* ── Token table ─────────────────────────────────────────────── */
.ds-table-wrap {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--grey-20);
}

.ds-token-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 13px;
}

.ds-token-table thead th {
  background: var(--grey-05);
  border-bottom: 1px solid var(--grey-20);
  padding: 10px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-70);
  white-space: nowrap;
}

.ds-token-table td {
  padding: 9px 16px;
  border-bottom: 1px solid var(--grey-10);
  color: var(--grey-80);
  vertical-align: middle;
}

.ds-token-table tr:last-child td { border-bottom: none; }
.ds-token-table tr:hover > td    { background: var(--grey-05); }

.ds-token-table code {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 11px;
  background: var(--grey-05);
  padding: 2px 5px;
  border-radius: 3px;
  color: var(--grey-80);
}

.swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 6px;
  flex-shrink: 0;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .states-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .ds-main     { padding: 32px 20px 60px; }
  .states-grid { grid-template-columns: 1fr; }
  .form-grid   { grid-template-columns: 1fr; }
}
</style>
