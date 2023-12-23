import { defineStore } from 'pinia'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { login } from '@/api/system/user'

export interface UserInfoType {
  id: string
  username: string
  avatar?: string
  email?: string
  mobile?: string
  status?: number
  createTime?: string
  updateTime?: string
  roles?: string[]
}
export interface IUserState {
  token: string
  userInfo: UserInfoType
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    userInfo: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getUserInfo(): UserInfoType {
      return this.userInfo
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    async login(params: any) {
      const response = await login(params)
      storage.set(ACCESS_TOKEN, response.token)
      storage.set(CURRENT_USER, response.userInfo)
      this.setToken(response.token)
      this.setUserInfo(response.userInfo)
      return response
    },
  },
})
