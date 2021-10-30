<template>
  <AppForm
    class="registration-form"
    :buttonText="$t('app.registration.proceed')"
    @submitForm="registrationHandler"
  >
    <template v-if="!isNext">
      <AppField
        class="registration-form__input"
        :label="$t('app.registration.name')"
      />
      <AppField
        class="registration-form__input"
        :label="$t('app.registration.phoneNumber')"
      />
      <AppField
        class="registration-form__input"
        :label="$t('app.registration.email')"
      />
    </template>
    <template v-else>
      <AppField
        class="registration-form__input"
        :label="$t('app.registration.password')"
      />
      <AppField
        class="registration-form__input"
        :label="$t('app.registration.repeatPassword')"
      />
    </template>

    <template #formTop>
      <slot></slot>
    </template>

    <template #actions v-if="isNext">
      <button class="registration-form__button" @click="setIsNext(false)">
        {{ $t('app.registration.back') }}
      </button>
    </template>
  </AppForm>
</template>

<script>
import AppForm from '@elements/AppForm'
import AppField from '@elements/AppField'

export default {
  name: 'RegistrationForm',
  components: {
    AppForm,
    AppField,
  },
  data: () => ({
    isNext: false,
  }),
  methods: {
    registrationHandler() {
      if (!this.isNext) {
        this.setIsNext(true)
        return
      }
    },
    setIsNext(value) {
      this.isNext = value
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
