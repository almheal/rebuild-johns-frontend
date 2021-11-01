import * as userService from '@/services/user.service'
import * as types from './mutations-types'
import { setLocalStorage } from '@utils'
import { TOKEN_NAME } from '@const'

const login = async ({ commit }, body) => {
  try {
    const data = await userService.login(body)
    commit(types.SET_USER, data.user)
    return data
  } catch (err) {
    console.log(err)
  }
}

const register = async (ctx, body) => {
  try {
    const data = await userService.register(body)
    return data
  } catch (err) {
    console.log(err)
  }
}

const auth = async ({ commit }) => {
  try {
    const data = await userService.auth()
    commit(types.SET_USER, data)
  } catch (err) {
    console.log(err)
  }
}

const checkAlreadyUser = async (ctx, body) => {
  try {
    const data = await userService.checkAlreadyUser(body)
    return data
  } catch (err) {
    return err
  }
}

const logout = async ({ commit }) => {
  commit(types.SET_USER, {})
  setLocalStorage({ key: TOKEN_NAME, data: '' })
}

export default {
  login,
  register,
  auth,
  checkAlreadyUser,
  logout,
}
