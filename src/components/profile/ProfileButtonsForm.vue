<template>
  <div class="buttons">
    <button class="buttons__cancel" @click="$emit('cancel')">
      {{ $t('app.utils.cancel') }}
    </button>
    <AppButton @clickButton="$emit('save')" :loading="loading">{{
      $t('app.utils.save')
    }}</AppButton>
  </div>
</template>

<script>
import AppButton from '@elements/AppButton'

export default {
  name: 'ProfileButtonsForm',
  components: {
    AppButton,
  },
  emits: ['cancel', 'save'],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons {
  @include flex-justify-align(flex-end, center);

  &__cancel {
    margin-right: 20px;
    color: $green-color;
    transition: color 0.3s;

    &:hover {
      color: $dark-green-color;
    }
  }
}
</style>
