import * as productService from '@/services/product.service'
import * as types from './mutations-types'

export const fetchProducts = async (
  { commit },
  { isSet = true, params } = {}
) => {
  try {
    const data = await productService.getAll({ params })
    const products = data.data ? data.data : data

    if (isSet) {
      commit(types.SET_PRODUCTS, products)
    }
    return products
  } catch (err) {
    return false
  }
}

export const fetchProduct = async ({ commit }, id) => {
  try {
    const data = await productService.get({ id })
    commit(types.SET_PRODUCT, data)
    return data
  } catch (err) {
    return false
  }
}

export default {
  fetchProducts,
  fetchProduct,
}
