<template>
  <div class="datavis-workspace-bar" @drop="handleDrop" @dragover="handleDragOver" ref="elRef" oncontextmenu="return false;">
    <datavis-ruler-bar ref="rulerBarRef" @lineChange="handleLineChange"></datavis-ruler-bar>
    <div class="datavis-workspace-bar-container">
      <div id="bi-datavis_selection" class="datavis-workspace-bar-selection" :class="{ isGrab: datavisEditor && datavisEditor.grabing }">
        <div ref="screenRef" id="bi-datavis_screen" class="datavis-workspace-bar-screen">
          <svg class="datavis-background-layer" :style="backgroundLayerStyle"></svg>
          <svg style="width: 100%; height: 100%; overflow: visible" :style="getContainerStyle">
            <!-- 背景 -->
            <g v-if="state.backObjects && state.backObjects.length">
              <g v-for="item in state.backObjects" :key="item.id">
                <component :is="item.component.name" :node="item" />
              </g>
            </g>
            <!-- 子页面 -->
            <g v-for="item in datavisEditor.objects" :key="item.id">
              <component :is="item.component.name" :node="item" />
            </g>
            <!-- 背景大屏 -->
            <g v-if="state.frontObjects && state.frontObjects.length">
              <g v-for="item in state.frontObjects" :key="item.id">
                <component :is="item.component.name" :node="item" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, onBeforeUnmount, getCurrentInstance, computed, StyleValue, nextTick } from 'vue'

import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'

import { useResizeObserver } from '@vueuse/core'

import { DatavisEngine, eventTypes, pageOperationTypes, useFontlist, getImageSize } from '../../utils/index'
import { ElMessage } from 'element-plus'

import { EditorState } from '../../types'

const componentName = 'datavisWorkspaceBar'
defineOptions({ name: componentName })
const emit = defineEmits(['editorCreated'])

const datavisEditor = ref<any>({})

// 当前组件实例，用户获取挂在app的全局组件
const vInstance = getCurrentInstance()

// 当前组件实例的ref
const elRef = ref()

// 编辑器状态
const editorState = ref<EditorState>({
  canRedo: false,
  canUndo: false,
  selectedCount: 0,
  isGroup: false,
  isActiveSelection: false,
  activeObject: null,
  sameLevelCount: 0
})

const ruleLines = ref<any>({ h: [], v: [] })

const handleLineChange = (lines: any) => {
  ruleLines.value = lines
}

/**
 * 向核心发起操作，调用shortcutHandler.handleOperation方法
 * @param event
 */
const handleCoreOperation = (event: any) => {
  console.log('handleCoreOperation', event)
  datavisEditor.value.shortcutHandler.handleOperation(event)
}

// 初始化编辑器
const initEditor = () => {
  // 获取组合的默认属性
  const components = vInstance?.appContext.components || {}
  const component = components['visWidgetGroup']
  const groupAttrs = Reflect.get(component, 'defaultValue')

  let instance = new DatavisEngine('#bi-datavis_selection', {
    canvas: '#bi-datavis_screen',
    width: 1920,
    height: 1080,
    selectionBackground: 'rgba(44, 131, 251, 0.1)',
    selectionBorderColor: 'rgba(44, 131, 251, 1)',
    controlBorderColor: 'rgba(44, 131, 251, 1)',
    groupAttrs,
    zoom: {
      spaceH: 100,
      spaceV: 50
    },
    sorption: {
      // 吸附
      enabled: true, // 是否启用吸附
      offset: 1 // 吸附距离
    }
  })
  datavisEditor.value = instance
  const proxyObj = datavisEditor.value
  datavisEditor.value.initializeHandler.call(datavisEditor.value)

  // 用反射的方式，将编辑器实例挂在到window上
  Reflect.set(window, 'datavisEditor', proxyObj)
  emit('editorCreated', proxyObj)
}

// 背景层
const backgroundLayerStyle = computed(() => {
  const { width, height, backgroundFilter, background, backgroundImage } = datavisEditor.value.config || {}
  const style: StyleValue = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: background || '#1F2024',
    zIndex: -1
  }
  if (backgroundImage) {
    style.backgroundImage = `url("${encodeURI(backgroundImage)}")`
    style.backgroundPosition = 'center center'
    style.backgroundSize = 'cover'
    style.backgroundRepeat = 'no-repeat'
  }
  // 滤镜
  if (backgroundFilter) {
    const { enable, hueRotate, contrast, saturate, brightness, grayscale } = backgroundFilter
    if (enable) {
      let filterStr = ''
      if (hueRotate) filterStr += ` hue-rotate(${hueRotate}deg)`
      if (contrast) filterStr += ` contrast(${contrast}%)`
      if (saturate) filterStr += ` saturate(${saturate}%)`
      if (brightness) filterStr += ` brightness(${brightness}%)`
      if (grayscale) filterStr += ` grayscale(${grayscale}%)`
      style.filter = filterStr
    }
  }
  return style
})

