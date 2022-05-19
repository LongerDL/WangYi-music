<template>
  <!-- 推荐歌单组件 -->
  <div>
    <!-- 轮播图区域 -->
    <div class="banners">
      <Banners :imgList="bannerImg" />
    </div>

    <!-- 推荐歌单区域 -->
    <div class="recommend-song-list">
      <RecommendSongList :songMenu="songMenu" />
    </div>

    <!-- 独家放送区域 -->
    <div class="exclusive-container">
      <Exclusive />
    </div>

    <!-- 推荐MV区域 -->
    <div class="recommend-mv-container">
      <RecommendMV />
    </div>
  </div>
</template>

<script>
import Banners from "../../components/Banners";
import { getBanners, getRecommendMenu } from "@/api";
import RecommendSongList from "../../components/RecommendSongList";
import Exclusive from "../../components/Exclusive";
import RecommendMV from "../../components/RecommendMV";

export default {
  name: "Recommend",
  data() {
    return {
      bannerImg: [], //轮播图图片
      songMenu: [], //10个推荐歌单
    };
  },
  components: {
    Banners,
    RecommendSongList,
    Exclusive,
    RecommendMV,
  },
  async created() {
    //请求轮播图的数据
    const bannerImgs = await getBanners();
    //获取到了轮播图的数据，添加到数据传递给banners组件
    this.bannerImg.push(...bannerImgs.data.banners);

    //请求推荐歌单的数据
    const songList = await getRecommendMenu();
    //选取返回的30个歌单中的前10个歌单
    this.songMenu.push(...songList.data.recommend.slice(0, 10));
  },
};
</script>

<style lang="scss" scoped>
.banners {
  width: 75%;
  margin: 20px auto;
}
.recommend-song-list,
.exclusive-container,
.recommend-mv-container {
  width: 85%;
  margin: 30px auto;
}
</style>
