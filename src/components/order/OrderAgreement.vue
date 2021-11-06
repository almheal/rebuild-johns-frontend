<template>
  <OrderSection class="order-agreement">
    <div class="order-agreement__row">
      <div class="order-agreement__text">
        {{ $t('app.order.agreement.agreeToSend') }}
      </div>
      <div class="row-center">
        <AppCheckbox
          class="order-agreement__checkbox"
          :label="$t('app.order.agreement.sms')"
          :modelValue="sms"
          @update:modelValue="$emit('update:sms', $event)"
        />
        <AppCheckbox
          class="order-agreement__checkbox"
          :label="$t('app.order.agreement.emailNewsletter')"
          :modelValue="emailNewsletters"
          @update:modelValue="$emit('update:emailNewsletters', $event)"
        />
      </div>
    </div>
    <div class="order-agreement__text">
      {{ $t('app.order.agreement.description') }}
    </div>
  </OrderSection>
</template>

<script>
import OrderSection from '@components/order/OrderSection'
import AppCheckbox from '@elements/AppCheckbox'

export default {
  name: 'OrderAgreement',
  components: {
    OrderSection,
    AppCheckbox,
  },
  props: {
    sms: {
      type: Boolean,
      default: false,
    },
    emailNewsletters: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.order-agreement {
  &__checkbox {
    margin-left: 15px;
    @media (max-width: 576px) {
      margin: 15px 0 0 0;

      &:first-child {
        margin-right: 15px;
      }
    }
  }

  &__row {
    @include flex-align-center;
    margin-bottom: 15px;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }
}
</style>
