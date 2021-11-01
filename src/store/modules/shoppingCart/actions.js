import * as types from './mutations-types'
import { getLocalStorage, setLocalStorage } from '@utils'
import { CART_NAME } from '@const'

const initCart = ({ commit }) => {
  const cartLocalStorage = getLocalStorage(CART_NAME)
  commit(types.SET_ITEMS_CART, cartLocalStorage || [])
}

const addToCart = ({ commit, getters }, newProduct) => {
  const products = getters.getItems
  const stringNewProduct = JSON.stringify(newProduct)

  const isSameProduct = products.reduce((acc, product) => {
    // eslint-disable-next-line
    const { id, count, ...result } = product
    if (JSON.stringify(result) === stringNewProduct) {
      product.count = Number(product.count) + 1
      acc = true
    }
    return acc
  }, false)

  if (!isSameProduct) {
    const copyNewProduct = JSON.parse(stringNewProduct)
    copyNewProduct.id = Math.floor(Math.random() * Date.now())
    copyNewProduct.count = 1
    commit(types.SET_ITEM_CART, copyNewProduct)
  }

  setLocalStorage({ key: CART_NAME, data: getters.getItems })
}

const clearCart = ({ commit }) => {
  commit(types.SET_ITEMS_CART, [])
  setLocalStorage({ key: CART_NAME, data: [] })
}

const removeFromCart = ({ commit, getters }, id) => {
  const products = getters.getItems
  const filteredCart = products.filter((product) => product.id !== id)

  commit(types.SET_ITEMS_CART, filteredCart)
  setLocalStorage({ key: CART_NAME, data: filteredCart })
}

const calculateCount = ({ commit, getters }, { id, operation }) => {
  const products = getters.getItems
  const updatedProducts = products.filter((product) => {
    if (product.id !== id) {
      return product
    }

    if (operation === '+') {
      product.count = Number(product.count) + 1
    } else {
      product.count = product.count - 1
    }

    if (product.count) {
      return product
    }
  })

  commit(types.SET_ITEMS_CART, updatedProducts)
  setLocalStorage({ key: CART_NAME, data: updatedProducts })
}

export default {
  initCart,
  addToCart,
  clearCart,
  removeFromCart,
  calculateCount,
}
