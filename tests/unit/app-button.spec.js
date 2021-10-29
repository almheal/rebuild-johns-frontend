import { shallowMount } from '@vue/test-utils'
import AppButton from '@elements/AppButton.vue'

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
})
