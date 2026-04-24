<script setup>
import { ref } from 'vue'
import AppTag from '../components/ui/AppTag.vue'

const types = [
  'neutral', 'neutral-outline', 'neutral-inverted',
  'success', 'success-strong', 'informational',
  'danger', 'warning', 'moderate', 'highlight',
]

const typeLabels = {
  'neutral':          'Neutral',
  'neutral-outline':  'Neutral Outline',
  'neutral-inverted': 'Neutral Inverted',
  'success':          'Success',
  'success-strong':   'Success Strong',
  'informational':    'Informational',
  'danger':           'Danger',
  'warning':          'Warning',
  'moderate':         'Moderate',
  'highlight':        'Highlight',
}

const typeDescriptions = {
  'neutral':          'Default state. Informational, no semantic weight.',
  'neutral-outline':  'Bordered variant. Subtle separation on white backgrounds.',
  'neutral-inverted': 'Dark background. Use on light surfaces for contrast.',
  'success':          'Active, online, healthy. Positive status.',
  'success-strong':   'Critical positive status. High contrast success.',
  'informational':    'Informational. Sync in progress, pending review.',
  'danger':           'Error, offline, critical fault.',
  'warning':          'Degraded, partially unavailable, recoverable warning.',
  'moderate':         'Idle, parked, moderate risk. Mid-range caution.',
  'highlight':        'Selected, featured, newly added.',
}

const IconDot = `<svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3.5"/></svg>`

