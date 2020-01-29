<template>
  <div
    @click="progressClick"
    class="progressContainer"
    ref="progressContainerRef">
    <div
      disabled
      @mousedown="mouseDown"
      class="sliderProgress"
      ref="sliderProgressRef">
    </div>
    <div
      class="progress"
      ref="progressRef">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    mouseDown (e) {
      e = e || event
      // 节点起始位置
      const elementX = this.$refs.sliderProgressRef.offsetLeft
      // 鼠标起始位置
      const startX = e.clientX
      const mouseMove = (e) => {
        this._mouseMove(e, elementX, startX)
      }
      document.addEventListener('mousemove', mouseMove)
      const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
      }
      document.addEventListener('mouseup', mouseUp)
    },
    _mouseMove (e, elementX, startX) {
      e = e || event
      // 鼠标最新位置
      const nowX = e.clientX
      let L = elementX + nowX - startX
      this._offset(L, e)
    },
    _offset (L, c) {
      if (L < 0) {
        L = 0
      } else if (L > this.$refs.progressContainerRef.offsetWidth - this.$refs.sliderProgressRef.clientWidth) {
        L = this.$refs.progressContainerRef.offsetWidth - this.$refs.sliderProgressRef.clientWidth
      }
      if (c) {
        this.$refs.progressRef.style.width = this.$refs.sliderProgressRef.style.left = L + 'px'
        const percent = L / (this.$refs.progressContainerRef.clientWidth - this.$refs.sliderProgressRef.offsetWidth)
        this.$emit('update', percent)
      } else {
        this.$refs.progressRef.style.width = this.$refs.sliderProgressRef.style.left =
          L * (this.$refs.progressContainerRef.clientWidth - this.$refs.sliderProgressRef.offsetWidth) + 'px'
      }
    },
    progressClick (e) {
      const percent =
        (e.clientX - this.$refs.progressContainerRef.offsetLeft) /
        (this.$refs.progressContainerRef.clientWidth - this.$refs.sliderProgressRef.offsetWidth)
      this.$emit('update', percent)
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .progressContainer {
    width: 100%;
    height: 3px;
    background-color: #E4E7ED;
    border-radius: 2px;
    position: relative;
    cursor: pointer;

    .sliderProgress {
      width: 10px;
      height: 10px;
      background-color: #ffffff;
      border: 1px solid #C62F2F;
      border-radius: 50%;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: -5px;
      z-index: 999;

      &:hover {
        box-shadow: 2px 2px 5px #303133;
      }
    }

    .progress {
      height: 100%;
      background-color: #C62F2F;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
