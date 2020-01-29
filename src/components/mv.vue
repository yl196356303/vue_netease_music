<template>
  <el-card class="box-card">
    <div v-if="!total" slot="header" class="clearfix">
      <span>推荐MV</span>
      <span>更多</span>
    </div>
    <ul>
      <div
        class="mv"
        v-for="item in mvs"
        :key="item.id"
        @click="goMvDetail(item.id)">
        <li>
          <div class="playCount">
            <i class="iconfont icon-shipin"></i>
            <span>{{item.playCount}}</span>
          </div>
          <div class="duration" v-if="total">
            <span>{{item.duration | dateFormat('mm:ss')}}</span>
          </div>
          <div class="mvContent" v-if="item.copywriter">{{item.copywriter}}</div>
          <el-image
            :src="item.picUrl || item.cover" lazy></el-image>
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
  methods: {
    goMvDetail (id) {
      this.$router.push({ name: 'mv', params: { id } })
    }
  },
  props: ['mvs', 'total']
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

        .duration, .playCount {
          width: 100%;
          box-sizing: border-box;
          padding: 0 5px;
          position: absolute;
          font-size: 12px;
          color: #ffffff;
          z-index: 2;
          left: 0;
        }

        .duration {
          bottom: 4px;
          line-height: 30px;
          background: linear-gradient(transparent 20%, rgba(0, 0, 0, .5));
        }

        .playCount {
          text-align: right;
          top: 0;
          line-height: 20px;
          background: linear-gradient(to right, transparent 70%, rgba(0, 0, 0, .5));

          i {
            margin-right: 5px;
          }
        }

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
