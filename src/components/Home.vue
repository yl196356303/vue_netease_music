<template>
  <el-container>
    <!--头部区域-->
    <el-header>
      <div class="home_header_logo">
        <span><i class="iconfont icon-wangyiyunyinle1"></i></span>
        <span>网易云音乐</span>
      </div>
      <div class="home_header_left">
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-right"></i>
        <el-input
          v-model="value1"
          placeholder="搜索音乐、视频、歌词、电台"
          suffix-icon="el-icon-search" @input="change($event)">
        </el-input>
      </div>
      <div class="home_header_right">
        <!--头像-->
        <el-avatar icon="el-icon-user-solid" :size="28"></el-avatar>
        <span>未登录</span>
        <i class="el-icon-caret-bottom"></i>
        <i class="iconfont icon-pifu"></i>
        <i class="iconfont icon-xinxiduanxinxiaoxitixingyoujiansixinyouxiang"></i>
        <i class="el-icon-setting"></i>
      </div>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--左侧导航栏-->
      <el-aside width="200px">
        <span class="item-span">推荐</span>
        <ul>
          <li>
            <i class="iconfont icon-yinle"></i>
            <span>发现音乐</span>
          </li>
          <li>
            <i class="iconfont icon-FM"></i>
            <span>私人FM</span>
          </li>
          <li>
            <i class="iconfont icon-shipin"></i>
            <span>视频</span>
          </li>
          <li>
            <i class="iconfont icon-pengyou"></i>
            <span>朋友</span>
          </li>
        </ul>
        <span class="item-span">我的音乐</span>
        <ul>
          <li>
            <i class="iconfont icon-bendiyinle"></i>
            <span>本地音乐</span>
          </li>
          <li>
            <i class="iconfont icon-xiazai"></i>
            <span>下载管理</span>
          </li>
          <li>
            <i class="iconfont icon-yunpan"></i>
            <span>我的音乐云盘</span>
          </li>
          <li>
            <i class="iconfont icon-wodeshoucang"></i>
            <span>我的收藏</span>
          </li>
        </ul>
        <el-collapse>
          <el-collapse-item title="创建的歌单">
            <i class="iconfont icon-yinleliebiao"></i>
            <span>我的收藏</span>
          </el-collapse-item>
          <el-collapse-item title="收藏的歌单">
            <i class="iconfont icon-yinleliebiao"></i>
            <span>我的收藏</span>
          </el-collapse-item>
        </el-collapse>
        <div class="song">
          <div class="songInfo">
            <img src="https://p1.music.126.net/PJNV84mjt_mDXEkxtjzB4w==/18957779486268444.jpg?param=400y400">
            <!--遮罩-->
            <div class="mask">
              <span class="el-icon-arrow-down"></span>
              <span class="el-icon-arrow-up"></span>
            </div>
            <div class="introduce">
              <p>歌曲</p>
              <p>歌手</p>
            </div>
          </div>
          <div class="share">
            <p class="iconfont icon-bierenxihuanpx"></p>
            <p class="el-icon-link"></p>
          </div>
        </div>
      </el-aside>
      <!--右侧主体内容-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 底部播放区域-->
    <el-footer>
      <el-row>
        <el-col :span="3">
          <div class="footer_left">
            <span class="iconfont icon-ai10"></span>
            <span class="iconfont icon-bofang"></span>
            <span class="iconfont icon-ai09"></span>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="footer_slider">
            <span>00:00</span>
            <el-slider
              class="progress"
              v-model="value"
              :format-tooltip="formatTooltip">
            </el-slider>
            <span>00:00</span>
            <span class="iconfont icon-yinliang"></span>
            <el-slider
              class="volume"
              v-model="value">
            </el-slider>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="footer_right">
            <span class="iconfont icon-catalog_btn_order"></span>
            <span class="iconfont icon-plist"></span>
            <span class="iconfont icon-github"></span>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      value: 36,
      value1: ''
    }
  },
  methods: {
    formatTooltip (val) {
      return val / 100
    }
  }
}
</script>

