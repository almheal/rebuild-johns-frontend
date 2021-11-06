import {
  minLength,
  required,
  wrongPhoneNumberLength,
  passwordMismatch,
  incorrentEmail,
  incorrentName,
  invalidCardNumberLength,
  invalidMYLength,
  incorrrentMY,
  invalidCVVLength,
} from '@utils/validationMessages'
import {
  PHONE_LENGTH_WITH_PREFIX,
  PHONE_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  CARD_NUMBER_LENGTH,
  CVV_LENGTH,
  MY_LENGTH,
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

export const addressValidation = (address) => {
  return address ? '' : required
}

export const cardNumberValidation = (cardNumber) => {
  if (!cardNumber) {
    return required
  }

  if (cardNumber.length !== CARD_NUMBER_LENGTH) {
    return invalidCardNumberLength(CARD_NUMBER_LENGTH)
  }

  if (!cardNumber) {
    return required
  }

  return ''
}

export const cardMYValidation = (MY) => {
  if (!MY) {
    return required
  }

  if (MY.length !== MY_LENGTH) {
    return invalidMYLength(MY_LENGTH)
  }

  const split = MY.split('/')
  const invalidLength =
    split.length !== 2 || split[0].length !== 2 || split[1].length !== 2
  const invalidInteger =
    !Number.isInteger(Number(split[0])) || !Number.isInteger(Number(split[1]))

  if (invalidLength || invalidInteger) {
    return incorrrentMY
  }

  return ''
}

export const CVVValidation = (cvv) => {
  if (!cvv) {
    return required
  }

  if (cvv.length !== CVV_LENGTH) {
    return invalidCVVLength(CVV_LENGTH)
  }

  return ''
}

export const holderNameValidation = (holderName) => {
  return holderName ? '' : required
}
