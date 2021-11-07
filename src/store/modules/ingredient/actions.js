import * as ingredientService from '@/services/ingredient.service'
import * as types from './mutations-types'

const fetchIngredients = async ({ commit }, { params } = {}) => {
  try {
    const data = await ingredientService.getAll({ params })
    commit(types.SET_INGREDIENTS, data.data ? data.data : data)

    return data
  } catch (err) {
    return false
  }
}

export default {
  fetchIngredients,
}
