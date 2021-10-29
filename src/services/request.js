import axios from '@/plugins/axios'

export const request = async ({ url, method, body = {} }) => {
  return axios[method](url, body)
}
