<template>
  <div>
    <slot />
  </div>
  <div v-if='slots.description' style='font-size: 12px; padding-top: 8px; color: #90939D;line-height: 1;'>
    <slot name='description' />
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<style scoped>

</style>