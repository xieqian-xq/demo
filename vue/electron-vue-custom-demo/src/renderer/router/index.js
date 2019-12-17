import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index/index'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from, next) => {})

export default router
