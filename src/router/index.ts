import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { PageEnum } from '@/enums/pageEnum'
import type { IModuleType } from './types'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import remainingRouter from './modules/remaining'

const modules = import.meta.glob<IModuleType>(
  ['./modules/**/*.ts', '!./modules/**/remaining.ts'],
  {
    eager: true,
  },
)

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

export const asyncRoutes = [...routeModuleList]

export const constantRouter: RouteRecordRaw[] = remainingRouter

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter.concat(asyncRoutes),
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

const LOGIN_PATH = PageEnum.BASE_LOGIN
// 路由白名单
const whitePathList = [LOGIN_PATH]

router.beforeEach(async (to, from, next) => {
  if (whitePathList.includes(to.path as PageEnum)) {
    next()
    return
  }

  const token = storage.get(ACCESS_TOKEN)
  if (!token) {
    if (to.meta.ignoreAuth) {
      next()
      return
    }

    const redirectData: {
      path: string
      replace: boolean
      query?: Recordable<string>
    } = {
      path: LOGIN_PATH,
      replace: true,
    }
    if (to.path) {
      redirectData.query = {
        redirect: to.path,
      }
    }

    next(redirectData)
    return
  }

  const asyncRouteStore = useAsyncRouteStore()

  if (asyncRouteStore.getIsDynamicRouteAdded) {
    next()
    return
  }
  asyncRouteStore.setRouters(asyncRoutes)
  next()
})

// 路由后置钩子
router.afterEach((to) => {
  // 设置文档标题
  document.title = (to?.meta?.title as string) || document.title
})

export default router
