import { genericService } from './genericService'

const { create: login } = genericService('auth/login', { create: true })
const { create: register } = genericService('auth/register', { create: true })
const { create: checkAlreadyUser } = genericService('auth/check', {
  create: true,
})
const { get: auth, update } = genericService('/users', {
  get: true,
  update: true,
})

export { login, register, checkAlreadyUser, auth, update }
