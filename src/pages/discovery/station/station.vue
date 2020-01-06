<template>
  <div>
    <Banner :banners="banners"/>
    <Radio ref="radioRef"/>
    <StationCard :list="hots"/>
    <StationCard :list="creations"/>
    <StationCard :list="electronics"/>
    <StationCard :list="storys"/>
    <StationCard :list="books"/>
  </div>
</template>

<script>
import Banner from '../../../components/banner.vue'
import Radio from './radio-card.vue'
import StationCard from '../../../components/station-card.vue'
export default {
  data () {
    return {
      banners: [],
      hots: [],
      creations: [],
      electronics: [],
      storys: [],
      books: []
    }
  },
  methods: {
    async getBanner () {
      const { data: res } = await this.$http.get('dj/banner')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.banners = res.data
    },
    getDomChild () {
      this.$refs.radioRef.getDom()
    },
    async getHot () {
      const { data: res } = await this.$http.get('dj/hot?limit=7')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.hots = res.djRadios
    },
    async getCreation () {
      const { data: res } = await this.$http.get('dj/radio/hot?cateId=2001&limit=1')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.creations = res.djRadios
    },
    async getElectronics () {
      const { data: res } = await this.$http.get('dj/radio/hot?cateId=10002&limit=0')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.electronics = res.djRadios
    },
    async getStory () {
      const { data: res } = await this.$http.get('dj/radio/hot?cateId=2&limit=0')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.storys = res.djRadios
    },
    async getBook () {
      const { data: res } = await this.$http.get('dj/radio/hot?cateId=10001&limit=5')
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.books = res.djRadios
    },
    getStation () {
      this.getBanner()
      this.getHot()
      this.getCreation()
      this.getElectronics()
      this.getStory()
      this.getBook()
    }
  },
  components: { Banner, Radio, StationCard }
}
</script>

<style scoped>

</style>
