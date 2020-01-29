export default {
  // 当前播放对象
  currentSong: {},
  // 播放状态
  isPlaying: false,
  // 当前播放时间
  currentTime: 0,
  // 播放列表数据
  playlist: [],
  // 播放列表的显示
  isPlaylist: false,
  // 播放提示
  playTipsManual: true,
  playTips: false,
  // 播放历史记录
  playRecord: JSON.parse(window.localStorage.getItem('playRecord')) || [],
  // 当前选中的播放列表
  activeName: 'first',
  // 歌词显示
  isLyric: false,
  // 歌词对象
  currentLyric: {}
}
