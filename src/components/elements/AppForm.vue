<template>
  <form class="form" data-test="form" @submit.prevent="$emit('submitForm')">
    <slot name="formTop"></slot>
    <div class="form__body" data-test="body">
      <slot></slot>
      <div class="form__actions" data-test="actions">
        <slot name="actions"></slot>
        <AppButton
          class="form__button"
          v-if="buttonText"
          buttonType="submit"
          :loading="loading"
          >{{ buttonText }}</AppButton
        >
      </div>
    </div>
  </form>
</template>

<script>
import AppButton from '@elements/AppButton'

export default {
  name: 'AppForm',
  emits: ['submitForm'],
  components: {
    AppButton,
  },
  props: {
    buttonText: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  background-color: $white-color;
  box-shadow: 0 2px 12px 0 rgba(41, 44, 51, 0.2);
  border-radius: 10px;

  &__body {
    padding: 40px 24px 24px;
  }

  &__actions {
    @include flex-align-center;
    margin-top: 20px;
  }

  &__button {
    margin-left: auto;
  }
}
</style>
