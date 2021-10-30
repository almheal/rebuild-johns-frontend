import * as types from './mutations-types'

export default {
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_LOGIN_LOADER](state, value) {
    state.loginLoader = value
  },
  [types.SET_REGISTER_LOADER](state, value) {
    state.registerLoader = value
  },
}
