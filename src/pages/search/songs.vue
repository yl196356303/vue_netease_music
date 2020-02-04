<template>
  <div class="search-song">
    <el-table
      stripe
      @row-dblclick="onTabClick"
      v-if="songs.length"
      :data="songs"
      style="width: 100%">
      <el-table-column
        width="100px"
        :index="indexMethod"
        align="center"
        type="index">
      </el-table-column>
      <el-table-column
        label="音乐标题">
        <template slot-scope="scope">
          <span class="songTitle">{{scope.row.name}}</span>
          <p class="isAlias" v-if="scope.row.alias">{{scope.row.alias[0]}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="歌手">
        <template slot-scope="scope">
          <span v-if="scope.row.ar">{{scope.row.ar[0].name}}</span>
          <span v-else-if="scope.row.artists">{{scope.row.artists[0].name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="专辑"
        prop="album.name"/>
      <el-table-column
        prop="dt || duration"
        label="时长">
        <template slot-scope="scope">
          {{scope.row.dt || scope.row.duration | dateFormat('mm:ss')}}
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @current-change="onPageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="songCount">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      songCount: 0,
      songs: [],
      pageSize: 50,
      currentPage: 1
    }
  },
  created () {
    this.getSearchSongs()
  },
  methods: {
    async getSearchSongs () {
      const { data: res } = await this.$http.get('search', {
        params: {
          keywords: this.keywords,
          limit: this.pageSize,
          type: 1,
          offset: this.offset
        }
      })
      if (res.code !== 200) {
        return this.$message.error('搜索失败！')
      }
      this.songCount = res.result.songCount
      this.songs = res.result.songs
      this.$emit('count', this.songCount)
    },
    indexMethod (index) {
      return index > 8 ? index + 1 : '0' + (index + 1)
    },
    onPageChange (newPage) {
      this.currentPage = newPage
      this.getSearchSongs()
      document.querySelector('#search').scrollIntoView({
        behavior: 'smooth'
      })
    },
    async onTabClick (row) {
      const { data: res } = await this.$http.get(`song/detail?ids=${row.id}`)
      if (res.code !== 200) {
        return this.$message.error('播放失败！')
      }
      this.handleDbClick(res.songs[0])
    },

    ...mapActions(['handleDbClick'])
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
      this.getSearchSongs()
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  .search-song {
    overflow: hidden;
    padding-bottom: 15px;

    .el-table {
      margin-bottom: 30px;

      &:before {
        height: 0;
      }
    }

    .isAlias {
      color: #cccccc;
    }

    .songTitle {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .el-table__header {
      padding: 10px 0;
    }

    .el-table td, .el-table th {
      border: 0 !important;

      p {
        margin: 8px 0 0;
      }
    }

    .el-table th {
      font-size: 12px;
      font-weight: 400;
      color: #303133;
      padding: 0;
    }

    .el-pagination {
      text-align: center;

      .el-pager {
        width: auto;
      }
    }
  }
</style>
