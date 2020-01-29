<template>
  <div class="commentsContainer" ref="commentRef">
    <div class="hotBlock" v-if="page === 1 && hotComments.length !== 0">
      <p class="title">精彩评论</p>
      <Comment :commentList="hotComments"/>
    </div>
    <div class="newBlock">
      <p class="title" ref="commentTitleRef">最新评论</p>
      <Comment :commentList="comments"/>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Comment from './comment.vue'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      pageSize: 20,
      page: 1,
      hotComments: [],
      comments: [],
      total: 0
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    async getComment () {
      if (this.id) {
        const { data: res } = await this.$http.get(this.url, {
          params: {
            id: this.id,
            limit: this.pageSize,
            offset: this.offset
          }
        })
        if (res.code !== 200) {
          return this.$message.error('获取数据失败！')
        }
        this.total = res.total
        this.$emit('comment', this.total)
        this.comments = res.comments
        // 热门评论
        if (this.page === 1) {
          const { data: hotRes } = await this.$http.get('comment/hot', {
            params: {
              id: this.id,
              type: this.type
            }
          })
          if (hotRes.code !== 200) {
            return this.$message.error('获取数据失败！')
          }
          this.hotComments = hotRes.hotComments
        } else {
          if (res.hotComments) {
            this.hotComments = res.hotComments
          }
        }
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.getComment()
      this.$refs.commentRef.scrollIntoView({
        behavior: 'smooth'
      })
    }
  },
  computed: {
    offset () {
      return (this.page - 1) * this.pageSize
    },

    ...mapState(['currentSong'])
  },
  watch: {
    'currentSong': function () {
      this.$nextTick(() => {
        this.getComment()
      })
    },
    id () {
      this.getComment()
    }
  },
  components: { Comment },
  props: ['id', 'url', 'type']
}
</script>

<style lang="scss" type="text/scss">
  .commentsContainer {
    padding: 17px 40px;

    .title {
      border-bottom: 1px solid #eeeeee;
      margin: 0;
      padding-bottom: 15px;
      font-size: 16px;
    }

    .hotBlock, .newBlock {
      margin-bottom: 120px;
    }

    .el-pagination {
      width: auto;
      text-align: center;

      .active {
        background-color: #cccccc !important;
        color: #C62F2F !important;
      }

      .btn-prev, .btn-next {
        background-color: transparent;
      }

      .el-pager {
        width: auto;

        li {
          background-color: transparent;

          &:hover {
            color: #C62F2F !important;
          }
        }
      }
    }
  }
</style>
