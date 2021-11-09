import * as userService from '@/services/user.service'
import * as types from './mutations-types'
import { setLocalStorage } from '@utils'
import { TOKEN_NAME, TEST_USER } from '@const'
import router from '@/router'

const updateUser = async ({ commit }, body) => {
  try {
    const data = await userService.update({ body })
    const user = data.data ? data.data : data

    commit(types.SET_USER, user)
    return user
  } catch (err) {
    return false
  }
}

const login = async ({ commit }, body) => {
  try {
    const data = await userService.login(body)
    commit(types.SET_USER, data.user)
    return data
  } catch (err) {
    return false
  }
}

const register = async (ctx, body) => {
  try {
    const data = await userService.register(body)
    return data
  } catch (err) {
    return false
  }
}

const auth = async ({ commit }) => {
  try {
    const data = await userService.auth()
    commit(types.SET_USER, data)
  } catch (err) {
    return false
  }
}

const checkAlreadyUser = async (ctx, body) => {
  try {
    const data = await userService.checkAlreadyUser(body)
    return data
  } catch (err) {
    return false
  }
}

const logout = async ({ commit }) => {
  commit(types.SET_USER, {})
  setLocalStorage({ key: TOKEN_NAME, data: '' })
  if (router.currentRoute.value?.meta?.auth) {
    router.push('/')
  }
}

const loginByTestUser = ({ dispatch }) => {
  dispatch('login', TEST_USER)
}

export default {
  updateUser,
  login,
  register,
  auth,
  checkAlreadyUser,
  logout,
  loginByTestUser,
}
