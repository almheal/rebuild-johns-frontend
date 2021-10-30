import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import LoginForm from '@/components/forms/LoginForm'
import AppForm from '@elements/AppForm'

describe('Login form', () => {
  let wrapper
  let store

  const createModuleStore = ({ userState }) => {
    store = createStore({
      modules: {
        user: {
          state: () => ({
            ...userState,
          }),
          mutations: {
            setLoginLoader: jest.fn(),
          },
          actions: {
            login: jest.fn(),
          },
        },
      },
    })
  }

  const createComponent = (props = {}) => {
    wrapper = shallowMount(LoginForm, {
      props,
      global: {
        plugins: [store],
        stubs: { AppForm: false, AppField: false },
      },
    })
  }

  it.each`
    loading  | expectedResult
    ${true}  | ${true}
    ${false} | ${false}
  `('loading prop is passed to the app-form', ({ loading, expectedResult }) => {
    createModuleStore({
      userState: {
        loginLoader: loading,
      },
    })
    createComponent()

    const appForm = wrapper.findComponent(AppForm)

    expect(appForm.props('loading')).toBe(expectedResult)
  })
})
