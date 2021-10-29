import { genericService } from '@/services/genericService'
import * as types from './mutations-types'
import { getLocalStorage, setLocalStorage } from '@utils'
import { LOCALE_NAME, DEFAULT_LOCALE } from '@const'
import i18n from '@/plugins/i18n'

const localeService = genericService('/locales', {
  get: true,
  getAll: true,
})

const fetchLocale = async (ctx, id) => {
  try {
    const data = await localeService.get(id)
    return data
  } catch (err) {
    console.log(err)
  }
}

const fetchLocales = async ({ commit }, { query } = {}) => {
  try {
    const data = await localeService.getAll({ query })

    commit(types.SET_LOCALES, data.data ? data.data : data)
  } catch (err) {
    console.log(err)
  }
}

const changeLocale = ({ commit }, { locale, languages }) => {
  let currentLocale = languages.find(
    (language) => language.title.toLowerCase() === locale
  )

  if (!currentLocale) {
    currentLocale = languages.find(
      (language) => language.title.toLowerCase() === DEFAULT_LOCALE
    )
  }

  i18n.global.locale = currentLocale?.title?.toLowerCase() || DEFAULT_LOCALE

  setLocalStorage({
    key: LOCALE_NAME,
    data: currentLocale?.title?.toLowerCase() || DEFAULT_LOCALE,
  })
  commit(types.SET_CURRENT_LOCALE, currentLocale)
}

const initialLocale = ({ dispatch }, { languages }) => {
  const savedLocale = getLocalStorage(LOCALE_NAME)

  //add all messages by languages
  languages.forEach((language) => {
    i18n.global.mergeLocaleMessage(
      language.title,
      JSON.parse(language.messages.messages)
    )
  })

  if (!savedLocale) {
    const locale = navigator?.language?.split('-')[0] || DEFAULT_LOCALE

    dispatch('changeLocale', { locale, languages })
    return
  }

  dispatch('changeLocale', { locale: savedLocale, languages })
}

export default {
  fetchLocale,
  fetchLocales,
  initialLocale,
  changeLocale,
}
