import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { IuserInfo, IMenuList, IUserStore } from './user'
import { setStorage, getStorage } from '@/utils'

// 使用setup模式定义
export const userModule = defineStore('user', () => {
  const dataStore = reactive<IUserStore>({
    userInfo: {},
    isCollapse: false,
    routeMenuList: []
  })
  /**
   * 获取用户信息
   * @return {object} userInfo
   */
  const getUserInfo = () => {
    const localUserInfo = getStorage<IuserInfo>('userInfo')
    if (localUserInfo && localUserInfo.token) dataStore.userInfo = localUserInfo
    return dataStore.userInfo
  }
  /**
   * 设置用户信息
   * @param {object} obj 用户信息
   */
  const setUserInfo = (obj: IuserInfo) => {
    dataStore.userInfo = obj
    setStorage('userInfo', dataStore.userInfo)
  }
  /**
   * 获取路由菜单
   * @return {object} userInfo
   */
  const getRouteMenuList = () => {
    const localRouteMenuList = getStorage<Array<IMenuList>>('routeMenuList')
    if (localRouteMenuList && localRouteMenuList.length > 0) dataStore.routeMenuList = localRouteMenuList
    return dataStore.routeMenuList
  }
  /**
   * 设置路由菜单
   * @return {object} userInfo
   */
  const setRouteMenuList = (data: Array<IMenuList>) => {
    dataStore.routeMenuList = data
    setStorage('routeMenuList', dataStore.routeMenuList)
  }
  /**
   * 获取菜单收缩状态
   * @return {boolean} isCollapse
   */
  const getIsCollapse = () => {
    const localIsCollapse = getStorage<typeof dataStore.isCollapse>('isCollapse')
    if (localIsCollapse !== null) dataStore.isCollapse = localIsCollapse
    return dataStore.isCollapse
  }
  /**
   * 设置菜单收缩状态
   * @return {void} void
   */
  const setIsCollapse = () => {
    dataStore.isCollapse = !dataStore.isCollapse
    setStorage('isCollapse', dataStore.isCollapse)
  }
  return {
    ...toRefs(dataStore),
    getUserInfo,
    setUserInfo,
    getRouteMenuList,
    setRouteMenuList,
    getIsCollapse,
    setIsCollapse
  }
})
