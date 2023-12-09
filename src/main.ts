import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

function abstract() {
  console.log('abstract')
}
abstract()

createApp(App).mount('#app')
