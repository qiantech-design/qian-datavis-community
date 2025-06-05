<template>
  <div class="datavis-layer-bar--wrap">
    <div class="datavis-layer-bar--header">
      <div class="title">图层</div>
      <div class="action">
        <visui-icon class="search-icon" name="ele-search" @click="handleOpen"></visui-icon>
        <div class="search-input" :class="{ 'is-active': state.visible }">
          <el-input placeholder="请输入关键词" v-model="keyWord" clearable @input="handleSearch" @blur="">
            <template #prefix>
              <visui-icon name="ele-search" :size="18"></visui-icon>
            </template>
          </el-input>
          <visui-icon class="close-icon" name="ele-close" :size="24" @click="handleClose"></visui-icon>
        </div>
      </div>
    </div>
    <div class="datavis-layer-bar--buttons">
      <visui-tooltip :enterable="false" content="置顶" placement="top">
        <layer-action icon="vis-zhiding" :class="{ 'is-active': canMoveUp }" @click="handleCommand(canMoveUp, 'bringToFront')"></layer-action>
      </visui-tooltip>
      <visui-tooltip :enterable="false" content="置底" placement="top">
        <layer-action icon="vis-zhidi" :class="{ 'is-active': canMoveDown }" @click="handleCommand(canMoveDown, 'sendToBack')"></layer-action>
      </visui-tooltip>
      <visui-tooltip :enterable="false" content="上移" placement="top">
        <layer-action icon="vis-shangyi" :class="{ 'is-active': canMoveUp }" @click="handleCommand(canMoveUp, 'bringForward')"></layer-action>
      </visui-tooltip>
      <visui-tooltip :enterable="false" content="下移" placement="top">
        <layer-action icon="vis-xiayi" :class="{ 'is-active': canMoveDown }" @click="handleCommand(canMoveDown, 'sendBackwards')"></layer-action>
      </visui-tooltip>
      <layer-divider></layer-divider>
      <visui-tooltip :enterable="false" content="组合" placement="top">
        <layer-action
          icon="vis-bianzu"
          :class="{ 'is-active': editorState.isActiveSelection }"
          @click="handleCommand(editorState.isActiveSelection, 'group')"
        ></layer-action>
      </visui-tooltip>
      <visui-tooltip :enterable="false" content="解组" placement="top">
        <layer-action
          icon="vis-quxiaobianzu"
          :class="{ 'is-active': editorState.isGroup }"
          @click="handleCommand(editorState.isGroup, 'ungroup')"
        ></layer-action>
      </visui-tooltip>
    </div>
    <div class="datavis-layer-bar--content">
      <layer-tree
        ref="layerTreeRef"
        :data="state.layerList"
        :componentsImgMap="state.componentsImgMap"
        :activeIdList="activeIdList"
        :expandKeyList="expandKeyList"
      ></layer-tree>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import layerTree from './component/tree.vue'
import layerAction from './component/action.vue'
import layerDivider from './component/divider.vue'
import { eventTypes } from '../../utils/index'
import { EditorState } from '../../types'
import { debounce, cloneDeep } from 'lodash-es'

import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()
defineOptions({ name: 'datavisLayerBar' })

// 数据转换
const stringifyArray = (arr: any) => {
  arr = arr || []
  const newArr: any = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const { id, name, type, visible, locked, component } = item
    const obj = {
      id,
      name,
      type,
      visible,
      locked,
      component: cloneDeep(component)
    }
    if (item.objects) {
      Reflect.set(obj, 'objects', stringifyArray(item.objects))
    }
    newArr.push(obj)
  }
  return newArr
}

const state = reactive({
  originList: [],
  layerList: [],
  rightMenuShow: true,
  isWorkspace: false,
  selectFlag: true,
  multipleFlag: false,
  groupFlag: false,
  lockFlag: true,
  visible: false,
  componentsImgMap: {} as any
})

