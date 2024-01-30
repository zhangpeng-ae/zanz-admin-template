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
      title: '系统设置',
      icon: 'el-icon-s-home',
      permissions: ['system_menu', 'system_role'],
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
          permissions: ['system_menu'],
        },
      },
      {
        path: 'role',
        name: `${routeName}_role`,
        component: () => import('@/views/system/role/role.vue'),
        meta: {
          title: '角色权限管理',
          icon: 'el-icon-s-home',
          permissions: ['system_role'],
        },
      },
    ],
  },
]

export default routes
