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