// 全局滤镜
const getContainerStyle = computed(() => {
  const { width, height, filter } = datavisEditor.value.config || {}
  const style: StyleValue = {
    width: `${width}px`,
    height: `${height}px`
  }
  if (filter) {
    const { enable, hueRotate, contrast, saturate, brightness, grayscale } = filter
    if (enable) {
      let filterStr = ''
      if (hueRotate) filterStr += ` hue-rotate(${hueRotate}deg)`
      if (contrast) filterStr += ` contrast(${contrast}%)`
      if (saturate) filterStr += ` saturate(${saturate}%)`
      if (brightness) filterStr += ` brightness(${brightness}%)`
      if (grayscale) filterStr += ` grayscale(${grayscale}%)`
      style.filter = filterStr
    }
  }
  return style
})

// 列表拖拽 START
const handleDragOver = (e: any) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

// 添加组件
const editorAddObject = (data: any) => {
  const proxyObj = datavisEditor.value
  let position = dropPosition.value
  if (!position) {
    position = proxyObj.getEditorCenter()
  }
  const obj = datavisEditor.value.plainObjectToClass(data)
  if (!obj.name) {
    obj.name = obj.component.title || ''
  }
  obj.id = nanoid(8)
  obj.x = +(position.x - (obj.w / 2 || 0)).toFixed(2)
  obj.y = +(position.y - (obj.h / 2 || 0)).toFixed(2)
  proxyObj.shortcutHandler.handleAddObject(obj)
}
const dropPosition = ref<any>(null) // 拖拽放置位置
const handleDrop = (e: any) => {
  const { files } = e.dataTransfer
  e.preventDefault()
  e.stopPropagation()

  dropPosition.value = datavisEditor.value.getMouseInnerPosition(e)
  const datavisData = e.dataTransfer.getData('datavisData')
  if (datavisData) {
    const data = JSON.parse(datavisData)
    if (data.type === 'addComponent') {
      exposeAddComponent(data.params)
    } else {
      datavisEditor.value.fire(eventTypes.pageOperation, {
        type: pageOperationTypes.objectAdd,
        data,
        source: componentName
      })
    }
  } else if (files) {
    handleDropFiles(files)
  }
}

/**
 * 校验文件是否为datavis模板文件
 * @param file 文件对象
 */
const isValidDatavisFile = (file: File) => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = e => {
      const result: any = e.target?.result
      try {
        const data = JSON.parse(result)
        const hasScreenField = Reflect.has(data, 'screen')
        const hasBackendField = Reflect.has(data, 'backend')
        const hasFrontendField = Reflect.has(data, 'frontend')
        const params = {
          isValid: hasScreenField && hasBackendField && hasFrontendField,
          data
        }
        resolve(params)
      } catch (e) {
        resolve({ isValid: false })
      }
    }
  })
}

/**
 * 处理文件拖拽
 * @param file 文件对象
 */
const handleDropFiles = async (files: any) => {
  let refuseReason = ''
  const iamgeTypes = ['png', 'jpg', 'jpeg', 'svg']
  const imageFileList: any = []
  const jsonFileDataList: any = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const { name } = file
    const suffix = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
    const isImage = iamgeTypes.includes(suffix)
    const isJson = suffix === 'json'
    if (isImage) {
      imageFileList.push(file)
    }
    if (isJson) {
      const { isValid, data } = (await isValidDatavisFile(file)) as any
      if (!isValid) {
        refuseReason = `文件${i + 1}不是本系统支持的模板格式`
        break
      }
      jsonFileDataList.push(data)
    }
    if (!isImage && !isJson) {
      refuseReason = '不支持的文件类型'
      break
    }
  }
  if (refuseReason) {
    return ElMessage.error(refuseReason)
  }
  if (imageFileList.length) {
    // 图片要先上传才能使用
    datavisEditor.value.fire(eventTypes.pageOperation, {
      type: pageOperationTypes.fileUpload,
      data: {
        formData: { files: imageFileList },
        callback: async ({ urls }: any) => {
          for (let i = 0; i < urls.length; i++) {
            const url = urls[i]
            const { width, height } = (await getImageSize(url)) as any
            const value = getComponentDefaultValue('visWidgetImage')
            value.w = width
            value.h = height
            value.states[0].src = url
            editorAddObject(value)
          }
        }
      },
      source: componentName
    })
  }
  if (jsonFileDataList.length) {
    for (let i = 0; i < jsonFileDataList.length; i++) {
      const { screen } = jsonFileDataList[i]
      const objects = screen[0].objects || []
      if (!objects.length) {
        return
      }
      if (objects.length > 1) {
        //多个组件组成的模块，需要创建组合包住所有组件
        const groupClass = datavisEditor.value.jsonObjectsToGroup(objects)
        editorAddObject(groupClass)
      } else {
        // 只有一个组件，无需创建组合组件，直接引入
        editorAddObject(objects[0])
      }
    }
  }
}

