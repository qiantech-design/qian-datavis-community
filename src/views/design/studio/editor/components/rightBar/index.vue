<template>
  <div class="datavis-right-bar">
    <visui-tabs v-model="activeTab" :list="tabsItem"></visui-tabs>
    <div class="datavis-right-bar-content">
      <el-scrollbar>
        <slot name="setting" v-if="activeTab === 'page'"></slot>
        <template v-if="node">
          <datavis-align-bar :selectedCount="selectedCount"></datavis-align-bar>
          <datavis-property-bar v-if="activeTab === 'property'" :node="realNode" :customThemeList="customThemeList"></datavis-property-bar>
          <datavis-data-bar v-else-if="activeTab === 'data'" :originNode="node" :realNode="realNode"></datavis-data-bar>
          <datavis-event-bar v-else-if="activeTab === 'event'" :originNode="node" :realNode="realNode"></datavis-event-bar>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { eventTypes } from '../../utils/index'
// @ts-ignore
import { get, set } from 'lodash-es'
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()

defineOptions({ name: 'datavisRightBar' })
type Prop = {
  isModule: boolean
  customThemeList: any[]
}

defineProps<Prop>()

const tabConfig: any[][] = [
  [
    { value: 'property', label: '属性' },
    { value: 'data', label: '数据' },
    { value: 'event', label: '事件' }
  ],
  [{ value: 'page', label: '页面设置' }]
]
const activeTab = ref('property')
const tabsItem = ref<any[]>([])
const node = ref()

const realNode = ref() // 实际的节点（经过序列化，用于撤销重做）

const selectedCount = ref(0)
const handleSelectionUpdated = () => {
  const activeObj = editor.getActiveObject()
  node.value = activeObj
  if (activeObj) {
    tabsItem.value = tabConfig[0]
    if (!tabsItem.value.find(v => v.value === activeTab.value)) {
      activeTab.value = 'property'
    }
    selectedCount.value = activeObj.type === 'activeSelection' ? activeObj.objects.length : 1
    handleRealNode()
  } else {
    tabsItem.value = tabConfig[1]
    activeTab.value = 'page'
    selectedCount.value = 0
  }
}

// 获取对象的全部路径集合
const getAllPaths = (obj: any, prefix = '', paths: any[] = []) => {
  if (typeof obj !== 'object' || obj === null) {
    if (prefix) paths.push(prefix)
    return paths
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const newPrefix = prefix ? `${prefix}.${index}` : `${index}`
      getAllPaths(item, newPrefix, paths)
    })
  } else {
    for (const key in obj) {
      const newPrefix = prefix ? `${prefix}.${key}` : key
      getAllPaths(obj[key], newPrefix, paths)
    }
  }
  return paths
}

// 处理数组对象列表，比较路径对应的值，不一致时设为null
// 要保证每个对象的数据结构一致，否则可能会出现意想不到的错误
function unifyValues(objects: any[]) {
  if (objects.length === 0) return
  const paths = getAllPaths(objects[0])
  paths.forEach(path => {
    const values = objects.map(obj => get(obj, path, null))
    const firstValue = values[0]
    const allSame = values.every(v => JSON.stringify(v) === JSON.stringify(firstValue))
    if (!allSame) {
      objects.forEach(obj => {
        set(obj, path, null)
      })
    }
  })
}

const handleObjectSetData = () => {
  handleRealNode()
}

const handleRealNode = () => {
  if (node.value && Object.keys(node.value).length > 0) {
    if (node.value.type === 'activeSelection') {
      const jsonData = node.value.toJSON()
      const objects = jsonData.objects || []
      const firstObject = objects[0] || {}
      const isSameComponent = objects.every((item: any) => {
        // 组件是否一致
        const componentFlag = get(item, 'component.name') === get(firstObject, 'component.name')
        // 状态是否一致
        const statesFlag = item.stateIndex === firstObject.stateIndex && (item.states || []).length === (firstObject.states || []).length
        return componentFlag && statesFlag
      })
      if (isSameComponent) {
        unifyValues(objects)
        const firstObj = objects[0]
        firstObj.editor = node.value.editor

        realNode.value = firstObj
      } else {
        realNode.value = null
      }
    } else {
      const data = node.value.toJSON()
      data.editor = node.value.editor
      realNode.value = data
    }
  } else {
    realNode.value = null
  }
}

const handleEvents = ({ isDispose = false }) => {
  const key = isDispose ? 'off' : 'on'
  editor[key](eventTypes.selectionUpdated, handleSelectionUpdated)
  editor[key](eventTypes.objectMoving, handleSelectionUpdated)
  editor[key](eventTypes.objectRotating, handleSelectionUpdated)
  editor[key](eventTypes.objectResizing, handleSelectionUpdated)
  editor[key](eventTypes.objectModified, handleSelectionUpdated)
  editor[key](eventTypes.setData, handleObjectSetData)
}

onMounted(() => {
  tabsItem.value = tabConfig[0]
  handleEvents({ isDispose: false })
})
onBeforeUnmount(() => {
  handleEvents({ isDispose: true })
})
</script>

<style lang="scss"></style>
