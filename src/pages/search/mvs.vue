<template>
  <div class="search-mv">
    <Mv :total="mvCount" :mvs="mvs"/>
    <!--分页-->
    <el-pagination
      @current-change="onPageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="mvCount">
    </el-pagination>
  </div>
</template>

<script>
import Mv from '../../components/mv.vue'

export default {
  data () {
    return {
      mvCount: 0,
      mvs: [],
      pageSize: 40,
      currentPage: 1
    }
  },
  created () {
    this.getSearchMvs()
  },
  methods: {
    async getSearchMvs () {
      const { data: res } = await this.$http.get('search', {
        params: {
          keywords: this.keywords,
          limit: this.pageSize,
          type: 1004,
          offset: this.offset
        }
      })
      if (res.code !== 200) {
        return this.$message.error('搜索失败！')
      }
      this.mvCount = res.result.mvCount
      this.mvs = res.result.mvs
      this.$emit('count', this.mvCount)
    },
    onPageChange (newPage) {
      this.currentPage = newPage
      this.getSearchMvs()
      document.querySelector('#search').scrollIntoView({
        behavior: 'smooth'
      })
    }
  },
  computed: {
    keywords () {
      return this.$route.params.keywords
    },
    offset () {
      return (this.currentPage - 1) * this.pageSize
    }
  },
  watch: {
    '$route.path': function () {
      this.getSearchMvs()
    }
  },
  components: { Mv }
}
</script>

<style lang="scss" type="text/scss">
  .search-mv {
    padding: 15px 125px;

    .el-pagination {
      text-align: center;

      .el-pager {
        width: auto;
      }
    }
  }
</style>
