import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { ISystemStore } from './system'

// 使用setup模式定义
export const systemModule = defineStore('system', () => {
  const dataStore = reactive<ISystemStore>({
    isCollapse: false,
    lang: 'zhCn'
  })

  return {
    ...toRefs(dataStore)
  }
})
