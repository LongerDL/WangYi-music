<template>
  <div class="singer-detail">
    <!-- 代表作品 -->
    <div
      class="representative-works"
      v-for="(item, index) in singerDetail"
      :key="item.id"
    >
      <h3>{{ singerDetail[index] && singerDetail[index].ti }}</h3>
      <div
        class="art-works"
        v-html="
          singerDetail[index] &&
          singerDetail[index].txt.replace(
            /\n/g,
            '<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          )
        "
      ></div>
    </div>
  </div>
</template>

<script>
import { getSingerDetail, getSingerInfo } from "@/api";
export default {
  name: "SingerDetail",
  data() {
    return {
      singerDetail: [], //存放歌手的详细信息
      singerName: null, //歌手名字
    };
  },
  async created() {
    //先从vuex中获取歌手的id
    const singerId = this.$store.state.currentSingerId;
    await getSingerInfo(singerId).then((res) => {
      this.singerName = res.data.data.artist.name;
    });
    await getSingerDetail(singerId).then((res) => {
      let infoObj = {};
      infoObj.ti = this.singerName + "简介";
      infoObj.txt = res.data.briefDesc;
      this.singerDetail.push(infoObj);
      this.singerDetail.push(...res.data.introduction);
    });
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  margin-top: 10px;
  padding-left: 30px;
  margin-bottom: 20px;
  .representative-works {
    .art-works {
      text-indent: 32.4px;
      padding-right: 30px;
      color: #999;
      white-space: pre-line;
    }
  }
}
</style>
