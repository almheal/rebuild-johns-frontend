<template>
  <OrderSection class="order-contacts" :title="$t('app.order.contacts.title')">
    <div class="order-contacts__list">
      <AppField
        class="order-contacts__input"
        size="large"
        :placeholder="$t('app.order.contacts.enterName')"
        :modelValue="name"
        :label="$t('app.order.contacts.name')"
        @update:modelValue="$emit('update:name', $event)"
      />
      <AppField
        class="order-contacts__input"
        size="large"
        placeholder="example@mail.ru"
        :modelValue="email"
        :label="$t('app.order.contacts.email')"
        @update:modelValue="$emit('update:email', $event)"
      />
      <AppField
        class="order-contacts__input"
        prefix="+7"
        countryFlag="ru"
        size="large"
        typeValue="integer"
        :maxLength="PHONE_LENGTH_WITH_PREFIX"
        :label="$t('app.order.contacts.phone')"
        :required="true"
        :modelValue="phoneNumber"
        @update:modelValue="$emit('update:phoneNumber', $event)"
      />
    </div>
  </OrderSection>
</template>

<script>
import OrderSection from '@components/order/OrderSection'
import AppField from '@elements/AppField'
import { PHONE_LENGTH_WITH_PREFIX } from '@const'

export default {
  name: 'OrderContacts',
  components: {
    OrderSection,
    AppField,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      PHONE_LENGTH_WITH_PREFIX,
    }
  },
}
</script>

<style lang="scss" scoped>
.order-contacts {
  &__list {
    max-width: 402px;
  }

  &__input {
    margin-bottom: 20px;
  }
}
</style>
