import '@/assets/iconfont/iconfont.css' // 导入图标库
import 'normalize.css' // 样式标准
import '@/assets/css/base.css' // 基本样式
import '@/assets/css/global.scss' // 全局样式
import Vue from 'vue'
import axios from 'axios'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

axios.defaults.baseURL = 'http://localhost:3000' // 基本路径
axios.interceptors.request.use(config => { // 请求拦截
  config.headers.Authorization = window.sessionStorage.getItem('mes_front_end_token') // 为每次请求挂载 token 字符串
  return config
})

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
