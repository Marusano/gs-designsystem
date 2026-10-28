<script setup>
import { ref, computed } from 'vue'
import AppButton from './AppButton.vue'
import AppInput  from './AppInput.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ from: null, to: null }),
  },
  mode: {
    type: String,
    default: 'date',
    validator: v => ['date', 'datetime', 'time'].includes(v),
  },
  showQuickSelections: { type: Boolean, default: true },
  quickSelections: {
    type: Array,
    default: () => ['today', 'this-week', 'this-month'],
  },
})

const emit = defineEmits(['update:modelValue', 'cancel'])

const QUICK_LABELS = {
  'today':       'Today',
  'this-week':   'This week',
  'this-month':  'This month',
  'last-2-days': 'Last 2 days',
}

const MONTHS   = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAYS = ['M','T','W','T','F','S','S']

const normalizedQuick = computed(() =>
  props.quickSelections.map(q =>
    typeof q === 'string' ? { label: QUICK_LABELS[q] ?? q, value: q } : q
  )
)

const now = new Date()

const viewYear  = ref(now.getFullYear())
const viewMonth = ref(now.getMonth())

const pendingFrom = ref(props.modelValue?.from ? new Date(props.modelValue.from) : null)
const pendingTo   = ref(props.modelValue?.to   ? new Date(props.modelValue.to)   : null)
const selecting   = ref('from')

const fromTime = ref('00:00')
const toTime   = ref('24:00')

const activeQuick = ref(null)

