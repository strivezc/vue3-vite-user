import request from '@/utils/request'

export function sendPhoneSmsCode(phone, scene) {
  return request({
    url: `/user/login/code/${phone}/${scene}`,
    method: 'get'
  })
}
export function generateGraphicalCaptcha(data) {
  return request({
    url: `/user/kaptcha/generateGraphicalCaptcha`,
    method: 'post',
    data,
  })
}
export function checkImgCodeAndSendCode(data) {
  return request({
    url: `/user/kaptcha/checkImgCodeAndSendCode`,
    method: 'post',
    data,
  })
}
export function queryNewCode(phone) {
  return request({
    url: `/user/login/queryNewCode/${phone}`,
    method: 'get'
  })
}

export function createOrder(data) {
  return request({
    url: '/payment/payment/createOrder',
    method: 'post',
    data,
    isRepeatSubmit: true,
  })
}

export function payOrder(data) {
  return request({
    url: '/payment/payment/payOrder',
    method: 'post',
    data,
    isRepeatSubmit: true
  })
}

export function payResult(data) {
  return request({
    url: '/payment/payment/payResult',
    method: 'post',
    data,
    hideMessage:true
  })
}
export function queryPayTypeList() {
  return request({
    url: '/payment/payment/queryPayTypeList',
    method: 'get',
  });
}

export function queryAgreementOne(data) {
  return request({
    url: `/user/setUp/queryAgreementOne`,
    method: 'post',
    data
  });
}
// 完善年级和学期信息
export function addBaseInfo(data) {
  return request({
    url: `/user/complete/addBaseInfo`,
    method: 'post',
    data
  });
}
// 获取年级和学期信息
export function baseInfo() {
  return request({
    url: `/user/complete/baseInfo`,
    method: 'get',
  });
}
export function queryUserInfo() {
  return request({
    url: `/user/userInfo/queryUserInfo`,
    method: 'get',
    hideMessage:true
  });
}
export function queryFollowUserPhone() {
  return request({
    url: `/user/setUp/queryFollowUserPhone`,
    method: 'get',
  });
}
export function queryUserCustomerServiceInfo() {
  return request({
    url: `/config/dealerUserManage/queryUserCustomerServiceInfo`,
    method: 'get'
  })
}
