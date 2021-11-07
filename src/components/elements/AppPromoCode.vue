<template>
  <form class="promo-code" @submit.prevent="submitPromoCodeHandler">
    <AppField
      componentName="promoCode"
      :placeholder="$t('app.cart.enterPromoCode')"
      :message="$t(message)"
      :error="$t(errors.promoCodeName)"
      :disabled="isDisabled || promoCodeLoader"
      :modelValue="promoCode.code || promoCodeName"
      @update:modelValue="inputHandler"
    >
      <button
        class="promo-code__button"
        :class="{ 'is-disabled': isDisabled || promoCodeLoader }"
        type="submit"
      >
        <AppCircleLoader
          class="promo-code__loader"
          v-if="promoCodeLoader"
          color="green"
        />
        <CrossIcon
          class="promo-code__cross"
          v-if="isDisabled && !promoCodeLoader"
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
import { promoCodeValidation } from '@utils/validations'
import { failPromoCode } from '@utils/validationMessages'
import { NOTIFICATION_TIMEOUT } from '@const'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'AppPromoCode',
  components: {
    AppField,
    CrossIcon,
    AppCircleLoader,
  },
  data() {
    return {
      promoCodeName: '',
      errors: {
        promoCodeName: '',
      },
      message: '',
    }
  },

  computed: {
    ...mapState({
      promoCode: (state) => state.promoCode.promoCode,
      promoCodeLoader: (state) => state.promoCode.promoCodeLoader,
    }),

    isDisabled() {
      return Boolean(Object.keys(this.promoCode).length)
    },
  },

  methods: {
    ...mapMutations({
      setPromoCodeLoader: 'promoCode/SET_PROMO_CODE_LOADER',
    }),

    ...mapActions({
      fetchPromoCode: 'promoCode/fetchPromoCode',
      resetPromoCode: 'promoCode/resetPromoCode',
    }),

    inputHandler(value) {
      this.promoCodeName = value
      this.errors.promoCodeName = ''
    },

    updatePromoCodeHandler(value) {
      this.promoCodeName = value
      this.errors.promoCodeName = ''
    },

    removePromoCodeHandler() {
      this.promoCodeName = ''
      this.resetPromoCode()
    },

    async submitPromoCodeHandler() {
      if (this.isDisabled) {
        this.removePromoCodeHandler()
        return
      }

      const isValid = this.validatePromoCodeName()

      if (!isValid) {
        return
      }

      this.setPromoCodeLoader(true)
      const isSuccess = await this.fetchPromoCode(this.promoCodeName)
      this.setPromoCodeLoader(false)

      if (!isSuccess) {
        this.errors.promoCodeName = this.$t(failPromoCode)
      } else {
        this.message = 'app.utils.successfullyApplied'
        setTimeout(() => {
          this.message = ''
        }, NOTIFICATION_TIMEOUT)
      }
    },

    validatePromoCodeName() {
      this.errors.promoCodeName = promoCodeValidation(this.promoCodeName)

      return !this.errors.promoCodeName
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
