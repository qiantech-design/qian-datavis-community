<template>
  <canvas class="ruler" ref="canvasRef" @click="handleClick" @mouseenter="handleEnter" @mousemove="handleMove" @mouseleave="handleLeave" />
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, defineEmits } from 'vue'
import { drawHorizontalRuler, drawVerticalRuler } from './utils'

const getValueByOffset = (offset: number, start: number, scale: number) => Math.round(start + offset / scale)

// 定义 props
const props = defineProps({
  vertical: Boolean,
  start: Number,
  scale: Number,
  width: Number,
  height: Number,
  canvasConfigs: Object,
  selectStart: Number,
  selectLength: Number
})

// 定义 emits
const emit = defineEmits(['onAddLine', 'onIndicatorShow', 'onIndicatorMove', 'onIndicatorHide'])

// 定义 refs
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasContext = ref<CanvasRenderingContext2D | null>(null)

// 初始化 canvas 和上下文
const initCanvasRef = () => {
  const canvas = canvasRef.value
  if (canvas) {
    canvasContext.value = canvas.getContext('2d')
  }
}

// 更新 canvas 上下文
const updateCanvasContext = () => {
  const { ratio } = props.canvasConfigs

  if (canvasRef.value) {
    canvasRef.value.width = props.width * ratio
    canvasRef.value.height = props.height * ratio

    const ctx = canvasContext.value
    if (ctx) {
      ctx.font = `${12 * ratio}px -apple-system,
            "Helvetica Neue", ".SFNSText-Regular",
            "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
            "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
      ctx.lineWidth = 1
      ctx.textBaseline = 'middle'
    }
  }
}

// 绘制标尺
const drawRuler = () => {
  const options = {
    scale: props.scale,
    width: props.width,
    height: props.height,
    canvasConfigs: props.canvasConfigs
  }

  if (props.vertical) {
    drawVerticalRuler(canvasContext.value, props.start, { y: props.selectStart, height: props.selectLength }, options)
  } else {
    drawHorizontalRuler(canvasContext.value, props.start, { x: props.selectStart, width: props.selectLength }, options)
  }
}

// 处理点击事件
const handleClick = (e: MouseEvent) => {
  const offset = props.vertical ? e.offsetY : e.offsetX
  const value = getValueByOffset(offset, props.start, props.scale)
  emit('onAddLine', value)
}

// 处理鼠标进入事件
const handleEnter = (e: MouseEvent) => {
  const offset = props.vertical ? e.offsetY : e.offsetX
  const value = getValueByOffset(offset, props.start, props.scale)
  emit('onIndicatorShow', value)
}

// 处理鼠标移动事件
const handleMove = (e: MouseEvent) => {
  const offset = props.vertical ? e.offsetY : e.offsetX
  const value = getValueByOffset(offset, props.start, props.scale)
  emit('onIndicatorMove', value)
}

// 处理鼠标离开事件
const handleLeave = () => {
  emit('onIndicatorHide')
}

// 监视 props 的变化
watch(() => props.start, drawRuler)
watch(
  () => props.width,
  () => {
    updateCanvasContext()
    drawRuler()
  }
)
watch(
  () => props.height,
  () => {
    updateCanvasContext()
    drawRuler()
  }
)

// 组件挂载时初始化 canvas
onMounted(() => {
  initCanvasRef()
  updateCanvasContext()
  drawRuler()
})
</script>
