import axios from '@/plugins/axios'

export const request = async ({ url, method, body = {}, params = {} }) => {
  return axios[method](url, { data: body, params })
}
