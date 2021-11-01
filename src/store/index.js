import { createStore } from 'vuex'
import locale from './modules/locale'
import user from './modules/user'
import category from './modules/category'
import product from './modules/product'
import ingredient from './modules/ingredient'

export default createStore({
  modules: {
    locale,
    user,
    category,
    product,
    ingredient,
  },
})
