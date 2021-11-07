export const requiredMessage = 'app.utils.requiredField'
export const incorrentEmail = 'app.utils.incorrentEmail'
export const wrongPhoneNumberLength = 'app.utils.wrongPhoneNumberLength'
export const minLength = (min) => ({
  message: 'app.utils.minLength',
  params: { param: min },
})
export const required = 'app.utils.requiredField'
export const passwordMismatch = 'app.utils.passwordMismatch'
export const incorrentName = 'app.utils.incorrentName'
export const failPromoCode = 'app.utils.failedToApply'
export const invalidCardNumberLength = (length) => ({
  message: 'app.utils.cardNumberLength',
  params: { length },
})
export const invalidMYLength = (length) => ({
  message: 'app.utils.MYLength',
  params: { length },
})
export const incorrrentMY = 'app.utils.incorrrentMY'
export const invalidCVVLength = (length) => ({
  message: 'app.utils.cvvLength',
  params: { length },
})
