import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import Vuex from 'vuex'
// import App from './App'
import routers from './routers'
import Layout from './components/layout'
import store from './store/index'

// 注册VueRouter
Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(Vuex)
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
})