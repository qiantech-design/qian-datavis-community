import { createApp } from 'vue'
import App from './App.vue'

import { registerDatavis } from '@/plugins/datavis'

import { registerRouter } from '@/router'
function appInit() {
  const app = createApp(App)
  registerRouter(app)
  registerDatavis(app)
  app.mount('#main')
}
appInit()
