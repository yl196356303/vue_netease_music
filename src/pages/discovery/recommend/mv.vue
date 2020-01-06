<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>推荐MV</span>
      <span>更多</span>
    </div>
    <ul>
      <div class="mv" v-for="item in recommendMv" :key="item.id">
        <li>
          <div class="mvContent">{{item.copywriter}}</div>
          <el-image
            :src="item.picUrl"></el-image>
        </li>
        <div class="mvInfo">
          <p>{{item.name}}</p>
          <p>{{item.artistName}}</p>
        </div>
      </div>
    </ul>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      recommendMv: []
    }
  },
  created () {
    // this.getMv()
  },
  methods: {
    async getMv () {
      const { data: res } = await this.$http.get('/personalized/mv')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.recommendMv = res.result
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

    .mv {
      min-height: 250px;
      margin-bottom: 30px;
      width: 250px;

      li {
        width: 100%;
        position: relative;
        overflow: hidden;

        .mvContent, .el-image {
          cursor: pointer;
        }

        .mvContent {
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
          .mvContent {
            transform: translateY(0px);
          }
        }

        .el-image {
          width: 100%;
          height: 150px;
        }
      }

      .mvInfo {
        font-size: 13px;
        color: #303133;

        p {
          margin: 5px 0 0;
          cursor: pointer;

          &:last-of-type {
            margin: 3px 0 0;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
