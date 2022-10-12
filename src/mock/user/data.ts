export const adminInfo = {
  token: 'pdd51ade6ca669c9d89d9d4f1b8c6d1f554fd738bd1',
  userInfo: {
    age: 24,
    gender: '男',
    level: 1,
    auth: 'admin',
    portrait: '',
    userId: 'admin00001',
    userName: '擎天柱'
  }
}

export const commonInfo = {
  token: 'pdd51ade6ca669c9d89d9d4f1b8fagagaggdgfssdf',
  userInfo: {
    age: 18,
    gender: '男',
    level: 2,
    auth: 'common',
    portrait: '',
    userId: 'common00001',
    userName: '路人甲'
  }
}

export const adminRoute = [
  {
    title: '首页',
    path: '/home',
    icon: 'user'
  },
  {
    title: '示例',
    path: '/demo',
    icon: 'password',
    children: [
      {
        title: '对话框',
        path: '/demo/dialog'
      },
      {
        title: '分页器',
        path: '/demo/pagination'
      },
      {
        title: '气泡确认框',
        path: '/demo/popconfirm'
      },
      {
        title: '图标',
        path: '/demo/svg-icon'
      }
    ]
  },
  {
    title: '设置',
    path: '/setting',
    icon: 'user'
  }
]

export const commonRoute = [
  {
    title: '首页',
    path: '/home',
    icon: 'user'
  },
  {
    title: '示例',
    path: '/demo',
    icon: 'password',
    children: [
      {
        title: '对话框',
        path: '/demo/dialog'
      },
      {
        title: '分页器',
        path: '/demo/pagination'
      },
      {
        title: '气泡确认框',
        path: '/demo/popconfirm'
      },
      {
        title: '图标',
        path: '/demo/svg-icon'
      }
    ]
  }
]
