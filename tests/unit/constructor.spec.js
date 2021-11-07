import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Constructor from '@/views/Constructor'
import { createStore } from 'vuex'
import * as productMutationTypes from '@/store/modules/product/mutations-types'
import * as ingredientMutationTypes from '@/store/modules/ingredient/mutations-types'
import { mockModuleStore, mockFnByNames } from './helpers'

describe('Constructor view', () => {
  let wrapper

  let productMockedActions
  let productMockedMutations

  let ingredientMockedActions
  let ingredientMockedMutations

  let categoryMockedActions

  let shoppingCartMockedActions

  const createComponent = ({
    props = {},
    store: {
      productState,
      ingredientState,
      ingredientGetters,
      categoryGetters,
    } = {},
    route = {},
  } = {}) => {
    productMockedActions = mockFnByNames(['fetchProduct'])
    productMockedMutations = mockFnByNames([
      productMutationTypes.SET_PRODUCT_LOADER,
    ])
    ingredientMockedActions = mockFnByNames(['fetchIngredients'])
    ingredientMockedMutations = mockFnByNames([
      ingredientMutationTypes.SET_INGREDIENTS_LOADER,
    ])
    categoryMockedActions = mockFnByNames(['fetchCategories'])
    shoppingCartMockedActions = mockFnByNames(['addToCart'])

    const store = createStore({
      modules: {
        product: mockModuleStore({
          initialState: { product: {}, ...productState },
          initialMutations: productMockedMutations,
          initialActions: productMockedActions,
        }),
        ingredient: mockModuleStore({
          initialState: { ingredients: [], ...ingredientState },
          initialGetters: {
            getIngredientCategories: () => [],
            ...ingredientGetters,
          },
          initialMutations: ingredientMockedMutations,
          initialActions: ingredientMockedActions,
        }),
        category: mockModuleStore({
          initialGetters: { ...categoryGetters },
          initialActions: categoryMockedActions,
        }),
        shoppingCart: shoppingCartMockedActions,
      },
    })

    wrapper = shallowMount(Constructor, {
      props,
      global: { mocks: { $store: store, $route: route } },
    })
  }

  it('fetch categories should be called on mounted', () => {
    createComponent()

    expect(categoryMockedActions.fetchCategories).toHaveBeenCalled()
  })

  it('fetch ingredients should be called on mounted', () => {
    createComponent()

    expect(ingredientMockedActions.fetchIngredients).toHaveBeenCalled()
  })

  it('fetch product should be called when query id', () => {
    createComponent({ route: { query: { id: '123' } } })

    expect(productMockedActions.fetchProduct).toHaveBeenCalled()
  })

  it('fetch product should not be called without query id', () => {
    createComponent()

    expect(productMockedActions.fetchProduct).not.toHaveBeenCalled()
  })

  it('set ingredients loader should be called on mounted with true', async () => {
    createComponent()

    expect(ingredientMockedMutations.SET_INGREDIENTS_LOADER).toHaveBeenCalled()

    await nextTick()
  })

  // it.todo(
  //   'constructor header not/have is-active class //activeStepKey !== constructorStepNames.CONTENT && !isNextView '
  // )
  //
  // it.todo(
  //   'constructor total not/have is-active class //activeStepKey !== constructorStepNames.CONTENT'
  // )
  //
  // it.todo('constructor body not showed when isNextView = true')
  //
  // it.todo(
  //   'constructor title not/have is-active class //activeStepKey !== constructorStepNames.CONTENT'
  // )
  //
  // it.todo(
  //   'constructor subtitle not/have is-active class //activeStepKey === constructorStepNames.INGREDIENTS'
  // )
  //
  // it.todo('template v-if="!ingredientsLoader">')
  //
  // it.todo(
  //   'ingredients not/have is-active class //activeStepKey === constructorStepNames.INGREDIENTS'
  // )
  //
  // it.todo(
  //   'error is show when ingredients length equal max, isMaxIngredientsError'
  // )
})
