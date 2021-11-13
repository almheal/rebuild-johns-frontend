import { shallowMount, flushPromises } from '@vue/test-utils'
import { createStore } from 'vuex'
import LoginForm from '@components/forms/LoginForm'
import AppForm from '@elements/AppForm'
import AppField from '@elements/AppField'
import * as userMutationTypes from '@/store/modules/user/mutations-types'
import { phoneValidation, passwordValidation } from '@utils/validations'
import { mockModuleStore, mockFnByNames } from './helpers/index'

describe('Login form', () => {
  let wrapper
  let mockedActions
  let mockedMutations

  const DATA_REGISTER_BUTTON = '[data-test=register-button]'
  const DATA_PHONE_FIELD = 'phone-field'
  const DATA_PASSWORD_FIELD = 'password-field'

  const findComponentByData = (component, dataAttr) =>
    wrapper
      .findAllComponents(component)
      .find((c) => c.attributes('data-test') === dataAttr)

  const createComponent = ({
    props = {},
    slots,
    store: { userState } = {},
  } = {}) => {
    const userActions = mockFnByNames(['login'])
    const userMutations = mockFnByNames([userMutationTypes.SET_LOGIN_LOADER])

    mockedActions = {
      ...userActions,
    }

    mockedMutations = {
      ...userMutations,
    }

    const store = createStore({
      modules: {
        user: mockModuleStore({
          initialState: { loginLoader: false, ...userState },
          initialActions: userActions,
          initialMutations: userMutations,
        }),
      },
    })

    wrapper = shallowMount(LoginForm, {
      props,
      slots,
      global: {
        mocks: { $store: store },
        stubs: { AppForm: false, AppField: false },
      },
    })
  }

  it('default slot rendered', () => {
    const SLOT_CONTENT = 'Hello my default slot'
    createComponent({
      slots: {
        default: SLOT_CONTENT,
      },
    })

    expect(wrapper.html()).toContain(SLOT_CONTENT)
  })

  it('emit toRegistration event', async () => {
    createComponent()

    const button = wrapper.find(DATA_REGISTER_BUTTON)
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('toRegistration')
  })

  it('login not should be called when empty inputs', async () => {
    createComponent()

    const form = wrapper.findComponent(AppForm)
    await form.vm.$emit('submitForm')

    expect(mockedActions.login).not.toHaveBeenCalled()
  })

  it('wrapper contain errors when empty inputs', async () => {
    createComponent()

    const form = wrapper.findComponent(AppForm)
    await form.vm.$emit('submitForm')
    const phoneError = phoneValidation('')
    const passwordError = passwordValidation('')

    expect(wrapper.html()).toContain(phoneError?.message || phoneError)
    expect(wrapper.html()).toContain(passwordError?.message || passwordError)
  })

  it('login should be called with user data', async () => {
    const PHONE_NUMBER = '+79149112061'
    const PASSWORD = '123456'
    createComponent()

    const form = wrapper.findComponent(AppForm)
    const phoneField = findComponentByData(AppField, DATA_PHONE_FIELD)
    const passwordField = findComponentByData(AppField, DATA_PASSWORD_FIELD)
    await phoneField.vm.$emit('update:modelValue', PHONE_NUMBER)
    await passwordField.vm.$emit('update:modelValue', PASSWORD)
    await form.vm.$emit('submitForm')

    expect(mockedActions.login).toHaveBeenCalledWith(expect.any(Object), {
      phoneNumber: PHONE_NUMBER,
      password: PASSWORD,
    })
  })

  it('set login loader toggle when submitForm event', async () => {
    const PHONE_NUMBER = '+79149112061'
    const PASSWORD = '123456'
    createComponent()

    const form = wrapper.findComponent(AppForm)
    const phoneField = findComponentByData(AppField, DATA_PHONE_FIELD)
    const passwordField = findComponentByData(AppField, DATA_PASSWORD_FIELD)
    await phoneField.vm.$emit('update:modelValue', PHONE_NUMBER)
    await passwordField.vm.$emit('update:modelValue', PASSWORD)
    await form.vm.$emit('submitForm')

    await flushPromises()

    expect(
      mockedMutations[userMutationTypes.SET_LOGIN_LOADER].mock.calls.length
    ).toBe(2)
    expect(
      mockedMutations[userMutationTypes.SET_LOGIN_LOADER].mock.calls[0][1]
    ).toBe(true)
    expect(
      mockedMutations[userMutationTypes.SET_LOGIN_LOADER].mock.calls[1][1]
    ).toBe(false)
  })

  it.each`
    loginReturnValue | name
    ${true}          | ${'emit'}
    ${false}         | ${'not emit'}
  `('$name isSubmited event', async ({ loginReturnValue }) => {
    const PHONE_NUMBER = '+79149112061'
    const PASSWORD = '123456'
    createComponent()
    mockedActions.login.mockReturnValueOnce(loginReturnValue)

    const form = wrapper.findComponent(AppForm)
    const phoneField = findComponentByData(AppField, DATA_PHONE_FIELD)
    const passwordField = findComponentByData(AppField, DATA_PASSWORD_FIELD)
    await phoneField.vm.$emit('update:modelValue', PHONE_NUMBER)
    await passwordField.vm.$emit('update:modelValue', PASSWORD)
    await form.vm.$emit('submitForm')

    await flushPromises()

    if (!loginReturnValue) {
      expect(wrapper.emitted()).not.toHaveProperty('isSubmited')
    } else {
      expect(wrapper.emitted()).toHaveProperty('isSubmited')
    }
  })
})
