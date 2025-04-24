// 注册组件
import { registerFontList } from './utils/index.js'

import './style/indes.scss'

import editor from './index.vue'

// layout
import workspaceBar from './components/workspaceBar/index.vue'

import rightBar from './components/rightBar/index.vue'
import pageBar from './components/pageBar/index.vue'
import configBar from './components/configBar/index.vue'
import alignEqualBar from './components/alignEqualBar/index.vue'
import rulerBar from './components/rulerBar/index.vue'

// 属性
import propertyBar from './components/propertyBar/index.vue'
import pageConfigBar from './components/pageConfigBar/index.vue'

import eventBar from './components/eventBar/index.vue'
import dataBar from './components/dataBar/index.vue'
import alignBar from './components/alignBar/index.vue'

import signalBar from './components/signalBar/index.vue'

// settingBar
import background from './components/settingBar/component/background.vue'
import display from './components/settingBar/component/display.vue'
import filter from './components/settingBar/component/filter.vue'
import size from './components/settingBar/component/size.vue'
import toolbar from './components/settingBar/component/toolbar.vue'
import subpage from './components/settingBar/component/subpage.vue'
const componentList = [
  editor,
  workspaceBar,
  rightBar,

  pageBar,
  configBar,
  alignEqualBar,
  rulerBar,

  // 页面
  pageConfigBar,
  // 属性
  eventBar,
  propertyBar,
  dataBar,
  alignBar,
  signalBar,

  background,
  display,
  filter,
  size,
  toolbar,
  subpage
]

// 注册组件
export default {
  install(App: any, options: any) {
    componentList.forEach((item: any) => {
      App.component(item.name, item)
    })
    if (options) {
      registerFontList(options.fontList)
    }
  }
}
