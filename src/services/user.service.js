import { genericService } from './genericService'

const { create: login } = genericService('auth/login', { create: true })
const { create: register } = genericService('auth/register', { create: true })
const { create: checkAlreadyUser } = genericService('auth/check', {
  create: true,
})
const { get: auth } = genericService('/users', { get: true })

export { login, register, checkAlreadyUser, auth }
