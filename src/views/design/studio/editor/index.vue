<template>
  <div class="datavis-editor" v-loading="!!loadingText" :element-loading-text="loadingText">
    <div class="datavis-editor-header">
      <slot name="header" :isReady="isReady"></slot>
    </div>
    <div class="datavis-editor-body">
      <div class="datavis-editor-body__left" v-show="leftBarVisible">
        <slot name="left" :isReady="isReady"></slot>
      </div>
      <div class="datavis-editor-body__center">
        <div class="datavis-editor-body__center__top" v-if="datavisEditor && slots.workspaceTop">
          <slot name="workspaceTop"></slot>
        </div>
        <datavis-workspace-bar ref="workspaceBarRef" @editorCreated="handleEditorCreated"></datavis-workspace-bar>
        <div class="datavis-editor-body__center__bottom">
          <datavis-page-bar
            v-model:boardActiveKey="boardActiveKey"
            :frontend="state.frontend"
            :screen="state.screen"
            :backend="state.backend"
            :isModule="isModule"
            v-if="datavisEditor"
            @command="handlePageCommand"
          ></datavis-page-bar>
          <datavis-zoom-bar v-if="datavisEditor"> </datavis-zoom-bar>
        </div>
      </div>
      <div class="datavis-editor-body__right" v-show="rightBarVisible">
        <datavis-right-bar :customThemeList="customThemeList" :isModule="isModule" v-if="datavisEditor">
          <template #setting>
            <slot name="setting"></slot>
          </template>
        </datavis-right-bar>
      </div>
    </div>
    <slot name="contextmenu" :isReady="isReady"></slot>
    <!-- <datavis-contextmenu-bar v-if="datavisEditor"></datavis-contextmenu-bar> -->
  </div>
</template>
<script lang="ts" setup>
// 依赖
import { ref, reactive, provide, computed, onMounted, onBeforeUnmount, getCurrentInstance, useSlots } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep, pick } from 'lodash-es'
import { downloadFile, eventTypes, pageOperationTypes, operationTypes, editorVersion, analysisFileUrl } from './utils/index'
import { toJpeg, toPng } from 'html-to-image'
// @ts-ignore
import dayjs from 'dayjs'

defineOptions({ name: 'datavisEditor' })
const name = defineModel<string>('name')
const slots = useSlots()
// 当前组件实例，用户获取挂在app的全局组件
const vInstance = getCurrentInstance()

