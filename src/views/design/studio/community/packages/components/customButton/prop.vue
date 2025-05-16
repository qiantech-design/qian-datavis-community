<template>
  <div>
    <visui-collapse-item title="按钮设置" v-model:expand="settingExpand" :showSwitch="false">
      <visui-item label="按钮文本">
        <el-input v-model="editText" placeholder="文本" @input="handleConfigPreview" @change="handleConfigChange" />
      </visui-item>
    </visui-collapse-item>
    <visui-collapse-item :title="node.id ? '状态设置' : '样式设置'" v-model:expand="stateSettingExpand" :showSwitch="false">
      <visui-item label="当前状态" v-if="node.id">
        <visui-select v-model="node.stateIndex" placeholder="请选择当前状态" @change="handleAttrsChange(['stateIndex'], node, true)">
          <visui-option v-for="(item, index) in node.states" :key="`state_${index + 1}`" :label="item.name || `状态${index + 1}`" :value="index" />
        </visui-select>
        <visui-tooltip content="新增状态" placement="top">
          <div class="vis-icon-round-wrap" style="margin-left: 6px" @click="handleAddState(node, stateNameDialogRef)">
            <visui-icon name="vis-tianjia"></visui-icon>
          </div>
        </visui-tooltip>
        <visui-tooltip content="编辑状态名称" placement="top">
          <div class="vis-icon-round-wrap" style="margin-left: 6px" @click="handleEditState(node, stateNameDialogRef)">
            <visui-icon name="vis-bianji"></visui-icon>
          </div>
        </visui-tooltip>
        <visui-tooltip content="删除当前状态" placement="top">
          <div class="vis-icon-round-wrap" style="margin-left: 6px" @click="handleRemoveState(node)">
            <visui-icon name="vis-shanchu1" class="danger-color"></visui-icon>
          </div>
        </visui-tooltip>
      </visui-item>
      <visui-item label="字号">
        <visui-input-number suffix="px" v-model="state.style.fontSize" @change="handleConfigChange" />
      </visui-item>
      <visui-item label="边框宽度">
        <visui-input-number suffix="px" v-model="state.style.borderWidth" @change="handleConfigChange" />
      </visui-item>
      <visui-item label="边框类型">
        <visui-select v-model="state.style.borderStyle" placeholder="请选择边框类型" @change="handleConfigChange">
          <visui-option v-for="item in borderTypes" :key="item.value" :label="item.label" :value="item.value" />
        </visui-select>
      </visui-item>
      <visui-item label="圆角">
        <visui-input-number suffix="px" v-model="state.style.borderRadius" @change="handleConfigChange" />
      </visui-item>
      <visui-item label="文本颜色">
        <visui-select-color
          v-model="state.style.color"
          @input="handleConfigPreview"
          @change="handleConfigChange"
          @recover="handleConfigRecover"
        ></visui-select-color>
      </visui-item>
      <visui-item label="边框颜色">
        <visui-select-color
          v-model="state.style.borderColor"
          @input="handleConfigPreview"
          @change="handleConfigChange"
          @recover="handleConfigRecover"
        ></visui-select-color>
      </visui-item>
      <visui-item label="背景颜色">
        <visui-select-color
          v-model="state.style.backgroundColor"
          @input="handleConfigPreview"
          @change="handleConfigChange"
          @recover="handleConfigRecover"
        ></visui-select-color>
      </visui-item>
      <visui-item label="水平对齐">
        <visui-tab-radio v-model="state.style.justifyContent" :list="textAlignOptions" @change="handleConfigChange"></visui-tab-radio>
      </visui-item>
      <visui-item label="垂直对齐">
        <visui-tab-radio v-model="state.style.alignItems" :list="verticalOptions" @change="handleConfigChange"></visui-tab-radio>
      </visui-item>
    </visui-collapse-item>
    <visui-state-name-dialog
      ref="stateNameDialogRef"
      @finish="handleFinishStateNameDialog($event, node, stateNameDialogRef)"
    ></visui-state-name-dialog>
  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
import { ref, computed } from 'vue'
import { handleAttrsChange, handleAttrsRecover, handleAddState, handleEditState, handleRemoveState, handleFinishStateNameDialog } from '../../datavis'
defineOptions({
  name: 'customWidgetButtonProp'
})
const props = defineProps({
  node: {
    type: Object,
    default: () => {
      return {
        stateIndex: 0,
        states: []
      }
    }
  }
})

const settingExpand = ref(true)
const stateSettingExpand = ref(true)

const stateNameDialogRef = ref()

const state: any = computed(() => props.node.states[props.node.stateIndex])

const editText = computed({
  get: () => {
    if (props.node.data?.length) {
      return props.node.data[0].text || ''
    } else {
      return ''
    }
  },
  set: (val: string) => {
    props.node.data = [
      {
        text: val
      }
    ]
  }
})

const borderTypes = ref([
  { value: 'solid', label: '实线' },
  { value: 'dashed', label: '虚线' }
])

const textAlignOptions = [
  { label: '左对齐', value: 'flex-start', type: 'icon', icon: 'vis-zuo' },
  { label: '居中', value: 'center', type: 'icon', icon: 'vis-zhong' },
  { label: '右对齐', value: 'flex-end', type: 'icon', icon: 'vis-you' }
]
const verticalOptions = [
  { label: '顶对齐', value: 'flex-start', type: 'icon', icon: 'vis-dingduiqi' },
  { label: '水平对齐', value: 'center', type: 'icon', icon: 'vis-shuipingduiqi1' },
  { label: '底对齐', value: 'flex-end', type: 'icon', icon: 'vis-dibuduiqi1' }
]

const handleConfigChange = () => {
  handleAttrsChange(['data', 'stateIndex', 'states'], props.node, true)
}
const handleConfigPreview = () => {
  handleAttrsChange(['data', 'stateIndex', 'states'], props.node, false)
}
const handleConfigRecover = () => {
  handleAttrsRecover(['data', 'stateIndex', 'states'], props.node)
}
</script>
