<template>
  <div class="collector-container">
    <div class="collector" v-for="item in subscribers" :key="item.userId">
      <div class="avatar-container">
        <img v-lazy="item.avatarUrl" alt="" />
      </div>
      <div class="nickname">
        <span>{{ item.nickname }}</span>
        <span
          :class="[
            'iconfont',
            item.gender ? 'icon-nan male' : 'icon-nv female',
          ]"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSubscribers } from "@/api";
export default {
  name: "Collector",
  data() {
    return {
      subscribers: [], //收藏者相关信息
    };
  },
  async created() {
    //从vuex获取当前歌单的相关信息
    this.songMenuInfo = this.$store.state.currentMenuInfo;
    await getSubscribers(this.songMenuInfo.id).then((res) => {
      // console.log(res.data.subscribers);
      this.subscribers = res.data.subscribers;
    });
  },
};
</script>

<style lang="scss" scoped>
.collector-container {
  margin: 20px 40px;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  .collector {
    width: 50%;
    margin: 15px auto;
    display: flex;
    align-items: center;
    .avatar-container {
      width: 125px;
      height: 125px;
      margin-right: 10px;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .nickname {
      & > span {
        margin: 0 5px;
      }
      .male {
        color: rgb(14, 169, 220);
      }
      .female {
        color: #e81b3d;
      }
    }
  }
}
</style>
