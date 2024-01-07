import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router'
import Pinia from '@/store'
import ElementPlus from 'element-plus'
import RegisterGlobComp from '@/components'

import '@/styles/reset.scss'
import '@/styles/index.scss'
import '@/styles/tailwind.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

import 'virtual:svg-icons-register'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(Pinia)
app.use(Router)
app.use(RegisterGlobComp)
app.use(ElementPlus)

app.mount('#app')
