// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "animate.css"
//css重置
import './assets/css/reset.css'
Vue.config.productionTip = false
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//axios
import axios from 'axios'
axios.interceptors.response.use(res => {
  console.log("---" + res.config.url + "--------")
  console.log(res.data)
  if (res.data.Data[0] == -1) {
    router.push('/login')
  }
  return res.data;
})
//挂载store
import store from './store/index'
//引入全局过滤器
import filters from "./filter/index"
for (var i in filters) {
  Vue.filter(i, filters[i])
}
Vue.prototype.$axios = axios;
//路由守卫
router.beforeEach((to, from, next) => {
  let flag = sessionStorage.getItem('isAdmin')
  if (flag) {
    next()
    return
  } else if (to.path === '/login') {
    next()
    return
  }
  next('/login')
})
//引入babel-polyfill
import 'babel-polyfill'
//  导入excel插件
import XLSX from 'xlsx'
Vue.prototype.XLSX = XLSX
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
