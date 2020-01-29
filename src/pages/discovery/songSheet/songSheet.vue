<template>
  <div class="songContainer">
    <div class="songNav">
      <span @click="getSongList()">热门：</span>
      <div class="song-item" v-for="(item, index) in classification" :key="item.id">
        <span :class="cat === item.name ? 'active' : ''" @click="getSongList(item.name)">{{item.name}}</span>
        <el-divider v-if="(index + 1) !== classification.length" direction="vertical"></el-divider>
      </div>
    </div>
    <SongCard :list="thunkedList[0]"/>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import SongCard from '../../../components/song-card.vue'

export default {
  data () {
    return {
      classification: [],
      songList: [],
      limit: 100,
      cat: '',
      total: 0
    }
  },
  methods: {
    async getSongClass () {
      const { data: res } = await this.$http.get('playlist/hot')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.classification = res.tags
    },
    async getSongList (tag) {
      tag = tag || '全部'
      const { data: res } = await this.$http.get(`top/playlist?limit=${this.limit}&cat=${tag}`)
      if (res.code !== 200) {
        return this.$message.error('数据获取失败！')
      }
      this.songList = res.playlists
      this.cat = res.cat
      this.total = res.total
    },
    handleCurrentChange (val) {
      this.limit = this.limit * val
      this.getSongList(this.cat)
    }
  },
  computed: {
    page () {
      return this.songList.length / 100
    },
    thunkedList () {
      return [
        this.songList.slice((this.page - 1) * 100, this.limit)
      ]
    }
  },
  components: { SongCard }
}
</script>

<style lang="scss" type="text/scss">
  .songContainer {
    margin-top: 20px;
    color: #303133;
    font-size: 13px;

    .songNav {

      span {
        cursor: pointer;
      }

      display: flex;

      .song-item {
        span {
          padding: 3px 8px;
          cursor: pointer;
        }
      }

      .el-divider {
        background-color: #cccccc;
        margin: 0 15px;
      }
    }

    .el-pagination {
      text-align: center;
      ul {
        width: auto!important;
      }
    }

    .active {
      background-color: rgba(198, 47, 47, .8);
      color: white;
      border-radius: 3px;
    }
  }
</style>
