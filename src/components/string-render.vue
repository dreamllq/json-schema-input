<template>
  <el-select-v2 
    v-if='schema?.enum'
    v-model='model' 
    clearable
    :options='schema.enum.map(item=>({label: item, value: item}))' />
  <el-input
    v-else
    v-model='model' 
    clearable
    type='textarea' />
</template>

<script setup lang="ts">
import { JSONSchema7 } from 'json-schema';
import { PropType, watch } from 'vue';
import { deepEqual } from './deep-equal';

const model = defineModel<string>({ default: '' });

const props = defineProps({
  schema: {
    type: Object as PropType<JSONSchema7 | undefined>,
    default: undefined
  },
  render: {
    type: Object,
    default: undefined
  }
});

watch(() => props.schema?.enum, (newValue, oldValue) => {
  if (!deepEqual(newValue, oldValue)) {
    model.value = '';
  }
}, { deep: true });
</script>

<style scoped>

</style>