<template>
  <div class="order">
    <div class="container">
      <div class="order__inner">
        <OrderCart
          :cartItems="getItems"
          :count="getItemsCount"
          :total="getTotal"
        />
        <OrderContacts
          v-model:name="order.name"
          v-model:email="order.email"
          v-model:phoneNumber="order.phoneNumber"
        />
        <div class="order__method">
          <OrderDeliveryMethod
            :activeMethod="order.paymentMethod"
            @changeMethod="order.paymentMethod = $event"
          />
          <div
            class="order__info"
            v-if="order.paymentMethod === DELIVERY_METHODS.PICKUP"
          >
            {{ $t('app.order.delivery.pickupDescription') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderCart from '@components/order/OrderCart'
import OrderContacts from '@components/order/OrderContacts'
import OrderDeliveryMethod from '@components/order/OrderDeliveryMethod'
import { DELIVERY_METHODS } from '@const'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Order',
  components: {
    OrderCart,
    OrderContacts,
    OrderDeliveryMethod,
  },
  data() {
    return {
      order: {
        name: '',
        email: '',
        phoneNumber: '',
        paymentMethod: DELIVERY_METHODS.DELIVERY,
      },
      DELIVERY_METHODS,
    }
  },
  computed: {
    ...mapGetters({
      getItems: 'shoppingCart/getItems',
      getItemsCount: 'shoppingCart/getItemsCount',
      getTotal: 'shoppingCart/getTotal',
    }),
  },
  methods: {
    ...mapActions({
      initCart: 'shoppingCart/initCart',
    }),
  },
  mounted() {
    this.initCart()
  },
}
</script>

<style lang="scss" scoped>
.order {
  @media (max-width: 424px) {
    .container {
      padding: 0;
    }
  }

  &__inner {
    padding: 20px 0 50px;
  }

  &__method {
    @include flex-align-center;

    .order__info {
      margin-left: 30px;
    }

    @media (max-width: 769px) {
      flex-direction: column;
      align-items: initial;

      .order__info {
        margin-left: 0;
      }
    }
  }

  &__info {
    padding: 20px 40px;
    max-width: 582px;
    color: $brown-color;
    background-color: rgba($light-orange-color, 0.5);
    border-radius: 12px;
  }
}
</style>
