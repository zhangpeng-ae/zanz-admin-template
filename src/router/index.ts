import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
      title: '首页',
      requireAuth: true,
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/home',
    meta: {
      title: '首页',
      requireAuth: true,
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      requireAuth: false,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/401',
    meta: {
      title: '401',
      requireAuth: false,
    },
    component: () => import('@/views/error-page/401.vue'),
  },
  {
    path: '/404',
    meta: {
      title: '404',
      requireAuth: false,
    },
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
