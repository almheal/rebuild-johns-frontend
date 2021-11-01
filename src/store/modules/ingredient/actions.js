import * as ingredientService from '@/services/ingredient.service'
import * as types from './mutations-types'

const fetchIngredients = async ({ commit }, { query } = {}) => {
  try {
    const data = await ingredientService.getAll({ query })
    commit(types.SET_INGREDIENTS, data.data ? data.data : data)
  } catch (err) {
    console.log(err)
  }
}

export default {
  fetchIngredients,
}
