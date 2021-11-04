import { createStore } from 'vuex'
import locale from './modules/locale'
import user from './modules/user'
import category from './modules/category'
import product from './modules/product'
import ingredient from './modules/ingredient'
import shoppingCart from './modules/shoppingCart'
import promoCode from './modules/promoCode'
import halves from './modules/halves'

export default createStore({
  modules: {
    locale,
    user,
    category,
    product,
    ingredient,
    shoppingCart,
    promoCode,
    halves,
  },
})
