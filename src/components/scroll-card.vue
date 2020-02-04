<template>
  <Scroll
    class="lyric-wrapper"
    ref="lyricList"
    :options="{disableTouch: true}"
    :data="currentLyric.lines">
    <div>
      <div class="lyrics">
        <div
          v-if="JSON.stringify(currentLyric) === '{}' || !currentLyric.lines.length"
          class="empty">还没有歌词哦~
        </div>
        <p
          v-else
          v-for="(line, index) in currentLyric.lines"
          :key="index"
          ref="lyricLine"
          :class="getActiveCls(index)">{{line.txt}}</p>
      </div>
    </div>
  </Scroll>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapActions
} from 'vuex'
import Lyric from 'lyric-parser'
import Scroll from './scroll.vue'

export default {
  data () {
    return {
      currentLineNum: 0
    }
  },
  methods: {
    async getLyric () {
      if (this.currentSongId) {
        const { data: res } = await this.$http.get(`lyric?id=${this.currentSongId}`)
        if (res.code !== 200) {
          return this.$message.error('歌词获取失败')
        }
        if (!res.lrc) {
          this.lyric({})
          return -1
        }
        const lyric = new Lyric(res.lrc.lyric, this.handleLyric)
        this.lyric(lyric)
        if (this.isPlaying) {
          this.currentLyric.play()
        }
      }
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      let lineEl = this.$refs.lyricLine[lineNum]
      if (lineNum > 5) {
        // 结合better-scroll，滚动歌词
        this.$refs.lyricList
          .getScroller()
          .scrollToElement(lineEl, 200, 0, true)
      } else {
        this.$refs.lyricList
          .getScroller()
          .scrollToElement(lineEl, 200, 0, true)
      }
    },
    getActiveCls (index) {
      return this.currentLineNum === index ? 'currentActive' : ''
    },

    ...mapActions(['lyric'])
  },
  computed: {
    ...mapState([
      'currentSong',
      'isPlaying',
      'currentTime',
      'currentLyric'
    ]),

    ...mapGetters([
      'currentSongId',
      'handlePlayingChange'
    ])
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      if (JSON.stringify(this.currentLyric) !== '{}') {
        this.currentLineNum = 0
        this.currentLyric.stop()
      }
      this.getLyric()
    }
  },
  components: { Scroll }
}
</script>

<style scoped lang="scss" type="text/scss">
  .lyric-wrapper {
    height: 100%;
    overflow: hidden;

    .lyrics {
      font-size: 13px;

      .empty {
        font-size: 18px;
      }

      p {
        margin: 0 0 20px 0;
      }

      .currentActive {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
