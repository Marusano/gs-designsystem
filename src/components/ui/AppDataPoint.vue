<script setup>
/**
 * AppDataPoint — GSFleet Design System
 *
 * Displays a labelled data field. Read-only by default; when `editable`,
 * a dark 2 px border signals the field can be changed, the Edit button
 * appears on hover, and clicking it swaps the value for an inline
 * input/select with Save and Cancel actions.
 *
 * variant="card"        → vertical card (default; main use case)
 * variant="contextual"  → compact 3-column row for tables / condensed views
 *
 * @prop {string}   label       - Field label shown above the value
 * @prop {string}   modelValue  - Current value  (v-model)
 * @prop {string}   description - Optional sub-label between label and value
 * @prop {string}   variant     - 'card' | 'contextual'
 * @prop {string}   size        - 'sm' | 'md' | 'lg'
 * @prop {boolean}  editable    - Enables edit mode (dark border + Edit on hover)
 * @prop {string}   inputType   - 'text' | 'select'
 * @prop {Array}    options     - [{ value, label }] for inputType='select'
 * @prop {string}   valueType   - 'text' | 'link' | 'tag'
 * @prop {string}   linkHref    - href when valueType='link'
 * @prop {string}   tagType     - AppTag type when valueType='tag'
 * @prop {string}   emptyText   - Shown when value is empty
 * @prop {string}   secondary   - Secondary value (contextual variant only)
 * @prop {string}   forcedState - docs only: 'hover' | 'editing'
 *
 * Emits: update:modelValue, edit, save(value), cancel
 */
import { ref, computed, watch, nextTick } from 'vue'
import AppButton from './AppButton.vue'
import AppInput  from './AppInput.vue'
import AppSelect from './AppSelect.vue'
import AppTag    from './AppTag.vue'

