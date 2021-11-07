import * as promoCodeService from '@/services/promoCode.service'
import * as types from './mutations-types'

const fetchPromoCode = async ({ commit }, code) => {
  try {
    const data = await promoCodeService.get({ id: code })
    commit(types.SET_PROMO_CODE, data)
    return data
  } catch (err) {
    return false
  }
}

const resetPromoCode = ({ commit }) => {
  commit(types.SET_PROMO_CODE, '')
}

export default {
  fetchPromoCode,
  resetPromoCode,
}
