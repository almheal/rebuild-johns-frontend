import { genericService } from './genericService'

const { getAll, get } = genericService('/products', { getAll: true, get: true })

export { getAll, get }
