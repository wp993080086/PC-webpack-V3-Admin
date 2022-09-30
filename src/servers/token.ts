const { NODE_ENV } = process.env

const userToken = `token_${NODE_ENV}`

export function clearToken() {
  sessionStorage.removeItem(userToken)
}

// 获取token
export function getToken() {
  return sessionStorage.getItem(userToken) || ''
}

// 设置token
export function setToken(utoken: string) {
  sessionStorage.setItem(userToken, utoken)
}
