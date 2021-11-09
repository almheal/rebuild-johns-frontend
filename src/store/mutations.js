import * as types from './mutations-types'

export default {
  [types.SET_BODY_WIDTH](state, width) {
    state.bodyWidth = width
  },
}
