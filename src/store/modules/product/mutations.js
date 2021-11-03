import * as types from './mutations-types'

export default {
  [types.SET_PRODUCTS](state, products) {
    state.products = products
  },
  [types.SET_PRODUCTS_LOADER](state, value) {
    state.productsLoader = value
  },
  [types.SET_PRODUCT](state, product) {
    state.product = product
  },
  [types.SET_PRODUCT_LOADER](state, value) {
    state.productLoader = value
  },
}
