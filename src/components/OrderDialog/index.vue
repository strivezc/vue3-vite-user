<template>
  <div>
    <el-dialog
        v-model="dialogVisible"
        :before-close="close"
        @open="open"
        title="订单确认"
        :closeOnClickModal="false"
        width="800px"
    >
      <div class="container">
        <div class="product-info">
          <div class="product-name">
            <div class="name">{{props.productInfo.packageName}}</div>
            <div class="price-wrap">
              <span class="origin" v-if="!props.isContinue">￥{{props.productInfo.marketPriceStr}}</span>
              <span class="cur">￥{{props.productInfo.memberPriceStr|| props.productInfo.payMoney}}</span>
            </div>
          </div>
          <div class="label-wrap">
            订单总价：<span class="price">${{props.productInfo.memberPriceStr || props.productInfo.payMoney}}</span>
          </div>
        </div>
        <div class="pay-method">
          <div class="left-wrap">
            <span class="label">支付方式：</span>
            <div class="pointer" @click="state.payStatus=5">
              <img src="@/assets/images/gouxuan1.png" v-show="state.payStatus===5" class="select" alt=""/>
              <img src="@/assets/images/gouxuan2.png" v-show="state.payStatus!==5" class="select" alt=""/>
              <img src="@/assets/images/icon_wechat.png" class="method" alt=""/>
              <span class="method-text">微信</span>
            </div>
            <div class="pointer" @click="state.payStatus=8">
              <img src="@/assets/images/gouxuan1.png" v-show="state.payStatus===8" class="select" alt=""/>
              <img src="@/assets/images/gouxuan2.png" v-show="state.payStatus!==8" class="select" alt=""/>
              <img src="@/assets/images/icon_alipay.png" class="method" alt=""/>
              <span class="method-text">支付宝</span>
            </div>
          </div>
          <div class="right-wrap">
            <span class="label">实付价：</span>
            <p class="active-text">￥<span class="active-num">{{props.productInfo.memberPriceStr || props.productInfo.payMoney}}</span></p>
          </div>
        </div>
        <div class="agreement-wrap">
          <div class="pointer">
            <img src="@/assets/images/gouxuan1.png" @click="state.agree=!state.agree" v-show="state.agree"
                 class="select" alt=""/>
            <img src="@/assets/images/gouxuan2.png" @click="state.agree=!state.agree" v-show="!state.agree"
                 class="select" alt=""/>
            <span>同意<span class="blue" @click="openAgreement(5)">《会员协议》</span>，虚拟产品不支持退订</span>
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <el-button type="primary" class="btn" @click="submit">支付</el-button>
      </template>
    </el-dialog>
    <el-dialog
        v-model="dialogScan"
        :show-close="false"
        :before-close="closeScan"
        @open="openScan"
        :closeOnClickModal="false"
        width="260px"
        class="dialog-class"
    >
      <div class="dialog-scan">
        <img src="@/assets/images/close2.png" @click="closeScan" class="close" alt=""/>
        <p class="text">使用{{state.payStatus===5?'微信':'支付宝'}}扫码支付</p>
        <img :src="state.prepayId" class="scan" alt=""/>
      </div>
    </el-dialog>
    <agreement ref="agreementRef" class="dialog-class"></agreement>
  </div>
</template>

<script setup>
import agreement from '@/components/Agreement'

const { proxy } = getCurrentInstance()
const dialogVisible = ref(false)
const dialogScan = ref(false)

let timer = null
let second = 0
const props = defineProps({
  productInfo: {
    type: Object,
    default() {
      return {}
    }
  },
  isContinue:{
    type: Boolean,
    default:false
  }
})
const agreementRef = ref()
const state = reactive({
  agree: false,
  payStatus: 5, // 5.微信扫码 8.支付宝扫码
  prepayId: '', // 二维码
  payCode: ''
})
const emit = defineEmits(['finish'])

function openAgreement(type) {
  state.agree = true
  agreementRef.value.open(type)
}

function openScan() {
  dialogScan.value = true
}

