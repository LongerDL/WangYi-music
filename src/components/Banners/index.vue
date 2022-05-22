<template>
  <el-carousel :interval="4000" type="card" height="230px">
    <el-carousel-item v-for="(item, index) in imgList" :key="index">
      <!-- <h3 class="medium">{{ item }}</h3> -->
      <img v-lazy="item.imageUrl" class="bannerImg" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "Banners",
  props: ["imgList"],
  mounted() {
    // console.log(this.imgList);
  },
};
</script>

<style lang="scss" scoped>
.bannerImg {
  width: 100%;
  height: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
