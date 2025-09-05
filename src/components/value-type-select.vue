<template>
  <el-select-v2 v-model='model' :options='filterOptions' @change='onChange' />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { ValueType } from './type';


const props = defineProps({
  types: {
    type: Array,
    default: undefined
  }
});

const model = defineModel<ValueType>();
if (!model.value) {
  model.value = 'string';
}

const emit = defineEmits(['change']);

const onChange = () => {
  emit('change', model.value);
};

const options = [
  {
    value: 'null',
    label: '空'
  },
  {
    value: 'string',
    label: '字符串'
  },
  {
    value: 'number',
    label: '数字'
  },
  {
    value: 'boolean',
    label: '布尔'
  },
  {
    value: 'object',
    label: '对象'
  },
  {
    value: 'array',
    label: '数组'
  }
];

let filterOptions:{
    value: string;
    label: string;
}[] = [];
if (Array.isArray(props.types)) {
  options.forEach(item => {
    if (props.types?.includes(item.value)) {
      filterOptions.push(item);
    }
  });
} else {
  filterOptions = options;
}
</script>

<style scoped>

</style>