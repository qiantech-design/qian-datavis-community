<!-- 搜索所有子屏的图层
  功能：点击图层，会切换到对应的子屏,并选中图层(功能待完成)
-->
<template>
  <el-dialog
    v-model="visible"
    class="datavis-search-dialog"
    center
    top="10vh"
    width="336px"
    :close-on-click-modal="true"
    :modal="false"
    :show-close="false"
  >
    <el-input placeholder="请输入名称搜索组件、图层" ref="searchInputRef" v-model="keyWord" @input="handleSearch">
      <template #prefix>
        <visui-icon name="ele-search"></visui-icon>
      </template>
    </el-input>
    <el-scrollbar class="datavis-search-dialog-body" max-height="500px">
      <div class="datavis-search-dialog-list" v-for="(item, index) in componentFilterData" :key="index" v-show="item.list.length > 0">
        <div class="datavis-search-dialog-type">{{ item.label }}</div>
        <div
          class="datavis-search-dialog-item"
          :class="{ mask: !it.isAuth }"
          v-for="(it, idx) in item.list"
          @click="handleObjectClick(it)"
          :key="idx"
        >
          <div class="datavis-search-item-img">
            <img v-if="it.image" :src="it.image" alt="" />
            <i v-else class="iconfont-bi icon-datavis-fenleiguanli"></i>
          </div>
          <div class="datavis-search-item-name">{{ it.title }}</div>
          <span class="lock-mask" title="暂无使用权限">
            <visui-icon class="mask-icon" name="ele-lock"></visui-icon>
          </span>
        </div>
      </div>
      <div class="datavis-search-dialog-list" v-for="(item, index) in layerFilterData" :key="index" v-show="item.list.length > 0">
        <div class="datavis-search-dialog-type">{{ item.label }}</div>
        <div class="datavis-search-dialog-item" v-for="(it, idx) in item.list" @click="handleLayerClick(it)" :key="idx">
          <div class="datavis-search-item-img">
            <img v-if="it.image" :src="it.image" alt="" />
            <i v-else class="iconfont-bi icon-datavis-fenleiguanli"></i>
          </div>
          <div class="datavis-search-item-name">{{ it.name }}</div>
          <span class="lock-mask" title="暂无使用权限">
            <visui-icon class="mask-icon" name="ele-lock"></visui-icon>
          </span>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { debounce } from 'lodash-es'
import { eventTypes, operationTypes, pageOperationTypes } from '../../utils/index'
import datavisApi from '@/api/datavisApi'

const componentName = 'searchDialog'
defineOptions({ name: componentName })

interface DataNode {
  name: string
  title: string
  image?: string
  url?: string
  isAuth?: boolean
  children?: DataNode[]
}

const visible = ref(false)

const keyWord = ref('')
const editor = ref<any>()
interface ComponentObj {
  label: string
  value: string
  icon: string
  list: any[]
}

const componentFilterData = ref<ComponentObj[]>([
  {
    label: '组件',
    value: 'component',
    icon: 'el-icon-s-data',
    list: []
  }
])

const layerFilterData = ref<ComponentObj[]>([
  {
    label: '图层',
    value: 'layer',
    icon: 'el-icon-s-data',
    list: []
  }
])

// 获取组件
interface DataNode {
  name: string
  title: string
  image?: string
  isAuth?: boolean
  children?: DataNode[]
}
const componentList = ref<DataNode[]>([])
const layerList = ref<DataNode[]>([])

// 搜索 - 只支持本地组件和图层搜索
const handleSearch = debounce(val => {
  if (val) {
    // 组件搜索
    const searchComponentData: DataNode[] = []
    componentList.value.forEach(item => {
      const regex = new RegExp(val, 'i') // 'i' 标志表示不区分大小写
      if (regex.test(item.title) || regex.test(item.name)) {
        searchComponentData.push(item)
      }
    })
    console.log('searchComponentData', searchComponentData)
    componentFilterData.value[0].list = searchComponentData
    // 图层搜索
    if (layerList.value.length) {
      const searchLayerData = layerList.value.filter((item: any) => {
        const regex = new RegExp(val, 'i')
        return regex.test(item.name) || regex.test(item.id)
      })
      layerFilterData.value[0].list = searchLayerData.reverse()
    }
  } else {
    // 恢复默认值
    componentFilterData.value.forEach(item => (item.list = []))
    layerFilterData.value.forEach(item => (item.list = []))
  }
}, 200)

// 点击组件
const handleObjectClick = (row: DataNode) => {
  // 无权限
  if (!row.isAuth) return
  // 添加组件

  const data = {
    type: 'addComponent',
    params: { name: row.name, title: row.title, url: row.url }
  }
  // 调用添加组件方法
  editor.value.fire(eventTypes.pageOperation, { type: pageOperationTypes.objectAdd, data, source: componentName })
}
// 点击图层 选中图层
const handleLayerClick = (row: any) => {
  editor.value.fire(eventTypes.coreOperation, { action: operationTypes.setSelection, param: [row.id] })
}

const searchInputRef = ref()
const handleOpenDialog = (row: any) => {
  const screen = row.screen || []
  handleLayerData(screen)
  visible.value = true
  editor.value = row.editor
  setTimeout(() => {
    searchInputRef.value.focus()
  }, 300)
}
//处理层级数据
const handleLayerData = (screen: any) => {
  const flattenTree = (tree: any) => {
    const result: any = []
    function traverse(node: any) {
      result.push(node)
      if (node.objects) {
        node.objects.forEach((child: any) => traverse(child))
      }
    }
    tree.forEach((node: any) => traverse(node))
    return result
  }
  const tempLayerData = flattenTree(screen.objects)
  layerList.value = tempLayerData
}
const handleCloseDialog = () => {
  visible.value = false
}
const handleToggleDialog = () => {
  if (visible.value) handleCloseDialog()
  else handleOpenDialog({})
}

const initGetComponentList = async () => {
  const [err, resData] = await datavisApi.component.page()
  const comAuthList = resData.pageData || []
  const flattenTree = (tree: any) => {
    const result: any = []
    function traverse(node: any) {
      if (!node.children || node.children.length === 0) {
        result.push(node)
      } else {
        node.children.forEach((child: any) => traverse(child))
      }
    }
    tree.forEach((node: any) => traverse(node))
    return result
  }

  // 如果有自定义组件，则自行拼接到 componentList中
  /**
   * 例
   */
  const allComponentList = [...comAuthList]
  const flatList = flattenTree(allComponentList)
  componentList.value = flatList
}

defineExpose({
  handleOpenDialog,
  handleCloseDialog,
  handleToggleDialog
})

onMounted(() => {
  initGetComponentList()
})
</script>
