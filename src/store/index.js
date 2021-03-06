import Vue from 'vue'
import vuex from 'vuex'
import API from '../util/api'
import axios from 'axios'
import {
  Loading
} from 'element-ui';
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
  //估价与待客户确认列表请求
  getEvalData(context, requestData) {
    let text = '请稍等数据加载'
    let lod = Loading.service({
      target: '.main',
      text,
    });
    axios({
      url: API.evalList,
      method: "post",
      params: requestData
    }).then(res => {
      //close
      lod.close()
      let data = {
        mainData: res.Data,
        pageData: res.ListCount
      }
      context.commit('mainData', data)
    }).catch(err => {
      //close
      lod.close()
      console.log(err)
    })
  },
  //订单履约列表
  getOrderData(context, requestData) {
    let text = '请稍等数据加载'
    let lod = Loading.service({
      target: '.main',
      text,
    });
    return axios({
      url: API.orderList,
      method: "post",
      params: requestData
    }).then(res => {
      //close
      lod.close()
      let data = {
        mainData: res.Data,
        pageData: res.ListCount
      }
      context.commit('mainData', data)
    }).catch(err => {
      //close
      lod.close()

    })
  },
  //一些订单履约操作的请求
  getOrderPerform(context, orderPerformData) {
    console.log(orderPerformData, '222')
    let lod = Loading.service({
      text: '数据提交中',
      spinner: 'el-icon-loading',
    });
    return axios({
      url: API.orderPerform,
      method: "post",
      params: orderPerformData
    }).then(res => {
      //close
      lod.close();
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
      //close
      lod.close();
      $message({
        type: "error",
        message: err.Msg
      });
    })
  },
  //spu列表
  getSpuData(context, requestData) {
    let text = '请稍等数据加载'
    let lod = Loading.service({
      target: '.main',
      text,
    });
    axios({
      url: API.spuList,
      method: "post",
      params: requestData
    }).then(res => {
      //close
      lod.close()
      let data = {
        mainData: res.Data,
        pageData: res.ListCount
      }
      context.commit('mainData', data)
    }).catch(err => {
      //close
      lod.close()
    })
  },
  // 管理员页列表
  getAdminData(context) {
    let text = '请稍等数据加载'
    let lod = Loading.service({
      target: '.main',
      text,
    });
    return axios({
      url: API.AdminList,
      method: "post",
    }).then(res => {
      console.log(res)
      //close
      lod.close()
      let data = {
        mainData: res.Data,
        pageData: res.ListCount
      }
      context.commit('mainData', data)
    }).catch(err => {
      //close
      lod.close()
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
