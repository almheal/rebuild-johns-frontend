import { setLocalStorage, getLocalStorage } from '@utils'
import { TOKEN_NAME } from '@const'

function setLocalStorageToken(response) {
  if (response.data.accessToken) {
    setLocalStorage({ key: TOKEN_NAME, data: response.data.accessToken })
  }
  return response
}

function setAuthorizationToken(request) {
  const token = getLocalStorage(TOKEN_NAME)

  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
}

function interceptors(axios) {
  axios.interceptors.response.use(setLocalStorageToken)
  axios.interceptors.request.use(setAuthorizationToken)
}

export default interceptors
