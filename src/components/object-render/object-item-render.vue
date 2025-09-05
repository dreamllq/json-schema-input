<template>
  <form-item label='key'>
    <div style='flex: 1'>
      <el-input v-model='key' placeholder='key' />
    </div>
  </form-item>
  <form-item label='value'>
    <div style='flex: 1'>
      <json-schema-render v-model='value' :render='render' :schema='schema' />
    </div>
  </form-item>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { ValueType } from '../type';
import { getValueType } from '../utils/get-value-type';
import { JSONSchema7 } from 'json-schema';
import JsonSchemaRender from '../json-schema-render.vue';
import FormItem from '../common/form-item.vue';

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

console.log(props.schema);


type ObjectItem = {
  key: string;
  value: any;
}

const model = defineModel<ObjectItem>({
  default: () => ({
    key: '',
    value: '' 
  }) 
});

const key = ref<string>(model.value.key || '');
const value = ref<any>(model.value.value);
const valueType = ref<ValueType>(getValueType(value.value) as ValueType);

watch(model, () => {
  key.value = model.value.key;
  value.value = model.value.value;
  valueType.value = getValueType(value.value) as ValueType;
}, { deep: true });

watch(key, () => {
  model.value.key = key.value;
});

watch(value, () => {
  model.value.value = value.value;
});

</script>

<style scoped>

</style>