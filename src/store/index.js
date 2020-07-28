import Vue from 'vue'
import vuex from 'vuex'
import API from '../util/api'
import axios from 'axios'
import {
  Message
} from 'element-ui'
let $message = Message
Vue.use(vuex)
const state = {
  data: null,
  Pagelist: 0
}
const mutations = {
  mainData(state, data) {
    state.data = data.mainData
    state.Pagelist = data.pageData
  }
}
const actions = {
  //估价请求
  getEvalData(context, requestData) {
    axios({
      url: API.evalList,
      method: "post",
      params: requestData
    }).then(res => {
      let data = {
        mainData: res.Data,
        pageData: res.ListCount
      }
      context.commit('mainData', data)
    }).catch(err => {
      console.log(err)
    })
  },
  //订单状态的请求
  getOrderData(context, requestData) {
    axios({
      url: API.orderList,
      method: "post",
      params: requestData
    }).then(res => {
      let data = {
        mainData: res.Data,
        pageData: res.ListCount
      }
      context.commit('mainData', data)
    }).catch(err => {
      console.log(err)
    })
  },
  //一些操作的请求
  getOrderPerform(context, orderPerformData) {
    axios({
      url: API.orderPerform,
      method: "post",
      params: orderPerformData
    }).then(res => {
      if (res.Status == 'y') {
        $message({
          type: "success",
          message: res.Msg
        });
      } else {
        $message({
          type: "warning",
          message: res.Msg
        })
      }
    }).catch(err => {
      $message({
        type: "error",
        message: err.Msg
      });
    })
  }
}
const getters = {
  data(state) {
    return state.data
  },
  Pagelist(state) {
    return state.Pagelist
  }
}
const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store;
