<template>
  <el-scrollbar ref="scrollbarRef">
    <div class="datavis-layer-bar--tree" @mousedown="handleMouseDown" @dblclick="handleDblclick">
      <layer-node
        v-for="(node, index) in data"
        :key="index"
        :index="index"
        :node="node"
        :level="0"
        :componentsImgMap="componentsImgMap"
        :activeIdList="activeIdList"
        :expandKeyList="expandKeyList"
        :moveTarget="moveTarget"
      ></layer-node>
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import layerNode from './node.vue'
import { eventTypes, operationTypes } from '../../../utils/index'
import { cloneDeep } from 'lodash-es'
import useEditor from '../../../hooks/useEditor'
const { editor } = useEditor()

defineOptions({ name: 'layerTree' })
type Props = {
  data: any[]
  activeIdList: any[]
  expandKeyList: any[]
  componentsImgMap: any
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  activeIdList: () => [],
  expandKeyList: () => [],
  componentsImgMap: () => {
    return {}
  }
})

const scrollbarRef = ref()

watch(
  () => props.activeIdList,
  () => {
    nextTick(() => {
      handleActiveIdListChange()
    })
  }
)

const handleActiveIdListChange = () => {
  const objs = editor.getActiveObjects()
  const elementList = judgeElementsVisible(objs.map((a: any) => a.id))
  if (elementList.length && elementList.every(a => !a.visible)) {
    scrollbarRef.value.setScrollTop(elementList[0].offsetTop)
  }
}

// 判断元素可见性
const judgeElementsVisible = (idList: string[]) => {
  const list = idList.map(a => {
    return { id: a, visible: false, offsetTop: 0 }
  })
  // 滚动容器
  const scrollWarp = scrollbarRef.value.wrapRef
  if (scrollWarp) {
    const { scrollTop } = scrollWarp
    const scrollbarHeight = scrollWarp.offsetHeight
    list.forEach(item => {
      const element = scrollWarp.querySelector(`[layer-id="${item.id}"]`)
      if (element) {
        const { top: offsetTop } = getScrollPosition(element)
        item.offsetTop = offsetTop
        const minFlag = offsetTop - element.offsetHeight < scrollTop // 是否超出滚动范围的最小值
        const maxFlag = offsetTop + element.offsetHeight > scrollTop + scrollbarHeight // 是否超出滚动范围的最大值
        const isHidden = minFlag || maxFlag
        item.visible = !isHidden
      } else {
        item.offsetTop = 0
        item.visible = true
      }
    })
  }
  return list
}

const getObjectDetail = (id: string) => {
  let result: any = null
  const recurssion = (arr: any) => {
    arr = arr || []
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (item.id === id) {
        result = item
        break
      } else {
        const subs = item.objects || []
        subs.length && recurssion(subs)
      }
    }
  }
  recurssion(props.data)
  return result
}

const exposeScrollUpdate = () => {
  scrollbarRef.value && scrollbarRef.value.update()
}

// 获取鼠标事件的目标元素信息，节点信息
const getEventTarget = (event: any) => {
  let layerId = ''
  let layerElement: any = null
  let isBefore = false // 是否在元素的前半部分

  const recursion = (e: any) => {
    if (e) {
      layerId = e.getAttribute('layer-id')
      if (layerId) {
        layerElement = e
      } else if (e.parentElement && !e.parentElement.classList.contains('datavis-layer-bar--tree')) {
        recursion(e.parentElement)
      }
    }
  }
  recursion(event.target)
  if (layerElement) {
    const { top, height } = layerElement.getBoundingClientRect()
    const centerY = top + height / 2
    isBefore = event.clientY < centerY
  }
  return { layerId, layerElement, isBefore }
}

// 获取元素相对于滚动容器的位置
const getScrollPosition = (element: HTMLElement) => {
  const container = scrollbarRef.value.wrapRef as HTMLElement
  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  // 获取容器的边框和内边距
  const containerStyle = getComputedStyle(container)
  const borderTop = parseFloat(containerStyle.borderTopWidth) || 0
  const borderLeft = parseFloat(containerStyle.borderLeftWidth) || 0
  const paddingTop = parseFloat(containerStyle.paddingTop) || 0
  const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0

  // 容器内容区域的起始位置（视口坐标）
  const containerContentTop = containerRect.top + borderTop + paddingTop
  const containerContentLeft = containerRect.left + borderLeft + paddingLeft

  // 元素相对于容器内容区域的视口位置
  const relativeTop = elementRect.top - containerContentTop
  const relativeLeft = elementRect.left - containerContentLeft

  // 加上滚动偏移得到元素在容器内容中的位置
  return {
    top: relativeTop + container.scrollTop,
    left: relativeLeft + container.scrollLeft,
    height: element.offsetHeight,
    width: element.offsetWidth
  }
}

