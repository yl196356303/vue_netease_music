<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in banners" :key="item.scm || index">
      <el-image :src="item.imageUrl || item.pic"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: ['banners']
}
</script>

<style scoped type="text/scss" lang="scss">
    .el-carousel__item {
      .el-image {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
</style>
