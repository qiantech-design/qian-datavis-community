<template>
  <div>
    <el-form label-width="90px" label-position="left" v-if="pageConfig">
      <div style="padding-top: 14px"></div>
      <datavis-setting-bar-size ref="pageSizeBarRef" v-model:config="pageConfig" @change="handleChangeSize"></datavis-setting-bar-size>
      <datavis-setting-bar-background v-model:config="pageConfig" @change="handleChange" @recover="handleRecover"> </datavis-setting-bar-background>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { cloneDeep } from 'lodash-es'

import { eventTypes, handleEditorConfigChange, handleEditorConfigRecover } from '../../utils'
import { backgroundFilterData, filterData } from './interface'
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()

defineOptions({ name: 'datavisSettingBar' })

defineProps({
  isModule: {
    type: Boolean
  }
})

const pageConfig = ref<any>(null) // 页面配置

// 尺寸-完成
const handleChangeSize = ({ keys, flag }: any) => {
  handleChange({ keys, flag })
  editor.zoomHandler.zoomFitView()
}

// 覆盖事件
const handleRecover = ({ keys }: any) => {
  handleEditorConfigRecover(keys, editor)
}

// 改变配置数据
const handleChange = ({ keys, flag }: any) => {
  handleEditorConfigChange(keys, editor, pageConfig.value, flag)
}

// 尺寸初始化
const pageSizeBarRef = ref()
const initPageSize = () => {
  pageSizeBarRef.value?.init()
}

const initMergeData = () => {
  if (!editor.config.backgroundFilter) {
    editor.config.backgroundFilter = cloneDeep(backgroundFilterData)
  }
  if (!editor.config.filter) {
    editor.config.filter = cloneDeep(filterData)
  }
}

const handleHistoryChanged = () => {
  const { operation } = editor.historyHandler
  if (operation && operation.type === 'config') {
    pageConfig.value = cloneDeep(editor.config)
    initPageSize()
  }
}
const initConfig = () => {
  initMergeData()
  pageConfig.value = cloneDeep(editor.config)
  setTimeout(() => {
    pageConfig.value && initPageSize()
  }, 16)
}

onMounted(() => {
  initConfig()
  editor.on(eventTypes.historyChanged, handleHistoryChanged)
})

onBeforeUnmount(() => {
  editor.off(eventTypes.historyChanged, handleHistoryChanged)
})
</script>
