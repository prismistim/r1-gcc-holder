import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/index.vue'
import List from '../pages/list.vue'
import Add from '../pages/add.vue'
import Detail from '../pages/detail.vue'
import ReCharge from '../pages/recharge.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'List',
    path: '/list',
    component: List,
  },
  {
    name: 'Add',
    path: '/add',
    component: Add
  },
  {
    name: 'Detail',
    path: '/detail/:id',
    component: Detail
  },
  {
    name: 'ReCharge',
    path: '/recharge/:id',
    component: ReCharge
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
