import AppProductVarious from '@elements/AppProductVarious'
import { shallowMount } from '@vue/test-utils'

describe('App product various', () => {
  let wrapper

  const DATA_ITEM = '[data-test=various-item]'

  const findItemByText = (text) =>
    wrapper.findAll(DATA_ITEM).find((item) => item.text() === text)

  const createComponent = (props) => {
    wrapper = shallowMount(AppProductVarious, { props })
  }

  it('rendered items length equal props items length', () => {
    const propItems = ['1', '2', '3']
    createComponent({ items: propItems })

    const items = wrapper.findAll(DATA_ITEM)

    expect(items).toHaveLength(propItems.length)
  })

  it('default toShow showed item', () => {
    const propItems = ['1']
    createComponent({ items: propItems })

    const item = findItemByText(propItems[0])

    expect(item.exists()).toBe(true)
  })

  it('item have is-active class', () => {
    const propItems = [{ title: '1' }, { title: '2' }, { title: '3' }]
    createComponent({
      items: propItems,
      modelValue: propItems[2],
      toShow: (item) => item.title,
    })

    const item = findItemByText(propItems[2].title)

    expect(item.classes('is-active')).toBe(true)
  })

  it('click on item emitted update:modelValue event', async () => {
    const propItems = [{ title: '1' }, { title: '2' }, { title: '3' }]
    createComponent({
      items: propItems,
      modelValue: propItems[2],
      toShow: (item) => item.title,
    })

    const item = findItemByText(propItems[2].title)
    await item.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('update:modelValue emitted initial value', async () => {
    const propItems = [{ title: '1' }, { title: '2' }, { title: '3' }]
    createComponent({
      items: propItems,
      modelValue: propItems[2],
      toShow: (item) => item.title,
    })

    const item = findItemByText(propItems[2].title)
    await item.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual(
      expect.arrayContaining([[propItems[2]]])
    )
  })
})
