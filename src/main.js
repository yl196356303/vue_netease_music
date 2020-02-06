import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

// 导入全局样式
import './style/global.scss'

// 导入字体图标样式
import './assets/icon_font/iconfont.css'
import './assets/icon_font1/iconfont.css'

// 导入格式化时间插件
import moment from 'moment'

// 定义全局过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern)
})

// 配置请求根路径  1111
axios.defaults.baseURL = 'http://127.0.12.12:4000'
// 将 axios 挂载到全局
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
