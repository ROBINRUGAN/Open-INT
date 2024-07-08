import { createRouter, createWebHistory } from 'vue-router'
import OverView from '../views/OverView.vue'
import TaskView from '../views/TaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: OverView
    },
    {
      path: '/task',
      name: 'task',
      component: TaskView
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
