<template>
  <!-- 头像组件 -->
  <div class="avatar">
    <img src="@/assets/img/dog.jpg" alt="" />
  </div>
</template>

<script>
export default {
  name: "Avatar",
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
  padding-right: 30px;
  cursor: pointer;
  position: relative;
  top: calc(50% - 25px);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
