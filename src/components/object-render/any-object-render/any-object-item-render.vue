<template>
  <div>
    <form-item v-if='!(schema && schema.type)' label='数据类型'>
      <div style='flex: 1'>
        <value-type-select v-model='valueType' :types='schema?[schema.type]:undefined' />
      </div>
    </form-item>
    <object-item-render v-model='objectItem' :schema='objectSchema' :render='render' />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import ValueTypeSelect from '../../value-type-select.vue';
import ObjectItemRender from '../object-item-render.vue';
import { ValueType } from '../../type';
import { JSONSchema7 } from 'json-schema';
import FormItem from '../../common/form-item.vue';
import { getDefaultValueByType } from '@/components/get-default-value-by-type';

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

type ListItem ={
  key: string,
  value: string,
  valueType: ValueType
}

const emits = defineEmits(['update:modelValue']);

const model = defineModel<ListItem>({
  default: () => ({
    key: '',
    value: '',
    valueType: 'string'
  }) 
});

const valueType = ref<ValueType>(model.value.valueType);
const objectItem = ref<{key: string, value: any}>({
  key: model.value.key,
  value: model.value.value
});

watch(model, () => {
  valueType.value = model.value.valueType;
  objectItem.value.key = model.value.key;
  objectItem.value.value = model.value.value;
}, { deep: true });

watch(valueType, () => {
  objectItem.value.value = getDefaultValueByType(valueType.value);
  model.value.valueType = valueType.value;
  emits('update:modelValue', model.value);
});

watch(objectItem, () => {
  model.value.key = objectItem.value.key;
  model.value.value = objectItem.value.value;
  emits('update:modelValue', model.value);
  
}, { deep: true });

const objectSchema = computed<JSONSchema7>(() => {
  if (props.schema) {
    return props.schema;
  }

  return {
    type: valueType.value,
    additionalProperties: true
  };
});

</script>

<style scoped>

</style>