export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

export const setLocalStorage = ({ key, data }) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const resetObjProperties = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key].__proto__ === Object.prototype) {
      acc[key] = resetObjProperties(obj[key])
    } else if (Array.isArray(obj[key])) {
      acc[key] = []
    } else {
      acc[key] = ''
    }

    return acc
  }, {})
}

export const initialIngredients = (ingredients) => {
  return ingredients.map((ingredient) => {
    return {
      ...ingredient,
      isRemoved: false,
      isDefault: true,
    }
  })
}

export const wordWithRightEnding = (number, texts) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return texts[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}

export const calculateDiscount = ({ total, discount, isPercent }) => {
  return isPercent
    ? (total * discount) / 100
    : discount > total
    ? 0
    : total - discount
}

export const eventClickDocument = (callback) => {
  let isRemove = null

  const removeEvent = () => {
    isRemove = isRemove !== null

    if (isRemove) {
      document.removeEventListener('click', removeEvent)
    }

    callback()
  }

  document.addEventListener('click', removeEvent)
}

export const moveToElement = ($el, callback = () => {}, timeout) => {
  const { top } = $el.getBoundingClientRect()

  setTimeout(() => {
    window.scrollTo(0, window.scrollY + Number(top) - 80)
    callback()
  }, timeout)
}

export const generateUrlImageVariousSize = ({ defaultUrl, sizes }) => {
  const split = defaultUrl.split('/upload')

  const urls = sizes.reduce((acc, size) => {
    const url = `${split[0]}/upload/w_${size.value},c_scale${split[1]}`
    acc[size.media] = url
    return acc
  }, {})

  return urls
}
