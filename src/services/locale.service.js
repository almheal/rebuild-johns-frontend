import { genericService } from './genericService'

const { get, getAll } = genericService('/locales', {
  get: true,
  getAll: true,
})

export { get, getAll }
