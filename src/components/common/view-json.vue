<template>
  <el-dialog
    v-model='dialogVisible'
    title='数据查看'
    width='1000'
    append-to-body
  >
    <pre>{{ content }}</pre>
    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='dialogVisible = false'>
          取消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
const content = ref('');
const show = (json) => {
  content.value = JSON.stringify(json, null, 2);
  dialogVisible.value = true;
};

defineExpose({ show });
</script>
