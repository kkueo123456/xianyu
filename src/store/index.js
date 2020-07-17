import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  data: null
}
const mutations = {
  mainData(state, data) {
    state.data = data
  }
}
const actions = {
  //估价的数据请求
  getEvlJewData(context) {
    var data = [{
      id: 0,
      num: '123456000',
      pin: '钻戒',
      class: '珠宝',
      user: '蒲子杰',
      time: '2020/07/16',
      price: '3000',
      state: '已上门取件',
      pageNum: 12
    }, {
      id: 1,
      num: '1234560320',
      pin: '翡翠',
      class: '首饰',
      user: '蒲子杰',
      time: '2020/07/16',
      price: '34564',
      state: '待股价',
      pageNum: 12

    }, {
      id: 3,
      num: '123456004',
      pin: '宝石',
      class: '珠宝',
      user: '蒲子杰',
      time: '2020/07/16',
      price: '4564456',
      state: '已上门取件',
      pageNum: 12

    }, ]
    context.commit('mainData', data)
  },
  getEvlBagData(context) {
    var data = [{
      id: 4,
      num: '45678900',
      pin: 'Lv',
      class: '女士女包',
      user: '蒲',
      time: '2020/07/16',
      price: '3000',
      state: '已上门取件',
      pageNum: 13
    }, {
      id: 5,
      num: '78945600',
      pin: '爱马仕',
      class: '男士包',
      user: '蒲',
      time: '2020/07/16',
      price: '34564',
      state: '待股价',
      pageNum: 12

    }, {
      id: 6,
      num: '54321600',
      pin: '阿迪',
      class: '钱包',
      user: '蒲子',
      time: '2020/07/16',
      price: '4564456',
      state: '已上门取件',
      pageNum: 13

    }, ]
    context.commit('mainData', data)
  },
  getEvlWatchData(context) {
    var data = [{
      id: 7,
      num: '11111111',
      pin: '劳力士',
      class: '名牌手表',
      user: 'kk',
      time: '2020/07/13',
      price: '3000',
      state: '失败',
      pageNum: 13
    }, {
      id: 8,
      num: '22222222',
      pin: '电子表',
      class: '名牌',
      user: 'k',
      time: '2020/07/13',
      price: '34564',
      state: '退回',
      pageNum: 12

    }, {
      id: 9,
      num: '33333333',
      pin: '儿童手表',
      class: '12',
      user: '蒲子',
      time: '2020/07/16',
      price: '4564456',
      state: '无',
      pageNum: 13

    }, ]
    context.commit('mainData', data)
  },
  getEvlAnotherData(context) {
    var data = [{
      id: 10,
      num: '11111111',
      pin: '酒',
      class: '名牌手表',
      user: 'kk',
      time: '2020/07/13',
      price: '3000',
      state: '失败',
      pageNum: 13
    }, {
      id: 11,
      num: '22222222',
      pin: '鱼竿',
      class: '名牌',
      user: 'k',
      time: '2020/07/13',
      price: '34564',
      state: '退回',
      pageNum: 12

    }, {
      id: 12,
      num: '33333333',
      pin: '摩托车',
      class: '12',
      user: '蒲子',
      time: '2020/07/16',
      price: '4564456',
      state: '无',
      pageNum: 13

    }, ]
    context.commit('mainData', data)
  }
}
const getters = {
  data(state) {
    return state.data
  }
}
const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store;
