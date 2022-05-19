<template>
  <div class="recommend-mv-content">
    <div class="title">
      <router-link class="title" :to="{ name: 'RecommendMVList' }"
        >推荐MV ></router-link
      >
    </div>
    <div
      v-for="item in recommendMV"
      :key="item.id"
      class="recommend-mv"
      @click="toMVDetail(item)"
    >
      <div class="icon-content">
        <span class="iconfont icon-bofang1"></span>
        <span>{{ item.playCount }}</span>
      </div>
      <img :src="item.picUrl" alt="" />
      <div class="footer-text">
        <span>{{ item.name }}</span>
        <span class="sub-title">{{ item.artistName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendMV } from "@/api";
export default {
  name: "Exclusive",
  data() {
    return {
      recommendMV: [],
    };
  },
  async mounted() {
    const recommendMV = await getRecommendMV();
    this.recommendMV.push(...recommendMV.data.result);
    // console.log(this.recommendMV);
  },
  methods: {
    toMVDetail(item) {
      //给vuex设置当前被点击mv的信息
      this.$store.commit("setMVInfo", item);
      this.$router.push({
        path: "/mvInfo",
        query: { vid: item.id, type: "mv" },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend-mv-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .title {
    width: 100%;
    font-size: 24px;
    margin: 30px 80px 10px;
    & > a {
      color: #000;
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;
      margin-left: 12px;
    }
  }
  .recommend-mv {
    width: 215px;
    position: relative;
    margin: 0 10px;
    cursor: pointer;
    .icon-content {
      position: absolute;
      top: 2%;
      right: 2%;
      & > span {
        color: #fff;
        margin: 2px;
        cursor: pointer;
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
      & > span {
        display: block;
        font-size: 16px;
      }
      .sub-title {
        color: gray;
        font-size: 13px;
      }
    }
  }
}
</style>
