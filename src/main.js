import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import { Loading } from 'element-ui'

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

// 配置请求根路径
axios.defaults.baseURL = 'https://api.mtnhao.com/'
// 拦截器
mixinLoading(axios.interceptors)
let loading
let loadingCount = 0

function mixinLoading (interceptors) {
  interceptors.request.use(loadingRequestInterceptors)
  interceptors.response.use(loadingResponseInterceptor, loadingResponseErrorInterceptor)

  function loadingRequestInterceptors (config) {
    if (!loading) {
      loading = Loading.service({
        target: 'body',
        background: 'transparent',
        text: '载入中'
      })
    }
    loadingCount++
    return config
  }

  function handleResponseLoading () {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
    }
  }

  function loadingResponseInterceptor (response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor (e) {
    handleResponseLoading()
    throw e
  }
}

// 将 axios 挂载到全局
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
