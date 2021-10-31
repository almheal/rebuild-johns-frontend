import * as types from './mutations-types'

export default {
  [types.SET_CATEGORIES](state, categories) {
    state.categories = categories
  },
  [types.SET_CATEGORIES_LOADER](state, value) {
    state.categoriesLoader = value
  },
}
