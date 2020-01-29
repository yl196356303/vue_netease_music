<template>
  <div class="songRelatedContainer">
    <div class="songRelatedContent" v-if="relatedList.length">
      <p class="title">{{relatedList[0].recommendReason}}</p>
      <div
        v-for="item in relatedList"
        :key="item.id"
        @dblclick="handleClick(item)"
        class="Related-item">
        <div class="song-image">
          <el-image
            :src="item.coverImgUrl || item.album.picUrl"></el-image>
          <span v-if="item.album" class="newestPlay el-icon-caret-right"></span>
        </div>
        <div class="introduce">
          <p>{{item.name}}</p>
          <p v-if="item.playCount" class="playCount">播放：{{item.playCount}}</p>
          <p v-else-if="item.artists">{{item.artists[0].name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data () {
    return {
      relatedList: []
    }
  },
  methods: {
    async getRelatedSong () {
      if (this.currentSongId) {
        const { data: res } = await this.$http.get(`${this.url}?id=${this.currentSongId}`)
        if (res.code !== 200) {
          return this.$message.error('数据获取失败！')
        }
        if (res.playlists) {
          res.playlists.forEach(item => {
            item.playCount = String(item.playCount)
            if (item.playCount.length > 5) {
              item.playCount = item.playCount.slice(0, item.playCount.length - 4) + '万'
            }
          })
          this.relatedList = res.playlists
        } else {
          this.relatedList = res.songs
        }
      }
    },
    handleClick (target) {
      if (target.artists) {
        this.handleDbClick(target)
      } else {
        this.$router.push({ name: 'playlist', params: { id: target.id } })
        this.switchIsLyric()
      }
    },

    ...mapActions([
      'handleDbClick',
      'switchIsLyric'
    ])
  },
  computed: {
    ...mapState(['currentSong']),

    ...mapGetters(['currentSongId'])
  },
  watch: {
    currentSong () {
      this.getRelatedSong()
    }
  },
  props: ['url']
}
</script>

<style scoped lang="scss" type="text/scss">
  .songRelatedContainer {
    padding: 17px 0;
    margin-bottom: 40px;

    .songRelatedContent {

      p {
        margin: 0;
      }

      .title {
        border-bottom: 1px solid #eeeeee;
        margin: 0;
        padding-bottom: 15px;
        font-size: 16px;
      }

      .Related-item {
        display: flex;
        font-size: 13px;
        margin-top: 15px;
        cursor: pointer;

        &:hover {
          background-color: #eeeeee;
        }

        .song-image {
          height: 100%;
          width: 55px;
          position: relative;
          margin-right: 10px;

          .el-image {
            min-width: 55px;
            width: 55px;
            height: 55px;
          }

          .newestPlay {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 5px;
            border: 1px solid white;
            border-radius: 50%;
            font-size: 16px;
            color: white;
            background-color: rgba(0, 0, 0, .5);
          }
        }

        .introduce {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          overflow: hidden;

          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .playCount {
            color: #bbbbbb;
          }
        }
      }
    }
  }
</style>
