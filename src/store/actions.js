import {
  HANDLE_CURRENT_SONG,
  HANDLE_CURRENT_TIME,
  HANDLE_PLAY,
  HANDLE_PAUSE,
  HANDLE_SWITCH,
  HANDLE_CLEAR_SONG_LIST,
  HANDLE_PLAYLIST_SHOW_OR_HIDE,
  HANDLE_PLAY_TIPS,
  HANDLE_CLEAR_PLAY_RECORD,
  CLEAR_CURRENT_SONG,
  SWITCH_IS_LYRIC,
  LYRIC
} from './types.js'
import axios from 'axios'
import { Message } from 'element-ui'

export default {
  async handleDbClick ({ commit }, song) {
    const { data: res } = await axios.get(`song/url?id=${song.id}`)
    // 检查是否能播放
    if (res.code !== 200 || !res.data[0].url) {
      this.dispatch('clearCurrentSong')
      return Message.error('播放失败')
    }
    song.url = res.data[0].url
    this.dispatch('onPlay')
    this.dispatch('handlePlayTips')
    commit(HANDLE_CURRENT_SONG, song)
  },
  handleCurrentTime ({ commit }, Time) {
    commit(HANDLE_CURRENT_TIME, Time)
  },
  onPlay ({ commit }) {
    commit(HANDLE_PLAY)
  },
  onPause ({ commit }) {
    commit(HANDLE_PAUSE)
  },
  PlayOrPauseSwitch ({ commit }) {
    commit(HANDLE_SWITCH)
  },
  clearPlayList ({ commit }) {
    commit(HANDLE_CLEAR_SONG_LIST)
  },
  handlePlaylistShowOrHide ({ commit }) {
    commit(HANDLE_PLAYLIST_SHOW_OR_HIDE)
  },
  handlePlayTips ({ commit }) {
    commit(HANDLE_PLAY_TIPS)
  },
  clearPlayRecord ({ commit }) {
    commit(HANDLE_CLEAR_PLAY_RECORD)
  },
  clearCurrentSong ({ commit }) {
    commit(CLEAR_CURRENT_SONG)
  },
  switchIsLyric ({ commit }) {
    commit(SWITCH_IS_LYRIC)
  },
  lyric ({ commit }, lyric) {
    commit(LYRIC, lyric)
  }
}
