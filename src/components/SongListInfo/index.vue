<template>
  <div class="song-list-info">
    <!-- 歌单信息 -->
    <div class="song-menu-info">
      <div class="song-img">
        <img :src="songMenuInfo.picUrl || songMenuInfo.coverImgUrl" alt="" />
      </div>
      <div class="menu-info">
        <div class="main-title">
          <span class="song-text">歌单</span>
          <span class="title">{{ songMenuInfo.name }}</span>
        </div>
        <div class="author">
          <div class="author-img">
            <img :src="songMenuInfo.creator.avatarUrl" alt="" />
          </div>
          <span class="author-name">{{ songMenuInfo.creator.nickname }}</span>
          <span class="time">{{ songMenuInfo.date }}创建</span>
        </div>
        <div class="play-btns">
          <el-button type="danger" round>播放全部</el-button>
          <el-button round
            >收藏{{
              "(" +
              Math.floor(songMenuInfo.subscribedCount / 10000) +
              "万" +
              ")"
            }}</el-button
          >
          <el-button round>分享{{ songMenuInfo.shareCount }}</el-button>
          <el-button round>下载全部</el-button>
        </div>
        <div class="description">
          <div class="des-title">
            <span>标签：</span>
            <span class="title-content">{{ songMenuInfo.tags.join("/") }}</span>
          </div>
          <div class="info">
            <span>歌曲：{{ songMenuInfo.trackCount }}</span>
            <span
              >播放：{{ Math.floor(songMenuInfo.playCount / 10000) }}万</span
            >
            <div v-show="songMenuInfo.description">
              简介 :
              {{ songMenuInfo.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <RouterList :routerList="routerList" class="nav" />
    <router-view></router-view>
  </div>
</template>

<script>
import RouterList from "@/components/RouterList";
export default {
  name: "SongListInfo",
  components: {
    RouterList,
  },
  data() {
    return {
      songMenuInfo: null, //当前歌单的介绍信息
      routerList: [
        {
          title: "歌曲列表",
          name: "SongList",
        },
        {
          title: "评论",
          name: "CurComment",
        },
        {
          title: "收藏者",
          name: "Collector",
        },
      ],
    };
  },
  async created() {
    //从vuex获取当前歌单的相关信息
    this.songMenuInfo = this.$store.state.currentMenuInfo;
    // console.log(this.songMenuInfo, "songlistinfo");
    //将歌单的时间戳转换为年份时间
    const date = new Date(this.songMenuInfo.createTime).toLocaleDateString();
    this.songMenuInfo.date = date;
  },
};
</script>

<style lang="scss" scoped>
.song-list-info {
  margin-top: 62px;
  .song-menu-info {
    height: 260px;
    margin: 20px;
    display: flex;
    .song-img {
      width: 200px;
      height: 200px;
      margin: 10px 0;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .menu-info {
      margin: 10px 20px;
      max-width: 70%;
      .main-title {
        margin-top: 5px;
        .song-text {
          padding: 5px;
          display: inline-block;
          line-height: 12px;
          border: 1px solid #ec4141;
          border-radius: 5px;
          font-size: 12px;
          color: #ec4141;
        }
        .title {
          display: inline-block;
          font-weight: 700;
          font-size: 24px;
          margin-left: 10px;
          line-height: 24px;
        }
      }
      .author {
        .author-img {
          width: 30px;
          height: 30px;
          display: inline-block;
          transform: translateY(10px);
          & > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .author-name {
          color: #507daf;
          margin: 0 10px;
        }
        .time {
          color: rgb(159, 159, 159);
          margin: 0 8px;
        }
      }
      .play-btns {
        margin: 10px auto;
        .play-btns >>> button {
          padding: 50px;
        }
      }
      .description {
        .title-content {
          margin: 5px auto;
          color: #507daf;
        }
        .info {
          & > span {
            display: inline-block;
            margin: 5px auto;
            padding-right: 20px;
          }
          & > div {
            height: 60px;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
