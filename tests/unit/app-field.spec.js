import { shallowMount } from '@vue/test-utils'
import AppField from '@elements/AppField'

describe('App field', () => {
  let wrapper

  const DATA_LABEL = '[data-test=label]'
  const DATA_INPUT = '[data-test=input]'
  const DATA_ERROR = '[data-test=error]'

  const createComponent = (props) => {
    wrapper = shallowMount(AppField, { props })
  }

  it.each`
    errorValue | name                  | expectedResult
    ${'error'} | ${'with error'}       | ${true}
    ${''}      | ${'without error no'} | ${false}
  `('wrapper $name have an is-error class', ({ errorValue }) => {
    createComponent({
      error: errorValue,
    })

    const classes = wrapper.classes()

    if (errorValue) {
      expect(classes).toContain('is-error')
    } else {
      expect(classes).not.toContain('is-error')
    }
  })

  it('label has attribute "for" with a value', () => {
    createComponent({
      label: 'label',
    })

    const label = wrapper.find(DATA_LABEL)

    expect(label.attributes('for')).toBeDefined()
  })

  it('label attribute "for" value to equal input id', () => {
    createComponent({
      label: 'label',
    })

    const label = wrapper.find(DATA_LABEL)
    const input = wrapper.find(DATA_INPUT)

    expect(label.attributes('for')).toEqual(input.attributes('id'))
  })

  it.each`
    labelValue | name               | expectedResult
    ${'label'} | ${'is showed'}     | ${true}
    ${''}      | ${'is not showed'} | ${false}
  `('label $name', ({ labelValue, expectedResult }) => {
    createComponent({
      label: labelValue,
    })

    const label = wrapper.find(DATA_LABEL)

    expect(label.exists()).toBe(expectedResult)
  })

  it('label text to contain label prop value', () => {
    const LABEL_VALUE = 'label'
    createComponent({
      label: LABEL_VALUE,
    })

    const label = wrapper.find(DATA_LABEL)

    expect(label.text()).toContain(LABEL_VALUE)
  })

  it('input tag to equal fieldType prop', () => {
    const FIELD_TYPE = 'textarea'
    createComponent({
      fieldType: FIELD_TYPE,
    })

    const input = wrapper.find(DATA_INPUT)

    expect(input.html()).toContain(FIELD_TYPE)
  })

  it('input tag by default to equal "input"', () => {
    createComponent()

    const input = wrapper.find(DATA_INPUT)

    expect(input.html()).toContain('input')
  })

  it('input have id', () => {
    createComponent()

    const input = wrapper.find(DATA_INPUT)

    expect(input.attributes('id')).toBeDefined()
  })

  it('input type is changed', () => {
    const TYPE_INPUT = 'password'
    createComponent({
      typeInput: TYPE_INPUT,
    })

    const input = wrapper.find(DATA_INPUT)

    expect(input.attributes('type')).toEqual(TYPE_INPUT)
  })

  it('default input type to equal "text"', () => {
    createComponent()

    const input = wrapper.find(DATA_INPUT)

    expect(input.attributes('type')).toEqual('text')
  })

  it.each`
    errorValue | name            | expectedResult
    ${'error'} | ${'is showed'}  | ${true}
    ${''}      | ${'not showed'} | ${false}
  `('error $name', ({ errorValue, expectedResult }) => {
    createComponent({
      error: errorValue,
    })

    const error = wrapper.find(DATA_ERROR)

    expect(error.exists()).toBe(expectedResult)
  })

  it('error text to equal error prop', () => {
    const ERROR_VALUE = 'error'
    createComponent({
      error: ERROR_VALUE,
    })

    const error = wrapper.find(DATA_ERROR)

    expect(error.text()).toEqual(ERROR_VALUE)
  })

  it('emit update:modelValue event', async () => {
    createComponent()

    const input = wrapper.find(DATA_INPUT)
    await input.setValue('inputValue')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('event update:modelValue emit entered value', async () => {
    const VALUE = 'value'
    createComponent()

    const input = wrapper.find(DATA_INPUT)
    await input.setValue(VALUE)

    expect(wrapper.emitted('update:modelValue')).toEqual(
      expect.arrayContaining([[VALUE]])
    )
  })

  it('input value to equal prop modelValue', () => {
    const MODEL_VALUE = 'modelValue'
    createComponent({
      modelValue: MODEL_VALUE,
    })

    const input = wrapper.find(DATA_INPUT)

    expect(input.element.value).toEqual(MODEL_VALUE)
  })

  it.todo('maxLength')
  it.todo('prefix')
  it.todo('integer')
  it.todo('phone flag')
  it.todo('is-flag class')
})
