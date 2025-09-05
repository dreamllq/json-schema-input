<template>
  <div>mix-object-additional-true</div>
  <div>
    <json-schema-input v-model='val' :schema='schema' />
  </div>
</template>

<script setup lang="ts">
import { JsonSchemaInput } from '@/index';
import { JSONSchema7 } from 'json-schema';
import { ref } from 'vue';
const val = ref([]);
const schema = ref<JSONSchema7>({
  type: 'object',
  additionalProperties: true,
  properties: {
    name: {
      type: 'string',
      title: '姓名'
    },
    age: {
      type: 'number',
      title: '年龄'
    }
  }
});
</script>

<style scoped>

</style>