import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import { getToken } from '@/utils/auth'
NProgress.configure({ showSpinner: false })

const whiteList = ['/','/member','/login','/learning-hall']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (useUserStore().isLogin) {
      next()
    } else {
      useUserStore().queryUserInfo().then(()=>{
        next()
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
