import { createRouter, createWebHistory } from 'vue-router'
import 首页 from '../views/首页.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: 首页
    },
    {
      path: '/video',
      name: 'video',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/视频页.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/二级_公告页.vue')
    }
  ]
})

export default router