<style lang="scss" type="text/scss">

  .el-main {
    padding: 10px 35px!important;
  }

  .el-header {
    background-color: #C62F2F;
    height: 65px!important;
    display: flex;
    align-items: center;

    .home_header_logo {
      line-height: 24px;
      span {
        &:first-of-type {
          display: inline-block;
          width: 23px;
          height: 23px;
          border-radius: 50%;
          background-color: white;
          text-align: center;
          line-height: 24px;

          i {
            font-size: 20px;
            color: #C62F2F;
          }
        }

        &:last-of-type {
          font-size: 18px;
          color: white;
          margin-left: 15px;
        }
      }
    }

    .home_header_left {
      display: flex;
      align-items: center;
      transform: translateX(14%);

      i {
        height: 25px;
        width: 35px;
        line-height: 25px;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, .1);
        color: white;
        cursor: pointer;

        &:first-of-type {
          border-right: 0;
        }
      }

      .el-input__inner {
        color: white;
        margin-left: 20px;
        border: 0;
        width: 280px;
        height: 30px!important;
        font-size: 12px;
        background-color: rgba(255, 255, 255, .1);
      }

      .el-input__suffix {
        right: 20px;
        top: 2px;

        .el-icon-search {
          border: 0;
          color: #cccccc;
        }
      }
    }

    .home_header_right {
      position: absolute;
      right: 15px;
      display: flex;
      align-items: center;
      line-height: 25px;
      width: 250px;
      justify-content: space-between;
      font-size: 14px;
      color: rgba(255, 255, 255, .7);
      cursor: pointer;

      .el-avatar {
        transform: translateX(10px);
        background-color: #eeeeee;

        .el-icon-user-solid {
          transform: translateX(0);
        }
      }

      span {
        font-size: 14px;
      }

      i {
        font-size: 18px;
        &:nth-of-type(1) {
          transform: translate(-8px, 1px);
        }
        &:nth-of-type(3) {
          font-size: 14px;
        }
      }
    }
  }
  .el-aside {
    background-color: #F5F5F7;
    font-size: 13px;
    color: #303133;
    overflow-x: hidden!important;
    padding-top: 15px;
    position: relative;
    height: 565px;
    box-sizing: border-box;

    .item-span {
      padding-left: 10px;
    }

    ul {
      font-size: 14px;
      li {
        height: 40px;
        line-height: 40px;
        width: 100%;
        cursor: pointer;
        padding-left: 20px;

        .iconfont {
          font-size: 18px;
          margin-right: 10px;
        }
      }
      :hover {
        background-color: #eeeeee;
        color: #C62F2F;
      }
    }

    .el-collapse {
      border: 0;

      .el-collapse-item__header {
        background-color: #F5F5F7;
        border: 0;
        padding-left: 10px;

        .el-collapse-item__arrow {
          margin: 0 0 0 90px;
        }
      }

      .el-collapse-item__wrap {
        background-color: #F5F5F7;
        border: 0;

        :hover {
          background-color: #eeeeee;
          color: #C62F2F;
        }

        .el-collapse-item__content {
          padding-bottom: 0px;
          padding-left: 20px;
          height: 40px;
          line-height: 40px;

          .iconfont {
            font-size: 18px;
            margin-right: 10px;
          }
        }
      }
    }

    .song {
      width: 200px;
      height: 65px;
      display: flex;
      padding: 3px 5px;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      bottom: 60px;
      box-sizing: border-box;
      border-top: 1px solid #cccccc;
      z-index: 2;
      background-color: #F5F5F7;

      img, p, .mask{
        cursor: pointer;
      }
      .songInfo {
        display: flex;
        align-items: center;
        width: 70%;
        position: relative;

        .mask {
          position: absolute;
          background-color: rgba(0, 0, 0, .5);
          line-height: 55px;
          text-align: center;
          opacity: 0;
          transition: .5s;

          &:hover {
            opacity: 1;
          }

          span {
            display: block;
            color: #cccccc;
            font-size: 24px;
          }
        }

        img, .mask {
          width: 55px;
          height: 55px;
        }

        .introduce {
          margin-left: 5px;
          font-size: 12px;
        }
      }

      .share {
        margin-top: 5px;
        p {
          padding: 7px 0;
          margin: 0;

          &:first-of-type {
            font-size: 12px;
          }

          &:last-of-type {
            font-size: 16px;
          }
        }
      }
    }
  }
  .el-footer {
    background-color: #F5F5F7;
    border-top: 1px solid #cccccc;

    .footer_left {
      height: 60px;
      width: 170px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .iconfont {
        font-size: 20px;
        background-color: #C62F2F;
        border-radius: 50%;
        color: #ffffff;
        padding: 8px;
        cursor: pointer;
      }
    }

    .footer_slider {
      display: flex;
      width: auto;
      align-items: center;
      height: 60px;

      .iconfont {
        cursor: pointer;
      }

      span {
        flex: .5;
        color: #C62F2F;

        &:nth-of-type(2) {
          margin-left: 15px;
        }
      }

      .progress {
        flex: 8;
      }

      .volume {
        flex: 1;
        transform: translateX(-30px);
      }

      .el-slider {

        .el-slider__runway {
          height: 3px;
          .el-slider__bar {
            height: 3px;
            background-color: #C62F2F;
          }

          .el-tooltip {
            width: 10px;
            height: 10px;
            border: 1px solid #C62F2F;
          }
        }
      }
    }

    .footer_right {
      display: flex;
      align-items: center;
      height: 60px;
      justify-content: space-around;

      .iconfont {
        font-size: 18px;
        color: #C62F2F;
        cursor: pointer;
      }

      .icon-github {
        font-size: 24px;
      }
    }
  }
  .el-container {
    height: 100%;
    overflow: hidden;
  }
</style>
