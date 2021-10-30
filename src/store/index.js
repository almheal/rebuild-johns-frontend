import { createStore } from 'vuex'
import locale from './modules/locale'
import user from './modules/user'

export default createStore({
  modules: {
    locale,
    user,
  },
})
