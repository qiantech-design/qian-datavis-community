<template>
  <div
    class="datavis-layer-bar--node__content"
    :class="{
      'is-active': activeIdList.includes(node.id),
      expand: expandKeyList.includes(node.id)
    }"
    @contextmenu="handleContextMenu"
  >
    <div class="icon" v-if="node.type === 'group'">
      <span class="icon-expand" @dblclick.stop="" @mousedown.stop="handleExpand" :class="{ expand: expandKeyList.includes(node.id) }">
        <visui-icon :size="12" name="ele-caretRight"></visui-icon>
      </span>
      <visui-icon name="vis-wenjian"></visui-icon>
    </div>
    <div class="image" v-else>
      <template v-if="componentsImgMap[node.component.name]">
        <visui-icon
          v-if="componentsImgMap[node.component.name].startsWith('vis-')"
          :name="componentsImgMap[node.component.name]"
          :size="20"
        ></visui-icon>
        <img v-else :src="componentsImgMap[node.component.name]" alt="" />
      </template>
      <visui-icon v-else name="ele-pictureFilled"></visui-icon>
    </div>
    <div class="title">
      <div class="title_ellipsis" v-if="!node.editable">
        {{ node.name }}
      </div>
      <div @mousedown.stop v-else>
        <el-input
          class="hover-active-input"
          type="text"
          v-model="node.name"
          ref="inputRef"
          @focus="handleFocus"
          @blur.native="desConfirm"
          @keyup.enter="handleKeyupEnter"
        />
      </div>
    </div>
    <div class="action__status">
      <div class="action__status_lock" :class="{ 'is-show': node.locked }">
        <visui-icon :name="node.locked ? 'vis-suoding2' : 'vis-weisuo1'" @mousedown="toggleLock"></visui-icon>
      </div>
      <div class="action__status_hide" :class="{ 'is-show': !node.visible }">
        <visui-icon :name="node.visible ? 'vis-xianshi1' : 'vis-yincang2'" @mousedown="toggleVisible"></visui-icon>
      </div>
    </div>
    <div class="moving-line" v-if="moveTarget && moveTarget.layerId === node.id" :style="computedLineStyle"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { constructSingleObjectHistoryData, eventTypes, operationTypes } from '../../../utils/index'
import useEditor from '../../../hooks/useEditor'
const { editor } = useEditor()

defineOptions({ name: 'layer-node-content' })

const props = defineProps({
  node: {
    type: Object,
    default: () => {
      return {}
    }
  },
  activeIdList: {
    type: Array,
    default: () => {
      return []
    }
  },
  expandKeyList: {
    type: Array,
    default: () => {
      return []
    }
  },
  moveTarget: {
    type: Object as any,
    default: () => {
      return { layerId: '', isBefore: false }
    }
  },
  componentsImgMap: {
    type: Object as any,
    default: () => {
      return {}
    }
  }
})
const computedLineStyle = computed(() => {
  const isBefore = props.moveTarget?.isBefore || false
  const left = props.node.level * 16
  return {
    left: `${left}px`,
    top: `${isBefore ? 0 : 38}px`, // 留出线的高度，防止产生滚动时看不到线
    width: `calc(100% - ${left}px)`
  }
})

const handleExpand = () => {
  const { id } = props.node
  const findIndex = props.expandKeyList.findIndex((a: any) => a === id)
  if (findIndex > -1) {
    props.expandKeyList.splice(findIndex, 1)
  } else {
    props.expandKeyList.push(id)
  }
}
const toggleLock = (event: any) => {
  event.stopPropagation()
  const locked = !props.node.locked
  const { id } = props.node
  const param = constructSingleObjectHistoryData(id, { locked }, { locked: !locked })
  editor.fire(eventTypes.coreOperation, { action: operationTypes.attribute, param })
}

const toggleVisible = (event: any) => {
  event.stopPropagation()
  const visible = !props.node.visible
  const { id } = props.node
  const param = constructSingleObjectHistoryData(id, { visible }, { visible: !visible })
  editor.fire(eventTypes.coreOperation, { action: operationTypes.attribute, param })
}

const inputRef = ref<any>(null)
const handleKeyupEnter = () => {
  inputRef.value.blur()
}

const focusValue = ref<any>(null) // 输入框获取焦点时的值
const handleFocus = () => {
  focusValue.value = props.node.name
}
const desConfirm = () => {
  props.node.editable = false
  const { id, name } = props.node
  // 判断是否修改了名称
  if (name !== focusValue.value) {
    const param = constructSingleObjectHistoryData(id, { name }, { name: focusValue.value })
    editor.fire(eventTypes.coreOperation, { action: operationTypes.attribute, param })
  }
}

const handleContextMenu = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  // 组件右键
  const { id } = props.node
  if (!props.activeIdList.includes(id)) {
    // 如果当前组件没有被选中，则先选中该组件
    editor.fire(eventTypes.coreOperation, { action: operationTypes.setSelection, param: [id] })
  }
  const target = editor.getActiveObject()
  editor.fire(eventTypes.mouseContextmenu, { e, target })
}
</script>
