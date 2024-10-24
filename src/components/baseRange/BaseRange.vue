<template>
  <div class="range-group">
    <label>{{ label }}</label>
    <div class="range-inputs">
      <div :class="['input-wrapper', {invalid: errorMin}]">
        <input
            type="number"
            v-model="minValue"
            :min="min"
            :max="max"
            class="input-field with-label"
            @input="onMinInput"
        />
        <span class="input-label">От</span>
        <small class="error" v-if="errorMin">{{ errorMin }}</small>
      </div>

      <div :class="['input-wrapper', {invalid: errorMax}]">
        <input
            type="number"
            v-model="maxValue"
            :min="min"
            :max="max"
            class="input-field with-label"
            @input="onMaxInput"
        />
        <span class="input-label">До</span>
        <small class="error" v-if="errorMax">{{ errorMax }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import './baseRange.scss'

interface IProps {
  label: string,
  min?: number,
  max?: number,
  modelValueMin: number,
  modelValueMax: number,
  errorMin?: string,
  errorMax?: string
}

const props = withDefaults(defineProps<IProps>(), {
  min: 0,
  max: 1000,
  modelValueMin: 0,
  modelValueMax: 1000
})

const emit = defineEmits(['update:modelValueMin', 'update:modelValueMax'])

const minValue = ref(props.modelValueMin);
const maxValue = ref(props.modelValueMax);

const onMinInput = () => {
  if (minValue.value > maxValue.value) {
    minValue.value = maxValue.value;
  }
  emit('update:modelValueMin', minValue.value);
};

const onMaxInput = () => {
  if (maxValue.value < minValue.value) {
    maxValue.value = minValue.value;
  }
  emit('update:modelValueMax', maxValue.value);
};

</script>
