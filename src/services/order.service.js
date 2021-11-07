import { genericService } from './genericService'

const { create } = genericService('/orders', { create: true })

export { create }
