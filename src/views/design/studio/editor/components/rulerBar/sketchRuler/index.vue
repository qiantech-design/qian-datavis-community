<template>
  <div class="style-ruler mb-ruler" id="mb-ruler">
    <!-- 水平方向 -->
    <RulerWrapper
      :vertical="false"
      :width="width"
      :height="thick"
      :isShowReferLine="isShowReferLine"
      :thick="thick"
      :start="startX"
      :lines="horLineArr"
      :selectStart="shadow.x"
      :selectLength="shadow.width"
      :scale="scale"
      :palette="palette"
      :canvasConfigs="canvasConfigs"
      @onLineChange="handleLineChange"
    />
    <!-- 竖直方向 -->
    <RulerWrapper
      :vertical="true"
      :width="thick"
      :height="height"
      :isShowReferLine="isShowReferLine"
      :thick="thick"
      :start="startY"
      :lines="verLineArr"
      :selectStart="shadow.y"
      :selectLength="shadow.height"
      :scale="scale"
      :palette="palette"
      :canvasConfigs="canvasConfigs"
      @onLineChange="handleLineChange"
    />
    <a class="corner" :class="cornerActiveClass" :style="cornerStyle" @click="onCornerClick"></a>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits } from 'vue'
import RulerWrapper from './component/rulerWrapper.vue'

// 定义 props
const props = defineProps({
  scale: {
    type: Number,
    default: 1
  },
  ratio: {
    type: Number,
    default: window.devicePixelRatio || 1
  },
  thick: {
    type: Number,
    default: 16
  },
  width: Number,
  height: Number,
  startX: {
    type: Number,
    default: 0
  },
  startY: {
    type: Number,
    default: 0
  },
  shadow: {
    type: Object,
    default: () => ({
      x: 200,
      y: 100,
      width: 200,
      height: 400
    })
  },
  horLineArr: {
    type: Array,
    default: () => [100, 200]
  },
  verLineArr: {
    type: Array,
    default: () => [100, 200]
  },
  cornerActive: Boolean,
  lang: String,
  isOpenMenuFeature: false,
  handleShowRuler: {
    type: Function,
    default: () => () => {}
  },
  isShowReferLine: {
    type: Boolean,
    default: true
  },
  handleShowReferLine: {
    type: Function,
    default: () => () => {}
  },
  palette: {
    type: Object,
    default: () => ({
      bgColor: 'rgba(225,225,225, 0)',
      longfgColor: '#BABBBC',
      shortfgColor: '#C8CDD0',
      fontColor: '#7D8694',
      shadowColor: '#E8E8E8',
      lineColor: '#EB5648',
      borderColor: '#DADADC',
      cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
      menu: {
        bgColor: '#fff',
        dividerColor: '#DBDBDB',
        listItem: {
          textColor: '#415058',
          hoverTextColor: '#298DF8',
          disabledTextColor: 'rgba(65, 80, 88, 0.4)',
          bgColor: '#fff',
          hoverBgColor: '#F2F2F2'
        }
      }
    })
  }
})

// 定义 emits
const emit = defineEmits(['onCornerClick', 'handleLine'])

// 计算属性
const cornerActiveClass = computed(() => (props.cornerActive ? ' active' : ''))

const cornerStyle = computed(() => ({
  backgroundColor: props.palette.bgColor,
  width: `${props.thick}px`,
  height: `${props.thick}px`,
  borderRight: `1px solid ${props.palette.borderColor}`,
  borderBottom: `1px solid ${props.palette.borderColor}`
}))

const canvasConfigs = computed(() => {
  const { bgColor, longfgColor, shortfgColor, fontColor, shadowColor, lineColor, borderColor, cornerActiveColor } = props.palette
  return {
    ratio: props.ratio,
    bgColor,
    longfgColor,
    shortfgColor,
    fontColor,
    shadowColor,
    lineColor,
    borderColor,
    cornerActiveColor
  }
})

// 方法
const onCornerClick = (e: MouseEvent) => {
  emit('onCornerClick', e)
}

const handleLineChange = (arr: number[], vertical: boolean) => {
  const newLines = vertical ? { h: props.horLineArr, v: [...arr] } : { h: [...arr], v: props.verLineArr }
  emit('handleLine', newLines)
}
</script>
