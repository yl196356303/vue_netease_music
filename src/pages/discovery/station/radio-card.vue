<template>
  <div ref="radioContainerRef" class="radioContainer">
    <a class="radioPre el-icon-arrow-left" ref="preRef" @click="pre()" href="javascript:;"></a>
    <div ref="radioContentRef" class="radioContent">
      <ul ref="ulRef">
        <li>
          <p class="el-icon-s-data"></p>
          <p>排行榜</p>
        </li>
        <li v-for="item in radios" :key="item.id">
          <el-image :src="item.picMacUrl"></el-image>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <a class="radioNext el-icon-arrow-right" ref="nextRef" @click="next()" href="javascript:;"></a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radios: [],
      flag: true
    }
  },
  created () {
    this.getRadio()
  },
  methods: {
    transitionEnd () {
      this.$refs.ulRef.addEventListener('transitionend', () => {
        this.$refs.preRef.style.display = this.$refs.ulRef.offsetLeft === 0 ? 'none' : 'block'
        this.$refs.nextRef.style.display = this.$refs.radioContentRef.offsetWidth >= this.$refs.ulRef.offsetWidth + this.$refs.ulRef.offsetLeft ? 'none' : 'block'
        this.flag = true
      })
    },
    pre () {
      if (this.flag) {
        this.flag = false
        this.$refs.ulRef.style.left = this.$refs.ulRef.offsetLeft + this.$refs.radioContentRef.offsetWidth + 'px'
        this.transitionEnd()
      }
    },
    next () {
      if (this.flag) {
        this.flag = false
        this.$refs.ulRef.style.left = this.$refs.ulRef.offsetLeft - this.$refs.radioContentRef.offsetWidth + 'px'
        this.transitionEnd()
      }
    },
    getDom () {
      this.$refs.radioContentRef.style.width = this.$refs.radioContainerRef.offsetWidth - (this.$refs.preRef.offsetWidth + this.$refs.nextRef.offsetWidth) + 'px'
      this.$refs.preRef.style.display = this.$refs.ulRef.offsetLeft === 0 ? 'none' : 'block'
      this.$refs.nextRef.style.display = this.$refs.radioContentRef.offsetWidth >= this.$refs.ulRef.offsetWidth + this.$refs.ulRef.offsetLeft ? 'none' : 'block'
    },
    async getRadio () {
      const { data: res } = await this.$http.get('/dj/catelist')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.radios = res.categories
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .radioContainer {
    width: 100%;
    height: 60px;
    display: flex;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    margin: 30px 0 60px;

    .radioContent {
      width: 100%;
      height: 100%;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;

      ul {
        list-style: none;
        height: 100%;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        transition: .5s;
        margin: 0;
        display: flex;
        width: auto;

        li {
          height: 60px;
          width: 60px;
          flex-shrink: 0;
          font-size: 13px;
          color: #aaaaaa;
          text-align: center;
          line-height: 90px;
          position: relative;
          cursor: pointer;
          margin-right: 49px;
          border-radius: 5px;

          &:hover {
            background-color: #eeeeee;
          }

          &:first-of-type {
            line-height: 0;
            color: #C62F2F;

            p {
              &:first-of-type {
                font-size: 24px;
                margin: 5px 0;
              }

              margin: 10px 0;
            }
          }

          &:last-of-type {
            margin-right: 0;
          }

          .el-image {
            width: 70px;
            position: absolute;
            left: 78%;
            top: 80%;
            transform: translate(-50%, -50%);
            clip: rect(0px, 35px, 35px, 0px);
          }
        }
      }
    }

    .radioPre {
      position: absolute;
      left: 0;
    }

    .radioNext {
      position: absolute;
      right: 0;
    }

    .radioPre, .radioNext {
      text-align: center;
      height: 100%;
      z-index: 2;
      width: 42px;
      font-size: 36px;
      color: #cccccc;
      text-decoration: none;
      display: flex;
      line-height: 60px;
      background-color: transparent;
    }
  }
</style>
