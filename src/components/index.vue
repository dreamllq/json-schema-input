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
import { computed, PropType, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import JsonSchemaRender from './json-schema-render.vue';
import ViewJson from './common/view-json.vue';

const model = defineModel<any>({ default: undefined });
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

const viewJsonRef = ref<InstanceType<typeof ViewJson>>();

const onView = () => {
  console.log(model.value);
  viewJsonRef.value?.show(model.value);
};
</script>

<style scoped>

</style>