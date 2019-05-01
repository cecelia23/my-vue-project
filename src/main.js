import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import Vuex from 'vuex'
// import App from './App'
import routers from './routers'
import Layout from './components/layout'
import store from './store/index'

// 注册VueRouter
Vue.use(VueRouter)

// 修改vue原型属性
Vue.prototype.$ajax = axios
// 官方不再推荐vue-resource
// Vue.use(VueResource)

// Vue.use(ElementUI)

// // 创建实例
const router = new VueRouter({
  mode: 'history',
  routes: routers
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { Layout },
  template: '<Layout/>'
  // render: h => h(Layout)
})
