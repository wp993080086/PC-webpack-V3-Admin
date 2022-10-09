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
      title: 'message.router.notFound',
      showHeader: false
    }
  },
  {
    path: baseRouter.LOGIN,
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/base/login/index.vue'),
    meta: {
      title: 'message.router.login',
      showHeader: false
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: 'demo' */ '@/views/demo/index.vue'),
    meta: {
      title: 'message.router.demo',
      showHeader: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
    meta: {
      title: 'message.router.home',
      showHeader: true
    }
  }
]
