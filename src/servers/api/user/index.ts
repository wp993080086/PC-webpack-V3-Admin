import { createAxiosExamples } from '@/servers/request'
import { ILogin, IGetRouteMenuList, ILogout } from './user'
import { adminInfo, adminRoute } from '@/mock/user/data'

const R = createAxiosExamples()

export default {
  /**
   * 登录
   * @param {string} userName 用户名
   * @param {string} password 密码
   */
  login(params: ILogin) {
    return R.post<null, THttpResponse<typeof adminInfo>>('/api/user/login', { ...params })
  },
  /**
   * 获取路由菜单
   * @param {string} userId 用户ID
   */
  getRouteMenuList(params: IGetRouteMenuList) {
    return R.post<null, THttpResponse<typeof adminRoute>>('/api/user/getRouteMenuList', { ...params })
  },
  /**
   * 退出登录
   * @param {string} userId 用户ID
   */
  logout(params: ILogout) {
    return R.post<null, THttpResponse>('/api/user/logout', { ...params })
  }
}
