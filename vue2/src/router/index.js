import Vue from 'vue'
import VueRouter from 'vue-router'
import Energy from '@/views/energy'

Vue.use(VueRouter)

const routes = [
  {
    path: '/energy',
    name: 'Energy',
    component: Energy
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
