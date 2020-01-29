<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <span>更多</span>
    </div>
    <ul>
      <div class="popular" v-for="item in list" :key="item.id * Math.random()">
        <li>
          <div class="popularInfo">
            {{item.name}}
          </div>
          <el-image
            :src="item.picUrl" lazy></el-image>
        </li>
        <p>{{item.copywriter || item.rcmdtext}}</p>
      </div>
    </ul>
  </el-card>
</template>

<script>
export default {
  computed: {
    title () {
      if (this.list.length !== 0 && this.list[0].desc) {
        return this.list[0].category
      }
      return '热门电台推荐'
    }
  },
  props: ['list']
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
      min-height: 200px;
      margin-bottom: 20px;
      width: 165px;

      li {
        height: 165px;
        width: 100%;
        position: relative;
        overflow: hidden;

        .popularInfo, .el-image {
          cursor: pointer;
        }

        .popularInfo {
          position: absolute;
          bottom: 0;
          box-sizing: border-box;
          width: 100%;
          z-index: 2;
          padding: 5px 8px;
          line-height: 20px;
          color: white;
          background: linear-gradient(transparent 10%, rgba(0, 0, 0, 0.3));
          font-size: 12px;
          transition: .5s;
        }

        .el-image {
          width: 100%;
          height: 100%;
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
