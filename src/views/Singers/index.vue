<template>
  <div class="singers-container">
    <!-- 各种分类信息 -->
    <div class="category-info">
      <!-- 语种 -->
      <div class="languages">
        <span>语种：</span>
        <el-button
          round
          size="mini"
          v-for="item in languages"
          :key="item.value"
          :class="item.selected ? 'selected' : ''"
          @click="_updateByLanguage(item)"
          ><span ref="language">{{ item.name }}</span></el-button
        >
      </div>
      <!-- 歌手地区分类 -->
      <div class="category">
        <span>分类：</span>
        <el-button
          round
          size="mini"
          v-for="item in category"
          :key="item.value"
          :class="item.selected ? 'selected' : ''"
          @click="_updateByArea(item)"
          ><span ref="area">{{ item.name }}</span></el-button
        >
      </div>
      <!-- 根据英文字母筛选歌手 -->
      <div class="filter-singer">
        <span>筛选：</span>
        <el-button
          round
          size="mini"
          v-for="(item, index) in filterSinger"
          :key="index"
          :class="item.selected ? 'selected' : ''"
          @click="_updateByCharacter(item)"
          ><span>{{ item.name }}</span></el-button
        >
      </div>
    </div>

    <!-- 歌手相关信息 -->
    <div class="singers-info">
      <div
        class="singers"
        v-for="item in singers"
        :key="item.id"
        @click="toSingerInfo(item)"
      >
        <div class="singer-img">
          <img v-lazy="item.picUrl" alt="" />
        </div>
        <div class="singer-name">
          <span>{{ item.name }}</span>
          <span
            v-if="item.accountId"
            class="iconfont icon-yonghu change-red"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingers } from "@/api";
export default {
  name: "Singers",
  data() {
    return {
      languages: [
        { name: "全部", value: -1, selected: true },
        { name: "华语", value: 7, selected: false },
        { name: "欧美", value: 96, selected: false },
        { name: "日本", value: 8, selected: false },
        { name: "韩国", value: 16, selected: false },
        { name: "其他", value: 0, selected: false },
      ],
      category: [
        { name: "全部", value: -1, selected: true },
        { name: "男歌手", value: 1, selected: false },
        { name: "女歌手", value: 2, selected: false },
        { name: "乐队组合", value: 3, selected: false },
      ],
      filterSinger: [
        { name: "热门", value: "-1", selected: true },
        { name: "A", value: "a", selected: false },
        { name: "B", value: "b", selected: false },
        { name: "C", value: "c", selected: false },
        { name: "D", value: "d", selected: false },
        { name: "E", value: "e", selected: false },
        { name: "F", value: "f", selected: false },
        { name: "G", value: "g", selected: false },
        { name: "H", value: "h", selected: false },
        { name: "I", value: "i", selected: false },
        { name: "J", value: "j", selected: false },
        { name: "K", value: "k", selected: false },
        { name: "L", value: "l", selected: false },
        { name: "M", value: "m", selected: false },
        { name: "N", value: "n", selected: false },
        { name: "O", value: "o", selected: false },
        { name: "P", value: "p", selected: false },
        { name: "Q", value: "q", selected: false },
        { name: "R", value: "r", selected: false },
        { name: "S", value: "s", selected: false },
        { name: "T", value: "t", selected: false },
        { name: "U", value: "u", selected: false },
        { name: "V", value: "v", selected: false },
        { name: "W", value: "w", selected: false },
        { name: "X", value: "x", selected: false },
        { name: "Y", value: "y", selected: false },
        { name: "Z", value: "z", selected: false },
        { name: "#", value: "0", selected: false },
      ],
      singers: [],
      languArea: { area: -1, sex: -1, character: -1 }, //结合语言和地区同时对歌手分类
    };
  },
  async created() {
    const singers = await getSingers();
    this.singers.push(...singers.data.artists);
    // console.log(this.singers);
  },
  methods: {
    //跳转到歌手的专辑页面
    toSingerInfo(singer) {
      this.$store.commit("getSingerId", singer.id);
      this.$store.commit("setMenuInfo", singer);
      this.$router.push({
        name: "singerInfo",
        query: { id: singer.id, name: singer.name },
      });
    },
    //根据语言地区更新歌手列表
    async _updateByLanguage(item) {
      // console.log(this.$refs.language[index].innerText);
      // this.languArea.language = this.$refs.language[index].innerText;
      this.languages.map((it) => {
        if (item.value === it.value) {
          it.selected = true;
          this.languArea.area = it.value;
        } else {
          it.selected = false;
        }
        return it;
      });
      this.getNewSingers(
        this.languArea.area,
        this.languArea.sex,
        this.languArea.character
      );
    },
    //根据男女歌手或者团队更新歌手列表
    async _updateByArea(item) {
      // console.log(this.$refs.area[index].innerText);
      // this.languArea.area = this.$refs.area[index].innerText;
      this.category.map((it) => {
        if (item.value === it.value) {
          it.selected = true;
          this.languArea.sex = it.value;
        } else {
          it.selected = false;
        }
        return it;
      });
      this.getNewSingers(
        this.languArea.area,
        this.languArea.sex,
        this.languArea.character
      );
    },
    //根据字母更新歌手列表
    async _updateByCharacter(item) {
      this.filterSinger.map((it) => {
        if (item.name === it.name) {
          it.selected = true;
          this.languArea.character = it.value;
        } else {
          it.selected = false;
        }
        return it;
      });
      this.getNewSingers(
        this.languArea.area,
        this.languArea.sex,
        this.languArea.character
      );
    },
    //根据歌手分类和语言和字母获取歌手的方法
    async getNewSingers(area, sex, character) {
      area = area || -1;
      sex = sex || -1;
      character = character || "-1";
      const singers = await getSingers(area, sex, character);
      this.singers = singers.data.artists;
    },
  },
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #ec4141d3;
  color: #fff;
}
.singers-container {
  width: 90%;
  margin: 0 auto;
  .category-info {
    width: 100%;
    height: 150px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .singers-info {
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .singers {
      width: 200px;
      height: 200px;
      margin: 0 5px;
      cursor: pointer;
      .singer-img {
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
      }
      .singer-name {
        display: flex;
        justify-content: space-between;
        & > span {
          display: inline-block;
        }
        .change-red {
          color: #ec4141;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
