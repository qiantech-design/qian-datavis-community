<template>
  <el-dialog
    v-bind="attrs"
    ref="dialogRef"
    class="datavis-resource-dialog"
    modal-class="datavis-editor-hide-modal"
    draggable
    v-model="state.visible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="false"
    :modal="false"
    :width="state.dialogWidth"
  >
    <template #header>
      <div class="component-header">
        <span class="component-header-title">官方素材</span>
        <div class="component-header-icon">
          <visui-icon class="el-icon--right" @click="closeDialog" name="ele-close"></visui-icon>
        </div>
      </div>
    </template>
    <div class="search-wrap">
      <el-input v-model="state.keyword" placeholder="搜索" size="large" clearable @input="handleKeywordChange">
        <template #prefix>
          <visui-icon name="ele-search"></visui-icon>
        </template>
      </el-input>
    </div>
    <div class="tabs-scroll-wrapper">
      <div class="btns-wrap">
        <div class="btn" v-for="item in state.lv1Tabs" :key="item.id" :class="{ active: state.lv1Key === item.id }" @click="handleLv1Change(item)">
          {{ item.name }}
        </div>
        <div class="plus-action-icon" v-if="isRootUser" @click="handleOpenFolderDialog(null)">
          <visui-icon name="ele-plus" :size="12"></visui-icon>
        </div>
      </div>
    </div>

    <div class="tabs-scroll-wrapper" :class="{ 'none-shadow': !(state.lv3Key || isRootUser) }" v-if="state.lv1Key">
      <el-scrollbar max-height="85px">
        <div class="text-wrap">
          <div class="text" v-for="item in state.lv2Tabs" :key="item.id" :class="{ active: state.lv2Key === item.id }" @click="handleLv2Change(item)">
            {{ item.name }}
          </div>
          <div class="plus-action-icon" v-if="isRootUser" @click="handleOpenFolderDialog(lv1Obj)">
            <visui-icon name="ele-plus" :size="12"></visui-icon>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="tabs-scroll-wrapper none-shadow" v-if="state.lv2Key && (isRootUser || state.lv3Tabs.length)">
      <el-scrollbar max-height="85px">
        <div class="text-wrap">
          <div
            class="plain-text"
            v-for="item in state.lv3Tabs"
            :key="item.id"
            :class="{ active: state.lv3Key === item.id }"
            @click="handleLv3Change(item)"
          >
            {{ item.name }}
          </div>
          <div class="plus-action-icon" v-if="isRootUser" @click="handleOpenFolderDialog(lv2Obj)">
            <visui-icon name="ele-plus" :size="12"></visui-icon>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div
      class="scrollbar-wrap"
      :class="{ 'is-dragover': state.isDraggingFile }"
      @drop="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      v-loading="!!state.loadingText"
      :element-loading-text="state.loadingText"
    >
      <el-scrollbar>
        <div class="list" ref="listRef">
          <div
            class="list-item"
            v-for="item in state.dataList"
            :key="item.id"
            :draggable="canDropToCanvas"
            @dragstart="handleDragStart($event, item)"
            @dragend="handleDragend"
            @click="handleAddCom(item)"
          >
            <div class="item-image-box">
              <div class="item-mask" v-if="!canDropToCanvas">
                <span class="action-text" @click="handleCoverScreen(item)">新建</span>
                <span class="action-text" @click="handleAppendScreen(item)">引用</span>
              </div>
              <el-image :src="item.thumbnail || item.url" class="item-image" fit="contain" lazy>
                <template #error>
                  <img :src="errorImgUrl" alt="" />
                </template>
              </el-image>
            </div>
            <span class="item-text" :title="item.name">{{ item.name }}</span>
          </div>
        </div>
        <div class="dw-empty" v-if="!state.loadingText && !state.dataList.length">暂无数据</div>
      </el-scrollbar>
    </div>
  </el-dialog>
  <el-dialog modal-append-to-body title="创建文件夹" v-model="state.folderDialogVisible" width="360px" :close-on-click-modal="false">
    <el-form ref="formRef" :model="state.form" :rules="state.rules" label-width="auto">
      <el-form-item label="类型" prop="type">
        <el-select v-model="state.form.type" placeholder="请选择">
          <el-option v-for="item in state.typeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input ref="nameInputRef" v-model="state.form.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="序号">
        <el-input-number v-model="state.form.sort" controls-position="right" class="full-width" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.folderDialogVisible = false">关 闭</el-button>
        <el-button type="primary" :loading="state.confirmLoading" @click="createFolder">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, useAttrs, computed } from 'vue'
