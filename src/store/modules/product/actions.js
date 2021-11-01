import * as productService from '@/services/product.service'
import * as types from './mutations-types'

export const fetchProducts = async ({ commit }, { query } = {}) => {
  try {
    const data = await productService.getAll({ query })
    commit(types.SET_PRODUCTS, data.data ? data.data : data)
  } catch (err) {
    console.log(err)
  }
}

export const fetchProduct = async (context, id) => {
  try {
    const data = await productService.get(id)
    return data
  } catch (err) {
    console.log(err)
  }
}

export default {
  fetchProducts,
  fetchProduct,
}
