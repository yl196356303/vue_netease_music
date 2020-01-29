<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>独家放送</span>
      <span>更多</span>
    </div>
    <ul>
      <li v-for="item in sole" :key="item.id">
        <el-image
          :src="item.picUrl" lazy></el-image>
        <span class="solePlay el-icon-paperclip"></span>
        <p>{{item.name}}</p>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      sole: []
    }
  },
  created () {
    // this.getSole()
  },
  methods: {
    async getSole () {
      const { data: res } = await this.$http.get('/personalized/privatecontent')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.sole = res.result
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

    li {
      width: 340px;
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;

      .soleInfo, .el-image {
        cursor: pointer;
      }

      .el-image {
        width: 100%;
        height: 200px;
      }

      .solePlay {
        position: absolute;
        left: 3%;
        top: 7%;
        padding: 5px;
        border: 1px solid white;
        border-radius: 50%;
        font-size: 20px;
        color: white;
        background-color: rgba(0, 0, 0, .5);
      }
    }

    p {
      margin: 5px 0 0;
      font-size: 13px;
      color: #303133;
      cursor: pointer;
    }
  }
</style>
