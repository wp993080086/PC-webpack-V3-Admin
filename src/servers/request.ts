import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast, Alert } from '@/utils/toast'
import { deleteStorage } from '@/utils'
import { httpCode, errorCode } from '@/config'
import { getToken } from './token'

export const createAxiosExamples = (customConfig?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000 * 30, // 超时
    withCredentials: true, // 跨域携带cookie
    headers: { 'Content-Type': 'application/json' }, // 请求头
    ...customConfig // 自定义配置
  })

  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      const token = getToken()
      if (token) (config.headers as TDict).token = token
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    // 成功
    (response: AxiosResponse<TDict, THttpResponse>) => {
      const res = response.data
      const { code } = response.data
      if (code === errorCode.EXPIRE) {
        Alert('登录状态已过期，请重新登录', { confirmButtonText: '确定' })
          .then(() => {
            deleteStorage('all') // 清除浏览器全部临时缓存
            window.location.href = '/' // 去登录页
          })
          .catch(() => false)
      } else if (code !== errorCode.SUCCESS) {
        Toast(res.message, { type: 'error' })
        return Promise.reject(response)
      }
      return res
    },
    // 失败
    error => {
      const { response, message } = error
      const resData = response?.data
      let errorMsg = `${response?.status || error.message}：请求出错啦 ~`
      const httpMessage = httpCode.find(item => item.code === response?.status)
      if (httpMessage) errorMsg = httpMessage.message
      // 处理报错提示
      if (message.indexOf('timeout') !== -1) {
        Toast('网络超时', { type: 'error' })
      } else if (message === 'Network Error') {
        Toast('网络连接错误', { type: 'error' })
      } else if (message === 'canceled') Toast('请求已取消', { type: 'error' })
      else Toast('接口路径找不到', { type: 'error' })
      if (resData?.message && resData?.code) {
        Toast(`${resData.code}：${resData.message}`, { type: 'error', duration: 3000 })
      } else {
        Toast(errorMsg, { type: 'error', duration: 3000 })
      }
      return Promise.reject(error)
    }
  )
  return instance
}
