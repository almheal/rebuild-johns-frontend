import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE } from '@const'

const i18n = createI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
  messages: {},
})

export default i18n