const props = defineProps({
  label:       { type: String, required: true },
  modelValue:  { type: String, default: '' },
  description: { type: String, default: '' },
  variant:     {
    type: String, default: 'card',
    validator: (v) => ['card', 'contextual'].includes(v),
  },
  size:        {
    type: String, default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  editable:    { type: Boolean, default: false },
  inputType:   {
    type: String, default: 'text',
    validator: (v) => ['text', 'select'].includes(v),
  },
  options:     { type: Array, default: () => [] },
  valueType:   {
    type: String, default: 'text',
    validator: (v) => ['text', 'link', 'tag'].includes(v),
  },
  linkHref:    { type: String, default: '' },
  tagType:     { type: String, default: 'neutral' },
  emptyText:   { type: String, default: '' },
  secondary:   { type: String, default: '' },
  forcedState: {
    type: String, default: null,
    validator: (v) => [null, 'hover', 'editing'].includes(v),
  },
})

const emit = defineEmits(['update:modelValue', 'edit', 'save', 'cancel'])

// ── Edit state ───────────────────────────────────────────────
const editing = ref(props.forcedState === 'editing')
const draft   = ref(props.modelValue)

watch(() => props.modelValue, (v) => {
  if (!editing.value) draft.value = v
})
watch(() => props.forcedState, (v) => {
  editing.value = v === 'editing'
})

const editFieldRef = ref(null)

function startEdit() {
  draft.value = props.modelValue
  editing.value = true
  emit('edit')
  nextTick(() => {
    const wrap = editFieldRef.value?.$el ?? editFieldRef.value
    const el = wrap?.querySelector?.('input, select')
    el?.focus()
  })
}

function save() {
  emit('update:modelValue', draft.value)
  emit('save', draft.value)
  editing.value = false
}

function cancel() {
  draft.value = props.modelValue
  editing.value = false
  emit('cancel')
}

// ── Computed classes ─────────────────────────────────────────
const isHover   = computed(() => props.forcedState === 'hover')
const isEditing = computed(() => editing.value)
const hasValue  = computed(() => !!props.modelValue)

const rootClass = computed(() => ({
  'dp':                     true,
  [`dp--${props.variant}`]: true,
  [`dp--${props.size}`]:    true,
  'dp--editable':           props.editable,
  'dp--editing':            isEditing.value,
  'is-hover':               isHover.value,
}))
</script>

<template>
  <!-- ── Card variant ──────────────────────────────────────────── -->
  <div v-if="variant === 'card'" :class="rootClass">

    <!-- Label -->
    <span class="dp__label">{{ label }}</span>

    <!-- Optional description -->
    <span v-if="description" class="dp__desc">{{ description }}</span>

    <!-- Body: value + actions (or edit row) -->
    <div class="dp__body">

      <!-- Editing state: inline input/select + Save/Cancel -->
      <template v-if="isEditing">
        <div class="dp__edit-row">
          <AppInput
            v-if="inputType === 'text'"
            ref="editFieldRef"
            v-model="draft"
            :placeholder="emptyText || 'Type here'"
            class="dp__edit-field"
          />
          <AppSelect
            v-else
            ref="editFieldRef"
            v-model="draft"
            :options="options"
            :placeholder="emptyText || 'Please select'"
            class="dp__edit-field"
          />
          <div class="dp__save-actions">
            <AppButton variant="quiet" size="sm" @click="save">Save</AppButton>
            <AppButton variant="quiet" size="sm" @click="cancel">Cancel</AppButton>
          </div>
        </div>
      </template>

      <!-- Display state: value + optional Edit button -->
      <template v-else>
        <!-- Link value -->
        <a
          v-if="valueType === 'link' && hasValue"
          :href="linkHref"
          class="dp__value dp__value--link"
        >{{ modelValue }}</a>

        <!-- Tag value -->
        <AppTag
          v-else-if="valueType === 'tag' && hasValue"
          :type="tagType"
          size="sm"
          class="dp__value dp__value--tag"
        >{{ modelValue }}</AppTag>

        <!-- Text value (or empty) -->
        <span
          v-else
          class="dp__value"
          :class="{ 'dp__value--empty': !hasValue }"
        >{{ hasValue ? modelValue : emptyText }}</span>

        <!-- Edit button — visible on hover when editable -->
        <div v-if="editable" class="dp__actions">
          <AppButton variant="quiet" size="sm" @click="startEdit">Edit</AppButton>
        </div>
      </template>

    </div>
  </div>

  <!-- ── Contextual variant ─────────────────────────────────────── -->
  <div v-else :class="rootClass">
    <span class="dp__label">{{ label }}</span>
    <span
      class="dp__value"
      :class="{ 'dp__value--empty': !hasValue }"
    >{{ hasValue ? modelValue : emptyText }}</span>
    <span class="dp__secondary">{{ secondary }}</span>
  </div>
</template>

<style scoped>
/* ── Base ─────────────────────────────────────────────────────── */
.dp {
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  position: relative;
}

/* ── Card variant ─────────────────────────────────────────────── */
.dp--card {
  background: var(--color-surface-tertiary);
  border-radius: 6px;
  padding: 12px 14px;
  gap: 3px;
  transition: box-shadow 120ms ease;
}

/* Dark border on hover only (and while editing) */
.dp--card.dp--editable:hover,
.dp--card.dp--editable.is-hover,
.dp--card.dp--editing {
  box-shadow: inset 0 0 0 2px var(--grey-90);
}

/* Edit button fades in on hover; hide by default */
.dp--card.dp--editable .dp__actions {
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms ease;
}
.dp--card.dp--editable:hover .dp__actions,
.dp--card.dp--editable.is-hover .dp__actions {
  opacity: 1;
  pointer-events: auto;
}

/* ── Contextual variant ───────────────────────────────────────── */
.dp--contextual {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  column-gap: 12px;
  padding: 10px 14px;
  box-shadow: inset 0 -1px 0 var(--color-border-default);
}

/* ── Label ────────────────────────────────────────────────────── */
.dp__label {
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  color: var(--color-text-secondary);
  letter-spacing: 0.2px;
}

.dp--contextual .dp__label {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

/* ── Description ──────────────────────────────────────────────── */
.dp__desc {
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  color: var(--grey-60);
  font-style: italic;
}

/* ── Body row ─────────────────────────────────────────────────── */
.dp__body {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 20px;
  margin-top: 2px;
}

/* ── Value ────────────────────────────────────────────────────── */
.dp__value {
  flex: 1;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-text-primary);
}

.dp__value--empty {
  color: var(--color-text-disabled);
  font-style: italic;
}

.dp__value--link {
  color: var(--blue-azure-70);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}
.dp__value--link:hover { color: var(--blue-azure-100); }

/* Tag sits inline — remove flex:1 so it doesn't stretch */
.dp__value--tag {
  flex: 0 0 auto;
}

/* Contextual primary value: bold */
.dp--contextual .dp__value {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* ── Secondary (contextual only) ─────────────────────────────── */
.dp__secondary {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

/* ── Actions (Edit button) ────────────────────────────────────── */
.dp__actions {
  flex-shrink: 0;
}

/* ── Edit row ─────────────────────────────────────────────────── */
.dp__edit-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  width: 100%;
}

/* AppInput / AppSelect wrapper fills available width */
.dp__edit-field {
  flex: 1;
  min-width: 0;
}

/* Suppress AppInput / AppSelect label area when used inline */
.dp__edit-field :deep(.field__label),
.dp__edit-field :deep(.field__hint),
.dp__edit-field :deep(.field__error) {
  display: none;
}

.dp__save-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

/* ── Size — sm ────────────────────────────────────────────────── */
.dp--sm.dp--card { padding: 8px 12px; gap: 2px; }
.dp--sm .dp__label { font-size: 11px; }
.dp--sm .dp__value { font-size: 13px; font-weight: 600; }

/* ── Size — lg ────────────────────────────────────────────────── */
.dp--lg.dp--card { padding: 10px 14px; gap: 4px; }
.dp--lg .dp__label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--grey-60);
}
.dp--lg .dp__value {
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
}
</style>