/**
 * 克隆元素并复制所有计算后的样式为内联样式
 * @param {HTMLElement} element - 需要克隆的元素
 * @returns {HTMLElement} 带内联样式的克隆元素
 */
function cloneWithInlineStyles(element: any) {
  // 1. 深度克隆元素（包括子元素）
  const clone = element.cloneNode(true)
  // 2. 获取原元素所有计算后的样式
  const computedStyles = window.getComputedStyle(element)
  // 3. 将需要样式属性并设置为内联样式
  const keys = ['display', 'align-items', 'width', 'height', 'color', 'background-color']
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i]
    const value = computedStyles.getPropertyValue(prop)
    clone.style.setProperty(prop, value)
  }
  return clone
}

const moveTimer = ref() // 移动定时器，如果鼠标停留在组合上超过一定时间则自定展开组合
const moveTarget = ref<any>(null) // 移动到的目标元素
const mousedownLayerId = ref<string>('') // 鼠标按下时的元素id，用于shift区间选判断，没有其他用处

// 处理shift区间选
const handleShiftChoose = (layerId: string) => {
  let idList = cloneDeep(props.activeIdList)
  // 获取已选中对象的父级id以及在父级的索引，用于进行区间选判断
  const objs = editor
    .getObjectsByCondition((item: any) => idList.includes(item.id))
    .map((item: any) => {
      const parent = item.group || editor
      return {
        target: item,
        parentId: item.group ? item.group.id : null,
        index: parent.objects.findIndex((obj: any) => obj.id === item.id)
      }
    })

  const layerObj = editor.getObjectById(layerId)
  const layerParent = layerObj.group || editor
  const layerObjParentId = layerObj.group ? layerObj.group.id : null

  // 判断是否在同一父级下，如果是则进行区间选操作，否则仅选中触发元素的对象
  if (objs.every((item: any) => item.parentId === layerObjParentId)) {
    const mousedownObj = editor.getObjectById(mousedownLayerId.value)
    const mousedownObjParent = mousedownObj.group || editor
    const mousedownObjIndex = mousedownObjParent.objects.findIndex((obj: any) => obj.id === mousedownObj.id)
    const layerObjIndex = layerParent.objects.findIndex((obj: any) => obj.id === layerObj.id)
    const minIndex = Math.min(mousedownObjIndex, layerObjIndex)
    const maxIndex = Math.max(mousedownObjIndex, layerObjIndex)
    const list = mousedownObjParent.objects.slice(minIndex, maxIndex + 1)
    idList = list.map((item: any) => item.id)
  } else {
    mousedownLayerId.value = layerId
    idList = [layerId]
  }
  editor.fire(eventTypes.coreOperation, { action: operationTypes.setSelection, param: idList })
}

// 处理ctrl多选
const handleCtrlChoose = (layerId: string) => {
  const idList = cloneDeep(props.activeIdList)
  const findIndex = idList.findIndex((id: string) => id === layerId)
  if (findIndex > -1) {
    idList.splice(findIndex, 1)
  } else {
    idList.push(layerId)
  }
  editor.fire(eventTypes.coreOperation, { action: operationTypes.setSelection, param: idList })
}

