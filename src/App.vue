<template>
  <div id="app">
    <TopNav v-if="$route.name !== 'login'" />
    <router-view />
  </div>
</template>

<script>
import TopNav from "./components/TopNav";
export default {
  name: "App",
  components: {
    TopNav,
  },
};
</script>

<style scoped>
@import "~@/assets/css/global.css";
@import "//at.alicdn.com/t/font_3382438_6prpo7yr0fe.css";
</style>
