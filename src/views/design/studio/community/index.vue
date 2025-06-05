<template>
  <div class="datavis-layout-wrapper datavis-theme-dark" v-loading="!!state.loadingText" :element-loading-text="state.loadingText">
    <visui-provider popupEl=".datavis-theme-dark">
      <!-- 编辑器 -->
      <datavis-editor
        ref="datavisEditorRef"
        v-model:name="state.pageObject.name"
        :isModule="isModule"
        :pageInfo="pageInfo"
        :customThemeList="state.customThemeList"
        @command="handleCommand"
        @ready="handleEditorReady"
      >
        <template #header="scope">
          <headerToolbar v-if="scope.isReady" v-model:name="state.pageObject.name" :customThemeList="state.customThemeList"></headerToolbar>
        </template>
        <template #left="scope">
          <datavis-layer-bar v-if="scope.isReady"></datavis-layer-bar>
        </template>
        <template #setting>
          <datavis-setting-bar :isModule="isModule"></datavis-setting-bar>
        </template>
        <template #contextmenu="scope">
          <datavis-contextmenu-bar v-if="scope.isReady"></datavis-contextmenu-bar>
        </template>
      </datavis-editor>
      <!-- 返回 -->
      <back-dialog ref="backDialogRef" @finish="handleFinishBack"></back-dialog>
      <!-- 搜索图层/组件 -->
      <search-dialog ref="searchDialogRef" @command="handleSearchCommand"></search-dialog>
      <image-picker-dialog ref="imagePickerDialogRef" @finish="handleFinishImagePickerDialog"></image-picker-dialog>
    </visui-provider>
  </div>
</template>
<script lang="ts" setup>
// 依赖
import { ref, onMounted, onBeforeUnmount, reactive, computed, watch } from 'vue'
import * as localforage from 'localforage'
import { draftStroageKey, previewStroageKey, getImageSize, useMessage, base64ToFile, pageOperationTypes, eventTypes } from './utils/index'

import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
// @ts-ignore
import dayjs from 'dayjs'
import datavisApi from '@/api/datavisApi'
import { pick, omit } from 'lodash-es'

const componentName = 'datavisFrame'
defineOptions({
  name: componentName
})

const router = useRouter()
const route = useRoute()
const dataPreviewDialogRef = ref()
const imagePickerDialogRef = ref()

const state = reactive({
  screenType: 'screen', // 页面类型，screen：大屏，component：模块 , market:模板
  pageObject: {} as any, // 页面对象
  loadingText: '',
  customThemeList: [] as any // 自定义主题列表
})

let graphString = '' // 图纸字符串，用于对比图纸是否修改过

const isModule = computed(() => {
  return state.screenType == 'component'
})

// 图纸信息
const pageInfo = computed(() => {
  return {
    name: state.pageObject.name,
    id: route.params.id
  }
})

// 操作
const handleCommand = (type: pageOperationTypes, data: any, source?: any) => {
  switch (type) {
    case pageOperationTypes.save:
      handleSaveData()
      break
    case pageOperationTypes.preview:
      handlePreviewData()
      break
    case pageOperationTypes.back:
      handleBack()
      break
    case pageOperationTypes.objectAdd:
      handleAddComponent(data)
      break
    case pageOperationTypes.search:
      handleSearch()
      break
    case pageOperationTypes.importDraft:
      handleImportDraft()
      break
    case pageOperationTypes.saveDraft:
      handleSaveDraft().then(() => {
        ElMessage.success('已保存本地草稿')
      })
      break
    case pageOperationTypes.dataPreview:
      handleDataPreview(data)
      break
    case pageOperationTypes.imagePicker:
      handleImagePickerOpen(data)
      break
    case pageOperationTypes.fileUpload:
      handleFileUpload(data)
      break
    case pageOperationTypes.materialUpdate:
      handleMaterialUpdate(data, source)
      break
  }
}

// 处理单个文件上传，上传完成后将url回调给调用方
const handleFileUpload = async ({ formData, callback }: any) => {
  state.loadingText = '请稍候...'
  const [err, res]: any = await datavisApi.file.uploadFiles(formData.files, {
    folder: formData.folder || 'datavis/unclassified',
    isCover: false
  })
  state.loadingText = ''
  if (err) {
    return
  }
  const { urls } = res
  urls.forEach((item: any, index: number) => {
    urls[index] = datavisApi.fileService + item
  })
  callback({ urls })
}

const handleImagePickerOpen = ({ callback }: any) => {
  imagePickerDialogRef.value.handleOpenDialog(callback)
}

const handleFinishImagePickerDialog = (e: any) => {
  const editor = datavisEditorRef.value.exposeGetEditor()
  if (e.type === 'uploaded') {
    editor.fire(eventTypes.pageOperation, { type: pageOperationTypes.materialUpdate, data: e.data, source: 'datavisFrame' })
  }
}

// 素材更新
const handleMaterialUpdate = (data: any, source: any) => {
  imagePickerDialogRef.value.initClassData(data, source)
}

