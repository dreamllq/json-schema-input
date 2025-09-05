<template>
  <input-layout>
    <component
      :is='component'
      v-if='component'
      v-model='model'
      :schema='cSchema' 
      :render='render' 
      v-bind='xProps' />
    <template v-if='schema?.description' #description>
      {{ schema?.description }}
    </template>
  </input-layout>
</template>

<script setup lang="ts">
import { JSONSchema7 } from 'json-schema';
import { computed, PropType, ref, watch } from 'vue';
import NotSupport from './not-support.vue';
import AnyRender from './any-render.vue';
import StringRender from './string-render.vue';
import NumberRender from './number-render.vue';
import BoolRender from './bool-render.vue';
import ObjectRender from './object-render/index.vue';
import ArrayRender from './array-render/index.vue';
import NullRender from './null-render.vue';
import IntegerRender from './integer-render.vue';
import InputLayout from './common/input-layout.vue';
import { cloneDeep } from 'lodash';
import { deepEqual } from './deep-equal';
import { compileIf, compileSchema } from '@/util/compile-schema';

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
const cSchema = ref(props.schema ? compileIf(props.schema, model.value) : undefined);
const xProps = computed(() => (cSchema.value?.['x-props'] as Record<string, any>) ?? {});

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

watch(() => props.schema, () => {
  cSchema.value = props.schema ? compileIf(props.schema, model.value) : undefined;
});

watch(model, () => {
  cSchema.value = props.schema ? compileIf(props.schema, model.value) : undefined;
});

const component = computed(() => {
  if (!cSchema.value) {
    return AnyRender;
  }

  if (cSchema.value['x-component']) {
    if (props.render) {
      const com = props.render[cSchema.value['x-component']];
      if (!com) {
        console.error(`render中不存在 ${cSchema.value['x-component']}`);
        console.log(props.render);
        return NotSupport;
      } else {
        return com;
      }
    } else {
      console.error(`render中不存在 ${cSchema.value['x-component']}`);
      console.log(props.render);
      return NotSupport;
    }

  }

  if (cSchema.value.type) {
    if (cSchema.value.type === 'string') {
      return StringRender;
    } else if (cSchema.value.type === 'number') {
      return NumberRender;
    } else if (cSchema.value.type === 'boolean') {
      return BoolRender;
    } else if (cSchema.value.type === 'object') {
      return ObjectRender;
    } else if (cSchema.value.type === 'array') {
      return ArrayRender;
    } else if (cSchema.value.type === 'integer') {
      return IntegerRender;
    } else if (cSchema.value.type === 'null') {
      return NullRender;
    }
  }

  return NotSupport;
});

</script>

<style scoped>

</style>