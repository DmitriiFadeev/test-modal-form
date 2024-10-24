<template>
  <div :class="['form-group', {invalid: error}]">
    <label :for="id">{{ label }}</label>
    <input
        :type="type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="updateValue"
        :class="['custom-input']"
        @blur="blur"
    />
    <small class="error" v-if="error">{{error}}</small>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import './textInput.scss'

interface IProps {
  label: string,
  type?: string,
  id: string,
  name: string,
  placeholder?: string,
  modelValue: string,
  error?: string
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  placeholder: '',
  modelValue: ''
})

const emits = defineEmits(['update:modelValue', 'blur'])
const inputValue = ref(props.modelValue);

const updateValue = () => {
  emits('update:modelValue', inputValue.value);
};

const blur = () => {
  emits('blur')
}
</script>

