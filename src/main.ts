import { createApp } from 'vue'
import App from './App.vue'
import RegisterGlobComp from '@/components'
import ElementPlus from 'element-plus'

import 'virtual:svg-icons-register'

import './style.css'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)

app.use(RegisterGlobComp)
app.use(ElementPlus)

app.mount('#app')
