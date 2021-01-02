/**
 * 练习系统 API
 */
export default {
  // 部门管理
  office: {
    get: '/sys/office/get',
    list: '/sys/office/list',
    delete: '/sys/office/delete',
    save: '/sys/office/save',
    treeSelect: '/sys/office/treeSelect',
    addChild: '/sys/office/add-child',
    findAllId: '/sys/office/findAllId',
    export: '/sys/office/export',
    import: '/sys/office/import',
    importTemplate: '/sys/office/import/template'
  },
  // 用户管理
  user: {
    get: '/sys/user/get',
    list: '/a/user/list',
    delete: '/sys/user/delete',
    save: '/sys/user/save',
    getInfo: '/sys/user/getInfo',
    updateInfo: '/sys/user/updateInfo',
    checkLoginName: '/sys/user/checkLoginName',
    modifyPwd: '/sys/user/modifyPwd',
    imageUpload: '/sys/user/imageUpload',
    findListByOfficeId: '/sys/user/listByOfficeId', // 后面接 /部门Id
    export: '/sys/user/export',
    import: '/sys/user/import',
    importTemplate: '/sys/user/import/template',
    treeSelect: '/sys/user/treeSelect'
  },
  // 菜单管理
  menu: {
    get: '/sys/menu/get',
    list: '/sys/menu/list',
    delete: '/sys/menu/delete',
    save: '/sys/menu/save',
    treeSelect: '/sys/menu/treeSelect',
    roleMenuTreeSelect: '/sys/menu/roleMenuTreeSelect'
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
  },
  // 课程管理
  subject: {
    get: '/sys/subject/get',
    list: '/sys/subject/list',
    delete: '/sys/subject/delete',
    save: '/sys/subject/save',
    treeSelect: '/sys/subject/treeSelect',
    options: '/sys/subject/options'
  },
  // 题库管理
  question: {
    get: '/sys/question/get',
    list: '/sys/question/list',
    allList: '/sys/question/allList',
    save: '/sys/question/save',
    saveAll: '/sys/question/saveAll',
    saveAll1: '/sys/question/saveAll1',
    delete: '/sys/question/delete',
    export: '/sys/question/export',
    uploadImg: '/sys/question/uploadImg',
    uploadTestPoint: '/sys/question/uploadTestPoint',
    downloadTestPoint: '/sys/question/downloadTestPoint',
    runCode: '/sys/question/code_run'
  },
  // 试卷管理
  paper: {
    get: '/sys/paper/get',
    list: '/sys/paper/list',
    delete: '/sys/paper/delete',
    save: '/sys/paper/save',
    getAnswerCard: '/sys/paper/answer-card',
  }
}
