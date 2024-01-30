import { type ResultData } from '@/utils/http'
import { randomToken } from '@/utils/index'

export interface LoginParams {
  username: string
  password: string
}

interface UserInfoType {
  id: number
  username: string
  nickname: string
  avatar: string
  permissions: {
    label: string
    value: string
  }[]
}

interface LoginResultData {
  token: string
  userInfo: UserInfoType
}

// 当权角色菜单权限
const permissions = [
  {
    label: '主控台',
    value: 'dashboard_console',
  },
  {
    label: '工作台',
    value: 'dashboard_workplace',
  },
  {
    label: '菜单权限管理',
    value: 'system_menu',
  },
  {
    label: '角色权限管理',
    value: 'system_role',
  },
]

/**
 * 登录
 */
export function login(
  data: LoginParams,
): Promise<ResultData<LoginResultData | null>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data && data.username === 'admin' && data.password === '123456') {
        const token = randomToken()
        resolve({
          code: 200,
          data: {
            token,
            userInfo: {
              id: 1,
              username: 'admin',
              nickname: '管理员',
              avatar: 'https://avatars.githubusercontent.com/u/21073039?v=4',
              permissions,
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

/**
 * 获取用户信息
 */
export function getUserInfoApi(): Promise<ResultData<UserInfoType | null>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: 1,
          username: 'admin',
          nickname: '管理员',
          avatar: 'https://avatars.githubusercontent.com/u/21073039?v=4',
          permissions,
        },
        message: 'success',
      })
    }, 500)
  })
}
