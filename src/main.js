import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

// 导入全局样式
import './style/global.css'

// 导入字体图标样式
import './assets/icon_font/iconfont.css'
import './assets/icon_font1/iconfont.css'

// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.12.12:4000'
// 将 axios 挂载到全局
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
