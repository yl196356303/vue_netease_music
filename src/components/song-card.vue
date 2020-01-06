<template>
  <el-card class="box-card">
    <ul>
      <div class="popular" v-for="item in list" :key="item.id * Math.random()">
        <li>
          <div class="popularInfo">
            <span class="el-icon-user"></span>
            {{item.creator.nickname}}
          </div>
          <el-image
            :src="item.coverImgUrl"></el-image>
          <span class="popularPlay el-icon-caret-right"></span>
        </li>
        <p>{{item.name}}</p>
      </div>
    </ul>
  </el-card>
</template>

<script>
export default {
  props: ['list', 'more']
}
</script>

<style scoped lang="scss" type="text/scss">
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
        height: 200px;
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

        &:hover {
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
          transition: .5s;
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
