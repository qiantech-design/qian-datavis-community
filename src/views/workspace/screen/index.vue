<template>
  <div class="ui-workspace-router-layout">
    <div class="ui-workspace-router-layout__body">
      <div class="ui-workspace-router-layout__aside">
        <folderList addText="新增分类" :activeKey="state.classActive" :data="state.classData" @command="handleCommandClass"> </folderList>
      </div>
      <div class="ui-workspace-router-layout__container">
        <div class="ui-workspace-card">
          <div class="ui-workspace-card-header">
            <div class="action">
              <button class="ui-workspace-button" @click="handleModifyList('add')">
                <visui-icon name="ele-plus"></visui-icon>
                <span>新增大屏</span>
              </button>
              <button class="ui-workspace-button" @click="handleOpenMarket">
                <visui-icon name="ele-shop"></visui-icon>
                <span>模板市场</span>
              </button>
              <button class="ui-workspace-button info" @click="handleUploadList">
                <visui-icon name="ele-upload"></visui-icon>
                <span>上传大屏</span>
              </button>
            </div>
            <div class="search">
              <el-input v-model="state.query.name" clearable placeholder="关键词" @clear="handleQuery" @input="handleQuery" />
            </div>
          </div>
          <div class="ui-workspace-card-content">
            <el-scrollbar>
              <resouceList :data="state.listData">
                <template #action="{ item }">
                  <div>
                    <el-button type="primary" @click="handleCommandList('view', item)">查看</el-button>
                    <el-button type="primary" @click="handleCommandList('design', item)">设计</el-button>
                  </div>
                  <div class="more">
                    <el-button round type="primary" @click="handleCommandList('edit', item)">
                      <visui-icon name="ele-edit"></visui-icon>
                    </el-button>
                    <el-button round type="danger" @click="handleCommandList('delete', item)">
                      <visui-icon name="ele-deleteFilled"></visui-icon>
                    </el-button>
                  </div>
                </template>
              </resouceList>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
    <!-- 分类 -->
    <folderEdit ref="folderEditRef" @finish="handleFinishClass"></folderEdit>
    <!-- 列表 -->
    <resourceEdit ref="resourceEditRef" @finish="handleFinishList"></resourceEdit>
    <!-- 上传 -->
    <resourceUpload ref="resourceUploadRef" @finish="handleFinishUpload"></resourceUpload>
    <!-- 模板市场 -->
    <createMarket ref="createMarketRef" @finish="handleFinishMarket"></createMarket>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useDatavisApi } from '../hooks/useDatavisApi'

import folderList from '../com/FolderList.vue'
import folderEdit from '../com/FolderEdit.vue'

import resouceList from '../com/ResouceList.vue'
import resourceEdit from '../com/ResourceEdit.vue'
import resourceUpload from '../com/ResourceUpload.vue'

import createMarket from '../com/CreateMarket.vue'

const apiHook = useDatavisApi()

const state = reactive({
  query: {
    name: ''
  },
  config: {
    title: '图纸',
    type: '100',
    fileType: 'application/json', //文件类型
    folder: 'datavis/screen/' //文件路径
  }, //配置映射
  classActive: null as any,
  classRow: null as any,
  classData: [],
  loading: false,
  listData: []
})

const router = useRouter()

// 根据parent_id获取文件夹列表和文件列表
const getFolders = async ({ parent_id, type, name }: any) => {
  const params = { parent_id, type, sortBy: 'sort', sortOrder: 'desc', name }
  const [err, res] = await apiHook.getFolders(params)
  const data = err ? { resource: [], folders: [] } : res
  return data
}

// 分类
const initGetClassData = async () => {
  const res = await getFolders({ type: state.config.type })
  const folders = res.folders
  const findObj = folders.find((item: any) => item.id === state.classActive) || folders[0]
  state.classData = folders
  if (findObj) {
    handleChangeClass(findObj)
  }
}

