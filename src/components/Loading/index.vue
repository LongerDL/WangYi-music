<template>
  <div v-if="dataArr.length === 0" class="loading-img">
    <img src="@/assets/img/loading.gif" alt="" />
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: ["dataArr"],
};
</script>

<style lang="scss" scoped>
.loading-img {
  position: absolute;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  & > img {
    width: 100%;
    height: 100%;
  }
}
</style>
