<template>
    <div>
      <Banner :banners="banners"/>
      <Popular ref="popularChildRef"/>
      <Sole ref="soleChildRef"/>
      <Newest ref="newestChildRef"/>
      <Mv ref="mvChildRef"/>
    </div>
</template>

<script>
import Banner from '../../../components/banner.vue'
import Popular from './popular.vue'
import Sole from './sole.vue'
import Newest from './newest.vue'
import Mv from './mv.vue'
export default {
  data () {
    return {
      banners: []
    }
  },
  created () {
    this.getBanner()
  },
  methods: {
    getRecommend () {
      this.$refs.popularChildRef.getPopular()
      this.$refs.soleChildRef.getSole()
      this.$refs.newestChildRef.getNewest()
      this.$refs.mvChildRef.getMv()
    },
    async getBanner () {
      const { data: res } = await this.$http.get('banner?type=0')
      if (res.code !== 200) {
        return this.$message.error('数据获取失败！')
      }
      this.banners = res.banners
    }
  },
  components: { Banner, Popular, Sole, Newest, Mv }
}
</script>

<style scoped>

</style>
