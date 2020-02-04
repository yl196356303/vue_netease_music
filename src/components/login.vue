<template>
  <div :class="{'loginContainer': true, 'isLogin': !!token}">
    <div
      @click="$emit('close')"
      class="close">
      <i class="el-icon-close"></i>
    </div>
    <div
      v-if="!token"
      class="loginPanel">
      <div class="header">
        <span>
          <i class="iconfont icon-wangyiyunyinle1"></i>
        </span>
      </div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginRef">
        <el-form-item
          prop="email">
          <el-input
            clearable
            v-model="loginForm.email"
            placeholder="请输入网易邮箱"></el-input>
        </el-form-item>
        <el-form-item
          prop="password">
          <el-input
            show-password
            clearable
            v-model="loginForm.password"
            placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      v-else
      class="logoutPanel">
      <div class="tips">提示</div>
      <div class="textContent">你确定要注销吗？</div>
      <el-button @click="logout">确定</el-button>
    </div>
  </div>
</template>

<script>
const email = [
  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
]
const password = [
  { required: true, message: '6 ~ 16个字符，区分大小写', trigger: 'change' },
  { min: 6, max: 15, message: '密码应为6 ~ 16个字符', trigger: 'blur' }
]
export default {
  data () {
    return {
      loginForm: {
        email: 'yl1963563303@163.com',
        password: 'yl298753'
      },
      loginRules: {
        email: email,
        password: password
      },
      profile: {},
      token: ''
    }
  },
  created () {
    const token = window.localStorage.getItem('token')
    if (token) {
      this.token = token
    }
  },
  methods: {
    login () {
      this.$refs.loginRef.validate(valid => {
        if (!valid) return
        this.onLogin(this.loginForm)
      })
    },
    async onLogin (options) {
      const defaults = {
        email: '',
        password: ''
      }
      Object.assign(defaults, options)
      const { data: res } = await this.$http.get('login', {
        params: defaults
      })
      if (res.code !== 200) {
        return this.$message.error('邮箱或密码错误')
      }
      this.getUserPlaylist(res.profile.userId)
      this.profile = res.profile
      this.token = res.token
      window.localStorage.setItem('token', this.token)
      window.localStorage.setItem('email', defaults.email)
      window.localStorage.setItem('password', defaults.password)
    },
    async getUserPlaylist (id) {
      const { data: res } = await this.$http.get(`user/playlist?uid=${id}`)
      if (res.code !== 200) {
        return this.$message.error('获取歌单信息失败！')
      }
      this.$emit('playlist', res.playlist, this.profile)
    },
    async logout () {
      const { data: res } = await this.$http.get('logout')
      if (res.code !== 200) {
        return this.$message.error('注销失败')
      }
      this.profile = {}
      this.$emit('getUserInfo', this.profile)
      this.$emit('onLogout')
      window.localStorage.removeItem('token')
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  .isLogin {
    width: 340px !important;
    height: 175px !important;
    top: 30% !important;
  }

  .loginContainer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 525px;
    height: 350px;
    background-color: #ffffff;
    z-index: 999;
    box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, .2);

    .close {
      cursor: pointer;
      width: 40px;
      height: 40px;
      padding: 5px;
      text-align: center;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 9;

      &:hover {
        color: #cccccc;
      }
    }

    .loginPanel {
      width: 100%;
      height: 100%;
      padding: 20px 80px;
      box-sizing: border-box;

      .header {
        display: flex;
        justify-content: center;
        color: #ffffff;
        margin-bottom: 15px;

        span {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #C62F2F;
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            font-size: 80px;
          }
        }
      }

      .el-input {

        .el-input__inner {
          border: 0;
          background-color: #F5F2F0;
        }
      }

      .btn {
        text-align: center;
        margin-top: 30px;

        .el-button {
          width: 70%;
          background-color: #C62F2F;
          border: none;
          font-size: 18px;
          color: #ffffff;
        }
      }
    }

    .logoutPanel {
      padding: 50px 30px 0;
      position: relative;
      color: #C62F2F;

      .tips {
        position: absolute;
        top: 5%;
        left: 3%;
      }

      .el-button {
        margin-top: 30px;
        border: none;
        background-color: #C62F2F;
        width: 100%;
        color: #ffffff;
      }
    }
  }
</style>
