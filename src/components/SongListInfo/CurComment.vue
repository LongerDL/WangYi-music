<template>
  <div class="comment">
    <div class="hot-comment">
      <Comment :commentData="hotComment" commentName="最热" />
    </div>
    <div class="latest-comment">
      <Comment :commentData="latestComment" commentName="最新" />
    </div>
  </div>
</template>

<script>
import Comment from "../Comment";
import { getComments } from "@/api";
export default {
  name: "CurComment",
  components: {
    Comment,
  },
  data() {
    return {
      songMenuInfo: null, //当前歌单的介绍信息
      latestComment: [], //当前最新评论数据
      hotComment: [], //当前热门评论数据
    };
  },
  async created() {
    //从vuex获取当前歌单的相关信息
    this.songMenuInfo = this.$store.state.currentMenuInfo;
    // console.log(this.songMenuInfo.id);
    await getComments(this.songMenuInfo.id, 20).then((res) => {
      console.log(res.data);
      this.latestComment = res.data.comments;
      this.hotComment = res.data.hotComments;
      // console.log(this.latestComment);
    });
  },
};
</script>

<style lang="scss" scoped>
.comment {
  margin: 10px 20px;
  padding: 0 20px;
  .latest-comment {
    padding-top: 30px;
  }
}
</style>
