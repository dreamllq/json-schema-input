<template>
  <template v-if='schema?.properties'>
    <template v-for='(item, key) in schema.properties' :key='key'> 
      <form-item v-if='isObject(item)' :label='item.title'>
        <template #label>
          <el-button
            v-if='form[key] !==undefined'
            type='danger'
            link
            @click='delete form[key]'>
            <el-icon><delete /></el-icon>
          </el-button>
          {{ item.title }} 
        </template>

        <div style='flex: 1; '>
          <json-schema-render
            :model-value='form[key]'
            :schema='item'
            :render='render'
            @update:model-value='(val)=>onFormChange(key,val)' />
        </div>
      </form-item>
    </template>
  </template>

  <template v-if='schema?.additionalProperties === true'>
    <any-object-render v-model='anyForm' />
  </template>
  <template v-else-if='schema?.additionalProperties === false' />
  <template v-else-if='schema?.additionalProperties'>
    <any-object-render v-model='anyForm' :schema='schema.additionalProperties' :render='render' />
  </template>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import AnyObjectRender from './any-object-render/index.vue';
import { JSONSchema7 } from 'json-schema';
import JsonSchemaRender from '../json-schema-render.vue';
import { cloneDeep, difference, intersection, isObject } from 'lodash';
import FormItem from '../common/form-item.vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { deepEqual } from '../deep-equal';

const props = defineProps({
  schema: {
    type: Object as PropType<JSONSchema7 | undefined>,
    default: () => ({ additionalProperties: true })
  },
  render: {
    type: Object,
    default: undefined
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
});

const model = ref(props.modelValue);
const emits = defineEmits(['update:modelValue']);

const form = ref<any>({});
const anyForm = ref<any>({});

if (props.schema?.properties) {
  const keys = Object.keys(props.schema.properties);
  Object.keys(model.value).forEach(key => {
    if (!keys.includes(key)) {
      anyForm.value[key] = model.value[key];
    } else {
      form.value[key] = model.value[key];
    }
  });
} else {
  anyForm.value = model.value;
}

const onFormChange = (key, val) => {
  
  if (isObject(val) && Object.keys(val).length === 0) {
    delete form.value[key];
  } else {
    form.value[key] = val;
  }
};

watch(() => props.modelValue, () => {
  if (!deepEqual(model.value, props.modelValue)) {
    model.value = cloneDeep(props.modelValue);
  }
}, { deep: true });


watch(() => [form.value, anyForm.value], (newVAlue, oldValue) => {
  model.value = {
    ...anyForm.value,
    ...form.value
  };
  emits('update:modelValue', cloneDeep(model.value));
}, { deep: true });

watch(model, () => { 
  if (props.schema?.properties) {
    const keys = Object.keys(props.schema.properties);
    const _anyForm = {};
    const _form = {};
    Object.keys(model.value).forEach(key => {
      if (!keys.includes(key)) {
        _anyForm[key] = model.value[key];
      } else {
        _form[key] = model.value[key];
      }
    });
    Object.keys(form.value).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(_form, key)) {
        form.value[key] = _form[key];
      } else {
        delete form.value[key];
      }
    });

    Object.keys(_form).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(form.value, key)) {
        form.value[key] = _form[key];
      } 
    });


    Object.keys(anyForm.value).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(_anyForm, key)) {
        anyForm.value[key] = _anyForm[key];
      } else {
        delete anyForm.value[key];
      }
    });

    Object.keys(_anyForm).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(anyForm.value, key)) {
        anyForm.value[key] = _anyForm[key];
      } 
    });
  }
}, { deep: true });
</script>

<style scoped>

</style>