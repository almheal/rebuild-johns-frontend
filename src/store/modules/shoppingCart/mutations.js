import * as types from './mutations-types'

export default {
  [types.SET_ITEM_CART](state, item) {
    state.items.unshift(item)
  },
  [types.SET_ITEMS_CART](state, items) {
    state.items = items
  },
  [types.SET_DISCOUNT](state, discount) {
    state.discount = discount
  },
}