// Activity-state icons — same paths as IconsPage system group (24×24 viewBox, rendered at 16×16)
const IconDriving   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.46 2.01074C12.5053 2.01279 12.5505 2.0159 12.5957 2.01855C12.689 2.02411 12.7821 2.03091 12.875 2.03906C12.9715 2.04742 13.0674 2.05729 13.1631 2.06836C13.2626 2.08 13.362 2.09185 13.4609 2.10645C13.5326 2.11692 13.6037 2.12961 13.6748 2.1416C13.7338 2.15162 13.7928 2.16178 13.8516 2.17285C13.9415 2.18969 14.031 2.20734 14.1201 2.22656C14.1427 2.23145 14.165 2.23715 14.1875 2.24219C14.5091 2.31395 14.8247 2.40101 15.1338 2.50293C15.1546 2.5098 15.1755 2.51643 15.1963 2.52344C15.9436 2.77532 16.6511 3.11248 17.3076 3.52441C17.3391 3.54411 17.3711 3.56295 17.4023 3.58301L17.5518 3.68164C17.6041 3.71664 17.6554 3.75311 17.707 3.78906C17.778 3.83839 17.8484 3.88839 17.918 3.93945C17.9631 3.97267 18.0081 4.00608 18.0527 4.04004C18.1296 4.09846 18.2053 4.15822 18.2803 4.21875C18.3174 4.24873 18.3549 4.2781 18.3916 4.30859C18.6165 4.49543 18.832 4.69233 19.0391 4.89746C19.0669 4.92501 19.0946 4.9526 19.1221 4.98047C19.2073 5.06693 19.2911 5.1547 19.373 5.24414C19.3877 5.2601 19.4025 5.27593 19.417 5.29199C19.6163 5.51229 19.8055 5.74138 19.9844 5.97852C20.0165 6.02106 20.0476 6.06435 20.0791 6.10742C20.131 6.17849 20.1824 6.24982 20.2324 6.32227C20.2714 6.37863 20.3089 6.43597 20.3467 6.49316C20.3834 6.54878 20.4195 6.60476 20.4551 6.66113C20.4939 6.72255 20.5337 6.78339 20.5713 6.8457C20.6403 6.96046 20.707 7.07671 20.7715 7.19434C20.7942 7.23568 20.8158 7.27764 20.8379 7.31934C20.877 7.39314 20.9158 7.46713 20.9531 7.54199C20.9961 7.62817 21.0376 7.71516 21.0781 7.80273C21.0902 7.82892 21.1014 7.85553 21.1133 7.88184C21.3014 8.29734 21.4622 8.72744 21.5928 9.1709C21.6044 9.21016 21.6149 9.24969 21.626 9.28906C21.7011 9.55628 21.7654 9.82774 21.8184 10.1035C21.837 10.2 21.8543 10.2966 21.8701 10.3936C21.8787 10.4465 21.8868 10.4995 21.8945 10.5527C21.9388 10.8556 21.97 11.1602 21.9863 11.4658C21.9869 11.4775 21.9877 11.4892 21.9883 11.501C21.996 11.6561 21.9995 11.8114 22 11.9668C22 11.9778 22.001 11.9889 22.001 12C22.001 12.0068 22 12.0137 22 12.0205C21.9993 12.339 21.9833 12.6576 21.9521 12.9756C21.9485 13.0134 21.9445 13.0512 21.9404 13.0889C21.9287 13.1955 21.9146 13.3018 21.8994 13.4082C21.892 13.461 21.8852 13.5138 21.877 13.5664C21.8571 13.6913 21.8361 13.8161 21.8115 13.9404C21.7927 14.0361 21.7706 14.1309 21.749 14.2256C21.7395 14.2673 21.7298 14.309 21.7197 14.3506C21.6967 14.4462 21.6723 14.5412 21.6465 14.6357C21.6359 14.6745 21.6253 14.7133 21.6143 14.752C21.4022 15.4941 21.1076 16.2006 20.7393 16.8613C20.6966 16.938 20.6531 17.0143 20.6084 17.0898C20.5677 17.1585 20.5257 17.2263 20.4834 17.2939C20.4431 17.3584 20.4011 17.4218 20.3594 17.4854C20.3309 17.5286 20.3035 17.5725 20.2744 17.6152C20.194 17.7336 20.1119 17.8508 20.0264 17.9658C20.0058 17.9934 19.9847 18.0205 19.9639 18.0479C19.8949 18.1386 19.8241 18.2279 19.752 18.3164C19.7249 18.3496 19.6974 18.3822 19.6699 18.415C19.5936 18.5063 19.5163 18.5969 19.4365 18.6855C19.421 18.7029 19.4053 18.7201 19.3896 18.7373C19.2864 18.8505 19.181 18.9626 19.0723 19.0713C17.2626 20.881 14.7625 21.9999 12.001 22C9.23949 22 6.73942 20.8809 4.92969 19.0713L4.7998 18.9395C4.63097 18.7642 4.46941 18.5827 4.31445 18.3965C4.27963 18.3547 4.24606 18.3119 4.21191 18.2695C4.15634 18.2005 4.10151 18.131 4.04785 18.0605C4.01175 18.0132 3.9757 17.9659 3.94043 17.918C3.88957 17.8487 3.84004 17.7785 3.79102 17.708C3.73122 17.6222 3.67335 17.535 3.61621 17.4473C3.57862 17.3894 3.54028 17.332 3.50391 17.2734C3.45996 17.2028 3.41722 17.1314 3.375 17.0596C3.35471 17.025 3.3353 16.9899 3.31543 16.9551C2.93464 16.2891 2.62795 15.5759 2.40723 14.8252C2.40036 14.8019 2.3944 14.7783 2.3877 14.7549C2.25669 14.2969 2.15659 13.8261 2.0918 13.3438C2.08341 13.2819 2.07558 13.2201 2.06836 13.1582C2.06001 13.0858 2.05172 13.0133 2.04492 12.9404C2.01765 12.6517 2.00406 12.3623 2.00195 12.0732C2.00178 12.0488 2 12.0244 2 12C2 11.9753 2.00177 11.9505 2.00195 11.9258C2.00411 11.6364 2.01773 11.3474 2.04492 11.0596C2.05193 10.9844 2.06067 10.9096 2.06934 10.835C2.07637 10.775 2.08465 10.7151 2.09277 10.6553C2.13443 10.3454 2.19041 10.0404 2.25977 9.74023C2.26489 9.71816 2.26914 9.69587 2.27441 9.67383C2.50356 8.71214 2.87187 7.8052 3.35645 6.97363C3.37528 6.94124 3.39292 6.90814 3.41211 6.87598C3.45182 6.80956 3.49298 6.74412 3.53418 6.67871C3.56465 6.63023 3.59567 6.58211 3.62695 6.53418C3.67438 6.46167 3.72224 6.38954 3.77148 6.31836C3.80305 6.27264 3.83585 6.22779 3.86816 6.18262C3.93002 6.09629 3.99311 6.011 4.05762 5.92676C4.12087 5.84403 4.1842 5.76136 4.25 5.68066C4.27937 5.64469 4.30999 5.60978 4.33984 5.57422C4.41282 5.48722 4.48659 5.40089 4.5625 5.31641C4.58438 5.29208 4.6068 5.26825 4.62891 5.24414C4.81948 5.0362 5.01867 4.83599 5.22656 4.64453C5.26843 4.60595 5.31099 4.56814 5.35352 4.53027C5.41935 4.47169 5.48627 4.41431 5.55371 4.35742C5.60033 4.31805 5.64699 4.27876 5.69434 4.24023C5.78961 4.1628 5.88611 4.08671 5.98438 4.0127C6.04446 3.96737 6.10587 3.92387 6.16699 3.87988C6.20879 3.84985 6.24969 3.81847 6.29199 3.78906L6.40918 3.70703C6.60192 3.57682 6.80094 3.45567 7.00293 3.33887C7.02997 3.32326 7.05681 3.30734 7.08398 3.29199C7.77187 2.90276 8.51021 2.59359 9.28711 2.375C9.31676 2.36664 9.34625 2.3577 9.37598 2.34961C9.46658 2.32502 9.55781 2.30236 9.64941 2.28027C9.69324 2.26967 9.73728 2.26001 9.78125 2.25C9.93716 2.21466 10.0943 2.18324 10.2529 2.15527C10.3034 2.14631 10.3537 2.13612 10.4043 2.12793C10.4708 2.11726 10.5376 2.10798 10.6045 2.09863C10.6909 2.08644 10.7774 2.07439 10.8643 2.06445C10.9272 2.05733 10.9904 2.05087 11.0537 2.04492C11.1894 2.032 11.3255 2.02104 11.4619 2.01367C11.4912 2.01212 11.5205 2.01204 11.5498 2.01074C11.6382 2.00675 11.7268 2.00262 11.8154 2.00098L12.001 2C12.1542 2 12.3074 2.00374 12.46 2.01074ZM6.25488 17.7451C7.72532 19.2157 9.75703 20.125 12.001 20.125C14.2447 20.1249 16.2757 19.2155 17.7461 17.7451L12.001 12L6.25488 17.7451ZM12.001 3.875C11.6334 3.875 11.2716 3.90096 10.917 3.94824C10.798 3.96427 10.6795 3.98266 10.5615 4.00391C10.4222 4.02881 10.2842 4.05696 10.1475 4.08887C9.50892 4.23852 8.88969 4.46518 8.30371 4.76465C8.19813 4.8187 8.09405 4.87512 7.99121 4.93359C7.81996 5.03078 7.65182 5.13422 7.4873 5.24414C7.43888 5.2765 7.3914 5.31041 7.34375 5.34375C7.08276 5.52669 6.83197 5.72297 6.59473 5.93457C6.55772 5.96755 6.52074 6.00055 6.48438 6.03418C6.24254 6.2579 6.01495 6.49666 5.80176 6.74805C5.7608 6.79639 5.72048 6.84525 5.68066 6.89453C5.48512 7.13629 5.30392 7.38983 5.13672 7.65332C5.00336 7.86392 4.87947 8.08088 4.76562 8.30371C4.75508 8.32432 4.74378 8.34453 4.7334 8.36523C4.6475 8.53698 4.56797 8.71239 4.49414 8.89062C4.23024 9.52779 4.05015 10.1924 3.95508 10.8682C3.95001 10.9045 3.94599 10.941 3.94141 10.9775C3.92768 11.0857 3.91561 11.1941 3.90625 11.3027C3.88907 11.5049 3.87906 11.709 3.87695 11.915C3.87648 11.96 3.8757 12.0049 3.87598 12.0498C3.87651 12.1377 3.87951 12.2253 3.88281 12.3125C3.88563 12.3858 3.88972 12.459 3.89453 12.5322C3.90519 12.6971 3.92106 12.8604 3.94141 13.0225C3.96526 13.2105 3.99508 13.3982 4.03223 13.585C4.22188 14.5384 4.58009 15.4447 5.08496 16.2637L10.6758 10.6738C11.0273 10.3224 11.5039 10.1251 12.001 10.125C12.4982 10.125 12.9755 10.3222 13.3271 10.6738L18.917 16.2637C19.0999 15.967 19.2628 15.6585 19.4062 15.3408C19.8644 14.327 20.1222 13.2037 20.125 12.0195C20.125 12.0019 20.1251 11.9844 20.125 11.9668C20.1229 11.4445 20.0709 10.9341 19.9746 10.4395C19.9316 10.2198 19.8785 10.0021 19.8174 9.78613C19.777 9.64323 19.7334 9.50189 19.6855 9.3623C19.6311 9.20371 19.5722 9.04618 19.5078 8.89062C19.4339 8.71223 19.3536 8.53712 19.2676 8.36523C19.2552 8.34062 19.2421 8.31646 19.2295 8.29199C19.1192 8.07701 18.9996 7.86763 18.8711 7.66406C18.0931 6.43387 16.995 5.42737 15.6924 4.76172C15.1118 4.46562 14.4984 4.24191 13.8662 4.09277C13.7214 4.05875 13.5754 4.02812 13.4277 4.00195C13.3181 3.9824 13.2081 3.96524 13.0977 3.9502C12.7389 3.90177 12.373 3.87501 12.001 3.875Z"/></svg>`
const IconRest      = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.34375 2C4.86134 2.00022 5.28125 2.41986 5.28125 2.9375V10.4375H19.6562C20.174 10.4375 20.5938 10.8572 20.5938 11.375V21.0625C20.5938 21.5803 20.174 22 19.6562 22C19.1386 21.9999 18.7188 21.5802 18.7188 21.0625V12.3125H5.28125V21.0625C5.28125 21.5801 4.86134 21.9998 4.34375 22C3.82597 22 3.40625 21.5803 3.40625 21.0625V2.9375C3.40625 2.41972 3.82597 2 4.34375 2Z"/></svg>`
const IconIdling    = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5.5C5 5.22386 5.22386 5 5.5 5H19V19H5.5C5.22386 19 5 18.7761 5 18.5V5.5Z" fill-opacity="0.5"/><path d="M12 5H18.5C18.7761 5 19 5.22386 19 5.5V18.5C19 18.7761 18.7761 19 18.5 19H12V5Z"/></svg>`
const IconOtherWork = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4143 3.48256C16.8973 2.99961 17.6803 2.99967 18.1633 3.48256L21.6379 6.95619C22.1208 7.43909 22.1206 8.22221 21.6379 8.70522L19.7844 10.5587C19.3014 11.0416 18.5183 11.0417 18.0354 10.5587L16.9563 9.47865L13.3127 13.1212L18.843 18.6525C19.2053 19.0147 19.2053 19.6018 18.843 19.964C18.4808 20.3259 17.8936 20.3261 17.5315 19.964L12.0012 14.4337L6.47192 19.964C6.10969 20.326 5.52256 20.3261 5.1604 19.964C4.79824 19.6018 4.7984 19.0147 5.1604 18.6525L10.6897 13.1222L7.04517 9.47768L5.96411 10.5587C5.48111 11.0415 4.698 11.0417 4.21509 10.5587L2.36255 8.70522C1.87958 8.22223 1.87957 7.43917 2.36255 6.95619L5.83618 3.48256C6.31916 2.99957 7.10222 2.99957 7.58521 3.48256L9.43872 5.3351C9.92158 5.81796 9.92133 6.60111 9.43872 7.08412L8.35669 8.16518L12.0012 11.8097L15.6448 8.16713L14.5618 7.08412C14.0789 6.60113 14.0788 5.81805 14.5618 5.3351L16.4143 3.48256Z"/></svg>`
const IconWarning   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`

const IconWifi = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 5.5C3.2 3.3 6 2 8 2s4.8 1.3 7 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M3 8c1.3-1.3 3-2 5-2s3.7.7 5 2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M5.5 10.5C6.1 10 7 9.5 8 9.5s1.9.5 2.5 1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><circle cx="8" cy="13" r="1" fill="currentColor"/></svg>`
const IconTruck = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 3.5h9v7H1V3.5z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M10 5.5h2.5l2 3V10.5h-4.5v-5z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><circle cx="3.5" cy="11.5" r="1.25" stroke="currentColor" stroke-width="1.25"/><circle cx="11.5" cy="11.5" r="1.25" stroke="currentColor" stroke-width="1.25"/></svg>`
const IconAlert = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L14.5 13H1.5L8 2z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M8 6.5v3M8 11h.01" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconFilter = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`
const IconClock  = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.25"/><path d="M8 5v3.5l2 1.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconCheck  = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

