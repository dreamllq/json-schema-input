<template>
  <div class='json-schema-render object-render any-object'>
    <el-button
      v-if='list.length === 0'
      type='primary'
      link
      @click='onAdd'>
      <el-icon><plus /></el-icon>
    </el-button>

    <template v-for='(item, index) in list' :key='index'>
      <div class='any-object-item'>
        <div class='select'>
          <any-object-item-render
            :model-value='item'
            :schema='schema'
            :render='render'
            @update:model-value='(val)=>onChange(index,val)' />
        </div>
        <div class='operator'>
          <el-button type='danger' link @click='onDelete(index)'>
            <el-icon><delete /></el-icon>
          </el-button>
          <el-button
            :style='{
              visibility: index === list.length - 1 ? "visible" : "hidden"
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
import { PropType, ref } from 'vue';
import AnyObjectItemRender from './any-object-item-render.vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import ValueTypeSelect from '../../value-type-select.vue';
import { ValueType } from '../../type';
import { JSONSchema7 } from 'json-schema';
import { getDefaultValueByType } from '@/components/get-default-value-by-type';

const props = defineProps({
  schema: {
    type: Object as PropType<JSONSchema7 | undefined>,
    default: undefined
  },
  render: {
    type: Object,
    default: undefined
  }
});

const model = defineModel<Record<string, any>>({ default: () => ({}) });

type ListItem ={
  key: string,
  value: any,
  valueType: ValueType
}

const list = ref<ListItem[]>(Object.keys(model.value).map(key => ({
  key,
  value: model.value[key], 
  valueType: typeof model.value[key] as ValueType
})));

const onAdd = () => {
  const valueType = props.schema ? props.schema.type as ValueType : 'string';
  list.value.push({
    key: '',
    value: getDefaultValueByType(valueType),
    valueType
  });
  transformObject();
};

const onChange = (index:number, val: ListItem) => {
  list.value[index] = val;
  transformObject();
};

const onDelete = (index:number) => {
  list.value = list.value.filter((_, i) => i !== index);
  transformObject();
};

const transformObject = () => {
  model.value = list.value.reduce((acc, cur) => {
    if (cur.key) {
      acc[cur.key] = cur.value;
    }
    return acc;
  }, {});
};
</script>

<style scoped lang="scss">
.any-object-item{
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