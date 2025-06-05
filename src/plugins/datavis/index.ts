import type { App } from 'vue'

/**************如果项目已经引入则注释end**************/
// elementPlus
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import elementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// elementPlus-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const registerElementPlusIcons = (app: any) => {
  const icons = ElementPlusIconsVue as any
  for (const i in icons) {
    app.component(`ele${icons[i].name}`, icons[i])
  }
}

// 大屏数据展示组件库
import DataV3 from '@newpanjing/datav-vue3'

// echart
import VueECharts from 'vue-echarts'
import './echartsImport'

// iconfont
import '@/assets/fonts/datavis/iconfont.js'

// remixicon
import 'remixicon/fonts/remixicon.css'

/**************如果项目已经引入则注释end**************/

import '@/assets/style/frame/index.scss'

// 以下文件不需要注释
// core-css
import '@/assets/js/datavis/core/index.css'

// 组件
import datavisComponent from '@/assets/js/datavis/component/index.es.js'
import '@/assets/js/datavis/component/index.css'

// 属性配置
import datavisProp from '@/assets/js/datavis/prop/index.es.js'
import '@/assets/js/datavis/prop/index.css'
// ui
import datavisUI from '@/assets/js/datavis/ui/index.es.js'
import '@/assets/js/datavis/ui/index.css'

// 注册编辑器
import registerEditor from '@/assets/js/datavis/editor/index.es.js'
import '@/assets/js/datavis/editor/index.css'

// 注册编辑器布局
import registerLayout from '@/views/design/studio/community/register'

const fontList = [
  {
    label: '系统默认',
    value: '',
    url: ''
  },
  {
    label: '数码管',
    value: 'digital',
    url: '/resource/fonts/digital/result.css'
  },
  {
    label: '苹方',
    value: 'PingFang SC',
    url: ''
  },
  {
    label: '思源黑体-常规',
    value: 'Source Han Sans CN Regular',
    url: '/resource/fonts/SourceHanSansCN-Regular/result.css'
  },
  {
    label: '优设标题黑',
    value: 'YouSheBiaoTiHei',
    url: '/resource/fonts/YouSheBiaoTiHei/result.css'
  },
  {
    label: '旁门正道体',
    value: 'PangMenZhengDao',
    url: '/resource/fonts/PangMenZhengDao/result.css'
  },
  {
    label: 'D-DIN-PRO-Regular',
    value: 'D-DIN-PRO',
    url: '/resource/fonts/D-DIN-PRO-Regular/result.css'
  },
  {
    label: 'D-DIN-PRO-Bold',
    value: 'D-DIN-PRO Bold',
    url: '/resource/fonts/D-DIN-PRO-Bold/result.css'
  }
]

export const registerDatavis = (app: App<Element>) => {
  registerElementPlusIcons(app)
  app
    .use(DataV3)
    .use(elementPlus, {
      locale: zhCn
    })
    .component('v-chart', VueECharts)
    .use(datavisComponent)
    .use(datavisProp)
    .use(datavisUI, {
      fontList
    })
    .use(registerEditor, {
      fontList
    })
    .use(registerLayout)
}
