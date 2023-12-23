import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'

const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    component: Layout,
    redirect: '/dashboard/console',
    meta: {
      title: 'Dashboard',
      icon: 'el-icon-s-home',
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
        },
      },
    ],
  },
]

export default routes