/**
 * 获取组件默认值
 * @param name 组件名称
 */
const getComponentDefaultValue = (name: string) => {
  const components = vInstance?.appContext.components || {}
  const component = components[name]
  if (component) {
    return cloneDeep(Reflect.get(component, 'defaultValue'))
  }
  return null
}

// 添加组件
const exposeAddComponent = (data: any) => {
  const component = getComponentDefaultValue(data.name)
  if (component) {
    editorAddObject(component)
  }
}
// 列表拖拽 END

// 编辑器状态变化
const handleEditorStatus = () => {
  const proxyObj = datavisEditor.value
  const { canRedo, canUndo } = proxyObj.historyHandler.getStatus()
  const activeObj = proxyObj.getActiveObject()
  const isGroup = !!(activeObj && activeObj.type === 'group')
  const isActiveSelection = !!(activeObj && activeObj.type === 'activeSelection')
  const selectedCount = proxyObj.getActiveObjects().length
  const state: EditorState = { canRedo, canUndo, selectedCount, isGroup, isActiveSelection, activeObject: activeObj }
  if (activeObj && selectedCount === 1) {
    let parent: any = null
    let index: number = 0
    let sameLevelCount: number = 0
    if (activeObj) {
      parent = activeObj.group || proxyObj
      index = parent.objects.findIndex((a: any) => a.id === activeObj.id)
      sameLevelCount = parent.objects.length
    }
    state.index = index
    state.sameLevelCount = sameLevelCount
  }
  // 编辑器前后状态是否一致
  const isSameEditorState = JSON.stringify(state) === JSON.stringify(editorState.value)
  if (!isSameEditorState) {
    editorState.value = state
    proxyObj.fire(eventTypes.editorStateUpdated, state)
  }
}

// 初始化标尺
const rulerBarRef = ref()
const initRulerSize = () => {
  const dom = document.querySelector('#bi-datavis_selection')
  if (dom) {
    const wrapperRect = dom.getBoundingClientRect()
    rulerBarRef.value.exposeRulerSize({
      width: wrapperRect.width,
      height: wrapperRect.height
    })
  }
}
// 处理导入图纸后的标尺偏移
const handleRulerOffset = () => {
  const { a: scale, e: translateX, f: translateY } = datavisEditor.value.viewportTransform
  rulerBarRef.value.exposeSetRuler({
    scale,
    translateX,
    translateY
  })
}

const state = reactive({
  lastSelectedObj: { locked: false, level: 1, parentId: '', id: '' }, // 主要用于判断shift多选
  lastSelectedObjIndex: 0,
  frontObjects: [] as any, // 前景大屏对象列表
  backObjects: [] as any // 背景大屏对象列表
})

// 选择模式
const handleChangeEditorSelection = () => {
  // 如果在绘制,则结束绘制模式
  datavisEditor.value.enableSelection()
}

// 移动模式
const handleChangeEditorMove = () => {
  // 如果在绘制,则结束绘制模式
  datavisEditor.value.disableSelection()
}

