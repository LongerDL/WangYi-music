<template>
  <!-- 歌曲列表 -->
  <div class="songs">
    <div class="top-img">
      <img src="@/assets/img/top50.jpg" alt="" />
    </div>
    <div class="songs-top">
      <Loading :dataArr="hotSongs" />
      <div
        class="single-song"
        v-for="(item, index) in hotSongs"
        :key="item.id"
        @dblclick="playMusic(index)"
      >
        <audio :src="item.url" ref="music"></audio>
        <div class="song-name">
          <div class="number">
            <span v-if="index < 9">0</span>
            <span>{{ index + 1 }}</span>
          </div>
          <span
            :class="[
              'iconfont',
              item.isLike ? 'icon-redaixin1 like' : ' icon-aixin',
            ]"
            @click.prevent="item.isLike = !item.isLike"
          ></span>
          <span class="iconfont icon-xiazai"></span>
          <span>{{ item.name }}</span>
          <span
            :class="['iconfont icon-size', item.sq ? 'icon-vip4-01 like' : '']"
          ></span>
          <span
            :class="['iconfont icon-size', item.mv ? 'icon-MV like' : '']"
          ></span>
        </div>
        <div class="song-time">
          {{ item.dt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/format";
import { getHotSongs, getMusicUrl } from "@/api";
import Loading from "@/components/Loading";
export default {
  name: "Album",
  data() {
    return {
      singerId: undefined, //歌手id
      singerBriefInfo: null, //歌手简介
      hotSongs: [], //热门歌曲列表
    };
  },
  components: {
    Loading,
  },
  async created() {
    this.singerId = this.$store.state.currentSingerId;
    //hotSongs是获得的50首热门歌曲
    const hotSongs = await getHotSongs(this.singerId);
    this.hotSongs.push(...hotSongs.data.songs);
    // 遍历hotSongs得到每一首歌曲的id
    await Promise.all(
      this.hotSongs.map(async (item) => {
        //获取每一首歌的id和音频url
        const musicUrl = await getMusicUrl(item.id);
        //此时每一首歌都拥有了音频url地址了
        item.url = musicUrl.data.data[0].url;
        //将毫秒时间转换为分：秒
        item.dt = formatTime(item.dt);
        //将是否喜欢该音乐添加到item中,默认false
        item.isLike = false;
        //将是否下载该音乐添加到item中,默认false
        item.isDownLoad = false;
        return item;
      })
    ).then((res) => {
      this.hotSongs = res;
    });
    // console.log(this.hotSongs, "hotSongs...");
  },
  methods: {
    playMusic(index) {
      this.$store.commit("setCurrentMusic", { ...this.hotSongs[index], index });
      this.$store.commit("setMusicList", this.hotSongs);
    },
  },
};
</script>

<style lang="scss" scoped>
.songs {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  position: relative;
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
        display: flex;
        .number {
          margin: 0 5px;
          padding-left: 5px;
        }
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
      .song-time {
        color: #999;
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
</style>
