export default {
  getIngredientCategories: ({ ingredients }) => {
    const categoryTitles = []

    ingredients.forEach(
      (ingredient) =>
        !categoryTitles.includes(ingredient.category) &&
        categoryTitles.push(ingredient.category)
    )

    return categoryTitles
  },
}
