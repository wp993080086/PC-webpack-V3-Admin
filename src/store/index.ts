import { createStore } from 'vuex'

import userState from './module/user'
import menuState from './module/menu'

const store = createStore({
  modules: {
    userState,
    menuState
  }
})

export default store
