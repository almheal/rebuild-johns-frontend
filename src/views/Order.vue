<template>
  <div class="order">
    <div class="container">
      <div class="order__inner" v-if="!orderIsCompleted">
        <OrderCart
          :cartItems="getItems"
          :count="getItemsCount"
          :total="total"
        />
        <OrderContacts
          v-model:name="order.name"
          v-model:email="order.email"
          v-model:phoneNumber="order.phoneNumber"
        />
        <div class="order__method">
          <OrderDeliveryMethod
            :activeMethod="order.deliveryMethod"
            @changeMethod="order.deliveryMethod = $event"
          />
          <div
            class="order__info"
            v-if="order.deliveryMethod === DELIVERY_METHODS.PICKUP"
          >
            {{ $t('app.order.delivery.pickupDescription') }}
          </div>
        </div>

        <OrderSection :title="$t('app.order.delivery.title')">
          <DeliveryAddressForm
            class="order__address"
            :errors="errors.addressDelivery"
            v-model:address="order.addressDelivery.address"
            v-model:apartment="order.addressDelivery.apartment"
            v-model:floor="order.addressDelivery.floor"
            v-model:intercom="order.addressDelivery.intercom"
            v-model:entrance="order.addressDelivery.entrance"
            @update:address="errors.addressDelivery.address = ''"
          />
        </OrderSection>
        <OrderAgreement
          :sms="order.sms"
          :emailNewsletters="order.emailNewsletters"
        />
        <AppButton
          class="order__button"
          :disabled="!orderIsValid"
          :loading="orderLoader"
          @clickButton="createOrderHandler"
          >{{ $t('app.utils.checkout') }}</AppButton
        >
      </div>
      <AppNextView
        v-else
        :isCheckoutButton="false"
        :title="$t('app.order.orderIsProcessed')"
      />
    </div>
  </div>
</template>

<script>
import OrderCart from '@components/order/OrderCart'
import OrderContacts from '@components/order/OrderContacts'
import OrderDeliveryMethod from '@components/order/OrderDeliveryMethod'
import OrderSection from '@components/order/OrderSection'
import DeliveryAddressForm from '@components/forms/DeliveryAddressForm'
import OrderAgreement from '@components/order/OrderAgreement'
import AppButton from '@elements/AppButton'
import AppNextView from '@elements/AppNextView'
import {
  DELIVERY_METHODS,
  DELIVERY_TIMES,
  PAYMENT_METHODS,
  PHONE_LENGTH_WITH_PREFIX,
} from '@const'
import { calculateDiscount } from '@utils'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Order',
  components: {
    OrderCart,
    OrderContacts,
    OrderDeliveryMethod,
    OrderSection,
    DeliveryAddressForm,
    OrderAgreement,
    AppButton,
    AppNextView,
  },
  data() {
    return {
      order: {
        name: '',
        email: '',
        phoneNumber: '',
        deliveryMethod: DELIVERY_METHODS.DELIVERY,
        addressDelivery: {
          address: '',
          apartment: '',
          floor: '',
          intercom: '',
          entrance: '',
        },
        emailNewsletters: true,
        sms: true,
        contactless: false,
        comment: '',
        oddMoney: '',
        timeOfDelivery: DELIVERY_TIMES.SOON_AS_POSSIBLE,
        paymentMethod: PAYMENT_METHODS.CASH,
        products: [],
      },
      DELIVERY_METHODS,
      orderIsCompleted: false,
      errors: {
        addressDelivery: {
          address: '',
        },
      },
    }
  },

  watch: {
    getItems(items) {
      if (!items.length && !this.orderIsCompleted) {
        this.$router.push('/')
      }
    },
  },

  computed: {
    ...mapState({
      orderLoader: (state) => state.order.orderLoader,
      promoCode: (state) => state.promoCode.promoCode,
    }),

    ...mapGetters({
      getItems: 'shoppingCart/getItems',
      getItemsCount: 'shoppingCart/getItemsCount',
      getTotal: 'shoppingCart/getTotal',
    }),

    orderIsValid() {
      return (
        this.order.phoneNumber.length === PHONE_LENGTH_WITH_PREFIX &&
        this.order.addressDelivery.address
      )
    },

    total() {
      const { discount, percent } = this.promoCode
      return Object.keys(this.promoCode).length
        ? calculateDiscount({
            total: this.getTotal,
            discount,
            isPercent: percent,
          })
        : this.getTotal
    },
  },
  methods: {
    ...mapActions({
      initCart: 'shoppingCart/initCart',
      clearCart: 'shoppingCart/clearCart',
      createOrder: 'order/createOrder',
    }),

    ...mapMutations({
      setOrderLoader: 'order/SET_ORDER_LOADER',
    }),

    async createOrderHandler() {
      if (!this.orderIsValid) {
        return
      }

      this.setOrderLoader(true)
      const products = this.ingredientsToIds(this.getItems)

      const isSuccess = await this.createOrder({ ...this.order, products })
      this.setOrderLoader(false)

      if (isSuccess) {
        this.orderIsCompleted = true
        this.clearCart()
      }
    },

    ingredientsToIds(products) {
      return products.map((product) => {
        const ingredientsIds = []

        for (let i = 0; i < product.ingredients.length; i++) {
          ingredientsIds.push(product.ingredients[i]._id)
        }

        return {
          ...product,
          count: String(product.count),
          ingredients: ingredientsIds,
        }
      })
    },
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

  &__address {
    max-width: 750px;
  }

  &__button {
    margin: 0 0 0 auto;

    @media (max-width: 424px) {
      margin: 0 auto;
    }
  }
}
</style>
