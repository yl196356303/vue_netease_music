<template>
  <div class="tableCardContainer">
    <el-card>
      <div slot="header" class="clearfix">
        <span>总共{{list.length}}首</span>
        <div v-if="list.length" class="clearSong" @click="$emit('clearPlayList')">
          <i class="el-icon-delete"></i>
          <span>清空</span>
        </div>
      </div>
      <div class="tableContainer">
        <el-table
          @row-dblclick="rowDbClick"
          v-if="list.length"
          height="600"
          :data="list"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="音乐标题"
            width="180">
          </el-table-column>
          <el-table-column
            label="歌手"
            width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.ar">{{scope.row.ar[0].name}}</span>
              <span v-else-if="scope.row.artists">{{scope.row.artists[0].name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dt || duration"
            label="时长">
            <template slot-scope="scope">
              {{scope.row.dt || scope.row.duration | dateFormat('mm:ss')}}
            </template>
          </el-table-column>
        </el-table>
        <span
          class="empty"
          v-if="!list.length">
          你还没有添加任何歌曲
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    rowDbClick (row) {
      this.handleDbClick(row)
      // this.onPlay()
      // this.handlePlayTips()
    },

    ...mapActions([
      'handleDbClick'
      // 'onPlay',
      // 'handlePlayTips'
    ])
  },
  props: ['list']
}
</script>

<style lang="scss" type="text/scss">
  .tableCardContainer {
    height: 100%;

    .el-card {
      height: 100%;

      .clearfix {
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        font-size: 13px;

        .clearSong {
          cursor: pointer;

          i {
            font-size: 14px;
            margin-right: 5px;
          }
        }
      }

      .tableContainer {
        height: 100%;

        .el-table td, .el-table th {
          border: 0 !important;
        }

        .el-table th {
          font-size: 13px;
          font-weight: 400;
          color: #303133;
          padding: 0;
        }

        .el-table td {
          font-size: 12px;
          padding: 8px 0;
        }

        .el-table {
          &:before {
            height: 0;
          }
        }

        .empty {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .el-card__body {
        height: 86%;
      }
    }
  }
</style>
