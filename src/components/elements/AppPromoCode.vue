<template>
  <form class="promo-code" @submit.prevent="promoCodeHandler">
    <AppField
      componentName="promoCode"
      :placeholder="$t('app.cart.enterPromoCode')"
      :message="message"
      :error="error"
      :disabled="disabled || loading"
      :modelValue="promoCode"
      @update:modelValue="$emit('update:promoCode', $event)"
    >
      <button
        class="promo-code__button"
        :class="{ 'is-disabled': disabled || loading }"
        type="submit"
      >
        <AppCircleLoader
          class="promo-code__loader"
          v-if="loading"
          color="green"
        />
        <CrossIcon
          class="promo-code__cross"
          v-if="disabled && !loading"
          width="14"
          height="14"
        />
      </button>
    </AppField>
  </form>
</template>

<script>
import AppField from '@elements/AppField'
import CrossIcon from '@icons/CrossIcon'
import AppCircleLoader from '@elements/AppCircleLoader'

export default {
  name: 'AppPromoCode',
  components: {
    AppField,
    CrossIcon,
    AppCircleLoader,
  },
  emits: ['submitPromoCode', 'update:promoCode'],
  props: {
    promoCode: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    promoCodeHandler() {
      if (!this.disabled) {
        this.$emit('submitPromoCode')
        return
      }

      this.$emit('removePromoCode')
    },
  },
}
</script>

<style lang="scss" scoped>
.promo-code {
  position: relative;
  background-color: $white-color;
  padding: 16px 24px;
  border-radius: 10px;

  &__button {
    position: relative;
    @include flex-center;
    @include absolute-top-center-right(4px);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: $light-grey-color;
    color: $white-color;
    transition: background-color 0.3s;

    &.is-disabled {
      &::before {
        display: none;
      }
    }

    &:hover {
      background-color: $green-color;
    }

    &::before {
      @include absolute-center;
      content: '';
      display: block;
      margin-top: -4px;
      margin-left: -5px;
      border: solid;
      border-width: 0 2px 2px 0;
      padding: 3px;
      transform: rotate(-45deg);
    }
  }

  &__cross {
    @include absolute-center;

    &:hover {
      &::before,
      &::after {
        background-color: $pale-grey-color;
      }
    }

    &::before,
    &::after {
      background-color: $pale-grey-color;
    }
  }

  &__loader {
    @include absolute-center;
    z-index: 5;
  }
}
</style>
