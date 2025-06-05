<template>
  <el-dialog
    v-bind="attrs"
    modal-append-to-body
    v-model="visible"
    destroy-on-close
    :close-on-click-modal="false"
    title="数据编辑"
    width="80%"
    class="datavis-table-data-dialog"
  >
    <el-tabs v-model="state.type" :before-leave="handleTabBeforeLeave">
      <el-tab-pane v-for="item in editTabs" :label="item.label" :name="item.value"></el-tab-pane>
    </el-tabs>
    <table-excel :tableData="tableData" :columns="datasetField" v-show="state.type === 'table'" />
    <visui-code-editor ref="codeEditorRef" style="height: 400px" v-show="state.type === 'json'" :code="code" :config="codeConfig">
    </visui-code-editor>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCloseDialog">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, useAttrs } from 'vue'
import { funEval } from '../../utils'
import { ElMessage } from 'element-plus'
defineOptions({
  name: 'tableDataDialog'
})
const attrs = useAttrs()

const visible = ref(false)

type Props = {
  code: any
  type: string
}
const state = reactive<Props>({
  code: '',
  type: 'json'
})
const emit = defineEmits(['finish'])

const editTabs = [
  {
    label: '表格',
    value: 'table'
  },
  {
    label: 'JSON',
    value: 'json'
  }
]
const codeConfig = {
  language: 'javascript', // 语言 javascript/css/json/html
  automaticLayout: true, // 自动布局
  theme: 'vs-dark', // 主题 vs-dark
  readOnly: false // 是否只读
}
const code = ref('')
const datasetField = ref<any>([])

// 将表格数据转为json数据，去除无效数据
const handleTableDataToJsonData = (data: any[]) => {
  let lastDataIndex = 0
  data.forEach((item: any, index: number) => {
    const hasSome = Object.values(item).some(a => !!a)
    if (hasSome) {
      lastDataIndex = index
    }
  })
  return data.slice(0, lastDataIndex + 1)
}

// json数据转为表格数据，不足20行则补全空数据
const handleJsonDataToTableData = (arr: any) => {
  const toAddRowsCout = 20 - arr.length
  const firstObj = arr[0] || {}
  const defaultObj = Object.keys(firstObj).reduce((pre: any, cur: any) => {
    pre[cur] = ''
    return pre
  }, {})
  for (let i = 0; i < toAddRowsCout; i++) {
    arr.push({ ...defaultObj })
  }
  return arr
}
const handleTabBeforeLeave = (e: any) => {
  if (e === 'json') {
    const arr = handleTableDataToJsonData(tableData.value)
    code.value = JSON.stringify(arr, null, 2)
  } else {
    const value = codeEditorRef.value.getValue()
    try {
      const arr = JSON.parse(value)
      tableData.value = handleJsonDataToTableData(arr)
    } catch (err) {
      ElMessage.error('JSON格式不正确')
      return false
    }
  }
  return true
}

// 初始化数据表头
const initDataSetHeader = () => {
  // debugger
  const firstObj = state.code[0] || {}
  const fieldsObjList: any[] = Object.keys(firstObj).map((key: any) => {
    return {
      prop: key,
      label: key
    }
  })
  // 回显映射的数据类型
  datasetField.value = handleFields(fieldsObjList)
  let tempData: any = state.code
  if (tempData.length < 20) {
    const toAddRowsCout = 20 - tempData.length
    const firstObj = tempData[0] || {}
    const defaultObj = Object.keys(firstObj).reduce((pre: any, cur: any) => {
      pre[cur] = ''
      return pre
    }, {})
    for (let i = 0; i < toAddRowsCout; i++) {
      tempData.push({ ...defaultObj })
    }
  }
  tableData.value = tempData
}

const handleFields = (fields: any[]): any[] => {
  if (fields.length < 8) {
    // 不足8列，则补全8列，根据最后一列的字段名，生成新的列头名称，例如：type1, type2...type8
    const toAddRowsCout = 8 - fields.length
    const lastItem = fields[fields.length - 1] || {}
    const lastProp = lastItem.prop || 'type1'
    const reg = lastProp.match(/\d+$/)
    const num = reg ? Number(reg[0]) : 1
    const prefix = lastProp.replace(/\d+$/, '')
    for (let i = 0; i < toAddRowsCout; i++) {
      const headerKey = `${prefix}${num + i + 1}`
      fields.push({
        prop: headerKey,
        label: headerKey
      })
    }
  }
  return fields
}
const tableData = ref<any>([])
// 提交静态数据
const codeEditorRef = ref()
const handleConfirm = () => {
  code.value = codeEditorRef.value.getValue()
  if (state.type === 'table') {
    let lastDataIndex = 0 // 最后一个有数据的行索引，空行是要舍弃掉的
    let lastColumnIndex = 0 // 最后一列有数据的索引

    tableData.value.forEach((item: any, index: number) => {
      Object.keys(item).forEach((key: any) => {
        if (item[key] !== null && item[key] !== undefined && item[key] !== '') {
          lastColumnIndex = Math.max(
            datasetField.value.findIndex((a: any) => a.prop === key),
            lastColumnIndex
          )
          lastDataIndex = index
        }
      })
    })
    const keyList: any = datasetField.value.slice(0, lastColumnIndex + 1).map((a: any) => a.prop) // 字段列表
    const newDataList = tableData.value.slice(0, lastDataIndex + 1).map((item: any) => {
      let obj: any = {}
      keyList.forEach((key: any) => {
        obj[key] = item[key] || ''
      })
      return obj
    })
    console.log(1,newDataList)
    emit('finish', newDataList)
    handleCloseDialog()
  } else {
    let value = code.value
    if (value) {
      try {
        value = funEval(value)
        emit('finish', value)
        handleCloseDialog()
      } catch (error) {
        console.log(error)
        ElMessage.error('数据格式有误')
      }
    } else {
      emit('finish', '')
      handleCloseDialog()
    }
  }
}

const handleOpenDialog = (data: any) => {
  Object.assign(state, data) // 合并数据
  if (typeof state.code !== 'string') {
    code.value = JSON.stringify(state.code, null, 2)
  } else {
    code.value = state.code
  }
  visible.value = true
  initDataSetHeader()
}

const handleCloseDialog = () => {
  visible.value = false
}

defineExpose({
  handleOpenDialog,
  handleCloseDialog
})
</script>
