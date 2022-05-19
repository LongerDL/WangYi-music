<template>
  <div class="recommend-song-list">
    <h2>全球榜</h2>
    <div class="song-menu">
      <div
        v-for="item in topsInfo"
        :key="item.id"
        class="single-song-menu"
        @click="goToSongs(item)"
      >
        <!-- 右上角播放量 -->
        <div class="play-count">
          <span class="iconfont icon-bofang"></span>
          {{ item.trackCount + "万" }}
        </div>
        <img :src="item.coverImgUrl" alt="" class="picImg" />
        <!-- 底部文字 -->
        <div class="footer-text">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenuDetail } from "@/api";
export default {
  name: "SingleTopMenu",
  props: ["songMenu"],
  data() {
    return {
      topsInfo: [], //排行榜单数据
    };
  },
  async created() {
    this.topsInfo = this.$store.state.topsInfo.slice(4, 32);
    console.log(this.topsInfo);
  },
  methods: {
    //路由跳转
    async goToSongs(item) {
      //获取当前歌单的详细介绍信息
      const menuDetail = await getMenuDetail(item.id);
      //给vuex设置当前歌单的信息
      this.$store.commit("setMenuInfo", menuDetail.data.playlist);
      this.$router.push({ name: "songListInfo", query: { id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend-song-list {
  margin: 0 auto;
  width: 80%;
  .song-menu {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .single-song-menu {
      width: 160px;
      height: 160px;
      border-radius: 5px;
      margin: 20px 10px;
      cursor: pointer;
      position: relative;
      .play-count {
        position: absolute;
        color: #fff;
        right: 3%;
        & > span {
          margin-right: -3px;
        }
      }
      .picImg {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
      .footer-text {
        width: 100%;
        position: absolute;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
