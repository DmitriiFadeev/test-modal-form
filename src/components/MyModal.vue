<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import IconClose from "./icons/IconClose.vue";

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
  <VueFinalModal
      class="vueFinalModal"
      :content-class="['content-class']"
      @update:model-value="(val: any) => emit('update:modelValue', val)"
  >
    <div class="close" @click="emit('update:modelValue', false)">
      <IconClose />
    </div>
    <slot />
  </VueFinalModal>
</template>

<style>
.vueFinalModal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-class {
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