// Dismissible demo
const activeFilters = ref(['Active', 'Region: North', 'Type: HGV', 'Driver assigned'])
function removeFilter(label) {
  activeFilters.value = activeFilters.value.filter(f => f !== label)
}
function resetFilters() {
  activeFilters.value = ['Active', 'Region: North', 'Type: HGV', 'Driver assigned']
}
</script>

<template>
  <main class="ds-main">

    <!-- Header -->
    <section class="ds-section">
      <h1 class="ds-h1">Tag</h1>
      <p class="ds-lead">10 types · 2 sizes · icon support · dismissible</p>
      <p class="ds-body">
        Tags communicate status, category, or metadata at a glance.
        Use them on vehicle lists, driver cards, and filter bars.
        Tags are non-interactive by default — add <code>dismissible</code> only when the user can remove them.
      </p>
    </section>

    <!-- All types -->
    <section class="ds-section">
      <h2 class="ds-h2">Types</h2>
      <p class="ds-body">All 10 semantic types. Hover each row to see the hover state.</p>
      <div class="ds-table-wrap">
        <table class="ds-state-table">
          <thead>
            <tr>
              <th class="ds-state-table__label">Type</th>
              <th>Tag</th>
              <th>With icon</th>
              <th>Dismissible</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in types" :key="t">
              <td class="ds-state-table__label">
                <strong>{{ typeLabels[t] }}</strong>
                <span>{{ typeDescriptions[t] }}</span>
              </td>
              <td>
                <AppTag :type="t">{{ typeLabels[t] }}</AppTag>
              </td>
              <td>
                <AppTag :type="t">
                  <template #icon><span v-html="IconDot" /></template>
                  {{ typeLabels[t] }}
                </AppTag>
              </td>
              <td>
                <AppTag :type="t" :dismissible="true">{{ typeLabels[t] }}</AppTag>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Icon variants -->
    <section class="ds-section">
      <h2 class="ds-h2">Icon Variants</h2>
      <p class="ds-body">
        Pass any 16×16 icon into the <code>#icon</code> slot.
        When only an icon is provided (no label, not dismissible), padding collapses to a square.
      </p>
      <div class="ds-card">
        <div class="ds-tag-group">
          <p class="ds-tag-group__label">Icon + Label</p>
          <div class="ds-tag-row">
            <AppTag type="success">
              <template #icon><span v-html="IconDriving" /></template>
              Driving
            </AppTag>
            <AppTag type="neutral">
              <template #icon><span v-html="IconRest" /></template>
              Resting
            </AppTag>
            <AppTag type="neutral-outline">
              <template #icon><span v-html="IconDot" /></template>
              Unknown
            </AppTag>
            <AppTag type="danger">
              <template #icon><span v-html="IconWarning" /></template>
              Fault
            </AppTag>
            <AppTag type="informational">
              <template #icon><span v-html="IconIdling" /></template>
              Idling
            </AppTag>
            <AppTag type="highlight">
              <template #icon><span v-html="IconOtherWork" /></template>
              Other work
            </AppTag>
            <AppTag type="moderate">
              <template #icon><span v-html="IconWarning" /></template>
              Warning
            </AppTag>
          </div>
        </div>
        <div class="ds-tag-group">
          <p class="ds-tag-group__label">Label only</p>
          <div class="ds-tag-row">
            <AppTag type="neutral">Neutral</AppTag>
            <AppTag type="success">Active</AppTag>
            <AppTag type="danger">Offline</AppTag>
            <AppTag type="warning">Warning</AppTag>
            <AppTag type="informational">Pending</AppTag>
          </div>
        </div>
        <div class="ds-tag-group">
          <p class="ds-tag-group__label">Icon only</p>
          <div class="ds-tag-row">
            <AppTag type="success" :aria-label="'Driving'">
              <template #icon><span v-html="IconDriving" /></template>
            </AppTag>
            <AppTag type="neutral" :aria-label="'Resting'">
              <template #icon><span v-html="IconRest" /></template>
            </AppTag>
            <AppTag type="neutral-outline" :aria-label="'Unknown'">
              <template #icon><span v-html="IconDot" /></template>
            </AppTag>
            <AppTag type="danger" :aria-label="'Fault'">
              <template #icon><span v-html="IconWarning" /></template>
            </AppTag>
            <AppTag type="informational" :aria-label="'Idling'">
              <template #icon><span v-html="IconIdling" /></template>
            </AppTag>
            <AppTag type="highlight" :aria-label="'Other work'">
              <template #icon><span v-html="IconOtherWork" /></template>
            </AppTag>
            <AppTag type="moderate" :aria-label="'Warning'">
              <template #icon><span v-html="IconWarning" /></template>
            </AppTag>
          </div>
        </div>
        <div class="ds-tag-group">
          <p class="ds-tag-group__label">Icon + Dismissible</p>
          <div class="ds-tag-row">
            <AppTag type="neutral" :dismissible="true">
              <template #icon><span v-html="IconFilter" /></template>
              Active
            </AppTag>
            <AppTag type="informational" :dismissible="true">
              <template #icon><span v-html="IconTruck" /></template>
              HGV
            </AppTag>
            <AppTag type="highlight" :dismissible="true">
              <template #icon><span v-html="IconCheck" /></template>
              Inspected
            </AppTag>
          </div>
        </div>
      </div>
    </section>

    <!-- Sizes -->
    <section class="ds-section">
      <h2 class="ds-h2">Sizes</h2>
      <div class="ds-sizes-grid">
        <div class="ds-sizes-card">
          <p class="ds-sizes-card__title">SM — 24px (default)</p>
          <p class="ds-body" style="margin-bottom:16px">
            Standard tag. Used inline with text, in table cells, and on list items.
          </p>
          <div class="ds-tag-row">
            <AppTag type="neutral" size="sm">Label</AppTag>
            <AppTag type="success" size="sm">
              <template #icon><span v-html="IconDot" /></template>
              Active
            </AppTag>
            <AppTag type="danger" size="sm" :dismissible="true">Fault</AppTag>
          </div>
        </div>
        <div class="ds-sizes-card">
          <p class="ds-sizes-card__title">MD — 56px (card tag)</p>
          <p class="ds-body" style="margin-bottom:16px">
            Two-line card tag: <code>cardTitle</code> above, slot content below.
            Used as a prominent status indicator on vehicle or driver cards.
          </p>
          <div class="ds-tag-row">
            <AppTag type="success" size="md" card-title="Vehicle status">
              Active
            </AppTag>
            <AppTag type="danger" size="md" card-title="Fault code">
              P0401
            </AppTag>
            <AppTag type="informational" size="md" card-title="Last sync">
              2 min ago
            </AppTag>
            <AppTag type="highlight" size="md" card-title="Region">
              North
            </AppTag>
          </div>
        </div>
      </div>
    </section>

    <!-- Dismissible demo -->
    <section class="ds-section">
      <h2 class="ds-h2">Dismissible</h2>
      <p class="ds-body">
        Add <code>dismissible</code> to show the × button. The tag emits a <code>dismiss</code> event —
        remove it from your list on that event. Never use dismissible on status-only tags.
      </p>
      <div class="ds-card">
        <p class="ds-example-card__label">Active filters</p>
        <div class="ds-dismiss-demo">
          <div class="ds-tag-row" v-if="activeFilters.length">
            <AppTag
              v-for="label in activeFilters"
              :key="label"
              type="neutral-outline"
              :dismissible="true"
              @dismiss="removeFilter(label)"
            >{{ label }}</AppTag>
          </div>
          <p v-else class="ds-body" style="color:var(--grey-50);font-style:italic">All filters cleared.</p>
          <button class="ds-reset-btn" @click="resetFilters">Reset</button>
        </div>
      </div>
    </section>

    <!-- Usage examples -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage Examples</h2>
      <div class="ds-examples">

        <div class="ds-example-card">
          <p class="ds-example-card__label">Asset status examples</p>
          <div class="ds-example-card__body">
            <div class="ds-list-row">
              <span class="ds-list-label">Volvo FH16 · PL22 KXB</span>
              <div class="ds-tag-row">
                <AppTag type="success">
                  <template #icon><span v-html="IconDot" /></template>
                  Online
                </AppTag>
                <AppTag type="neutral">HGV</AppTag>
                <AppTag type="informational">Syncing</AppTag>
              </div>
            </div>
            <div class="ds-list-row">
              <span class="ds-list-label">DAF XF · MN71 TRK</span>
              <div class="ds-tag-row">
                <AppTag type="danger">
                  <template #icon><span v-html="IconDot" /></template>
                  Offline
                </AppTag>
                <AppTag type="warning">Engine warning</AppTag>
              </div>
            </div>
            <div class="ds-list-row">
              <span class="ds-list-label">Mercedes Actros · LD70 ACT</span>
              <div class="ds-tag-row">
                <AppTag type="moderate">
                  <template #icon><span v-html="IconDot" /></template>
                  Idle
                </AppTag>
                <AppTag type="neutral">Van</AppTag>
              </div>
            </div>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-card__label">Filter bar</p>
          <div class="ds-example-card__body">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="font-size:12px;font-weight:600;color:var(--grey-60)">Filters:</span>
              <AppTag type="neutral-outline" :dismissible="true">
                <template #icon><span v-html="IconFilter" /></template>
                Status: Active
              </AppTag>
              <AppTag type="neutral-outline" :dismissible="true">Region: North</AppTag>
              <AppTag type="neutral-outline" :dismissible="true">Type: HGV</AppTag>
              <AppTag type="highlight" :dismissible="true">Selected: 12</AppTag>
            </div>
          </div>
        </div>

        <div class="ds-example-card">
          <p class="ds-example-card__label">Fault / alert context</p>
          <div class="ds-example-card__body">
            <div class="ds-fault-row">
              <AppTag type="danger">
                <template #icon><span v-html="IconAlert" /></template>
                Critical
              </AppTag>
              <span class="ds-fault-text">ABS sensor failure — rear axle</span>
            </div>
            <div class="ds-fault-row">
              <AppTag type="warning">
                <template #icon><span v-html="IconAlert" /></template>
                Warning
              </AppTag>
              <span class="ds-fault-text">Tyre pressure low — front left</span>
            </div>
            <div class="ds-fault-row">
              <AppTag type="moderate">
                <template #icon><span v-html="IconClock" /></template>
                Scheduled
              </AppTag>
              <span class="ds-fault-text">Service due in 1,200 km</span>
            </div>
            <div class="ds-fault-row">
              <AppTag type="success">
                <template #icon><span v-html="IconCheck" /></template>
                Resolved
              </AppTag>
              <span class="ds-fault-text">Brake fluid replaced</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Token reference -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <div class="ds-token-grid">

        <div class="ds-token-card">
          <p class="ds-token-card__title">Neutral</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td><td><span class="swatch" style="background:#e6e6e7"></span>#e6e6e7</td></tr>
              <tr><td>Text</td>      <td><span class="swatch" style="background:#5d6065"></span>#5d6065</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#c0c2c6"></span>#c0c2c6</td></tr>
              <tr><td>Hover text</td>  <td><span class="swatch" style="background:#36383b"></span>#36383b</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Neutral Outline</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#ffffff;border:1px solid #d8d8da"></span>#ffffff</td></tr>
              <tr><td>Border</td>      <td><span class="swatch" style="background:#c0c2c6"></span>#c0c2c6</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#6f7176"></span>#6f7176</td></tr>
              <tr><td>Hover bg</td>    <td><span class="swatch" style="background:#f7f7f8"></span>#f7f7f8</td></tr>
              <tr><td>Hover text</td>  <td><span class="swatch" style="background:#36383b"></span>#36383b</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Neutral Inverted</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#6f7176"></span>#6f7176</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#f1f1f2;border:1px solid #d8d8da"></span>#f1f1f2</td></tr>
              <tr><td>Hover bg</td>    <td><span class="swatch" style="background:#5d6065"></span>#5d6065</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#6f7176"></span>#6f7176</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Success</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#c5f2cb"></span>#c5f2cb</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#12591c"></span>#12591c</td></tr>
              <tr><td>Hover bg</td>    <td><span class="swatch" style="background:#a8ebb2"></span>#a8ebb2</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#64d074"></span>#64d074</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Success Strong</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#247a31"></span>#247a31</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#f1fcf2;border:1px solid #d8d8da"></span>#f1fcf2</td></tr>
              <tr><td>Hover bg</td>    <td><span class="swatch" style="background:#12591c"></span>#12591c</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#469852"></span>#469852</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Informational</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#b3e1f7"></span>#b3e1f7</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#013b57"></span>#013b57</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#61bde9"></span>#61bde9</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Danger</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#fecaca"></span>#fecaca</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#781212"></span>#781212</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#fca5a5"></span>#fca5a5</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Warning</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#ffe2cc"></span>#ffe2cc</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#702822"></span>#702822</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#ffa767"></span>#ffa767</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Moderate</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#ffeec7"></span>#ffeec7</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#927302"></span>#927302</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#fde9b9"></span>#fde9b9</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ds-token-card">
          <p class="ds-token-card__title">Highlight</p>
          <table class="ds-token-table">
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Background</td>  <td><span class="swatch" style="background:#e4daff"></span>#e4daff</td></tr>
              <tr><td>Text</td>        <td><span class="swatch" style="background:#553698"></span>#553698</td></tr>
              <tr><td>Hover border</td><td><span class="swatch" style="background:#bea3fd"></span>#bea3fd</td></tr>
              <tr><td>Hover text</td>  <td><span class="swatch" style="background:#02005f"></span>#02005f</td></tr>
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

