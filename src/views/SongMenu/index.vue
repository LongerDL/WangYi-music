<template>
  <div class="main-song-menu">
    <!-- 顶部精品歌单 -->
    <SingleSongMenu />

    <!-- 歌单分类区域nav -->
    <SongCategory />

    <!-- 网友精选碟歌单50个 -->
    <SongMenus />
  </div>
</template>

<script>
import SingleSongMenu from "./SingleSongMenu";
import SongCategory from "./SongCategory";
import SongMenus from "./SongMenus";

export default {
  name: "SongMenu",
  data() {
    return {};
  },
  components: {
    SingleSongMenu,
    SongCategory,
    SongMenus,
  },
};
</script>

<style lang="scss" scoped>
.main-song-menu {
  width: 100%;
}
</style>
