<template>
  <div class='json-schema-render array-render'>
    <el-button
      v-if='list.length === 0'
      type='primary'
      link
      @click='onAdd'>
      <el-icon><plus /></el-icon>
    </el-button>
    <template v-for='(item, index) in list' :key='index'>
      <div class='array-item'>
        <div class='select'>
          <template v-if='Array.isArray(schema?.items)'> 
            <json-schema-render :model-value='item' :schema='(schema?.items[index]) as JSONSchema7' @update:model-value='(val)=>onChange(index,val)' />
          </template>
          <template v-else>
            <json-schema-render :model-value='item' :schema='(schema?.items) as JSONSchema7' @update:model-value='(val)=>onChange(index,val)' />
          </template>
        </div>
        <div class='operator'>
          <el-button
            type='danger'
            link
            :style='{
              visibility: showDelete(index) ? "visible" : "hidden"
            }'
            @click='onDelete(index)'>
            <el-icon><delete /></el-icon>
          </el-button>
          <el-button
            :style='{
              visibility: showAdd(index) ? "visible" : "hidden"
            }'
            type='primary'
            link
            @click='onAdd'>
            <el-icon><plus /></el-icon>
          </el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import JsonSchemaRender from '../json-schema-render.vue';
import { PropType, ref, watch } from 'vue';
import { JSONSchema7 } from 'json-schema';
import { cloneDeep, isObject } from 'lodash';
import { deepEqual } from '../deep-equal';
import { getDefaultValueByType } from '../get-default-value-by-type';
import { ValueType } from '../type';

const props = defineProps({
  schema: {
    type: Object as PropType<JSONSchema7 | undefined>,
    default: undefined
  },
  render: {
    type: Object,
    default: undefined
  },
  modelValue: {
    type: Array,
    default: () => []
  }
});

const list = ref<any>(cloneDeep(props.modelValue));
const emits = defineEmits(['update:modelValue']);

const showAdd = (index: number) => {
  if (index < list.value.length - 1) return false;
  if (Array.isArray(props.schema?.items)) {
    if (list.value.length >= props.schema.items.length) {
      if (props.schema.additionalItems) {
        return true;
      } else {
        return false;
      }
    }
  }
  return true;
};

const showDelete = (index: number) => {
  if (Array.isArray(props.schema?.items)) {
    if (props.schema.additionalItems) {
      if (list.value.length <= props.schema.items.length) {
        if (index < list.value.length - 1) return false;
      } else {
        if (index < props.schema.items.length) return false;
      }
    } else {
      if (index < list.value.length - 1) return false;
    }
  }

  return true;
};

const onAdd = () => {
  let value: any = '';
  if (isObject(props.schema?.items) && (props.schema?.items as JSONSchema7).type) {
    value = getDefaultValueByType((props.schema?.items as JSONSchema7).type as ValueType);
  } else if (Array.isArray(props.schema?.items)) {
    const items = props.schema?.items as JSONSchema7[];
    const length = list.value.length;
    if (length < items.length) {
      const type = items[length].type as ValueType;
      value = getDefaultValueByType(type);
    }
  }

  list.value = [...list.value, value];
  emits('update:modelValue', cloneDeep(list.value));
};

const onChange = (index:number, val: any) => {
  list.value[index] = val;
  emits('update:modelValue', cloneDeep(list.value));
};

const onDelete = (index:number) => {
  list.value = list.value.filter((_, i) => i !== index);
  emits('update:modelValue', cloneDeep(list.value));
};

watch(props.modelValue, () => {
  if (!deepEqual(props.modelValue, list.value)) {
    list.value = cloneDeep(props.modelValue);
  }
}, { deep: true });
</script>

<style scoped lang="scss">
.array-item{
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--el-border-color);
  padding: 8px 0;
  .value-type{
    flex: none;
    padding-right: 8px;
  }
  
  .select{
    flex:1;
  }

  .operator{
    flex: none;
    padding-left: 8px;
  }
}
</style>