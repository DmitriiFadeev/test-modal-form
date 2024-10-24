<template>
  <form class="modal" @submit.prevent="onSubmit">
    <h2>Заполните заявку, чтобы стать резидентом</h2>
    <div class="modal-wrapper">
      <TextInput
          label="Наименование организации / ИП"
          id="org-name"
          name="org-name"
          v-model="orgName"
          :error="nError"
          @blur="nBlur"
      />

      <PhoneInput
          label="Контактный телефон"
          id="phone"
          name="phone"
          v-model="phone"
          :error="pError"
          @blur="pBlur"
      />

      <BaseSelect
          title="Тип помещения"
          :options="[
                {code: 1, name: 'Производственная площадь'},
                {code: 2, name: 'Офис'},
                {code: 3, name: 'Склад'}
            ]"
          :value="roomType"
          :limit="1"
          :multiple="true"
          :error="tError"
          @on-change="changeSelect($event)"
      />

      <TextInput
          label="Адрес"
          id="address"
          name="address"
          v-model="address"
          :error="aError"
          @blur="aBlur"
      />

      <RangeInput
          label="Площадь помещения (м²)"
          v-model:modelValueMin="spaceRangeMin"
          v-model:modelValueMax="spaceRangeMax"
          :error-min="sMinError"
          :error-max="sMaxError"
      />

      <DateRangeInput
          label="Дата начала аренды"
          v-model:start="rentStart"
          v-model:end="rentEnd"
          :error-start="rStartError"
          :error-end="rEndError"
      />

    </div>
    <Button text="Отправить" :disabled="isSubmitting"/>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import TextInput from '../textInput/TextInput.vue';
import RangeInput from '../baseRange/BaseRange.vue';
import DateRangeInput from '../dateRangeInput/DateRangeInput.vue';
import Button from '../button/Button.vue';
import PhoneInput from "../phoneInput/PhoneInput.vue";
import {useModalForm} from "./useModalForm.ts";
import './modalForm.scss'
import BaseSelect from "../baseSelect/BaseSelect.vue";

export default defineComponent({
  name: 'ModalForm',
  components: {
    VueFinalModal,
    BaseSelect,
    TextInput,
    RangeInput,
    DateRangeInput,
    Button,
    PhoneInput
  },
  emits: ['update:modelValue'],
  setup(_, {emit}) {
    const open = (val: any) => {
      emit('update:modelValue', val)
    }

    return {...useModalForm(), open}
  },

});
</script>
