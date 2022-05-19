<template>
  <div class="exclusive-content">
    <h3 class="title">{{ title }} ></h3>
    <div v-for="item in exclusiveArr" :key="item.id" class="exclusive">
      <div class="icon-content">
        <span class="iconfont icon-bofang1"></span>
      </div>
      <img :src="item.sPicUrl" alt="" />
      <div class="footer-text">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { getExclusive, getExclusiveList } from "@/api";
export default {
  name: "Exclusive",
  data() {
    return {
      exclusiveArr: [],
      title: "",
    };
  },
  async mounted() {
    const exclusives = await getExclusive();
    this.title = exclusives.data.name;
    this.exclusiveArr.push(...exclusives.data.result);
  },
};
</script>

<style lang="scss" scoped>
.exclusive-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .title {
    width: 100%;
    font-size: 24px;
    margin-left: 90px;
    cursor: pointer;
  }
  .exclusive {
    width: 290px;
    position: relative;
    margin: 0 10px;
    .icon-content {
      position: absolute;
      top: 2%;
      left: 2%;
      & > span {
        color: #fff;
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
      font-size: 13px;
    }
  }
}
</style>
