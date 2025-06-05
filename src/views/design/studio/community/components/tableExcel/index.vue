<template>
  <div class="datavis-editor-data-table">
    <el-table
      ref="dataTableRef"
      class="data-edit-table"
      :data="tableData"
      max-height="460"
      :header-cell-class-name="getHeaderCellClassName"
      @header-click="handleHeaderClick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
    >
      <el-table-column width="50">
        <template #default="scope">
          <div class="table-index">
            <span>
              {{ scope.$index + 1 }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="(tHeader, indexT) in columns" :key="indexT" :prop="tHeader.prop" :label="tHeader.prop" min-width="50">
        <template #header="scope">
          <div :data-column-index="indexT">
            <el-input
              v-show="isActiveCell(-1, indexT)"
              ref="contentInputRef"
              v-model="columns[indexT].label"
              :disabled="inputDisable"
              :data-column-index="indexT"
              @blur="handleHeaderBlur(columns[indexT], columns[indexT].label)"
              size="small"
              placeholder=""
            />
            <span v-show="!isActiveCell(-1, indexT)">{{ columns[indexT].label }}</span>
          </div>
        </template>
        <template #default="scope">
          <el-input
            :disabled="inputDisable"
            :class="{ current: isActiveCell(scope.$index, indexT) }"
            :type="tHeader.dataType === 'number' ? 'number' : 'text'"
            :data-row-index="scope.$index"
            :data-column-index="indexT"
            v-model="scope.row[tHeader.prop]"
            placeholder=""
          >
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="!inputDisable" class="datavis-editor-data-table-footer">
      <span>在底部添加</span>
      <el-input-number v-model="toAddRowsCout" controls-position="right"></el-input-number>
      <span>行</span>
      <el-button type="primary" size="small" @click="handleAddData">添加</el-button>
    </div>
    <TableContextmenu ref="editContextRef" @command="handleContextmenuCommand" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'tableExcel'
})
import { ref, watch, onMounted, nextTick } from 'vue'
import TableContextmenu from './contextmenu.vue'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
const props = defineProps({
  inputDisable: {
    // 是否禁用编辑功能
    type: Boolean,
    default: false
  },
  tableData: {
    type: Array as any,
    default: () => []
  },
  columns: {
    type: Array as any,
    default: () => []
  }
})

const editRowIndex = ref(-1)
const editColIndex = ref(-1)
const addColumnIndex = ref(0)
const toAddRowsCout = ref(10)

const dataTableRef = ref()
watch(
  () => props.columns,
  () => {
    dataTableRef.value.doLayout()
  }
)
onMounted(() => {
  addColumnIndex.value = props.columns.length
})

// 头部列修改后将原来的删除并添加新key
const handleHeaderBlur = (column: any, label: any) => {
  props.tableData.forEach((item: any) => {
    item[label] = item[column.prop]
    delete item[column.prop]
  })
  column.prop = label
}

const isActiveCell = (rowIndex: number, columnIndex: number) => {
  return editRowIndex.value === rowIndex && editColIndex.value === columnIndex
}
const getHeaderCellClassName = ({ row, column, rowIndex, columnIndex }: any) => {
  if (isActiveCell(-1, columnIndex)) return 'data-edit-table-header'
  else return 'data-show-table-header'
}
const handleAddRow = (index: number) => {
  const newRow: any = {}
  props.columns.forEach((item: any) => {
    newRow[item.prop] = ''
  })
  if (index) {
    props.tableData.splice(index, 0, newRow)
  } else {
    props.tableData.push(newRow)
  }
}
const handleAddColumn = (index: number) => {
  const newKey = {
    prop: `type${addColumnIndex.value}`,
    label: `type${addColumnIndex.value}`
  }
  const findKey = props.columns.find((v: any) => v.prop == newKey.prop)
  addColumnIndex.value++
  if (findKey) {
    handleAddColumn(index)
    return
  }
  if (index) {
    props.columns.splice(index, 0, newKey)
  } else {
    props.columns.push(newKey)
  }
}
const deleteRow = (index: number) => {
  if (props.tableData.length < 2) return ElMessage.warning('至少保留1行数据')
  props.tableData.splice(index, 1)
}
const deleteColumn = (index: number) => {
  if (props.columns.length < 2) return ElMessage.warning('至少保留1列')
  props.columns.splice(index, 1)
}

const contentInputRef = ref()
// 表头点击
const handleHeaderClick = (column: any, event: Event) => {
  if (props.inputDisable) return event.preventDefault()
  editRowIndex.value = -1
  const columnIndex = +column.rawColumnKey
  editColIndex.value = columnIndex
  nextTick(() => {
    if (contentInputRef.value[columnIndex]) {
      contentInputRef.value[columnIndex].focus()
    }
  })
}

const editContextRef = ref()
const handleRowContextmenu = (row: any, column: any, event: any) => {
  if (props.inputDisable) return event.preventDefault()
  const rowIndex = props.tableData.indexOf(row)
  const columnIndex = +column.rawColumnKey
  editRowIndex.value = rowIndex
  editColIndex.value = columnIndex
  event.preventDefault()
  const left = event.clientX
  const top = event.clientY
  editContextRef.value.open(left, top)
}

// 单元格点击
const handleRowClick = (row: any, column: any, event: any) => {
  const rowIndex = +event.target.dataset.rowIndex
  const columnIndex = +column.rawColumnKey
  editRowIndex.value = rowIndex
  editColIndex.value = columnIndex
}
const handleContextmenuCommand = (type: string, value: string) => {
  switch (type) {
    case 'addRow':
      handleMenuAddRow(value)
      break
    case 'deleteRow':
      deleteRow(editRowIndex.value)
      break
    case 'addColumn':
      handleMenuAddColumn(value)
      break
    case 'deleteColumn':
      deleteColumn(editColIndex.value)
      break
  }
}
const handleMenuAddRow = (type: string) => {
  switch (type) {
    case 'preview':
      handleAddRow(editRowIndex.value)
      break
    case 'next':
      handleAddRow(editRowIndex.value + 1)
      break
  }
}
const handleMenuAddColumn = (type: string) => {
  switch (type) {
    case 'preview':
      handleAddColumn(editColIndex.value)
      break
    case 'next':
      handleAddColumn(editColIndex.value + 1)
      break
  }
}

const handleAddData = () => {
  const defaultObj = props.columns.reduce((pre: any, cur: any) => {
    pre[cur.prop] = ''
    return pre
  }, {})
  const toAddList: any = []
  for (let i = 0; i < toAddRowsCout.value; i++) {
    toAddList.push(cloneDeep(defaultObj))
  }
  props.tableData.push(...toAddList)
}
</script>
