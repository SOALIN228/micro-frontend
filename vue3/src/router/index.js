import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/index'
import Select from '@/views/select'

const routes = [
  {
    path: '/index',
    name: 'index',
    component: Index,
  },
  {
    path: "/select",
    name: "select",
    component: Select,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
