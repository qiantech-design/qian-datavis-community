<template>
  <el-dialog
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
    width="278"
    @open="setPosition"
  >
    <template #header>
      <div class="component-header">
        <span class="component-header-title">组件</span>
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
        <div
          class="btn"
          v-for="item in state.mainTabs"
          :key="item.name"
          :class="{ active: state.mainActive === item.name }"
          @click="handleTabChange(item.name)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="tabs-scroll-wrapper" :class="{ 'none-shadow': state.listData.length }" v-if="state.mainActive">
      <el-scrollbar max-height="85px">
        <div class="text-wrap">
          <div
            class="text"
            v-for="item in state.subTabs"
            :key="item.id"
            :class="{ active: state.subActive === item.name }"
            @click="handleSubTabChange(item)"
          >
            {{ item.title }}
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="scrollbar-wrap">
      <el-scrollbar>
        <div class="list" ref="listRef">
          <div
            class="list-item"
            v-for="item in state.listData"
            :key="item.id"
            draggable="true"
            @dragstart="handleDragStart($event, item)"
            @click="handleAddCom(item)"
          >
            <div class="item-image-box">
              <el-image :src="item.thumbnail || item.url" class="item-image" fit="contain" lazy>
                <template #error>
                  <img :src="errorImgUrl" alt="" />
                </template>
              </el-image>
            </div>
            <span class="item-text" :title="item.name">{{ item.title }}</span>
          </div>
        </div>
        <div class="dw-empty" v-if="!state.listData.length">暂无数据</div>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { eventTypes, pageOperationTypes, errorImgUrl } from '../../utils/index'
import datavisApi from '@/api/datavisApi'
import useEditor from '../../hooks/useEditor'
import { debounce } from 'lodash-es'
// 自定义
import customComponentList from '../../packages/list'

const { editor } = useEditor()

const componentName = 'componentBar'
defineOptions({ name: componentName })

const emit = defineEmits(['finish'])

const state = reactive({
  visible: false,
  keyword: '',
  dialogInit: false,
  dialogWidth: 278,
  imageHeight: 60,

  // 主类型
  mainTabs: [] as any,
  mainActive: '',
  // 副类型
  subTabs: [] as any,
  subActive: '',
  //组件列表
  listData: [] as any
})

const handleOpenDialog = () => {
  state.visible = true
}
const handleCloseDialog = () => {
  state.visible = false
}

const closeDialog = () => {
  handleCloseDialog()
  emit('finish')
}

defineExpose({
  handleOpenDialog,
  handleCloseDialog
})

// 获取组件数据
const initGetData = async () => {
  const [err, res] = await datavisApi.component.page()
  const comAuthList = res.pageData
  const allComponentList = [...comAuthList, ...customComponentList]
  state.mainTabs = allComponentList as any
  const row = allComponentList[0]
  handleTabChange(row.name)
  const imgMap = handleComponentsImgMap(allComponentList)
  editor.fire(eventTypes.componentsImgFetched, imgMap)
}

const handleComponentsImgMap = (data: any) => {
  const componentImgMap: any = {}
  const recursion = (arr: any) => {
    arr = arr || []
    arr.forEach((item: any) => {
      if (item.name && item.url) {
        componentImgMap[item.name] = item.url
      }
      if (item.children && item.children.length) {
        recursion(item.children)
      }
    })
  }
  recursion(data)
  return componentImgMap
}

const handleTabChange = (val: any) => {
  state.mainActive = val
  initSubData()
}
// 组件子类型
const handleSubTabChange = (e: any) => {
  state.subActive = e.name
  state.listData = handleListData(e)
}

const handleListData = (data: any) => {
  let listData: any = []
  if (data.name) {
    listData = data.children
  } else {
    const mainTabObj = state.mainTabs.find((v: any) => v.name === state.mainActive)
    listData = mainTabObj.children.reduce((pre: any, cur: any) => {
      if (cur.children) {
        pre.push(...cur.children)
      }
      return pre
    }, [])
  }
  return listData.filter((a: any) => !state.keyword || a.title.includes(state.keyword))
}

// 初始化tab
const initSubData = () => {
  // 模拟接口数据
  const mainTabObj = state.mainTabs.find((v: any) => v.name === state.mainActive) || { children: [] }
  let children = mainTabObj.children
  if (children.length > 1 && children[0].name !== '') {
    children.unshift({ name: '', title: '全部' })
  }
  state.subTabs = children
  state.subActive = state.subTabs[0].name
  state.listData = handleListData(state.subTabs[0])
}

const dialogRef = ref()
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

const listRef = ref()

const calcImageHeight = () => {
  const { clientWidth } = listRef.value
  const width = (clientWidth - 14 * 3) / 2
  state.imageHeight = (width * 1080) / 1920
}

// 组件事件处理
// 拖拽
const handleDragStart = (e: DragEvent, row: any) => {
  const data = {
    type: 'addComponent',
    params: row
  }
  const content = JSON.stringify(data)
  if (e.dataTransfer) {
    e.dataTransfer.setData('datavisData', content)
  }
}

// 单击 组件添加
const handleAddCom = (row: any) => {
  // 无权限
  if (!row.isAuth) return
  const data = {
    type: 'addComponent',
    params: {
      name: row.name,
      title: row.title,
      url: row.url
    },
    clearDropPosition: true
  }
  editor.fire(eventTypes.pageOperation, { type: pageOperationTypes.objectAdd, data, source: componentName })
}

const handleKeywordChange = debounce(() => {
  const subObj = state.subTabs.find((v: any) => v.name === state.subActive) || {}
  state.listData = handleListData(subObj)
}, 200)

onMounted(() => {
  initGetData()
})
</script>
