var baseUrl = '/api'
//登录 
const login = baseUrl + '/Login/AdminUserLogin'
//登出
const logOut = baseUrl + '/Login/AdminUserLogout'
//估价的列表
const evalList = baseUrl + '/interface/QuoteList'
//估价的操作
const evalDoing = baseUrl + '/interface/InspectionReport'
//订单的列表
const orderList = baseUrl + '/interface/OrderList'
// 所有订单列表
const AllOrderList = baseUrl + '/interface/OrderListExport'
//订单履约
const orderPerform = baseUrl + '/interface/OrderFulfillment'
//上传图片地址
const orderPic = baseUrl + '/Interface/PictureUpload'
//登录授权
const Auth = baseUrl + '/Auth/Refresh'
//退款
const RefundApply = baseUrl + '/Interface/RefundApply'
//spu列表
const spuList = baseUrl + '/SpuManage/SpuList'
//模板列表
const MuBan = baseUrl + '/SpuManage/QuestionnaireList'
//添加模板
const addMuBan = baseUrl + '/SpuManage/SpuAdd'
//关联
const guanlian = baseUrl + '/SpuManage/SpuAndQuestionnaire'
// cs
const question = baseUrl + '/SpuManage/QuestionnaireAdd'
//管理员身份列表
const roleList = baseUrl + '/AdminManage/RoleList'
//添加管理员
const AdminAdd = baseUrl + '/AdminManage/AdminAdd'
//管理员页列表
const AdminList = baseUrl + '/AdminManage/AdminList'
//查看管理员
const lookAdmin = baseUrl + '/AdminManage/AdminDetail'
//修改
const upDate = baseUrl + '/AdminManage/AdminEdit'
//删除
const delAdmin = baseUrl + '/AdminManage/AdminDisable'
export default {
  login,
  logOut,
  evalList,
  orderList,
  AllOrderList,
  orderPerform,
  evalDoing,
  orderPic,
  Auth,
  RefundApply,
  spuList,
  MuBan,
  addMuBan,
  guanlian,
  question,
  roleList,
  AdminAdd,
  AdminList,
  lookAdmin,
  upDate,
  delAdmin
}
