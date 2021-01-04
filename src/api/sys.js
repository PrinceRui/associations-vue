/**
 * 练习系统 API
 */
export default {
  // 部门管理
  office: {
    get: '/sys/office/get',
    list: '/sys/office/list',
    delete: '/sys/office/delete',
    save: '/sys/office/save'
  },
  // 用户管理
  user: {
    list: '/sys/user/list',
    delete: '/sys/user/delete',
    save: '/sys/user/save',
    resetPassword: '/sys/user/resetPassword'
  },
  // 菜单管理
  menu: {
    get: '/sys/menu/get',
    list: '/sys/menu/list',
    treeList: '/sys/menu/treeList',
    delete: '/sys/menu/delete',
    save: '/sys/menu/save'
  },
  // 权限管理
  role: {
    get: '/sys/role/get',
    list: '/sys/role/list',
    delete: '/sys/role/delete',
    save: '/sys/role/save',
    assignRole: '/sys/role/assignRole',
    outRole: '/sys/role/outRole'
  },
  // 字典管理
  dict: {
    get: '/sys/dict/get',
    list: '/sys/dict/list',
    delete: '/sys/dict/delete',
    save: '/sys/dict/save',
    typeList: '/sys/dict/typeList'
  },
  // 日志管理
  log: {
    list: '/sys/log/list',
    delete: '/sys/log/delete',
    empty: '/sys/log/empty'
  }
}