import { eventTypes, pageOperationTypes, errorImgUrl, isValidDatavisFile } from '../../utils/index'
import datavisApi from '@/api/datavisApi'
import { useEventListener } from '@vueuse/core'
import { ElMessage, ElMessageBox } from 'element-plus'
import { debounce } from 'lodash-es'
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()
const componentName = 'systemResourceDialog'
defineOptions({ name: componentName })
const attrs = useAttrs()

const isRootUser = localStorage.getItem('DATAVIS_USER') === 'root' // 是否是root用户，可以管理素材
// const isRootUser = false

const state = reactive({
  visible: false,
  loadingText: '',
  dialogInit: false,
  dialogWidth: 278,
  imageHeight: 60,
  keyword: '',
  lv1Tabs: [] as any, // 一级分类
  lv2Tabs: [] as any, // 二级分类
  lv3Tabs: [] as any, // 三级分类
  lv1Key: '', // 一级分类当前key
  lv2Key: '', // 二级分类当前key
  lv3Key: '', // 三级分类当前key
  dataList: [] as any,
  form: { id: '', name: '', type: 310 } as any,
  rules: {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    type: [{ required: true, message: '请选择类型', trigger: 'change' }]
  },
  confirmLoading: false,
  tooltipVisible: false,
  folderDialogVisible: false,
  isDraggingFile: false, // 是否正在拖拽文件
  isDraggingItem: false, // 是否正在元素

  dragTimer: null as any,
  typeList: [
    // { value: 100, label: '大屏' },
    { value: 200, label: '模块' },
    { value: 310, label: '素材' },
    { value: 600, label: '模板' }
  ]
})
const formRef = ref()

const lv1Obj = computed<any>(() => {
  return state.lv1Tabs.find((item: any) => item.id === state.lv1Key)
})
const lv2Obj = computed<any>(() => {
  return state.lv2Tabs.find((item: any) => item.id === state.lv2Key)
})
const lv3Obj = computed<any>(() => {
  return state.lv3Tabs.find((item: any) => item.id === state.lv3Key)
})

const resourceMap: any = {
  310: {
    description: '图片资源',
    type: 'addImage',
    acceptFiles: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml']
  },
  // 100: {
  //   description: '大屏',
  //   type: 'addScreen',
  //   acceptFiles: ['application/json']
  // },
  600: {
    description: '模板',
    type: 'addScreen',
    acceptFiles: ['application/json']
  },
  200: {
    description: '模块',
    type: 'addModule',
    acceptFiles: ['application/json']
  }
}

const emit = defineEmits(['finish'])

const nameInputRef = ref() // 名称名称输入框ref

// 打开创建文件夹弹窗
const handleOpenFolderDialog = (e: any) => {
  if (!e) {
    state.form = { id: '', name: '', type: 310, parent_id: '', sort: 0 }
  } else {
    state.form = { id: '', name: '', type: e.type, parent_id: e.id, sort: 0 }
  }
  state.folderDialogVisible = true
  setTimeout(() => {
    formRef.value.clearValidate()
    // 自动获取焦点
    nameInputRef.value.focus()
  }, 16)
}

// 创建文件夹
const createFolder = async () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      state.confirmLoading = true
      const [err] = await datavisApi.folders.save(state.form)
      state.confirmLoading = false
      if (!err) {
        state.folderDialogVisible = false
        fireEvent()
        initTabsData()
      }
    }
  })
}

const handleOpenDialog = () => {
  state.visible = true
  setPosition()
}
const handleCloseDialog = () => {
  state.visible = false
}

const handleKeywordChange = debounce(() => {
  getDataList()
}, 500)

const closeDialog = () => {
  emit('finish')
}

defineExpose({
  handleOpenDialog,
  handleCloseDialog
})

const handleLv1Change = (item: any) => {
  if (item.id !== state.lv1Key) {
    state.lv1Key = item.id
    state.lv2Tabs = item.folders || []
    state.lv2Key = state.lv2Tabs.length ? state.lv2Tabs[0].id : ''
    const findObj = state.lv2Tabs.find((item: any) => item.id === state.lv2Key)
    if (findObj) {
      state.lv3Tabs = findObj.folders || []
      state.lv3Key = state.lv3Tabs.length ? state.lv3Tabs[0].id : ''
    } else {
      state.lv3Tabs = []
      state.lv3Key = ''
    }
    getDataList()
  }
}

