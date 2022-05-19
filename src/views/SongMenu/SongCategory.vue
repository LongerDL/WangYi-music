<template>
  <div class="song-category">
    <el-button round size="small" @click="showAllTags"> 全部歌单 </el-button>
    <div class="simple-category">
      <span
        class="tag"
        v-for="(item, index) in simpleCategory"
        :key="index"
        @click="changeMenu(item)"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
import { getMusicTags } from "@/api";
export default {
  name: "SongCategory",
  data() {
    return {
      simpleCategory: [
        "华语",
        "流行",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "综艺",
        "影视原声",
        "ACG",
      ],
    };
  },
  async created() {
    const musicTags = await getMusicTags();
    // console.log(musicTags.data.tags);
  },
  methods: {
    //切换歌曲菜单的方法
    changeMenu(item) {
      this.$bus.$emit("changeMenu", item);
    },
    showAllTags() {},
  },
};
</script>

<style lang="scss" scoped>
.song-category {
  margin: 30px auto 10px;
  width: 75%;
  .simple-category {
    display: inline-block;
    position: relative;
    left: calc(40%);
    cursor: pointer;
    & > span {
      margin: 0 2px;
    }
    & > span:hover {
      color: #ec4141;
    }
  }
}
</style>
