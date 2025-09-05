<template>
  <div>object-if</div>
  <div>
    <json-schema-input v-model='val' :schema='schema' />
  </div>
</template>

<script setup lang="ts">
import { JsonSchemaInput } from '@/index';
import { JSONSchema7 } from 'json-schema';
import { ref } from 'vue';
const val = ref({});
const schema = ref<JSONSchema7>({
  type: 'object',
  properties: {
    a: {
      type: 'string',
      enum: ['a', 'b'],
      title: 'a'
    },
    b: {
      type: 'string',
      enum: ['d', 'e'],
      title: 'b'
    }
  },
  if: {
    properties: { a: { const: 'a' } },
    required: ['a'] 
  },
  then: { properties: { b: { enum: ['b', 'c'] } } }
});
</script>

<style scoped>

</style>