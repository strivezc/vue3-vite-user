<template>
  <div class="header-wrap">
    <div class="header">
      <div class="left">
        <img src="@/assets/images/logo.png" alt="" class="header-icon">
        <p class="header-title">跟名师高效学同步</p>
        <div class="center">
          <router-link :to="{ path: item.path }" class="text" v-for="(item, index) in webList" :key="index"
            :class="{ 'active': (path === '/' && item.path === '/') || path.startsWith(item.path) && item.path !== '/' }">
            {{ item.name }}
          </router-link>

        </div>
      </div>
      <div class="right" @click="login" v-if="!isLogin">
        登录/注册
      </div>
      <div class="name-wrap" v-else>
        <el-dropdown @command="handleClick">
          <div class="name">
            <span>{{ userName }}</span>
            <img src="@/assets/images/arrow.png" class="arrow" alt="">
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="1">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <img :src="imgUrl ? imgUrl : avatar" @click="toCenter" class="avatar" alt="">
      </div>
    </div>
    <loginDialog ref="loginRef" class="login-class" @agreement="openAgreement" @loginAction="loginAction"></loginDialog>
    <agreement ref="agreementRef" class="dialog-class"></agreement>
  </div>
</template>

<script setup>
import LoginDialog from '@/components/LoginDialog'
import Agreement from '@/components/Agreement'
import avatar from '@/assets/images/avatar.png'
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/modules/user'

const route = useRoute()
const userStore = useUserStore()
const imgUrl = computed(() => userStore.imgUrl)
const { proxy } = getCurrentInstance()
const isLogin = computed(() => userStore.isLogin)
const userName = computed(() => userStore.userName)
const constantWebList = [
  { name: '首页', path: '/' },
  // { name: '会员', path: '/member' },
  // { name: '同步课程', path: '/learning-hall' },
]
const webListNeedLogin = [
  { name: '个人中心', path: '/user-center' },
]
const webList = computed(() => {
  if (isLogin.value) {
    return [...constantWebList, ...webListNeedLogin]
  } else {
    return constantWebList
  }
})
const path = ref('')
const loginRef = ref()
let agreementRef = ref()

watch(() => route.path, (newPath) => {
  path.value = newPath;
}, { immediate: true });

function toCenter() {
  proxy.$router.push('/user-center')
}
function login(flag = true) {
  loginRef.value.open()
}

function handleClick(val) {
  if (val === 1) {
    userStore.logOut().then(() => {
      // 从个人中心退出，回到首页
      proxy.$eventBus.emit('getBaseInfo') // 刷新课程页面的列表
      proxy.$eventBus.emit('queryMemberPackageList') // 刷新会员列表
      if (route.path.indexOf('user-center') > -1) {
        proxy.$router.replace('/')
      }
    })
  }
}

function openAgreement(type) {
  agreementRef.value.open(type)
}

function loginAction() {
  proxy.$eventBus.emit('getBaseInfo') // 刷新课程页面的列表
  proxy.$eventBus.emit('queryMemberPackageList') // 刷新会员列表
}

proxy.$eventBus.on('openLoginDialog', login)
onBeforeUnmount(() => {
  proxy.$eventBus.off('openLoginDialog', login)
})
</script>

<style scoped lang="scss">
.header-wrap {
  width: 100%;
  background: #ffffff;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    width: 1200px;
    margin: auto;

    .left {
      display: flex;
      align-items: center;

      .header-icon {
        width: 173px;
        height: 56px;
      }

      .header-title {
        margin-left: 26px;
        border-left: 1px solid #D9DDE5;
        padding-left: 20px;
        font-size: 20px;
        color: #666666;
        line-height: 23px;
        letter-spacing: 1px;
      }

      .center {
        display: flex;
        align-items: center;
        margin-left: 180px;

        .text {
          font-size: 20px;
          color: #3F444E;
          padding: 20px;
          cursor: pointer;
        }

        .active {
          color: #0087FF;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 130px;
      height: 44px;
      background: #0084FF;
      border-radius: 40px;
      font-size: 20px;
      color: #FFFFFF;
      cursor: pointer;
    }

    .name-wrap {
      display: flex;
      align-items: center;

      .name {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #3F444E;
        cursor: pointer;

        .arrow {
          width: 18px;
          height: 18px;
          margin-left: 4px;
        }
      }

      .avatar {
        margin-left: 8px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        object-fit: cover;
      }
    }

  }
}
</style>
