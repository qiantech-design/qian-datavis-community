<template>
  <div class="datavis-editor-signal">
    <div class="datavis-editor-signal-icon" @click="handleOpen">
      <el-tooltip popper-class="datavis-editor-text-tip" effect="dark" content="数据变量" placement="top">
        <visui-icon name="vis-variable" :size="15"></visui-icon>
      </el-tooltip>
    </div>
    <el-dialog
      modal-append-to-body
      title="数据变量"
      v-model="state.visible"
      top="10vh"
      width="480px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="datavis-editor-signal-dialog">
        <div class="datavis-editor-signal-dialog-action">
          <el-button size="small" type="primary" @click="handleOpenImport">导入数据</el-button>
          <el-button size="small" type="primary" @click="handleOpenExport">导出数据</el-button>
        </div>
        <div class="datavis-editor-signal-dialog-content">
          <signalList :activeValue="state.activeValue" :readonly="readonly" :data="state.tableData" :columns="state.columns" @command="handleCommand">
          </signalList>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">关 闭</el-button>
          <el-button @click="handleSubmit" v-if="readonly">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import signalList from './component/signalList.vue'
import { handleImport, handleExport } from './file'

import { eventTypes, pageOperationTypes } from '../../utils/index'

import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()

const componentName = 'datavisSignalBar'
defineOptions({
  name: componentName
})

defineProps({
  readonly: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['finish'])

const state = reactive({
  visible: false,
  activeValue: '',
  columns: [
    {
      prop: 'name',
      label: '名称'
    },
    {
      prop: 'value',
      label: '变量值'
    }
  ],
  tableData: [] as any
})

const handleOpen = () => {
  state.visible = true
  // 打开弹窗的时候，通过fire事件，editor那边会接收到事件，将数据通过回调函数的方式返回给调用方
  editor.fire(eventTypes.pageOperation, {
    type: pageOperationTypes.signalInit,
    data: {
      callback: (signals: any) => {
        handleSignalInit(signals)
      }
    },
    source: componentName
  })
}
const handleClose = async () => {
  state.visible = false
}

// 导入文件
const handleOpenImport = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '*.xlsx, *.json'
  input.onchange = (event: any) => {
    const files = event.target.files
    handleImportFile(files)
  }
  input.click()
}

// 处理导入文件
const handleImportFile = async (files: any) => {
  // 获取文件类型
  const file = files[0]
  const fileType = file.name.split('.').pop()
  const type = fileType === 'xlsx' ? 'xlsx' : 'json'
  const res = await handleImport({
    file: file,
    columns: state.columns,
    options: {
      type: type
    }
  })
  state.tableData = res
  handleChange()
}

// 导出文件
const handleOpenExport = () => {
  const data = state.tableData
  // json
  handleExport({
    columns: state.columns,
    options: {
      type: 'xlsx',
      fileName: 'datavissignal'
    },
    content: {
      description: 'datavis变量数据导入模板',
      info: {
        version: '1.0.0',
        create: '2024年05月06日'
      },
      data: data
    }
  })
}

const handleCommand = ({ command, value }: any) => {
  switch (command) {
    case 'add':
      handleAdd()
      break
    case 'sub':
      handleSub(value)
      break
    case 'select':
      handleSelect(value)
      break
    case 'selectAndClose':
      handleSelect(value)
      handleClose()
      break
    case 'change':
      handleChange()
      break
  }
}

const handleAdd = () => {
  state.tableData.push({
    name: '变量名称',
    value: 'value'
  })
  handleChange()
}

const handleSub = (index: number) => {
  state.tableData.splice(index, 1)
  handleChange()
}
// 选择变量值
const handleSelect = (row: any) => {
  state.activeValue = row.value
  emit('finish', row.value)
}
const handleChange = () => {
  // 往editor传递数据
  editor.fire(eventTypes.pageOperation, {
    type: pageOperationTypes.signalUpdated,
    data: state.tableData,
    source: componentName
  })
}

const handleSubmit = () => {
  handleClose()
}

const handleSignalInit = (signals: any) => {
  state.tableData = signals || []
}
</script>