// 为了方便拖动元素的统一管理，在外部监听相关事件，在外部统一处理
const handleMouseDown = (e: MouseEvent) => {
  // 右键不要触发拖拽事件，右键已经在节点内部触发
  if (e.button == 2) {
    return
  }
  const { layerId, layerElement } = getEventTarget(e)

  if (e.shiftKey && !mousedownLayerId.value) {
    mousedownLayerId.value = layerId
  } else if (!e.shiftKey) {
    mousedownLayerId.value = layerId
  }

  if (layerId) {
    // shift是区间选、ctrl是多选，不应该触发拖拽，直接return
    if (e.shiftKey) {
      return handleShiftChoose(layerId)
    } else if (e.ctrlKey) {
      return handleCtrlChoose(layerId)
    }

    let isDraging = false // 标记是否正在拖拽
    let [mousedownX, mousedownY] = [e.clientX, e.clientY] // 记录鼠标按下时的位置
    // 记录鼠标相对于元素左上角的初始偏移
    const rect = layerElement.getBoundingClientRect()
    const initialX = e.clientX - rect.left
    const initialY = e.clientY - rect.top
    let ghostElement: any = null // 拖拽时的拖影元素，用于模拟drag api的拖影效果

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const [clientX, clientY] = [moveEvent.clientX, moveEvent.clientY]
      // 如果鼠标位置没有变化，则不触发拖拽事件。因为mousemove事件会一直触发，需要判断鼠标位置
      if (mousedownX === clientX && mousedownY === clientY) return

      const { wrapRef } = scrollbarRef.value
      const wrapBounding = wrapRef.getBoundingClientRect()
      if (moveEvent.clientY < wrapBounding.top) {
        if (wrapRef.scrollTop > 0) {
          scrollbarRef.value.setScrollTop(wrapRef.scrollTop - 10)
        }
      } else if (moveEvent.clientY > wrapBounding.bottom) {
        if (wrapRef.scrollTop < wrapRef.scrollHeight - wrapRef.clientHeight) {
          scrollbarRef.value.setScrollTop(wrapRef.scrollTop + 10)
        }
      }
      clearTimeout(moveTimer.value)
      moveTarget.value = getEventTarget(moveEvent)
      const moveToId = moveTarget.value.layerId || ''

      if (!isDraging) {
        isDraging = true
        ghostElement = cloneWithInlineStyles(layerElement)
        ghostElement.classList.add('drag-ghost')
        // 设置初始位置
        ghostElement.style.left = `${rect.left}px`
        ghostElement.style.top = `${rect.top}px`

        document.body.appendChild(ghostElement)
      }
      // 计算拖影位置（跟随鼠标，并补偿初始偏移）
      ghostElement.style.left = `${moveEvent.clientX - initialX}px`
      ghostElement.style.top = `${moveEvent.clientY - initialY}px`
      if (moveToId) {
        const moveObj = getObjectDetail(moveToId)

        // 拖拽的时候如果画布元素不包含当前拖拽的元素，则将当前拖拽元素设为选中
        if (!props.activeIdList.includes(layerId)) {
          editor.fire(eventTypes.coreOperation, { action: operationTypes.setSelection, param: [layerId] })
        }

        // 如果停留超过0.3秒，则展开节点，方便元素可以拖拽进组合中
        moveTimer.value = setTimeout(() => {
          if (moveToId && !props.expandKeyList.includes(moveToId)) {
            if (moveObj.objects && moveObj.objects.length) {
              props.expandKeyList.push(moveToId)
            }
          }
        }, 300)
      } else {
        moveTarget.value = null
      }
    }

    const handleMouseUp = () => {
      const moveToId = moveTarget.value?.layerId || ''
      const isBefore = moveTarget.value?.isBefore || false

      moveTarget.value = null
      if (isDraging) {
        document.body.removeChild(ghostElement)
        if (moveToId) {
          const moveToObj = editor.getObjectById(moveToId) // 移动到的对象
          const moveToObjParent = moveToObj.group || editor
          const index = moveToObjParent.objects.findIndex((item: any) => item.id === moveToId)
          let realIndex = isBefore ? index + 1 : index
          const parentId = moveToObj.group ? moveToObj.group.id : ''
          editor.fire(eventTypes.coreOperation, {
            action: operationTypes.updateLayer,
            param: { idList: props.activeIdList, parentId, index: realIndex }
          })
        }
      } else {
        editor.fire(eventTypes.coreOperation, { action: operationTypes.setSelection, param: [layerId] })
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
}

// 双击编辑图层
const handleDblclick = (e: MouseEvent) => {
  if (e.shiftKey || e.ctrlKey) return

  const { layerId, layerElement } = getEventTarget(e)
  if (layerId) {
    const target = getObjectDetail(layerId)
    target.editable = true
    setTimeout(() => {
      layerElement.querySelector('input').select()
    }, 16)
  }
}
defineExpose({
  exposeScrollUpdate
})
</script>
