<template>
  <el-container>
    <!--头部区域-->
    <el-header>
      <div class="home_header_logo">
        <span><i class="iconfont icon-wangyiyunyinle1"></i></span>
        <span>网易云音乐</span>
      </div>
      <div class="home_header_left">
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-right"></i>
        <el-input
          @focus="showSearch"
          @blur="hideSearch"
          @input="handleInputChang"
          @keypress.native.enter="onEnterPress"
          v-model="searchValue"
          placeholder="搜索音乐、MV、歌词、歌单"
          suffix-icon="el-icon-search">
        </el-input>
      </div>
      <div class="home_header_right">
        <!--头像-->
        <el-avatar
          v-if="JSON.stringify(user) === '{}'"
          icon="el-icon-user-solid"
          :size="28"></el-avatar>
        <el-avatar
          v-else
          :src="user.avatarUrl" :size="28"></el-avatar>
        <div
          @click="showLoginPanel"
          class="login">
          <span v-if="JSON.stringify(user) === '{}'">未登录</span>
          <span v-else>{{user.nickname}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <i class="iconfont icon-pifu"></i>
        <i class="iconfont icon-xinxiduanxinxiaoxitixingyoujiansixinyouxiang"></i>
        <i class="el-icon-setting"></i>
      </div>
    </el-header>
    <!--登录区域-->
    <Login
      v-if="isLoginPanel"
      @onLogout="onLogout"
      @playlist="getUserPlaylist"
      @getUserInfo="getUserInfo"
      @close="closeLoginPanel"/>
    <!--页面主体区域-->
    <el-container>
      <!--搜索栏-->
      <Search
        ref="searchRef"
        v-if="isSearch"
        :searchRecord="searchRecord"
        @clearSearchRecord="clearSearchRecord"
        @getKeywords="getKeywords"/>
      <!--歌曲详情区域-->
      <div :class="{'mainMask': true, 'isMainMask': isLyric}">
        <SongInfo/>
      </div>
      <!--mv详情区域-->
      <div
        v-if="path"
        class="mvDetail isMainMask">
        <router-view name="mv"></router-view>
      </div>
      <!--左侧导航栏-->
      <el-aside width="200px" :class="{'isHeight': JSON.stringify(currentSong) === '{}'}">
        <div class="menu-item" v-for="(list, listIndex) in title" :key="listIndex">
          <span class="item-span">{{list.name}}</span>
          <ul>
            <li
              :class="loop(listIndex, index)"
              v-for="(item, index) in menu[listIndex]"
              :key="index"
              @click="switchMenu(index, listIndex, item.path, item.id)">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </li>
          </ul>
        </div>
        <div class="song" v-if="JSON.stringify(currentSong) !== '{}'">
          <div
            class="songInfo">
            <el-image v-if="currentSong.al" :src="currentSong.al.picUrl"></el-image>
            <el-image v-else-if="currentSong.album" :src="currentSong.album.picUrl"></el-image>
            <!--遮罩-->
            <div class="mask" @click="switchIsLyric">
              <span class="el-icon-arrow-down"></span>
              <span class="el-icon-arrow-up"></span>
            </div>
            <div class="introduce">
              <p>{{currentSong.name}}</p>
              <p v-if="currentSong.ar">{{currentSong.ar[0].name}}</p>
              <p v-else-if="currentSong.artists">{{currentSong.artists[0].name}}</p>
            </div>
          </div>
          <div class="share">
            <p class="iconfont icon-bierenxihuanpx"></p>
            <p class="el-icon-link"></p>
          </div>
        </div>
      </el-aside>
      <!--右侧主体内容-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!--播放列表-->
    <PlaylistCard v-if="isPlaylist"/>
    <!-- 底部播放区域-->
    <el-footer>
      <MiniPlay/>
    </el-footer>
  </el-container>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import MiniPlay from './miniPlay-card.vue'
import PlaylistCard from './playllist-card.vue'
import SongInfo from './songInfo-card.vue'
import Search from './search.vue'
import Login from './login.vue'

const title = [
  { name: '推荐' },
  { name: '我的音乐' }
]
const menu = [
  [
    {
      title: '发现音乐',
      icon: 'iconfont icon-yinle',
      path: 'discovery'
    },
    {
      title: '私人FM',
      icon: 'iconfont icon-FM',
      path: 'fm'
    },
    {
      title: 'MV',
      icon: 'iconfont icon-shipin',
      path: 'mvs'
    },
    {
      title: '朋友',
      icon: 'iconfont icon-pengyou',
      path: 'dynamic'
    }
  ],
  [
    {
      title: '本地音乐',
      icon: 'iconfont icon-bendiyinle',
      path: 'local'
    },
    {
      title: '下载管理',
      icon: 'iconfont icon-xiazai',
      path: 'download'
    },
    {
      title: '我的音乐云盘',
      icon: 'iconfont icon-yunpan',
      path: 'cloud'
    },
    {
      title: '我的收藏',
      icon: 'iconfont icon-wodeshoucang',
      path: 'collection'
    }
  ]
]

export default {
  data () {
    return {
      title: title,
      menu: menu,
      currentIndex: 0,
      isSearch: false,
      searchValue: '',
      searchRecord: [],
      isLoginPanel: false,
      user: {},
      playlist: []
    }
  },
  created () {
    this.currentIndex = Number(window.sessionStorage.getItem('currentIndex'))
    const searchRecord = window.localStorage.getItem('searchRecord')
    if (searchRecord) {
      this.searchRecord = JSON.parse(window.localStorage.getItem('searchRecord'))
    }
    const token = window.localStorage.getItem('token')
    if (token) {
      const email = window.localStorage.getItem('email')
      const password = window.localStorage.getItem('password')
      this.onLogin({
        email,
        password
      })
    }
  },
  methods: {
    loop (listIndex, index) {
      if ((
        listIndex === 0 && this.currentIndex === index
      ) || (
        listIndex === 1 && this.currentIndex === (
          index + this.menu[listIndex - 1].length)
      ) || (
        listIndex === 2 && this.currentIndex === (
          index + this.menu[listIndex - 1].length + this.menu[listIndex - 2].length)
      ) || (
        listIndex === 3 && this.currentIndex === (
          index + this.menu[listIndex - 1].length + this.menu[listIndex - 2].length + this.menu[listIndex - 3].length)
      )) {
        return 'active'
      } else {
        return ''
      }
    },
    switchMenu (index, listIndex, paht, id) {
      switch (listIndex) {
        case 0:
          this.currentIndex = index
          window.sessionStorage.setItem('currentIndex', this.currentIndex)
          break
        case 1:
          this.currentIndex = (
            index + this.menu[listIndex - 1].length)
          window.sessionStorage.setItem('currentIndex', this.currentIndex)
          break
        case 2:
          this.currentIndex = (
            index + this.menu[listIndex - 1].length + this.menu[listIndex - 2].length)
          window.sessionStorage.setItem('currentIndex', this.currentIndex)
          break
        case 3:
          this.currentIndex = (
            index + this.menu[listIndex - 1].length + this.menu[listIndex - 2].length + this.menu[listIndex - 3].length)
          window.sessionStorage.setItem('currentIndex', this.currentIndex)
          break
        default:
          this.$message.error('出错啦~')
      }
      if (id) {
        this.$router.push({ name: paht, params: { id } })
      } else {
        this.$router.push({ name: paht })
      }
    },
    showSearch () {
      this.isSearch = true
      this.$nextTick(() => {
        this.$refs.searchRef.getSearchKeywords(this.searchValue)
      })
    },
    hideSearch () {
      this.isSearch = false
    },
    handleInputChang () {
      this.isSearch = true
      this.$nextTick(() => {
        this.$refs.searchRef.getSearchKeywords(this.searchValue)
      })
    },
    getKeywords (keywords) {
      const result = this.searchRecord.some(item => {
        return item === keywords
      })
      if (!result) {
        this.searchRecord.push(keywords)
        window.localStorage.setItem('searchRecord', JSON.stringify(this.searchRecord))
      }
      this.searchValue = keywords
      this.$router.push({ name: 'search', params: { keywords: this.searchValue } })
    },
    onEnterPress () {
      this.$router.push({ name: 'search', params: { keywords: this.searchValue } })
      this.isSearch = false
      this.searchRecord.push(this.searchValue)
      window.localStorage.setItem('searchRecord', JSON.stringify(this.searchRecord))
    },
    clearSearchRecord () {
      setTimeout(() => {
        this.isSearch = true
      })
      this.searchRecord = []
      window.localStorage.setItem('searchRecord', JSON.stringify(this.searchRecord))
    },
    showLoginPanel () {
      this.isLoginPanel = true
    },
    closeLoginPanel () {
      this.isLoginPanel = false
    },
    getUserInfo (data) {
      this.user = data
      this.isLoginPanel = false
    },
    async onLogin (options) {
      const defaults = {
        email: '',
        password: ''
      }
      Object.assign(defaults, options)
      const { data: res } = await this.$http.get('login', {
        params: defaults
      })
      if (res.code !== 200) {
        return this.$message.error('邮箱或密码错误')
      }
      const { data: resPlaylist } = await this.$http.get(`user/playlist?uid=${res.profile.userId}`)
      if (res.code !== 200) {
        return this.$message.error('获取歌单信息失败！')
      }
      this.getUserPlaylist(resPlaylist.playlist, res.profile)
      window.localStorage.setItem('token', res.token)
      window.localStorage.setItem('email', defaults.email)
      window.localStorage.setItem('password', defaults.password)
    },
    getUserPlaylist (playlist, user) {
      this.getUserInfo(user)
      this.playlist = playlist
      const a = []
      const b = []
      playlist.forEach(item => {
        if (item.creator.userId === this.user.userId) {
          const result = this.title.some(title => {
            return title.name === '创建的歌单'
          })
          if (!result) {
            this.title.push({ name: '创建的歌单' })
          }
          let { name, id } = item
          const nameIndex = name.indexOf(item.creator.nickname)
          if (nameIndex !== -1) {
            name = name.replace(item.creator.nickname, '我')
          }
          a.push({
            title: name,
            icon: 'iconfont icon-yinleliebiao',
            path: 'playlist',
            id: id
          })
        } else {
          const result = this.title.some(title => {
            return title.name === '收藏的歌单'
          })
          if (!result) {
            this.title.push({ name: '收藏的歌单' })
          }
          const { name, id } = item
          b.push({
            title: name,
            icon: 'iconfont icon-yinleliebiao',
            path: 'playlist',
            id: id
          })
        }
      })
      this.menu.push(a, b)
    },
    onLogout () {
      this.title.forEach((item, index) => {
        if (item.name === '创建的歌单' || item.name === '收藏的歌单') {
          this.title.splice(index, 2)
        }
      })
    },

    ...mapActions(['switchIsLyric'])
  },
  computed: {
    path () {
      return this.$route.path.includes('/mv/')
    },

    ...mapState([
      'currentSong',
      'isPlaylist',
      'isLyric'
    ])
  },
  components: {
    MiniPlay,
    PlaylistCard,
    SongInfo,
    Search,
    Login
  }
}
</script>

<style lang="scss" type="text/scss">
  .el-header {
    background-color: #C62F2F;
    height: 65px !important;
    display: flex;
    align-items: center;

    .home_header_logo {
      line-height: 24px;

      span {
        &:first-of-type {
          display: inline-block;
          width: 23px;
          height: 23px;
          border-radius: 50%;
          background-color: white;
          text-align: center;
          line-height: 24px;

          i {
            font-size: 20px;
            color: #C62F2F;
          }
        }

        &:last-of-type {
          font-size: 18px;
          color: white;
          margin-left: 15px;
        }
      }
    }

    .home_header_left {
      display: flex;
      align-items: center;
      transform: translateX(14%);

      i {
        height: 25px;
        width: 35px;
        line-height: 25px;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, .1);
        color: white;
        cursor: pointer;

        &:first-of-type {
          border-right: 0;
        }
      }

      .el-input__inner {
        color: white;
        margin-left: 20px;
        border: 0;
        width: 280px;
        height: 30px !important;
        font-size: 12px;
        background-color: rgba(255, 255, 255, .1);
      }

      .el-input__suffix {
        right: 20px;
        top: 2px;

        .el-icon-search {
          border: 0;
          color: #cccccc;
        }
      }
    }

    .home_header_right {
      position: absolute;
      right: 3%;
      display: flex;
      align-items: center;
      line-height: 25px;
      font-size: 14px;
      color: rgba(255, 255, 255, .7);
      cursor: pointer;

      .el-avatar {
        background-color: #eeeeee;

        i {
          margin: 0;
        }
      }

      .login {
        margin-left: 15px;

        &:hover {
          color: #ffffff;
        }

        i {
          margin-left: 8px;
        }

        span {
          font-size: 14px;
        }
      }

      i {
        font-size: 18px;
        margin-left: 15px;

        &:nth-of-type(3) {
          font-size: 14px;
        }
      }
    }
  }

  .isHeight {
    height: auto !important;
  }

  .el-aside {
    background-color: #F5F5F7;
    font-size: 13px;
    color: #303133;
    overflow-x: hidden !important;
    padding-top: 15px;
    position: relative;
    height: 565px;
    box-sizing: border-box;

    .menu-item {
      .item-span {
        padding-left: 10px;
      }

      ul {
        font-size: 14px;

        li {
          height: 40px;
          line-height: 40px;
          width: 100%;
          cursor: pointer;
          padding-left: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;

          .iconfont {
            font-size: 18px;
            margin-right: 10px;
          }

          &:hover {
            background-color: #eeeeee;
            color: #C62F2F;
          }
        }
      }
    }

    .song {
      width: 200px;
      height: 65px;
      display: flex;
      padding: 3px 5px;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      bottom: 60px;
      box-sizing: border-box;
      border-top: 1px solid #cccccc;
      z-index: 2;
      background-color: #F5F5F7;

      .el-image, p, .mask {
        cursor: pointer;
      }

      .songInfo {
        display: flex;
        align-items: center;
        width: 80%;
        position: relative;

        .mask {
          position: absolute;
          background-color: rgba(0, 0, 0, .5);
          line-height: 55px;
          text-align: center;
          opacity: 0;
          transition: .5s;

          &:hover {
            opacity: 1;
          }

          span {
            display: block;
            color: #cccccc;
            font-size: 24px;
          }
        }

        .el-image, .mask {
          min-width: 55px;
          width: 55px;
          height: 55px;
        }

        .introduce {
          margin-left: 5px;
          font-size: 12px;
          overflow: hidden;

          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .share {
        margin-top: 5px;

        p {
          padding: 7px 0;
          margin: 0;

          &:first-of-type {
            font-size: 12px;
          }

          &:last-of-type {
            font-size: 16px;
          }
        }
      }
    }
  }

  .el-footer {
    background-color: #F5F5F7;
    border-top: 1px solid #cccccc;
    z-index: 999;
  }

  .el-container {
    height: 100%;
    overflow: hidden;
    position: relative;

    .active {
      background-color: #eeeeee;
      color: #C62F2F;
    }
  }

  .mainMask, .mvDetail {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #F9F9F9;
    width: 100%;
    height: 100%;
    z-index: 3;
    transition: all .5s;
    transform: translateY(100%);
    overflow: auto;
  }

  .isMainMask {
    transform: translateY(0);
  }
</style>
