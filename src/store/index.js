import { createStore } from 'vuex'
import locale from './modules/locale'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  modules: {
    locale,
    user,
    category,
  },
})
