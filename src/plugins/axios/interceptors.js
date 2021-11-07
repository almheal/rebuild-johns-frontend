import { setLocalStorage, getLocalStorage } from '@utils'
import { TOKEN_NAME } from '@const'
import store from '@/store'

function notificationsHandler(response) {
  const { data } = response

  if (data.message) {
    store.dispatch('notification/setNotification', {
      title: data.message,
      isError: false,
    })
  }
  return response
}

function errorsHandler(err) {
  const { message } = err.response.data

  if (err.response.status === 403) {
    setLocalStorage({ key: TOKEN_NAME, data: '' })
    return Promise.reject(err)
  }

  store.dispatch('notification/setNotification', {
    title: message,
    isError: true,
  })

  return Promise.reject(err)
}

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

function removeLocalStorageToken(error) {
  const FORBIDDEN_STATUS = 403
  if (error.response.status === FORBIDDEN_STATUS) {
    setLocalStorage({ key: TOKEN_NAME, data: '' })
  }

  throw error
}

function interceptors(axios) {
  axios.interceptors.response.use(setLocalStorageToken, removeLocalStorageToken)
  axios.interceptors.response.use(notificationsHandler, errorsHandler)
  axios.interceptors.request.use(setAuthorizationToken)
}

export default interceptors
