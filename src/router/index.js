import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/',
    component: () => import('../pages/Home.vue')
  },
  {
    title: 'Music Widget',
    icon: 'mdi-spotify',
    path: '/Music-Widget',
    component: () => import('../pages/Music-Widget.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
