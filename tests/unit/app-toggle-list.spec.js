import { shallowMount } from '@vue/test-utils'
import AppToggleList from '@elements/AppToggleList'

describe('App toggle list', () => {
  let wrapper
  const DATA_ITEM = '[data-test=item]'
  const DEFAULT_LIST = [{ title: 'firstTitle' }, { title: 'secondTitle' }]

  const createComponent = (props = {}) => {
    wrapper = shallowMount(AppToggleList, { props })
  }

  const findItemByText = (text) =>
    wrapper.findAll(DATA_ITEM).find((item) => item.text() === text)

  it('emit toggleItem event', async () => {
    createComponent({
      list: DEFAULT_LIST,
      toShow: (item) => item.title,
    })

    const item = findItemByText(DEFAULT_LIST[0].title)
    await item?.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('toggleItem')
  })

  it('rendered items have a length to the length list prop', () => {
    createComponent({
      list: DEFAULT_LIST,
    })

    const items = wrapper.findAll(DATA_ITEM)

    expect(items).toHaveLength(DEFAULT_LIST.length)
  })

  it('rendered items showed content by toShow function', () => {
    createComponent({
      list: DEFAULT_LIST,
      toShow: (item) => item.title,
    })

    const item = findItemByText(DEFAULT_LIST[0].title)

    expect(item?.exists()).toBe(true)
  })

  it('item has an is-active class', () => {
    const ACTIVE_TITLE = DEFAULT_LIST[0].title
    createComponent({
      list: DEFAULT_LIST,
      toActive: (item) => item.title === ACTIVE_TITLE,
      toShow: (item) => item.title,
    })

    const item = findItemByText(ACTIVE_TITLE)

    expect(item?.exists()).toBe(true)
  })
})