const editorState = ref<EditorState>({
  canRedo: false,
  canUndo: false,
  selectedCount: 0,
  isGroup: false,
  isActiveSelection: false,
  activeObject: null
})
const expandKeyList: any = ref([])
const canMoveUp = computed(() => {
  const { selectedCount, index = 0, sameLevelCount = 0 } = editorState.value
  return selectedCount === 1 && index < sameLevelCount - 1
})

const canMoveDown = computed(() => {
  const { selectedCount, index = 0, sameLevelCount = 0 } = editorState.value
  return selectedCount === 1 && index < sameLevelCount && index > 0
})

// 获取对象的所有父级id列表
const getParentIdList = (arr: any) => {
  const parentIdObj: any = {}
  const recursion = (item: any) => {
    if (item && item.group) {
      parentIdObj[item.group.id] = 1
      recursion(item.group)
    }
  }
  arr = arr || []
  arr.forEach((item: any) => {
    recursion(item)
  })
  return Object.keys(parentIdObj)
}

const activeIdList = computed(() => {
  const { activeObject } = editorState.value
  let idList: any = []
  let parentIdList: any = []
  // 在计算属性中混入节点展开的逻辑，确保节点始终可见，而不是收起
  if (activeObject) {
    if (activeObject.type === 'activeSelection') {
      idList = activeObject.objects.map((a: any) => a.id)
      parentIdList = getParentIdList(activeObject.objects)
    } else {
      idList = [activeObject.id]
      parentIdList = getParentIdList([activeObject])
    }
  }
  const toAppendIdList = parentIdList.filter((a: any) => !expandKeyList.value.includes(a))
  if (toAppendIdList.length) {
    expandKeyList.value.push(...toAppendIdList)
  }
  return idList
})

// 关键词
const keyWord = ref('')
watch(
  () => keyWord,
  () => {
    handleSearch(keyWord.value)
  },
  { deep: true }
)
// 搜索
const handleSearch = debounce(val => {
  if (val) {
    function filterData(data: any, keyword: any) {
      function recursiveFilter(nodes: any) {
        return nodes.reduce((acc: any, node: any) => {
          const matches = node.name.includes(keyword) || node.id.includes(keyword)
          const filteredChildren = recursiveFilter(node.objects || [])
          if (matches || filteredChildren.length > 0) {
            acc.push({
              ...node,
              objects: filteredChildren
            })
          }
          return acc
        }, [])
      }
      return recursiveFilter(data)
    }
    // 使用示例
    const result = filterData(state.originList, keyWord.value)
    state.layerList = result
  } else {
    state.layerList = state.originList
  }
})

// 展示搜索弹窗
const handleOpen = () => {
  state.visible = true
}
const handleClose = () => {
  state.visible = false
}

const handleCommand = (flag: boolean, action: any, param = '') => {
  if (!flag) {
    return
  }
  const params = {
    action,
    param
  }
  editor.fire(eventTypes.coreOperation, params)
}
const recursionHanldeData = (arr: any = [], level = 1, parentId = '') => {
  arr = arr || []
  arr.reverse() // 反转一下数组
  arr.forEach((item: any) => {
    item.level = level
    item.parentId = parentId
    recursionHanldeData(item.objects, level + 1, item.id)
  })
  return arr
}
const handleLayerChanged = (data: any) => {
  const list = stringifyArray(data)
  state.originList = recursionHanldeData(list)
  handleSearch(keyWord.value)
}
const handleEditorStateUpdated = (e: any) => {
  editorState.value = e
}

const layerTreeRef = ref()

const handleComponentsImgFetched = (e: any) => {
  state.componentsImgMap = e
}

const handleEvents = ({ isDispose = false }) => {
  const key = isDispose ? 'off' : 'on'
  editor[key](eventTypes.layerChange, handleLayerChanged)
  editor[key](eventTypes.editorStateUpdated, handleEditorStateUpdated)
  editor[key](eventTypes.componentsImgFetched, handleComponentsImgFetched)
}

onMounted(() => {
  handleEvents({ isDispose: false })
})
onBeforeUnmount(() => {
  handleEvents({ isDispose: true })
})
</script>
