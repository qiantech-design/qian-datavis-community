<template>
  <div class="datavis-config-bar">
    <div class="datavis-config-bar-content" @click="handleOpen">
      <el-tooltip popper-class="datavis-editor-text-tip" effect="dark" content="系统设置" placement="top">
        <visui-icon name="ele-setting" :size="15"></visui-icon>
      </el-tooltip>
    </div>
    <el-dialog modal-append-to-body title="系统设置" v-model="state.visible" top="33vh" width="420px"
      :close-on-click-modal="false" :before-close="handleClose">
      <div>
        <visui-item label="框选模式">
          <visui-radio-group v-model="state.config.selectionMode">
            <visui-radio label="intersection">交集选中</visui-radio>
            <visui-radio label="complete">完全选中</visui-radio>
          </visui-radio-group>
        </visui-item>
        <div class="split-line"></div>
        <!-- <visui-item label="允许触发组件原生事件">
          <visui-switch v-model="state.config.triggerFlag" />
        </visui-item> -->

        <visui-item label="开启对齐吸附">
          <visui-switch v-model="state.config.sorption.enabled" />
        </visui-item>
        <visui-item label="吸附距离" v-if="state.config.sorption.enabled">
          <visui-input-number :min="1" v-model="state.config.sorption.offset" />
        </visui-item>
        <div class="split-line"></div>

        <visui-item label="图形配置">
          <el-radio-group v-model="state.config.drawKey">
            <el-radio-button v-for="item in state.config.drawList" v-bind="item" />
          </el-radio-group>
        </visui-item>
        <template v-if="['bezierCurve', 'polyline', 'line'].includes(state.config.drawKey)">
          <visui-item label="描边颜色">
            <visui-select-color v-model="computeObj.stroke"></visui-select-color>
          </visui-item>
          <visui-item label="描边大小">
            <visui-input-number :min="1" v-model="computeObj.strokeWidth" suffix="px" />
          </visui-item>
        </template>
        <template v-else-if="state.config.drawKey === 'rect'">
          <visui-item label="边框颜色">
            <visui-select-color v-model="computeObj.stroke"></visui-select-color>
          </visui-item>
          <visui-item label="边框大小">
            <visui-input-number :min="1" v-model="computeObj.strokeWidth" suffix="px" />
          </visui-item>
          <visui-item label="背景颜色">
            <visui-select-color v-model="computeObj.fill"></visui-select-color>
          </visui-item>
        </template>
        <template v-else-if="state.config.drawKey === 'text'">
          <visui-item label="文本颜色">
            <visui-select-color v-model="computeObj.color"></visui-select-color>
          </visui-item>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import * as localforage from 'localforage'
import { editorConfigKey } from '../../utils/index'
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()

defineOptions({
  name: 'datavisConfigBar'
})

const state = reactive({
  visible: false,
  config: {
    drawKey: 'bezierCurve',
    drawList: [
      { label: '钢笔工具', value: 'bezierCurve', config: { fill: 'rgba(0,0,0,0)', stroke: '#ffffff', strokeWidth: 2 } },
      { label: '文本', value: 'text', config: { color: '#ffffff' } },
      { label: '矩形', value: 'rect', config: { fill: '#ffffff', stroke: 'rgba(0,0,0,0)', strokeWidth: 2 } },
      { label: '直线', value: 'line', config: { fill: 'rgba(0,0,0,0)', stroke: '#ffffff', strokeWidth: 2 } },
      { label: '折线', value: 'polyline', config: { fill: 'rgba(0,0,0,0)', stroke: '#ffffff', strokeWidth: 2 } }
    ],
    // 吸附配置
    sorption: {
      enabled: true,
      offset: 1
    },
    drawConfig: {
      fill: '#ffffff',
      stroke: 'rgba(0,0,0,0)',
      strokeWidth: 2
    },
    // 完全选择 complete
    // 交集选择 intersection
    selectionMode: 'intersection',
    // 是否触发组件原生事件
    triggerFlag: false
  }
})

const computeObj = computed(() => {
  const obj = state.config.drawList.find(item => item.value === state.config.drawKey)
  const config = obj?.config || ({} as any)
  return config
})

const handleOpen = () => {
  state.visible = true
}
const handleClose = async () => {
  state.visible = false
  const content = JSON.stringify(state.config)
  await localforage.setItem(editorConfigKey, content)
  Object.assign(editor.config, state.config)
}

const initGetData = async () => {
  const content: any = await localforage.getItem(editorConfigKey)
  if (content) {
    const obj = JSON.parse(content)
    if (obj.drawKey) {
      state.config = obj
    }
  }
  Object.assign(editor.config, state.config)
}

onMounted(() => {
  initGetData()
})
</script>