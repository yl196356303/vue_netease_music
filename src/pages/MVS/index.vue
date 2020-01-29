<template>
  <div class="mvContainer" ref="mvRef">
    <Parameter
      ref="parameterRef"
      @update="getChildMvs"
      @tag="getChildMvsTag"
      :page="page"/>
    <Mv :mvs="mvs" :total="total"/>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Parameter from './parameter.vue'
import Mv from '../../components/mv.vue'

export default {
  data () {
    return {
      page: 0,
      pageSize: 0,
      mvs: [],
      total: 0,
      area: '全部',
      type: '全部',
      order: '上升最快'
    }
  },
  methods: {
    getChildMvs (data, count, page, pageSize) {
      this.mvs = data
      this.total = count
      this.page = page
      this.pageSize = pageSize
    },
    // 拿子组件当前 tag
    getChildMvsTag (index, tag) {
      if (index === 0) {
        this.area = tag
      } else if (index === 1) {
        this.type = tag
      } else if (index === 2) {
        this.order = tag
      }
    },
    handleCurrentChange (val) {
      this.$refs.parameterRef.page = val
      this.$refs.parameterRef.getMv({
        area: this.area,
        type: this.type,
        order: this.order,
        offset: this.offset
      })
      this.$refs.mvRef.scrollIntoView({
        behavior: 'smooth'
      })
    }
  },
  computed: {
    offset () {
      return (this.$refs.parameterRef.page - 1) * this.pageSize
    }
  },
  components: { Parameter, Mv }
}
</script>

<style lang="scss" type="text/scss">
  .mvContainer {
    width: 80%;
    margin: 0 auto;
    padding: 18px 35px;

    .el-pagination {
      text-align: center;

      .el-pager {
        width: auto;

        li {
          &:hover {
            color: #C62F2F;
          }
        }

        .active {
          color: #C62F2F;
        }
      }
    }
  }
</style>