const props = defineProps({
  isModule: {
    type: Boolean
  },
  customThemeList: {
    type: Array,
    default: () => []
  },
  pageInfo: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['command'])

// 是否初始化完成
const datavisEditor = ref<any>(null)
const isReady = ref(false)

const loadingText = ref('') // 加载中文本

provide('datavisEditor', datavisEditor)

// 编辑器初始化完成后赋予变量，用于后续操作
const handleEditorCreated = (editor: any) => {
  datavisEditor.value = editor
  isReady.value = true
}
/* 禁止缩放页面 */
const disabledScalePage = () => {
  document.addEventListener(
    'wheel',
    function (event) {
      if (event.ctrlKey === true) {
        event.preventDefault()
      }
    },
    { passive: false }
  )
}

// 控制左右bar显隐
const leftBarVisible = ref(true)
const rightBarVisible = ref(true)

// pageBar静态数据
// 多大屏
const boardActiveKey = ref('')
const boardActiveType = ref<'screen' | 'frontend' | 'backend'>('screen')

// 操作
enum PageCommandType {
  Addition = 'addition',
  Decrease = 'decrease',
  Change = 'change'
}

interface PageCommandRow {
  index?: number
  type: number
  data?: any
}

const handlePageCommand = (type: PageCommandType, row: PageCommandRow) => {
  switch (type) {
    case 'addition':
      additionBoard(row.index, row.type)
      break
    case 'decrease':
      decreaseBoard(row.index, row.type)
      break
    case 'change':
      changeBoard(row.data)
      break
  }
}
// 添加子屏
const additionBoard = (index: any, type: any) => {
  const uid = nanoid(8)
  let itemType = ''
  const frontItem = {
    name: '前景大屏',
    uid: uid,
    type: 'frontend',
    objects: []
  }
  const backItem = {
    name: '背景大屏',
    uid: uid,
    type: 'backend',
    objects: []
  }
  const boardItem = {
    name: `子大屏${index}`,
    uid: uid,
    type: 'screen',
    objects: []
  }
  switch (type) {
    case 'frontend':
      itemType = 'frontend'
      state.frontend.push(frontItem)
      break
    case 'backend':
      itemType = 'backend'
      state.backend.push(backItem)
      break
    default:
      itemType = 'screen'
      state.screen.push(boardItem)
      break
  }
  boardActiveKey.value = uid
  // 切换到空白子屏去
  changeBoard({
    uid: uid,
    type: itemType,
    objects: []
  })
}
// 删除子屏
const decreaseBoard = (index: any, type: any) => {
  let uid: any

  switch (type) {
    case 'frontend':
      uid = state.frontend[index].uid
      state.frontend.splice(index, 1)
      break
    case 'backend':
      uid = state.backend[index].uid
      state.backend.splice(index, 1)
      break
    default:
      uid = state.screen[index].uid
      state.screen.splice(index, 1)
      break
  }

  // 删除当前编辑的子屏
  if (boardActiveKey.value === uid && state.screen.length) {
    // 删除后切换到第一子屏
    const screenFirst = state.screen[0]
    changeBoard({
      uid: screenFirst.uid,
      type: 'screen',
      objects: screenFirst.objects
    })
  }
  // 需要删除子屏的历史记录
}

// 工作区
const workspaceBarRef = ref()
// 切换子屏,并渲染到工作区
const changeBoard = (row: any) => {
  if (boardActiveKey.value && boardActiveKey.value !== row.uid) {
    // 切换子屏时，先将当前子屏的图层数据同步到图纸
    syncScreenToGraph()
  }
  boardActiveType.value = row.type
  boardActiveKey.value = row.uid
  let [objects, frontObjects, backObjects, config, metadata] = [[], [], [], state.pageData.config, state.pageData.metadata]
  // 因为只有objects才会触发事件，处于前景、背景大屏时要将objects赋予editor上的objects，只有处于子大屏时才会同时渲染前景、背景、子大屏
  switch (boardActiveType.value) {
    case 'frontend':
      objects = row.objects
      break
    case 'backend':
      objects = row.objects
      break
    case 'screen':
      objects = row.objects
      // 做判空处理
      if (state.frontend && state.frontend.length) {
        frontObjects = state.frontend[0].objects
      }
      if (state.backend && state.backend.length) {
        backObjects = state.backend[0].objects
      }
      break
  }
  workspaceBarRef.value.exposeImportData({ objects, frontObjects, backObjects, config, metadata })
}

// 前景大屏层、大屏层、背景大屏层
// 1.如果当前为前景大屏则仅展示前景大屏的元素
// 2.如果当前为子屏层，把当前子屏和前景大屏、背景大屏全部展现
// 3.如果当前为背景大屏则仅展示背景大屏的元素
// 4.背景大屏的元素不会触发事件，仅当背景用，这个要注意
const state = reactive({
  // 图纸数据
  pageData: {} as any,
  // 前景
  frontend: [] as any,
  // 背景
  backend: [] as any,
  // 子屏
  screen: [] as any,
  // 元数据
  metadata: {} as any
})

const screenList = computed(() => {
  return state.screen
})

// 提供子屏列表，供子组件注入。因为provide不提供响应式，这里要用computed包裹一层
provide('screenList', screenList)

// 往外传递函数
const emitCommand = async (type: string, data?: any, source?: any) => {
  emit('command', type, data, source)
}

// 处理对外事件
const handlePageOperation = (e: any) => {
  const type = e.type as pageOperationTypes
  const data = e.data
  switch (type) {
    case pageOperationTypes.importJSON:
      handleImportJSON()
      break
    case pageOperationTypes.importDraft:
      handleImportDraft()
      break
    case pageOperationTypes.downloadJSON:
      handleDownloadJSON()
      break
    case pageOperationTypes.downloadImage:
      handleDownloadImage()
      break
    case pageOperationTypes.preview:
      handlePreview()
      break
    case pageOperationTypes.dataPreview:
      handleDataPreview()
      break
    case pageOperationTypes.save:
      handleSave()
      break
    case pageOperationTypes.saveAsModule:
      handleSaveAsModule()
      break
    case pageOperationTypes.objectAdd:
      handleAddObject(data)
      break
    case pageOperationTypes.themeApiRefresh:
      handleThemeApiRefresh()
      break
    case pageOperationTypes.importPSD:
    case pageOperationTypes.saveDraft:
    case pageOperationTypes.saveAs:
    case pageOperationTypes.deployment:
    case pageOperationTypes.publish:
    case pageOperationTypes.share:
    case pageOperationTypes.shareLink:
    case pageOperationTypes.back:
    case pageOperationTypes.search:
    case pageOperationTypes.imagePicker:
    case pageOperationTypes.fileUpload:
    case pageOperationTypes.materialUpdate:
      emitCommand(type, data, e.source)
      break
    case pageOperationTypes.layoutChange:
      handleLayoutChange(data)
      break
    case pageOperationTypes.signalUpdated:
      handleSignalUpdated(e)
      break
    case pageOperationTypes.signalInit:
      handleSingnalInit(data)
      break
  }
}

// 布局修改，左右面板显隐
const handleLayoutChange = (e: any) => {
  leftBarVisible.value = e.left
  rightBarVisible.value = e.right
}

// 导入数据
const exposeImportData = (data: any) => {
  let parseData = data
  if (typeof data === 'string') {
    parseData = JSON.parse(data)
  }
  state.pageData = parseData

  state.frontend = parseData.frontend
  state.backend = parseData.backend
  state.screen = parseData.screen
  /** 稳定后删除 canvasConfig*/
  if (!parseData.config) {
    parseData.config = parseData.canvasConfig
    delete parseData.canvasConfig
  }

  state.metadata = parseData.metadata || {}
  // 初始化字体数据，如果没有此字段，则从图纸中解析用到的字体
  if (!state.metadata.fonts) {
    state.metadata.fonts = getGraphFonts()
  }

  const defaultScreenId = state.pageData.lastEditScreenId || parseData.config.defaultScreenId
  if (defaultScreenId && parseData.screen.length) {
    const defaultScreen = getScreenDataById(defaultScreenId)
    changeBoard(defaultScreen)
  } else {
    changeBoard(parseData.screen[0])
  }
}

/**
 * 通过大屏id获取大屏数据
 * @param id
 */
const getScreenDataById = (id: any) => {
  const arr = [...state.frontend, ...state.backend, ...state.screen]
  return arr.find(item => item.uid === id)
}

// 导入图纸
const handleImportJSON = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  input.onchange = event => {
    const elem = event.target as any
    if (elem.files && elem.files[0]) {
      const file = elem.files[0]
      const jsonReader = new FileReader()
      jsonReader.onloadend = e => {
        const resData = e.target?.result
        exposeImportData(resData)
      }
      jsonReader.readAsText(file)
    }
  }
  input.click()
}

