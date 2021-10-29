import * as types from './mutations-types'

export default {
  [types.SET_CURRENT_LOCALE](state, locale) {
    state.currentLocale = locale
  },
  [types.SET_LOCALES](state, locales) {
    state.locales = locales
  },
}
