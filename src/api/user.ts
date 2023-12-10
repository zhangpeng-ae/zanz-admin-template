import http from '@/utils/http'

export function login(data: object) {
  return http.post('/login', data)
}

export function getUserInfo() {
  return http.get('/user/info')
}
