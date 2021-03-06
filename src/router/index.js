import Vue from 'vue'
import Router from 'vue-router'
//全部估价页
const allEvaluate = () => import('../pages/allEvaluate')
//全部订单页
const allOrder = () => import('../pages/allOrder')
//首页
const index = () => import('../pages/index')
//登录
const login = () => import('../pages/login')
//首饰
const jewelry = () => import('../pages/jewelry')
//箱包
const bags = () => import('../pages/bags')
//腕表
const watch = () => import('../pages/watch')
//其他
const another = () => import('../pages/another')
//配置spu
const spu = () => import('../pages/spu')
//添加管理员
const addAdmin = () => import('../pages/addAdmin')

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/index',
      name: 'index',
      component: index,
      children: [{
          path: 'jewelry',
          component: jewelry,
          name: 'jewelry',
          meta: ['首饰']
        },
        {
          path: 'bags',
          component: bags,
          name: 'bags',
          meta: ['箱包']
        },
        {
          path: 'watch',
          component: watch,
          name: 'watch',
          meta: ['腕表']
        }, {
          path: 'another',
          component: another,
          name: 'another',
          meta: ['其他']
        },
        {
          path: 'allEvaluate',
          component: allEvaluate,
          name: 'allEvaluate',
          meta: ['全部估价页']
        },
        {
          path: 'allOrder',
          component: allOrder,
          name: 'allOrder',
          meta: ['全部订单页']
        },
        {
          path: 'spu',
          component: spu,
          name: 'spu',
          meta: ['配置spu']
        },
        {
          path: 'addAdmin',
          component: addAdmin,
          name: 'addAdmin',
          meta: ['添加管理员']
        },
        {
          path: '',
          redirect: 'jewelry'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '*',
      redirect: '/login'
    }
  ]
})
//去除点击重复路由抛出的异常 
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => {})
}
