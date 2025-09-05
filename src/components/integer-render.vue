<template>
  <el-select-v2 
    v-if='schema?.enum'
    v-model='model' 
    clearable
    :options='schema.enum.map(item=>({label: String(item), value: Math.floor(Number(item))}))' />
  <el-input-number
    v-else
    v-model='model'
    clearable
    type='number' 
    style='width: 100%'
    :step='1'
    step-strictly />
</template>

<script setup lang="ts">
import { JSONSchema7 } from 'json-schema';
import { PropType, ref, watch } from 'vue';

const model = defineModel<number>();

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
</script>

<style scoped>

</style>