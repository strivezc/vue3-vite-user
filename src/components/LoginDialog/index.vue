<template>
  <el-dialog v-model="dialogVisible" :show-close="false" :before-close="close" @open="open" :closeOnClickModal="false"
    width="500px">
    <div class="container">
      <img src="@/assets/images/close.png" @click="close" class="close" alt="" />
      <div class="title-wrap">
        <span @click="changeLoginType(1)" class="mr-29 pointer"
          :class="{ 'active': state.loginType === 1 }">验证码登录注册</span>
        <span @click="changeLoginType(2)" class="pointer" :class="{ 'active': state.loginType === 2 }">账号登录</span>
      </div>
      <el-form :model="form" :rules="formRules" ref="ruleFormRef">
        <el-form-item prop="phone">
          <el-input placeholder="输入您的手机号码" maxlength="11" class="input" v-model="form.phone">
            <template #prefix>
              <img src="@/assets/images/phone.png" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="kaptcha" v-if="props.needCaptcha && state.showCaptcha && state.loginType === 1">
          <el-input placeholder="输入图形验证码" maxlength="4" class="input" v-model="form.kaptcha">
            <template #prefix>
              <img src="@/assets/images/code.png" />
            </template>
            <template #suffix>
              <img class="send_code" :src="state.kaptchaUrl" alt="图形验证码" @click="getGraphicalCaptcha" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verificationCode" v-if="state.loginType === 1">
          <el-input placeholder="输入短信验证码" maxlength="6" class="input" v-model="form.verificationCode">
            <template #prefix>
              <img src="@/assets/images/phoneCode.png" />
            </template>
            <template #suffix>
              <span class="code" @click="handleGetVerificationCode" v-show="state.countdown === 0">获取验证码</span>
              <span class="code time" v-show="state.countdown > 0">{{ state.countdown }}S</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" v-else>
          <el-input placeholder="输入您的账号密码" class="input" type="password" v-model="form.password">
            <template #prefix>
              <img src="@/assets/images/password.png" />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="button" :style="disable ? 'opacity: 0.3' : ''" @click="submit">{{ state.loginType === 1 ? '登录注册' :
        '登录' }}
      </div>
      <!--      <div class="button" @click="submit">免费领取</div>-->
      <div class="check-warp">
        <img src="@/assets/images/gouxuan2.png" v-show="!state.agree" @click="changeAgree" class="check" alt="" />
        <img src="@/assets/images/gouxuan1.png" v-show="state.agree" @click="changeAgree" class="check" alt="" />
        <div class="tip">
          <span @click="changeAgree">我已阅读并同意</span><span class="blue"
            @click.prevent="openAgreement(2)">《用户协议》</span><span class="blue"
            @click.prevent="openAgreement(3)">《隐私协议》</span>
          <span class="blue" @click.prevent="openAgreement(4)">《儿童隐私协议》</span>；<span
            @click="changeAgree">未注册的手机号码将自动注册</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { validPhone } from '@/utils/validate'

const { proxy } = getCurrentInstance()
import useUserStore from '@/store/modules/user'

const props = defineProps({
  needCaptcha: {
    type: Boolean,
    default: true
  }
})

const userStore = useUserStore()
const dialogVisible = ref(false)
const emit = defineEmits(['submit', 'agreement', 'loginAction'])
const TIME_COUNT = 60

const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号码!'))
  } else if (!validPhone(value)) {
    callback(new Error('手机号格式不正确!'))
  } else {
    callback()
  }
}
const state = reactive({
  agree: false,
  countdown: 0,
  timer: null,
  imgBase64: '',
  code: '',
  loginType: 1,// 1.验证码登录 2.账号密码登录
  centreMsg: 2,
  showCaptcha: false, // 控制是否显示图形验证码
  kaptchaUrl: '' // 存储图形验证码图片地址
})
const form = ref({
  phone: '',
  platformType: 1,
  password: '',
  registrSource: 7,
  verificationCode: '',
  kaptcha: '', // 添加图形验证码字段
  scene: 1 // 添加场景字段，默认为登录场景
})
const formRules = ref({
  phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
  verificationCode: [{ required: true, trigger: 'blur', message: '请填写手机验证码!' }],
  password: [{ required: true, trigger: 'blur', message: '请填写密码!' }],
  pictureCode: [{ required: true, trigger: 'blur', message: '请填写图形验证码!' }],
  kaptcha: [{ required: true, trigger: 'blur', message: '请填写图形验证码!' }]
})
const ruleFormRef = ref()

function changeLoginType(type) {
  if (type === state.loginType) return
  state.loginType = type
  form.value.verificationCode = ''
  form.value.password = ''
  form.value.kaptcha = ''
  state.showCaptcha = false
}
const disable = computed(() => {
  if (state.loginType === 1) {
    const baseCondition = form.value.phone && form.value.verificationCode && state.agree;
    return props.needCaptcha ? !(baseCondition && form.value.kaptcha) : !baseCondition;
  } else {
    return !(form.value.phone && form.value.password && state.agree)
  }
})
function openAgreement(type) {
  emit('agreement', type)
}
watch(() => form.value.phone, (newVal) => {
  if (props.needCaptcha && state.loginType === 1 && validPhone(form.value.phone) && newVal) {
    getGraphicalCaptcha();
  }
})

