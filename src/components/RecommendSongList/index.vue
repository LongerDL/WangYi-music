<template>
  <div class="recommend-song-list">
    <router-link :to="{ name: 'songmenu' }">推荐歌单 ></router-link>
    <div class="song-menu">
      <div
        v-for="item in songMenu"
        :key="item.id"
        class="single-song-menu"
        @click="goToSongs(item)"
      >
        <!-- 右上角播放量 -->
        <div class="play-count">
          <span class="iconfont icon-bofang"></span>
          {{ item.trackCount + "万" }}
        </div>
        <img v-lazy="item.picUrl" alt="" class="picImg" />
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
  name: "RecommendSongList",
  props: ["songMenu"],
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
  width: 100%;
  & > a {
    color: #000;
    font-size: 24px;
    font-weight: 600;
    margin-left: 10px;
  }
  .song-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .single-song-menu {
      width: 170px;
      height: 170px;
      border-radius: 5px;
      margin: 20px 5px;
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
