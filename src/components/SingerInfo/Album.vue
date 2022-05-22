<template>
  <!-- 歌曲列表 -->
  <div class="songs">
    <div class="top-img">
      <img src="@/assets/img/top50.jpg" alt="" />
    </div>
    <div class="songs-top">
      <div class="progress">
        <el-progress
          type="circle"
          :percentage="dlProgress"
          :width="200"
          v-if="hotSongs.length === 0"
        ></el-progress>
      </div>
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
export default {
  name: "Album",
  data() {
    return {
      singerId: undefined, //歌手id
      singerBriefInfo: null, //歌手简介
      hotSongs: [], //热门歌曲列表
      dlProgress: 0, //进度条初始默认值为0
    };
  },
  async created() {
    const timer = setInterval(() => {
      this.dlProgress++;
      if (this.hotSongs.length === 0 || this.hotSongs != null) {
        this.dlProgress = 100;
        clearInterval(timer);
      }
    }, 50);
    this.singerId = this.$store.state.currentSingerId;
    //hotSongs是获得的50首热门歌曲
    const hotSongs = await getHotSongs(this.singerId);
    this.hotSongs.push(...hotSongs.data.songs);
    // 遍历hotSongs得到每一首歌曲的id
    const musicArr = await Promise.all(
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
      //上一首歌曲的索引如果没有并且上一首歌的索引不等于当前歌曲的索引就让上一首歌暂停
      if (this.preMusicIndex !== undefined && this.preMusicIndex !== index) {
        this.$refs.music[this.preMusicIndex].pause();
      }
      //至此让下一首歌播放
      this.$refs.music[index].play();
      this.preMusicIndex = index;
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
    .progress {
      width: 200px;
      height: 200px;
      top: calc(50% - 100px);
      left: calc(50% - 100px);
      position: absolute;
    }
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
