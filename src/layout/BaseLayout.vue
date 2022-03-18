<template>
  <div class="app">
    <div>
      <Header />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "./Components/Header.vue";
import Footer from "./Components/Footer.vue";
</script>
<style lang="less" scoped>
.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .content {
    flex: 1;
  }
}
</style>
