import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast, Alert } from '@/utils/toast'
import { getStorage, deleteStorage } from '@/utils'
import { THttpResponse } from '@/servers/servers'
import { httpCode } from '@/config'

export const createAxiosExamples = (customConfig?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: 1000 * 30, // 超时
    withCredentials: true, // 跨域携带cookie
    headers: { 'Content-Type': 'application/json' }, // 请求头
    ...customConfig // 自定义配置
  })

  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      const T = getStorage('token')
      if (T) {
        // eslint-disable-next-line
        ;(config.headers as TObject).common['Authorization'] = `Bearer ${T}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    // 成功
    (response: AxiosResponse<THttpResponse>) => {
      const res = response.data
      const { code } = response.data
      if (code === 401) {
        Alert('登录状态已过期，请重新登录', { confirmButtonText: '确定' })
          .then(() => {
            deleteStorage('all') // 清除浏览器全部临时缓存
            window.location.href = '/' // 去登录页
          })
          .catch(() => false)
      } else if (code !== 0) {
        Toast(res.message, { type: 'error' })
        return Promise.reject(new Error(res.message))
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
