import { genericService } from './genericService'

const { create } = genericService('/images', { create: true })

export { create }
