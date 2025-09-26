import request from '@/utils/request'

export function queryOWMemberPackageList(data) {
  return request({
    url: `/crm/memberPackage/queryOWMemberPackageList`,
    method: 'post',
    data: data
  })
}

export function queryUserMemberIntroduce() {
  return request({
    url: `/crm/memberPackage/queryUserMemberIntroduce`,
    method: 'get',
  })
}
export function queryUserAiMemberIntroduce() {
  return request({
    url: '/crm/memberPackage//queryUserAiMemberIntroduce',
    method: 'get'
  })
}
export function queryUserUnionMemberIntroduce() {
  return request({
    url: '/crm/memberPackage/queryUserUnionMemberIntroduce',
    method: 'get'
  })
}
export function queryUserMemberIntroduceById(data) {
  return request({
    url: '/crm/memberPackage/queryUserMemberIntroduceById',
    method: 'post',
    data: data
  })
}
export function queryMemberPackageTypeNumList(data) {
  return request({
    url: '/crm/memberPackage/queryMemberPackageTypeNumList',
    method: 'post',
    data: data
  })
}