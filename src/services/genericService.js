import { request } from './request'

export const genericService = (url, options) => {
  return generateCrudService(url, options)
}

function generateCrudService(url, options) {
  const service = {}

  if (options.create) {
    service.create = async (body = {}) => {
      const response = await request({
        url,
        method: 'post',
        body,
      })
      return response.data
    }
  }

  if (options.get) {
    service.get = async ({ id = '', params } = {}) => {
      const response = await request({
        url: `${url}/${id}`,
        method: 'get',
        params,
      })
      return response.data
    }
  }

  if (options.getAll) {
    service.getAll = async ({ params }) => {
      const response = await request({
        url,
        method: 'get',
        params,
      })

      return response.data
    }
  }

  if (options.update) {
    service.update = async ({ id, body }) => {
      const response = await request({
        url: `${url}/${id}`,
        method: 'put',
        body,
      })

      return response.data
    }
  }

  if (options.delete) {
    service.delete = async (id) => {
      const response = await request({
        url: `${url}/${id}`,
        method: 'delete',
      })

      return response.data
    }
  }

  return service
}
