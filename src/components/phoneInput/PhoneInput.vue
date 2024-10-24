<template>

  <div :class="['form-group', {invalid: error}]">
    <label :for="id">{{ label }}</label>
    <MaskInput
        v-model="inputValue"
        :type="type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        @input="updateValue"
        class="custom-input"
        mask="+7 (###) ###-##-##"
        @blur="blur"
    />
    <small class="error" v-if="error">{{error}}</small>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { MaskInput } from 'vue-3-mask';

interface IProps {
  label: string,
  type?: string,
  id?: string,
  name: string,
  placeholder?: string,
  modelValue: string
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
