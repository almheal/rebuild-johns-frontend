export default {
  getPizzaCategory: ({ categories }) => {
    return categories.find((category) => category.title.includes('pizza'))
  },
}