const handleGetVerificationCode = () => {
  if (!validPhone(form.value.phone)) {
    proxy.$message.error('请输入正确的手机号码');
    return;
  }

  if (props.needCaptcha && !state.showCaptcha) {
    getGraphicalCaptcha();
  } else {
    sendCode();
  }
}

const getGraphicalCaptcha = async () => {
  if (!form.value.phone) {
    proxy.$message.error('请先输入手机号码')
    return
  }
  try {
    const { data } = await proxy.$http.user.generateGraphicalCaptcha({
      phone: form.value.phone,
      scene: form.value.scene
    })
    state.kaptchaUrl = data.kaptchaUrl
    state.showCaptcha = true
  } catch (e) {
    console.log(e, 'error')
  }
}

function changeAgree() {
  state.agree = !state.agree
}
function open() {
  dialogVisible.value = true
  state.showCaptcha = false
  if (props.needCaptcha) {
    form.value.kaptcha = ''
  }
}

function close() {
  ruleFormRef.value.resetFields()
  state.agree = ''
  state.showCaptcha = false
  clearTimer()
  dialogVisible.value = false
}

function submit() {
  if (disable.value) return
  ruleFormRef.value.validate(async valid => {
    if (valid) {
      try {
        state.loading = true
        if (state.loginType === 1) {
          userStore.login(form.value).then(data => {
            state.loading = false
            close()
            emit('loginAction', data)
          })
        } else if (state.loginType === 2) {
          userStore.loginWidthAccount(form.value).then(data => {
            state.loading = false
            close()
            emit('loginAction', data)
          })
        }
      } catch (e) {
        state.loading = false
        console.log(e, 'error')
      }
    }
  })
}
const queryNewCode = async () => {
  await proxy.$http.user.queryNewCode(form.value.phone)
}
const sendCode = async () => {
  if (state.timer) return
  await ruleFormRef.value.validateField('phone', async (val) => {
    if (val) {
      try {
        if (props.needCaptcha) {
          // 需要图形验证码
          if (!form.value.kaptcha) {
            proxy.$message.error('请输入图形验证码')
            return
          }
          await proxy.$http.user.checkImgCodeAndSendCode({
            kaptcha: form.value.kaptcha,
            phone: form.value.phone,
            scene: form.value.scene
          })
        } else {
          // 不需要图形验证码，使用原有接口
          await proxy.$http.user.sendPhoneSmsCode(form.value.phone, 1)
        }
        // await proxy.$http.user.queryNewCode(form.value.phone)
        state.countdown = TIME_COUNT // 短信验证码倒数
        state.timer = setInterval(() => {
          if (state.countdown > 0 && state.countdown <= TIME_COUNT) {
            state.countdown--
          } else {
            clearTimer()
          }
        }, 1000)
      } catch (e) {
        console.log(e, 'error')
      }
    }
  })
}

function clearTimer() {
  clearInterval(state.timer)
  state.countdown = 0
  state.timer = null
}

defineExpose({ open, close })

onUnmounted(() => {
  clearTimer()
})

</script>

<style scoped lang="scss">
.container {
  font-family: PingFang SC, PingFang SC;
  position: relative;
  width: 500px;
  min-height: 410px;
  max-height: 488px;
  background: #ffffff;
  border-radius: 24px;

  .close {
    position: absolute;
    top: 0;
    right: -90px;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }

  .title-wrap {
    display: flex;
    align-items: center;
    padding-left: 51px;
    margin: 0 auto 20px;
    padding-top: 40px;
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 26px;
    color: #999999;
    line-height: 40px;
    text-align: center;

    .mr-29 {
      margin-right: 29px;
    }

    .active {
      color: #0087FF;
    }

    .pointer {
      cursor: pointer;
    }
  }

  .input {
    position: relative;
    margin: auto;
    width: 404px;
    height: 60px;

    .code {
      display: block;
      position: absolute;
      right: 35px;
      top: 50%;
      transform: translateY(-50%);
      width: 100px;
      cursor: pointer;
      font-size: 20px;
      font-weight: 400;
      color: #0087ff;
      line-height: 36px;
      text-align: center;
    }

    .send_code {
      display: block;
      position: absolute;
      right: 25px;
      top: 50%;
      transform: translateY(-50%);
      width: 110px;
      height: 50px;
      cursor: pointer;
      border-radius: 4px;
    }

    .time {
      color: #999999;
    }
  }

  .button {
    width: 399px;
    height: 60px;
    background: #0087FF;
    border-radius: 60px 60px 60px 60px;
    font-size: 24px;
    font-weight: 500;
    color: #ffffff;
    line-height: 60px;
    margin: 20px auto 20px;
    text-align: center;
    cursor: pointer;
  }

  .tip {
    font-size: 14px;
    font-weight: 400;
    color: #909399;
    line-height: 16px;
    padding-bottom: 40px;
    width: 350px;
  }

  .blue {
    color: #0087ff;
    cursor: pointer;
  }

  .check-warp {
    height: 56px;
    display: flex;
    justify-content: center;

    .check {
      width: 28px;
      height: 28px;
      cursor: pointer;
      margin-right: 5px;
    }
  }
}
</style>
