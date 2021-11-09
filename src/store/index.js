import { createStore } from 'vuex'
import locale from './modules/locale'
import user from './modules/user'
import category from './modules/category'
import product from './modules/product'
import ingredient from './modules/ingredient'
import shoppingCart from './modules/shoppingCart'
import promoCode from './modules/promoCode'
import halves from './modules/halves'
import order from './modules/order'
import notification from './modules/notification'
import mutations from './mutations'
import state from './state'

export default createStore({
  state,
  mutations,
  modules: {
    locale,
    user,
    category,
    product,
    ingredient,
    shoppingCart,
    promoCode,
    halves,
    order,
    notification,
  },
})
