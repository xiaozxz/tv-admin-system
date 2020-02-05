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
  }
  // {
  //   path: '/form',
  //   name: 'form',
  //   children: [
  //     {
  //       path: '/form/normal',
  //       name: 'NoralForm',
  //       component: () => import('../views/Form/index.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/table',
  //   name: 'table',
  //   children: [
  //     {
  //       path: '/table/normal',
  //       name: 'NoralTable',
  //       component: () => import('../views/Table/index.vue')
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  routes
})

export default router
