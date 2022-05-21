<template>
  <div class="footer">
    <div class="footer-menu">
      <!-- 左侧歌曲信息容器 -->
      <div class="left-container">
        <div class="song-img">
          <img :src="songInfo.al.picUrl" alt="" />
        </div>
        <div class="song-info">
          <div class="song-name">
            <span>{{ songInfo.name }}</span>
          </div>
          <div class="singer">
            <span>{{ songInfo.ar[0].name }}</span>
          </div>
        </div>
      </div>

      <!-- 中间播放器控制播放功能 -->
      <div class="main-container">
        <audio
          ref="audio"
          :src="songInfo.url"
          @canplay="audioCanPlay()"
          @ended="endNextSong()"
        ></audio>
        <!-- 控制按钮 -->
        <div class="control-btns">
          <span class="iconfont icon-24gl-repeat2"></span>
          <span class="iconfont icon-shangyishou" @click="preMusic"></span>
          <span
            :class="['iconfont', isPlay ? 'icon-stop' : 'icon-bofang2']"
            @click="changeIsPlay()"
          ></span>
          <span class="iconfont icon-xiayishou" @click="nextMusic"></span>
          <span class="iconfont icon-geciweidianji"></span>
        </div>
        <!-- 进度条 -->
        <div class="process"></div>
      </div>

      <!-- 右侧播放列表按钮 -->
      <div class="right-container">
        <div class="play-list">
          <span
            :class="[
              'iconfont',
              isSound ? 'icon-yinliang' : 'icon-24gl-volumeDisable',
            ]"
          ></span>
          <span class="iconfont icon-24gf-playlist"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterMenu",
  data() {
    return {
      songInfo: null, //歌曲信息
      isPlay: null, //歌曲是否播放
      isSound: true, //是否有音量
      musicList: [], //当前歌单播放列表
    };
  },
  created() {
    // this.songInfo = this.$store.state.currentMusic;
    // this.isPlay = this.$store.state.isPlay;
    this.musicList = this.$store.state.musicList;
    // console.log(this.songInfo);
  },
  methods: {
    audioCanPlay() {
      this.isPlay = true;
      this.$refs.audio.play();
    },
    //改变播放状态
    changeIsPlay() {
      this.isPlay = !this.isPlay;
      this.$store.commit("changeIsPlay", this.isPlay);
    },
    //上一首歌曲
    preMusic() {
      let index = --this.$store.state.currentMusic.index;
      if (index < 0) {
        index = this.$store.state.musicList.length - 1;
      }
      //需要播放的下一首歌曲，一定要记得把索引一并带过去
      this.$store.commit("setCurrentMusic", {
        ...this.$store.state.musicList[index],
        index,
      });
      this.songInfo = this.$store.state.currentMusic;
    },
    //下一首歌曲
    nextMusic() {
      let index = ++this.$store.state.currentMusic.index;
      if (index >= this.$store.state.musicList.length) {
        index = 0;
      }
      //需要播放的下一首歌曲，一定要记得把索引一并带过去
      this.$store.commit("setCurrentMusic", {
        ...this.$store.state.musicList[index],
        index,
      });
      this.songInfo = this.$store.state.currentMusic;
    },
    //当前歌曲播放结束，播放下一首
    endNextSong() {
      // this.isPlay = false;
      let index = ++this.$store.state.currentMusic.index;
      if (index >= this.$store.state.musicList.length) {
        index = 0;
      }
      //需要播放的下一首歌曲，一定要记得把索引一并带过去
      this.$store.commit("setCurrentMusic", {
        ...this.$store.state.musicList[index],
        index,
      });
      this.songInfo = this.$store.state.currentMusic;
      console.log("end");
    },
  },
  computed: {
    songInfoChange() {
      this.songInfo = this.$store.state.currentMusic;
      return this.$store.state.currentMusic;
    },
    isPlayChange() {
      this.isPlay = this.$store.state.musicIsPlay;
      return this.$store.state.musicIsPlay;
    },
  },
  watch: {
    //监听歌曲信息变化
    songInfoChange: {
      handler() {
        this.songInfo = this.$store.state.currentMusic;
      },
      immediate: true,
      deep: true,
    },
    //监听播放状态变化
    isPlayChange: {
      handler() {
        this.isPlay = this.$store.state.musicIsPlay;
        if (this.isPlay) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  height: 90px;
  .footer-menu {
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 80px;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-top: rgb(223, 213, 213) solid 1px;
    box-sizing: border-box;
    .left-container {
      width: 20%;
      margin-left: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .song-img {
        width: 60px;
        height: 60px;
        margin-right: 5px;
        & > img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .song-info {
        width: 60%;
        & > div {
          margin: 3px auto;
        }
        .singer {
          font-size: 14px;
          color: #666;
        }
      }
    }
    .main-container {
      width: 65%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .control-btns {
        width: 100%;
        display: flex;
        justify-content: center;
        & > span {
          cursor: pointer;
          display: inline-block;
          font-size: 24px;
          margin: 0 20px;
        }
      }
      .process {
        width: 100%;
        height: 2px;
        background-color: brown;
      }
    }
    .right-container {
      width: 15%;
      .play-list {
        & > span {
          display: inline-block;
          cursor: pointer;
          font-size: 24px;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
