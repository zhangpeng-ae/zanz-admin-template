import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'

const routeName = 'system'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: routeName,
    component: Layout,
    redirect: '/system/menu',
    meta: {
      title: 'System',
      icon: 'el-icon-s-home',
      sort: 1,
    },
    children: [
      {
        path: 'menu',
        name: `${routeName}_menu`,
        component: () => import('@/views/system/menu/menu.vue'),
        meta: {
          title: '菜单权限管理',
          icon: 'el-icon-s-home',
        },
      },
      {
        path: 'role',
        name: `${routeName}_role`,
        component: () => import('@/views/system/role/role.vue'),
        meta: {
          title: '角色权限管理',
          icon: 'el-icon-s-home',
        },
      },
    ],
  },
]

export default routes