// 导出大屏
const handleDownloadJSON = () => {
  const downloadTextFile = (content: string, filename: string, fileSuffix: string) => {
    const blob = new Blob([content])
    downloadFile(URL.createObjectURL(blob), filename, fileSuffix)
  }
  const boardName = name.value
  const filename = `${boardName}_${new Date().getTime()}`
  disposeGraph().then(pageData => {
    downloadTextFile(JSON.stringify(pageData), filename, 'json')
  })
}

/**
 * dom元素截图
 * @param element dom元素
 */
const getDOMIJpeg = (element: any) => {
  return new Promise(resolve => {
    toJpeg(element, {
      // 给要截图的元素设置覆盖样式
      style: {
        transform: 'none'
      },
      quality: 0.8,
      pixelRatio: 1, // 强制像素比为1，否则浏览器缩放后截图会异常
      // 宽高1*1的透明色图片作为占位符，防止图片加载失败导致无法截图
      imagePlaceholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC'
    }).then(function (dataUrl: any) {
      resolve(dataUrl)
    })
  })
}

// 导出图片
const handleDownloadImage = async () => {
  const image = (await getGraphScreenShot()) as any
  const suffix = image.split(';')[0].split('/')[1]
  downloadFile(image, `datavis_${name.value}`, suffix)
}

// 保存页面
const handleSave = async () => {
  emitCommand(pageOperationTypes.save)
  loadingText.value = ''
}

/**
 * 获取模块截图
 * 原理：复制当前激活对象DOM节点，写到一个层级z-index为-1的div中，然后截图
 */
