<template>
  <div class="best-songs-menu">
    <div class="song-menu">
      <div
        v-for="item in songsMenu"
        :key="item.id"
        @click="toMenuDetail(item)"
        class="single-song-menu"
      >
        <!-- 右上角播放量 -->
        <div class="play-count">
          <span class="iconfont icon-bofang"></span>
          {{ item.trackCount + "万" }}
        </div>
        <img v-lazy="item.coverImgUrl" alt="" class="picImg" />
        <!-- 底部文字 -->
        <div class="footer-text">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRelatedMenu } from "@/api";
export default {
  name: "SingleSongMenu",
  data() {
    return {
      songsMenu: [],
    };
  },
  async mounted() {
    //有关系的歌单
    const relatedMenu = await getRelatedMenu();
    // console.log(relatedMenu.data.playlists);
    this.songsMenu.push(...relatedMenu.data.playlists);
  },
  async beforeUpdate() {
    //如果tags分类标签被点击了就发起请求
    if (!this.$bus._events.changeMenu) {
      this.$bus.$on("changeMenu", async (res) => {
        // console.log(res);
        const relatedMenu = await getRelatedMenu("hot", res);
        // console.log(relatedMenu.data.playlists);
        this.songsMenu = relatedMenu.data.playlists;
      });
    }
  },
  beforeDestroy() {
    this.$bus.$off("changeMenu");
  },
  methods: {
    toMenuDetail(item) {
      this.$store.commit("setMenuInfo", item);
      this.$router.push({ path: "/songListInfo", query: { id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.best-songs-menu {
  width: 75%;
  position: relative;
  margin: 0 auto;
  .song-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .single-song-menu {
      width: 155px;
      height: 155px;
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
