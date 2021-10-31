import * as categoryService from '@/services/category.service'
import * as types from './mutations-types'

const fetchCategories = async ({ commit }, { query } = {}) => {
  try {
    const data = await categoryService.getAll({ query })
    commit(types.SET_CATEGORIES, data.data ? data.data : data)
  } catch (err) {
    console.log(err)
  }
}

export default { fetchCategories }
