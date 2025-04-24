<template>
  <div class="datavis-align-bar">
    <template v-for="item in state.alignList" :key="item.action">
      <div class="align-item" :class="{ disabled: item.disabled }" @click="handleClick(item)">
        <visui-icon :name="item.icon"></visui-icon>
      </div>
      <svg width="1" height="16" v-if="item.action === 'bottom'" class="svg-split-line">
        <line x1="0" y1="0" x2="0" y2="16" stroke-width="1"></line>
      </svg>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { eventTypes, operationTypes } from '../../utils'
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()

defineOptions({
  name: 'datavisAlignBar'
})
const props = defineProps({
  selectedCount: {
    type: Number,
    default: 0
  },
})
const state = reactive({
  alignList: [
    { disabled: false, action: 'left', icon: 'vis-shuipingzuoduiqi', text: '左对齐' },
    { disabled: false, action: 'centerX', icon: 'vis-zuoyoujuzhongduiqi', text: '水平居中对齐' },
    { disabled: false, action: 'right', icon: 'vis-shuipingyouduiqi', text: '右对齐' },
    { disabled: false, action: 'top', icon: 'vis-dingbuduiqi', text: '上对齐' },
    { disabled: false, action: 'centerY', icon: 'vis-shangxiajuzhongduiqi', text: '垂直居中对齐' },
    { disabled: false, action: 'bottom', icon: 'vis-dibuduiqi', text: '下对齐' },
    { disabled: false, action: 'horizontalUniform', icon: 'vis-shuipingfenbu', text: '水平等距' },
    { disabled: false, action: 'verticalUniform', icon: 'vis-chuizhifenbu', text: '垂直等距' }
  ]
})
const handleClick = (item: any) => {
  if (!item.disabled) {
    const params = {
      action: operationTypes.align,
      param: item.action
    }
    editor.fire(eventTypes.coreOperation, params)
  }
}

watch(
  () => props.selectedCount,
  newValue => {
    state.alignList.forEach(item => {
      if (['left', 'centerX', 'right', 'top', 'centerY', 'bottom'].includes(item.action)) {
        item.disabled = newValue < 1
      } else {
        item.disabled = newValue < 3
      }
    })
  },
  {
    immediate: true
  }
)
</script>