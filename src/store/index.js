import { createStore } from 'vuex'
import locale from './modules/locale'

export default createStore({
  modules: {
    locale,
  },
})
