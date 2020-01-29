<template>
  <div class="songInfoContainer">
    <div class="songInfoContent">
      <div class="song">
        <div class="right">
          <img
            class="play-bar-support" src="../assets/images/play-bar-support.png"/>
          <img
            :class="{'play-bar': true, 'play': isPlaying}"
            src="../assets/images/play-bar.png"/>
          <div class="img-outer-border">
            <div
              :class="{'img-wrap': true, 'paused': isPlaying}">
              <div class="img-inside" v-if="currentSong">
                <el-image
                  v-if="currentSong.al"
                  :src="currentSong.al.picUrl"></el-image>
                <el-image
                  v-else-if="currentSong.album"
                  :src="currentSong.album.picUrl"></el-image>
              </div>
            </div>
          </div>
        </div>
        <div class="left">
          <div class="songName">
            <span>{{currentSong.name}}</span>
            <span @click="switchIsLyric">
              <i class="el-icon-arrow-down"></i>
            </span>
          </div>
          <div class="singer">
            歌手：
            <span v-if="currentSong.ar">{{currentSong.ar[0].name}}</span>
            <span v-else-if="currentSong.artists">{{currentSong.artists[0].name}}</span>
          </div>
          <div class="lyric">
            <Scroll/>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottomRight">
          <Comment
            :id="currentSongId"
            :url="commentUrl"
            :type="commentHotType"/>
        </div>
        <div class="bottomLeft">
          <SongRelated :url="relatedSheetUrl"/>
          <SongRelated :url="relatedSongUrl"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import Comment from './comments.vue'
import SongRelated from './song-Related.vue'
import Scroll from './scroll-card.vue'
export default {
  data () {
    return {
      // 歌曲评论请求路径
      commentUrl: 'comment/music',
      // 热门评论类型
      commentHotType: 0,
      // 相关歌单请求路径
      relatedSheetUrl: 'simi/playlist',
      // 相关歌曲请求路径
      relatedSongUrl: 'simi/song'
    }
  },
  methods: {
    ...mapActions(['switchIsLyric'])
  },
  computed: {
    ...mapGetters(['currentSongId']),

    ...mapState([
      'currentSong',
      'isPlaying'
    ])
  },
  components: { Comment, SongRelated, Scroll }
}
</script>

<style scoped lang="scss" type="text/scss">
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .songInfoContainer {

    .songInfoContent {
      margin: auto;
      width: 70%;

      .song {
        width: 100%;
        display: flex;
        overflow: hidden;

        .right {
          position: relative;
          left: 0;
          top: 0;
          padding: 85px 70px 100px 85px;

          .play-bar-support {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            z-index: 3;
          }

          .play-bar {
            position: absolute;
            left: 50%;
            transform: translateX(-5%) rotate(-30deg);
            transition: all .3s ;
            transform-origin: left top;
            top: 0;
            width: 120px;
            height: 170px;
            z-index: 2;
          }

          .play {
            transform: translateX(-5%) rotate(0);
          }

          .img-outer-border {
            width: 342px;
            height: 342px;
            background-color: #E6E5E6;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            .img-wrap {
              width: 320px;
              height: 320px;
              border-radius: 50%;
              background-color: #303133;
              display: flex;
              justify-content: center;
              align-items: center;
              animation: rotate 20s linear infinite;
              animation-play-state: paused;

              &.paused {
                animation-play-state: running;
              }

              .img-inside {
                width: 230px;
                height: 230px;
                border-radius: 50%;
                text-align: center;

                .el-image {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
              }
            }
          }
        }

        .left {
          padding-top: 60px;
          width: 100%;

          .songName {
            font-size: 25px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;

            span {
              &:last-of-type {
                cursor: pointer;
                width: 40px;
                height: 25px;
                line-height: 25px;
                color: #cccccc;
                background-color: #eeeeee;
                text-align: center;

                &:hover {
                  background-color: #e9e9e9;
                  color: #C62F2F;
                }
              }
            }
          }

          .singer {
            font-size: 13px;
            margin-bottom: 30px;
          }

          .lyric {
            height: 350px;
          }
        }
      }

      .bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .bottomRight {
          width: 60%;
        }

        .bottomLeft {
          width: 30%;
        }
      }
    }
  }
</style>
