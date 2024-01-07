import { defineStore } from 'pinia'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { login, type LoginParams } from '@/api/system/user'

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
    async login(params: LoginParams) {
      const response = await login(params)
      const { data } = response
      storage.set(ACCESS_TOKEN, data.token)
      storage.set(CURRENT_USER, data.userInfo)
      this.setToken(data.token)
      this.setUserInfo(data.userInfo)
      return response
    },
  },
})
