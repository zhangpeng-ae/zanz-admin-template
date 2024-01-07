import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'

const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    component: Layout,
    redirect: '/dashboard/console', // 默认路由
    meta: {
      title: 'Dashboard',
      icon: 'el-icon-s-home',
      permissions: ['dashboard_console', 'dashboard_workplace'],
      sort: 0,
    },
    children: [
      {
        path: 'console',
        name: `${routeName}_console`,
        component: () => import('@/views/dashboard/console/console.vue'),
        meta: {
          title: '主控台',
          icon: 'el-icon-s-home',
          permissions: ['dashboard_console'],
        },
      },
      {
        path: 'workplace',
        name: `${routeName}_workplace`,
        component: () => import('@/views/dashboard/workplace/workplace.vue'),
        meta: {
          title: '工作台',
          icon: 'el-icon-s-home',
          permissions: ['dashboard_workplace'],
        },
      },
    ],
  },
]

export default routes
