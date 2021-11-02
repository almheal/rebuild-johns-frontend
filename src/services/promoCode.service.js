import { genericService } from './genericService'

const { get } = genericService('/promo-codes', {
  get: true,
})

export { get }
