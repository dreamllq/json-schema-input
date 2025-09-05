<template>
  <el-tabs v-model='activeName' @tab-change='onTabChange'>
    <template v-for='(item, index) in (schema?.anyOf as JSONSchema7[])' :key='index'>
      <el-tab-pane :label='item.title' :name='item.title'>
        <json-schema-item-render v-model='model' :schema='mergeSchema(item)' :render='render' />
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import JsonSchemaItemRender from './json-schema-item-render.vue';
import { cloneDeep, merge } from 'lodash';
import { deepEqual } from './deep-equal';
import { JSONSchema7 } from 'json-schema';

const props = defineProps({
  schema: {
    type: Object as PropType<JSONSchema7 | undefined>,
    default: undefined
  },
  render: {
    type: Object,
    default: undefined
  },
  modelValue: {
    type: [
      String,
      Number,
      Boolean,
      Array,
      Object
    ],
    default: undefined
  }
});
const emits = defineEmits(['update:modelValue']);

const model = ref(cloneDeep(props.modelValue));

watch(model, () => {
  if (!deepEqual(model.value, props.modelValue)) {
    emits('update:modelValue', cloneDeep(model.value));
  }
});

watch(() => props.modelValue, () => {
  if (!deepEqual(model.value, props.modelValue)) {
    model.value = cloneDeep(props.modelValue);
  }
});

const activeName = ref((props.schema!.anyOf![0] as JSONSchema7).title);

const mergeSchema = (schema: JSONSchema7) => { 
  const { anyOf, ...others } = props.schema!;
  return merge({}, schema, others);
};

const onTabChange = () => {
};
</script>

<style scoped>

</style>