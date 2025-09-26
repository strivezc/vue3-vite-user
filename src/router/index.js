import { createWebHistory, createRouter } from 'vue-router'
import Layout from '@/layout'

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/home'),
        meta: { title: '首页' }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404'),
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
  },
]

// 动态路由，基于用户权限动态去加载
export const asyncRoutes = []

const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
