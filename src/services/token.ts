const { NODE_ENV } = process.env

const userToken = `user_token_${NODE_ENV}`

function clearToken() {
  sessionStorage.removeItem(userToken)
}

// 获取token
function getToken() {
  return sessionStorage.getItem(userToken) || ''
}

// 设置token
function setToken(user_token: string) {
  sessionStorage.setItem(userToken, user_token)
}

export default {
  getToken,
  setToken,
  clearToken
}
