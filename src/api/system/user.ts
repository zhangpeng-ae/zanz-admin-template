import { type ResultData } from '@/utils/http'

export interface LoginParams {
  username: string
  password: string
}

interface LoginResultData {
  token: string
  userInfo: {
    id: number
    username: string
    nickname: string
    avatar: string
  }
}

export function login(
  data: LoginParams,
): Promise<ResultData<LoginResultData | null>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data && data.username === 'admin' && data.password === '123456') {
        resolve({
          code: 200,
          data: {
            token: '1234567890',
            userInfo: {
              id: 1,
              username: 'admin',
              nickname: '管理员',
              avatar: 'https://avatars.githubusercontent.com/u/21073039?v=4',
            },
          },
          message: 'success',
        })
      } else {
        resolve({
          code: 400,
          data: null,
          message: '用户名或密码错误',
        })
      }
    }, 500)
  })
}
