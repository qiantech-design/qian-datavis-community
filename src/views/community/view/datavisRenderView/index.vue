<template>
  <div class="datavis-renderer-container" ref="datavisRendererEditorRef">
    <div class="datavis-renderer-editor" :id="state.editorId">
      <div class="datavis-renderer-canvas" :id="state.canvasId">
        <svg style="width: 100%; height: 100%; overflow: visible">
          <!-- 背景 -->
          <g v-if="state.backendData && state.backendData.length">
            <g v-for="item in state.backendData" :key="item.id">
              <component :is="item.component.name" :node="item" />
            </g>
          </g>
          <!-- 子页面 -->
          <g v-if="state.screenData && state.screenData.length">
            <g v-for="item in state.screenData" :key="item.id">
              <component :is="item.component.name" :node="item" />
            </g>
          </g>
          <!-- 前景 -->
          <g v-if="state.frontendData && state.frontendData.length">
            <g v-for="item in state.frontendData" :key="item.id" :style="{
              fill: item.background,
              stroke: item.borderColor,
              color: item.fontColor
            }">
              <component :is="item.component.name" :node="item" />
            </g>
          </g>
        </svg>
      </div>
    </div>
    <div class="datavis-renderer-fullscreen" @click="handleToggleFullScreen">
      <vis-render-icon v-if="isFullscreen" name="exitFullscreen"></vis-render-icon>
      <vis-render-icon v-else name="fullscreen"></vis-render-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { get } from 'lodash-es'

import '@/assets/js/datavis/core/index.css'
import { datavisCore, editorUtil } from '@/assets/js/datavis/core/index.es.js'

import visRenderIcon from './component/Icon.vue'
import './style/index.scss'
import { useFontlist } from './utils/index.ts'
import { visApi } from './utils/api.ts'


defineOptions({
  name: 'datavisRenderView',
  version: 'datavisRenderView_community_v1.0.0',
})

const emit = defineEmits(['command', 'ready'])

const state = reactive({
  editorId: `datavis_screen__${editorUtil.nanoid(8)}`,
  canvasId: `datavis_canvas__${editorUtil.nanoid(8)}`,
  // 页面配置和图纸配置
  config: {} as any,
  // 子大屏对象数据
  screenData: [] as any,
  // 前景大屏对象数据
  frontendData: [] as any,
  // 背景大屏对象数据
  backendData: [] as any,
  defaultScreenId: '',
})

// 初始化编辑器
const datavisEditor = ref()
const initEditor = () => {
  const instance = new datavisCore(`#${state.editorId}`, {
    canvas: `#${state.canvasId}`,
    type: 'render',
    interactive: true // 开启交互
  })
  datavisEditor.value = instance
  datavisEditor.value.visApi = visApi
  emit('ready', { editor: datavisEditor.value })
  Reflect.set(window, `editor_${state.editorId}`, datavisEditor.value)
}

/**
 * 监听组件数据设置
 * @param data 组件数据
 */
const handleOnSettingData = (data: any) => {
  exposeSetData(data)
}

// 销毁事件
const destoryEditor = () => {
  if (datavisEditor.value && datavisEditor.value.destroy) {
    datavisEditor.value.destroy()
  }
}

// 事件监听
const handleEventlisteners = () => {
  const proxyObj = datavisEditor.value
  proxyObj.on({
    'page:switch': onSwitchBoard,
    'dialog:open': (e: any) => {
      handleCommand({
        command: 'event',
        data: {
          type: 'dialog',
          params: {
            node: e.node,
            data: e.data
          }
        }
      })
    },
    'setting:data': handleOnSettingData
  })
}

/**
 * 转化大屏数据，变为核心结构中的数据，并初始化动画
 * @param data
 */
const parseScreenData = (data: any) => {
  data = data || []
  return data.map((item: any) => {
    const objs = datavisEditor.value.parseObjects(item.objects)
    return {
      ...item,
      objects: objs
    }
  })
}

// 重置数据
const handleReset = () => {
  state.backendData = []
  state.screenData = []
  state.frontendData = []
}

// 全部子大屏
const screenList = ref<any>([])
// 全部前景大屏
const frontendList = ref<any>([])
// 全部背景大屏
const backendList = ref<any>([])

