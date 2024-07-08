import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import * as Icons from '@element-plus/icons-vue'
import DataVVue3 from '@kjgl77/datav-vue3'
// 注册所有图标
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
Object.keys(Icons).forEach((key: string) => {
  app.component(key, (Icons as any)[key])
})
app.use(ElementPlus).use(pinia).use(router).use(DataVVue3).mount('#app')
