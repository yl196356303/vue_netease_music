<template>
  <div>
    <!--tab 区域-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first">
        <Recommend ref="recommendChildRef"/>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <SongSheet ref="songChildRef"/>
      </el-tab-pane>
      <el-tab-pane label="主播电台" name="third">
        <Station ref="stationChildRef"/>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="fourth">排行榜</el-tab-pane>
      <el-tab-pane label="歌手" name="fifth">歌手</el-tab-pane>
      <el-tab-pane label="最新音乐" name="sixth">最新音乐</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Recommend from './recommend/recommend.vue'
import SongSheet from './songSheet/songSheet.vue'
import Station from './station/station.vue'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tag) {
      switch (tag.index) {
        case '0':
          this.$refs.recommendChildRef.getRecommend()
          break
        case '1':
          this.$refs.songChildRef.getSongClass()
          this.$refs.songChildRef.getSongList()
          break
        case '2':
          this.$refs.stationChildRef.getStation()
          this.$nextTick(() => {
            this.$refs.stationChildRef.getDomChild()
          })
          break
        case '3':
          break
        case '4':
          break
        case '5':
          break
        default:
          this.$message.error('出错啦~')
      }
    }
  },
  mounted () {
    this.$refs.recommendChildRef.getRecommend()
  },
  components: { Recommend, SongSheet, Station }
}
</script>

<style lang="scss" type="text/scss">
  .el-tabs__nav-wrap {
    &:after {
      height: 1px!important;
    }
  }

  .el-tabs__nav {
    margin-left: 50%;
    transform: translateX(-50%)!important;
  }

  .el-tab-pane {
    padding: 0px 100px;
  }

  .el-tabs__active-bar {
    background-color: #C62F2F!important;
  }

  .el-tabs__item {
    color: #C62F2F!important;
  }
</style>
