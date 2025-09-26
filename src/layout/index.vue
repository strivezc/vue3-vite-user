<template>
  <div class="app-wrapper">
    <navbar />
    <app-main />
    <slider-bar></slider-bar>
    <div class="copyright">
      <span class="text">Copyright ©️2024 TALK915 INC.</span>
    </div>
  </div>
</template>

<script setup>
import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
import SliderBar from './components/SliderBar'

</script>

<style scoped lang="scss">
.app-wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: PingFang SC, PingFang SC;
}
.copyright {
  display: flex;
  align-content: center;
  justify-content: center;
  height: 90px;
  width: 100%;
  background: #f5f5f5;

  .text {
    font-size: 14px;
    line-height: 90px;
    color: #000000;
  }
}
</style>
