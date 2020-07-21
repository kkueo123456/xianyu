var baseUrl = '/api'
//登录 
const login = baseUrl + '/Login/AdminUserLogin'
//登出
const logOut = baseUrl + '/Login/AdminUserLogout'
const cs = baseUrl + '/Login/LoginError'
export default {
  login,
  logOut,
  cs
}
