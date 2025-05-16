<template>
  <div class="datavis-editor-header-toolbar">
    <div class="toolbar-left">
      <topAction class="back-action" @click="handleExternal(pageOperationTypes.back)">
        <visui-icon name="vis-fanhui" :size="20"></visui-icon>
      </topAction>

      <input class="hover-active-input" type="text" v-model="name" placeholder="请输入大屏/组件名称" />

      <topAction @click="showDialog(componentBarRef)" title="组件" :class="{ active: componentBarRef === temporaryRef }">
        <visui-icon name="vis-zujian1" :size="18"></visui-icon>
      </topAction>
      <topAction @click="showDialog(systemResourceDialogRef)" title="官方素材" :class="{ active: systemResourceDialogRef === temporaryRef }">
        <visui-icon name="vis-yonghuziyuan" :size="18"></visui-icon>
      </topAction>
    </div>
    <div class="toolbar-center">
      <topAction @click="handleEditorCoreAction(operationTypes.undo)" title="后退" :class="{ disabled: !editorState.canUndo }">
        <visui-icon name="vis-houtui" :size="18"></visui-icon>
      </topAction>

      <topAction @click="handleEditorCoreAction(operationTypes.redo)" title="前进" :class="{ disabled: !editorState.canRedo }">
        <visui-icon name="vis-qianjin" :size="18"></visui-icon>
      </topAction>

      <topAction @click="handleExternal(pageOperationTypes.search)" title="搜索">
        <visui-icon name="vis-sousuo1" :size="18"></visui-icon>
      </topAction>

      <topAction title="控制面板" class="panel-wrap" overClass="vis-icon-wrap no-hover">
        <visui-icon class="icon" :class="{ active: panelVisible.left }" name="vis-kongzhizuo" @click="togglePanelVisible('left')"></visui-icon>
        <visui-icon class="icon" :class="{ active: panelVisible.right }" name="vis-kongzhiyouce" @click="togglePanelVisible('right')"></visui-icon>
      </topAction>
    </div>

    <div class="toolbar-right">
      <div class="save-time-box"></div>

      <visui-tooltip
        placement="bottom-start"
        popper-class="datavis-editor-toolbar-popover-contentmenu"
        :show-arrow="false"
        :offset="0"
        trigger="hover"
      >
        <template #content>
          <ul class="popover-contentmenu-list">
            <li class="popover-contentmenu-item" @click="handleExternal(pageOperationTypes.importJSON)">
              <span>导入图纸</span>
            </li>
            <li class="popover-contentmenu-item" @click="handleExternal(pageOperationTypes.importDraft)">
              <span>导入本地草稿</span>
            </li>
            <li class="popover-contentmenu-item-divider"></li>
            <li class="popover-contentmenu-item" @click="handleExternal(pageOperationTypes.saveDraft)">
              <span>保存为草稿</span>
            </li>
            <li class="popover-contentmenu-item-divider"></li>
            <li class="popover-contentmenu-item" @click="handleExternal(pageOperationTypes.downloadJSON)">
              <span>导出图纸</span>
            </li>
          </ul>
        </template>
        <topAction title="文件" overClass="vis-icon-wrap">
          <visui-icon name="vis-wenjian" :size="18"></visui-icon>
          <div class="triangle"></div>
        </topAction>
      </visui-tooltip>

      <topAction @click="handleExternal(pageOperationTypes.preview)" title="预览">
        <visui-icon name="vis-yulan" :size="18"></visui-icon>
      </topAction>

      <topAction @click="handleExternal(pageOperationTypes.save)" title="保存">
        <visui-icon name="vis-baocun" :size="18"></visui-icon>
      </topAction>
    </div>

    <!-- 组件 -->
    <component-bar ref="componentBarRef" @finish="handleFinishDialog(componentBarRef)"></component-bar>
    <!-- 系统素材 -->
    <system-resource-dialog ref="systemResourceDialogRef" @finish="handleFinishDialog(systemResourceDialogRef)"></system-resource-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { operationTypes, pageOperationTypes, eventTypes } from '../../utils/index'
import type { EditorState } from '../../types/index'

import topAction from './component/action.vue'

const componentName = 'headerToolbar'
defineOptions({ name: componentName })
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()

const name = defineModel<string>('name')
defineProps({
  customThemeList: {
    type: Array,
    default: () => []
  }
})
const editorState = ref<EditorState>({
  canRedo: false,
  canUndo: false,
  selectedCount: 0,
  isGroup: false,
  isActiveSelection: false,
  activeObject: null
})
const emit = defineEmits(['command'])

const componentBarRef = ref() // 组件弹窗
const systemResourceDialogRef = ref() // 系统资源弹窗
const temporaryRef = ref() // 中间变量

// 打开某个弹窗，并关闭其余的弹窗
const showDialog = (valRef: any) => {
  const arr = [componentBarRef.value, systemResourceDialogRef.value]
  arr.forEach((item: any) => {
    if (valRef === item) {
      if (temporaryRef.value === valRef) {
        item.handleCloseDialog()
        temporaryRef.value = null
      } else {
        item.handleOpenDialog()
        temporaryRef.value = valRef
      }
    } else {
      item.handleCloseDialog()
    }
  })
}

const handleFinishDialog = (valRef: any) => {
  valRef.handleCloseDialog()
  temporaryRef.value = null
}

// 向编辑器核心请求执行
const handleEditorCoreAction = (action: operationTypes) => {
  editor.fire(eventTypes.coreOperation, { action })
}

// 左右面板显示控制
const panelVisible = ref({
  left: true,
  right: true
})

const togglePanelVisible = (type: 'left' | 'right') => {
  if (type === 'left') {
    panelVisible.value.left = !panelVisible.value.left
  } else {
    panelVisible.value.right = !panelVisible.value.right
  }
  const { left, right } = panelVisible.value
  editor.fire(eventTypes.pageOperation, { type: pageOperationTypes.layoutChange, data: { left, right }, source: componentName })
}

/**
 * 向外抛出事件
 */
const handleExternal = (event: string) => {
  editor.fire(eventTypes.pageOperation, { type: event, source: componentName })
}
const handleEditorStateUpdate = (state: EditorState) => {
  Object.assign(editorState.value, state)
}

const handleEvents = ({ isDispose = false }) => {
  const key = isDispose ? 'off' : 'on'
  editor[key](eventTypes.editorStateUpdated, handleEditorStateUpdate)
}

onMounted(() => {
  handleEvents({ isDispose: false })
})
onBeforeUnmount(() => {
  handleEvents({ isDispose: false })
})
</script>
