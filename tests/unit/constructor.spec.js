import { shallowMount } from '@vue/test-utils'
import Constructor from '@/views/Constructor'
import { createStore } from 'vuex'

describe('Constructor view', () => {
  let wrapper
  let store = {}

  const createStore = ({ productState = {}, ingredientState = {} }) => {
    store = {
      modules: {
        product: {
          state: {
            ...productState,
          },
        },
        ingredient: {
          state: {
            ...ingredientState,
          },
          actions: {
            fetchIngredients: jest.fn(),
            fetchProduct: jest.fn(),
            fetchCategories: jest.fn(),
            addToCart: jest.fn(),
          },
        },
      },
    }
  }

  const createComponent = (props = {}) => {
    wrapper = shallowMount(Constructor, { props, global: { plugins: [store] } })
  }

  it('test', () => {
    createComponent()
  })
})