// 外部引用绘制方法
const exposeDraw = async (e: any) => {
  if (['selection', 'move'].includes(e.key)) {
    if (e.key == 'move') {
      // move -移动模式
      handleChangeEditorMove()
    } else if (e.key == 'selection') {
      // selection-选择模式
      handleChangeEditorSelection()
    }
    return
  }
  // 如果切换为移动模式,则需要切换会选择模式
  handleChangeEditorSelection()

  const components = vInstance?.appContext.components || {}
  const component = components[e.component]
  if (!component) {
    console.error('未找到该类型的绘制方法', e.component, e)
    handleChangeEditorSelection()
    return
  }
  const defaultValue = cloneDeep(Reflect.get(component, 'defaultValue'))
  const { drawList = [] } = datavisEditor.value.config || {}
  const drawObj = drawList.find((a: any) => a.value === e.key) || {}
  const drawConfig = drawObj.config || {}
  const obj = await datavisEditor.value.drawHandler.draw(e.key, drawConfig)
  if (!obj) {
    return console.error('绘制异常')
  }
  if (e.key === 'text') {
    const { x, y, w, h, text, style } = obj
    defaultValue.data[0].text = text
    defaultValue.states[0].style = style
    defaultValue.states[0].textShadow.show = false
    Object.assign(defaultValue, { x, y, w, h })
  } else {
    Object.assign(defaultValue, obj)
  }
  defaultValue.name = datavisEditor.value.getTypeCountName(defaultValue) || '' // 名称默认为组件的名称
  const target = datavisEditor.value.plainObjectToClass(defaultValue)
  datavisEditor.value.shortcutHandler.handleAddObject(target)
  datavisEditor.value.drawHandler.target = null
  handleEditorStatus()
  datavisEditor.value.fire(eventTypes.drawFinish)
}

/**
 * 工作区提供的导入图纸数据方法
 * @param param0 objects 子大屏对象数组； config 配置信息； frontObjects 前景大屏对象数组； backObjects 背景大屏对象数组;
 */
const exposeImportData = ({ objects = [], config, frontObjects = [], backObjects = [], metadata }: any) => {
  const proxyObj = datavisEditor.value

  // 将配置信息合并入proxyObj.config
  Object.assign(proxyObj.config, config || {})

  // 由于vue缓存机制导致导入草稿之类操作会不生效，先将元素置空再导入
  proxyObj.objects = []
  state.frontObjects = []
  state.backObjects = []

  nextTick(() => {
    const data = {
      viewportTransform: proxyObj.config.viewportTransform,
      objects
    }
    proxyObj.importData(data)
    state.frontObjects = proxyObj.dataEnlivenObjects(frontObjects)
    state.backObjects = proxyObj.dataEnlivenObjects(backObjects)

    if (!objects.length) {
      proxyObj.zoomHandler.zoomFitView()
    }
  })
  // 注册字体
  useFontlist((metadata && metadata.fonts) || [])
}

// 导出图纸数据
const exposeExportData = () => {
  const content = datavisEditor.value.toJSON()
  return content
}

// 外部引用添加组件方法
const exposeAddModule = (moduleData: any) => {
  editorAddObject(moduleData)
}

// 清空dropPosition，直接点击组件时要把组件放到画布中间位置，而不是上一次的放置位置
const exposeClearDropPosition = () => {
  dropPosition.value = null
}

// 往外传递调用函数
defineExpose({
  exposeImportData,
  exposeExportData,
  exposeAddModule,
  exposeAddComponent,
  exposeDraw,
  exposeClearDropPosition
})

// 容器大小发生改变
const handleContainerResize = () => {
  nextTick(() => {
    // 后续优化
    initRulerSize()
    datavisEditor.value.zoomHandler.setBottomBar()
    datavisEditor.value.zoomHandler.setRightBar()
  })
}

// 添加空格监听事件
const spaceListener = () => {
  window.addEventListener('keydown', e => {
    if (e.key === ' ') {
      datavisEditor.value.disableSelection()
    } else {
    }
  })
  window.addEventListener('keyup', e => {
    if (e.key === ' ') {
      datavisEditor.value.enableSelection()
    } else {
    }
  })
}

let resizeObj: any

const isArround = (v1: number, v2: number, distance = 5) => {
  if (Math.abs(v1 - v2) < distance) {
    return true
  }
  return false
}

