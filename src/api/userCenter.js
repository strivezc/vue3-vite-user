import request from '@/utils/request'
// 个人中心
export function queryNewCode(phone) {
  return request({
    url: `/user/login/queryNewCode/${phone}`,
    method: 'get'
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/user/userInfo/updateUserInfo',
    method: 'post',
    data
  })
}
// 订单
export function queryMyOrderList(data) {
  return request({
    url: '/crm/order/queryMyOrderList',
    method: 'post',
    data
  })
}
export function setOrderStatus(data) {
  return request({
    url: '/crm/order/setOrderStatus',
    method: 'post',
    data
  })
}
// 兑换码
export function queryMyExchangeRecord(data) {
  return request({
    url: '/crm/exchangeCode/queryMyExchangeRecord',
    method: 'post',
    data
  })
}
export function exchangeGoods(data) {
  return request({
    url: '/crm/exchangeCode/exchangeGoods',
    method: 'post',
    data
  })
}