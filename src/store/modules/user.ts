import { defineStore } from 'pinia'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { login, getUserInfoApi, type LoginParams } from '@/api/system/user'

export interface UserInfoType {
  avatar: string
  id: number
  nikeName: string
  username: string
  permissions: any[]
}
export interface IUserState {
  token: string
  userInfo: UserInfoType
  permissions: any[]
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    userInfo: storage.get(CURRENT_USER, {}),
    permissions: [],
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getUserInfo(): UserInfoType {
      return this.userInfo
    },
    getPermissions(): any[] {
      return this.permissions
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    setPermissions(permissions: any[]) {
      this.permissions = permissions
    },
    async login(params: LoginParams) {
      const response = await login(params)
      const { data } = response
      if (data) {
        storage.set(ACCESS_TOKEN, data.token)
        storage.set(CURRENT_USER, data.userInfo)
        this.setToken(data.token)
        this.setUserInfo(data.userInfo)
      }

      return response
    },
    async getInfo() {
      const response = await getUserInfoApi()
      const { data } = response
      if (!data) return
      if (data.permissions && data.permissions.length) {
        const permissionsList = data.permissions
        this.setPermissions(permissionsList)
        this.setUserInfo(data)
      } else {
        throw new Error('getInfo: permissionsList must be a non-null array !')
      }
      return data
    },
    async logout() {
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
    },
  },
})
