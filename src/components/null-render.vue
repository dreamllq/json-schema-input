<template>
  <el-input disabled />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const emits = defineEmits(['update:modelValue']);

onMounted(() => {
  emits('update:modelValue', undefined);
});
</script>

<style scoped>

</style>