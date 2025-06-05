<template>
  <foreignObject
    class="editor-component-item"
    v-bind="wrapperAttrs"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
  >
    <div class="widget-iframe">
      <iframe :style="useContentSize" :src="mapData.link" draggable="false"></iframe>
    </div>
  </foreignObject>
</template>
<script lang="ts" setup>
//@ts-nocheck
import { onMounted, onBeforeUnmount, computed, CSSProperties } from 'vue'
import { events, getRequestConfig, useEvents, useData } from '../../datavis'
const name = 'customWidgetIframe'
const title = 'Iframe页面'
defineOptions({
  name,
  defaultValue: {
    events,
    requests: getRequestConfig(),
    component: { name, title },
    dataFieldMap: [
      {
        fieldName: 'link',
        fieldAlias: '',
        fieldDesc: '链接',
        dataType: 'string'
      }
    ],
    data: [
      {
        link: 'https://www.yuque.com/'
      }
    ],
    // 域名跟随系统
    useSystemOrigin: false,
    states: [
      {
        style: {
          backgroundColor: 'rgba(0,0,0,0)',
          fontSize: 14,
          color: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }
    ],
    w: 400,
    h: 200
  }
})

type Props = {
  node: ComObject & { on: Function; off: Function }
  otherData?: any
}
const props = withDefaults(defineProps<Props>(), {})
const { getMappedData } = useData()
const mapData = computed({
  get: () => {
    const params = {
      fieldMap: props.node.dataFieldMap,
      data: props.node.data,
      otherData: props.otherData
    }
    return getMappedData(params)
  },
  set: val => {
    if (Array.isArray(val)) {
      props.node.data = val
    } else {
      if (val) {
        if (props.node.data?.length) {
          Object.assign(props.node.data[0], val)
        } else {
          props.node.data = [val]
        }
      }
    }
  }
})

// 事件
const { handleEvent, handleRequest, handleState, wrapperAttrs } = useEvents(props.node)

const handleSetData = (e: any) => {
  mapData.value = e
}

// 样式
const useContentSize = computed<CSSProperties>(attr => {
  return {
    width: `${props.node.w}px`,
    height: `${props.node.h}px`,
    border: 'none'
  }
})

// 挂载
onMounted(() => {
  props.node.on({
    setData: handleSetData,
    request: handleRequest,
    state: handleState
  })
  handleEvent('mounted', '')
})
onBeforeUnmount(() => {
  props.node.off({
    setData: handleSetData,
    request: handleRequest,
    state: handleState
  })
})
</script>
