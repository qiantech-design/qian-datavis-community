<template>
  <div class="content">
    <visui-item label="数据形式" v-if="chartDataFieldMap || dataFieldMap || column">
      <visui-radio-group row v-model="editType">
        <visui-radio :label="item.value" v-for="item in dataEditTypeOptions">{{ item.label }}</visui-radio>
      </visui-radio-group>
    </visui-item>
    <div class="data_flex_button">
      <el-button type="primary" @click="handleOpen" :icon="Edit">编辑数据</el-button>
    </div>
    <div class="static-data-box">
      <table-excel
        v-if="(chartDataFieldMap || dataFieldMap || column) && showTable"
        :inputDisable="true"
        :tableData="tableData"
        :columns="datasetField"
      />
      <visui-code-editor style="height: 460px" v-else :code="code" :config="codeConfig"></visui-code-editor>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { funEval } from '../../../utils/index'
defineOptions({ name: 'dataCode' })

const currentValue = defineModel<string | [] | {}>({
  default: ''
})
type Props = {
  dataFieldMap?: any
  chartDataFieldMap?: any
  column?: any
}

const props = defineProps<Props>()
const emit = defineEmits(['refresh', 'open'])

const code = ref('')
const codeConfig = {
  language: 'javascript', // 语言 javascript/css/json/html
  automaticLayout: true, // 自动布局
  theme: 'vs-dark', // 主题 vs-dark
  readOnly: true // 是否只读
}
const datasetField = ref([])
const editType = ref('table')
const dataEditTypeOptions = ref([
  { label: '表格', value: 'table' },
  { label: 'JSON', value: 'json' }
])

const tableData = computed(() => {
  let tempData = []
  if (props.chartDataFieldMap) {
    tempData = currentValue.value
  } else {
    if (dataType.value === 'Array') {
      tempData = currentValue.value.length ? currentValue.value : []
    } else {
      tempData = [currentValue.value]
    }
  }
  if (tempData.length < 20) {
    const defaultList = Array(20 - tempData.length)
      .fill(1)
      .map((v, index) => {
        return {
          _default: true
        }
      })
    tempData = tempData.concat(defaultList)
  }
  return tempData
})
const dataType = computed(() => {
  if (Array.isArray(currentValue.value)) return 'Array'
  else return 'Object'
})
const showTable = computed(() => {
  return editType.value === 'table'
})

watch(
  () => currentValue.value,
  val => {
    if (typeof val !== 'string') {
      code.value = JSON.stringify(val, null, 2)
    } else {
      code.value = ''
    }
    if (props.chartDataFieldMap || props.dataFieldMap || props.column) {
      nextTick(() => {
        initDataSetHeader(val)
      })
    }
  },
  {
    immediate: true,
    deep: true
  }
)

// 初始化数据表头
const initDataSetHeader = val => {
  let tempDatasetField: any[] = []
  const fieldsObjList: any[] = []
  if (props.chartDataFieldMap) {
    if (val?.length > 0) {
      tempDatasetField = Object.keys(val[0])
    } else {
      tempDatasetField = []
    }
  } else if (props.dataFieldMap) {
    if (val) {
      if (dataType.value === 'Array') {
        tempDatasetField = val.length ? Object.keys(val[0]) : []
      } else {
        tempDatasetField = Object.keys(val)
      }
    } else {
      tempDatasetField = []
    }
  } else if (props.column?.length && Array.isArray(currentValue.value) && currentValue.value.length) {
    tempDatasetField = Object.keys(currentValue.value[0])
  }
  if (tempDatasetField.length) {
    tempDatasetField.forEach(item => {
      fieldsObjList.push({
        prop: item,
        label: item
      })
    })
  }
  datasetField.value = setMinFields(fieldsObjList)
}

// 设置最少列
const setMinFields = (fields: any[]): any[] => {
  if (fields.length < 3) {
    const headerKey = `type${fields.length + 1}`
    fields.push({
      prop: headerKey,
      label: headerKey
    })
    return setMinFields(fields)
  }
  return fields
}
const handleRefresh = () => {
  let value = code.value
  try {
    value = funEval(value)
    emit('refresh', value)
  } catch (error) {
    console.log(error)
    ElMessage.error('数据格式有误')
  }
}
const handleOpen = () => {
  emit('open', editType.value)
}
</script>

<style lang="scss" scoped>
.data_flex_button {
  padding: 0 8px;
}
.static-data-box {
  padding: 10px 10px 20px;
}
</style>
