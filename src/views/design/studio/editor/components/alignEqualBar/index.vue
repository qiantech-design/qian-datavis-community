<template>
  <div class="datavis-align-bar">
    <template v-for="item in state.alignList" :key="item.action">
      <div class="align-item-input" v-if="['horizontalDistance', 'verticalDistance'].includes(item.action)">
        <visui-input v-model="item.value"></visui-input>
      </div>
      <el-tooltip popper-class="datavis-editor-text-tip" effect="dark" :content="item.text" placement="top">
        <div class="align-item" :class="{ disabled: item.disabled }" @click="handleClick(item)">
          <visui-icon :name="item.icon"></visui-icon>
        </div>
      </el-tooltip>
      <svg width="1" height="16" v-if="item.action === 'widthAndHeight'" class="svg-split-line">
        <line x1="0" y1="0" x2="0" y2="16" stroke-width="1"></line>
      </svg>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { eventTypes, operationTypes } from '../../utils'
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()

defineOptions({
  name: 'datavisAlignEqualBar'
})

const state = reactive({
  alignList: [
    { disabled: false, action: 'horizontalDistance', value: 10, icon: 'vis-shuipingjianju', text: '水平间距' },
    { disabled: false, action: 'verticalDistance', value: 10, icon: 'vis-chuizhijianju', text: '垂直间距' },
  ]
})
const handleClick = (item: any) => {
  if (!item.disabled) {
    const params = {
      action: operationTypes.alignEqual,
      param: item.action,
      value: item.value
    }
    editor.fire(eventTypes.coreOperation, params)
  }
}

const selectedCount = ref(0)
const hanleChanType = (newValue: number) => {
  state.alignList.forEach(item => {
    if (['horizontalDistance', 'verticalDistance'].includes(item.action)) {
      item.disabled = newValue < 2
    }
  })
}

const handleSelectionUpdated = () => {
  const activeObj = editor.getActiveObject()
  if (activeObj) {
    selectedCount.value = activeObj.type === 'activeSelection' ? activeObj.objects.length : 1
  } else {
    selectedCount.value = 0
  }
  hanleChanType(selectedCount.value)
}
onMounted(() => {
  editor.on(eventTypes.selectionUpdated, handleSelectionUpdated)
})
onBeforeUnmount(() => {
  editor.off(eventTypes.selectionUpdated, handleSelectionUpdated)
})

</script>