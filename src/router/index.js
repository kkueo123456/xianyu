import Vue from 'vue'
import Router from 'vue-router'
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
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/index',
      name: 'index',
      component: index,
      children: [{
          path: 'jewelry',
          component: jewelry,
          name:'jewelry',
          meta: ['首饰']
        },
        {
          path: 'bags',
          component: bags,
          name:'bags',
          meta: ['箱包']
        },
        {
          path: 'watch',
          component: watch,
          name:'watch',
          meta: ['手表']
        }, {
          path: 'another',
          component: another,
          name:'another',
          meta: ['其他']
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
