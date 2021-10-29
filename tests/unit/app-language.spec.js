import { shallowMount } from '@vue/test-utils'
import AppLanguage from '@elements/AppLanguage.vue'

describe('App language', () => {
  let wrapper
  const DATA_LANGUAGES_LIST = '[data-test=languages]'
  const DATA_LANGUAGE_ITEM = '[data-test=language]'
  const INITIAL_LANGUAGES = [
    { title: 'ru', messages: 'messages' },
    { title: 'en', messages: 'messages' },
    { title: 'es', messages: 'messages' },
  ]
  const SELECTED_LANGUAGE = {
    title: 'en',
    messages: 'messages',
  }

  const createComponent = (props = {}) => {
    wrapper = shallowMount(AppLanguage, { props })
  }

  const findActiveLanguage = () =>
    wrapper
      .findAll(DATA_LANGUAGE_ITEM)
      .find((language) => language.classes('is-active'))

  const findIsShowLanguages = () =>
    wrapper
      .findAll(DATA_LANGUAGE_ITEM)
      .filter((language) => language.classes('is-show'))

  const findLanguageByTitle = (title) =>
    wrapper
      .findAll(DATA_LANGUAGE_ITEM)
      .find((language) => language.text() === title)

  it('selectedLanguage has is-active class', () => {
    createComponent({
      languages: INITIAL_LANGUAGES,
      selectedLanguageTitle: 'ru',
    })

    const activeLanguage = findActiveLanguage()

    expect(activeLanguage).toBeTruthy()
  })

  it('initial unselected languages have no is-show class', () => {
    createComponent({
      languages: INITIAL_LANGUAGES,
      selectedLanguageTitle: 'ru',
    })

    const isShowedLanguages = findIsShowLanguages()

    expect(isShowedLanguages).toHaveLength(0)
  })

  it('all languages have is-show class after click on active language', async () => {
    createComponent({
      languages: INITIAL_LANGUAGES,
      selectedLanguageTitle: 'ru',
    })

    const activeLanguage = findActiveLanguage()
    await activeLanguage?.trigger('click')
    const isShowedLanguages = findIsShowLanguages()

    expect(isShowedLanguages).toHaveLength(INITIAL_LANGUAGES.length)
  })

  it('initial language list no has is-active class', () => {
    createComponent()

    const languageList = wrapper.find(DATA_LANGUAGES_LIST)

    expect(languageList.classes('is-active')).toBe(false)
  })

  it('language list has is-active class after click on active language', async () => {
    createComponent({
      languages: INITIAL_LANGUAGES,
      selectedLanguageTitle: 'ru',
    })

    const languageList = wrapper.find(DATA_LANGUAGES_LIST)
    const activeLanguage = findActiveLanguage()
    //check is-active class before click
    expect(languageList.classes('is-active')).toBe(false)
    await activeLanguage?.trigger('click')

    expect(languageList.classes('is-active')).toBe(true)
  })

  it('unselected languages is hidden after select language', async () => {
    createComponent({
      languages: INITIAL_LANGUAGES,
      selectedLanguageTitle: 'ru',
    })

    const activeLanguage = findActiveLanguage()
    await activeLanguage?.trigger('click')
    await activeLanguage?.trigger('click')
    const isShowedLanguages = findIsShowLanguages()

    expect(isShowedLanguages).toHaveLength(0)
  })

  it('if selected language title toEqual selectedLanguageTitle no emit selectLanguage event', async () => {
    createComponent({
      languages: INITIAL_LANGUAGES,
      selectedLanguageTitle: 'ru',
    })

    const activeLanguage = findActiveLanguage()
    await activeLanguage?.trigger('click')
    await activeLanguage?.trigger('click')

    expect(wrapper.emitted('selectLanguage')).toBeUndefined()
  })

  it('select language emit selectLanguage event', async () => {
    createComponent({
      languages: INITIAL_LANGUAGES,
      selectedLanguageTitle: 'ru',
    })

    const activeLanguage = findActiveLanguage()
    await activeLanguage?.trigger('click')
    const language = findLanguageByTitle(SELECTED_LANGUAGE.title)
    await language?.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('selectLanguage')
  })

  it('emitted selectLanguage event value equal select language', async () => {
    createComponent({
      languages: INITIAL_LANGUAGES,
      selectedLanguageTitle: 'ru',
    })

    const activeLanguage = findActiveLanguage()
    await activeLanguage?.trigger('click')
    const language = findLanguageByTitle(SELECTED_LANGUAGE.title)
    await language?.trigger('click')
    const event = wrapper.emitted('selectLanguage')

    expect(event).toEqual(expect.arrayContaining([[SELECTED_LANGUAGE]]))
  })
})
