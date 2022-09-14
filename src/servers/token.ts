const { NODE_ENV } = process.env

const userToken = `token_${NODE_ENV}`

function clearToken() {
  sessionStorage.removeItem(userToken)
}

// 获取token
function getToken() {
  return sessionStorage.getItem(userToken) || ''
}

// 设置token
function setToken(utoken: string) {
  sessionStorage.setItem(userToken, utoken)
}

export default {
  getToken,
  setToken,
  clearToken
}
