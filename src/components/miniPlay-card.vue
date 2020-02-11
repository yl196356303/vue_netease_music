<template>
  <div class="miniPlayContainer">
    <div class="footer_left">
      <span class="iconfont icon-ai10" @click="lastOne"></span>
      <span :class="iconIsPlaying" @click="startPlayOrPause"></span>
      <span class="iconfont icon-ai09" @click="nextOne"></span>
    </div>
    <div class="footer_slider">
      <audio
        v-if="currentSong"
        @play="onPlay"
        @pause="onPause"
        ref="audioRef"
        @loadeddata="getAudioDuration"
        @timeupdate="getCurrentTime"
        @ended="handlePlayEnd"
        :src="currentSong.url">
      </audio>
      <span>{{currentTime * 1000 | dateFormat('mm:ss')}}</span>
      <Progress
        class="progress"
        ref="progressRef"
        @update="onChildClick"/>
      <span>{{currentSong.dt || currentSong.duration || 0 | dateFormat('mm:ss')}}</span>
      <span :class="iconVolume"></span>
      <el-slider
        class="volume"
        @change="volumeChange"
        v-model="volume">
      </el-slider>
    </div>
    <div class="footer_right">
      <el-tooltip
        class="item"
        effect="dark"
        :content="playModelObj.content"
        placement="top"
        :enterable="false">
            <span
              @click="handlePlayModel"
              :class="'iconfont ' + playModelObj.icon">
            </span>
      </el-tooltip>
      <el-tooltip
        :value="playTips"
        :manual="playTipsManual"
        class="item"
        effect="dark"
        content="开始播放歌曲"
        placement="top"
        :enterable="false">
          <span
            class="iconfont icon-plist"
            @click="handlePlaylistShowOrHide">
          </span>
      </el-tooltip>
      <span
        class="iconfont icon-github" @click="linkGithub"></span>
    </div>
  </div>
</template>

