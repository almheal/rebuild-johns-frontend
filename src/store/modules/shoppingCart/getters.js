export default {
  getItemsCount: (state) => {
    return state.items.reduce((acc, item) => {
      acc += item.count
      return acc
    }, 0)
  },
  getItems: (state) => state.items,
  getTotal: (state) => {
    return state.items.reduce((acc, item) => {
      acc += item.count * item.size.price
      return acc
    }, 0)
  },
}
