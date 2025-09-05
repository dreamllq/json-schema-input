<template>
  <div>mix-array-additional-true</div>
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
  type: 'array',
  items: [
    { type: 'string' },
    { type: 'number' },
    { type: 'boolean' }
  ],
  additionalItems: true
});
</script>

<style scoped>

</style>