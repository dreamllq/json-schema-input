<template>
  <div style='display: flex; width: 100%'>
    <div style='flex: 1'>
      <json-schema-render v-model='model' :render='render' :schema='schema' />
    </div>
    <div style='flex: none; padding-left: 8px;'>
      <el-button
        type='primary'
        link
        @click='onView'>
        <el-icon><search /></el-icon>
      </el-button>
    </div>
    <view-json ref='viewJsonRef' />
  </div>
</template>

<script setup lang="ts">
import { JSONSchema7 } from 'json-schema';
import { computed, PropType, ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import JsonSchemaRender from './json-schema-render.vue';
import ViewJson from './common/view-json.vue';
import { cloneDeep } from 'lodash';
import { deepEqual } from './deep-equal';

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
const viewJsonRef = ref<InstanceType<typeof ViewJson>>();

watch(() => props.modelValue, () => {
  if (!deepEqual(model.value, props.modelValue)) {
    model.value = cloneDeep(props.modelValue);
    emits('update:modelValue', model.value);
  }
}, { deep: true });

watch(model, () => {
  if (!deepEqual(model.value, props.modelValue)) {
    emits('update:modelValue', cloneDeep(model.value));
  }
});

const onView = () => {
  console.log(model.value);
  viewJsonRef.value?.show(model.value);
};
</script>

<style scoped>

</style>