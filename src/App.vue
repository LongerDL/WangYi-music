<template>
  <div id="app">
    <TopNav v-if="$route.name !== 'login'" />
    <router-view />
    <FooterMenu v-if="$route.name !== 'login'" />
  </div>
</template>

<script>
import TopNav from "./components/TopNav";
import FooterMenu from "./components/FooterMenu";
export default {
  name: "App",
  components: {
    TopNav,
    FooterMenu,
  },
};
</script>

<style scoped>
@import "~@/assets/css/global.css";
@import "//at.alicdn.com/t/font_3382438_hrjjo249sc4.css";
</style>
