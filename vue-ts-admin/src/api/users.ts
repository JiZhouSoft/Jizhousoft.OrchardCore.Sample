import request from '@/utils/request'
import { convert2FormData } from '@/utils/util'
export const getUserInfo = (data: any) =>
  request({
    url: '/connect/userinfo',
    method: 'post',
    data
  })

export const login = (username: string, password: string): Promise<any> => {
  const data: any =
  {
    username: username,
    password: password,
    // must read from config
    client_id: 'vue-ts-admin',
    client_secret: 'vue-ts-admin',
    grant_type: 'password',
    scope: 'profile email phone roles'
  }
  var res = request({
    url: '/connect/token',
    method: 'post',
    data: convert2FormData(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  return res
}

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })
