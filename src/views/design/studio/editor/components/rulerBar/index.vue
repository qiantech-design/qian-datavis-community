<template>
  <div class="datavis-ruler-bar">
    <editorSketchRuler
      lang="zh-CN"
      :thick="ruleData.thick"
      :scale="ruleData.scale"
      :width="ruleData.width"
      :height="ruleData.height"
      :startX="ruleData.startX"
      :startY="ruleData.startY"
      :horLineArr="ruleData.lines.h"
      :verLineArr="ruleData.lines.v"
      :shadow="ruleData.shadow"
      :cornerActive="false"
      :isShowReferLine="ruleData.showReferLine"
      :palette="ruleData.palette"
      @handleLine="handleLine"
    >
    </editorSketchRuler>
    <!-- <div class="ruler-corner">
      <econ-icon icon="icon-shezhi"></econ-icon>
      <ul class="ruler-action-dropdown">
        <li class="ruler-action-dropdown-item" @click="handleEditorOrigin">
          <econ-icon size="large" icon="icon-huidaoyuandian"></econ-icon>
          <span class="text">回到原点</span>
        </li>
        <li class="ruler-action-dropdown-item" @click="handleLineShowOrHide">
          <econ-icon size="large" :icon="ruleData.showReferLine ? 'icon-yincang2' : 'icon-xianshi1'"></econ-icon>
          <span class="text">{{ ruleData.showReferLine ? '隐藏' : '显示' }}辅助线</span>
        </li>
        <li class="ruler-action-dropdown-item" @click="handleLineClear">
          <econ-icon icon="icon-shanchu1" size="large"></econ-icon>
          <span class="text">清空辅助线</span>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import editorSketchRuler from './sketchRuler/index.vue'
import './sketchRuler/style.css'
import { RulerConfig } from '../../types'

defineOptions({ name: 'datavisRulerBar' })

//标尺
const ruleData = ref<RulerConfig>({
  scale: 1,
  startX: 0,
  startY: 0,
  lines: {
    h: [],
    v: []
  },
  shadow: {},
  width: 0,
  height: 0,
  thick: 17,
  ratio: 1,
  isShowRuler: true, // 显示标尺
  isShowReferLine: true, // 显示参考线
  eyeIcon: '', // 睁眼图标
  closeEyeIcon: '', // 闭眼图标
  palette: {
    bgColor: '#0E0E0E', // ruler bg color
    longfgColor: '#3D3D3E', // ruler longer mark color
    shortfgColor: '#3D3D3E', // ruler shorter mark color
    fontColor: '#999999', // ruler font color
    shadowColor: 'orange', // ruler shadow color
    lineColor: 'orange',
    borderColor: 'transparent',
    cornerActiveColor: '#B2C7DB'
  }
})

const emit = defineEmits(['lineChange'])

const handleLine = () => {
  emit('lineChange', ruleData.value.lines)
}
// 初始化标尺
const exposeRulerSize = (data: { width: number; height: number }) => {
  ruleData.value.width = data.width + ruleData.value.thick
  ruleData.value.height = data.height + ruleData.value.thick
}

// 处理导入图纸后的标尺偏移
const exposeSetRuler = (data: { scale: number; translateX: number; translateY: number }) => {
  const { scale, translateX, translateY } = data
  ruleData.value.scale = scale
  ruleData.value.startX = -((translateX - 1) / scale)
  ruleData.value.startY = -((translateY - 1) / scale)
}

defineExpose({
  exposeRulerSize,
  exposeSetRuler
})
</script>

<style lang="scss">
// 修改标线数值颜色
.mb-ruler .line .action {
  color: #ffffff;
}

.indicator .value {
  background: transparent;
}
</style>
