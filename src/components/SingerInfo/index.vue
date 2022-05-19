<template>
  <div class="single-singer-info">
    <!-- 歌手简介 -->
    <div class="singer-info">
      <div class="singer-img">
        <img :src="singerBriefInfo && singerBriefInfo.cover" alt="" />
      </div>
      <div class="singer-brief-info">
        <h2>{{ singerBriefInfo && singerBriefInfo.name }}</h2>
        <div class="btns-info">
          <el-button round size="middle"
            ><span class="iconfont icon-24gl-folderStar">收藏</span></el-button
          >
          <el-button round size="middle">个人主页</el-button>
        </div>
        <div class="brief-info">
          <span
            >单曲数：{{ singerBriefInfo && singerBriefInfo.musicSize }}</span
          >
          <span
            >专辑数：{{ singerBriefInfo && singerBriefInfo.albumSize }}</span
          >
          <span>MV数：{{ singerBriefInfo && singerBriefInfo.mvSize }}</span>
        </div>
      </div>
    </div>

    <!-- 歌手介绍信息导航栏 -->
    <div class="singer-info-nav">
      <RouterList :routerList="routerList" class="nav" />
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerInfo } from "@/api";
import RouterList from "@/components/RouterList";
export default {
  name: "SingerInfo",
  data() {
    return {
      singerId: undefined, //歌手id
      singerBriefInfo: null, //歌手简介
      hotSongs: [], //热门歌曲列表
      routerList: [
        {
          title: "专辑",
          name: "album",
        },
        {
          title: "MV",
          name: "mv",
        },
        {
          title: "歌手详情",
          name: "singerDetail",
        },
        {
          title: "相似歌手",
          name: "similarSingers",
        },
      ],
    };
  },
  components: {
    RouterList,
  },
  async created() {
    const currentMenuInfo = this.$store.state.currentMenuInfo;
    await getSingerInfo(currentMenuInfo.id).then((res) => {
      //singerBriefInfo是获得歌手简介的数据
      this.singerBriefInfo = res.data.data.artist;
    });
  },
  async beforeUpdate() {
    const currentMenuInfo = this.$store.state.currentMenuInfo;
    await getSingerInfo(currentMenuInfo.id).then((res) => {
      //singerBriefInfo是获得歌手简介的数据
      this.singerBriefInfo = res.data.data.artist;
    });
  },
};
</script>

<style lang="scss" scoped>
.single-singer-info {
  margin: 62px auto;
  display: flex;
  flex-direction: column;
  .singer-info {
    margin-top: 20px;
    display: flex;
    padding: 30px;
    .singer-img {
      width: 200px;
      height: 200px;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
    }
    .singer-brief-info {
      margin: 0 20px;
      .brief-info {
        margin-top: 10px;
        & > span {
          margin: 0 10px;
        }
      }
    }
  }
  .singer-info-nav {
    height: 80px;
    .nav {
      height: 100%;
    }
  }

  .songs {
    display: flex;
    justify-content: flex-end;
    .top-img {
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }
    .songs-top {
      width: 70%;
      margin-right: 100px;
      .single-song {
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
        .like {
          color: #ec4141;
        }
        & > span {
          cursor: default;
        }
        .song-name {
          width: 80%;
          & > span {
            margin: 0 5px;
            cursor: default;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .icon-size {
            font-size: 20px;
            margin-left: -2px;
          }
        }
        .singer-name,
        .alumb {
          width: 30%;
          cursor: default;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .single-song:nth-child(2n + 1) {
    background-color: #f9f9f9;
  }
  .single-song:nth-child(2n) {
    background-color: #fff;
  }
  .single-song:hover {
    background-color: #f0f1f2;
  }
}
</style>
