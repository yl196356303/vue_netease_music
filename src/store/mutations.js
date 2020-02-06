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
import collect from 'collect.js'

export default {
  [HANDLE_CURRENT_SONG] (state, song) {
    state.currentSong = song
    state.playlist.push(song)
    state.playlist = collect(state.playlist).unique(function (item) {
      return item.id
    }).all()
    state.playRecord.push(song)
    state.playRecord = collect(state.playRecord).unique(function (item) {
      return item.id
    }).all()
    window.localStorage.setItem('playRecord', JSON.stringify(state.playRecord))
    state.isPlaylist = false
  },
  [HANDLE_CURRENT_TIME] (state, Time) {
    state.currentTime = Time
  },
  [HANDLE_PLAY] (state) {
    state.isPlaying = true
  },
  [HANDLE_PAUSE] (state) {
    state.isPlaying = false
  },
  [HANDLE_SWITCH] (state) {
    state.isPlaying = !state.isPlaying
  },
  [HANDLE_CLEAR_SONG_LIST] (state) {
    state.playlist = []
    state.currentSong = {}
    state.isPlaying = false
    state.currentTime = 0
  },
  [HANDLE_PLAYLIST_SHOW_OR_HIDE] (state) {
    state.isPlaylist = !state.isPlaylist
  },
  [HANDLE_PLAY_TIPS] (state) {
    state.playTips = true
    state.playTipsManual = false
    setTimeout(() => {
      state.playTips = false
      state.playTipsManual = true
    }, 1000)
  },
  [HANDLE_CLEAR_PLAY_RECORD] (state) {
    state.playRecord = []
    window.localStorage.removeItem('playRecord')
  },
  [CLEAR_CURRENT_SONG] (state) {
    state.currentSong = {}
    state.isPlaying = false
    state.currentTime = 0
  },
  [SWITCH_IS_LYRIC] (state) {
    state.isLyric = !state.isLyric
  },
  [LYRIC] (state, lyric) {
    state.currentLyric = lyric
  }
}
