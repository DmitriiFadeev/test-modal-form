<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import MyModal from "./MyModal.vue";
import ModalForm from "./modalForm/ModalForm.vue";
import Button from './button/Button.vue'

const { open } = useModal({
  component: MyModal,
  slots: {
    default: ModalForm,
  },
})
</script>

<template>
  <Button @click="() => open()" text="Open Modal"></Button>
</template>
