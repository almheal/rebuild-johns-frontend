import { genericService } from './genericService'

const { getAll } = genericService('/categories', { getAll: true })

export { getAll }
