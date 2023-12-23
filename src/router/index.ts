import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import type { IModuleType } from './types'

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', {
  eager: true,
})

// 通过 glob 动态导入路由模块
const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce(
  (list: RouteRecordRaw[], key: string) => {
    const mod = modules[key].default ?? {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    return [...list, ...modList]
  },
  [],
)

// 路由排序
function sortRoute(a, b) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
}

routeModuleList.sort(sortRoute)

const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard',
  meta: {
    title: 'Root',
  },
}

const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
}

const constantRouter: RouteRecordRaw[] = [
  LoginRoute,
  RootRoute,
  ...routeModuleList,
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from, next) => {
  const token = storage.get(ACCESS_TOKEN)
  if (to.path === '/login' && token) {
    next('/dashboard')
    return
  }
  next()
})

router.afterEach((to) => {
  document.title = (to?.meta?.title as string) || document.title
})

export default router
