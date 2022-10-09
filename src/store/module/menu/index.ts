import { Module } from 'vuex'
import { IMenu } from './menu'

export interface navState {
  isCollapse: boolean
  menuList: Array<IMenu>
}

const menuState: Module<navState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    isCollapse: false,
    menuList: []
  },
  getters: {
    getIsCollapse(state: navState) {
      return state.isCollapse
    },
    getMenuList(state: navState) {
      return state.menuList
    }
  },
  mutations: {
    // 收缩菜单栏
    handleChangeCollapse(state: navState) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}

export default menuState
