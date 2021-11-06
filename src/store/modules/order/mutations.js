import * as types from './mutations-types'

export default {
  [types.SET_ORDER_LOADER](state, value) {
    state.orderLoader = value
  },
}
