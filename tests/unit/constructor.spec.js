import { shallowMount, flushPromises } from '@vue/test-utils'
import { createStore } from 'vuex'
import * as productMutationTypes from '@/store/modules/product/mutations-types'
import * as ingredientMutationTypes from '@/store/modules/ingredient/mutations-types'
import { mockModuleStore, mockFnByNames } from './helpers'
import Constructor from '@/views/Constructor'
import ConstructorIngredients from '@components/constructor/ConstructorIngredients'
import ConstructorProduct from '@components/constructor/ConstructorProduct'
import ConstructorContent from '@components/constructor/ConstructorContent'
import ConstructorHeader from '@components/constructor/ConstructorHeader'
import AppButton from '@components/elements/AppButton'
import AppNextView from '@elements/AppNextView'
import AppCircleLoader from '@elements/AppCircleLoader'
import { ingredientsMock } from './__mocks__/ingredients.mock'
import { MAX_LENGTH_INGREDIENTS } from '@const'

describe('Constructor view', () => {
  let wrapper
  let mockedActions
  let mockedMutations
  let router

  const DATA_BUTTON_NEXT = 'button-next'
  const DATA_BUTTON_CART = 'button-cart'
  const DATA_HEADER_TOTAL = '[data-test=header-total]'
  const DATA_BODY = '[data-test=body]'
  const DATA_TITLE = '[data-test=title]'
  const DATA_SUBTITLE = '[data-test=subtitle]'
  const DATA_INGREDIENTS_LOADER = 'ingredients-loader'
  const DATA_INFO = '[data-test=info]'
  const DATA_PRODUCT_LOADER = 'product-loader'
  const DATA_ERROR = '[data-test=error]'

  const findComponentByData = (component, dataAttr) =>
    wrapper
      .findAllComponents(component)
      .find((c) => c.attributes('data-test') === dataAttr)

  const createComponent = ({
    props = {},
    store: {
      productState,
      ingredientState,
      ingredientGetters,
      categoryGetters,
    } = {},
    route = { query: {} },
    customRouter = {},
    stubs = {},
  } = {}) => {
    const productMockedActions = mockFnByNames(['fetchProduct'])
    const productMockedMutations = mockFnByNames([
      productMutationTypes.SET_PRODUCT_LOADER,
    ])
    const ingredientMockedActions = mockFnByNames(['fetchIngredients'])
    const ingredientMockedMutations = mockFnByNames([
      ingredientMutationTypes.SET_INGREDIENTS_LOADER,
    ])
    const categoryMockedActions = mockFnByNames(['fetchCategories'])
    const shoppingCartMockedActions = mockFnByNames(['addToCart'])

    mockedActions = {
      ...productMockedActions,
      ...ingredientMockedActions,
      ...categoryMockedActions,
      ...shoppingCartMockedActions,
    }

    mockedMutations = {
      ...productMockedMutations,
      ...ingredientMockedMutations,
    }

    router = {
      push: jest.fn(),
    }

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
          initialGetters: { ...categoryGetters, getPizzaCategory: () => ({}) },
          initialActions: categoryMockedActions,
        }),
        shoppingCart: mockModuleStore({
          initialActions: shoppingCartMockedActions,
        }),
      },
    })

    wrapper = shallowMount(Constructor, {
      props,
      global: {
        mocks: {
          $store: store,
          $route: route,
          $router: { ...customRouter, ...router },
        },
        stubs: {
          ...stubs,
        },
      },
    })
  }

  it('fetch categories should be called on mounted', () => {
    createComponent()

    expect(mockedActions.fetchCategories).toHaveBeenCalled()
  })

  it('fetch ingredients should be called on mounted', () => {
    createComponent()

    expect(mockedActions.fetchIngredients).toHaveBeenCalled()
  })

  it('fetch product should be called when query id', () => {
    createComponent({ route: { query: { id: '123' } } })

    expect(mockedActions.fetchProduct).toHaveBeenCalled()
  })

  it('fetch product should not be called without query id', () => {
    createComponent()

    expect(mockedActions.fetchProduct).not.toHaveBeenCalled()
  })

  it('constructor product step not changed if product title is empty', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)
    await buttonNext.vm.$emit('clickButton')

    expect(constructorProduct.classes('is-active')).toBe(true)
  })

  it('addToCart should be called by button click', async () => {
    createComponent()

    const button = findComponentByData(AppButton, DATA_BUTTON_CART)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)
    await constructorProduct.vm.$emit('update:title', 'title')
    await button.vm.$emit('clickButton')

    expect(mockedActions.addToCart).toHaveBeenCalled()
  })

  it('addToCart should be called by button-next click', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)
    await constructorProduct.vm.$emit('update:title', 'title')

    await buttonNext.vm.$emit('clickButton')
    await buttonNext.vm.$emit('clickButton')
    await buttonNext.vm.$emit('clickButton')

    expect(mockedActions.addToCart).toHaveBeenCalled()
  })

  it('active step is changed by click next button', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)
    const constructorIngredients = wrapper.findComponent(ConstructorIngredients)
    const constructorContent = wrapper.findComponent(ConstructorContent)

    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')

    expect(constructorIngredients.classes('is-active')).toBe(true)
    await buttonNext.vm.$emit('clickButton')

    expect(constructorContent.classes('is-active')).toBe(true)
  })

  it('constructor header has is-active class', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorHeader = wrapper.findComponent(ConstructorHeader)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)

    expect(constructorHeader.classes('is-active')).toBe(true)
    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')
    expect(constructorHeader.classes('is-active')).toBe(true)
  })

  it('constructor header not have is-active class', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorHeader = wrapper.findComponent(ConstructorHeader)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)

    expect(constructorHeader.classes('is-active')).toBe(true)

    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')
    expect(constructorHeader.classes('is-active')).toBe(true)
    await buttonNext.vm.$emit('clickButton')
    expect(constructorHeader.classes('is-active')).toBe(false)
    await buttonNext.vm.$emit('clickButton')

    expect(constructorHeader.classes('is-active')).toBe(false)
  })

  it('redirect component must be showed only content step', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)
    let nextView = wrapper.findComponent(AppNextView)
    expect(nextView.exists()).toBe(false)

    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')
    nextView = wrapper.findComponent(AppNextView)
    expect(nextView.exists()).toBe(false)

    await buttonNext.vm.$emit('clickButton')
    nextView = wrapper.findComponent(AppNextView)
    expect(nextView.exists()).toBe(false)

    await buttonNext.vm.$emit('clickButton')
    await flushPromises()

    nextView = wrapper.findComponent(AppNextView)

    expect(nextView.exists()).toBe(true)
  })

  it('when active step first, prev button push to home page', async () => {
    createComponent()

    const constructorHeader = wrapper.findComponent(ConstructorHeader)
    await constructorHeader.vm.$emit('toBack')

    expect(router.push).toHaveBeenCalledWith('/')
  })

  it('by click prev button, previous component has is-active class', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)
    const constructorHeader = wrapper.findComponent(ConstructorHeader)
    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')
    await constructorHeader.vm.$emit('toBack')

    expect(constructorProduct.classes('is-active')).toBe(true)
  })

  it('total in header have is-active class', async () => {
    createComponent({ stubs: { ConstructorHeader: false } })

    const headerTotal = wrapper.find(DATA_HEADER_TOTAL)
    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)

    expect(headerTotal.classes('is-active')).toBe(true)
    await buttonNext.vm.$emit('clickButton')

    expect(headerTotal.classes('is-active')).toBe(true)
  })

  it('total in header not have is-active class', async () => {
    createComponent({ stubs: { ConstructorHeader: false } })

    const headerTotal = wrapper.find(DATA_HEADER_TOTAL)
    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)

    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')
    await buttonNext.vm.$emit('clickButton')

    expect(headerTotal.classes('is-active')).toBe(false)
  })

  it('body not showed when redirect component', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)

    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')
    await buttonNext.vm.$emit('clickButton')
    await buttonNext.vm.$emit('clickButton')
    await flushPromises()

    const constructorBody = wrapper.find(DATA_BODY)

    expect(constructorBody.exists()).toBe(false)
  })

  it('constructor title have is-active class', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorTitle = wrapper.find(DATA_TITLE)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)

    expect(constructorTitle.classes('is-active')).toBe(true)
    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')
    expect(constructorTitle.classes('is-active')).toBe(true)
  })

  it('constructor subtitle have is-active class', async () => {
    createComponent()

    const buttonNext = findComponentByData(AppButton, DATA_BUTTON_NEXT)
    const constructorSubTitle = wrapper.find(DATA_SUBTITLE)
    const constructorProduct = wrapper.findComponent(ConstructorProduct)

    expect(constructorSubTitle.classes('is-active')).toBe(false)
    await constructorProduct.vm.$emit('update:title', 'title')
    await buttonNext.vm.$emit('clickButton')
    expect(constructorSubTitle.classes('is-active')).toBe(true)
  })

  it.each`
    loaderValue | name                                   | expectedResult
    ${true}     | ${'not showed when ingredientsLoader'} | ${false}
    ${false}    | ${'showed when !ingredientsLoader'}    | ${true}
  `('constructor ingredients $name', ({ loaderValue, expectedResult }) => {
    createComponent({
      store: { ingredientState: { ingredientsLoader: loaderValue } },
    })

    const constructorIngredients = wrapper.findComponent(ConstructorIngredients)

    expect(constructorIngredients.exists()).toBe(expectedResult)
  })

  it.each`
    loaderValue | name                                    | expectedResult
    ${true}     | ${'showed when ingredientsLoader'}      | ${true}
    ${false}    | ${'not showed when !ingredientsLoader'} | ${undefined}
  `('ingredients circle loader $name', ({ loaderValue, expectedResult }) => {
    createComponent({
      store: { ingredientState: { ingredientsLoader: loaderValue } },
    })

    const loader = findComponentByData(AppCircleLoader, DATA_INGREDIENTS_LOADER)

    expect(expectedResult ? loader.exists() : loader).toBe(expectedResult)
  })

  it.each`
    loaderValue | name                               | expectedResult
    ${true}     | ${'not showed when productLoader'} | ${false}
    ${false}    | ${'showed when !productLoader'}    | ${true}
  `('constructor info $name', ({ loaderValue, expectedResult }) => {
    createComponent({
      store: { productState: { productLoader: loaderValue } },
    })

    const constructorInfo = wrapper.find(DATA_INFO)

    expect(constructorInfo.exists()).toBe(expectedResult)
  })

  it.each`
    loaderValue | name                                | expectedResult
    ${true}     | ${'showed when productLoader'}      | ${true}
    ${false}    | ${'not showed when !productLoader'} | ${undefined}
  `('product circle loader $name', ({ loaderValue, expectedResult }) => {
    createComponent({
      store: { productState: { productLoader: loaderValue } },
    })

    const loader = findComponentByData(AppCircleLoader, DATA_PRODUCT_LOADER)

    expect(expectedResult ? loader.exists() : loader).toBe(expectedResult)
  })

  it('product circle loader have is-active class', () => {
    createComponent({ store: { productState: { productLoader: true } } })

    const loader = findComponentByData(AppCircleLoader, DATA_PRODUCT_LOADER)

    expect(loader.classes('is-active')).toBe(true)
  })

  it('max ingredients error showed when ingredients count > max length', async () => {
    createComponent({
      store: {
        productState: { productLoader: false },
        ingredientState: { ingredients: ingredientsMock },
      },
    })

    const productContent = wrapper.findComponent(ConstructorContent)
    await flushPromises()

    await productContent.vm.$emit('changeCount', {
      number: MAX_LENGTH_INGREDIENTS + 1,
      id: ingredientsMock[0]._id,
    })

    const error = wrapper.find(DATA_ERROR)
    expect(error.exists()).toBe(true)
  })

  it('initial max ingredients error not showed', async () => {
    createComponent({
      store: {
        productState: { productLoader: false },
        ingredientState: { ingredients: ingredientsMock },
      },
    })

    await flushPromises()

    const error = wrapper.find(DATA_ERROR)
    expect(error.exists()).toBe(false)
  })
})
