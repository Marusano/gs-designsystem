<script setup>
import { ref, computed } from 'vue'
import AppButton from './AppButton.vue'

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
  showCurrentDate:     { type: Boolean, default: true },
  quickSelections: {
    type: Array,
    default: () => ['today', 'this-week', 'this-month'],
  },
  monthCount: {
    type: Number,
    default: 1,
    validator: v => [1, 2].includes(v),
  },
})

const emit = defineEmits(['update:modelValue', 'cancel'])

const QUICK_LABELS = {
  'today':      'Today',
  'this-week':  'This week',
  'this-month': 'This month',
  'last-2-days': 'Last 2 days',
}

const normalizedQuick = computed(() =>
  props.quickSelections.map(q =>
    typeof q === 'string' ? { label: QUICK_LABELS[q] ?? q, value: q } : q
  )
)

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['M','T','W','T','F','S','S']

const now = new Date()

const todayStr = computed(() => {
  const d = new Date()
  const wd = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${wd[d.getDay()]}, ${mo[d.getMonth()]} ${d.getDate()}`
})

// Calendar navigation
const viewYear  = ref(now.getFullYear())
const viewMonth = ref(now.getMonth())

// Pending selection
const pendingFrom = ref(props.modelValue?.from ? new Date(props.modelValue.from) : null)
const pendingTo   = ref(props.modelValue?.to   ? new Date(props.modelValue.to)   : null)
const selecting   = ref('from') // 'from' | 'to'

// Time inputs
const fromTime = ref('00:00')
const toTime   = ref('24:00')

// Active quick preset
const activeQuick = ref(null)

function getDays(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstWeekday(year, month) {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1 // Mon-based
}

function buildCal(year, month) {
  const cells = []
  const pad   = getFirstWeekday(year, month)
  for (let i = 0; i < pad; i++) cells.push(null)
  for (let d = 1; d <= getDays(year, month); d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const cal1 = computed(() => buildCal(viewYear.value, viewMonth.value))
const cal2 = computed(() => {
  const m = (viewMonth.value + 1) % 12
  const y = viewMonth.value === 11 ? viewYear.value + 1 : viewYear.value
  return buildCal(y, m)
})

const month1Label = computed(() => `${MONTHS[viewMonth.value]} ${viewYear.value}`)
const month2Label = computed(() => {
  const m = (viewMonth.value + 1) % 12
  const y = viewMonth.value === 11 ? viewYear.value + 1 : viewYear.value
  return `${MONTHS[m]} ${y}`
})

function sameDay(a, b) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function dayClass(date) {
  if (!date) return 'tf__day tf__day--empty'
  const c = ['tf__day']
  if (sameDay(date, now))           c.push('tf__day--today')
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
  const d = new Date(); d.setHours(0,0,0,0)

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

function fmtDate(date) {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2,'0')
  const m = String(date.getMonth()+1).padStart(2,'0')
  return `${d}.${m}.${date.getFullYear()}`
}

function apply()  { emit('update:modelValue', { from: pendingFrom.value, to: pendingTo.value }) }
function cancel() { emit('cancel') }
</script>

<template>
  <div class="tf__panel">

    <!-- Quick selections -->
    <div v-if="showQuickSelections" class="tf__quick">
      <button
        v-for="q in normalizedQuick"
        :key="q.value"
        :class="['tf__quick-btn', activeQuick === q.value && 'tf__quick-btn--active']"
        @click="applyQuick(q.value)"
      >{{ q.label }}</button>
    </div>

    <!-- Current date -->
    <p v-if="showCurrentDate && mode !== 'time'" class="tf__today">{{ todayStr }}</p>

    <!-- Date inputs -->
    <div v-if="mode === 'date' || mode === 'datetime'" class="tf__inputs">
      <div class="tf__input-col">
        <span class="tf__input-lbl">From</span>
        <div class="tf__input-field">
          <svg class="tf__input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.1"/><path d="M1 5.5h12" stroke="currentColor" stroke-width="1.1"/><path d="M4.5 1v2M9.5 1v2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
          <span class="tf__input-val">{{ fmtDate(pendingFrom) || 'DD.MM.YYYY' }}</span>
        </div>
      </div>
      <div class="tf__input-col">
        <span class="tf__input-lbl">To</span>
        <div class="tf__input-field">
          <svg class="tf__input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.1"/><path d="M1 5.5h12" stroke="currentColor" stroke-width="1.1"/><path d="M4.5 1v2M9.5 1v2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
          <span class="tf__input-val">{{ fmtDate(pendingTo) || 'DD.MM.YYYY' }}</span>
        </div>
      </div>
    </div>

    <!-- Calendar(s) -->
    <div :class="['tf__cals', monthCount === 2 && 'tf__cals--dual']">

      <div class="tf__cal">
        <div class="tf__cal-head">
          <button class="tf__cal-nav" @click="prevMonth" aria-label="Previous month">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 9.5L4 6l3.5-3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <span class="tf__cal-title">{{ month1Label }}</span>
          <button v-if="monthCount === 1" class="tf__cal-nav" @click="nextMonth" aria-label="Next month">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 9.5L8 6 4.5 2.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div v-else class="tf__cal-nav-placeholder" />
        </div>
        <div class="tf__cal-grid">
          <span v-for="(d,i) in DAYS" :key="i" class="tf__dh">{{ d }}</span>
          <button
            v-for="(date, i) in cal1"
            :key="'c1-' + i"
            :class="dayClass(date)"
            :disabled="!date"
            @click="selectDay(date)"
          ><span class="tf__day-num">{{ date?.getDate() }}</span></button>
        </div>
      </div>

      <div v-if="monthCount === 2" class="tf__cal">
        <div class="tf__cal-head">
          <div class="tf__cal-nav-placeholder" />
          <span class="tf__cal-title">{{ month2Label }}</span>
          <button class="tf__cal-nav" @click="nextMonth" aria-label="Next month">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 9.5L8 6 4.5 2.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <div class="tf__cal-grid">
          <span v-for="(d,i) in DAYS" :key="i" class="tf__dh">{{ d }}</span>
          <button
            v-for="(date, i) in cal2"
            :key="'c2-' + i"
            :class="dayClass(date)"
            :disabled="!date"
            @click="selectDay(date)"
          ><span class="tf__day-num">{{ date?.getDate() }}</span></button>
        </div>
      </div>

    </div>

    <!-- Time inputs -->
    <div v-if="mode === 'datetime' || mode === 'time'" class="tf__inputs tf__inputs--time">
      <div class="tf__input-col">
        <span v-if="mode === 'time'" class="tf__input-lbl">From</span>
        <div class="tf__input-field">
          <svg class="tf__input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.1"/><path d="M7 4v3.5l2 1.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <input class="tf__time-in" type="time" v-model="fromTime" />
        </div>
      </div>
      <div class="tf__input-col">
        <span v-if="mode === 'time'" class="tf__input-lbl">To</span>
        <div class="tf__input-field">
          <svg class="tf__input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.1"/><path d="M7 4v3.5l2 1.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <input class="tf__time-in" type="time" v-model="toTime" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="tf__footer">
      <AppButton variant="secondary" size="sm" @click="cancel">Cancel</AppButton>
      <AppButton variant="primary" size="sm" style="flex:1" @click="apply">Apply changes</AppButton>
    </div>

  </div>
</template>

<style scoped>
/* ── Panel ──────────────────────────────────────────────────── */
.tf__panel {
  display: inline-flex;
  flex-direction: column;
  background: var(--grey-00);
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px var(--grey-20), 0 4px 20px rgba(0,0,0,0.10);
  font-family: 'Inter', sans-serif;
  min-width: 260px;
}

/* ── Quick ─────────────────────────────────────────────────── */
.tf__quick {
  display: flex;
  gap: 4px;
  padding: 10px 12px 8px;
  border-bottom: 1px solid var(--grey-10);
}

.tf__quick-btn {
  height: 28px;
  padding: 0 12px;
  border-radius: 20px;
  border: none;
  background: var(--grey-10);
  color: var(--grey-70);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 100ms, color 100ms;
}

.tf__quick-btn:hover       { background: var(--grey-20); color: var(--grey-90); }
.tf__quick-btn--active     { background: var(--indigo-100); color: var(--grey-00); }
.tf__quick-btn--active:hover { background: var(--indigo-100); color: var(--grey-00); }

/* ── Today label ───────────────────────────────────────────── */
.tf__today {
  margin: 0;
  padding: 8px 12px 2px;
  font-size: 11px;
  color: var(--grey-60);
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* ── Inputs ────────────────────────────────────────────────── */
.tf__inputs {
  display: flex;
  gap: 8px;
  padding: 6px 12px;
}

.tf__inputs--time {
  border-top: 1px solid var(--grey-10);
}

.tf__input-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}

.tf__input-lbl {
  font-size: 11px;
  font-weight: 500;
  color: var(--grey-60);
}

.tf__input-field {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 8px;
  box-shadow: inset 0 0 0 1px var(--grey-30);
  border-radius: 4px;
  background: var(--grey-00);
}

.tf__input-icon { color: var(--grey-50); flex-shrink: 0; }

.tf__input-val {
  font-size: 12px;
  color: var(--grey-70);
}

.tf__time-in {
  border: none;
  background: none;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  color: var(--grey-90);
  width: 100%;
  outline: none;
}

/* ── Calendars ─────────────────────────────────────────────── */
.tf__cals {
  padding: 4px 12px 6px;
}

.tf__cals--dual {
  display: flex;
  gap: 20px;
}

/* ── Calendar ──────────────────────────────────────────────── */
.tf__cal { }

.tf__cal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0 6px;
}

.tf__cal-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--grey-90);
}

.tf__cal-nav {
  width: 22px;
  height: 22px;
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

.tf__cal-nav:hover { background: var(--grey-10); color: var(--grey-90); }
.tf__cal-nav-placeholder { width: 22px; }

/* ── Grid ──────────────────────────────────────────────────── */
.tf__cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 30px);
  row-gap: 0;
}

.tf__dh {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: var(--grey-50);
  letter-spacing: 0.02em;
}

/* ── Day cell ──────────────────────────────────────────────── */
.tf__day {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
}

.tf__day--empty,
.tf__day[disabled] {
  pointer-events: none;
  cursor: default;
}

.tf__day-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: 'Inter', sans-serif;
  color: var(--grey-80);
  border-radius: 50%;
  position: relative;
  z-index: 1;
  transition: background 80ms;
}

.tf__day:not(.tf__day--empty):not([disabled]):not(.tf__day--start):not(.tf__day--end):hover .tf__day-num {
  background: var(--grey-10);
}

/* today */
.tf__day--today .tf__day-num {
  box-shadow: inset 0 0 0 1.5px var(--indigo-100);
  font-weight: 600;
  color: var(--indigo-100);
}

/* in-range */
.tf__day--range {
  background: var(--blue-azure-10);
}

.tf__day--range .tf__day-num { color: var(--blue-azure-80); }

/* start */
.tf__day--start {
  background: linear-gradient(to right, transparent 50%, var(--blue-azure-10) 50%);
}

.tf__day--start .tf__day-num {
  background: var(--indigo-100);
  color: var(--grey-00);
  font-weight: 600;
}

/* end */
.tf__day--end {
  background: linear-gradient(to left, transparent 50%, var(--blue-azure-10) 50%);
}

.tf__day--end .tf__day-num {
  background: var(--indigo-100);
  color: var(--grey-00);
  font-weight: 600;
}

/* single-day selection: start === end */
.tf__day--start.tf__day--end {
  background: none;
}

/* ── Footer ────────────────────────────────────────────────── */
.tf__footer {
  display: flex;
  gap: 8px;
  padding: 8px 12px 12px;
  border-top: 1px solid var(--grey-10);
}
</style>
