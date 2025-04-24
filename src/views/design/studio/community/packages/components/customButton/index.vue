<template>
  <foreignObject
    class="editor-component-item"
    v-bind="wrapperAttrs"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
  >
    <div class="widget-button">
      <textarea
        ref="refInput"
        style="width: 100%; height: 100%; position: absolute"
        v-model="mapData.text"
        @blur="handleBlur"
        v-if="node.editing"
      ></textarea>
      <span style="user-select: none" v-else>{{ mapData.text }}</span>
    </div>
  </foreignObject>
</template>
<script lang="ts" setup>
//@ts-nocheck
import { onMounted, onBeforeUnmount, ref, computed, nextTick } from 'vue'
import { events, getRequestConfig, useEvents, useData } from '../../datavis'
const name = 'customWidgetButton'
const title = '按钮'
defineOptions({
  name,
  defaultValue: {
    component: { name, title },
    dataFieldMap: [
      {
        fieldName: 'text',
        fieldAlias: '',
        fieldDesc: '文本',
        dataType: 'string'
      }
    ],
    data: [
      {
        text: '按钮'
      }
    ],
    states: [
      {
        style: {
          backgroundColor: '#5AADFF',
          fontSize: 14,
          color: '#FFFFFF',
          borderWidth: 1,
          borderRadius: 2,
          borderStyle: 'solid',
          borderColor: '#5AADFF',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }
    ],
    events,
    requests: getRequestConfig(),
    w: 100,
    h: 36
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
    props.node.data = val
  }
})

// 事件
const { handleEvent, handleRequest, handleState, wrapperAttrs } = useEvents(props.node)

const refInput = ref()

const handleBlur = () => {
  props.node.editing = false
}

const handleSetData = (e: Array<any>) => {
  mapData.value = e
}
const handleDblClick = () => {
  if (props.node.editing) {
    return
  }
  props.node.editing = true
  nextTick(() => {
    refInput.value.focus()
  })
}

onMounted(() => {
  props.node.on({
    setData: handleSetData,
    dblclick: handleDblClick,
    request: handleRequest,
    state: handleState
  })
  handleEvent('mounted', '')
})
onBeforeUnmount(() => {
  props.node.off({
    setData: handleSetData,
    dblclick: handleDblClick,
    request: handleRequest,
    state: handleState
  })
})
</script>