// 处理页面json数据渲染成页面
const handleSetScreenData = (data: any) => {
  // 转化图纸数据
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  screenList.value = parseScreenData(data.screen)
  backendList.value = parseScreenData(data.backend)
  frontendList.value = parseScreenData(data.frontend)

  // 前景
  if (frontendList.value.length) {
    if (frontendList.value[0].objects.length) {
      state.frontendData = frontendList.value[0].objects
    }
  }
  // 背景
  if (backendList.value.length) {
    if (backendList.value[0].objects.length) {
      state.backendData = backendList.value[0].objects
    }
  }

  // 传入配置合并入全局配置
  state.config = data.config
  datavisEditor.value.setConfig(state.config)
  datavisEditor.value.setRenderMode({ mode: state.config.renderMode, isScale: false })

  if (state.config.defaultScreenId) {
    state.defaultScreenId = state.config.defaultScreenId
  }

  // 字体
  useFontlist(state.config?.metadata?.fonts || [])

  // 如果有指定子屏id
  if (state.defaultScreenId) {
    const index = screenList.value.findIndex((e: any) => e.uid === state.defaultScreenId)
    handleChangeBoard(index)
  } else {
    handleChangeBoard(0)
  }
}


// 子屏切换
interface BoardRow {
  pageId: string
  pageIndex?: number
}

const onSwitchBoard = (row: BoardRow) => {
  const { pageId, pageIndex } = row
  if (pageId) {
    const idx = screenList.value.findIndex((e: any) => e.uid === pageId)
    handleChangeBoard(idx)
  } else {
    handleChangeBoard(Number(pageIndex))
  }
}

// 切换画面
const handleChangeBoard = (index: number) => {
  state.screenData = screenList.value[index].objects

  datavisEditor.value.objects = [...state.screenData, ...state.backendData, ...state.frontendData]
  handleCommand({
    command: 'event',
    data: {
      type: 'page',
      params: {
        pageId: '',
        pageIndex: index
      }
    }
  })
  setSignalData()
}


// 全屏
const datavisRendererEditorRef = ref<HTMLElement | null>(null)
const { isFullscreen, enter, exit } = useFullscreen(datavisRendererEditorRef)

const handleToggleFullScreen = () => {
  if (isFullscreen.value) {
    exit()
  } else {
    enter()
  }
}

const handleCommand = ({ command, data }: { command: string; data: any }) => {
  emit('command', {
    command: command,
    data: data
  })
}

const signalData = ref<any>({}) // 标识符对应数据集合

/**
 * 遍历对象数组，并对每个对象执行回调函数
 * @param arr 对象数组
 * @param callback 回调函数
 */
const traverse = (arr: any[], callback: any) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    callback(item)
    if (item.objects && item.objects.length) {
      traverse(item.objects, callback)
    }
  }
}

// 设置数据
const setSignalData = () => {
  let data = signalData.value
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  let tempData: any = {}
  if (Array.isArray(data)) {
    data.forEach(item => {
      tempData[item.key] = item.value
    })
  } else {
    tempData = data
  }
  signalData.value = tempData
  if (Object.keys(tempData).length) {
    traverse(datavisEditor.value.getObjects(), (item: any) => {
      if (item.signal) {
        const itemData = get(signalData.value, item.signal)
        if (itemData) {
          item.emitter.emit('setData', itemData.data)
        }
      }
    })
  }
}

//动画
const handleRunAnimation = () => {
  traverse(datavisEditor.value.getObjects(), (item: any) => {
    item.emitter.emit('animation')
  })
}

// 设置图纸数据
const exposeSetDesign = (data: any) => {
  handleSetScreenData(data)
}
// 设置数据
const exposeSetData = (data: any) => {
  signalData.value = data
  setSignalData()
}

// 清除数据
const exposeReset = () => {
  handleReset()
}

defineExpose({
  handleRunAnimation,
  exposeSetDesign,
  exposeSetData,
  exposeReset
})

// 重新设置渲染模式
const onWindowResize = () => {
  datavisEditor.value.setRenderMode({ mode: state.config.renderMode, isScale: false })
}

// 挂载
onMounted(() => {
  initEditor()
  handleEventlisteners()
  window.addEventListener('resize', onWindowResize)
})
onBeforeUnmount(() => {
  destoryEditor()
  window.removeEventListener('resize', onWindowResize)
})
</script>