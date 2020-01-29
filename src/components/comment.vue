<template>
  <div class="commentContainer">
    <div class="commentContent">
      <div class="comment-item" v-for="item in commentList" :key="item.commentId">
        <div class="comment-item-content">
          <div class="avatar">
            <el-avatar :src="item.user.avatarUrl"></el-avatar>
          </div>
          <div class="commentInfo">
            <p class="username">
              <span v-if="item.user">{{item.user.nickname}}：</span>
              <span>{{item.content}}</span>
            </p>
            <div class="replay" v-if="item.beReplied.length !== 0">
              <span v-if="item.beReplied[0].user">{{item.beReplied[0].user.nickname}}：</span>
              <span v-if="item.beReplied[0]">{{item.beReplied[0].content}}</span>
            </div>
            <div class="commentTime">
              <span>20{{item.time | dateFormat('YY-MM-DD HH:mm:ss')}}</span>
              <p>
                <i class="iconfont icon-dianzan"></i>
                <span>{{item.likedCount}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentList']
}
</script>

<style scoped lang="scss" type="text/scss">
  .commentContainer {
    .commentContent {
      .comment-item {
        padding-top: 17px;
        border-bottom: 1px solid #eeeeee;

        .comment-item-content {
          display: flex;

          .avatar {
            .el-avatar {
              width: 50px;
              height: 50px;
              line-height: 50px;
            }
          }

          .commentInfo {
            font-size: 13px;
            color: #303133;
            padding-bottom: 21px;
            width: 100%;
            margin-left: 15px;

            p {
              margin: 0;
            }

            .replay, .commentTime {
              margin-top: 8px;
            }

            .replay {
              width: 100%;
              padding: 8px;
              background-color: #eeeeee;
              border-radius: 3px;
              box-sizing: border-box;
            }

            .commentTime {
              display: flex;
              width: 100%;
              justify-content: space-between;
              color: #bbbbbb;

              p {
                i {
                  font-size: 12px;
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
