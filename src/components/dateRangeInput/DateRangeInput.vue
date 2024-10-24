<template>
  <div>
    <label>{{ label }}</label>
    <div class="date-range-container">
      <div :class="['date-input-wrapper', {invalid: errorStart}]">
        <span class="date-prefix">с</span>
        <input
            v-model="inputValueStart"
            type="date"
            class="date-input"
            @change="updateStart"
        />
        <small class="error" v-if="errorStart">{{errorStart}}</small>
      </div>
      <div :class="['date-input-wrapper', {invalid: errorEnd}]">
        <span class="date-prefix">по</span>
        <input
            v-model="inputValueEnd"
            type="date"
            class="date-input"
            @change="updateEnd"
        />
        <small class="error" v-if="errorEnd">{{errorEnd}}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import './dateRangeInput.scss'

interface IProps {
  label: string,
  start?: string
  end?: string
  errorStart?: string
  errorEnd?: string
}

const props = defineProps<IProps>()
const emits = defineEmits(['update:start', 'update:end'])

const inputValueStart = ref(props.start);
const inputValueEnd = ref(props.end);

const updateStart = () => {
  if (new Date(`${inputValueStart.value}`).getTime() > new Date(`${inputValueEnd.value}`).getTime()) {
    inputValueStart.value = inputValueEnd.value
  }
  emits('update:start', new Date(`${inputValueStart.value}`).toDateString());
};

const updateEnd = () => {
  if (new Date(`${inputValueEnd.value}`).getTime() < new Date(`${inputValueStart.value}`).getTime()) {
    inputValueEnd.value = inputValueStart.value
  }
  emits('update:end', new Date(`${inputValueEnd.value}`).toDateString());
};
</script>
