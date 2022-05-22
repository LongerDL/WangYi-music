<template>
  <div class="single-top">
    <h2>官方榜</h2>
    <div class="top-container" v-for="item in officialTop" :key="item.id">
      <!-- 排行榜图片 -->
      <div class="top-img">
        <img v-lazy="item.coverImgUrl" alt="" />
      </div>
      <!-- 排行榜前五首歌曲 -->
      <Loading :dataArr="officialTop" />
      <div class="songs">
        <div
          class="single-song"
          v-for="(it, i) in item.songs"
          :key="it.id"
          @dblclick="playMusic(it.id)"
        >
          <audio :src="it.songUrl" ref="music"></audio>
          <div class="song-name">
            <span v-text="i < 10 ? '0' + i : i"></span>
            <div class="single-song-name">
              <span>{{ it.name }}</span>
            </div>
          </div>
          <div class="singer-name">
            {{ it.ar[0].name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenuDetail, getMusicUrl } from "@/api";
import Loading from "@/components/Loading";
export default {
  name: "SingleTop",
  props: ["topArr"],
  components: {
    Loading,
  },
  data() {
    return {
      officialTop: [], //官方榜单
      preMusicIndex: undefined, //设置第一次上一首歌的索引为undefined
    };
  },
  async created() {
    this.officialTop = this.$store.state.topsInfo.slice(0, 4);
    await Promise.all(
      this.officialTop.map(async (item) => {
        await getMenuDetail(item.id).then((res) => {
          //获取榜单前五首歌曲
          item.songs = res.data.playlist.tracks.slice(0, 5);
          //获取榜单捂手歌曲每一首音乐的url地址
          item.songs.map(async (it) => {
            await getMusicUrl(it.id).then((res) => {
              item.songUrl = res.data.data[0].url;
            });
          });
        });
        return item;
      })
    ).then((res) => {
      this.officialTop = res;
    });
    // console.log(this.officialTop);
  },
  methods: {
    playMusic(index) {
      const musicRef = "music" + index;
      console.log(this.$refs.music[index], musicRef);
      //上一首歌曲的索引如果没有并且上一首歌的索引不等于当前歌曲的索引就让上一首歌暂停
      if (this.preMusicIndex !== undefined && this.preMusicIndex !== index) {
        // this.$refs[musicRef].pause();
      }
      //至此让下一首歌播放
      // this.$refs[musicRef].play();
      this.preMusicIndex = index;
    },
  },
  computed: {
    officialTopChange() {
      return this.$store.state.topsInfo.slice(0, 4);
    },
  },
  watch: {
    officialTopChange: {
      handler(newVal) {
        //前四个为官方榜单
        this.officialTop = newVal.slice(0, 4);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.single-top {
  margin: 0 auto;
  width: 80%;
  .top-container {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px auto;
    position: relative;
    .top-img {
      width: 200px;
      height: 200px;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
      }
    }
    .progress {
      width: 200px;
      height: 200px;
      top: calc(50% - 100px);
      left: calc(50% - 100px);
      position: absolute;
    }
    .songs {
      width: 80%;
      // background-color: antiquewhite;
      .single-song {
        margin: 5px 20px;
        display: flex;
        justify-content: space-between;
        // flex-direction: column;
        height: 30px;
        line-height: 30px;
        .song-name {
          width: 80%;
          display: flex;
          align-items: flex-end;
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
