<template>
  <div :class="rwClassName" :style="rwStyle">
    <CanvasRuler
      :vertical="vertical"
      :scale="scale"
      :width="width"
      :height="height"
      :start="start"
      :selectStart="selectStart"
      :selectLength="selectLength"
      :canvasConfigs="canvasConfigs"
      @onAddLine="handleNewLine"
      @onIndicatorShow="handleIndicatorShow"
      @onIndicatorMove="handleIndicatorMove"
      @onIndicatorHide="handleIndicatorHide"
    />
    <div class="lines" v-show="isShowReferLine">
      <LineRuler
        v-for="(v, i) in lines"
        :key="`${v}-${i}`"
        :index="i"
        :value="v || 0"
        :scale="scale"
        :start="start"
        :thick="thick"
        :palette="palette"
        :vertical="vertical"
        :isShowReferLine="isShowReferLine"
        @onRemove="handleLineRemove"
        @onMouseDown="handleLineDown"
        @onRelease="handleLineRelease"
      />
    </div>
    <div class="indicator" :style="indicatorStyle" v-show="showIndicator">
      <div class="value">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import LineRuler from './line.vue'
import CanvasRuler from './canvasRuler.vue'

const props = defineProps({
  vertical: Boolean,
  scale: Number,
  width: Number,
  thick: Number,
  height: Number,
  start: Number,
  lines: Array,
  selectStart: Number,
  selectLength: Number,
  canvasConfigs: Object,
  palette: Object,
  isShowReferLine: Boolean,
  onShowRightMenu: Function,
  handleShowReferLine: Function
})

const emit = defineEmits(['onLineChange'])

const isDraggingLine = ref(false)
const showIndicator = ref(false)
const value = ref(0)

const rwClassName = computed(() => (props.vertical ? 'v-container' : 'h-container'))

const rwStyle = computed(() => {
  const hContainer = {
    width: `calc(100% - ${props.thick}px)`,
    height: `${props.thick + 1}px`,
    left: `${props.thick}px`
  }
  const vContainer = {
    width: `${props.thick + 1}px`,
    height: `calc(100% - ${props.thick}px)`,
    top: `${props.thick}px`
  }
  return props.vertical ? vContainer : hContainer
})

const indicatorStyle = computed(() => {
  const indicatorOffset = (value.value - props.start) * props.scale
  const positionKey = props.vertical ? 'top' : 'left'
  const borderKey = props.vertical ? 'borderBottom' : 'borderLeft'

  return {
    [positionKey]: `${indicatorOffset}px`,
    [borderKey]: `1px solid ${props.palette.lineColor}`
  }
})

const handleNewLine = (newValue: number) => {
  props.lines.push(newValue)
  emit('onLineChange', props.lines, props.vertical)
}

const handleIndicatorShow = (newValue: number) => {
  if (!isDraggingLine.value) {
    showIndicator.value = true
    value.value = newValue
  }
}

const handleIndicatorMove = (newValue: number) => {
  if (showIndicator.value) {
    value.value = newValue
  }
}

const handleIndicatorHide = () => {
  showIndicator.value = false
}

const handleLineDown = () => {
  isDraggingLine.value = true
}

const handleLineRelease = (lineValue: number, index: number) => {
  isDraggingLine.value = false
  const offset = lineValue - props.start
  const maxOffset = (props.vertical ? props.height : props.width) / props.scale

  if (offset < 0 || offset > maxOffset) {
    handleLineRemove(index)
  } else {
    props.lines[index] = lineValue
    emit('onLineChange', props.lines, props.vertical)
  }
}

const handleLineRemove = (index: number) => {
  props.lines.splice(index, 1)
  emit('onLineChange', props.lines, props.vertical)
}
</script>

<style lang="scss" scoped>
.line {
  position: absolute;
}
.h-container,
.v-container {
  position: absolute;
  .lines {
    pointer-events: none;
  }
  &:hover .lines {
    pointer-events: auto;
  }
}
.h-container {
  top: 0;
  .line {
    height: 100vh;
    top: 0;
    padding-left: 5px;
    .action {
      transform: translateX(-24px);
      .value {
        margin-left: 4px;
      }
    }
  }
  .indicator {
    top: 0;
    height: 100vw;
    .value {
      padding: 0 2px;
      width: auto;
      margin-left: 4px;
      margin-top: 4px;
    }
  }
}

.v-container {
  left: 0;
  .line {
    width: 100vw;
    left: 0;
    padding-top: 5px;
    .action {
      transform: translateY(-24px);
      flex-direction: column;
      .value {
        margin-top: 4px;
      }
    }
  }
  .indicator {
    width: 100vw;
    .value {
      padding: 0 2px;
      width: auto;
      left: 0px;
      margin-left: 2px;
      margin-top: -5px;
      transform-origin: 0 0;
      transform: rotate(-90deg);
    }
  }
}
</style>
