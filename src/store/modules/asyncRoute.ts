import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { constantRouter } from '@/router/index'
import { storage } from '@/utils/Storage'

export interface IAsyncRouteState {
  menus: any[]
  routers: any[]
  isDynamicRouteAdded: boolean
}

export const useAsyncRouteStore = defineStore('appAsyncRoute', {
  state: (): IAsyncRouteState => ({
    menus: storage.get('menus', []),
    routers: constantRouter,
    isDynamicRouteAdded: storage.get('isDynamicRouteAdded', false),
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    setIsDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
      storage.set('isDynamicRouteAdded', added)
    },
    setMenus(menus: RouteRecordRaw[]) {
      this.menus = menus
      storage.set('menus', menus)
    },
    // 设置动态路由
    setRouters(routers: RouteRecordRaw[]) {
      this.routers = constantRouter.concat(routers)
      this.setMenus(routers)
      this.setIsDynamicRouteAdded(true)
    },
  },
})
