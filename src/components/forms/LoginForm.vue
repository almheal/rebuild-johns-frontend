<template>
  <AppForm class="login-form" :buttonText="$t('app.login.login')">
    <AppField class="login-form__input" :label="$t('app.login.phoneNumber')" />
    <AppField
      class="login-form__input"
      :label="$t('app.login.password')"
      typeInput="password"
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

export default {
  name: 'LoginForm',
  emits: ['toRegistration'],
  components: {
    AppForm,
    AppField,
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
