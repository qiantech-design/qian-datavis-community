<template>
  <div class="ui-workspace-router-layout">
    <div class="ui-workspace-router-layout__body">
      <div class="ui-workspace-router-layout__container">
        <div class="ui-workspace-card">
          <div class="ui-workspace-card-header">
            <div class="action">
              <button class="ui-workspace-button" @click="handleCommandList('add')">
                <visui-icon name="ele-plus"></visui-icon>
                <span>新增配色</span>
              </button>
            </div>
          </div>
          <div class="ui-workspace-card-content">
            <el-table :data="state.listData" height="100%" style="width: 100%">
              <el-table-column prop="name" label="配色名称" width="180" />
              <el-table-column prop="list" label="颜色预览" min-width="200">
                <template #default="scope">
                  <span
                    v-for="(item, index) in scope.row.colorList"
                    :key="index"
                    style="display: inline-block; margin-left: 10px"
                    :style="{ width: '15px', height: '15px', background: item.color }"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="handleCommandList('edit', scope.row)">编辑</el-button>
                  <el-button link type="primary" size="small" @click="handleCommandList('delete', scope.row)"> 删除 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 颜色 -->
    <ThemeEdit ref="ThemeEditRef" @finish="handleFinishList"></ThemeEdit>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue'
import { useDatavisApi } from '../hooks/useDatavisApi'
import { ElMessageBox } from 'element-plus'
import ThemeEdit from '../com/ThemeEdit.vue'

const apiHook = useDatavisApi()
const state = reactive({
  config: {
    title: 'theme',
    type: '340',
    desc: '主题-json'
  },
  loading: false,
  listData: []
})

// 根据parent_id获取文件夹列表和文件列表
const getFolders = async ({ parent_id, type }: any) => {
  const params = { parent_id, type, sortBy: 'sort', sortOrder: 'desc' }
  const [err, res] = await apiHook.getFolders(params)
  const data = err ? { files: [], folders: [] } : res
  return data
}

const initGetListData = async () => {
  const params = {
    parent_id: '',
    type: state.config.type
  }
  state.loading = true
  const res = await getFolders(params)
  const listdata = res.resource
  state.loading = false
  if (listdata.length) {
    listdata.forEach(item => {
      item.colorList = []
      if (item.content) {
        item.colorList = JSON.parse(item.content)
      }
    })
  }
  state.listData = listdata
}
const handleCommandList = (type: string, row?: any) => {
  switch (type) {
    case 'add':
      handleModifyList('add')
      break
    case 'edit':
      handleModifyList('edit', row)
      break
    case 'delete':
      handleDeleteList(row)
      break
  }
}

const popupEl = inject('popupEl') as any
const handleDeleteList = (row: any) => {
  ElMessageBox.confirm('是否删除该数据', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    appendTo: popupEl
  })
    .then(async () => {
      const data = {
        idList: [row.id]
      }
      const [err, res] = await apiHook.deleteResource(data)
      if (err) return
      initGetListData()
    })
    .catch(() => {})
}

// 颜色
const ThemeEditRef = ref<any>()
const handleModifyList = (type: string, row?: any) => {
  let title = '新建配色方案'
  let form = {
    id: '',
    name: '',
    parent_id: '',
    content: '',
    type: state.config.type,
    colorList: [
      { color: '#41A9F4' },
      { color: '#53D09E' },
      { color: '#DEC362' },
      { color: '#C0E9FF' },
      { color: '#37CEFF' },
      { color: '#FCAB90' },
      { color: '#E37D4A' }
    ]
  }
  if (type === 'edit') {
    title = '编辑配色方案'
    form = Object.assign({}, row)
  }
  ThemeEditRef.value.handleOpen({
    title,
    form
  })
}
const handleFinishList = () => {
  initGetListData()
}

onMounted(() => {
  initGetListData()
})
</script>
