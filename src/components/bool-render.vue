<template>
  <el-switch
    v-model='model' 
    :placeholder='placeholder' />
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ default: false });

defineProps({
  placeholder: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>

</style>