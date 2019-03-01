import Vue from 'vue'
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
  },
  updateParams (state, {key, value}) {
    state.params[key] = value
    console.log({key, value})
  }
}

const actions = {
  // 异步方法
  fetchOrderList ({commit, state}) {
    Vue.http.post('/api/orderList', state.params).then((res) => {
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
