<template>
  <div class='pg-item-form'>
    <div class='label'>
      <slot name='label'>
        {{ label }}
      </slot>
    </div>
    <div class='content'>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
.pg-item-form{
  width: 100%;;
  display: flex;
  padding-bottom: 8px;

  .label{
    flex: none;
    width: 80px;
    font-size: 14px;
    color: #333;
    text-align: right;
    padding-right: 8px;
  }

  .content{
    flex: 1;
    overflow: hidden;
  }
}
</style>