// 对象移动时触发的事件，用于判断标尺吸附
const handleObjectMoving = (e: any) => {
  const { target } = e
  handleObjectPositionChanging(e)
  if (target) {
    const hLines = ruleLines.value.h || [] // h表示水平位置相同，即垂直线
    const vLines = ruleLines.value.v || [] // v表示垂直位置相同，即水平线

    if (hLines.length || vLines.length) {
      const coords = target.getCoords(true)
      // tl表示左上角，tr表示右上角，bl表示左下角，br表示右下角。拿这几个点做标尺吸附判断
      const keyList = ['tl', 'tr', 'bl', 'br']

      const { x, y } = coords.tl
      // 最小x、最大x、最小y、最大y的值
      let [minX, minY, maxX, maxY] = [x, y, x, y]
      // 最小x、最大x、最小y、最大y的值对应的控制点
      let [minXCoord, minYCoord, maxXCoord, maxYCoord] = ['tl', 'tl', 'tl', 'tl']
      keyList.forEach(key => {
        const item = coords[key]
        if (item.x < minX) {
          minX = item.x
          minXCoord = key
        }
        if (item.x > maxX) {
          maxX = item.x
          maxXCoord = key
        }
        if (item.y < minY) {
          minY = item.y
          minYCoord = key
        }
        if (item.y > maxY) {
          maxY = item.y
          maxYCoord = key
        }
      })
      const centerX = (minX + maxX) / 2 // 中心点X
      const centerY = (minY + maxY) / 2 // 中心点Y

      for (let i = 0; i < hLines.length; i++) {
        // h表示水平位置相同，即垂直线
        const value = hLines[i]
        let diffX = null // 吸附偏差值，即吸附到这条线时，需要移动的距离
        if (isArround(minX, value)) {
          diffX = minX - value
        } else if (isArround(centerX, value)) {
          diffX = centerX - value
        } else if (isArround(maxX, value)) {
          diffX = maxX - value
        }
        if (diffX !== null) {
          // 一旦吸附就不用继续循环判断了
          target.set({ x: target.x - diffX })
          if (target.type === 'activeSelection') {
            target.objects.forEach((item: any) => {
              item.set({ x: item.x - diffX })
            })
          }
          break
        }
      }
      for (let i = 0; i < vLines.length; i++) {
        // v表示垂直位置相同，即水平线
        const value = vLines[i]
        let diffY = null // 吸附偏差值，即吸附到这条线时，需要移动的距离
        if (isArround(minY, value)) {
          diffY = minY - value
        } else if (isArround(centerY, value)) {
          diffY = centerY - value
        } else if (isArround(maxY, value)) {
          diffY = maxY - value
        }
        if (diffY !== null) {
          // 一旦吸附就不用继续循环判断了
          target.set({ y: target.y - diffY })
          if (target.type === 'activeSelection') {
            target.objects.forEach((item: any) => {
              item.set({ y: item.y - diffY })
            })
          }
          break
        }
      }
    }
  }
}

// 对象位置属性变化处理，移动、旋转等
const handleObjectPositionChanging = (event: any) => {
  if (event && event.target) {
    const objs = datavisEditor.value.getActiveObjects()
    objs.forEach((item: any) => {
      // 用于提升浏览器性能，用完即删
      item.willChange = 'transform'
    })
  }
}

// 对象位置属性变化结束，移动、旋转等
const handleObjectPositionChangeEnd = (event: any) => {
  if (event && event.target) {
    const objs = datavisEditor.value.getActiveObjects()
    objs.forEach((item: any) => {
      // 用于提升浏览器性能，用完即删
      delete item.willChange
    })
  }
}

const handleSelectionUpdated = () => {
  // console.log('handleSelectionUpdated')
  handleEditorStatus()
}

const handleLayerChange = () => {
  console.log('handleLayerChange')
  handleEditorStatus()
}

const handleEvents = ({ isDispose = false }) => {
  const proxyObj = datavisEditor.value
  const key = isDispose ? 'off' : 'on'
  proxyObj[key](eventTypes.editorPanzoom, handleRulerOffset)
  proxyObj[key](eventTypes.selectionUpdated, handleSelectionUpdated)
  proxyObj[key](eventTypes.layerChange, handleLayerChange)
  proxyObj[key](eventTypes.coreOperation, handleCoreOperation)
  proxyObj[key](eventTypes.objectMoving, handleObjectMoving)
  proxyObj[key](eventTypes.objectRotating, handleObjectPositionChanging)
  proxyObj[key](eventTypes.objectResizing, handleObjectPositionChanging)
  proxyObj[key](eventTypes.objectMoveEnd, handleObjectPositionChangeEnd)
  proxyObj[key](eventTypes.objectRotateEnd, handleObjectPositionChangeEnd)
  proxyObj[key](eventTypes.objectResizeEnd, handleObjectPositionChangeEnd)
}

onMounted(() => {
  initEditor()
  initRulerSize()
  spaceListener()
  handleEvents({ isDispose: false })
  resizeObj = useResizeObserver(elRef.value, handleContainerResize)
})
onBeforeUnmount(() => {
  handleEvents({ isDispose: true })
  resizeObj && resizeObj.stop()
})
</script>
