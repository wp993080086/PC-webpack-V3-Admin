import Mock from 'mockjs'
import { adminInfo, commonInfo } from './data'
import { ILogin } from './user'

/**
 * 登录Mock
 * @param {string} mobile 手机号:admin
 * @param {string} password 密码:123456
 */
Mock.mock('/api/user/login', 'post', params => {
  const data: ILogin = JSON.parse(params.body)
  const accountList = ['admin']
  if (!accountList.includes(data.mobile)) {
    return {
      code: 10002,
      message: '账号不存在，请输入正确的账号',
      data: {}
    }
  }
  if (data.password !== '123456') {
    return {
      code: 10003,
      message: '密码错误',
      data: {}
    }
  }
  const result = data.mobile === 'admin' ? adminInfo : commonInfo
  return {
    code: 10000,
    message: '请求成功',
    data: result
  }
})
