<template>
  <div class="order">
    <div class="container">
      <div class="order__inner">
        <OrderCart
          :cartItems="getItems"
          :count="getItemsCount"
          :total="getTotal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrderCart from '@components/order/OrderCart'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Order',
  components: {
    OrderCart,
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
}
</style>
