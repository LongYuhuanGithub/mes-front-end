import '@/assets/iconfont/iconfont.css' // 导入图标库
import 'normalize.css' // 样式标准
import '@/assets/css/base.css' // 基本样式
import Vue from 'vue'
import axios from 'axios'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

axios.defaults.baseURL = 'http://localhost:3000' // 基本路径

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
