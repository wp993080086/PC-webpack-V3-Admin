import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { registerStore } from '@/store'
import { i18n } from '@/i18n/index'
import App from '@/App.vue'
import router from '@/router'
import '@/static/styles/index.scss'
import './mock/index.ts'
import installIcons from '@/static/icons'
import pddBox from '@/components/layout/box.vue'

const app = createApp(App)
installIcons(app)
app.component('pddBox', pddBox)
app.use(router)
app.use(createPinia())
// 注册pinia状态管理库
registerStore()
app.use(ElementPlus, { locale: { i18n: i18n.global.t } })
app.use(i18n)
app.mount('#app')
