<template>
  <el-form label-width="90px" label-position="left" v-if="requestConfig">
    <visui-group style="padding-top: 14px">
      <visui-item label="变量">
        <visui-input v-model="realNode.signal" placeholder="请输入或选择变量" @change="writeBackAttrs(['signal'], realNode, true)">
          <template #suffix>
            <visui-icon name="vis-fuzhi1" @click="handleCopy(realNode.signal)"></visui-icon>
          </template>
        </visui-input>
        <div style="margin-left: 10px">
          <datavis-signal-bar readonly @finish="handleFinishSignal"></datavis-signal-bar>
        </div>
      </visui-item>
      <visui-item label="类型">
        <visui-select v-model="requestConfig.type" @change="handleRequestChange">
          <visui-option v-for="item in typeList" :label="item.label" :value="item.value"></visui-option>
        </visui-select>
      </visui-item>
      <template v-if="requestConfig.type === 'api'">
        <visui-item label="URL地址">
          <el-input type="textarea" :rows="2" v-model="requestConfig.url" @change="handleUrlChange" />
        </visui-item>
        <visui-item label="请求方法">
          <el-select v-model="requestConfig.method" placeholder="请选择" @change="handleRequestChange">
            <el-option v-for="item in methodOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </visui-item>
        <visui-item label="刷新时间">
          <visui-input-number v-model="requestConfig.internal" suffix="秒" @input="handleRequestChange"></visui-input-number>
        </visui-item>
        <visui-item label="请求头">
          <el-button type="primary" @click="openCodeDialog('header')">编辑函数</el-button>
        </visui-item>
        <visui-item label="请求参数">
          <el-button type="primary" @click="openCodeDialog('params')">编辑函数</el-button>
        </visui-item>
        <visui-item label="数据处理">
          <el-button type="primary" @click="openCodeDialog('dataFilter')">编辑函数</el-button>
        </visui-item>
      </template>
      <!-- 静态数据编辑 -->
      <data-map
        :chartDataFieldMap="realNode.chartDataFieldMap"
        :dataFieldMap="realNode.dataFieldMap"
        :column="realNode.column"
        @refresh="handleDataFieldChange"
      ></data-map>
      <data-code
        v-if="requestConfig.type === 'static'"
        :chartDataFieldMap="realNode.chartDataFieldMap"
        :dataFieldMap="realNode.dataFieldMap"
        :column="realNode.column"
        v-model="realNode.data"
        @refresh="confirmData"
        @open="openCodeDialog('data', $event)"
      ></data-code>

      <!-- 代码编辑器 -->
      <visui-code-dialog :modal="false" draggable ref="codeDialogRef" @finish="handleFinishCodeDialog"></visui-code-dialog>
      <!-- 表格静态数据编辑器 -->
      <table-data-dialog draggable ref="tableDataDialogRef" @finish="handleFinishTableDataDialog"> </table-data-dialog>
    </visui-group>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
