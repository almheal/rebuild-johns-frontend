import * as types from './mutations-types'

export default {
  [types.SET_INGREDIENTS](state, ingredients) {
    state.ingredients = ingredients
  },
  [types.SET_INGREDIENTS_LOADER](state, value) {
    state.ingredientsLoader = value
  },
}
