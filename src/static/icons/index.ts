import { type App } from 'vue'
import svgIcon from '@/components/svgIcon/index.vue'

// 批量导入svg
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)

export default (app: App) => {
  app.component('svgIcon', svgIcon)
}
