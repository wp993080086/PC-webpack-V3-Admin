/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory, RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { i18n } from '@/i18n'
import { TScrollPositionNormalized } from './router'

// 批量导入routes
function importAll(webpackContext: __WebpackModuleApi.RequireContext) {
  return webpackContext.keys().map(fileUrl => {
    const body = webpackContext(fileUrl).default
    return body
  })
}

const files = importAll(require.context('./routers/', true, /\.ts$/))
const allRouters = Array<RouteRecordRaw>()
// eslint-disable-next-line
for (const key in files) {
  const defaultArr = files[key] as RouteRecordRaw
  if (Array.isArray(defaultArr)) {
    allRouters.push(...defaultArr)
  }
}

const routerInstance = createRouter({
  history: createWebHistory(),
  routes: allRouters,
  scrollBehavior(to: RouteLocationNormalized, _: RouteLocationNormalizedLoaded, savedPosition: TScrollPositionNormalized | null) {
    if ((to.meta.savedPosition as boolean) && savedPosition) {
      return savedPosition
    }
    return {
      left: 0,
      top: 0
    }
  }
})

routerInstance.beforeEach((to, _, next) => {
  const meta = to.meta as TRouterMeta
  if (meta) {
    document.title = `${i18n.global.t(meta.title)} - admin`
  }
  next()
})

export default routerInstance