const exposeGetModuleScreenShot = async () => {
  const activeObj = datavisEditor.value.getActiveObject()
  const { w, h } = activeObj.getGlobalPosition()
  const element = document.getElementById(activeObj.id) as any
  const copyElement = element.cloneNode(true)
  // canvas克隆出来里面内容为空，需要手动复制canvas内容
  const originCanvasList = element.querySelectorAll('canvas')
  const copyCanvasList = copyElement.querySelectorAll('canvas')
  for (let i = 0; i < copyCanvasList.length; i++) {
    const copyCanvas = copyCanvasList[i]
    const originCanvas = originCanvasList[i]
    const copyCanvasContext = copyCanvas.getContext('2d')
    copyCanvasContext.drawImage(originCanvas, 0, 0)
  }

  copyElement.style.transform = 'translate(0px, 0px)'
  const container = document.createElement('div')
  const style = {
    position: 'fixed',
    left: '0px',
    top: '0px',
    zIndex: -1,
    width: `${w}px`,
    height: `${h}px`
  }
  Object.assign(container.style, style)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', `${w}px`)
  svg.setAttribute('height', `${h}px`)

  svg.appendChild(copyElement)
  container.appendChild(svg)
  document.body.appendChild(container)
  const image = await toPng(container)
  document.body.removeChild(container)
  return image
}

/**
 * 保存模块
 */
const handleSaveAsModule = async () => {
  const activeObj = datavisEditor.value.getActiveObject()
  emitCommand(pageOperationTypes.saveAsModule, { jsonData: activeObj.toJSON() })
}

// 预览
const handlePreview = async () => {
  emitCommand(pageOperationTypes.preview)
}

const handleDataPreview = async () => {
  const jsonData = await disposeGraph()
  emitCommand(pageOperationTypes.dataPreview, jsonData)
}

// 读取本地草稿
const handleImportDraft = () => {
  emitCommand(pageOperationTypes.importDraft)
}

// 设置选中的大屏的对象同步到对应的大屏列表
const syncScreenToGraph = () => {
  const content = workspaceBarRef.value.exposeExportData()
  let findItem = null
  let target: any
  switch (boardActiveType.value) {
    case 'frontend':
      target = state.frontend
      break
    case 'backend':
      target = state.backend
      break
    default:
      target = state.screen
      break
  }
  findItem = target.find((e: any) => e.uid === boardActiveKey.value)
  if (findItem) {
    findItem.objects = content.objects
  }
}

// 获取图纸中使用到的字体列表
const getGraphFonts = () => {
  const screens = [...state.frontend, ...state.screen, ...state.backend]
  const fontList: any = []
  const recursion = (obj: any) => {
    if (obj) {
      Object.keys(obj).forEach((key: any) => {
        if (key === 'fontFamily' && !fontList.includes(obj[key])) {
          fontList.push(obj[key])
        }
        if (typeof obj[key] === 'object') {
          recursion(obj[key])
        }
      })
    }
  }
  screens.forEach(screen => {
    screen.objects.forEach((obj: any) => {
      recursion(obj)
    })
  })
  return fontList.filter((item: any) => item)
}

// 处理 图纸json 数据
const disposeGraph = () => {
  syncScreenToGraph()
  return new Promise(resolve => {
    const editor = datavisEditor.value
    const keepFields = [
      'width',
      'height',
      'background',
      'backgroundImage',
      'backgroundFilter',
      'renderMode',
      'defaultScreenId',
      'toolbar',
      'filter',
      'interfaceApi',
      'password',
      'address',
      'panzoom'
    ]
    const config = pick(editor.config, keepFields)
    config.viewportTransform = editor.viewportTransform

    // 每次处理图纸都要处理一遍字体，将用到的字体写到metadata的fonts中
    state.metadata.fonts = getGraphFonts()
    const pageData = {
      config: config,
      frontend: state.frontend,
      screen: state.screen,
      backend: state.backend,
      lastEditScreenId: boardActiveKey.value, // 最后一次编辑的大屏id
      info: {
        app: window.location.host,
        ...editorVersion,
        build: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        ...props.pageInfo
      },
      type: 'visual',
      metadata: state.metadata
    }
    resolve(pageData)
  })
}
// 添加组件
const handleAddObject = (row: any) => {
  if (row.clearDropPosition) {
    workspaceBarRef.value.exposeClearDropPosition()
  }
  // 组件不需要请求文件，直接可由workspaceBarRef处理
  if (row.type === 'addComponent') {
    workspaceBarRef.value.exposeAddComponent(row.params)
  } else {
    emitCommand(pageOperationTypes.objectAdd, row)
  }
}

const handleThemeApiRefresh = () => {
  emitCommand(pageOperationTypes.themeApiRefresh)
}

// 添加组件方法
const exposeAddModule = (moduleData: any) => {
  const screenData = moduleData.screen
  const objectData = cloneDeep(screenData[0].objects)
  if (!objectData.length) {
    return
  }
  if (objectData.length > 1) {
    //多个组件组成的模块，需要创建组合包住所有组件
    const groupClass = datavisEditor.value.jsonObjectsToGroup(objectData)
    workspaceBarRef.value.exposeAddModule(groupClass)
  } else {
    // 只有一个组件，无需创建组合组件，直接引入
    workspaceBarRef.value.exposeAddModule(objectData[0])
  }
}