const handleChangeClass = (row: any) => {
  state.classActive = row.id
  state.classRow = row
  initGetListData()
}

const handleCommandClass = (type: string, row?: any) => {
  switch (type) {
    case 'change':
      handleChangeClass(row)
      break
    case 'add':
      handleModifyClass('add')
      break
    case 'edit':
      handleModifyClass('edit', row)
      break
    case 'delete':
      handleDeleteClass(row)
      break
  }
}
const folderEditRef = ref<any>()

const handleModifyClass = (type: any, row?: any) => {
  let title = '新建分类'
  let form = {
    id: '',
    name: '',
    type: state.config.type,
    parent_id: '',
    sort: Math.max(...state.classData.map((item: any) => item.sort), 0) + 1
  }
  if (type === 'edit') {
    title = '编辑分类'
    form = Object.assign(form, row)
  }
  const data = {
    title,
    form
  }
  folderEditRef.value.handleOpenDialog(data)
}
const handleFinishClass = () => {
  initGetClassData()
}

const popupEl = inject('popupEl') as any
const handleDeleteClass = (row: any) => {
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
      const [err, res] = await apiHook.deleteFolders(data)
      if (err) return
      initGetClassData()
    })
    .catch(() => {})
}

const handleQuery = () => {
  initGetListData()
}

// 列表
const initGetListData = async () => {
  state.listData = []
  const res = await getFolders({
    parent_id: state.classActive,
    name: state.query.name
  })
  state.listData = res.resource
}
const handleCommandList = (type: string, row?: any) => {
  switch (type) {
    case 'edit':
      handleModifyList('edit', row)
      break
    case 'design':
      handleDesignList(row)
      break
    case 'view':
      handleDesignView(row)
      break
    case 'delete':
      handleDeleteList(row)
      break
  }
}

const handleDesignList = (row: any) => {
  // 设计
  router.push({
    path: `/frame/${row.id}`,
    query: {
      screenType: 'screen'
    }
  })
}

const handleDesignView = (row: any) => {
  // 查看
  router.push({
    path: `/view/${row.id}`
  })
}

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

const resourceEditRef = ref<any>()
const getMaxListSort = () => Math.max(...state.listData.map((item: any) => item.sort), 0) + 1
const handleModifyList = (type: string, row?: any) => {
  let title = '新增大屏'
  let form = {
    id: '',
    name: '',
    url: '',
    thumbnail: '',
    parent_id: state.classActive,
    type: state.config.type,
    sort: getMaxListSort()
  }
  if (type === 'edit') {
    title = '编辑大屏'
    form = Object.assign(form, row)
  }
  const data = {
    title,
    form,
    folder: state.config.folder + state.classRow?.url
  }
  resourceEditRef.value.handleOpenDialog(data)
}
const handleFinishList = () => {
  initGetListData()
}

// 上传
const resourceUploadRef = ref<any>()
const handleUploadList = () => {
  let form = {
    id: '',
    name: '',
    url: '',
    thumbnail: '',
    parent_id: state.classActive,
    type: state.config.type,
    sort: getMaxListSort()
  }
  const data = {
    title: '上传图纸',
    form,
    folder: state.config.folder + state.classRow?.url,
    fileType: state.config.fileType
  }
  resourceUploadRef.value.handleOpenDialog(data)
}
const handleFinishUpload = () => {
  initGetListData()
}

// 模板市场
const createMarketRef = ref<any>()
const handleOpenMarket = () => {
  let form = {
    id: '',
    name: '',
    url: '',
    thumbnail: '',
    parent_id: state.classActive,
    type: state.config.type,
    sort: 0
  }
  const data = {
    title: '模板市场',
    form,
    folder: state.config.folder + state.classRow?.url
  }
  createMarketRef.value.handleOpenDialog(data)
}
const handleFinishMarket = () => {
  initGetListData()
}

onMounted(() => {
  initGetClassData()
})
</script>
