<template>
  <el-dialog title="图片选择" width="890px" class="datavis-image-picker-dialog" :close-on-click-modal="false" v-model="state.visible">
    <div class="datavis-image-picker-dialog-body">
      <div class="left-sidebar">
        <el-button @click="handleOpenGallyCate"><i class="iconfont-bi icon-bi-jia"></i>新增分类</el-button>
        <div class="scrollbar-wrap">
          <el-scrollbar ref="scrollbarRef">
            <el-tree
              highlight-current
              ref="treeRef"
              node-key="id"
              :data="state.classData"
              :current-node-key="state.classActive"
              :props="{ children: 'folders', label: 'name' }"
              @node-click="handleChangeClass"
            >
            </el-tree>
          </el-scrollbar>
        </div>
      </div>
      <div class="right-content">
        <div class="action-wrap">
          <el-button type="primary" @click="handleOpenUpload">上传素材</el-button>
        </div>
        <div class="scrollbar-wrap">
          <el-scrollbar>
            <div class="flex-layout-container">
              <div class="flex-item" v-for="(item, index) in state.listData" :key="index" @click="handleSelectImage(item)" :title="item.name">
                <img :src="datavisApi.fileService + (item.thumbnail || item.url)" onerror="onerror=null;src='/static/datavis/img/error-img.png'" />
              </div>
            </div>
            <div class="flex-item-empty" v-if="!state.loading && !state.listData.length">
              <img class="empty_data_img" :src="editorEmptyImgUrl" />
              <span class="upload_btn" @click="handleOpenUpload">点击上传素材～</span>
              <span class="upload_tip">仅支持png、jpeg、jpg、svg格式文件上传，支持批量上传</span>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>

    <!-- 新增分类 -->
    <itemFolder ref="itemFolderRef" @finish="handleFinishFolder"></itemFolder>
    <!-- 上传素材 -->
    <itemUpload ref="itemUploadRef" @finish="handleFinishUpload"></itemUpload>
  </el-dialog>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'imagePickerDialog'
})
import { ref, reactive, nextTick } from 'vue'
import datavisApi from '@/api/datavisApi'
import { editorEmptyImgUrl, getObjFromTreeData, getScrollTreeState, setScrollTreeState } from '../../utils'
import itemFolder from './component/folder.vue'
import itemUpload from './component/upload.vue'

const emit = defineEmits(['finish'])
const state = reactive({
  config: {
    title: '素材-图片',
    type: '310',
    configType: 'image',
    fileType: 'image/*', //文件类型
    folder: 'datavis/image/' //文件路径
  },
  visible: false,
  loading: false,
  classActive: null,
  classRow: null as any,
  classData: [] as any,
  query: {
    name: ''
  },
  listData: [] as any,
  callbackFun: null as any, // 选择完图片后回调函数
  treeState: null as any
})

const handleOpenDialog = (callback: Function) => {
  state.callbackFun = callback
  state.visible = true
  initGetClassData()
}
const handleCloseDialog = () => {
  state.visible = false
}

const initClassData = (_data: any, source: any) => {
  if (source && source === 'systemResourceDialog' && state.visible) {
    initGetClassData()
  }
}

defineExpose({
  handleOpenDialog,
  handleCloseDialog,
  initClassData
})

// 根据parent_id获取文件夹列表和文件列表
const getWholeFolders = async ({ type }: any) => {
  const params = { type, sortBy: 'sort', sortOrder: 'desc' }
  const [err, res] = await datavisApi.folders.wholeTree(params)
  if (err) return []
  return res
}

const scrollbarRef = ref()
const treeRef = ref()
// 分类
const initGetClassData = async () => {
  const res = await getWholeFolders({ type: state.config.type })
  if (!state.treeState) {
    state.treeState = { scrollTop: 0, expandedKeys: res.map((a: any) => a.id) }
  } else {
    state.treeState = getScrollTreeState(treeRef, scrollbarRef)
  }
  state.classData = res
  let obj = getObjFromTreeData(res, 'folders', (item: any) => item.id === state.classActive) || res[0]
  if (obj) {
    handleChangeClass(obj)
  }
  nextTick(() => {
    setScrollTreeState(treeRef, scrollbarRef, state.treeState)
    treeRef.value.setCurrentKey(state.classActive)
  })
}
const handleChangeClass = (row: any) => {
  state.classActive = row.id
  state.classRow = row
  initGetListData()
}

// 列表
const initGetListData = async () => {
  const params = { parent_id: state.classActive, sortBy: 'sort', sortOrder: 'desc' }
  const [err, res] = await datavisApi.resource.list(params)
  const data = err ? [] : res || []
  state.listData = data
}

// 设置图片
const handleSelectImage = (row: any) => {
  handleCloseDialog()
  const url = datavisApi.fileService + row.url
  state.callbackFun && state.callbackFun({ url })
}

// 添加分类
const itemFolderRef = ref()
// 打开分类
const handleOpenGallyCate = (type: any, row?: any) => {
  let title = '新建分类'
  let form = {
    id: '',
    name: '',
    type: state.config.type,
    parent_id: ''
  }
  if (type === 'edit') {
    title = '编辑分类'
    form = Object.assign({}, row)
  }
  const data = {
    title,
    form,
    parentFlag: true,
    classData: state.classData
  }
  itemFolderRef.value.handleOpenDialog(data)
}
// 保存分类
const handleFinishFolder = () => {
  // 关闭弹窗
  itemFolderRef.value.handleCloseDialog()
}

//上传
const itemUploadRef = ref<any>()
const handleOpenUpload = () => {
  const data = {
    folder: state.config.folder + state.classRow.url,
    form: {
      id: '',
      name: '',
      url: '',
      image: '',
      parent_id: state.classRow.id,
      type: state.config.type,
      sort: 0
    }
  }
  itemUploadRef.value.handleOpenDialog(data)
}

const handleFinishUpload = async () => {
  initGetListData()
  emit('finish', { type: 'uploaded', data: state.classRow })
}
</script>
