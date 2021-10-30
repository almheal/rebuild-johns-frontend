<template>
  <AppForm
    class="login-form"
    :buttonText="$t('app.login.login')"
    :loading="loginLoader"
    @submitForm="loginHandler"
  >
    <AppField
      class="login-form__input"
      :label="$t('app.login.phoneNumber')"
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
      class="login-form__input"
      :label="$t('app.login.password')"
      :error="
        errors.password?.params
          ? $t(errors.password.message, errors.password.params)
          : $t(errors.password) || ''
      "
      typeInput="password"
      v-model="user.password"
      @update:modelValue="errors.password = ''"
    />
    <button class="login-form__button">
      {{ $t('app.login.restorePassword') }}
    </button>

    <template #formTop>
      <slot></slot>
    </template>

    <template #actions>
      <button
        class="login-form__button"
        type="button"
        @click="$emit('toRegistration')"
      >
        {{ $t('app.login.registration') }}
      </button>
    </template>
  </AppForm>
</template>

<script>
import AppForm from '@elements/AppForm'
import AppField from '@elements/AppField'
import { phoneValidation, passwordValidation } from '@/utils/validations'
import { resetObjProperties } from '@utils'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'LoginForm',
  emits: ['toRegistration'],
  components: {
    AppForm,
    AppField,
  },
  data() {
    return {
      user: {
        phoneNumber: '',
        password: '',
      },
      errors: {
        phoneNumber: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapState({
      loginLoader: (state) => state.user.loginLoader,
    }),
  },
  methods: {
    ...mapActions({
      login: 'user/login',
    }),
    ...mapMutations({
      setLoginLoader: 'user/SET_LOGIN_LOADER',
    }),
    async loginHandler() {
      const isInvalid = this.validate()

      if (isInvalid) {
        return
      }

      this.setLoginLoader(true)
      const isSuccess = await this.login(this.user)
      this.setLoginLoader(false)

      if (isSuccess) {
        this.user = resetObjProperties(this.user)
        this.$emit('isSubmited')
      }
    },
    validate() {
      this.errors.phoneNumber = phoneValidation(this.user.phoneNumber)
      this.errors.password = passwordValidation(this.user.password)

      return this.errors.phoneNumber || this.errors.password
    },
  },
}
</script>

<style lang="scss" scoped>
.login-form {
  &__input {
    &:first-child {
      margin-bottom: 20px;
    }

    &:nth-child(2) {
      margin-bottom: 8px;
    }
  }

  &__button {
    color: $green-color;

    @include color-hover($dark-green-color);
  }
}
</style>
