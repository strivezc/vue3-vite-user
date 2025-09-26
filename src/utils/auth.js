import Cookies from 'js-cookie'

const TokenKey = 'token'
const RequestPath = 'requestPath'
const TalkId = 'talkId'
const UserName = 'userName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setRequestPath(requestPath) {
  return Cookies.set(RequestPath, requestPath)
}
export function getRequestPath() {
  return Cookies.get(RequestPath)
}
export function setTalkId(talkId) {
  return Cookies.set(TalkId, talkId)
}
export function getTalkId() {
  return Cookies.get(TalkId)
}
export function removeTalkId() {
  return Cookies.remove(TalkId)
}
export function setUserName(userName) {
  return Cookies.set(UserName, userName)
}
export function getUserName() {
  return Cookies.get(UserName)
}
export function removeUserName() {
  return Cookies.remove(UserName)
}
