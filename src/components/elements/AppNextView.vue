<template>
  <div class="next-view">
    <CartIcon class="next-view__icon" />
    <div class="next-view__title" v-if="title">{{ title }}</div>
    <div class="next-view__body">
      <AppButton
        class="next-view__button"
        view="transparent"
        textTransform="uppercase"
        font="gotham"
        @clickButton="$router.push('/')"
        >{{ $t('app.utils.toMenu') }}</AppButton
      >
      <AppButton
        class="next-view__button"
        v-if="isCheckoutButton"
        textTransform="uppercase"
        font="gotham"
        @clickButton="$router.push('/order')"
        >{{ $t('app.utils.checkout') }}</AppButton
      >
    </div>
  </div>
</template>

<script>
import CartIcon from '@icons/CartIcon'
import AppButton from '@elements/AppButton'

export default {
  name: 'AppNextView',
  components: {
    CartIcon,
    AppButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    isCheckoutButton: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.next-view {
  background-color: $white-color;
  padding: 56px 32px;
  text-align: center;
  border-radius: 10px;
  margin: 25px 0;

  &__icon {
    color: $dark-red-color;
    margin-bottom: 16px;
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 24px;
    color: $brown-color;
    margin-bottom: 32px;

    @media (max-width: 380px) {
      font-size: 20px;
    }
  }

  &__body {
    @include flex-justify(center);
    max-width: 650px;
    margin: 0 auto;

    @media (max-width: 380px) {
      flex-direction: column;
    }
  }

  &__button {
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }

    @media (max-width: 380px) {
      margin: 0 0 16px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
