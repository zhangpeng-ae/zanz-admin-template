import { defineStore } from 'pinia'
import { RESEETSTORE } from '@/utils/reset'
import { getUserInfo, login } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null,
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    async GetInfoAction() {
      const result = await getUserInfo()
      console.log(
        '%c [ result ]-20',
        'font-size:13px; background:pink; color:#bf2c9f;',
        result,
      )
    },
    resetUser() {
      RESEETSTORE()
    },
  },
  // 为true，user这个store中的state数据将缓存到localStorage
  persist: true,
})
