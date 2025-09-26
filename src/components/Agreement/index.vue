<template>
  <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :before-close="close"
      @open="open"
      :closeOnClickModal="false"
      width="800px"
  >
    <img src="@/assets/images/close.png" @click="close" class="close" alt=""/>
    <div class="container">
      <div class="title-wrap">{{title}}</div>
      <div class="content" v-html="content" ref="contentRef"></div>
    </div>
  </el-dialog>
</template>

<script setup>
const { proxy } = getCurrentInstance()
const dialogVisible = ref(false)

const obj = {
  1:'免责声明',
  2:'用户协议',
  3:'隐私协议',
  4:'儿童隐私协议',
  5:'会员服务协议',
}
const title=ref('')
const content = ref('')
const contentRef=ref()

function open(type) {
  dialogVisible.value = true
  getContent(type)
}

function close() {
  dialogVisible.value = false
}

const getContent = async (type) => {
  if (!type) return
  title.value=obj[type]
  try {
    const { data } = await proxy.$http.user.queryAgreementOne({
      type: type,
      platformType: 0
    })
    if (data && data.content) {
      content.value = data.content
      contentRef.value.scrollTop = 0
    }
  } catch (e) {
    console.log(e, 'error')
  }
}

defineExpose({ open, close })

</script>

<style scoped lang="scss">
  .close {
    position: absolute;
    top: 0;
    right: -90px;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }

  .container {
    font-family: PingFang SC, PingFang SC;
    position: relative;
    width: 800px;
    height: 680px;
    background: #ffffff;
    border-radius: 24px;
    padding-bottom: 40px;
    overflow: hidden;

    .title-wrap {
      margin: 0 auto 20px;
      padding-top: 40px;
      font-family: PingFang SC, PingFang SC;
      font-weight: bold;
      font-size: 28px;
      color: #3F444E;
      line-height: 40px;
      text-align: center;
    }

    .content {
      padding: 0 40px 0;
      max-height: 550px;
      overflow-y: auto;
      font-size: 16px;
      color: #3F444E;
      line-height: 40px;
      text-align: left;

      &::-webkit-scrollbar {
        /*display: none;*/
      }
    }

  }
</style>
