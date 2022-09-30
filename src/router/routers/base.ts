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
    component: () => import(/* webpackChunkName: 'not-found' */ '@/views/base/not-found/index'),
    meta: {
      title: 'notFound',
      showHeader: false
    }
  },
  {
    path: baseRouter.LOGIN,
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/base/login/index.vue'),
    meta: {
      title: '登录',
      showHeader: false
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: 'demo' */ '@/views/demo/index.vue'),
    meta: {
      title: '示例',
      showHeader: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
    meta: {
      title: '首页',
      showHeader: true
    }
  }
]
