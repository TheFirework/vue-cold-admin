import { MockMethod } from 'vite-plugin-mock'
import { resultOk } from '../util'

const menuList: MenuRecordRaw[] = [
  {
    id: 1,
    parentId: 0,
    orderNum: 0,
    status: 1,
    path: 'dashboard',
    component: 'ParentLayout',
    name: 'dashboard',
    redirect: '/dashboard/console',
    title: 'Dashboard',
    icon: 'DashboardOutlined',
    keepAlive: 0,
    show: 1,
    type: 1
  },
  {
    id: 1001,
    parentId: 1,
    orderNum: 0,
    status: 1,
    path: 'console',
    component: 'views/dashboard/console/console.vue',
    name: 'console',
    title: '控制台',
    keepAlive: 1,
    show: 1,
    type: 2,
    icon: ''
  },
  {
    id: 1002,
    parentId: 1,
    orderNum: 0,
    status: 1,
    path: 'monitor',
    component: 'views/dashboard/monitor/monitor.vue',
    name: 'monitor',
    title: '监控台',
    keepAlive: 1,
    show: 1,
    type: 2,
    icon: ''
  },
  {
    id: 2,
    parentId: 0,
    orderNum: 0,
    status: 1,
    path: 'auth',
    name: 'auth',
    component: 'ParentLayout',
    title: '权限管理',
    icon: 'SafetyOutlined',
    show: 1,
    type: 1
  },
  {
    id: 2001,
    parentId: 2,
    orderNum: 0,
    status: 1,
    path: 'role',
    component: 'views/auth/role/index.vue',
    name: 'role',
    title: '角色管理',
    keepAlive: 1,
    show: 1,
    type: 2,
    icon: ''
  },
  {
    id: 20011,
    parentId: 2001,
    orderNum: 0,
    type: 3,
    code: 'role:list',
    name: '角色列表',
    status: 1
  },
  {
    id: 20012,
    parentId: 2001,
    orderNum: 0,
    type: 3,
    code: 'role:add',
    name: '新增角色',
    status: 1
  },
  {
    id: 2002,
    parentId: 2,
    orderNum: 0,
    status: 1,
    path: 'menu',
    component: 'views/auth/menu/index.vue',
    name: 'menu',
    title: '菜单管理',
    keepAlive: 1,
    show: 1,
    type: 2,
    icon: ''
  },
  {
    id: 2003,
    parentId: 2,
    orderNum: 0,
    status: 1,
    path: 'user',
    component: 'views/auth/user/index.vue',
    name: 'user',
    title: '用户管理',
    keepAlive: 1,
    show: 1,
    type: 2,
    icon: ''
  },
  {
    id: 3,
    parentId: 0,
    orderNum: 0,
    status: 1,
    path: 'about',
    component: 'views/about/index.vue',
    name: 'about',
    title: '关于项目',
    keepAlive: 0,
    show: 1,
    type: 2,
    icon: 'GitlabOutlined'
  },
  {
    id: 4,
    parentId: 0,
    orderNum: 0,
    status: 1,
    path: 'document',
    component: '',
    name: 'https://github.com/TheFirework/vue-cold-admin',
    title: '项目文档',
    keepAlive: 0,
    show: 1,
    type: 2,
    icon: 'FileTextOutlined'
  }
]

export default [
  {
    url: '/menu/list',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultOk(menuList)
    }
  }
] as MockMethod[]
