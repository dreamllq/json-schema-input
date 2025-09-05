<template>
  <div>
    <form-item label='数据类型'>
      <div style='flex: 1'>
        <value-type-select v-model='valueType' :types='Array.isArray(schema?.oneOf)?schema.oneOf.map(s=>s.type):undefined' />
      </div>
    </form-item>
    <form-item v-if='valueType !== "null" && modelFlag === true' label='value'>
      <div style='flex: 1'>
        <json-schema-render
          v-model='model'
          :render='render'
          :schema='{type: valueType, additionalProperties: true}'
          @update:model-value='onUpdateModelValue' />
      </div>
    </form-item>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import ValueTypeSelect from './value-type-select.vue';
import { ValueType } from './type';
import { getValueType } from './utils/get-value-type';
import JsonSchemaRender from './json-schema-render.vue';
import { JSONSchema7 } from 'json-schema';
import FormItem from './common/form-item.vue';
import { deepEqual } from './deep-equal';

const props = defineProps({
  schema: {
    type: Object as PropType<JSONSchema7>,
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

const model = ref<any>(undefined);
const modelFlag = ref(true);
const emits = defineEmits(['update:modelValue']);

const defaultModelValue = ref();
const defaultValueType = ref();

if (Array.isArray(props.schema?.oneOf) && props.schema?.oneOf.length > 0) {
  const types = props.schema.oneOf.map(item => (item as JSONSchema7).type);
  defaultValueType.value = types[0];

  if (defaultValueType.value === 'object') {
    defaultModelValue.value = {};
  } else if (defaultValueType.value === 'array') {
    defaultModelValue.value = [];
  } else if (defaultValueType.value === 'boolean') {
    defaultModelValue.value = false;
  } else if (defaultValueType.value === 'number') {
    defaultModelValue.value = 0;
  } else if (defaultValueType.value === 'string') {
    defaultModelValue.value = '';
  } else if (defaultValueType.value === 'null') {
    defaultModelValue.value = null;
  }
}


if (props.modelValue !== undefined || props.modelValue !== null) {
  model.value = props.modelValue;
} else if (defaultValueType.value) {
  model.value = defaultModelValue.value;
}

const onUpdateModelValue = (val) => {
  
};


const valueType = ref<ValueType>(getValueType(model.value) as ValueType);

watch(() => props.modelValue, () => {
  console.log('modelValue', props.modelValue);

  if (!deepEqual(model.value, props.modelValue)) {
    model.value = props.modelValue;
    valueType.value = getValueType(model.value) as ValueType;
  }
}, { deep: true });


watch(model, () => {
  valueType.value = getValueType(model.value) as ValueType;
  emits('update:modelValue', model.value);
}, { deep: true });

watch(valueType, () => {
  if (valueType.value === 'object') {
    model.value = {};
  } else if (valueType.value === 'array') {
    model.value = [];
  } else if (valueType.value === 'boolean') {
    model.value = false;
  } else if (valueType.value === 'number') {
    model.value = 0;
  } else if (valueType.value === 'string') {
    model.value = '';
  } else if (valueType.value === 'null') {
    model.value = null;
  }

  emits('update:modelValue', model.value);
});

</script>

<style scoped>

</style>