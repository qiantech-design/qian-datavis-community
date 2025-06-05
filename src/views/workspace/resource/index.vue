<template>
  <div class="ui-workspace-router-layout">
    <div class="ui-workspace-router-layout__header">
      <el-tabs v-model="state.configActive" @tab-change="handleChangeType">
        <el-tab-pane :label="item.title" :name="item.key" v-for="(item, index) in state.typeOptions" :key="index"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="ui-workspace-router-layout__body">
      <div class="ui-workspace-router-layout__aside">
        <folderList :activeKey="state.classActive" :data="state.classData" @command="handleCommandClass"> </folderList>
      </div>
      <div class="ui-workspace-router-layout__container">
        <div class="ui-workspace-card">
          <div class="ui-workspace-card-header">
            <div class="action">
              <template v-if="state.configActive == 'image'">
                <button class="ui-workspace-button" @click="handleUploadImage">
                  <visui-icon name="ele-upload"></visui-icon>
                  <span>上传图片</span>
                </button>
                <template v-if="state.batchVisible">
                  <button class="ui-workspace-button info" @click="handleBatchDelete">
                    <visui-icon name="ele-upload"></visui-icon>
                    <span>批量删除</span>
                  </button>
                </template>
              </template>

              <button class="ui-workspace-button" v-if="state.configActive == 'video'" @click="handleUploadList">
                <visui-icon name="ele-upload"></visui-icon>
                <span>上传视频</span>
              </button>
              <button class="ui-workspace-button" v-if="state.configActive == 'map'" @click="handleCommandMap('add')">
                <visui-icon name="ele-upload"></visui-icon>
                <span>新增地图</span>
              </button>
            </div>
            <div class="search">
              <el-input v-model="state.query.name" clearable placeholder="关键词" @clear="handleQuery" @input="handleKeywordInput" />
            </div>
          </div>
          <div class="ui-workspace-card-content">
            <el-scrollbar>
              <template v-if="state.configActive === 'video'">
                <el-table :data="state.listData" height="100%" style="width: 100%">
                  <el-table-column prop="name" label="名称" min-width="180" />
                  <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default="scope">
                      <el-button link type="primary" size="small" @click="handleCommandMap('view', scope.row)">查看</el-button>
                      <el-button link type="primary" size="small" @click="handleDeleteList(scope.row)"> 删除 </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template v-if="state.configActive === 'map'">
                <el-table :data="state.listData" height="100%" style="width: 100%">
                  <el-table-column prop="name" label="名称" min-width="180" />
                  <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default="scope">
                      <el-button link type="primary" size="small" @click="handleCommandMap('edit', scope.row)">编辑</el-button>
                      <el-button link type="primary" size="small" @click="handleCommandMap('view', scope.row)">查看</el-button>
                      <el-button link type="primary" size="small" @click="handleDeleteList(scope.row)"> 删除 </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template v-if="state.configActive === 'image'">
                <resouceList :fileService="state.fileService" ref="resouceListRef" :data="state.listData" @selected="handleBatchSelected" editable>
                  <template #action="{ item }">
                    <div>
                      <el-button round type="primary" @click="handleCommandList('edit', item)">
                        <visui-icon name="ele-edit"></visui-icon>
                      </el-button>
                      <el-button round type="danger" @click="handleCommandList('delete', item)">
                        <visui-icon name="ele-deleteFilled"></visui-icon>
                      </el-button>
                    </div>
                  </template>
                </resouceList>
              </template>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
    <!-- 分类 -->
    <folderEdit ref="folderEditRef" @finish="handleFinishClass"></folderEdit>
    <!-- 列表 -->
    <resourceEdit ref="resourceEditRef" @finish="handleFinishList"></resourceEdit>
    <!-- 图片 -->
    <imageUpload ref="uploadImageRef" @finish="handleFinishImage"></imageUpload>
    <!-- 地图 -->
    <mapEdit ref="mapEditRef" @finish="handleFinishMap"></mapEdit>
    <mapView ref="mapViewRef"></mapView>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue'
import { useDatavisApi } from '../hooks/useDatavisApi'

import { ElMessageBox, ElMessage } from 'element-plus'

import folderList from '../com/FolderList.vue'
import folderEdit from '../com/FolderEdit.vue'

import resouceList from '../com/ResouceList.vue'
import resourceEdit from '../com/ResourceEdit.vue'
import imageUpload from '../com/ImageUpload.vue'

import mapEdit from '../com/MapEdit.vue'
import mapView from '../com/MapView.vue'
import { debounce } from 'lodash-es'

const apiHook = useDatavisApi()

const state = reactive({
  fileService: apiHook.fileService,
  typeOptions: [
    {
      title: '图片',
      icon: 'ele-PictureFilled',
      key: 'image'
    },
    // {
    //   title: '视频',
    //   icon: 'ele-VideoCameraFilled',
    //   key: 'video'
    // },
    {
      title: '地图',
      icon: 'ele-LocationFilled',
      key: 'map'
    }
  ],
  query: { name: '' },
  configMap: {
    image: {
      title: '素材-图片',
      type: '310',
      configType: 'image',
      fileType: 'image/*', //文件类型
      folder: 'datavis/image/' //文件路径
    },
    video: {
      title: '素材-视频',
      type: '320',
      configType: 'video',
      fileType: 'video/*', //文件类型
      folder: 'datavis/video/' //文件路径
    },
    map: {
      type: '330',
      configType: 'map',
      desc: '地图-geojson',
      fileType: 'json/*', //文件类型
      folder: 'datavis/geojson/' //文件路径
    }
  } as any,
  configActive: 'image',
  config: {} as any,

  classActive: null as any,
  classRow: {} as any,

  classData: [],
  loading: false,
  listData: [],
  // 批量管理
  batchVisible: false,
  batchData: []
})

