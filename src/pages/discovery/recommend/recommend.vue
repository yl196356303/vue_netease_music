<template>
    <div>
      <Banner :banners="banners"/>
      <Popular ref="popularChildRef"/>
      <Sole ref="soleChildRef"/>
      <Newest ref="newestChildRef"/>
      <Mv :mvs="mvs"/>
    </div>
</template>

<script>
import Banner from '../../../components/banner.vue'
import Popular from './popular.vue'
import Sole from './sole.vue'
import Newest from './newest.vue'
import Mv from '../../../components/mv.vue'
export default {
  data () {
    return {
      banners: [],
      mvs: []
    }
  },
  methods: {
    getRecommend () {
      this.$refs.popularChildRef.getPopular()
      this.$refs.soleChildRef.getSole()
      this.$refs.newestChildRef.getNewest()
      this.getMv()
      this.getBanner()
    },
    async getBanner () {
      const { data: res } = await this.$http.get('banner?type=0')
      if (res.code !== 200) {
        return this.$message.error('数据获取失败！')
      }
      this.banners = res.banners
    },
    async getMv () {
      const { data: res } = await this.$http.get('/personalized/mv')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.mvs = res.result
    }
  },
  components: { Banner, Popular, Sole, Newest, Mv }
}
</script>

<style scoped>

</style>
