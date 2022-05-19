<template>
  <div class="mv-info">
    <!-- 左侧mv视频以及评论等信息 -->
    <div class="left-container">
      <h2 class="title" @click="$router.back()">&lt;MV详情</h2>
      <div class="video-play">
        <video :src="mvUrl" autoplay controls>您的浏览器不支持该属性</video>
      </div>
      <div class="author-info">
        <div class="avatar-name">
          <div class="avatar">
            <img :src="authorInfo && authorInfo.artists[0].img1v1Url" alt="" />
          </div>
          <div class="author-name">
            <span>{{ authorInfo && authorInfo.artistName }}</span>
          </div>
        </div>
        <div class="description">
          <span>{{ authorInfo && authorInfo.name }}</span>
          <div class="expansion" @click="isExpansion = !isExpansion">
            <span
              :class="[
                'iconfont',
                isExpansion ? 'icon-xiangxia1' : 'icon-xiangshang1',
              ]"
            ></span>
          </div>
        </div>
        <div class="other-info">
          <span>{{ "发布：" + (authorInfo && authorInfo.publishTime) }}</span>
          <span>{{ "播放：" + (authorInfo && authorInfo.playCount) }}</span>
        </div>
        <div class="desc-name" v-if="isExpansion">
          <span>{{
            (authorInfo && authorInfo.desc) || "作者很懒，什么也没留下..."
          }}</span>
        </div>
        <div class="btns">
          <el-button round>
            <span class="iconfont icon-dianzan">&nbsp;</span>
            <span>赞</span>
          </el-button>
          <el-button round>
            <span class="iconfont icon-24gl-folderStar">&nbsp;</span>
            <span>收藏({{ authorInfo && authorInfo.subCount }})</span>
          </el-button>
          <el-button round>
            <span class="iconfont icon-fenxiang">&nbsp;</span>
            <span>分享({{ authorInfo && authorInfo.shareCount }})</span>
          </el-button>
          <el-button round>
            <span class="iconfont icon-xiazai">&nbsp;</span>
            <span>下载</span>
          </el-button>
        </div>
        <!-- 评论列表 -->
        <Comment :commentData="commentData" />
      </div>
    </div>

    <!-- 右侧推荐mv的信息 -->
    <div class="right-container">
      <h2 class="title">相关推荐</h2>
      <div
        v-for="item in similarMV"
        :key="item.id"
        class="similar-mv"
        @click="toMVRouter(item)"
      >
        <div class="icon-content">
          <span class="iconfont icon-bofang1"></span>
          <span>{{ item.playCount }}</span>
        </div>
        <img :src="item.cover" alt="" />
        <div class="footer-text">
          {{ item.time }}
        </div>
        <div class="video-info">
          <span>{{ item.name }}</span>
          <span class="sub-span">{{ "by " + item.artistName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMVUrl, getMVDetail, getSimilarMV, getMVComment } from "@/api";
import { formatTime } from "@/utils/format";
import Comment from "@/components/Comment";
export default {
  name: "MVInfo",
  data() {
    return {
      mvInfo: null, //mv的相关信息
      mvUrl: "", //被点击的mvUrl地址
      authorInfo: null, //作者的相关信息
      isExpansion: true, //是否展开详细信息
      similarMV: [], //相似mv
      commentData: [], //mv的评论相关数据
    };
  },
  components: {
    Comment,
  },
  async created() {
    //初始化数据
    this._initMV();
  },
  watch: {
    $route(to, from) {
      if (to.query.vid !== from.query.vid) {
        this._initMV();
      }
    },
  },
  methods: {
    toMVRouter(item) {
      // this.mvInfo = item;
      this.$store.commit("setMVInfo", item);
      this.$router.push({
        name: "mvInfo",
        query: { vid: item.id, name: item.name },
      });
    },
    async _initMV() {
      this.mvInfo = this.$store.state.mvInfo;
      //得到mv的url地址
      await getMVUrl(this.mvInfo.id).then((res) => {
        this.mvUrl = res.data.data.url;
      });
      //得到mv的详情信息
      await getMVDetail(this.mvInfo.id).then((res) => {
        this.authorInfo = res.data.data;
        this.authorInfo.playCount =
          this.authorInfo.playCount < 10000
            ? this.authorInfo.playCount
            : Math.floor(this.authorInfo.playCount / 10000) + "万";
        // console.log(this.authorInfo);
      });
      //得到相似mv
      await getSimilarMV(this.mvInfo.id).then((res) => {
        //不要使用push这种写法，否则会请求到相同的mv继续放入到similarMV绑定相同的可以
        // this.similarMV.push(...res.data.mvs);
        this.similarMV = res.data.mvs;
        this.similarMV.map((it) => {
          it.time = formatTime(it.duration);
          it.playCount =
            it.playCount < 10000
              ? it.playCount
              : Math.floor(it.playCount / 10000) + "万";
          return it;
        });
      });
      //得到mv的评论相关数据
      await getMVComment(this.mvInfo.id).then((res) => {
        this.commentData = res.data.comments;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mv-info {
  width: 90%;
  margin: 62px auto 0;
  display: flex;
  justify-content: space-between;
  .left-container {
    width: 65%;
    .title {
      cursor: pointer;
    }
    .video-play {
      width: 100%;
      margin-top: 30px;
      & > video {
        width: 100%;
      }
    }
    .author-info {
      width: 100%;
      height: 170px;
      margin: 10px auto 40px;
      .avatar-name {
        display: flex;
        align-items: center;
        .avatar {
          width: 50px;
          height: 50px;
          & > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        .author-name {
          color: #666;
          margin-left: 10px;
          font-size: 14px;
        }
      }
      .description {
        font-size: 24px;
        font-weight: 600;
        margin-top: 10px;
        .expansion {
          cursor: pointer;
          margin-left: 10px;
          display: inline-block;
        }
      }
      .other-info,
      .desc-name {
        margin-top: 10px;
        margin-left: -10px;
        & > span {
          color: #999;
          margin-left: 10px;
          font-size: 14px;
        }
      }
      .btns {
        margin-top: 15px;
      }
    }
  }
  .right-container {
    width: 30%;
    .title {
      margin-bottom: 30px;
    }
    .similar-mv {
      width: 200px;
      height: 120px;
      position: relative;
      margin-top: 10px;
      cursor: pointer;
      .icon-content {
        position: absolute;
        top: 2%;
        right: 2%;
        & > span {
          color: #fff;
          cursor: pointer;
          margin: 0 2px;
        }
      }
      & > img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 5px;
      }
      .footer-text {
        position: absolute;
        bottom: 2%;
        left: 78%;
        width: 100%;
        color: #fff;
      }
      .video-info {
        position: absolute;
        width: 200px;
        left: 100%;
        top: 20%;
        & > span {
          display: block;
          margin-top: 5px;
          margin-left: 3px;
        }
        .sub-span {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