// 根据parent_id获取文件夹列表和文件列表
const getFolders = async ({ parent_id, name }: any) => {
  const params = { parent_id, sortBy: 'sort', sortOrder: 'desc', name }
  const [err, res] = await apiHook.getFolders(params)
  const data = err ? { resource: [], folders: [] } : res
  return data
}

// 初始化一级标签页
const initGetClassData = async () => {
  const [err, res] = await apiHook.getWholeTree({ type: state.config.type, sortBy: 'sort', sortOrder: 'desc' })
  const folders = err ? [] : res || []
  state.classData = folders
  const findObj = folders.find((item: any) => item.id === state.classActive) || folders[0]
  state.classData = folders
  if (findObj) {
    handleChangeClass(findObj)
  }
}

// 切换类型
const handleChangeType = () => {
  state.config = state.configMap[state.configActive] as any
  state.classActive = null
  state.classRow = {}
  state.classData = []
  state.listData = []
  initGetClassData()
}

// 分类
const handleChangeClass = async (row: any) => {
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
      handleModifyClass('add', row)
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

const getMaxSort = () => {
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
const handleModifyClass = (type: any, row?: any) => {
  let title = '新建分类'
  let form = {
    id: '',
    name: '',
    type: state.config.type,
    parent_id: state.classActive || '',
    sort: getMaxSort()
  }
  if (type === 'edit') {
    title = '编辑分类'
    form = Object.assign({}, row)
  }
  const data = {
    title,
    form,
    parentFlag: true,
    depth: 3,
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
const initGetListData = async () => {
  const { resource } = await getFolders({ parent_id: state.classActive, name: state.query.name })
  state.listData = resource || []
}

const handleKeywordInput = debounce(() => {
  initGetListData()
}, 300)
const handleQuery = () => {
  initGetListData()
}

// 批量管理
const handleBatchSelected = (val: any) => {
  state.batchVisible = false
  if (val.length) {
    state.batchVisible = true
  }
  state.batchData = val
}
const handleBatchDelete = () => {
  if (!state.batchData.length) return ElMessage.warning('请选择数据')
  ElMessageBox.confirm('是否删除所选数据', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    appendTo: popupEl
  })
    .then(async () => {
      const data = {
        idList: state.batchData
      }
      const [err, res] = await apiHook.deleteResource(data)
      if (err) return
      initGetListData()
      handleResetMuiltple()
    })
    .catch(() => {})
}

const resouceListRef = ref<any>()
const handleResetMuiltple = () => {
  resouceListRef.value.reset()
}
const handleFinishList = () => {
  initGetListData()
}
const resourceEditRef = ref<any>()
const handleModifyList = (row: any) => {
  let title = '编辑素材'
  let form = Object.assign({}, row)

  const data = {
    title,
    form
  }
  resourceEditRef.value.handleOpenDialog(data)
}
const handleCommandList = (type: string, row?: any) => {
  switch (type) {
    case 'edit':
      handleModifyList(row)
      break
      break
    case 'delete':
      handleDeleteList(row)
      break
  }
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

// 上传图片
const uploadImageRef = ref<any>()
const handleUploadImage = () => {
  const data = {
    folder: state.config.folder + state.classRow.url,
    form: {
      id: '',
      name: '',
      url: '',
      image: '',
      parent_id: state.classRow.id,
      type: state.config.type,
      sort: Math.max(...state.listData.map((item: any) => item.sort), 0) + 1
    }
  }
  uploadImageRef.value.handleOpenDialog(data)
}

const handleFinishImage = () => {
  initGetListData()
}
// 地图
const mapEditRef = ref<any>()

const handleCommandMap = (type: any, row: any) => {
  switch (type) {
    case 'add':
      handleModyifyMap(type)
      break
    case 'edit':
      handleModyifyMap(type, row)
      break
    case 'view':
      handleViewMap(row)
      break
    case 'delete':
      handleDeleteList(row)
      break
  }
}

const handleModyifyMap = (type: string, row?: any) => {
  let title = '新增地图'
  let form = {
    id: '',
    name: '',
    url: '',
    thumbnail: '',
    parent_id: state.classActive,
    type: state.config.type,
    content: '',
    sort: 1
  }
  if (type === 'edit') {
    title = '编辑地图'
    form = Object.assign(form, row)
  }
  const data = {
    title,
    form,
    folder: state.config.folder + state.classRow?.url
  }
  mapEditRef.value.handleOpenDialog(data)
}
const handleFinishMap = () => {
  initGetListData()
}

const mapViewRef = ref()
const handleViewMap = (row: any) => {
  mapViewRef.value.handleOpenDialog(row)
}

onMounted(() => {
  handleChangeType()
})
</script>
