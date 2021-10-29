import { shallowMount } from '@vue/test-utils'
import AppBurgerButton from '@elements/AppBurgerButton.vue'

describe('App burger button', () => {
  let wrapper
  const DATA_BUTTON = '[data-test=button]'

  const createComponent = (props = {}) => {
    wrapper = shallowMount(AppBurgerButton, {
      props,
    })
  }

  it('emit clickButton event', async () => {
    createComponent()

    const burgerButton = wrapper.find(DATA_BUTTON)
    await burgerButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('clickButton')
  })

  it.each`
    name         | value    | expectedResult
    ${'have'}    | ${true}  | ${true}
    ${'no have'} | ${false} | ${false}
  `('when isCross button $name is-cross class', ({ value, expectedResult }) => {
    createComponent({
      isCross: value,
    })

    const burgerButton = wrapper.find(DATA_BUTTON)

    expect(burgerButton.classes('is-cross')).toBe(expectedResult)
  })
})
