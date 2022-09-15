/* eslint-disable */
import { baseRouter } from '@/config'

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import(/* webpackChunkName: 'not-found' */ '@/pages/base/not-found/index'),
    meta: {
      title: 'notFound',
      showHeader: false
    }
  },
  {
    path: baseRouter.LOGIN,
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/pages/base/login/index.vue'),
    meta: {
      title: '登录',
      showHeader: false
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: 'demo' */ '@/pages/demo/index.vue'),
    meta: {
      title: '示例',
      showHeader: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: 'home' */ '@/pages/home/index.vue'),
    meta: {
      title: '首页',
      showHeader: true
    }
  }
]
