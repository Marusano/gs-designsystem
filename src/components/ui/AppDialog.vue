<script setup>
import { computed } from 'vue'
import AppButton from './AppButton.vue'

const props = defineProps({
  modelValue:      { type: Boolean, default: false },
  type: {
    type: String,
    default: 'confirm',
    validator: v => ['confirm', 'change', 'danger'].includes(v),
  },
  state: {
    type: String,
    default: 'plain',
    validator: v => ['plain', 'warning', 'moderate', 'informational'].includes(v),
  },
  title:           { type: String, required: true },
  description:     { type: String, default: null },
  confirmLabel:    { type: String, default: null },
  cancelLabel:     { type: String, default: 'Cancel' },
  confirmQuestion: { type: String, default: null },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const DEFAULT_LABELS = {
  confirm: 'Confirm',
  change:  'Save changes',
  danger:  'Yes, permanently delete',
}

const computedConfirmLabel = computed(
  () => props.confirmLabel ?? DEFAULT_LABELS[props.type]
)

const confirmVariant = computed(() => props.type === 'danger' ? 'danger' : 'primary')

const hasInfoPanel = computed(() => props.state !== 'plain')

function handleConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}

function handleCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dlg-fade">
      <div
        v-if="modelValue"
        class="dlg-backdrop"
        role="dialog"
        aria-modal="true"
        @click.self="handleCancel"
      >
        <div class="dlg">

          <!-- Head -->
          <div class="dlg__head">
            <h5 class="dlg__title">{{ title }}</h5>
            <p v-if="description" class="dlg__desc">{{ description }}</p>
            <p v-if="confirmQuestion" class="dlg__confirm-question">{{ confirmQuestion }}</p>
          </div>

          <!-- Body (form rows, contextual data) -->
          <div v-if="$slots.default" class="dlg__body">
            <slot />
          </div>

          <!-- Info panel -->
          <div
            v-if="hasInfoPanel && $slots.info"
            :class="['dlg__info', `dlg__info--${state}`]"
          >
            <slot name="info" />
          </div>

          <!-- Actions -->
          <div class="dlg__actions">
            <AppButton variant="secondary" size="md" @click="handleCancel">
              {{ cancelLabel }}
            </AppButton>
            <AppButton :variant="confirmVariant" size="md" @click="handleConfirm">
              {{ computedConfirmLabel }}
            </AppButton>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dlg-backdrop {
  position: fixed;
  inset: 0;
  background: var(--dlg-backdrop);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dlg {
  background: var(--dlg-bg);
  border-radius: var(--dlg-radius);
  box-shadow: var(--dlg-shadow);
  width: var(--dlg-width);
  max-width: calc(100vw - 32px);
  font-family: 'Inter', sans-serif;
}

.dlg__head {
  padding: 20px 24px 16px;
}

.dlg__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dlg-title-color);
  margin: 0 0 6px;
  line-height: 1.3;
}

.dlg__desc {
  font-size: 14px;
  font-weight: 400;
  color: var(--dlg-desc-color);
  margin: 0;
  line-height: 1.5;
}

.dlg__confirm-question {
  font-size: 14px;
  font-weight: 700;
  color: var(--dlg-title-color);
  margin: 10px 0 0;
  line-height: 1.5;
}

.dlg__body {
  padding: 0 24px 8px;
}

.dlg__info {
  margin: 0 24px 8px;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--dlg-title-color);
}

.dlg__info--warning {
  background: var(--dlg-info-warning-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-warning-border);
}

.dlg__info--moderate {
  background: var(--dlg-info-moderate-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-moderate-border);
}

.dlg__info--informational {
  background: var(--dlg-info-info-bg);
  box-shadow: inset 0 0 0 1px var(--dlg-info-info-border);
}

.dlg__actions {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Transition */
.dlg-fade-enter-active,
.dlg-fade-leave-active {
  transition: opacity 0.15s ease;
}
.dlg-fade-enter-from,
.dlg-fade-leave-to {
  opacity: 0;
}
</style>
