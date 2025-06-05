<template>
  <foreignObject
    class="editor-component-item"
    v-bind="wrapperAttrs"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
  >
    <img v-bind="state" class="full-width full-height widget-image" :style="styleImgName" :src="mapData.src" v-if="mapData.src" />
    <div class="full-width full-height" v-else :style="state.style"></div>
  </foreignObject>
</template>

<script lang="ts" setup>
//@ts-nocheck
import { computed, onMounted, onBeforeUnmount, CSSProperties } from 'vue'
import { events, getRequestConfig, useEvents, handleCssStyle } from '../../datavis'
const name = 'customWidgetImage'
const title = '图片'
defineOptions({
  name,
  defaultValue: {
    events,
    requests: getRequestConfig(),
    component: { name, title },
    opacity: 1,
    rotate: false,
    duration: 3,
    reverse: false,
    skewAngle: 'rotating',
    filter: {
      enable: false,
      hueRotate: {
        enable: false,
        value: 0
      },
      contrast: {
        enable: false,
        value: 100
      },
      saturate: {
        enable: false,
        value: 100
      },
      brightness: {
        enable: false,
        value: 100
      },
      grayscale: {
        enable: false,
        value: 0
      }
    },
    dataFieldMap: [
      {
        fieldName: 'src',
        fieldAlias: '',
        fieldDesc: '文本',
        dataType: 'string'
      }
    ],
    data: [],
    states: [
      {
        src: '/resource/componentConfig/source1.jpeg',
        style: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderStyle: 'solid',
          borderColor: '#999',
          objectFit: 'fill'
        },
        name: '默认状态'
      }
    ],
    w: 200,
    h: 200
  }
})

type Props = {
  node: ComObject & { on: Function; off: Function }
  otherData?: any
}
const props = withDefaults(defineProps<Props>(), {})
const mapData = computed({
  get: () => {
    return state.value
  },
  set: val => {
    state.value.src = val?.src || ''
  }
})
// 组件升级，字段补录
if (!props.node.filter) {
  props.node.filter = {
    enable: false,
    hueRotate: {
      enable: false,
      value: 0
    },
    contrast: {
      enable: false,
      value: 100
    },
    saturate: {
      enable: false,
      value: 100
    },
    brightness: {
      enable: false,
      value: 100
    },
    grayscale: {
      enable: false,
      value: 0
    }
  }
}

const styleImgName = computed<CSSProperties>(() => {
  const { reverse, skewAngle, duration, rotate, opacity, filter } = props.node
  const styleObject: CSSProperties = {
    opacity
  }
  if (rotate) {
    styleObject.animationDuration = `${duration}s`
    styleObject.animationName = `${skewAngle}`
    styleObject.animationDirection = reverse ? 'reverse' : 'normal'
  }
  if (filter && filter.enable) {
    let filterStr = ''
    const { hueRotate, contrast, saturate, brightness, grayscale } = filter
    if (hueRotate.enable) filterStr += ` hue-rotate(${hueRotate.value}deg)`
    if (contrast.enable) filterStr += ` contrast(${contrast.value}%)`
    if (saturate.enable) filterStr += ` saturate(${saturate.value}%)`
    if (brightness.enable) filterStr += ` brightness(${brightness.value}%)`
    if (grayscale.enable) filterStr += ` grayscale(${grayscale.value}%)`
    styleObject.filter = filterStr
  }
  return styleObject
})

// 事件
const { handleEvent, handleRequest, handleState, wrapperAttrs } = useEvents(props.node)

const state: any = computed(() => {
  const state = props.node.states[props.node.stateIndex]

  return {
    ...state,
    style: handleCssStyle(state)
  }
})

const handleSetData = (e: Array<any>) => {
  mapData.value = e
  const mapObj = props.node.dataFieldMap[0]
  const mapKey = mapObj.fieldAlias || mapObj.fieldName
  e.forEach((item, index) => {
    if (props.node.states[index]) {
      props.node.states[index].src = item[mapKey] || ''
    }
  })
}

onMounted(() => {
  props.node.on({
    setData: handleSetData,
    request: handleRequest,
    state: handleState
  })
  handleEvent('mounted', '')
})
onBeforeUnmount(() => {
  props.node.on({
    setData: handleSetData,
    request: handleRequest,
    state: handleState
  })
})
</script>
