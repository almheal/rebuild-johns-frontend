import { request } from './request'

export const genericService = (url, options) => {
  const crudService = generateCrudService(url)
  const serviceByOptions = generateServiceByOptions(crudService, options)

  return serviceByOptions
}

function generateServiceByOptions(crudService, options) {
  return Object.keys(options).reduce((acc, key) => {
    acc[key] = crudService[key]
    return acc
  }, {})
}

function generateCrudService(url) {
  return {
    async create(body) {
      const response = await request({
        url,
        method: 'post',
        body,
      })
      return response.data
    },

    async get(id) {
      const response = await request({
        url: `${url}/${id}`,
        method: 'get',
      })
      return response.data
    },

    async getAll({ query }) {
      const response = await request({
        url,
        method: 'get',
        params: query,
      })

      return response.data
    },

    async update({ id, body }) {
      const response = await request({
        url: `${url}/${id}`,
        method: 'put',
        body,
      })

      return response.data
    },

    async delete(id) {
      const response = await request({
        url: `${url}/${id}`,
        method: 'delete',
      })

      return response.data
    },
  }
}
