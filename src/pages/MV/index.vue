<template>
  <div class="mvDetailContainer">
    <div class="mvDetailContent">
      <div class="mvInfo">
        <p class="title">mv详情</p>
        <div class="mv">
          <video
            controls
            class="video"
            v-if="mvUrl.brs"
            :src="mvUrl.brs[1080] || mvUrl.brs[720] || mvUrl.brs[480] || mvUrl.brs[240]"></video>
        </div>
        <div class="mvIntroduce">
          <div class="mvIntroduce-top">
            <span>{{mvUrl.name}}</span>
            <span>{{mvUrl.artistName}}</span>
          </div>
          <div class="mvIntroduce-bottom">
            <span>创建时间：{{mvUrl.publishTime}}</span>
            <span>播放：{{mvUrl.playCount}}次</span>
          </div>
        </div>
        <div class="MvComment">
          <Comment
            class="comment"
            :url="commentUrl"
            :type="HotCommentType"
            :id="id"/>
        </div>
      </div>
      <div class="relevantMv">
        <p class="title">相关推荐</p>
        <Mv
          class="mvs"
          :mvs="mvs"
          :total="total"/>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../../components/comments.vue'
import Mv from '../../components/mv.vue'

export default {
  data () {
    return {
      commentUrl: 'comment/mv',
      HotCommentType: 1,
      mvUrl: {},
      mvs: [],
      total: 1
    }
  },
  created () {
    this.getMvUrl()
    this.getMvRelevant()
  },
  methods: {
    async getMvUrl () {
      const { data: res } = await this.$http.get(`mv/detail?mvid=${this.id}`)
      if (res.code !== 200) {
        return this.$message.error('视频地址获取失败')
      }
      this.mvUrl = res.data
    },
    async getMvRelevant () {
      const { data: res } = await this.$http.get(`simi/mv?mvid=${this.id}`)
      if (res.code !== 200) {
        return this.$message.error('相关推荐数据获取失败！')
      }
      this.mvs = res.mvs
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  watch: {
    id () {
      this.getMvUrl()
      this.getMvRelevant()
    }
  },
  components: { Comment, Mv }
}
</script>

<style lang="scss" type="text/scss">
  .mvDetailContainer {
    padding: 30px 0;
    width: 100%;
    overflow: hidden;

    .mvDetailContent {
      width: 70%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 18px;
        font-weight: bold;
        margin: 0 0 15px;
      }

      .mvInfo {
        width: 70%;
        border: none;

        .video {
          width: 100%;
        }

        .mvIntroduce {
          margin: 30px 0;
          color: #303133;

          .mvIntroduce-top {
            margin-bottom: 15px;
            font-size: 14px;

            span {
              &:first-of-type {
                margin-right: 15px;
                font-size: 28px;
                font-weight: bold;
              }
            }
          }

          .mvIntroduce-bottom {
            font-size: 12px;
            color: #cccccc;

            span {
              &:first-of-type {
                margin-right: 10%;
              }
            }
          }
        }

        .MvComment {

          .comment {
            padding-left: 0 !important;
          }
        }
      }

      .relevantMv {
        width: 25%;

        .mvs {
          background-color: transparent !important;

          .el-card__body {
            ul {
              .mv {
                min-height: auto !important;
              }
            }
          }
        }
      }
    }
  }
</style>
