<template>
  <div class="parameterContainer">
    <div class="title-item" v-for="(list, listIndex) in title" :key="listIndex">
      <span>{{list.name}}：</span>
      <ul>
        <li v-for="(item, index) in menu[listIndex]" :key="index">
          <span :class="isActive(index, listIndex)" @click="handleClick(index, listIndex, item.name)">{{item.name}}</span>
          <el-divider v-if="index !== (menu[listIndex].length - 1)" direction="vertical"/>
        </li>
      </ul>
    </div>
    <el-divider/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: [
        { name: '地区' },
        { name: '类型' },
        { name: '排序' }
      ],
      menu: [
        [
          { name: '全部' },
          { name: '内地' },
          { name: '港台' },
          { name: '欧美' },
          { name: '韩国' },
          { name: '日本' }
        ],
        [
          { name: '全部' },
          { name: '官方版' },
          { name: '原声' },
          { name: '现场版' },
          { name: '网易出品' }
        ],
        [
          { name: '上升最快' },
          { name: '最热' },
          { name: '最新' }
        ]
      ],
      currentAreaIndex: 0,
      currentTypeIndex: 0,
      currentOrderIndex: 0,
      mvs: [],
      total: 0,
      page: 1,
      pageSize: 40
    }
  },
  created () {
    this.getMv()
  },
  methods: {
    handleClick (index, listIndex, option) {
      if (listIndex === 0) {
        this.currentAreaIndex = index
        // 让分页恢复默认
        this.page = 1
        this.getMv({
          area: option
        })
      } else if (listIndex === 1) {
        this.currentTypeIndex = index
        // 让分页恢复默认
        this.page = 1
        this.getMv({
          type: option
        })
      } else if (listIndex === 2) {
        this.currentOrderIndex = index
        // 让分页恢复默认
        this.page = 1
        this.getMv({
          order: option
        })
      }
      this.$emit('tag', listIndex, option)
    },
    isActive (index, listIndex) {
      if ((this.currentAreaIndex === index && listIndex === 0
      ) || (
        this.currentTypeIndex === index && listIndex === 1
      ) || (
        this.currentOrderIndex === index && listIndex === 2)) {
        return 'active'
      }
      return ''
    },
    async getMv (optinos) {
      // 默认值
      let defaults = {
        area: '全部',
        type: '全部',
        order: '上升最快',
        limit: 40,
        offset: 0
      }
      Object.assign(defaults, optinos)
      const { data: res } = await this.$http.get('mv/all', { params: defaults })
      if (res.code !== 200) {
        return this.$message.error('出错啦~')
      }
      res.data.forEach(item => {
        item.playCount = String(item.playCount)
        if (item.playCount.length > 5) {
          item.playCount = item.playCount.slice(0, item.playCount.length - 4) + '万'
        }
      })
      this.mvs = res.data
      if (this.page === 1) {
        console.log('进来了')
        this.total = res.count
      }
      this.$emit('update', this.mvs, this.total, this.page, this.pageSize)
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .parameterContainer {
    font-size: 13px;
    color: #303133;

    .title-item {
      display: flex;
      align-items: center;

      span {
        cursor: default;
        width: 50px;
      }

      ul {
        display: flex;

        li {
          span {
            cursor: pointer;
            box-sizing: border-box;
            padding: 5px;
            border-radius: 3px;
          }
          .el-divider {
            margin: 0 15px;
          }
        }
      }
    }

    .active {
      background-color: #C62F2F;
      color: #ffffff;
    }
  }
</style>
