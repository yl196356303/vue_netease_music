<template>
  <div class="search-playlist">
    <SongCard :list="playLists"/>
    <!--分页-->
    <el-pagination
      @current-change="onPageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="playlistCount">
    </el-pagination>
  </div>
</template>

<script>
import SongCard from '../../components/song-card.vue'

export default {
  data () {
    return {
      playlistCount: 0,
      playLists: [],
      pageSize: 50,
      currentPage: 1
    }
  },
  created () {
    this.getSearchPlaylist()
  },
  methods: {
    async getSearchPlaylist () {
      const { data: res } = await this.$http.get('search', {
        params: {
          keywords: this.keywords,
          limit: this.pageSize,
          type: 1000,
          offset: this.offset
        }
      })
      if (res.code !== 200) {
        return this.$message.error('搜索失败！')
      }
      this.playlistCount = res.result.playlistCount
      this.playLists = res.result.playlists
      this.$emit('count', this.playlistCount)
    },
    onPageChange (newPage) {
      this.currentPage = newPage
      this.getSearchPlaylist()
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
      this.getSearchPlaylist()
    }
  },
  components: { SongCard }
}
</script>

<style lang="scss" type="text/scss">
  .search-playlist {
    padding: 15px 125px;

    .el-pagination {
      text-align: center;

      .el-pager {
        width: auto;
      }
    }
  }
</style>
