export const constructorStepNames = {
  INGREDIENTS: 'ingredients',
  PIZZA_BASE: 'pizzaBase',
  CONTENT: 'content',
}

export const constructorSteps = {
  [constructorStepNames.PIZZA_BASE]: {
    backText: 'app.utils.toMain',
    buttonText: 'app.utils.selectIngredients',
  },
  [constructorStepNames.INGREDIENTS]: {
    backText: 'app.utils.pizzaBase',
    buttonText: 'app.utils.proceed',
  },
  [constructorStepNames.CONTENT]: {
    backText: 'app.ingredients.title',
    buttonText: 'app.utils.addToCart',
  },
}
