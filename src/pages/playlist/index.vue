<template>
  <div class="playContainer">
    <Head :playObj="playlist"/>
    <div class="playContent">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first">
          <SongList
            :keyWords="keyWord"
            ref="songListRef"
            :id="id"
            @transmit="getChildrenSong"/>
        </el-tab-pane>
        <el-tab-pane :label="'评论（' + commentTotal +'）'" name="second">
          <Comments
            ref="commentRef"
            :url="commentUrl"
            :type="commentHotType"
            :id="id"
            @comment="getChildComments"/>
        </el-tab-pane>
      </el-tabs>
      <el-input
        placeholder="搜索歌单音乐"
        prefix-icon="el-icon-search"
        v-model="keyWord">
      </el-input>
    </div>
  </div>
</template>

<script>
import Head from './head.vue'
import SongList from './songlist.vue'
import Comments from '../../components/comments.vue'

export default {
  data () {
    return {
      activeName: 'first',
      // head 数据对象
      playlist: {},
      commentTotal: 0,
      // 搜索关键字
      keyWord: '',
      // 评论请求路径
      commentUrl: 'comment/playlist',
      // 热门评论类型
      commentHotType: 2
    }
  },
  methods: {
    // 去 songlist 子组件拿数据
    getChildrenSong (data) {
      this.playlist = data
    },
    // 去 comments 子组件拿数据
    getChildComments (data) {
      this.commentTotal = data
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  watch: {
    '$route.path': function () {
      this.$nextTick(() => {
        this.$refs.songListRef.getSongList()
      })
    }
  },
  components: { Head, SongList, Comments }
}
</script>

<style lang="scss" type="text/scss">
  .playContainer {

    .playContent {
      position: relative;

      .el-tabs__nav {
        margin-left: 3%;
        transform: none !important;
      }

      .el-tab-pane {
        padding: 0;
      }

      .el-input {
        width: 150px;
        position: absolute;
        right: 2%;
        top: 0;

        &:hover {
          .el-input__inner {
            background-color: #eeeeee;
          }
        }

        .el-input__inner {
          border: 0;
          height: 30px;
          background-color: transparent;

          &:focus {
            background-color: #eeeeee;
          }
        }

        span {
          i {
            line-height: 30px;
          }
        }
      }
    }

  }
</style>
