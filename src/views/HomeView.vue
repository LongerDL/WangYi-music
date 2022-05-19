<template>
  <div class="home">
    <RouterList :routerList="routerList" />
    <router-view></router-view>
  </div>
</template>

<script>
import RouterList from "../components/RouterList";
export default {
  data() {
    return {
      routerList: [
        {
          title: "个性推荐",
          name: "recommend",
        },
        {
          title: "歌单",
          name: "songmenu",
        },
        {
          title: "排行榜",
          name: "ranklist",
        },
        {
          title: "歌手",
          name: "singers",
        },
      ],
    };
  },
  components: {
    RouterList,
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 60px;
}
</style>
