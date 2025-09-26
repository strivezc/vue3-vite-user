<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
<!--      <transition name="fade-transform" mode="out-in">-->
        <component v-if="!route.meta.link" :is="Component" :key="route.fullPath"/>
<!--      </transition>-->
    </router-view>
  </section>
</template>

<script setup>

</script>

<style scoped lang="scss">
  .app-main{
    position: relative;
    flex-grow: 1;
  }
  .copyright {
    position: absolute;
    bottom: 0;
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
