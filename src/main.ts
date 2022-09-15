import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import './static/styles/reset.css'
import './static/styles/common.scss'
import './themes/element-reset.scss'
import './themes/animation.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
