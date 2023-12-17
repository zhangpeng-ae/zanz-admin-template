import http from '@/utils/http'

interface LoginParams {
  username: string
  password: string
}

export function login(data: LoginParams) {
  return http.post('/api/user/login', data)
}
