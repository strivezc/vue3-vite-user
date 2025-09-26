import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/user/login/userCodeLogin',
    method: 'post',
    data
  })
}

// 登录方法
export function userLogin(data) {
  return request({
    url: '/user/login/userLogin',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/login/logout',
    method: 'get'
  })
}
