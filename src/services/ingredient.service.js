import { genericService } from './genericService'

const { getAll } = genericService('/ingredients', { getAll: true })

export { getAll }
