<template>
  <div class="similar-singers">
    <!-- 歌手相关信息 -->
    <div class="singers-info">
      <div
        class="singers"
        v-for="item in similarSingers"
        :key="item.id"
        @click="toSingerInfo(item)"
      >
        <div class="singer-img">
          <img v-lazy="item.picUrl" alt="" />
        </div>
        <div class="singer-name">
          <span>{{ item.name }}</span>
          <span
            v-if="item.accountId"
            class="iconfont icon-yonghu change-red"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSimilarSingers } from "@/api";
export default {
  name: "SimilarSingers",
  data() {
    return {
      similarSingers: [], //相似歌手
    };
  },
  async created() {
    //得到当前歌手的id
    const singerId = this.$store.state.currentSingerId;
    //获取当前歌手的相似歌手的信息
    await getSimilarSingers(singerId).then((res) => {
      this.similarSingers = res.data.artists;
    });
    // console.log(this.similarSingers);
  },
  methods: {
    //跳转到相似歌手的详细页面
    toSingerInfo(singer) {
      this.$store.commit("getSingerId", singer.id);
      this.$store.commit("setMenuInfo", singer);
      // console.log(this.$store.state.currentMenuInfo, "similarSingers组件的");
      this.$router.push({
        name: "singerInfo",
        query: { id: singer.id, name: singer.name },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.singers-info {
  margin: 10px 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .singers {
    width: 200px;
    height: 200px;
    margin: 0 10px;
    cursor: pointer;
    .singer-img {
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .singer-name {
      display: flex;
      justify-content: space-between;
      & > span {
        display: inline-block;
      }
      .change-red {
        color: #ec4141;
        font-size: 20px;
      }
    }
  }
}
</style>
