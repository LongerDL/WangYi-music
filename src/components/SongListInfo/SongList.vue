<template>
  <div class="song-list">
    <Loading :dataArr="musicArr" />
    <!-- 歌曲列表 -->
    <div
      class="single-song"
      v-for="(item, index) in musicArr"
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
            item.isLike ? ' icon-redaixin1 like' : ' icon-aixin',
          ]"
          @click.prevent="item.isLike = !item.isLike"
        ></span>
        <span :class="['iconfont', 'icon-xiazai']"></span>
        <div class="single-song-name">
          <span>{{ item.name }}</span>
          <span
            :class="['iconfont icon-size', item.sq ? 'icon-vip4-01 like' : '']"
          ></span>
          <span
            :class="['iconfont icon-size', item.mv ? 'icon-MV like' : '']"
          ></span>
        </div>
      </div>
      <div class="singer-name">
        {{ item.ar[0].name }}
      </div>
      <div class="alumb">
        {{ item.al.name }}
      </div>
      <div class="song-time">
        {{ item.dt }}
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicUrl, getBestMenu } from "@/api";
import { formatTime } from "@/utils/format";
import Loading from "@/components/Loading";
export default {
  name: "SongList",
  data() {
    return {
      musicArr: [], //有url的歌曲
      // preMusicIndex: undefined, //设置第一次上一首歌的索引为undefined
      songMenuInfo: null, //当前歌单的介绍信息
      currentMusic: null, //当前播放音乐
    };
  },
  components: {
    Loading,
  },
  async created() {
    //从vuex获取当前歌单的相关信息
    this.songMenuInfo = this.$store.state.currentMenuInfo;
    //获取推荐歌单的歌曲信息
    let musicList = null;
    //根据有无传入歌单id，再发起请求
    if (this.$route.query.id) {
      musicList = await getBestMenu(this.$route.query.id);
      // console.log(musicList.data, "musicList");
    } else {
      musicList = await getBestMenu(this.songMenuInfo.id);
    }
    //获取带有url的歌曲
    const musicArr = await Promise.all(
      musicList.data.songs.map(async (item) => {
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
    );
    this.musicArr = musicArr;
    // console.log(this.musicArr);
  },
  methods: {
    playMusic(index) {
      this.$store.commit("setCurrentMusic", { ...this.musicArr[index], index });
      this.$store.commit("setMusicList", this.musicArr);
    },
  },
  computed: {
    isPlayChange() {
      return this.$store.state.musicIsPlay;
    },
    songInfoChange() {
      return this.$store.state.currentMusic;
    },
  },
  watch: {
    songInfoChange: {
      handler() {
        this.currentMusic = this.songInfoChange;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  margin-top: 10px;
  position: relative;
  .single-song {
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    // text-align: left;
    .like {
      color: #ec4141;
    }
    & > span {
      cursor: default;
    }
    .song-name {
      width: 40%;
      display: flex;
      align-items: flex-end;
      .number {
        margin: 0 5px;
      }
      & > span {
        margin-left: 5px;
        cursor: default;
      }
      .single-song-name {
        width: 60%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 5px;
        .iconfont {
          margin-left: 5px;
          font-size: 20px;
        }
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
      color: #333;
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
