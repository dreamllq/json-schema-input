<template>
  <div>string</div>
  <div>
    <json-schema-input v-model='val' :schema='schema' />
  </div>
</template>

<script setup lang="ts">
import { JsonSchemaInput } from '@/index';
import { JSONSchema7 } from 'json-schema';
import { ref } from 'vue';
const val = ref('');
const schema = ref<JSONSchema7>({ type: 'string' });
</script>

<style scoped>

</style>