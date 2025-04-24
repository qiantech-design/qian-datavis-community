<template>
  <div class="datavis-event-bar" v-if="realNode && realNode.events">
    <visui-collapse-item title="事件总开关" v-model="realNode.events.enable" @change="mainEnableChange">
      <visui-collapse-item
        :title="item.keyName"
        v-model="item.value.enable"
        :key="item.key"
        v-for="item in computedEventList"
        @change="handleCollapseChange($event, item.value)"
      >
        <event-config
          :node="realNode"
          v-model:config="item.value.config"
          @codeDialogOpen="handleOpenCodeDialog"
          @change="handleConfigChange"
        ></event-config>
      </visui-collapse-item>
    </visui-collapse-item>
    <visui-code-dialog ref="codeDialogRef" @finish="handleFinishDialog"></visui-code-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import eventConfig from './eventConfig.vue'
import { defaultEventConfig, getDefaultEvent } from './event'
// @ts-ignore
import { cloneDeep, set } from 'lodash-es'
import useEditor from '../../hooks/useEditor'
const { writeBackAttrs } = useEditor()
defineOptions({ name: 'datavisEventBar' })

const props = defineProps(['originNode', 'realNode'])

const state = reactive({
  codeDialogConfig: { config: {}, path: '' }
})
const codeDialogRef = ref()

const computedEventList = computed(() => {
  const events = props.realNode.events || {}
  const eventNameMap: any = {
    mounted: '组件挂载',
    click: '点击',
    dblclick: '双击',
    mouseenter: '鼠标移入',
    mouseleave: '鼠标移出'
  }
  const keyList = Object.keys(eventNameMap)
  const data = Object.keys(events)
    .filter(key => keyList.includes(key))
    .map(key => {
      return {
        key,
        keyName: eventNameMap[key],
        value: events[key]
      }
    })
  return data
})

const handleOpenCodeDialog = (codeDialogConfig: any, data: any) => {
  state.codeDialogConfig = codeDialogConfig
  codeDialogRef.value.handleOpenDialog(data)
}
const handleFinishDialog = (code: string) => {
  const { config, path } = state.codeDialogConfig
  set(config, path, code)
  codeDialogRef.value.handleCloseDialog()
  handleConfigChange()
}

const handleConfigChange = () => {
  writeBackAttrs(['events'], props.realNode, true)
}

const handleCollapseChange = (e: boolean, target: any) => {
  if (e && (!target.config || !Object.keys(target.config).length)) {
    target.config = cloneDeep(defaultEventConfig)
  }
  handleConfigChange()
}

const mainEnableChange = (e: boolean) => {
  if (e && Object.keys(props.realNode.events).length === 1) {
    Object.assign(props.realNode.events, getDefaultEvent())
  }
  handleConfigChange()
}
</script>
