import axios from '@/plugins/axios'

export const request = async ({ url, method, body = {}, params = {} }) => {
  return axios[method](url + generateQueryParams(params), body)
}

const generateQueryParams = (params) => {
  return Object.entries(params).reduce((acc, [key, value], index) => {
    acc += !index ? `?${key}=${[value]}` : `&${key}=${value}`
    return acc
  }, '')
}
