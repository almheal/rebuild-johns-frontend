import * as types from './mutations-types'

export default {
  [types.SET_HALVES](state, halves) {
    state.halves = halves
  },
  [types.SET_HALVES_LOADER](state, value) {
    state.halvesLoader = value
  },
}