/* ── Table ─────────────────────────────────────────────────────── */
.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-state-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-state-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 12px 20px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-state-table tbody td { padding: 14px 20px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; }
.ds-state-table tbody tr:last-child td { border-bottom: none; }
.ds-state-table tbody tr:hover > td { background: var(--grey-05); }
.ds-state-table__label { min-width: 200px; }
.ds-state-table__label strong { display: block; font-size: 13px; font-weight: 600; color: var(--grey-90); margin-bottom: 3px; }
.ds-state-table__label span   { display: block; font-size: 12px; color: var(--grey-60); line-height: 1.4; }

/* ── Card container ─────────────────────────────────────────────── */
.ds-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 24px; display: flex; flex-direction: column; gap: 24px; }

/* ── Tag row / group ─────────────────────────────────────────────── */
.ds-tag-row   { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.ds-tag-group { display: flex; flex-direction: column; gap: 12px; }
.ds-tag-group__label { font-size: 12px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .06em; }

/* ── Sizes ───────────────────────────────────────────────────────── */
.ds-sizes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
.ds-sizes-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; }
.ds-sizes-card__title { font-size: 13px; font-weight: 600; color: var(--grey-70); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; }

/* ── Dismissible demo ─────────────────────────────────────────────── */
.ds-dismiss-demo { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.ds-reset-btn {
  font-size: 12px; font-family: 'Roboto', sans-serif;
  color: var(--grey-70); background: none; border: 1px solid var(--grey-20);
  border-radius: 4px; padding: 4px 10px; cursor: pointer;
  transition: background 100ms, border-color 100ms;
}
.ds-reset-btn:hover { background: var(--grey-05); border-color: var(--grey-40); }

/* ── Examples ─────────────────────────────────────────────────────── */
.ds-examples { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px; }
.ds-example-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.ds-example-card__label { font-size: 11px; font-weight: 600; color: var(--grey-60); text-transform: uppercase; letter-spacing: .07em; padding: 10px 16px; background: var(--grey-05); border-bottom: 1px solid var(--grey-20); }
.ds-example-card__body { padding: 20px 16px; }

/* Vehicle list */
.ds-list-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--grey-10); flex-wrap: wrap; }
.ds-list-row:last-child { border-bottom: none; }
.ds-list-label { font-size: 13px; font-weight: 500; color: var(--grey-90); }

