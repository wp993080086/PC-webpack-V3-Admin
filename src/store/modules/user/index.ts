import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { IuserInfo } from './user'

// 使用setup模式定义
export const userModule = defineStore('user', () => {
  const data = reactive({
    name: 'user',
    userInfo: {
      userName: '卡卡罗特',
      userId: '100'
    }
  })
  /**
   * 获取用户信息
   * @return {object} userInfo
   */
  const getUserInfo = () => {
    return data.userInfo
  }
  /**
   * 设置用户信息
   * @param {object} obj 用户信息
   */
  const setUserInfo = (obj: IuserInfo) => {
    data.userInfo = obj
  }

  return {
    ...toRefs(data),
    getUserInfo,
    setUserInfo
  }
})
