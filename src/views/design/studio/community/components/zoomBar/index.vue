<template>
  <div class="datavis-zoom-bar">
    <el-tooltip popper-class="datavis-editor-text-tip" effect="dark" content="缩小" placement="top">
      <visui-icon class="scale-input-icon minus" @click="handleReduce" name="ele-minus"></visui-icon>
    </el-tooltip>
    <div class="zoombar-slider">
      <el-slider tooltip-class="datavis-editor-text-tip" v-model="scaleValue" :min="20" :max="400" :step="5"
        @change="changeScale"> </el-slider>
    </div>
    <el-tooltip popper-class="datavis-editor-text-tip" effect="dark" content="放大" placement="top">
      <visui-icon class="scale-input-icon plus" @click="handleIncrease" name="ele-plus"></visui-icon>
    </el-tooltip>
    <div class="zoombar-input">
      <el-popover popper-class="datavis-editor-scale-popper" placement="top" width="80" trigger="click">
        <ul class="editor-scale-value-list">
          <li v-for="s in scaleList" :key="s.value" class="scale-value-item" @click="submitScale(s.value)">
            {{ s.label }}
          </li>
        </ul>
        <template #reference>
          <div class="scale-input">
            <div class="value">{{ scaleValue }}%</div>
            <div class="triangle"></div>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="zoombar-divider"></div>
    <div class="zoombar-shourtcut">
      <el-popover popper-class="datavis-editor-shourtcut-popper" placement="top-end" width="219" :offset="16"
        trigger="click" :visible-arrow="false" v-model="shutcutPopoverVisible">
        <div class="shourtcut-head">
          <span>快捷键列表</span>
        </div>
        <ul class="shourtcut-list">
          <li class="shourtcut-item" v-for="(item, index) in shortcutKey" :key="index">
            <div>{{ item.name }}</div>
            <div class="shourtcut-key">{{ item.value }}</div>
          </li>
        </ul>
        <template #reference>
          <div class="zoombar-keyboard" :class="{ active: shutcutPopoverVisible }">
            <el-tooltip popper-class="datavis-editor-text-tip" effect="dark" content="快捷键" placement="top">
              <visui-icon class="icon" name="vis-kuaijiejian"></visui-icon>
            </el-tooltip>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="zoombar-fullscreen">
      <el-tooltip popper-class="datavis-editor-text-tip" effect="dark" :content="isFullFlag ? '退出全屏' : '全屏'"
        placement="top">
        <visui-icon class="icon" :name="isFullFlag ? 'vis-tuichuquanping2' : 'vis-quanping1'"
          @click="toggleFull"></visui-icon>
      </el-tooltip>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { eventTypes, fullScreen, operationTypes } from '../../utils/index'
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()
defineOptions({ name: 'datavisZoomBar' })

const emit = defineEmits(['command'])

const scaleValue = ref(10)

const scaleList = [
  { label: '400%', value: 400 },
  { label: '350%', value: 350 },
  { label: '300%', value: 300 },
  { label: '250%', value: 250 },
  { label: '200%', value: 200 },
  { label: '150%', value: 150 },
  { label: '100%', value: 100 },
  { label: '50%', value: 50 },
  { label: '自适应', value: 'fitView' }
]
const shortcutKey = [
  {
    name: '移动1像素',
    value: '← ↑ → ↓'
  },
  {
    name: '移动10像素',
    value: 'Shift + ← ↑ → ↓'
  },
  {
    name: '复制',
    value: 'Ctrl+C'
  },
  {
    name: '剪切',
    value: 'Ctrl+X'
  },
  {
    name: '粘贴',
    value: 'Ctrl+V'
  },
  // {
  //   name: '编组',
  //   value: 'Ctrl+G'
  // },
  // {
  //   name: '取消编组',
  //   value: 'Ctrl+Shift+G'
  // },
  {
    name: '撤销',
    value: 'Ctrl+Z'
  },
  {
    name: '重做',
    value: 'Ctrl+Y'
  },
  {
    name: '删除',
    value: 'Delete/Backspace'
  },
  {
    name: '上移一层',
    value: 'Ctrl+Alt+↑'
  },
  {
    name: '下移一层',
    value: 'Ctrl+Alt+↓'
  },
  {
    name: '置顶',
    value: 'Ctrl+Shift+↑'
  },
  {
    name: '置底',
    value: 'Ctrl+Shift+↓'
  },
  {
    name: '适应画布',
    value: 'Ctrl+1'
  }
]

const shutcutPopoverVisible = ref(false)

const submitScale = (val: any) => {
  let [type, value] = ['', 0]
  if (val === 'fitView') {
    type = 'fitView'
  } else {
    type = 'ratio'
    value = val / 100
  }
  const params = {
    action: operationTypes.setZoom,
    param: { type, value }
  }
  editor.fire(eventTypes.coreOperation, params)
}

const handleReduce = () => {
  scaleValue.value -= 5
  changeScale()
}
const handleIncrease = () => {
  scaleValue.value += 5
  changeScale()
}
const changeScale = () => {
  const params = {
    action: operationTypes.setZoom,
    param: { type: 'ratio', value: scaleValue.value / 100 }
  }
  editor.fire(eventTypes.coreOperation, params)
}
const onEditorPanzoom = (e: any) => {
  const { a: scale } = e
  scaleValue.value = +(scale * 100).toFixed(2)
}

// 全屏切换
const isFullFlag = ref(false)
const stopF11Key = (event: any) => {
  if (event.keyCode !== 122) return
  event.preventDefault()
  event.stopPropagation()
  fullScreen.toggle()
}
const calcFull = () => {
  isFullFlag.value = fullScreen.isFullscreen
}
const toggleFull = () => {
  fullScreen.toggle()
}

onMounted(() => {
  window.addEventListener('keydown', stopF11Key)
  fullScreen.onchange(calcFull)
  editor.on(eventTypes.editorPanzoom, onEditorPanzoom)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', stopF11Key)
  window.removeEventListener('change', calcFull)
  editor.off(eventTypes.editorPanzoom, onEditorPanzoom)
})
</script>