import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入全局样式表
import './assets/css/global.css'

// 配置axios请求，项目中可以直接通过this.$http使用HTTP请求
import axios from 'axios'
// 配置默认请求部分
axios.defaults.baseURL = 'http://localhost:8090/'
Vue.prototype.$http = axios

// 项目入口文件

Vue.config.productionTip = false

// 渲染App组件到vue实例中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
