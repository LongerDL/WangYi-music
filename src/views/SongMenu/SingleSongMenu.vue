<template>
  <div class="best-songs-menu">
    <div class="song-menu">
      <img
        v-lazy="songMenu && songMenu.coverImgUrl"
        alt=""
        class="song-menu-img"
      />
      <div class="single-song-menu">
        <img v-lazy="songMenu && songMenu.coverImgUrl" alt="" class="picImg" />
        <div class="best-button">
          <span class="iconfont icon-huangguan"></span>
          <span>精品歌单</span>
        </div>
        <span class="song-title">{{ songMenu && songMenu.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicMenu } from "@/api";
export default {
  name: "SingleSongMenu",
  data() {
    return {
      songMenu: null,
    };
  },
  async created() {
    const songsMenu = await getMusicMenu();
    //暂时设置索引为2的歌单，后续解决动态设置
    this.songMenu = songsMenu.data.playlists[2];
    this.$store.commit("changeBestSongsMenu", this.songMenu);
    // console.log(this.songMenu);
  },
};
</script>

<style lang="scss" scoped>
.best-songs-menu {
  width: 75%;
  position: relative;
  margin: 10px auto;
  .song-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background-color: antiquewhite;
    .song-menu-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.9;
      -webkit-filter: blur(5px);
      filter: blur(5px);
      position: absolute;
    }
    .single-song-menu {
      width: 155px;
      height: 155px;
      border-radius: 5px;
      margin: 20px 10px;
      cursor: default;
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
      .best-button {
        color: goldenrod;
        position: absolute;
        display: inline-block;
        top: calc(20%);
        margin-left: 10px;
        width: 82px;
        border: goldenrod solid 1px;
        border-radius: 5px;
        padding: 2px;
      }
      .song-title {
        color: #fff;
        font-size: 24px;
        position: absolute;
        display: inline-block;
        transform: translateY(75px);
        margin-left: 10px;
        width: 500px;
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
