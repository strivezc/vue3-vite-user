<template>
  <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :before-close="close"
      @open="open"
      :closeOnClickModal="false"
      width="280px"
      top="20vh"
      class="dialog-class"
  >
    <div class="dialog-scan">
      <img src="@/assets/images/close2.png" @click="close" class="close" alt=""/>
      <p class="text">添加<span class="blue">【专属课程顾问】</span>为微信好友后，即可随时进行服务咨询哦</p>
      <img v-if="props.wechatQrCode" :src="props.wechatQrCode" class="scan" alt=""/>
    </div>
  </el-dialog>
</template>

<script setup>
const {proxy} = getCurrentInstance()
const dialogVisible = ref(false)

const props = defineProps({
  wechatQrCode: {
    type: String,
    default: '',
  },
})
const state = reactive({
  phone: ''
})

function open() {
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

defineExpose({open, close})
</script>

<style scoped lang="scss">
.dialog-scan {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 21px 20px 30px 20px;

  .text {
    font-size: 14px;
    color: #666666;
    line-height: 18px;
    text-align: center;
    margin-bottom: 20px;

    .blue {
      color: #0087FF;
    }
  }

  .scan {
    width: 200px;
    height: 200px;
  }

  .close {
    position: absolute;
    top: -14px;
    right: -14px;
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
}
</style>