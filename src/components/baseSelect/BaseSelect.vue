<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue'
import IconClose from "../icons/IconClose.vue";
import IconArrow from "../icons/IconArrow.vue";
import {onClickOutside} from '@vueuse/core';
import './baseSelect.scss'

export interface Option {
  code: number;
  name: string
}
interface IProps {
  title?: string,
  label?: string
  options: Option[]
  value: Option[]
  limit: number
  multiple?: boolean
  error?: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  label: 'name',
  options: () => [],
  value: () => [],
  limit: 0,
  error: ''
});

const emits = defineEmits(['onChange', 'search', 'onSelectAll']);

const tags = ref<Option[]>([]);
const isShowList = ref(false)
const list = ref(null)

const hiddenTagsCount = computed(() => {
  return tags.value.length - props.limit
})

const onSelect = (option: Option) => {
  emits('onChange', {value: option, multiple: props.multiple});
};

const removeTag = (option: Option) => {
  emits('onChange', {value: option, multiple: props.multiple});
};

const showList = () => {
  isShowList.value = true
}

watch(
    () => props.value,
    async () => {
      tags.value = props.value;
    },
    {deep: true}
);

onMounted(() => {
  tags.value = props.value;
});

onClickOutside(list, () => (isShowList.value = false));
</script>

<template>
  <div class="select">
    <div :class="['select__wrapper', {invalid: error}]" @click="showList">
      <div class="select__head">
        <div class="select__label">{{ title }}</div>
      </div>
      <div class="select__inner" :class="{ 'select--open': isShowList }">
        <div ref="list">
          <div class="select__tags">
            <div
                v-for="(tag, index) in tags"
                v-show="index < limit"
                :key="tag.code"
                class="select__tag"
            >
              <span>{{ tag.name }}</span>
              <div class="select__close">
                <IconClose width="8" height="8" fill="#266d58" @click.stop="removeTag(tag)"/>
              </div>
            </div>
            <div
                v-if="hiddenTagsCount > 0"
                class="select__tag select__tag--more"
            >
              <span>Еще: {{ hiddenTagsCount }}</span>
              <div class="select__arrow">
                <IconArrow style="rotate: 180deg" width="16" height="16"/>
              </div>
            </div>
          </div>
          <div v-if="isShowList">
            <ul v-if="options.length" class="select__list">
              <li
                  v-for="option in options"
                  :key="option.code"
                  class="select__item"
                  :class="{
							'select__item--selected': !!tags.find(
								t => t.code === option.code
							)
						}"
                  @click.stop="onSelect(option)"
              >
                <div>
                  {{ option.name }}
                </div>
              </li>
            </ul>
            <ul v-if="!options.length" class="select__list">
              <li class="select__item no-click">Данных нет</li>
            </ul>
          </div>
          <div class="select__actions-arrow"></div>
        </div>
      </div>
    </div>
    <small class="error" v-if="error">{{error}}</small>
  </div>
</template>

