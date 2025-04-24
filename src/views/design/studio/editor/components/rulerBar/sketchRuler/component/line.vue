<template>
  <div class="line" v-show="showLine" :style="[offset, borderCursor]" @mousedown="handleDown">
    <div class="action" :style="actionStyle">
      <span class="del" @click="handleRemove">&times;</span>
      <span class="value">{{ startValue }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  index: Number,
  start: Number,
  vertical: Boolean,
  scale: Number,
  value: Number,
  palette: Object,
  isShowReferLine: Boolean,
  thick: Number
})

const emit = defineEmits(['onMouseDown', 'onRelease', 'onRemove'])

const startValue = ref(0)
const showLine = ref(true)

const offset = computed(() => {
  const calculatedOffset = (startValue.value - props.start) * props.scale
  showLine.value = calculatedOffset >= 0
  const positionValue = `${calculatedOffset}px`
  return props.vertical ? { top: positionValue } : { left: positionValue }
})

const borderCursor = computed(() => {
  const borderValue = `1px solid ${props.palette.lineColor}`
  const border = props.vertical ? { borderTop: borderValue } : { borderLeft: borderValue }
  const cursorValue = props.isShowReferLine ? (props.vertical ? 'ns-resize' : 'ew-resize') : 'none'
  return {
    cursor: cursorValue,
    ...border
  }
})

const actionStyle = computed(() => {
  return props.vertical ? { left: `${props.thick}px` } : { top: `${props.thick}px` }
})

const handleDown = (e: MouseEvent) => {
  const startD = props.vertical ? e.clientY : e.clientX
  const initValue = startValue.value
  emit('onMouseDown')

  const onMove = (e: MouseEvent) => {
    const currentD = props.vertical ? e.clientY : e.clientX
    const newValue = Math.round(initValue + (currentD - startD) / props.scale)
    startValue.value = newValue
  }

  const onEnd = () => {
    emit('onRelease', startValue.value, props.index)
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onEnd)
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onEnd)
}

const handleRemove = () => {
  emit('onRemove', props.index)
}

const initStartValue = () => {
  startValue.value = props.value
}

onMounted(() => {
  initStartValue()
})
</script>

<style lang="scss" scoped>
.line {
  position: absolute;
  .action {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .value {
    pointer-events: none;
    transform: scale(0.83);
  }
  .del {
    cursor: pointer;
    padding: 3px 5px;
    visibility: hidden;
  }
  &:hover .del {
    visibility: visible;
  }
}
.h-container {
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
}

.v-container {
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
}
</style>
