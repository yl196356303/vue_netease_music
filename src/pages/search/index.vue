<template>
  <div
    id="search"
    class="search-detail">
    <div class="search-header">
      <span>搜索</span>
      <span>“{{$route.params.keywords}}”</span>
      <span>，找到{{count}}个结果</span>
    </div>
    <div class="search-tabs">
      <div class="tabs-header">
        <span
          :class="getAcvCl(tabsIndex)"
          @click="onTabsClick(tabs.to, tabsIndex)"
          v-for="(tabs, tabsIndex) in tabs"
          :key="tabsIndex">{{tabs.title}}</span>
      </div>
      <router-view @count="getCount"></router-view>
    </div>
  </div>
</template>

<script>
const tabs = [
  {
    title: '单曲',
    key: 'songs',
    to: 'songs'
  },
  {
    title: '歌单',
    key: 'playlists',
    to: 'playlists'
  },
  {
    title: 'MV',
    key: 'mvs',
    to: 'mvs'
  }
]
export default {
  created () {
    this.currentActiveSearchIndex = Number(window.sessionStorage.getItem('currentActiveSearchIndex'))
  },
  data () {
    return {
      tabs: tabs,
      currentActiveSearchIndex: 0,
      count: 0
    }
  },
  methods: {
    onTabsClick (path, index) {
      this.currentActiveSearchIndex = index
      window.sessionStorage.setItem('currentActiveSearchIndex', this.currentActiveSearchIndex)
      this.$router.push(path)
    },
    getAcvCl (index) {
      return this.currentActiveSearchIndex === index ? 'tabsActive' : ''
    },
    getCount (count) {
      this.count = count
    }
  },
  watch: {
    '$route.path': function (newVal, oldVal) {
      const newPath = newVal.split('/')
      const oldPath = oldVal.split('/')
      if (JSON.stringify(newPath[2]) === JSON.stringify(oldPath[2])) {
        return
      }
      this.currentActiveSearchIndex = 0
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .search-detail {
    .search-header {
      padding: 30px;

      span {
        &:nth-of-type(2) {
          font-size: 30px;
          font-weight: bold;
        }
      }
    }

    .search-tabs {
      .tabs-header {
        padding: 0 30px;
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #eeeeee;
        font-size: 18px;

        span {
          color: #aaaaaa;
          cursor: pointer;
          display: inline-block;
          height: 100%;
          width: 48px;
          margin-right: 20px;
        }

        .tabsActive {
          color: #C62F2F;
        }
      }
    }
  }
</style>
