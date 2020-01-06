<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>推荐歌单</span>
      <span>更多</span>
    </div>
    <ul>
      <div class="popular" v-for="item in personalized" :key="item.id" @click="handlePopularClick(item.id)">
        <li>
          <div class="popularInfo">{{item.copywriter}}</div>
          <el-image
            :src="item.picUrl"></el-image>
          <span class="popularPlay el-icon-caret-right"></span>
        </li>
        <p>{{item.name}}</p>
      </div>
    </ul>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      personalized: []
    }
  },
  methods: {
    async getPopular () {
      const { data: res } = await this.$http.get('personalized?limit=10')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.personalized = res.result
    },
    handlePopularClick (id) {
      this.$router.push({ name: 'playlist', params: { id } })
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

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .popular {
      min-height: 250px;
      margin-bottom: 30px;
      width: 200px;

      li {
        width: 100%;
        position: relative;
        overflow: hidden;

        .popularInfo, .el-image {
          cursor: pointer;
        }

        .popularInfo {
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          z-index: 2;
          padding: 5px 8px;
          line-height: 20px;
          color: white;
          background-color: rgba(0, 0, 0, .3);
          font-size: 12px;
          transform: translateY(-60px);
          transition: .5s;
        }

        &:hover {
          .popularInfo {
            transform: translateY(0px);
          }

          .popularPlay {
            opacity: 1;
          }
        }

        .el-image {
          width: 100%;
          height: 200px;
        }

        .popularPlay {
          position: absolute;
          right: 3%;
          bottom: 7%;
          padding: 5px;
          border: 1px solid white;
          border-radius: 50%;
          font-size: 20px;
          color: white;
          background-color: rgba(0, 0, 0, .5);
          opacity: 0;
        }
      }

      p {
        margin: 5px 0 0;
        font-size: 13px;
        color: #303133;
        cursor: pointer;
      }
    }
  }
</style>