const handleLv2Change = (item: any) => {
  if (state.lv2Key !== item.id) {
    state.lv2Key = item.id
    state.lv3Tabs = item.folders || []
    state.lv3Key = state.lv3Tabs.length ? state.lv3Tabs[0].id : ''
    getDataList()
  }
}

const handleLv3Change = (item: any) => {
  if (state.lv3Key !== item.id) {
    state.lv3Key = item.id
    getDataList()
  }
}

const initTabsData = async () => {
  const params = { parent_id: '', sortBy: 'sort', sortOrder: 'asc', keyword: state.keyword }
  const [err, res] = await datavisApi.folders.wholeTree(params)
  const data = err ? [] : res || []
  const folderTypes = [200, 310, 600]
  // 1级标签页只展示图片200、模块310和模板600
  state.lv1Tabs = data.filter((a: any) => folderTypes.includes(a.type))

  // 查看lv1Key对应的对象是否存在，如果不存在则取lv1Tabs第一个id作为lv1Key
  let findObj = state.lv1Tabs.find((item: any) => item.id === state.lv1Key) || state.lv1Tabs[0] || {}
  state.lv1Key = findObj.id || ''
  state.lv2Tabs = findObj.folders || []

  // 查看lv2Key对应的对象是否存在，如果不存在则取lv2Tabs第一个id作为lv2Key
  findObj = state.lv2Tabs.find((item: any) => item.id === state.lv2Key) || state.lv2Tabs[0] || {}
  state.lv2Key = findObj.id || ''
  state.lv3Tabs = findObj.folders || []

  // 查看lv3Key对应的对象是否存在，如果不存在则取lv3Tabs第一个id作为lv3Key
  findObj = state.lv3Tabs.find((item: any) => item.id === state.lv3Key) || state.lv3Tabs[0] || {}
  state.lv3Key = findObj.id || ''

  getDataList()
}

// 获取资源列表数据
const getDataList = async () => {
  if (lv1Obj.value) {
    const item = lv3Obj.value || lv2Obj.value || lv1Obj.value
    const params = { parent_id: item.id, type: item.type, sortBy: 'created_at', sortOrder: 'asc', keyword: state.keyword }
    const [err, res] = await datavisApi.resource.list(params)
    const data = err ? [] : res || []
    data.forEach((item: any) => {
      if (item.url && item.url.startsWith('/file_api')) {
        item.image = item.url = datavisApi.fileService + item.url // 拼上文件服务地址
      }
      if (item.thumbnail && item.thumbnail.startsWith('/file_api')) {
        item.thumbnail = datavisApi.fileService + item.thumbnail
      }
    })
    state.dataList = data
      .filter((a: any) => !state.keyword || a.name.includes(state.keyword))
      .sort((a: any, b: any) => a.name.localeCompare(b.name, 'zh-Hans-CN', { numeric: true }))
  } else {
    state.dataList = []
  }
}

const dialogRef = ref()
const listRef = ref()

const calcImageHeight = () => {
  const { clientWidth } = listRef.value
  const width = (clientWidth - 14 * 3) / 2
  state.imageHeight = (width * 1080) / 1920
}

const setPosition = () => {
  if (!state.dialogInit) {
    state.dialogInit = true
    setTimeout(() => {
      const dialog: HTMLDivElement | null = dialogRef.value.dialogContentRef.$el
      if (dialog) {
        dialog.style.marginTop = '70px'
        dialog.style.marginLeft = '210px'
        dialog.style.height = document.body.clientHeight - 120 + 'px'
      }
      calcImageHeight()
    }, 16)
  }
}

// 拖拽
const handleDragStart = (e: DragEvent, row: any) => {
  const data = {
    type: resourceMap[lv1Obj.value.type].type,
    params: row
  }
  state.isDraggingItem = true
  const content = JSON.stringify(data)
  if (e.dataTransfer) {
    e.dataTransfer.setData('datavisData', content)
  }
}
// 拖拽结束
const handleDragend = () => {
  state.isDraggingItem = false
}