const handleDataPreview = (data: any) => {
  const editor = datavisEditorRef.value.exposeGetEditor()
  const { backend, frontend, screen } = data
  const screens = [...backend, ...frontend, ...screen]
  const objs = screens.reduce((pre, cur) => {
    pre.push(...cur.objects)
    return pre
  }, [])
  const dataMaps: any = {}

  const exportFields = ['id', 'name', 'component', 'data']
  editor.util.traverse(objs, 'objects', (item: any) => {
    if (item.signal) {
      dataMaps[item.signal] = pick(item, exportFields)
    }
  })
  const jsonObject = {
    result: 0,
    data: dataMaps
  }
  dataPreviewDialogRef.value.handleOpenDialog({
    title: '组件数据预览',
    name: state.pageObject.name,
    code: JSON.stringify(jsonObject)
  })
}

const handleFinishDataPreviewDialog = (e: any) => {
  datavisEditorRef.value.exposeSetData(e.data)
  dataPreviewDialogRef.value.handleCloseDialog()
}

//编辑器实例
const datavisEditorRef = ref()

/**
 * 保存草稿
 */
const handleSaveDraft = () => {
  // 模块类型
  return new Promise((resolve, reject) => {
    datavisEditorRef.value.exposeExportData().then((pageData: any) => {
      if (pageData.module) {
        return reject(new Error('模块不能保存草稿'))
      }
      const id = route.params.id as string
      localforage.getItem(draftStroageKey).then((storePageDataStr: any) => {
        storePageDataStr = storePageDataStr || '{}'
        const storePageData = JSON.parse(storePageDataStr)
        const storeData = {
          pageData,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        storePageData[id] = storeData
        const storeKeys = Object.keys(storePageData)
        const storeLen = 5 // 最多保存多少个草稿

        if (storeKeys.length > storeLen) {
          const arr: any = []
          storeKeys.forEach(key => {
            arr.push({ key, time: storePageData[key].time })
          })
          arr.sort((a: any, b: any) => dayjs(b.time).unix() - dayjs(a.time).unix()) // 降序排序
          const toDeleteList = arr.slice(storeLen) // 根据时间删除时间久远的草稿
          if (toDeleteList.length) {
            toDeleteList.forEach((item: any) => {
              delete storePageData[item.key]
            })
          }
        }
        localforage.setItem(draftStroageKey, JSON.stringify(storePageData)).then((_res: any) => {
          resolve('ok')
        })
      })
    })
  })
}

// 读取本地草稿
const handleImportDraft = () => {
  const id = route.params.id as string
  localforage.getItem(draftStroageKey).then((pageData: any) => {
    if (pageData) {
      const storePageData = JSON.parse(pageData)
      if (storePageData[id]) {
        datavisEditorRef.value.exposeImportData(storePageData[id].pageData)
        ElMessage.success('导入成功')
      } else {
        ElMessage.info('暂无草稿')
      }
    }
  })
}

// 返回
const backDialogRef = ref()
const handleBack = async () => {
  const currentPageData = await datavisEditorRef.value.exposeExportData()
  const excludeObj = omit(currentPageData, ['info'])
  const currentPageString = JSON.stringify(excludeObj)
  if (currentPageString !== graphString) {
    backDialogRef.value.handleOpenDialog()
  } else {
    handleFinishBack()
  }
}

//添加组件
const handleAddComponent = (row: any) => {
  switch (row.type) {
    case 'addModule':
      // 模块
      handleGetModuleData(row.params)
      break
    case 'addScreen':
      // 大屏
      handleGetScreenData(row)
      break
    case 'addImage':
      // 图片
      handleGetMaterialData(row.params)
      break
    case 'addVideo':
      // 视频
      handleGetVideoData(row.params)
      break
  }
}

// 获取大屏数据并作为组件添加
const handleGetScreenData = async (data: any) => {
  //把大屏数据导入到编辑器中
  const { params, isCover } = data
  state.loadingText = '正在添加中，请稍后...'
  const [fileErr, fileRes] = await datavisApi.file.getFile(params.url)
  if (fileErr) {
    state.loadingText = ''
    return
  }
  const reader = new FileReader()
  reader.onloadend = e => {
    const data: any = e.target?.result
    const parseData = JSON.parse(data)
    if (isCover) {
      datavisEditorRef.value.exposeImportData(parseData)
    } else {
      datavisEditorRef.value.exposeAddModule(parseData)
    }
  }
  reader.readAsText(fileRes.data, 'utf-8')
  state.loadingText = ''
}

// 获取模块数据并作为组件添加
const handleGetModuleData = async (data: any) => {
  //把模块数据导入到编辑器中
  const url = data.url
  state.loadingText = '正在添加中，请稍后...'
  const [fileErr, fileRes] = await datavisApi.file.getFile(url)
  if (fileErr) {
    state.loadingText = ''
    return
  }
  const reader = new FileReader()
  reader.onloadend = e => {
    const data: any = e.target?.result
    const parseData = JSON.parse(data)
    datavisEditorRef.value.exposeAddModule(parseData)
  }
  reader.readAsText(fileRes.data, 'utf-8')
  state.loadingText = ''
}

// 获取素材数据并作为组件添加
const handleGetMaterialData = (data: any) => {
  //把模块数据导入到编辑器中
  const url = data.image
  state.loadingText = '正在添加中，请稍后...'
  getImageSize(url)
    .then((res: any) => {
      const { width, height } = res
      datavisEditorRef.value.exposeAddMaterial({ width, height, url })
    })
    .finally(() => {
      state.loadingText = ''
    })
}

// 获取视频地址并作为组件添加
const handleGetVideoData = (data: any) => {
  //把组件添加到编辑器中
  const url = data.image
  state.loadingText = '正在添加中，请稍后...'
  const width = 300,
    height = 200
  datavisEditorRef.value.exposeAddVideo({ width, height, url })
  state.loadingText = ''
}

// 搜索组件/图层
const searchDialogRef = ref()
const handleSearch = async () => {
  const editor = datavisEditorRef.value.exposeGetEditor()
  const pageData = await datavisEditorRef.value.exposeExportData()
  // 获取当前编辑的子屏
  const activeScreenId = pageData.config.toolbar.defaultBoardId
  const activeScreen = pageData.screen.find((item: any) => item.uid === activeScreenId)
  const screen = {
    name: '图层',
    objects: []
  }
  if (activeScreen) {
    screen.objects = activeScreen.objects
  }
  searchDialogRef.value.handleOpenDialog({
    screen: screen,
    editor: editor
  })
}

const handleSearchCommand = (row: any) => {
  datavisEditorRef.value.exposeAddComponent(row)
}

/**----------路由相关------- */
// 预览
const handlePreviewData = () => {
  // 打开新标签页预览
  const resolveData = router.resolve({
    path: '/view'
  })
  window.open(resolveData.href)
}

// 返回提示确定
const handleFinishBack = async (type?: any) => {
  if (type === 'save') {
    const success = await handleSaveData()
    if (!success) {
      return
    }
    // 预留一点反应时间
    ElMessage.success('2秒后自动回退')
    setTimeout(() => {
      router.back()
    }, 2000)
  } else {
    router.back()
  }
}

/**----------路由相关------- */

/**-----------api接口相关----------- */

// 获取数据
const initGetScreenData = async () => {
  state.loadingText = '正在加载中...'
  const params = { id: route.params.id }
  const [err, res] = await datavisApi.resource.getById(params)
  if (err) {
    state.loadingText = ''
    return
  }
  state.pageObject = res
  const url = datavisApi.fileService + res.url
  const [fileErr, fileRes] = await datavisApi.file.getFile(url)
  if (fileErr) {
    state.loadingText = ''
    return
  }
  const reader = new FileReader()
  reader.onloadend = e => {
    const parseData = JSON.parse(e.target?.result as string)
    graphString = JSON.stringify(omit(parseData, ['info'])) // 更新全局变量图纸数据
    datavisEditorRef.value.exposeImportData(parseData)
    state.loadingText = ''
  }
  reader.readAsText(fileRes.data, 'utf-8')
  state.loadingText = ''
}

// 保存图纸
const handleSaveData = async () => {
  let saveSuccess = false // 保存是否成功
  state.loadingText = '正在保存中...'
  const { pageData, image } = await datavisEditorRef.value.exposeGetSaveData()
  const fileFullName = route.params.id
  const content = JSON.stringify(pageData)
  const jsonFile = new File([content], `${fileFullName}.json`, {
    type: 'text/json'
  })
  const thumbnail = base64ToFile(image, fileFullName.toString())
  const filePathMaps: any = {
    screen: 'datavis/screen',
    component: 'datavis/component',
    market: 'datavis/market'
  }
  const files = [jsonFile, thumbnail]
  const [uploadErr, uploadRes]: any = await datavisApi.file.uploadFiles(files, {
    folder: filePathMaps[state.screenType],
    isCover: true
  })
  if (!uploadErr) {
    const { urls } = uploadRes
    const params = {
      ...state.pageObject,
      url: urls[0],
      thumbnail: urls[1]
    }
    const [err] = await datavisApi.resource.save(params)
    if (!err) {
      useMessage.success('保存成功')
      saveSuccess = true
      graphString = JSON.stringify(omit(pageData, ['info'])) // 更新全局变量图纸数据
    }
  }

  state.loadingText = ''
  return saveSuccess
}

/**-----------api接口相关----------- */

watch(
  () => route.path,
  () => {
    initGetScreenData()
  }
)

// 处理页面隐藏事件，如切换标签页、页面最小化等，将当前内容写到预览数据中
const handleVisibilityChange = async () => {
  if (document.visibilityState === 'hidden') {
    const pageData = await datavisEditorRef.value.exposeExportData()
    localforage.setItem(previewStroageKey, JSON.stringify(pageData))
  }
}

const handleEditorReady = (datavisEditor: any) => {
  if (route.query.screenType) {
    state.screenType = route.query.screenType as any
  }
  initGetScreenData()
  document.addEventListener('visibilitychange', handleVisibilityChange)
}

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>
