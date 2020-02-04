<template>
  <div class="songListContainer">
    <el-table
      v-show="search.length !== 0"
      :data="search"
      @row-dblclick="rowDbClick"
      style="width: 100%">
      <el-table-column
        width="80px"
        align="center"
        type="index"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        width="90px"
        prop="al.picUrl">
        <template slot-scope="scope">
          <span>
            <i class="el-icon-caret-right"></i>
          </span>
          <el-image :src="scope.row.al.picUrl" lazy></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="音乐标题">
      </el-table-column>
      <el-table-column
        prop="ar[0].name"
        label="歌手">
      </el-table-column>
      <el-table-column
        prop="al.name"
        label="专辑">
      </el-table-column>
      <el-table-column
        prop="dt"
        label="时长">
        <template slot-scope="scope">
          {{scope.row.dt | dateFormat('mm:ss')}}
        </template>
      </el-table-column>
    </el-table>
    <div class="empty" v-if="keyWords && !search.length">
      未找到与
      <span>“{{keyWords}}”</span>
      相关的任何音乐
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      songs: [],
      playlist: {}
    }
  },
  created () {
    this.getSongList()
  },
  methods: {
    async getSongList () {
      const { data: res } = await this.$http.get('playlist/detail', { params: { id: this.id } })
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.playlist = res.playlist
      this.$emit('transmit', this.playlist)
      let arr = []
      if (res.privileges) {
        res.privileges.forEach((item, index) => {
          arr[index] = item.id
        })
      } else {
        return this.$message.error('出错啦~')
      }
      const { data: detailData } = await this.$http.get('song/detail', { params: { ids: arr.join(',') } })
      if (detailData.code !== 200) {
        return this.$message.error('数据获取失败！')
      }
      this.songs = detailData.songs
    },
    indexMethod (index) {
      return index >= 9 ? index + 1 : '0' + (index + 1)
    },
    // 双击播放歌曲
    rowDbClick (row) {
      this.handleDbClick(row)
      // this.$nextTick(() => {
      //   this.onPlay()
      //   this.handlePlayTips()
      // })
    },

    ...mapActions([
      'handleDbClick'
      // 'onPlay',
      // 'handlePlayTips'
    ])
  },
  computed: {
    search () {
      return this.songs.filter(item => {
        if (item.name.includes(this.keyWords)) {
          return item
        }
      })
    }
  },
  props: ['id', 'keyWords']
}
</script>

<style lang="scss" type="text/scss">
  .songListContainer {
    .el-table td, .el-table th {
      border: 0 !important;
    }

    .el-table th {
      font-size: 13px;
      font-weight: 400;
      color: #303133;
      padding: 0;
    }

    .el-image {
      width: 64px;
      height: 64px;
      border-radius: 5px;
    }

    .cell {
      position: relative;

      span {
        z-index: 2;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 24px;
        height: 24px;
        margin: -14px;
        background-color: rgba(245, 245, 247, .5);
        border-radius: 50%;
        line-height: 24px;
        text-align: center;
        font-size: 24px;
        color: #C62F2F;
      }
    }

    .empty {
      width: 100%;
      height: 300px;
      font-size: 14px;
      color: #303133;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: #b3d4fc;
      }
    }
  }
</style>
