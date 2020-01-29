export default {
  handlePlayingChange (state) {
    return state.isPlaying
  },
  currentSongId (state) {
    return state.currentSong.id
  }
}
