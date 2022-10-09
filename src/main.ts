import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { i18n } from '@/i18n/index'
import '@/static/styles/index.scss'
import './mock/index.ts'
import installIcons from '@/static/icons'

const app = createApp(App)
installIcons(app)
app.use(router)
app.use(store)
app.use(ElementPlus, { locale: { i18n: i18n.global.t } })
app.use(i18n)
app.mount('#app')