// 添加图片素材
const exposeAddMaterial = (data: any) => {
  const { width, height, url } = data
  const { fileName } = analysisFileUrl(url)
  const components = vInstance?.appContext.components || {}
  const component = components.visWidgetImage
  if (component) {
    const value = Reflect.get(component, 'defaultValue')
    const cloneValue = cloneDeep(value)
    cloneValue.w = width
    cloneValue.h = height
    cloneValue.states[0].src = url
    cloneValue.name = fileName
    workspaceBarRef.value.exposeAddModule(cloneValue)
  }
}

// 添加视频素材
const exposeAddVideo = (data: any) => {
  const { width, height, url } = data
  const components = vInstance?.appContext.components || {}
  const component = components.visWidgetVideo
  if (component) {
    const value = Reflect.get(component, 'defaultValue')
    const cloneValue = cloneDeep(value)
    cloneValue.w = width
    cloneValue.h = height
    cloneValue.data[0].value = url
    workspaceBarRef.value.exposeAddModule(cloneValue)
  }
}
const exposeExportData = () => {
  return new Promise(resolve => {
    disposeGraph().then((data: any) => {
      resolve(data)
    })
  })
}

// 绘制组件
const handleEditorDrawObject = (e: any) => {
  const editor = datavisEditor.value
  if (editor.drawHandler.target) {
    editor.drawHandler.target.disposeEvents()
  }
  workspaceBarRef.value.exposeDraw(e)
}

/**
 * 获取编辑器图片
 */
const exposeExportImage = async () => {
  return await getGraphScreenShot()
}

/**
 * 获取图纸截图
 */
const getGraphScreenShot = async () => {
  const element = document.querySelector(datavisEditor.value.config.canvas) as HTMLElement
  const image = await getDOMIJpeg(element)
  return image
}

/**
 * 获取图纸数据然后保存，逻辑与 handleSave 相同
 */
const exposeGetSaveData = async () => {
  const pageData: any = await disposeGraph()
  const image = await getGraphScreenShot()
  return { pageData, image }
}

const exposeGetEditor = () => {
  return datavisEditor.value
}

const exposeSetData = (data: any) => {
  const arr = [...state.frontend, ...state.backend, ...state.screen]
  let obj: any = {}
  if (Array.isArray(data)) {
    data.forEach(item => {
      obj[item.key] = item.value
    })
  } else {
    obj = data
  }
  datavisEditor.value.util.traverse(arr, 'objects', (item: any) => {
    if (item.signal && obj[item.signal]) {
      item.data = obj[item.signal].data
    }
  })
  datavisEditor.value.util.traverse(datavisEditor.value.getObjects(), 'objects', (item: any) => {
    if (item.signal && obj[item.signal]) {
      item.emitter.emit('setData', obj[item.signal].data)
    }
  })
}

const handleCoreOperation = (e: any) => {
  if (e.action === operationTypes.editorConfig) {
    Object.assign(state.pageData.config, e.param.to)
  }
}

// editor这边负责监听标识符初始化事件，将metadata作为回调函数的实际参数返回给调用方
const handleSingnalInit = ({ callback }: any) => {
  callback(state.metadata.signals)
}
// 信号更新事件处理函数
const handleSignalUpdated = (e: { type: any; data: any }) => {
  const { data } = e
  state.metadata['signals'] = data
}

// 对外导出使用方法
defineExpose({
  exposeImportData,
  exposeAddModule,
  exposeAddMaterial,
  exposeAddVideo,
  exposeExportData,
  exposeExportImage,
  exposeGetSaveData,
  exposeGetEditor,
  exposeSetData,
  exposeGetModuleScreenShot
})

handleEditorDrawObject

const handleEvents = ({ isDispose = false }) => {
  const key = isDispose ? 'off' : 'on'
  datavisEditor.value[key](eventTypes.pageOperation, handlePageOperation)
  datavisEditor.value[key](eventTypes.coreOperation, handleCoreOperation)
  datavisEditor.value[key](eventTypes.drawStart, handleEditorDrawObject)
}

// 挂载
onMounted(() => {
  disabledScalePage()
  handleEvents({ isDispose: false })
})
onBeforeUnmount(() => {
  handleEvents({ isDispose: true })
})
</script>
