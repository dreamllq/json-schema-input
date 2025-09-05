<template>
  <div>number</div>
  <div>
    <json-schema-input v-model='val' :schema='schema' />
  </div>
</template>

<script setup lang="ts">
import { JsonSchemaInput } from '@/index';
import { JSONSchema7 } from 'json-schema';
import { ref } from 'vue';
const val = ref(0);
const schema = ref<JSONSchema7>({ type: 'number' });
</script>

<style scoped>

</style>