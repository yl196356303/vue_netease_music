<template>
  <div class="PlayListContainer">
    <el-tabs
      v-model="$store.state.activeName"
      type="card">
      <el-tab-pane
        name="first"
        label="播放列表">
        <TableCard
          :list="playlist"
          @clearPlayList="clearPlayList"/>
      </el-tab-pane>
      <el-tab-pane
        name="second"
        label="历史记录">
        <TableCard
          :list="playRecord"
          @clearPlayList="clearPlayRecord"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableCard from './table-card.vue'

export default {
  methods: {
    ...mapActions([
      'clearPlayList',
      'clearPlayRecord'
    ])
  },
  computed: {
    ...mapState([
      'playlist',
      'playRecord'
    ])
  },
  components: { TableCard }
}
</script>

<style lang="scss" type="text/scss">
  .PlayListContainer {
    height: 92%;
    width: 30%;
    background-color: #ffffff;
    z-index: 999;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);

    .el-tabs {
      height: 100%;

      .el-tabs__header {
        border: 0;
        background: none;

        .el-tabs__item {
          color: #303133 !important;
          border: 0;
        }

        .is-active {
          color: #C62F2F !important;
          background-color: #b3d4fc !important;
        }
      }

      .el-tabs__content {
        height: 100%;
        padding: 0;

        .el-tab-pane {
          height: 100%;
          padding: 0;
        }
      }
    }
  }
</style>
