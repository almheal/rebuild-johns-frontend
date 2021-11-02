import * as types from './mutations-types'

export default {
  [types.SET_PROMO_CODE](state, promoCode) {
    state.promoCode = promoCode
  },
}
