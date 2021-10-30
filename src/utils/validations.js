import {
  minLength,
  required,
  wrongPhoneNumberLength,
} from '@utils/validationMessages'
import {
  PHONE_LENGTH_WITH_PREFIX,
  PHONE_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from '@const'

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
