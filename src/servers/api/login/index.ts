import { createAxiosExamples } from '@/servers/request'
import { ILogin } from './login'

const R = createAxiosExamples()

export default {
  /**
   * 登录
   * @param {string} mobile 手机号
   * @param {string} password 密码
   */
  login(data: ILogin) {
    return R.post('/api/user/login', { ...data })
  }
}
