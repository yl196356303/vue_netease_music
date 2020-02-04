<template>
  <div class="headContainer">
    <div
      v-if="playObj.coverImgUrl"
      class="headImg">
      <el-image :src="playObj.coverImgUrl"></el-image>
    </div>
    <div class="headInfo">
      <div class="headInfo-title">
        <p>{{playObj.name}}</p>
      </div>
      <div class="headInfo-logo" v-if="playObj.creator">
        <span>
          <el-image :src="playObj.creator.avatarUrl"></el-image>
        </span>
        <span>{{playObj.creator.nickname}}</span>
        <span>{{playObj.createTime | dateFormat('YYYY-MM-DD')}}创建</span>
      </div>
      <div class="headInfo-play">
        <i class="el-icon-video-play"></i>
        <span>播放全部</span>
      </div>
      <div class="headInfo-tag">
        <p v-if=" playObj.tags.length">
          标签：
          <span v-for="(item, index) in playObj.tags" :key="index">
            {{item}}
            <i v-if="playObj.tags.length - 1 !== index">/</i>
          </span>
        </p>
        <p v-if="playObj.description">简介：{{playObj.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['playObj']
}
</script>

<style scoped lang="scss" type="text/scss">
  .headContainer {
    padding: 40px;
    display: flex;
    color: #303133;
    height: 210px;

    .headImg {
      width: 210px;
      height: 100%;

      .el-image {
        width: 210px;
        height: 100%;
      }
    }

    .headInfo {
      margin-left: 30px;

      p {
        margin: 0;
      }

      .headInfo-title {
        font-size: 20px;
        margin-bottom: 10px;
      }

      .headInfo-logo {
        height: 40px;
        display: flex;
        line-height: 40px;
        margin-bottom: 10px;

        span {
          cursor: pointer;

          &:first-of-type {
            width: 40px;
            height: 100%;

            .el-image {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          &:nth-of-type(2) {
            height: 100%;
            font-size: 16px;
            color: #C62F2F;
            margin-left: 10px;
          }

          &:last-of-type {
            font-size: 12px;
            color: #aaaaaa;
            margin-left: 15px;
            cursor: default;
          }
        }
      }

      .headInfo-play {
        box-sizing: border-box;
        width: 100px;
        height: 35px;
        cursor: pointer;
        padding: 5px 10px;
        background-color: #C62F2F;
        color: #ffffff;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 3px;
        margin-bottom: 10px;

        i {
          font-size: 20px;
        }
      }

      .headInfo-tag {
        font-size: 13px;

        span {
          cursor: pointer;
          margin-right: 4px;
          color: #b3d4fc;

          &:last-of-type {
            margin-right: 0;
          }

          i {
            margin-right: 4px;
            color: #b3d4fc;
          }
        }

        p {
          &:last-of-type {
            margin-top: 10px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
</style>
