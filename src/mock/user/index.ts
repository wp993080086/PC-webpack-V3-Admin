import Mock from 'mockjs'
import { sleep } from '@/utils'
import { adminInfo, commonInfo, adminRoute, commonRoute } from './data'
import { ILogin, IGetRouteMenuList, ILogout } from './user'

/**
 * 登录Mock
 * @param {string} userName 用户名:admin & common
 * @param {string} password 密码:123456
 */
Mock.mock('/api/user/login', 'post', async params => {
  await sleep(1000)
  const data: ILogin = JSON.parse(params.body)
  const accountList = ['admin', 'common']
  if (!accountList.includes(data.userName)) {
    return {
      code: 10086,
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
  const result = data.userName === 'admin' ? adminInfo : commonInfo
  return {
    code: 10000,
    message: '请求成功',
    data: result
  }
})
/**
 * 获取路由菜单
 * @param {string} userId 用户ID
 */
Mock.mock('/api/user/getRouteMenuList', 'post', params => {
  const data: IGetRouteMenuList = JSON.parse(params.body)
  const userList = ['admin00001', 'common00001']
  if (!userList.includes(data.userId)) {
    return {
      code: 10086,
      message: '账号不存在，请输入正确的账号',
      data: {}
    }
  }
  const result = data.userId === 'admin00001' ? adminRoute : commonRoute
  return {
    code: 10000,
    message: '请求成功',
    data: result
  }
})
/**
 * 退出登录
 * @param {string} userId 用户ID
 */
Mock.mock('/api/user/logout', 'post', async params => {
  await sleep(500)
  const data: ILogout = JSON.parse(params.body)
  return {
    code: 10000,
    message: '退出成功',
    data
  }
})