// @ts-ignore
import { cloneDeep, debounce, pick } from 'lodash-es'
import dataCode from './component/dataCode.vue'
import dataMap from './component/dataMap.vue'
import useClipboard from 'vue-clipboard3'
import useEditor from '../../hooks/useEditor'
import { eventTypes, operationTypes } from '../../utils'
defineOptions({ name: 'datavisDataBar' })
const { toClipboard } = useClipboard()
const { writeBackAttrs } = useEditor()
const props = defineProps({
  originNode: {
    type: Object as any,
    default: () => {
      return {}
    }
  },
  realNode: {
    type: Object as any,
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits(['command'])
const codeMap: any = {
  header: `const executeScript = (node) => {
  // 返回Object {}
  // 例: {Authorization: '123456789'}
  return {}
}`,
  params: `const executeScript = (node) => {
  // 返回Object {}
  // 例: {areaId: '123456'}
  return {}
}`,
  dataFilter: `const executeScript = (data, node) => {
  // data: axios请求返回的原始数据
  const handledData = data.data ? data.data : []
  // 将处理完毕的数据返回
  return handledData
}`,
  sqlDataFormat: `function(data, $refs){
  // data 请求返回数据
  // 返回 Object {}
  return {}
}`,
  commonDataFormat: `function(data){
  // 返回 Object {}
  return {}
}`,
  customDataFunc: `function($refs, context){
  // 请求
  globalAxios({
    method: 'get',
    url: 'https://www.baidu.com',
    headers: {},
    params: {}
  }).then(res => {
    console.log('res', res)
  }).catch(err => {
    console.log('err', err)
  })
  // 返回 Object {}
  return {}
}`,
  formDataFormat: `function(data, aliasObj, $refs, context){
  // data 请求返回数据; aliasObj 内置封装数据,格式如下：↓
  // 返回 Object {} 格式： 组合 { '组件别名': { value: 'xxx' }}
  // 若为组合组件，组件别名为 父组件别名 + 子组件取值别名
  console.log(data, aliasObj)
  return {}
}`
}

const titleMap: any = {
  header: '请求头',
  params: '请求参数',
  dataFilter: '数据处理'
}

const requestConfig = computed(() => {
  return props.realNode.requests || ''
})
const typeList = [
  { value: 'static', label: '静态数据' },
  { value: 'api', label: 'API数据' }
]
const methodOptions = [
  {
    label: 'POST',
    value: 'POST'
  },
  {
    label: 'GET',
    value: 'GET'
  }
]

const codeType = ref('')
const codeDialogRef = ref()
const tableDataDialogRef = ref()

const handleDataFieldChange = () => {
  handleAttrsChange(['chartDataFieldMap', 'dataFieldMap', 'data'])
}

const confirmData = () => {
  handleAttrsChange(['data'])
}
const openCodeDialog = (type: string, dataType?: 'json' | 'table') => {
  codeType.value = type
  if (type === 'data') {
    const optionCode = cloneDeep(props.realNode.data) || []
    // 数据映射
    tableDataDialogRef.value.handleOpenDialog({
      code: optionCode,
      type: dataType
    })
  } else {
    const tempCode = requestConfig.value[type] || codeMap[type]
    codeDialogRef.value.handleOpenDialog({
      code: tempCode,
      title: titleMap[type]
    })
  }
}

const handleFinishCodeDialog = (e: any) => {
  try {
    requestConfig.value[codeType.value] = e
    codeDialogRef.value.handleCloseDialog()
    handleRequestChange()
    // 重新发起请求
    props.originNode.emit('request')
  } catch (err: any) {
    ElMessage.error(err.message)
  }
}

// 修静态改数据
const handleFinishTableDataDialog = (val: any) => {
  props.realNode.data = val
  handleAttrsChange(['data'])
}
/**
 * 获取getActiveSelection
 * @param editor
 */
const getActiveSelection = (editor: any) => {
  const activeObj = editor.getActiveObject()
  const activeSelection = activeObj && activeObj.type === 'activeSelection' ? activeObj.getPosition() : null
  return activeSelection
}

const handleAttrsChange = (keyList: any[]) => {
  keyList.push('id')
  const { editor } = props.originNode
  const objs = editor.getActiveObjects()
  const fromData: any = []
  const toData: any = []
  const toObj = pick(props.realNode, keyList)
  const activeSelection = getActiveSelection(editor)
  objs.forEach((item: any) => {
    const parent = item.group || editor
    const parentId = item.group ? item.group.id : null
    const index = parent.objects.findIndex((a: any) => a.id === item.id)
    const fromObj = cloneDeep(pick(item, keyList))
    fromData.push({
      data: fromObj,
      index,
      parentId
    })
    toData.push({
      data: cloneDeep(toObj),
      index,
      parentId
    })
  })
  const param = {
    to: {
      activeSelection,
      data: toData
    },
    from: {
      activeSelection,
      data: fromData
    }
  }
  editor.fire(eventTypes.coreOperation, { action: operationTypes.attribute, param })
}

const handleFinishSignal = (value: string) => {
  props.realNode.signal = value
  writeBackAttrs(['signal'], props.realNode, true)
}

// 复制标识
const handleCopy = async (text: any) => {
  toClipboard(text).then(() => {
    ElMessage.success('复制成功')
  })
}

const handleUrlChange = () => {
  if (!requestConfig.value.dataFilter) {
    requestConfig.value.dataFilter = codeMap.dataFilter
  }
  handleRequestChange()
}

// 处理属性变化，支持撤销重做
const handleRequestChange = () => {
  writeBackAttrs(['requests'], props.realNode, true)
  // request配置发生变更，重新发起请求
  props.originNode.emit('request')
}
</script>
