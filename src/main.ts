import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router'
import Pinia from '@/store'
import RegisterGlobComp from '@/components'
import ElementPlus from 'element-plus'

import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import '@/styles/reset.scss'
import '@/styles/tailwind.css'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)

app.use(Router)
app.use(Pinia)
app.use(RegisterGlobComp)
app.use(ElementPlus)

app.mount('#app')
