<template>
  <div id="sider-bar">
    <div class="sider-wrap">
      <el-popover placement="left" :width="154" trigger="hover" class="official-class">
        <img src="@/assets/images/appcode.png" style="width: 130px" alt=""/>
        <template #reference>
          <div class="download-item">
            <img src="@/assets/images/dowaload_icon.png" class="icon-img"/>
            <div class="text">App下载</div>
          </div>
        </template>
      </el-popover>

      <el-backtop :right="0" :bottom="0">
        <template #default>
          <div class="back-top">
            <img src="@/assets/images/top_icon.png" class="icon-img" alt=""/>
            <div class="text">返回顶部</div>
          </div>
        </template>
      </el-backtop>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">

  #sider-bar {
    .sider-wrap {
      z-index: 2000;
      position: fixed;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 64px;
      box-shadow: 0 4px 8px 0 rgba(28, 31, 33, 0.1);
      border-radius: 8px;
      background: #ffffff;
      word-break: break-word;

      .el-backtop {
        min-height: 64px;
        width: 64px;
        position: relative;
        border-radius: 0 0 8px 8px;
        box-shadow: none;
        color: #999;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        line-height: 14px;

        .back-top {
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          font-weight: 400;

          .text {
            width: 64px;
            line-height: 14px;
            white-space: normal;
          }
        }

      }
    }

    .download-item {
      text-align: center;
      padding: 10px 0;
      cursor: pointer;
      color: #999;
      font-size: 12px;

      &:hover {
        background: #f2f6fc;
        border-radius: 8px;
      }
    }

    .icon-img {
      width: 28px;
      height: 28px;
      margin-bottom: 6px;
    }

  }
</style>
