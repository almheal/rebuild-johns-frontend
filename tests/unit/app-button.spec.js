import { shallowMount } from '@vue/test-utils'
import AppButton from '@elements/AppButton'
import AppCircleLoader from '@elements/AppCircleLoader'

describe('App button', () => {
  let wrapper
  const DATA_BUTTON = '[data-test=button]'

  const createComponent = (props = {}, slots = {}) => {
    wrapper = shallowMount(AppButton, { props, slots })
  }

  it('click emit clickButton event', async () => {
    createComponent()

    const button = wrapper.find(DATA_BUTTON)
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('clickButton')
  })

  it('default buttonType is button', () => {
    createComponent()

    const button = wrapper.find(DATA_BUTTON)

    expect(button.attributes('type')).toBe('button')
  })

  it('buttonType is changed', () => {
    const BUTTON_TYPE = 'submit'
    createComponent({ buttonType: BUTTON_TYPE })

    const button = wrapper.find(DATA_BUTTON)

    expect(button.attributes('type')).toBe(BUTTON_TYPE)
  })

  it('with font prop gotham has font-gotham class', () => {
    createComponent({ font: 'gotham' })

    const button = wrapper.find(DATA_BUTTON)

    expect(button.classes('gotham-font')).toBe(true)
  })

  it('button has transparent view class', () => {
    createComponent({
      view: 'transparent',
    })

    const button = wrapper.find(DATA_BUTTON)

    expect(button.classes('transparent-view')).toBe(true)
  })

  it('button has uppercase class', () => {
    createComponent({
      textTransform: 'uppercase',
    })

    const button = wrapper.find(DATA_BUTTON)

    expect(button.classes('uppercase')).toBe(true)
  })

  it('the contents of the slot are shown', () => {
    const SLOT_CONTENT = 'Slot content'
    createComponent({}, { default: SLOT_CONTENT })

    const button = wrapper.find(DATA_BUTTON)

    expect(button.html()).toContain(SLOT_CONTENT)
  })

  it('button is disabled', () => {
    createComponent({
      disabled: true,
    })

    const button = wrapper.find(DATA_BUTTON)

    expect(button.attributes()).toHaveProperty('disabled')
  })

  it.each`
    loading  | name
    ${true}  | ${'have'}
    ${false} | ${'no have'}
  `('button $name is-loading class', ({ loading }) => {
    createComponent({
      loading,
    })

    const button = wrapper.find(DATA_BUTTON)

    if (loading) {
      expect(button.classes()).toContain('is-loading')
    } else {
      expect(button.classes()).not.toContain('is-loading')
    }
  })

  it.each`
    loading  | name               | expectedResult
    ${true}  | ${'is showed'}     | ${true}
    ${false} | ${'is not showed'} | ${false}
  `('component loader $name', ({ loading, expectedResult }) => {
    createComponent({
      loading,
    })

    const loader = wrapper.findComponent(AppCircleLoader)

    expect(loader.exists()).toBe(expectedResult)
  })

  it('with loading, button is disabled', () => {
    createComponent({
      loading: true,
    })

    const button = wrapper.find(DATA_BUTTON)

    expect(button.attributes()).toHaveProperty('disabled')
  })
})
