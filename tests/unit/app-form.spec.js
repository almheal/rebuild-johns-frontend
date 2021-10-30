import { shallowMount } from '@vue/test-utils'
import AppForm from '@elements/AppForm'
import AppButton from '@elements/AppButton'

describe('App form', () => {
  let wrapper

  const DATA_FORM = '[data-test=form]'
  const DATA_BODY = '[data-test=body]'
  const DATA_ACTIONS = '[data-test=actions]'

  const createComponent = ({ props, slots, global } = {}) => {
    wrapper = shallowMount(AppForm, {
      props,
      slots,
      global,
    })
  }

  it('emit submitForm event', async () => {
    createComponent()

    const form = wrapper.find(DATA_FORM)
    await form.trigger('submit.prevent')

    expect(wrapper.emitted()).toHaveProperty('submitForm')
  })

  it.each`
    buttonText      | name            | expectedResult
    ${'buttonText'} | ${'is showed'}  | ${true}
    ${''}           | ${'not showed'} | ${false}
  `('button by prop buttonText $name', ({ buttonText, expectedResult }) => {
    createComponent({
      props: {
        buttonText,
      },
    })

    const button = wrapper.findComponent(AppButton)

    expect(button.exists()).toBe(expectedResult)
  })

  it('button text contain buttonText prop value', () => {
    const BUTTON_TEXT = 'text'
    createComponent({
      props: {
        buttonText: BUTTON_TEXT,
      },
      global: {
        stubs: {
          AppButton: false,
        },
      },
    })

    const button = wrapper.findComponent(AppButton)

    expect(button.text()).toContain(BUTTON_TEXT)
  })

  it('default slot is rendered', () => {
    const SLOT_CONTENT = 'test-slot'
    createComponent({
      slots: {
        default: SLOT_CONTENT,
      },
    })

    const body = wrapper.find(DATA_BODY)

    expect(body.html()).toContain(SLOT_CONTENT)
  })

  it.each`
    slotName     | dataAttr
    ${'formTop'} | ${DATA_FORM}
    ${'actions'} | ${DATA_ACTIONS}
  `('slot $slotName is rendered', ({ slotName, dataAttr }) => {
    const SLOT_CONTENT = 'test-slot'
    createComponent({
      slots: {
        [slotName]: SLOT_CONTENT,
      },
    })

    const target = wrapper.find(dataAttr)

    expect(target.text()).toContain(SLOT_CONTENT)
  })

  it.todo('loading prop')
})
