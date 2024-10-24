<template>
  <button :class="['submit-btn', {disabled: disabled}]" @click="onClick">{{ text }}</button>
</template>

<script setup lang="ts">
import './button.scss'

interface IProps {
  text?: string,
  disabled?: boolean
}

defineProps<IProps>()
const emits = defineEmits(['click'])

const onClick = () => {
  emits('click');
};

</script>