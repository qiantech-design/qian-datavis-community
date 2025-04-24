<template>
  <div>
    <el-dialog class="ui-workspace-dialog" v-model="state.visible" width="820px" draggable>
      <template #header>
        <div style="font-size: large">{{ state.title }}</div>
      </template>
      <div class="ui-workspace-dialog-container">
        <div class="ui-workspace-flex-box">
          <div class="ui-workspace-flex-header">
            <div class="ui-workspace-types">
              <el-scrollbar>
                <ul class="ui-workspace-types-container">
                  <li class="ui-workspace-types-item" v-for="(item, index) in state.classData"
                    :class="{ 'is-active': state.classActive === item.id }" :key="index"
                    @click="handleChangeClass(item)">
                    <div>{{ item.name }}</div>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </div>
          <div class="ui-workspace-flex-container">
            <el-scrollbar>
              <ul class="ui-workspace-dialog-card">
                <li class="ui-workspace-dialog-card-item" v-for="(item, index) in state.listData" :key="index"
                  :class="{ 'is-active': state.selectId === item.id }" @click="handleSelect(item)">
                  <div class="image-content">
                    <img :src="state.fileService + (item.thumbnail || item.url)" alt="" />
                  </div>
                  <div class="text-content">{{ item.name }}</div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer" style="text-align: right">
          <el-button @click="handleCloseDialog">取 消</el-button>
          <el-button type="primary" @click="handleCreate">创 建</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useDatavisApi } from '../hooks/useDatavisApi'
const emit = defineEmits(['finish'])

const apiHook = useDatavisApi()

const state = reactive({
  fileService: apiHook.fileService,
  visible: false,
  form: {
  },
  title: '',
  folder: '',
  marketConfig: {
    title: '素材广场',
    type: '600',
    fileType: 'json/*', //文件类型
    filePath: 'datavis/market', //文件路径
    fileName: 'market' //文件名
  },
  query: {
    name: ''
  },
  loading: false,
  selectId: '',
  selectRow: null,
  selectJsonData: '',
  listData: []
})

const handleOpenDialog = ({ title, form, folder }: any) => {
  state.title = title
  initGetClassData()
  state.form = form
  state.visible = true
  state.folder = folder
}
const handleCloseDialog = () => {
  state.visible = false
}
defineExpose({
  handleOpenDialog
})

// 根据parent_id获取文件夹列表和文件列表
const getFolders = async ({ parent_id, type, name }: any) => {
  const params = { parent_id, type, sortBy: 'created_at', sortOrder: 'asc', name }
  const [err, res] = await apiHook.getFolders(params)
  const data = err ? { resource: [], folders: [] } : res
  return data
}

// 分类
const initGetClassData = async () => {
  const res = await getFolders({ type: state.marketConfig.type })
  const folders = res.folders
  state.classData = folders
  if (!state.classActive && folders.length) {
    handleChangeClass(folders[0])
  }
}
const handleChangeClass = (row: any) => {
  state.classActive = row.id
  initGetListData()
}

const initGetListData = async () => {
  state.listData = []
  const res = await getFolders({
    parent_id: state.classActive,
    name: state.query.name
  })
  state.listData = res.resource
}

const handleSelect = (item: any) => {
  state.selectId = item.id
  state.selectRow = item as any
}

const getJsonByUrl = (url: string) => {
  return new Promise(async (resolve, reject) => {
    const [err, res] = await apiHook.getFile(url)
    const reader = new FileReader()
    reader.onloadend = e => {
      const data = e.target?.result
      resolve(data)
    }
    reader.readAsText(res.data, 'utf-8')
  })
}
// 创建
const handleCreate = async () => {
  state.loading = true
  const url = apiHook.fileService + state.selectRow.url
  const jsonData = await getJsonByUrl(url)
  state.selectJsonData = jsonData as any
  // 执行创建保存操作
  handleSave()
}

const handleSave = async () => {
  const data = {
    ...state.form,
    name: '模板' + state.selectRow.name,
  }
  if (!data.id) {
    const [err, res] = await apiHook.saveResource(data)
    if (err) {
      state.loading = false
      return
    }
    data.id = res
  }
  const content = state.selectJsonData
  const file = new File(
    [content],
    `${data.id}.json`,
    {
      type: 'text/json;charset=utf-8'
    }
  )
  const files = [file]
  const [uploadErr, uploadRes] = await apiHook.uploadFiles(files, {
    folder: state.folder,
  })
  if (uploadErr) {
    state.loading = false
    return
  }
  const { urls } = uploadRes
  data.url = urls[0]
  handlePost(data)
}
const handlePost = async (params: any) => {
  const [err, res] = await apiHook.saveResource(params)
  if(err) {
    state.loading = false
    return
  }
  if (res) {
    handleCloseDialog()
    emit('finish')
  }
}
</script>