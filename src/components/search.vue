<template>
  <div class="searchContainer">
    <div
      v-if="!order.length"
      class="searchContentHot">
      <div class="record" v-if="searchRecord.length">
        <div class="recordTitle">
          <span>搜索历史</span>
          <i
            @mousedown="$emit('clearSearchRecord')"
            class="el-icon-delete"></i>
        </div>
        <div class="searchRecord">
          <span
            v-for="(tag, index) in searchRecord"
            :key="index"
            @mousedown="handleHotMDown(tag)"
            class="searchRecord-item">
            {{tag}}
          </span>
        </div>
      </div>
      <div class="hot">
        <div class="hotTitle">
          <p>热搜榜</p>
        </div>
        <div
          v-for="(item, index) in searchHot"
          :key="index"
          @mousedown="handleHotMDown(item.searchWord)"
          class="searchHot-item">
          <div class="searchHot-index">
            {{index + 1}}
          </div>
          <div class="searchHot-detail">
            <div class="detail-top">
              <span>{{item.searchWord}}</span>
              <span>{{item.score}}</span>
              <div
                class="detail-image"
                v-if="item.iconUrl">
                <el-image
                  :src="item.iconUrl"></el-image>
              </div>
            </div>
            <div class="detail-bottom">
              <p>{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="searchPanel">
      <div
        v-for="(lines, linesIndex) in order"
        :key="linesIndex"
        class="search-suggest">
        <div class="suggest-title">
          <i :class="'iconfont ' + suggestTitle(lines).icon"></i>
          <span>{{suggestTitle(lines).title}}</span>
        </div>
        <div
          @mousedown="handleSuggest(lines, item)"
          v-for="(item, index) in suggestItem(lines)"
          :key="index"
          class="suggest-item">
          <span>{{item.name}}</span>
          &nbsp;-&nbsp;
          <span v-if="item.artists">{{item.artists[0].name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['searchRecord'],
  data () {
    return {
      searchHot: [],
      order: [],
      songs: [],
      playLists: [],
      mvs: []
    }
  },
  created () {
    this.getSearchHot()
  },
  methods: {
    async getSearchHot () {
      const { data: res } = await this.$http.get('search/hot/detail')
      if (res.code !== 200) {
        return this.$message.error('热门搜索数据获取失败！')
      }
      this.searchHot = res.data
    },
    async getSearchKeywords (keywords) {
      if (!keywords.trim()) {
        this.order = this.songs = this.playLists = this.mvs = []
        return
      }
      const { data: res } = await this.$http.get(`search/suggest?keywords=${keywords}`)
      if (res.code !== 200) {
        return this.$message.error('搜索失败！')
      }
      if (res.result.order) {
        this.order = res.result.order.filter(item => {
          return item.includes('songs') || item.includes('playlists') || item.includes('mvs')
        })
        if (res.result.songs) {
          this.songs = res.result.songs
        }
        if (res.result.playlists) {
          this.playLists = res.result.playlists
        }
        if (res.result.mvs) {
          this.mvs = res.result.mvs
        }
      } else {
        this.order = this.songs = this.playLists = this.mvs = []
      }
    },
    suggestTitle (target) {
      if (target === 'songs') {
        return {
          icon: 'icon-wangyiyunyinle1',
          title: '单曲'
        }
      } else if (target === 'playlists') {
        return {
          icon: 'icon-yinleliebiao',
          title: '歌单'
        }
      } else if (target === 'mvs') {
        return {
          icon: 'icon-shipin',
          title: 'MV'
        }
      }
    },
    suggestItem (target) {
      if (target === 'songs') {
        return this.songs
      } else if (target === 'playlists') {
        return this.playLists
      } else if (target === 'mvs') {
        return this.mvs
      }
    },
    handleHotMDown (keywords) {
      this.$emit('getKeywords', keywords)
    },
    async handleSuggest (target, source) {
      if (target === 'songs') {
        const { data: res } = await this.$http.get(`song/detail?ids=${source.id}`)
        if (res.code !== 200) {
          return this.$message.error('播放失败！')
        }
        return this.handleDbClick(res.songs[0])
      } else if (target === 'playlists') {
        return this.$router.push({ name: 'playlist', params: { id: source.id } })
      } else if (target === 'mvs') {
        return this.$router.push({ name: 'mv', params: { id: source.id } })
      }
    },

    ...mapActions(['handleDbClick'])
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .searchContainer {
    width: 30%;
    height: auto;
    max-height: 80%;
    overflow: auto;
    position: absolute;
    left: 280px;
    top: 0;
    z-index: 999;
    background-color: #ffffff;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, .2);

    .searchContentHot {
      p {
        margin: 0;
      }

      .record {
        .recordTitle {
          font-size: 14px;
          color: #aaaaaa;
          margin: 15px 0 25px 20px;

          i {
            cursor: pointer;
            font-size: 16px;
            margin-left: 5px;
          }
        }

        .searchRecord {
          padding: 0 35px;
        }

        .searchRecord-item {
          cursor: pointer;
          padding: 3px 15px;
          font-size: 13px;
          border-radius: 12px;
          border: 1px solid #cccccc;
          display: inline-block;
          margin: 0 15px 10px 0;

          &:hover {
            background-color: #eeeeee;
          }
        }
      }

      .hot {
        .hotTitle {
          font-size: 14px;
          color: #aaaaaa;
          margin: 25px 0 25px 20px;
        }

        .searchHot-item {
          width: 100%;
          height: 50px;
          display: flex;
          cursor: pointer;
          padding: 5px 0 3px;

          &:hover {
            background-color: #eeeeee;
          }

          .searchHot-index {
            width: 50px;
            height: 100%;
            text-align: center;
            line-height: 50px;
          }

          .searchHot-detail {
            .detail-top {
              display: flex;
              height: 25px;

              span {
                margin-right: 15px;

                &:first-of-type {
                  font-size: 13px;
                  font-weight: bold;
                  color: #303133;
                }

                &:last-of-type {
                  font-size: 13px;
                  color: #cccccc;
                }
              }

              .detail-image {
                .el-image {
                  width: 30%;
                  vertical-align: middle;
                }
              }
            }

            .detail-bottom {
              font-size: 13px;
              color: #cccccc;
            }
          }
        }
      }

    }

    .searchPanel {
      padding-top: 10px;

      .search-suggest {
        font-size: 13px;
        margin-bottom: 15px;

        .suggest-title {
          color: #aaaaaa;
          padding-left: 8px;
          margin-bottom: 8px;

          i {
            margin-right: 3px;
          }
        }

        .suggest-item {
          width: 100%;
          padding: 8px 0 8px 30px;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            background-color: #eeeeee;
          }

          span {
            &:first-of-type {
              color: #c4a4dd;
            }

            &:last-of-type {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