function getDays(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstWeekday(year, month) {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

function buildCal(year, month) {
  const total    = getDays(year, month)
  const firstDay = getFirstWeekday(year, month)
  const flat     = []

  for (let i = 0; i < firstDay; i++) flat.push(null)
  for (let d = 1; d <= total; d++) flat.push(new Date(year, month, d))
  while (flat.length % 7 !== 0) flat.push(null)

  const rows = []
  for (let i = 0; i < flat.length; i += 7) {
    const days   = flat.slice(i, i + 7)
    const anchor = days.find(d => d !== null)
    rows.push({ weekNr: anchor ? isoWeek(anchor) : null, days })
  }
  return rows
}

const cal1 = computed(() => buildCal(viewYear.value, viewMonth.value))

const month1Label = computed(() => `${MONTHS[viewMonth.value]} ${viewYear.value}`)

function sameDay(a, b) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate()
}

function dayClass(date) {
  if (!date) return 'tf__day tf__day--empty'
  const c = ['tf__day']
  if (sameDay(date, now))               c.push('tf__day--today')
  if (sameDay(date, pendingFrom.value)) c.push('tf__day--start')
  if (sameDay(date, pendingTo.value))   c.push('tf__day--end')
  if (
    pendingFrom.value && pendingTo.value &&
    date > pendingFrom.value && date < pendingTo.value
  ) c.push('tf__day--range')
  return c.join(' ')
}

function selectDay(date) {
  if (!date) return
  activeQuick.value = null
  if (selecting.value === 'from') {
    pendingFrom.value = date
    pendingTo.value   = null
    selecting.value   = 'to'
  } else {
    if (date < pendingFrom.value) {
      pendingTo.value   = pendingFrom.value
      pendingFrom.value = date
    } else {
      pendingTo.value = date
    }
    selecting.value = 'from'
  }
}

function prevMonth() {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
}

function nextMonth() {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
}

function applyQuick(value) {
  activeQuick.value = value
  const d = new Date(); d.setHours(0, 0, 0, 0)

  if (value === 'today') {
    pendingFrom.value = new Date(d)
    pendingTo.value   = new Date(d)
  } else if (value === 'this-week') {
    const dow = d.getDay() === 0 ? 6 : d.getDay() - 1
    const mon = new Date(d); mon.setDate(d.getDate() - dow)
    const sun = new Date(mon); sun.setDate(mon.getDate() + 6)
    pendingFrom.value = mon
    pendingTo.value   = sun
  } else if (value === 'this-month') {
    pendingFrom.value = new Date(d.getFullYear(), d.getMonth(), 1)
    pendingTo.value   = new Date(d.getFullYear(), d.getMonth() + 1, 0)
  } else if (value === 'last-2-days') {
    const ago = new Date(d); ago.setDate(d.getDate() - 2)
    pendingFrom.value = ago
    pendingTo.value   = new Date(d)
  }

  if (pendingFrom.value) {
    viewYear.value  = pendingFrom.value.getFullYear()
    viewMonth.value = pendingFrom.value.getMonth()
  }
  selecting.value = 'from'
}

function toISODate(date) {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const fromDateModel = computed({
  get: () => toISODate(pendingFrom.value),
  set: v => {
    pendingFrom.value = v ? new Date(v + 'T00:00:00') : null
    if (v) selecting.value = 'to'
  },
})

const toDateModel = computed({
  get: () => toISODate(pendingTo.value),
  set: v => { pendingTo.value = v ? new Date(v + 'T00:00:00') : null },
})

function apply()  { emit('update:modelValue', { from: pendingFrom.value, to: pendingTo.value }) }
function cancel() { emit('cancel') }
</script>

<template>
  <div :class="['tf', mode === 'datetime' && 'tf--datetime']">

    <!-- ── Quick presets ──────────────────────────────────────── -->
    <div v-if="showQuickSelections" class="tf__quick">
      <button
        v-for="q in normalizedQuick"
        :key="q.value"
        :class="['tf__chip', activeQuick === q.value && 'tf__chip--active']"
        @click="applyQuick(q.value)"
      >{{ q.label }}</button>
    </div>

    <!-- ── Date-only: just date inputs ───────────────────────── -->
    <div v-if="mode === 'date'" class="tf__inputs">
      <AppInput label="From" type="date" size="sm" v-model="fromDateModel" style="flex:1" />
      <AppInput label="To"   type="date" size="sm" v-model="toDateModel"   style="flex:1" />
    </div>

    <!-- ── Date+Time: grey band with date row + time row ─────── -->
    <div v-if="mode === 'datetime'" class="tf__band">
      <div class="tf__inputs tf__inputs--band-date">
        <AppInput label="From" type="date" size="sm" v-model="fromDateModel" style="flex:1" />
        <AppInput label="To"   type="date" size="sm" v-model="toDateModel"   style="flex:1" />
      </div>
      <div class="tf__inputs tf__inputs--band-time">
        <AppInput label="" type="time" size="sm" v-model="fromTime" style="flex:1" />
        <AppInput label="" type="time" size="sm" v-model="toTime"   style="flex:1" />
      </div>
    </div>

    <!-- ── Calendar ─────────────────────────────────────────────── -->
    <div class="tf__cals">

      <div class="tf__cal">
        <!-- Nav: month label left, arrows right -->
        <div class="tf__cal-nav-row">
          <div class="tf__month-btn">
            <span class="tf__month-label">{{ month1Label }}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="tf__arrows">
            <button class="tf__arrow" @click="prevMonth" aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="tf__arrow" @click="nextMonth" aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Grid header (week nr + weekday labels) -->
        <div class="tf__cal-grid">
          <span class="tf__wk-hdr"></span>
          <span v-for="(d, i) in WEEKDAYS" :key="i" class="tf__dh">{{ d }}</span>

          <!-- Data rows -->
          <template v-for="row in cal1" :key="row.weekNr">
            <span class="tf__wk">{{ row.weekNr }}</span>
            <button
              v-for="(date, i) in row.days"
              :key="i"
              :class="dayClass(date)"
              :disabled="!date"
              @click="selectDay(date)"
            >
              <span class="tf__day-bg" />
              <span class="tf__day-num">{{ date?.getDate() }}</span>
            </button>
          </template>
        </div>
      </div>

    </div>

    <!-- ── Time-only: time inputs below calendar ────────────── -->
    <div v-if="mode === 'time'" class="tf__inputs tf__inputs--time">
      <AppInput label="From" type="time" size="sm" v-model="fromTime" style="flex:1" />
      <AppInput label="To"   type="time" size="sm" v-model="toTime"   style="flex:1" />
    </div>

    <!-- ── Footer ────────────────────────────────────────────── -->
    <div class="tf__footer">
      <AppButton variant="secondary" size="md" style="width:108px" @click="cancel">Cancel</AppButton>
      <AppButton variant="primary"   size="md" style="flex:1"     @click="apply">Apply changes</AppButton>
    </div>

  </div>
</template>

<style scoped>
/* ── Panel ──────────────────────────────────────────────────── */
.tf {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  width: 336px;
  background: var(--grey-00);
  border-radius: 4px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* ── Quick presets ──────────────────────────────────────────── */
.tf__quick {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px;
}

.tf__chip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 4px 16px;
  border-radius: 50px;
  box-shadow: inset 0 0 0 1px var(--grey-30);
  background: var(--grey-00);
  color: var(--grey-90);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  transition: background 100ms, color 100ms, box-shadow 100ms;
}

.tf__chip:hover {
  background: var(--grey-05);
}

.tf__chip--active {
  background: var(--indigo-100);
  color: var(--grey-00);
  box-shadow: none;
}

.tf__chip--active:hover {
  background: var(--indigo-100);
  color: var(--grey-00);
}

/* ── Date / time inputs ─────────────────────────────────────── */
.tf--datetime {
  gap: 0;
}

.tf__inputs {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: var(--grey-05);
}

/* ── Date+Time grey band ────────────────────────────────────── */
.tf__band {
  background: var(--grey-05);
  display: flex;
  flex-direction: column;
}

.tf__inputs--band-date {
  padding: 8px 8px 0;
}

.tf__inputs--band-time {
  padding: 4px 8px 8px;
}

/* ── Calendar container ─────────────────────────────────────── */
.tf__cals {
  padding: 0 8px;
}

/* ── Calendar nav row ───────────────────────────────────────── */
.tf__cal-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  height: 40px;
}

.tf__month-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  color: var(--grey-60);
}

