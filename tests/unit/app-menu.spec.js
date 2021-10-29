import { shallowMount } from '@vue/test-utils'
import AppMenu from '@elements/AppMenu.vue'

describe('App menu', () => {
  let wrapper
  const DATA_LINK = '[data-test=link]'
  const MENU_LIST = [
    { title: 'Home', link: '/' },
    { title: 'Contacts', link: '/contacts' },
    { title: 'PapaBonus', link: '/papa-bonus' },
  ]

  const createComponent = (props = {}) => {
    wrapper = shallowMount(AppMenu, {
      props,
      global: { stubs: { routerLink: true } },
    })
  }

  it('rendered links have length equal props menu length', () => {
    createComponent({
      menu: MENU_LIST,
    })

    const links = wrapper.findAll(DATA_LINK)

    expect(links).toHaveLength(MENU_LIST.length)
  })
})
