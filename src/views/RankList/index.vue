<template>
  <div class="tops">
    
    <SingleTop :topArr="topArr" />
    
    <SingleTopMenu />
  </div>
</template>

<script>
import { getTops } from "@/api";
import SingleTop from "../../components/SingleTop";
import SingleTopMenu from "../../components/SingleTopMenu";
export default {
  name: "RankList",
  data() {
    return {
      topArr: [], //榜单数组
    };
  },
  components: {
    SingleTop,
    SingleTopMenu,
  },
  async created() {
    await getTops().then((res) => {
      this.topArr = res.data.list;
    });
    this.$store.commit("settopsInfo", this.topArr);
  },
};
</script>

<style lang="scss" scoped>
.tops {
  margin-left: 20px;
}
</style>
