import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { nextTick } from 'vue'
import ProductCard from '@components/product/ProductCard'
import {
  defaultProductMock,
  productOptionsMock,
} from './__mocks__/product.mock'
import { ingredientMock } from './__mocks__/ingredients.mock'
import ProductIngredientsButton from '@components/product/ProductIngredientsButton'
import AppProductVarious from '@elements/AppProductVarious'
import AppButton from '@elements/AppButton'
import ProductIngredients from '@components/product/ProductIngredients'

describe('Product card', () => {
  let wrapper
  let router
  let mockedActions

  const DATA_DESCRIPTION = '[data-test=description]'
  const DATA_VARIETIES = '[data-test=varieties]'
  const DATA_SIZES = 'product-sizes'
  const DATA_VARIOUS_VARIETIES = 'product-varieties'

  const DEFAULT_PRODUCT_SIZE = {
    price: '123',
  }

  const DEFAULT_PRODUCT_OPTION = {
    variety: 'varietyTitle',
    img: 'imgUrl',
    sizes: [],
  }

  const DEFAULT_PRODUCT_TO_CART = {
    title: defaultProductMock.title,
    ingredients: defaultProductMock.ingredients,
    variety: defaultProductMock.options[0],
    size: defaultProductMock.options[0].sizes[0],
    options: defaultProductMock.options,
    category: defaultProductMock.category._id,
  }

  const findComponentByData = (component, dataAttr) =>
    wrapper
      .findAllComponents(component)
      .find((c) => c.attributes('data-test') === dataAttr)

  const createComponent = (props) => {
    router = {
      push: jest.fn(),
    }

    mockedActions = {
      addToCart: jest.fn(),
    }

    const store = createStore({
      modules: {
        shoppingCart: {
          namespaced: true,
          actions: mockedActions,
        },
      },
    })

    wrapper = shallowMount(ProductCard, {
      props: {
        product: defaultProductMock,
        ...props,
      },
      global: { mocks: { $store: store, $router: router } },
    })
  }

  it.each`
    ingredients         | name                                   | expectedResult
    ${[ingredientMock]} | ${'is showed when ingredients length'} | ${true}
    ${[]}               | ${'not shown when !ingredientsLength'} | ${false}
  `('product ingredients button $name', ({ ingredients, expectedResult }) => {
    createComponent({
      product: {
        ...defaultProductMock,
        ingredients,
      },
    })

    const ingredientsButton = wrapper.findComponent(ProductIngredientsButton)

    expect(ingredientsButton.exists()).toBe(expectedResult)
  })

  it.each`
    description      | name           | expectedResult
    ${'description'} | ${'is showed'} | ${true}
    ${''}            | ${'not shown'} | ${false}
  `('description $name', ({ description, expectedResult }) => {
    createComponent({
      product: {
        ...defaultProductMock,
        description,
      },
    })

    const descriptionEl = wrapper.find(DATA_DESCRIPTION)

    expect(descriptionEl.exists()).toBe(expectedResult)
  })

  it('product varieties is showed when option has a variety', () => {
    createComponent({
      product: {
        ...defaultProductMock,
        options: [
          ...defaultProductMock.options,
          {
            ...DEFAULT_PRODUCT_OPTION,
            sizes: [DEFAULT_PRODUCT_SIZE],
          },
        ],
      },
    })

    const varieties = wrapper.find(DATA_VARIETIES)

    expect(varieties.exists()).toBe(true)
  })

  it('product varieties not shown when no one option with variety', () => {
    // options in defaultProductMock do not contain filled variety
    createComponent()

    const varieties = wrapper.find(DATA_VARIETIES)

    expect(varieties.exists()).toBe(false)
  })

  it('product sizes is showed when at least one size contain title', async () => {
    createComponent({
      product: {
        ...defaultProductMock,
        options: [
          {
            ...DEFAULT_PRODUCT_OPTION,
            sizes: [{ ...DEFAULT_PRODUCT_SIZE, size: { title: 'sizeTitle' } }],
          },
          ...defaultProductMock.options,
        ],
      },
    })

    await nextTick()

    const sizes = findComponentByData(AppProductVarious, DATA_SIZES)

    expect(sizes?.exists()).toBe(true)
  })

  it('product sizes not shown', () => {
    createComponent()

    const sizes = findComponentByData(AppProductVarious, DATA_SIZES)

    expect(sizes).toBe(undefined)
  })

  it('addToCart should be called with product', async () => {
    createComponent()

    const cartButton = wrapper.findComponent(AppButton)
    await cartButton.vm.$emit('clickButton')

    expect(mockedActions.addToCart).toHaveBeenCalledWith(
      expect.any(Object),
      DEFAULT_PRODUCT_TO_CART
    )
  })

  it('product ingredients not shown when !isIngredients', async () => {
    createComponent({
      product: {
        ...defaultProductMock,
        ingredients: [ingredientMock],
      },
    })

    const productIngredients = wrapper.findComponent(ProductIngredients)

    expect(productIngredients.exists()).toBe(false)
  })

  it('product ingredients is showed', async () => {
    createComponent({
      product: {
        ...defaultProductMock,
        ingredients: [ingredientMock],
      },
    })

    const ingredientsButton = wrapper.findComponent(ProductIngredientsButton)
    await ingredientsButton.vm.$emit('clickButton')
    const productIngredients = wrapper.findComponent(ProductIngredients)

    expect(productIngredients.exists()).toBe(true)
  })

  it('ingredient should be removed', async () => {
    createComponent({
      product: {
        ...defaultProductMock,
        ingredients: [ingredientMock],
      },
    })

    const ingredientsButton = wrapper.findComponent(ProductIngredientsButton)
    await ingredientsButton.vm.$emit('clickButton')
    const productIngredients = wrapper.findComponent(ProductIngredients)
    await productIngredients.vm.$emit('clickIngredient', ingredientMock)
    const cartButton = wrapper.findComponent(AppButton)
    await cartButton.vm.$emit('clickButton')

    expect(mockedActions.addToCart).toHaveBeenCalledWith(expect.any(Object), {
      ...DEFAULT_PRODUCT_TO_CART,
      ingredients: [{ ...ingredientMock, isRemoved: true, isDefault: true }],
    })
  })

  it('product variety is changed', async () => {
    createComponent({
      product: {
        ...defaultProductMock,
        options: productOptionsMock,
      },
    })

    const varieties = findComponentByData(
      AppProductVarious,
      DATA_VARIOUS_VARIETIES
    )
    const cartButton = wrapper.findComponent(AppButton)
    await varieties.vm.$emit('update:modelValue', productOptionsMock[1])
    await cartButton.vm.$emit('clickButton')

    expect(mockedActions.addToCart).toHaveBeenCalledWith(expect.any(Object), {
      ...DEFAULT_PRODUCT_TO_CART,
      options: [
        { ...productOptionsMock[1], sizes: [productOptionsMock[1].sizes[0]] },
      ],
      variety: productOptionsMock[1],
      size: productOptionsMock[1].sizes[0],
    })
  })

  it('when variety is changed, size reset on first', async () => {
    createComponent({
      product: {
        ...defaultProductMock,
        options: productOptionsMock,
      },
    })

    await nextTick()

    const varieties = findComponentByData(
      AppProductVarious,
      DATA_VARIOUS_VARIETIES
    )
    const sizes = findComponentByData(AppProductVarious, DATA_SIZES)
    await sizes.vm.$emit('update:modelValue', productOptionsMock[0].sizes[1])
    await varieties.vm.$emit('update:modelValue', productOptionsMock[1])
    const cartButton = wrapper.findComponent(AppButton)
    await cartButton.vm.$emit('clickButton')

    expect(mockedActions.addToCart).toHaveBeenCalledWith(expect.any(Object), {
      ...DEFAULT_PRODUCT_TO_CART,
      variety: productOptionsMock[1],
      size: productOptionsMock[1].sizes[0],
      options: [
        {
          ...productOptionsMock[1],
          sizes: [{ ...productOptionsMock[1].sizes[0] }],
        },
      ],
    })
  })
})
