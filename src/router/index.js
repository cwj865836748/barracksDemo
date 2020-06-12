import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'campScreen',
    component: () => import('../views/campScreen.vue'),
    meta: { title: '首页', keepAlive: false, auth: false }
  },
  {
    path: '/situationMap',
    name: 'situationMap',
    component: () => import('../views/situationMap.vue'),
    meta: { title: '首页', keepAlive: false, auth: false }
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
