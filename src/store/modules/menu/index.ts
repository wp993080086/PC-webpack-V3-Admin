import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { IMenuStore } from './menu'

// 使用setup模式定义
export const menuModule = defineStore('menu', () => {
  const dataStore = reactive<IMenuStore>({
    isCollapse: false,
    menuList: [
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
  })
  /**
   * 获取菜单收缩状态
   * @return {boolean} isCollapse
   */
  const getIsCollapse = () => {
    return dataStore.isCollapse
  }
  /**
   * 改变菜单收缩状态
   * @return {void} void
   */
  const changeIsCollapse = () => {
    dataStore.isCollapse = !dataStore.isCollapse
  }

  return {
    ...toRefs(dataStore),
    getIsCollapse,
    changeIsCollapse
  }
})
