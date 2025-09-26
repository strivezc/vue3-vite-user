import request from '@/utils/request'

export function courseUnit(data) {
  return request({
    url: '/resource/course/courseUnit',
    method: 'post',
    data
  })
}
export function unitVideo(data) {
  return request({
    url: '/resource/course/unitVideo',
    method: 'post',
    data
  })
}
export function lessonVideo(data) {
  return request({
    url: '/resource/learn/lessonVideo',
    method: 'post',
    data,
  })
}
export function querySubjectList(data) {
  return request({
    url: '/resource/learn/querySubjectList',
    method: 'post',
    data
  })
}
export function recentStudyBySubjectType(data) {
  return request({
    url: '/resource/learn/recentStudyBySubjectType',
    method: 'post',
    data
  })
}
export function indexSubjectBySubjectType(data) {
  return request({
    url: '/resource/learn/indexSubjectBySubjectType',
    method: 'post',
    data
  })
}
export function queryGradeEditionByCondition(data) {
  return request({
    url: '/resource/learn/queryGradeEditionByCondition',
    method: 'post',
    data
  })
}
export function unitLessonListByCondition(data) {
  return request({
    url: '/resource/learn/unitLessonListByCondition',
    method: 'post',
    data
  })
}
export function videoRecord(data) {
  return request({
    url: '/resource/learn/videoRecord',
    method: 'post',
    data
  })
}
export function queryCheckInCalendar(data) {
  return request({
    url: '/crm/studyReport/queryCheckInCalendar',
    method: 'post',
    data
  })
}
export function queryLearningSummary(data) {
  return request({
    url: '/crm/studyReport/queryLearningSummary',
    method: 'post',
    data,
    hideMessage:true
  })
}
export function view(data) {
  return request({
    url: '/resource/learn/view',
    method: 'post',
    data,
    hideMessage:true
  })
}
