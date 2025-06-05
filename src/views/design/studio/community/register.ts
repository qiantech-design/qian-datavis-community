// 注册样式
import './style/index.scss'

// 头部
import headerToolbar from './components/headerToolbar/index.vue'
import layerBar from './components/layerBar/index.vue'
import contextmenuBar from './components/contextmenuBar/index.vue'
import zoomBar from './components/zoomBar/index.vue'

// 组件
import componentBar from './components/componentBar/index.vue'
import imagePickerDialog from './components/imagePickerDialog/index.vue'
import searchDialog from './components/searchDialog/index.vue'
import backDialog from './components/backDialog/index.vue'
import tableExcel from './components/tableExcel/index.vue'
import tableDataDialog from './components/tableDataDialog/index.vue'

import systemResourceDialog from './components/systemResourceDialog/index.vue'

import settingBar from './components/settingBar/index.vue'

import customComponents from './packages/install'

const componentList = [
  headerToolbar,
  layerBar,
  contextmenuBar,
  zoomBar,
  componentBar,
  settingBar,
  // 弹窗
  systemResourceDialog,
  searchDialog,
  backDialog,
  imagePickerDialog,
  tableDataDialog,
  // 组件
  tableExcel
]

// 打包为组件使用
export default {
  install(App: any) {
    componentList.forEach((item: any) => {
      App.component(item.name, item)
    })
    App.use(customComponents)
  }
}