/* Driver card */
.ds-driver-card { background: var(--grey-05); border-radius: 8px; padding: 16px; }
.ds-driver-info { display: flex; align-items: center; gap: 12px; }
.ds-driver-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--grey-20); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: var(--grey-70); flex-shrink: 0; }
.ds-driver-info strong { font-size: 14px; font-weight: 600; color: var(--grey-90); display: block; }

/* Vehicle card */
.ds-vehicle-card { background: var(--grey-05); border-radius: 8px; padding: 16px; }
.ds-vehicle-card__header { display: flex; flex-direction: column; gap: 2px; }
.ds-vehicle-card__header strong { font-size: 14px; font-weight: 600; color: var(--grey-90); }

/* Fault rows */
.ds-fault-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; border-bottom: 1px solid var(--grey-10); }
.ds-fault-row:last-child { border-bottom: none; }
.ds-fault-text { font-size: 13px; color: var(--grey-80); }

/* Do / Don't */
.ds-do-dont { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-do { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 6px; background: var(--grey-05); }
.ds-do__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 2px; }
.ds-do__label--do   { color: #12591c; }
.ds-do__label--dont { color: #781212; }
.ds-do__note { font-size: 11px; color: var(--grey-60); line-height: 1.4; margin-top: 4px; }

/* ── Token reference ──────────────────────────────────────────────── */
.ds-token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.ds-token-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; overflow: hidden; }
.ds-token-card__title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); padding: 10px 16px; background: var(--grey-05); border-bottom: 1px solid var(--grey-20); }
.ds-token-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.ds-token-table th { text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--grey-60); font-weight: 600; border-bottom: 1px solid var(--grey-10); }
.ds-token-table td { padding: 7px 12px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-80); }
.ds-token-table tr:last-child td { border-bottom: none; }

.swatch { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: middle; margin-right: 6px; flex-shrink: 0; }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-examples, .ds-sizes-grid, .ds-token-grid { grid-template-columns: 1fr; }
  .ds-do-dont { grid-template-columns: 1fr; }
}
</style>