function closeScan() {
  dialogScan.value = false
  state.prepayId = ''
  clearInterval(timer)
  second = 0
  timer = null
}

function open() {
  dialogVisible.value = true
}

const submit = async () => {
  if (!state.agree) {
    proxy.$modal.alert('请先阅读并勾选会员协议！')
    return
  }
  try {
    let params={}
    if (props.isContinue) { // 继续支付
      params = {
        payType: state.payStatus,
        orderId:props.productInfo.orderId
      }
    } else {
      params = {
        memberPackageId: props.productInfo.id,
        payType: state.payStatus,
      }
    }
    const requestUrl=props.isContinue?proxy.$http.user.payOrder:proxy.$http.user.createOrder
    const { data } = await requestUrl(params)
    state.prepayId = data.prepayId
    state.payCode = data.payCode
    dialogScan.value = true
    checkOid()
  } catch (e) {
    console.log(e, 'error')
  }
}

function close() {
  dialogVisible.value = false
  clearInterval(timer)
  second = 0
  timer = null
}

const checkOid = async () => {
  timer = setInterval(async () => {
    if (second >= 60 * 30 * 1000) {
      // 超过30分钟订单取消
      clearInterval(timer)
      timer = null
      emit('finish', false)
    }
    second += 3000
    const { code, data } = await proxy.$http.user.payResult({ payCode: state.payCode })
    if (code == 0 && data && data.successStatus == 0) {
      // 完成支付
      clearInterval(timer)
      timer = null
      emit('finish', true)
    }
  }, 5000)
}

defineExpose({ open, close, closeScan })

onUnmounted(() => {
  clearInterval(timer)
})

</script>

<style scoped lang="scss">
  :deep(.el-dialog) {
    padding: 20px 30px;
    border-radius: 8px;
  }

  .btn {
    width: 140px;
  }

  .container {
    font-family: PingFang SC, PingFang SC;

    .product-info {
      width: 740px;
      background: #FBFBFB;
      padding: 25px 30px;

      .product-name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 30px;
        border-bottom: 1px solid #EDF1F7;

        .name {
          font-size: 16px;
          color: #333333;
          line-height: 19px;
        }

        .price-wrap {
          display: flex;
          align-items: center;
          font-size: 16px;
          line-height: 19px;

          .origin {
            color: #CCCCCC;
            text-decoration: line-through;
            margin-right: 48px;
          }

          .cur {
            color: #333333;
          }
        }
      }

      .label-wrap {
        padding-top: 26px;
        text-align: right;
        font-size: 16px;
        color: #333333;
        line-height: 19px;

        .price {
          padding-left: 20px;
        }
      }

    }

    .pay-method {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 28px;

      .label {
        font-size: 16px;
        color: #333333;
        line-height: 19px;
        margin-right: 4px;
      }

      .left-wrap {
        display: flex;
        align-items: center;

        .select {
          width: 17px;
          height: 17px;
          margin-right: 9px;
        }

        .method {
          width: 18px;
          height: 18px;
          margin-right: 6px;
        }

        .method-text {
          font-size: 16px;
          color: #666666;
          line-height: 19px;
          margin-right: 20px;
        }
      }

      .right-wrap {
        display: flex;
        align-items: center;

        .active-text {
          font-size: 14px;
          color: #FF5E01;
          line-height: 16px;

          .active-num {
            font-size: 24px;
            color: #FF5E01;
            line-height: 28px;
          }
        }

      }
    }

    .agreement-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 12px;
      color: #909399;
      line-height: 14px;

      .select {
        padding: 9px;
        width: 35px;
        height: 35px;
      }

      .blue {
        color: #004C8F;
        cursor: pointer;
      }
    }
  }
  .dialog-scan{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 21px 0 30px 0;
    .text{
      font-size: 14px;
      color: #666666;
      line-height: 16px;
      text-align: center;
      margin-bottom: 20px;
    }
    .scan{
      width: 200px;
      height: 200px;
    }
    .close{
      position: absolute;
      top: -14px;
      right: -14px;
      width: 28px;
      height: 28px;
      cursor: pointer;
    }
  }
</style>
