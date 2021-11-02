import {
  minLength,
  required,
  wrongPhoneNumberLength,
  passwordMismatch,
  incorrentEmail,
  incorrentName,
} from '@utils/validationMessages'
import {
  PHONE_LENGTH_WITH_PREFIX,
  PHONE_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from '@const'

const emailRegExp = new RegExp(
  /*eslint-disable-next-line */
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
)

const nameRegExp = new RegExp('^[a-zA-Z][a-zA-Z0-9]*$')

export const phoneValidation = (phone, isPrefix = true) => {
  if (phone.length < (isPrefix ? PHONE_LENGTH_WITH_PREFIX : PHONE_LENGTH)) {
    return minLength(isPrefix ? PHONE_LENGTH_WITH_PREFIX : PHONE_LENGTH)
  }

  if (phone.length > (isPrefix ? PHONE_LENGTH_WITH_PREFIX : PHONE_LENGTH)) {
    return wrongPhoneNumberLength
  }

  return ''
}

export const passwordValidation = (password) => {
  if (!password) {
    return required
  }

  if (password.length < MINIMUM_PASSWORD_LENGTH) {
    return minLength(MINIMUM_PASSWORD_LENGTH)
  }

  return ''
}

export const passwordsIsMatchValidation = (firstPassword, secondPassword) => {
  return firstPassword === secondPassword ? '' : passwordMismatch
}

export const nameValidation = (name) => {
  if (!name) {
    return required
  }

  if (!nameRegExp.test(name)) {
    return incorrentName
  }

  return ''
}

export const emailValidation = (email) => {
  return !emailRegExp.test(email) ? incorrentEmail : ''
}

export const promoCodeValidation = (promoCode) => {
  if (!promoCode) {
    return required
  }

  return ''
}
