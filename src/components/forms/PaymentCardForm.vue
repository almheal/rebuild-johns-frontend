<template>
  <form class="payment-form" @submit.prevent="$emit('submitForm')">
    <div
      class="payment-form__button"
      :class="{ 'is-active': isForm }"
      @click="$emit('toggleForm')"
    >
      <AppPlusButton class="payment-form__plus" backgroundColor="grey" />
      {{ $t('app.cardAndPayment.addCard') }}
    </div>
    <div class="payment-form__body" v-if="isForm">
      <div class="row">
        <AppField
          class="payment-form__input"
          typeValue="integer"
          :maxLength="CARD_NUMBER_LENGTH"
          :placeholder="$t('app.cardAndPayment.cardNumber')"
          :error="
            errors.cardNumber?.params
              ? $t(errors.cardNumber.message, errors.cardNumber.params)
              : $t(errors.cardNumber) || ''
          "
          :modelValue="cardNumber"
          @update:modelValue="$emit('update:cardNumber', $event)"
        />
        <AppField
          class="payment-form__input"
          :maxLength="MY_LENGTH"
          :placeholder="$t('app.cardAndPayment.monthYear')"
          :error="
            errors.MY?.params
              ? $t(errors.MY.message, errors.MY.params)
              : $t(errors.MY) || ''
          "
          :modelValue="MY"
          @update:modelValue="$emit('update:MY', $event)"
        />
      </div>
      <div class="row">
        <AppField
          class="payment-form__input"
          :placeholder="$t('app.cardAndPayment.nameHolder')"
          :error="
            errors.holderName?.params
              ? $t(errors.holderName.message, errors.holderName.params)
              : $t(errors.holderName) || ''
          "
          :modelValue="holderName"
          @update:modelValue="$emit('update:holderName', $event)"
        />
        <AppField
          class="payment-form__input"
          typeValue="integer"
          :maxLength="CVV_LENGTH"
          :placeholder="$t('app.cardAndPayment.cvv')"
          :error="
            errors.cvv?.params
              ? $t(errors.cvv.message, errors.cvv.params)
              : $t(errors.cvv) || ''
          "
          :modelValue="cvv"
          @update:modelValue="$emit('update:cvv', $event)"
        />
      </div>
    </div>
    <slot></slot>
  </form>
</template>

<script>
import AppPlusButton from '@elements/AppPlusButton'
import AppField from '@elements/AppField'
import { CARD_NUMBER_LENGTH, CVV_LENGTH, MY_LENGTH } from '@const'

export default {
  name: 'PaymentCardForm',
  components: {
    AppPlusButton,
    AppField,
  },
  emits: ['submitForm'],
  props: {
    isForm: {
      type: Boolean,
      default: false,
    },
    cardNumber: {
      type: String,
      default: '',
    },
    MY: {
      type: String,
      default: '',
    },
    holderName: {
      type: String,
      default: '',
    },
    cvv: {
      type: String,
      default: '',
    },
    errors: {
      type: Object,
      default: () => ({
        cardNumber: '',
        MY: '',
        holderName: '',
        cvv: '',
      }),
    },
  },

  data() {
    return {
      CARD_NUMBER_LENGTH,
      CVV_LENGTH,
      MY_LENGTH,
    }
  },
}
</script>

<style lang="scss" scoped>
.payment-form {
  &__button {
    @include flex-center;
    flex-direction: column;
    background-color: $smoky-white;
    width: 118px;
    min-height: 74px;
    border-radius: 3px;
    padding: 8px;
    font-size: 12px;
    text-align: center;
    color: $brown-color;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $pale-green-color;
    }

    &.is-active {
      background-color: $pale-green-color;
    }
  }

  &__plus {
    margin-bottom: 5px;
  }

  &__input {
    width: 100%;
    max-width: 154px;

    &:first-child {
      max-width: 308px;
      margin-right: 15px;
    }
  }
}
</style>
