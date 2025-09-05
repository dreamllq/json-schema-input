<template>
  <div>object-any-of</div>
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
  anyOf: [
    {
      type: 'object',
      properties: {
        b: {
          type: 'string',
          title: 'b'
        }
      },
      title: 'bb'
    },
    {
      type: 'object',
      properties: {
        c: {
          type: 'string',
          title: 'c'
        }
      },
      title: 'cc'
    }
  ]
  
});
</script>

<style scoped>

</style>