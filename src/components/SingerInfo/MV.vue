<template>
  <div class="singer-mv">
    <Loading :dataArr="singerMV" />
    <div
      v-for="item in singerMV"
      :key="item.id"
      class="mv"
      @click="toMVRouter(item)"
    >
      <div class="icon-content">
        <span class="iconfont icon-bofang1"></span>
        <span>{{ item.playCount }}</span>
        <span class="play-time">{{ item.time }}</span>
      </div>
      <img v-lazy="item.imgurl" alt="" />
      <div class="footer-text">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerMV } from "@/api";
import { formatTime } from "@/utils/format";
import Loading from "@/components/Loading";
export default {
  name: "MV",
  data() {
    return {
      limit: 32, //获取mv的上限数
      singerMV: [], //歌手的mv
    };
  },
  components: {
    Loading,
  },
  async created() {
    const singerId = this.$store.state.currentSingerId;
    //获取当前歌手的mvs
    await getSingerMV(singerId, this.limit).then((res) => {
      this.singerMV.push(...res.data.mvs);
      this.singerMV.map((it) => {
        it.time = formatTime(it.duration);
        it.playCount =
          it.playCount < 10000
            ? it.playCount
            : Math.floor(it.playCount / 10000) + "万";
        return it;
      });
    });
    // console.log(this.singerMV);
  },
  methods: {
    toMVRouter(item) {
      this.$store.commit("setMVInfo", item);
      this.$router.push({
        name: "mvInfo",
        query: { vid: item.id, name: item.name },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.singer-mv {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .mv {
    width: 290px;
    position: relative;
    margin: 20px 10px;
    cursor: pointer;
    .icon-content {
      position: absolute;
      top: 2%;
      right: 2%;
      & > span {
        color: #fff;
        cursor: pointer;
        margin: 0 1px;
      }
      .play-time {
        position: absolute;
        left: 15%;
        transform: translateY(900%);
        font-weight: 500;
        font-size: 16px;
      }
    }
    & > img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 5px;
    }
    .footer-text {
      position: absolute;
      width: 100%;
      font-size: 14px;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
