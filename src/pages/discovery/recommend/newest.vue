<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>最新音乐</span>
      <span>更多</span>
    </div>
    <div class="newestContainer">
      <div class="newestContent" v-for="(list, index) in thunkedList" :key="index">
        <li :class="(index1 + 1) % 2 === 0 ? 'active' : ''" v-for="(item, index1) in thunkedList[index]" :key="item.id">
          <div class="newestContent-index">
            <span>{{index && index1 === 4 ? null : 0}}{{index === 1 ? index1 + 6 : index1 + 1}}</span>
          </div>
          <div class="newestContent-image">
            <el-image
              :src="item.picUrl"></el-image>
            <span class="newestPlay el-icon-caret-right"></span>
          </div>
          <div class="newestContent-Info">
            <span>{{item.name}}</span>
            <span>{{item.song.artists[0].name}}</span>
          </div>
        </li>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      chunkLimit: 5,
      newest: []
    }
  },
  created () {
    // this.getNewest()
  },
  methods: {
    async getNewest () {
      const { data: res } = await this.$http.get('personalized/newsong')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.newest = res.result
    }
  },
  computed: {
    thunkedList () {
      return [
        this.newest.slice(0, this.chunkLimit),
        this.newest.slice(this.chunkLimit, this.newest.length)
      ]
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .clearfix {
    font-size: 18px;
    display: flex;
    justify-content: space-between;

    span {

      &:last-of-type {
        cursor: pointer;
        font-size: 12px;
        line-height: 24px;
      }
    }
  }

  .newestContainer {
    width: 100%;
    display: flex;
    margin-bottom: 30px;

    .newestContent {
      border: 1px solid #eeeeee;
      flex: 1;
      font-size: 13px;
      box-sizing: border-box;
      overflow: hidden;

      &:nth-of-type(2) {
        border-left: 0;
      }

      li {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        padding: 5px 10px;

        &:hover {
          background-color: #eeeeee;
        }

        .el-image, span {
          cursor: pointer;
        }

        .newestContent-image {
          height: 100%;
          width: 60px;
          position: relative;
          margin: 0 8px 0 12px;

          .newestPlay {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 5px;
            border: 1px solid white;
            border-radius: 50%;
            font-size: 16px;
            color: white;
            background-color: rgba(0, 0, 0, .5);
          }
        }

        .newestContent-Info {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
  }

  .active {
    background-color: #19fffa;
  }
</style>
