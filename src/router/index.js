import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/campScreen',
    name: 'campScreen',
    component: () => import('../views/campScreen.vue'),
    meta: { title: '首页', keepAlive: true, auth: false }
  },
  {
    path: '/situationMap',
    name: 'situationMap',
    component: () => import('../views/situationMap.vue'),
    meta: { title: '首页', keepAlive: false, auth: false }
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: { title: '登录页', keepAlive: false, auth: false }
  },
  {
    path: '/historyHead',
    name: 'historyHead',
    component: () => import('../views/historyHead.vue'),
    meta: { title: '头', keepAlive: false, auth: false }
  },
  {
    path: '/personManage',
    name: 'personManage',
    component: () => import('../views/personManage.vue'),
    meta: { title: '人员管理', keepAlive: false, auth: false }
  },
  {
    path: '/carManage',
    name: 'carManage',
    component: () => import('../views/carManage.vue'),
    meta: { title: '车辆管理', keepAlive: false, auth: false }
  },
  {
    path: '/sysManage',
    name: 'sysManage',
    component: () => import('../views/sysManage.vue'),
    meta: { title: '系统管理', keepAlive: false, auth: false }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})
// 登录权限
// router.beforeEach((to, from, next) => {
//   let auth = to.meta.auth
// document.title = to.meta.title
//   let token = store.getters['login/token'];
//   if (auth) { // 需要登录
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
