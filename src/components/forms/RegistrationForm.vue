<template>
  <AppForm
    class="registration-form"
    :buttonText="$t('app.registration.proceed')"
    :loading="checkAlreadyLoader || registerLoader"
    @submitForm="registrationHandler"
  >
    <template v-if="!isNext">
      <AppField
        class="registration-form__input"
        :label="$t('app.registration.name')"
        :error="
          errors.name?.params
            ? $t(errors.name.message, errors.name.params)
            : $t(errors.name) || ''
        "
        v-model="user.name"
        @update:modelValue="errors.name = ''"
      />
      <AppField
        class="registration-form__input"
        :label="$t('app.registration.phoneNumber')"
        :error="
          errors.phoneNumber?.params
            ? $t(errors.phoneNumber.message, errors.phoneNumber.params)
            : $t(errors.phoneNumber) || ''
        "
        maxLength="12"
        prefix="+7"
        countryFlag="ru"
        typeValue="integer"
        v-model="user.phoneNumber"
        @update:modelValue="errors.phoneNumber = ''"
      />
      <AppField
        class="registration-form__input"
        :label="$t('app.registration.email')"
        :error="
          errors.email?.params
            ? $t(errors.email.message, errors.email.params)
            : $t(errors.email) || ''
        "
        v-model="user.email"
        @update:modelValue="errors.email = ''"
      />
    </template>
    <template v-else>
      <AppField
        class="registration-form__input"
        icon="eye"
        typeInput="password"
        :label="$t('app.registration.password')"
        :error="
          errors.password?.params
            ? $t(errors.password.message, errors.password.params)
            : $t(errors.password) || ''
        "
        v-model="user.password"
        @update:modelValue="errors.password = ''"
      />
      <AppField
        class="registration-form__input"
        icon="eye"
        typeInput="password"
        :label="$t('app.registration.repeatPassword')"
        :error="
          errors.confirmPassword?.params
            ? $t(errors.confirmPassword.message, errors.confirmPassword.params)
            : $t(errors.confirmPassword) || ''
        "
        v-model="confirmPassword"
        @update:modelValue="errors.confirmPassword = ''"
      />
    </template>

    <template #formTop>
      <slot></slot>
    </template>

    <template #actions v-if="isNext">
      <button
        class="registration-form__button"
        @click="setIsNext(false)"
        type="button"
      >
        {{ $t('app.registration.back') }}
      </button>
    </template>
  </AppForm>
</template>

<script>
import AppForm from '@elements/AppForm'
import AppField from '@elements/AppField'
import {
  nameValidation,
  phoneValidation,
  emailValidation,
  passwordValidation,
  passwordsIsMatchValidation,
} from '@utils/validations'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'RegistrationForm',
  components: {
    AppForm,
    AppField,
  },
  emits: ['isSubmited'],
  data: () => ({
    user: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    errors: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    confirmPassword: '',
    isNext: false,
  }),
  computed: {
    ...mapState({
      checkAlreadyLoader: (state) => state.user.checkAlreadyLoader,
      registerLoader: (state) => state.user.registerLoader,
    }),
  },
  methods: {
    ...mapActions({
      checkAlreadyUser: 'user/checkAlreadyUser',
      register: 'user/register',
    }),
    ...mapMutations({
      setCheckAlreadyLoader: 'user/SET_CHECK_ALREADY_LOADER',
      setRegisterLoader: 'user/SET_REGISTER_LOADER',
    }),
    async registrationHandler() {
      console.log('gg')
      const isInvalid = this.validate()

      if (isInvalid) {
        return
      }

      if (!this.isNext) {
        const { phoneNumber, email } = this.user

        this.setCheckAlreadyLoader(true)
        const isAlready = await this.checkAlreadyUser({ phoneNumber, email })
        this.setCheckAlreadyLoader(false)

        if (!isAlready) {
          this.setIsNext(true)
        }

        return
      }

      this.setRegisterLoader(true)
      const isSuccess = await this.register(this.user)
      this.setRegisterLoader(false)

      if (isSuccess) {
        this.$emit('isSubmited')
      }
    },

    setIsNext(value) {
      this.isNext = value
    },

    validate() {
      if (!this.isNext) {
        this.errors.name = nameValidation(this.user.name)
        this.errors.phoneNumber = phoneValidation(this.user.phoneNumber)
        this.errors.email = emailValidation(this.user.email)
        return this.errors.name || this.errors.phoneNumber || this.errors.email
      }

      this.errors.password = passwordValidation(this.user.password)
      this.errors.confirmPassword = passwordValidation(this.confirmPassword)
      this.errors.confirmPassword =
        this.errors.confirmPassword ||
        passwordsIsMatchValidation(this.user.password, this.confirmPassword)

      return this.errors.password || this.errors.confirmPassword
    },
  },
}
</script>

<style lang="scss" scoped>
.registration-form {
  &__input {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__button {
    color: $green-color;

    @include color-hover($dark-green-color);
  }
}
</style>