.tf__month-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--grey-90);
  font-family: 'Inter', sans-serif;
}

.tf__month-btn svg { color: var(--grey-60); flex-shrink: 0; }

.tf__arrows {
  display: flex;
  align-items: center;
}

.tf__arrow {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: var(--grey-60);
  transition: background 80ms, color 80ms;
}

.tf__arrow:hover { background: var(--grey-05); color: var(--grey-90); }

/* ── Calendar grid ──────────────────────────────────────────── */
.tf__cal-grid {
  display: grid;
  grid-template-columns: 40px repeat(7, 40px); /* week-nr col + 7 day cols */
}

.tf__wk-hdr {
  width: 40px;
  height: 40px;
}

.tf__dh {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-90);
  font-family: 'Inter', sans-serif;
}

.tf__wk {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-40);
  font-family: 'Inter', sans-serif;
}

/* ── Day cell ───────────────────────────────────────────────── */
.tf__day {
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.tf__day--empty,
.tf__day[disabled] {
  pointer-events: none;
  cursor: default;
}

/* Background circle (for selected states and range fill) */
.tf__day-bg {
  position: absolute;
  inset: 0;
  border-radius: 0;
  pointer-events: none;
  transition: background 80ms;
}

/* Number label */
.tf__day-num {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-90);
  border-radius: 50%;
  font-family: 'Inter', sans-serif;
  transition: background 80ms, color 80ms, box-shadow 80ms;
}

/* Hover on plain days */
.tf__day:not(.tf__day--empty):not([disabled]):not(.tf__day--start):not(.tf__day--end):hover .tf__day-num {
  background: var(--grey-10);
}

/* Today: outline circle on the number */
.tf__day--today .tf__day-num {
  box-shadow: inset 0 0 0 2px var(--grey-50);
  font-weight: 400;
}

/* Range interior: light blue tint across the full cell bg */
.tf__day--range .tf__day-bg {
  background: var(--blue-azure-10);
}

.tf__day--range .tf__day-num {
  color: var(--grey-90);
}

/* Start: full circle on day-num, right-half range bg on cell */
.tf__day--start .tf__day-bg {
  background: linear-gradient(to right, transparent 50%, var(--blue-azure-10) 50%);
}

.tf__day--start .tf__day-num {
  background: var(--indigo-100);
  color: var(--grey-00);
  font-weight: 400;
}

/* End: full circle on day-num, left-half range bg on cell */
.tf__day--end .tf__day-bg {
  background: linear-gradient(to left, transparent 50%, var(--blue-azure-10) 50%);
}

.tf__day--end .tf__day-num {
  background: var(--indigo-100);
  color: var(--grey-00);
  font-weight: 400;
}

/* Single-day selection: start === end, no half-bg */
.tf__day--start.tf__day--end .tf__day-bg {
  background: none;
}

/* ── Footer ─────────────────────────────────────────────────── */
.tf__footer {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  box-shadow: inset 0 1px 0 var(--grey-20);
}
</style>
