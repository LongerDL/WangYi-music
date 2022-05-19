<template>
  <div class="router-list">
    <ul>
      <li v-for="(item, index) in routerList" :key="index">
        <router-link
          :to="{ name: item.name }"
          active-class="select"
          exact-active-class=""
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RouterList",
  data() {
    return {
      select: "select",
    };
  },
  props: ["routerList"],
};
</script>

<style lang="scss" scoped>
.router-list {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #f6f6f6;
  ul {
    display: flex;
    padding: 0;
    margin-left: 15px;
    margin-top: 0;
    li {
      margin: 0 15px;
      color: #999;
      cursor: pointer;
      position: relative;
      &.select {
        color: #000;
        font-weight: 700;
      }
      & > a {
        color: #999;
        cursor: pointer;
        display: inline-block;
        &.select {
          color: #000;
          font-weight: 700;
        }
        &.select::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: #ec4141;
          top: 95%;
          left: 0%;
        }
      }
    }
  }
}
</style>