<script>
import Progress from './progress.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      iconIsPlaying: 'iconfont icon-bofang',
      iconVolume: 'iconfont icon-yinliang',
      // 默认音量
      volume: 75,
      playModelIndex: 0,
      // 播放模式对象
      playModelObj:
        {
          content: '顺序播放',
          icon: 'icon-catalog_btn_order'
        },
      // 播放模式数组
      playModel: [
        {
          content: '顺序播放',
          icon: 'icon-catalog_btn_order'
        },
        {
          content: '列表循环',
          icon: 'icon-liebiaoxunhuan'
        },
        {
          content: '单曲循环',
          icon: 'icon-danquxunhuan'
        },
        {
          content: '随机播放',
          icon: 'icon-suiji'
        }
      ]
    }
  },
  created () {
    const volume = JSON.parse(window.localStorage.getItem('volume'))
    if (volume) {
      this.volume = volume
    }
  },
  methods: {
    getAudioDuration () {
      this.$refs.audioRef.volume = this.volume / 100
    },
    getCurrentTime (e) {
      if (this.isPlaying) {
        this.handleCurrentTime(e.target.currentTime)
      }

      // 进度条
      const sliderTime = Math.min(this.currentTime / ((this.currentSong.dt || this.currentSong.duration) / 1000), 1) || 0
      this.$refs.progressRef._offset(sliderTime)
    },
    // 点击 and 拖拽
    onChildClick (percent) {
      this.$refs.audioRef.currentTime = ((this.currentSong.dt || this.currentSong.duration) / 1000) * percent
      if (JSON.stringify(this.currentLyric) !== '{}') {
        this.currentLyric.seek(this.$refs.audioRef.currentTime * 1000)
      }
    },
    startPlayOrPause () {
      if (JSON.stringify(this.currentSong) !== '{}') {
        this.PlayOrPauseSwitch()
      }
    },
    volumeChange (index) {
      this.$refs.audioRef.volume = index / 100
      window.localStorage.setItem('volume', index)
    },
    // 上一首
    lastOne () {
      this.isActiveName(this.handleLast)
    },
    handleLast (list) {
      if (!list.length || list.length === 1) {
        return false
      }
      let index = list.indexOf(this.currentSong)
      if (index !== -1) {
        if (index === 0) {
          index = list.length - 1
          this.handleDbClick(list[index])
        } else {
          this.handleDbClick(list[index - 1])
        }
      }
    },
    // 下一首  列表循环
    nextOne () {
      this.isActiveName(this.handleNext)
    },
    handleNext (list) {
      if (!list.length || list.length === 1) {
        return false
      }
      let index = list.indexOf(this.currentSong)
      if (index !== -1) {
        if (index === list.length - 1) {
          index = 0
          this.handleDbClick(list[index])
        } else {
          this.handleDbClick(list[index + 1])
        }
      }
    },
    // 播放结束
    handlePlayEnd () {
      if (this.playModelIndex === 0) {
        this.orderPlay()
      } else if (this.playModelIndex === 1) {
        this.nextOne()
      } else if (this.playModelIndex === 2) {
        this.loopPlay(1000)
      } else if (this.playModelIndex === 3) {
        this.randomPlay()
      }
    },
    // 顺序播放
    orderPlay () {
      this.isActiveName(this.handleOrderPlay)
    },
    handleOrderPlay (list) {
      if (!list.length || list.length === 1) {
        this.clearCurrentSong()
        this.switchIsLyric()
      }
      let index = list.indexOf(this.currentSong)
      if (index !== -1) {
        if (index === list.length - 1) {
          this.clearCurrentSong()
          this.switchIsLyric()
        } else {
          this.handleDbClick(list[index + 1])
        }
      }
    },
    // 单曲循环
    loopPlay (time) {
      setTimeout(() => {
        if (JSON.stringify(this.currentLyric) !== '{}') {
          this.currentLyric.seek(0)
          this.currentLyric.togglePlay()
        }
        this.onPlay()
      }, time)
    },
    // 随机播放
    randomPlay () {
      this.isActiveName(this.handleRandomPlay)
    },
    handleRandomPlay (list) {
      if (!list.length || list.length === 1) {
        return this.loopPlay(1000)
      }
      let index = list.indexOf(this.currentSong)
      const randomIndex = Math.floor(Math.random() * list.length)
      if (index !== -1) {
        if (index === randomIndex) {
          this.handleRandomPlay(list)
        } else {
          this.handleDbClick(list[randomIndex])
        }
      }
      // console.log(index)
      // this.handleDbClick(list[index])
    },
    isActiveName (methods) {
      if (this.activeName === 'first') {
        methods(this.playlist)
      } else if (this.activeName === 'second') {
        methods(this.playRecord)
      }
    },
    handlePlayModel () {
      this.playModelIndex = this.playModel.findIndex(item => {
        return JSON.stringify(item) === JSON.stringify(this.playModelObj)
      })
      if (this.playModelIndex !== -1) {
        if (this.playModelIndex === this.playModel.length - 1) {
          this.playModelIndex = 0
          this.playModelObj = this.playModel[this.playModelIndex]
        } else {
          this.playModelIndex = this.playModelIndex + 1
          this.playModelObj = this.playModel[this.playModelIndex]
        }
      }
    },
    linkGithub () {
      window.open('https://github.com/yl196356303/vue_netease_music')
    },

    ...mapActions([
      'onPlay',
      'onPause',
      'PlayOrPauseSwitch',
      'handleCurrentTime',
      'handlePlaylistShowOrHide',
      'modifyCurrentSong',
      'handleDbClick',
      'clearCurrentSong',
      'switchIsLyric'
    ])
  },
  computed: {
    ...mapState([
      'currentSong',
      'currentTime',
      'isPlaying',
      'playlist',
      'playTips',
      'playTipsManual',
      'activeName',
      'playRecord',
      'currentLyric'
    ]),

    ...mapGetters(['handlePlayingChange'])
  },
  watch: {
    'currentSong': function () {
      this.$nextTick(() => {
        this.iconIsPlaying = this.handlePlayingChange ? 'iconfont icon-zanting' : 'iconfont icon-bofang'
        this.handlePlayingChange ? this.$refs.audioRef.play() : this.$refs.audioRef.pause()
      })
    },
    // 控制播放 and 暂停
    isPlaying () {
      this.$nextTick(() => {
        this.iconIsPlaying = this.handlePlayingChange ? 'iconfont icon-zanting' : 'iconfont icon-bofang'
        this.handlePlayingChange ? this.$refs.audioRef.play() : this.$refs.audioRef.pause()
        if (JSON.stringify(this.currentLyric) !== '{}') {
          this.currentLyric.togglePlay()
        }
      })
    },
    volume () {
      this.iconVolume = this.volume === 0 ? 'iconfont icon-jingyin' : 'iconfont icon-yinliang'
    }
  },
  components: { Progress }
}
</script>

<style lang="scss" type="text/scss">
  .miniPlayContainer {
    display: flex;

    .footer_left {
      height: 60px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex: 3;

      .iconfont {
        font-size: 20px;
        background-color: #C62F2F;
        border-radius: 50%;
        color: #ffffff;
        padding: 8px;
        cursor: pointer;
      }
    }

    .footer_slider {
      display: flex;
      width: auto;
      align-items: center;
      height: 60px;
      flex: 18;

      .iconfont {
        cursor: pointer;
      }

      span {
        flex: .5;
        color: #C62F2F;

        &:nth-of-type(2) {
          margin-left: 15px;
        }
      }

      .progress {
        flex: 8;
      }

      .volume {
        flex: 1;
        margin-left: -2.5%;
      }

      .el-slider {

        .el-slider__runway {
          height: 3px;

          .el-slider__bar {
            height: 3px;
            background-color: #C62F2F;
          }

          .el-tooltip {
            width: 10px;
            height: 10px;
            border: 1px solid #C62F2F;
          }
        }
      }
    }

    .footer_right {
      display: flex;
      align-items: center;
      height: 60px;
      justify-content: space-around;
      flex: 3;

      .iconfont {
        font-size: 18px;
        color: #C62F2F;
        cursor: pointer;
      }

      .icon-github {
        font-size: 24px;
      }
    }
  }
</style>
