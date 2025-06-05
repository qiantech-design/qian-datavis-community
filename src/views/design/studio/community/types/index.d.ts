import type { PropType } from 'vue'
/**
 * monaco默认配置
 */
export declare interface MonacoConfig {
  language: string // 语言 javascript/css/json/html
  automaticLayout: boolean // 自动布局
  theme: string // 主题 vs-dark
  readOnly: boolean // 是否只读
}
export declare type PropType<T> = PropType<T>

/**
 * 编辑器状态类
 */
export declare interface EditorState {
  canUndo: boolean // 是否可以撤销
  canRedo: boolean // 是否可以重做
  selectedCount: number // 选中元素个数
  activeObject: any // 激活元素
  isGroup: boolean // 是否是组合
  isActiveSelection: boolean // 是否是activeSelection
  index?: number // 在父级中的索引
  sameLevelCount?: number // 同级元素个数
}

/**
 * 组件类
 */
interface ChartOption {
  xAxis: XAxis
  yAxis: YAxis
  series: Series[]
}

interface Series {
  data: number[]
  type: string
}

interface YAxis {
  type: string
}

interface XAxis {
  type: string
  data: string[]
}

interface Component {
  name: string
  title: string
}
export declare interface ComObject {
  id: string
  parentId: string
  name: string
  type: string
  data: any[]
  component: Component
  stateIndex: number
  states: any[]
  x: number
  y: number
  w: number
  h: number
  angle: number
  locked: boolean
  visible: boolean
  isGroup?: boolean
  chartOption: ChartOption
  objects: ComObject[]
}

export declare interface AddObjectEventData {
  action: string
  name: string
  title: string
  image?: string
  cover?: boolean
}

/**
 * 标尺配置类
 */
export declare interface RulerConfig {
  scale: number
  startX: number
  startY: number
  lines: {
    h: any[]
    v: any[]
  }
  shadow: any
  width: number
  height: number
  thick: number
  ratio: number
  isShowRuler: boolean
  isShowReferLine: boolean
  palette: any
}