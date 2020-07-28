var baseUrl = '/api'
//登录 
const login = baseUrl + '/Login/AdminUserLogin'
//登出
const logOut = baseUrl + '/Login/AdminUserLogout'
//估价的列表
const evalList = baseUrl + '/interface/QuoteList'
//订单的列表
const orderList = baseUrl + '/interface/OrderList'
//订单履约
const orderPerform=baseUrl+'/interface/OrderPerform'
export default {
  login,
  logOut,
  evalList,
  orderList,
  orderPerform
}
