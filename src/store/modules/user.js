import { login, logout,userLogin } from '@/api/login'
import { queryUserInfo} from '@/api/user'
import { getToken, setToken, removeToken, removeUserName, setUserName } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    avatar: defAva,
    imgUrl:'',
    gradeId:'',
    gradeName:'',
    isMemberUser:'',
    isSetPwd:'',
    memberEndTime:'',
    aiMemberEndTime:'',
    isAiMemberUser:'',
    phone:'',
    termId:'',
    termName:'',
    userName:'',
    isLogin:false,
  }),
  actions: {
    // 登录
    login(userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            this.token = res.data.token
            setToken(this.token)
            this.queryUserInfo().then(()=>{
              resolve(res.data)
            })
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取个人资料
    queryUserInfo(){
      return new Promise((resolve) => {
        queryUserInfo()
          .then(({data}) => {
            this.imgUrl=data.imgUrl
            this.gradeId=data.gradeId
            this.gradeName=data.gradeName
            this.isMemberUser=data.isMemberUser
            this.isSetPwd=data.isSetPwd
            this.memberEndTime=data.memberEndTime
            this.aiMemberEndTime=data.aiMemberEndTime
            this.isAiMemberUser=data.isAiMemberUser
            this.phone=data.phone
            this.termId=data.termId
            this.termName=data.termName
            this.userName = data.userName
            this.isLogin=true
            setUserName(data.userName)
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    },
    // 账号密码登录
    loginWidthAccount(userInfo) {
      return new Promise((resolve, reject) => {
        userLogin(userInfo)
          .then((res) => {
            const token = res.data.token
            this.token = token
            // this.userName = res.data.userName
            // setUserName(res.data.userName)
            setToken(token)
            // resolve(res.data)
            this.queryUserInfo().then(()=>{
              resolve(res.data)
            })
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.resetToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    resetToken() {
      return new Promise((resolve) => {
        this.gradeId=''
        this.termId=''
        this.token = ''
        this.isLogin=false
        this.userName = ''
        removeToken()
        removeUserName()
        resolve()
      })
    }
  }
})

export default useUserStore
