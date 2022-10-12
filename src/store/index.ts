import { systemModule } from '@/store/modules/system'
import { userModule } from '@/store/modules/user'

interface IAppStore {
  userModule: ReturnType<typeof userModule>
  systemModule: ReturnType<typeof systemModule>
}

const appStore = {} as IAppStore

/**
 * 注册store状态库
 */
export const registerStore = () => {
  appStore.userModule = userModule()
  appStore.systemModule = systemModule()
}

export default appStore
