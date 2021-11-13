import { shallowMount } from '@vue/test-utils'
import ProductIngredients from '@components/product/ProductIngredients'
import { ingredientsMock } from './__mocks__/ingredients.mock'
import CrossIcon from '@icons/CrossIcon'
import ReloadIcon from '@icons/ReloadIcon'
import AppButton from '@elements/AppButton'

describe('Product ingredients', () => {
  let wrapper

  const DATA_INGREDIENT = '[data-test=ingredient]'
  const DATA_ADD_INGREDIENTS = '[data-test=add-ingredients]'
  const DATA_CANCEL = '[data-test=cancel]'

  const createComponent = (props) =>
    (wrapper = shallowMount(ProductIngredients, { props }))

  const findIngredientByText = (text) =>
    wrapper
      .findAll(DATA_INGREDIENT)
      .find((ingredient) => ingredient.text() === text)

  it('rendered ingredients has length prop ingredients', () => {
    createComponent({ ingredients: ingredientsMock })

    const ingredients = wrapper.findAll(DATA_INGREDIENT)

    expect(ingredients).toHaveLength(ingredientsMock.length)
  })

  it('ingredient have is-removed class', () => {
    createComponent({
      ingredients: [
        ingredientsMock[0],
        { ...ingredientsMock[1], isRemoved: true },
      ],
    })

    const ingredient = findIngredientByText(ingredientsMock[1].title)

    expect(ingredient.classes('is-removed')).toBe(true)
  })

  it('emit clickIngredient event', async () => {
    createComponent({ ingredients: ingredientsMock })

    const ingredient = findIngredientByText(ingredientsMock[1].title)
    await ingredient.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('clickIngredient')
  })

  it('emitted clickIngredient event contain ingredient', async () => {
    createComponent({ ingredients: ingredientsMock })

    const ingredient = findIngredientByText(ingredientsMock[1].title)
    await ingredient.trigger('click')

    expect(wrapper.emitted('clickIngredient')).toEqual(
      expect.arrayContaining([[ingredientsMock[1]]])
    )
  })

  it('cross icon is shown when !isRemoved', () => {
    const ingredients = [
      { ...ingredientsMock[0], isRemoved: false },
      { ...ingredientsMock[1], isRemoved: false },
    ]

    createComponent({
      ingredients,
    })

    const crossIcons = wrapper.findAllComponents(CrossIcon)

    expect(crossIcons).toHaveLength(ingredients.length)
  })

  it('cross icon is hidden when isRemoved', () => {
    const ingredients = [
      { ...ingredientsMock[0], isRemoved: true },
      { ...ingredientsMock[1], isRemoved: false },
    ]

    createComponent({
      ingredients,
    })

    const crossIcons = wrapper.findAllComponents(CrossIcon)

    expect(crossIcons).toHaveLength(ingredients.length - 1)
  })

  it('reload icon is show when isRemoved', () => {
    const ingredients = [
      { ...ingredientsMock[0], isRemoved: true },
      { ...ingredientsMock[1], isRemoved: false },
    ]

    createComponent({
      ingredients,
    })

    const reloadIcons = wrapper.findAllComponents(ReloadIcon)

    expect(reloadIcons).toHaveLength(ingredients.length - 1)
  })

  it('reload icon is hidden when !isRemoved', () => {
    const ingredients = [
      { ...ingredientsMock[0], isRemoved: false },
      { ...ingredientsMock[1], isRemoved: false },
    ]

    createComponent({
      ingredients,
    })

    const reloadIcons = wrapper.findAllComponents(ReloadIcon)

    expect(reloadIcons).toHaveLength(0)
  })

  it('button add ingredients emit addIngredients event', async () => {
    createComponent()

    const addIngredientsButton = wrapper.find(DATA_ADD_INGREDIENTS)
    await addIngredientsButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('addIngredients')
  })

  it('button cancel emit cancel event', async () => {
    createComponent()

    const cancelButton = wrapper.find(DATA_CANCEL)
    await cancelButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('cancel')
  })

  it('app-button emit addToCart event', async () => {
    createComponent()

    const button = wrapper.findComponent(AppButton)
    await button.vm.$emit('clickButton')

    expect(wrapper.emitted()).toHaveProperty('addToCart')
  })
})
