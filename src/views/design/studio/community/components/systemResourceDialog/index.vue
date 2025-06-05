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
      </div>
    </div>

    <div class="tabs-scroll-wrapper" :class="{ 'none-shadow': !state.lv3Key }" v-if="state.lv1Key">
      <el-scrollbar max-height="85px">
        <div class="text-wrap">
          <div class="text" v-for="item in state.lv2Tabs" :key="item.id" :class="{ active: state.lv2Key === item.id }" @click="handleLv2Change(item)">
            {{ item.name }}
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="tabs-scroll-wrapper none-shadow" v-if="state.lv2Key && state.lv3Tabs.length">
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
        </div>
      </el-scrollbar>
    </div>
    <div class="scrollbar-wrap">
      <el-scrollbar>
        <div class="list" ref="listRef">
          <div
            class="list-item"
            v-for="item in state.dataList"
            :key="item.id"
            :draggable="canDropToCanvas"
            @dragstart="handleDragStart($event, item)"
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
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, useAttrs, computed, inject } from 'vue'
import { eventTypes, pageOperationTypes, errorImgUrl } from '../../utils/index'
import datavisApi from '@/api/datavisApi'
import { useEventListener } from '@vueuse/core'
import { ElMessageBox } from 'element-plus'
import { debounce } from 'lodash-es'
import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()
const componentName = 'systemResourceDialog'
defineOptions({ name: componentName })
const attrs = useAttrs()
const popupEl = inject('popupEl')
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
  typeList: [
    { value: 200, label: '模块' },
    { value: 310, label: '素材' },
    { value: 600, label: '模板' }
  ]
})

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
  const params = { parent_id: '', sortBy: 'sort', sortOrder: 'desc', keyword: state.keyword }
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
    const params = { parent_id: item.id, type: item.type, sortBy: 'sort', sortOrder: 'desc', keyword: state.keyword }
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
    state.dataList = data.filter((a: any) => !state.keyword || a.name.includes(state.keyword))
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
  const content = JSON.stringify(data)
  if (e.dataTransfer) {
    e.dataTransfer.setData('datavisData', content)
  }
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

// 覆盖大屏，会清空原大屏再导入大屏数据

const handleCoverScreen = (row: any) => {
  ElMessageBox.confirm('新建大屏将会覆盖当前大屏，是否继续？', '警告', {
    type: 'warning',
    appendTo: popupEl as any
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
