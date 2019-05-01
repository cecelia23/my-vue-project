// import Vue from 'vue'

import axios from 'axios'

const state = {
  orderList: [],
  params: {}
}
const getters = {
  getOrderList: state => state.orderList
}
const mutations = {
  // 同步方法
  updateOrderList (state, payload) {
    state.orderList = payload
    console.log('updated')
  },
  updateParams (state, {key, value}) {
    state.params[key] = value
    console.log({key, value})
  }
}

const actions = {
  // 异步方法
  fetchOrderList ({commit, state}) {
    // 异步请求数据，将相应的data.list付给state中的orderList
    // Vue.http.post('/api/orderList', state.params).then((res) => {
    //   // 赋值：同步操作
    //   commit('updateOrderList', res.data.list)
    // }, (err) => {
    //   console.log(err)
    // })
    axios.post('/api/orderList', state.params).then((res) => {
      commit('updateOrderList', res.data.list)
    }, (err) => {
      console.log(err)
    })
  }

}
export default {
  state,
  mutations,
  actions,
  getters
}