// 图片、模块才可以直接加入画布
const canDropToCanvas = computed(() => {
  return lv1Obj.value && [310, 200].includes(lv1Obj.value.type)
})
// 单击 组件添加
const handleAddCom = (row: any) => {
  if (canDropToCanvas.value) {
    const data = {
      type: resourceMap[lv1Obj.value.type].type,
      params: row,
      clearDropPosition: true
    }
    editor.fire(eventTypes.pageOperation, { type: pageOperationTypes.objectAdd, data, source: componentName })
  }
}

const handleWindowResize = () => {
  if (state.visible) {
    const dialog: HTMLDivElement | null = dialogRef.value.dialogContentRef.$el
    if (dialog) {
      dialog.style.height = document.body.clientHeight - 120 + 'px'
    }
  }
}

const handleDrop = async (e: any) => {
  const { files } = e.dataTransfer
  e.preventDefault()
  e.stopPropagation()
  state.isDraggingFile = false
  const transferData = e.dataTransfer.getData('datavisData')
  if (transferData || !isRootUser) {
    return
  }
  let refuseReason = ''
  const resourceObj = resourceMap[lv1Obj.value.type]
  if (resourceObj) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!resourceObj.acceptFiles.includes(file.type)) {
        refuseReason = '文件类型不符合要求'
        break
      }
      if (file.type === 'application/json') {
        const { isValid } = (await isValidDatavisFile(file)) as any
        if (!isValid) {
          refuseReason = '文件内容格式不正确'
          break
        }
      }
    }
  }
  if (refuseReason) {
    return ElMessage.error(refuseReason)
  }
  const item = lv3Obj.value || lv2Obj.value || lv1Obj.value
  state.loadingText = '上传中，请稍候...'
  const [err, res] = await datavisApi.file.uploadFiles(files, { folder: item.url, isCover: 0 })
  const data = err ? {} : res || {}
  if (data.urls) {
    const models = data.urls.map((url: any) => {
      const fileName = url.substring(url.lastIndexOf('/') + 1)
      const name = fileName.substring(0, fileName.lastIndexOf('.'))
      return {
        id: '',
        name,
        parent_id: item.id,
        type: item.type,
        url
      }
    })
    const [saveErr] = await datavisApi.resource.save(models)
    if (!saveErr) {
      ElMessage.success('上传成功')
      fireEvent()
      getDataList()
    }
  }
  state.loadingText = ''
}

const fireEvent = () => {
  if (lv1Obj.value) {
    if (lv1Obj.value.type === 310) {
      editor.fire(eventTypes.pageOperation, { type: pageOperationTypes.materialUpdate, source: componentName })
    } else if (lv1Obj.value.type === 200) {
      editor.fire(eventTypes.pageOperation, { type: pageOperationTypes.moduleUpdate, source: componentName })
    }
  }
}

const handleDragOver = (e: any) => {
  if (!state.isDraggingItem && isRootUser) {
    state.isDraggingFile = true
    e.dataTransfer.dropEffect = 'copy'
    clearTimeout(state.dragTimer)
  }
}

const handleDragLeave = () => {
  state.dragTimer = setTimeout(() => {
    state.isDraggingFile = false
  }, 16)
}

// 覆盖大屏，会清空原大屏再导入大屏数据

const handleCoverScreen = (row: any) => {
  ElMessageBox.confirm('新建大屏将会覆盖当前大屏，是否继续？', '警告', {
    type: 'warning'
  })
    .then(() => {
      fireAddScreen(row, true)
    })
    .catch(() => {})
}

// 追加大屏，在当前大屏基础上追加数据
const handleAppendScreen = (row: any) => {
  fireAddScreen(row, false)
}

const handlePageOperation = ({ type, source }: any) => {
  // 本页面的操作不要重复触发事件
  if (source !== componentName && [pageOperationTypes.moduleUpdate, pageOperationTypes.materialUpdate].includes(type)) {
    initTabsData()
  }
}

//触发事件添加大屏
const fireAddScreen = (row: any, isCover: boolean) => {
  const data = {
    type: resourceMap[lv1Obj.value.type].type,
    params: row,
    clearDropPosition: true, // 是否清除拖拽位置信息
    isCover // 是否覆盖当前大屏
  }
  editor.fire(eventTypes.pageOperation, { type: pageOperationTypes.objectAdd, data, source: componentName })
}
onMounted(() => {
  initTabsData()
  useEventListener('resize', handleWindowResize)
  editor.on(eventTypes.pageOperation, handlePageOperation)
})
</script>
