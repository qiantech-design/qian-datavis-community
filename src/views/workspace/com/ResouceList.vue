<template>
  <div>
    <div class="ui-workspace-card-list-header">
      <div>
        <div class="ui-workspace-button mini" v-if="state.visible" @click="handleSelectAll">
          <visui-icon name="ele-circleCheck" title=""></visui-icon>
          <span>全选</span>
        </div>
        <div class="ui-workspace-button mini" v-if="!state.visible" @click="handleOpen">
          <visui-icon name="ele-setting" title=""></visui-icon>
          <span>管理</span>
        </div>
        <div class="ui-workspace-button mini" v-if="state.visible" @click="handleClose">
          <visui-icon name="ele-close" title=""></visui-icon>
          <span>关闭</span>
        </div>
      </div>
    </div>
    <ul class="ui-workspace-card-list">
      <li class="ui-workspace-card-item" v-for="(item, index) in data" :key="index">
        <div class="image-content">
          <img :src="fileService + (item.thumbnail || item.url) + '?updated_at=' + item.updated_at" alt="" />
          <div class="action-content">
            <slot name="action" :item="item"></slot>
          </div>
        </div>
        <div class="text-content">
          {{ item.name }}
        </div>
        <div class="batch-content" v-if="state.visible">
          <el-checkbox v-model="item.selected" @change="handleSelected"></el-checkbox>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useDatavisApi } from '../hooks/useDatavisApi'
const apiHook = useDatavisApi()

const fileService = apiHook.fileService

const props = defineProps({
  data: {
    type: Array as any,

    default: () => []
  },
  props: {
    type: Object,
    default: () => ({
      id: 'id',
      name: 'name'
    })
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  visible: false
})
const emit = defineEmits(['selected'])

const handleOpen = () => {
  state.visible = true
}
const handleClose = () => {
  props.data.forEach((item: any) => (item.selected = false))
  emit('selected', [])
  state.visible = false
}

const handleSelectAll = () => {
  props.data.forEach((item: any) => (item.selected = true))
  const val = props.data.filter((item: any) => item.selected).map((item: any) => item[props.props.id])
  emit('selected', val)
}

const handleSelected = () => {
  const val = props.data.filter((item: any) => item.selected).map((item: any) => item[props.props.id])
  emit('selected', val)
}

const reset = () => {
  state.visible = false
  emit('selected', [])
}

defineExpose({ handleSelectAll, reset })
</script>
