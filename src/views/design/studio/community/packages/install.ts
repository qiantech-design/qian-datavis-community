import customButton from './components/customButton/index.vue'
import customButtonProp from './components/customButton/prop.vue'

import customIframe from './components/customIframe/index.vue'
import customIframeProp from './components/customIframe/prop.vue'

import customImage from './components/customImage/index.vue'
import customImageProp from './components/customImage/prop.vue'

const components = [
  customButton,
  customButtonProp,
  customIframe,
  customIframeProp,
  customImage,
  customImageProp,
]

// 注册组件
export default {
  install(App: any) {
    components.forEach((item: any) => {
      App.component(item.name, item)
    })
  }
}
