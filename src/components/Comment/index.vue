<template>
  <div class="comment-container">
    <h3>{{commentName}}评论({{ commentData && commentData.length }})</h3>
    <div
      class="comment-content"
      v-for="item in commentData"
      :key="item.commentId"
    >
      <div class="avatar">
        <img :src="item.user.avatarUrl" alt="" />
      </div>
      <div class="comment-info">
        <div class="nickname-comment">
          <span>{{ item.user.nickname + ": " }}</span>
          <span class="comment">{{ item.content }}</span>
        </div>
        <div class="comment-time">
          <span>{{ item.timeStr }}</span>
        </div>
      </div>
      <div class="comment-btns">
        <span
          :class="['iconfont icon-dianzan', item.liked ? 'like' : '']"
          @click="item.liked = !item.liked"
        ></span>
        <span class="iconfont icon-fenxiang"></span>
        <span class="iconfont icon-jianyi"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["commentData","commentName"],
};
</script>

<style lang="scss" scoped>
.comment-container {
  width: 100%;
  .comment-content {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(228, 220, 220);
    .avatar {
      width: 50px;
      height: 50px;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .comment-info {
      width: 80%;
      height: 50px;
      font-size: 14px;
      margin-top: 10px;
      margin-left: 10px;
      .nickname-comment {
        color: #5983b1;
        .comment {
          color: #555;
        }
      }
      .comment-time {
        color: #999;
        margin-top: 5px;
      }
    }
    .comment-btns {
      width: 15%;
      height: 50px;
      line-height: 50px;
      .like {
        color: #ec4141;
      }
      & > span {
        position: relative;
        left: 60%;
        margin: 0 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
