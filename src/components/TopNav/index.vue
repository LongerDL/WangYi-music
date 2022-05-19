<template>
  <div>
    <div class="top-nav">
      <!-- 左侧标题 和 中间搜索框 -->
      <div class="left-container">
        <div class="music-title">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
        </div>

        <!-- 中间搜索框 -->
        <div class="search-content">
          <div class="toLink">
            <span class="iconfont icon-xiangzuo2" @click="goBack"></span>
            <span class="iconfont icon-xiangyou2" @click="goForward"></span>
          </div>
          <div class="input-content">
            <input class="input-text" type="text" placeholder="请输入内容" />
          </div>
          <div class="microphone">
            <span class="iconfont icon-maikefeng"></span>
          </div>
        </div>
      </div>

      <!-- 右侧头像及登录区域 -->
      <div class="login-avatar">
        <Avatar />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "../Avatar";
// import Login from "../../views/Login";
export default {
  name: "topNav",
  components: {
    Avatar,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-nav {
  width: 100%;
  height: 60px;
  background-color: #ec4141;
  color: #faf3f3;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0%;
  z-index: 99;
  .left-container {
    display: flex;
    justify-content: space-between;
    .music-title {
      margin-left: 30px;
      line-height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .search-content {
      width: 25%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .toLink,
      .microphone {
        span {
          font-size: 32px;
          margin: 0 10px;
          cursor: pointer;
        }
      }
      .input-content {
        position: relative;
        margin: 0 15px;
        .input-text {
          width: 150px;
          height: 30px;
          box-sizing: border-box;
          border: 0.8px solid rgba(255, 255, 255, 0.87);
          background-color: #ec4141;
          outline: none;
          color: #faf3f3;
          border-left: transparent;
          border-right: transparent;
        }
        .input-text::placeholder {
          color: rgba(255, 255, 255, 0.788);
        }
      }
      .input-content::before {
        content: "";
        box-sizing: border-box;
        width: 30px;
        height: 100%;
        left: -15px;
        border-radius: 100% 0 0 100%;
        border: 1.3px solid rgba(255, 255, 255, 0.87);
        border-right: none;
        position: absolute;
      }
      .input-content::after {
        content: "";
        box-sizing: border-box;
        width: 30px;
        height: 100%;
        right: -15px;
        border-radius: 0 100% 100% 0;
        border: 1.3px solid rgba(255, 255, 255, 0.87);
        border-left: none;
        position: absolute;
      }
    }
  }
}
</style>
