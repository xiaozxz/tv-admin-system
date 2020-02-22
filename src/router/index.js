import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/form/normal',
    name: 'NoralForm',
    component: () => import('../views/Form/Normal.vue')
  },
  {
    path: '/form/element',
    name: 'Element',
    component: () => import('../views/Form/ElementForm.vue')
  },
  {
    path: '/table/normal',
    name: 'NoralTable',
    component: () => import('../views/Table/normal')
  },
  {
    path: '/table/btnTable',
    name: 'BtnTable',
    component: () => import('../views/Table/BtnTable')
  },
  {
    path: '/page/normal',
    name: 'PageNormal',
    component: () => import('../views/page/search.vue')
  },
  {
    path: '/page/detail',
    name: 'PageDetail',
    component: () => import('../views/page/detail.vue')
  },
  {
    path: '/Test/slot',
    name: 'PageTestSlot',
    component: () => import('../views/Test/slot')
  },
  {
    path: '/Test/router/twoview',
    name: 'PageTestSlot',
    components: {
      left: () => import('../views/Test/slot'),
      main: () => import('../views/Test/slot')
    }
  }
]

// const router = new VueRouter({
//   routes
// })
let a = 12
export function getRoute() {
  a = 13
  const router = new VueRouter({
    routes
  })
  return router
}
export const b = a

// export default router
