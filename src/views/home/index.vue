<template>
  <div class="home">
    <div class="download-wrap">
      <!--    <div class="wrap-margin">-->
      <!--      <div class="download-content">-->
      <!--        <div class="download-title">小说客</div>-->
      <!--        <p>单词</p>-->
      <!--      </div>-->
      <!--    </div>-->
    </div>
    <p class="title">为什么选择小说客</p>
    <ul class="gain-list">
      <li>
        <div class="img-block">
          <img src="@/assets/images/1.png" alt="">
        </div>
        <p class="text">说客英语的姊妹品牌，大平台值得信赖</p>
      </li>
      <li>
        <div class="img-block">
          <img src="@/assets/images/2.png" alt="">
        </div>
        <p class="text">强强联合，“优学派”提供优质学习资源</p>
      </li>
      <li>
        <div class="img-block">
          <img src="@/assets/images/3.png" alt="">
        </div>
        <p class="text">提供全科、高效、普惠式的学习服务</p>
      </li>
    </ul>
    <p class="title">资源+技术+平台，优势互补</p>
    <div class="explain-wrap">
      <img src="@/assets/images/4.png" class="left" alt="">
      <div class="right">
        <p>深圳青豆教育深耕在线教育12年，率先实践 S2B2C商业模式创新，坚持技术驱动管理，坚持用商业创新和技术的力量推动教育均衡发展，成为用户信赖的国民教育品牌。 优学派为深圳市优学天下教育公司品牌，深耕教育电子逾25年，主要向中小学学生、家长和教师，提供智能互动教育设备、优质学习资源和智慧教育平台。 双方秉持为行业提供更加普惠优质的学习服务，利用各自优势，共同打磨“小说客”项目，为广大学习者提供更具优势和实用的教育产品。</p>
      </div>
    </div>
    <p class="title">情景式教学设计，寓教于乐</p>
    <p class="sub-title">课程体例设计科学，结构设计质量高</p>
    <ul class="programme-list">
      <li>
        <div class="img-block">
          <img src="@/assets/images/5.png" alt="">
        </div>
        <p class="text">同步课程</p>
        <p class="text2">同步校内教材章节</p>
      </li>
      <li>
        <div class="img-block">
          <img src="@/assets/images/6.png" alt="">
        </div>
        <p class="text">名师带学</p>
        <p class="text2">预习、精讲、复习、拓展全流程</p>
      </li>
      <li>
        <div class="img-block">
          <img src="@/assets/images/7.png" alt="">
        </div>
        <p class="text">题型精讲</p>
        <p class="text2">多种题型讲解助力练习提分</p>
      </li>
      <li>
        <div class="img-block">
          <img src="@/assets/images/8.png" alt="">
        </div>
        <p class="text">学习计划</p>
        <p class="text2">同步校内教材章节</p>
      </li>
    </ul>
    <div class="business-wrap">
      <p class="title pt-124 mt-0">开通同步学会员，畅享学习</p>
      <div class="business-btn">咨询热线：400-990-9915</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .home{

  }
  .title {
    margin-top: 100px;
    margin-bottom: 0;
    font-size: 48px;
    line-height: 67px;
    color: #333333;
    text-align: center;
    font-weight: bold;
  }

  .sub-title {
    font-size: 24px;
    color: #999999;
    line-height: 28px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 50px;
  }

  .yellow {
    color: #ffc929;
  }

  .blue {
    color: #0087FF;
  }
  .download-wrap {
    height: 680px;
    background: url('@/assets/images/bg.png') no-repeat center;
    background-size: 1921px 680px;

    .download-content {
      text-align: left;

      .download-title {
        padding-top: 251px;
        padding-left: 90px;
        font-size: 72px;
        font-weight: 500;
        color: #ffffff;
        line-height: 56px;
      }

      p {
        margin-top: 39px;
        padding-left: 90px;
        font-size: 48px;
        font-weight: 300;
        color: #ffffff;
        line-height: 48px;
      }

      img {
        margin: 62px 71px 0 0;
      }
    }
  }
  .gain-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    li {
      display: flex;
      flex-direction: column;
      width: 378px;
      margin-right: 40px;
      font-size: 20px;
      background: #ffffff;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
      border-radius: 16px 16px 16px 16px;
      margin-top: 50px;

      .img-block {
        width: 378px;
        height: 229px;
        overflow: hidden;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &:hover {
        .img-block {
          border-radius: 16px 16px 0px 0px;

          img {
            width: 105%;
            height: 105%;
          }
        }
      }

      .text {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        line-height: 24px;
        text-align: center;
        color: #000000;
      }

      &:nth-child(3) {
        margin-right: 0;
      }
    }
  }

  .explain-wrap {
    margin-top: 50px;
    display: flex;
    justify-content: center;

    .left {
      width: 631px;
      height: 363px;
      margin-right: 50px;
    }

    .right {
      width: 545px;
      height: 314px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 500;
      color: #333333;
      line-height: 40px;
    }
  }

  .programme-list {
    width: 1251px;
    margin: 0 auto;
    display: flex;
    padding-bottom: 66px;
    align-items: baseline;
    justify-content: space-between;

    li {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 340px;
      font-size: 24px;
      color: #333333;
      line-height: 28px;

      .img-block {
        width: 300px;
        height: 240px;
        overflow: hidden;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        margin-top: 20px;
        text-align: center;
      }

      .text2 {
        margin-top: 7px;
        text-align: center;
        font-size: 16px;
        color: #666666;
        line-height: 19px;
      }
    }
  }
  .business-wrap {
    width: 100%;
    height: 400px;
    background: url('@/assets/images/business-bg.png') no-repeat center;
    background-size: cover;

    .business-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 20px;
      color: #FFFFFF;
      width: 338px;
      height: 56px;
      background: #0087FF;
      border-radius: 200px;
      margin: auto;
      margin-top: 30px;
    }
  }
  .pt-124 {
    padding-top: 124px;
  }

  .mt-0 {
    margin-top: 0;
  }
</style>
