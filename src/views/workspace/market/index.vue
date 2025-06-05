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
                <span>新增模板</span>
              </button>
              <button class="ui-workspace-button info" @click="handleUploadList">
                <visui-icon name="ele-upload"></visui-icon>
                <span>上传模板</span>
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
                    <el-button type="primary" @click="handleCommandList('view', item)">预览</el-button>
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
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useDatavisApi, traverse } from '../hooks/useDatavisApi'
import { ElMessageBox } from 'element-plus'

import folderList from '../com/FolderList.vue'
import folderEdit from '../com/FolderEdit.vue'

import resouceList from '../com/ResouceList.vue'
import resourceEdit from '../com/ResourceEdit.vue'
import resourceUpload from '../com/ResourceUpload.vue'

const apiHook = useDatavisApi()

const state = reactive({
  config: {
    title: '素材广场',
    type: '600',
    fileType: 'application/json', //文件类型
    folder: 'datavis/market/' //文件路径
  },
  classActive: null as any,
  classRow: null as any,
  classData: [],
  query: {
    name: ''
  },
  loading: false,
  listData: []
})

const router = useRouter()

// 根据parent_id获取文件夹
const getFolders = async ({ parent_id, type, name }: any) => {
  const params = { parent_id, type, sortBy: 'sort', sortOrder: 'desc', name }
  const [err, res] = await apiHook.getWholeTree(params)
  const data = err ? [] : res || []
  return data
}

// 分类
const initGetClassData = async () => {
  const folders = await getFolders({ type: state.config.type })
  state.classData = folders
  let findObj: any = folders[0]
  traverse(folders, 'folders', (e: any) => {
    if (e.id === state.classActive) {
      findObj = e
    }
  })
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

const getMaxClassSort = () => {
  let sort = 0
  const recursion = (arr: any[]) => {
    arr = arr || []
    arr.forEach(item => {
      sort = Math.max(sort, item.sort)
      recursion(item.folders)
    })
  }
  recursion(state.classData)
  return sort + 1
}

const getMaxListSort = () => Math.max(...state.listData.map((item: any) => item.sort), 0) + 1

const handleModifyClass = (type: any, row?: any) => {
  let title = '新建分类'
  let form = {
    id: '',
    name: '',
    type: state.config.type,
    parent_id: state.classActive || '',
    sort: getMaxClassSort()
  }
  if (type === 'edit') {
    title = '编辑分类'
    form = Object.assign(form, row)
  }
  const data = {
    title,
    form,
    depth: 2,
    classData: state.classData
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

// 列表
const handleQuery = () => {
  initGetListData()
}

const initGetListData = async () => {
  state.listData = []
  const params = { parent_id: state.classActive, sortBy: 'sort', sortOrder: 'desc', name: state.query.name }
  const [err, res] = await apiHook.getResource(params)
  state.listData = err ? [] : res || []
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
      screenType: 'market'
    }
  })
}
const handleDesignView = (row: any) => {
  // 预览
  const { href } = router.resolve({
    path: `/view/${row.id}`
  })
  window.open(href)
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
const handleModifyList = (type: string, row?: any) => {
  let title = '新增模板'
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
    title = '编辑模板'
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
    title: '上传模板',
    form,
    folder: state.config.folder + state.classRow?.url,
    fileType: state.config.fileType
  }
  resourceUploadRef.value.handleOpenDialog(data)
}
const handleFinishUpload = () => {
  initGetListData()
}
onMounted(() => {
  initGetClassData()
})
</script>
