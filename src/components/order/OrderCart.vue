<template>
  <OrderSection class="order-cart">
    <AppCartHeader
      class="order-cart__header"
      :class="{ 'is-open': isOpened }"
      :count="count"
      :isOpen="isOpened"
      @clickContent="isOpened = !isOpened"
    >
      <button class="order-cart__button" v-if="isOpened" @click="clearCart">
        {{ $t('app.utils.deleteEverything') }}
        <TrashIcon class="order-cart__icon" />
      </button>
      <div class="order-cart__total" v-else>
        <span>{{ $t('app.utils.total') }}:</span>
        <AppPrice :price="total" />
      </div>
    </AppCartHeader>

    <template v-if="isOpened">
      <div class="order-cart__list">
        <AppCartItem
          v-for="item in cartItems"
          componentName="order"
          :key="item.id"
          :img="item.variety.img"
          :title="$t(item.title)"
          :count="item.count"
          :price="item.size.price"
          :ingredients="item.ingredients"
          :id="item.id"
          :varietyTitle="$t(item.variety.variety || '')"
          :sizeTitle="
            item.size?.size
              ? `${item.size.size.title} ${$t(item.size?.size?.unit)}`
              : ''
          "
          @decrement="calculateCount({ id: $event, operation: '-' })"
          @increment="calculateCount({ id: $event, operation: '+' })"
          @removeItem="removeFromCart"
        />
      </div>
      <div class="order-cart__row">
        <AppPromoCode class="order-cart__code" />
        <div class="order-cart__total">
          <span>{{ $t('app.utils.total') }}:</span>
          <AppPrice :price="total" />
        </div>
      </div>
    </template>
  </OrderSection>
</template>

<script>
import OrderSection from '@components/order/OrderSection'
import AppCartHeader from '@elements/AppCartHeader'
import AppCartItem from '@elements/AppCartItem'
import TrashIcon from '@icons/TrashIcon'
import AppPromoCode from '@elements/AppPromoCode'
import AppPrice from '@elements/AppPrice'
import { mapActions } from 'vuex'

export default {
  name: 'OrderCart',
  components: {
    OrderSection,
    AppCartHeader,
    AppCartItem,
    TrashIcon,
    AppPromoCode,
    AppPrice,
  },
  props: {
    cartItems: {
      type: Array,
      default: () => [],
    },
    count: {
      type: [String, Number],
      default: 0,
    },
    total: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      isOpened: true,
    }
  },
  methods: {
    ...mapActions({
      calculateCount: 'shoppingCart/calculateCount',
      removeFromCart: 'shoppingCart/removeFromCart',
      clearCart: 'shoppingCart/clearCart',
    }),
  },
}
</script>

<style lang="scss" scoped>
.order-cart {
  &__header {
    &.is-open {
      margin-bottom: 25px;

      @media (max-width: 424px) {
        margin-bottom: 15px;
      }
    }
  }

  &__button {
    @include flex-align-center;
    font-family: $gotham-font;
    color: $primary-color;
    transition: color 0.3s;

    &:hover {
      color: $dark-red-color;
    }

    @media (max-width: 424px) {
      font-size: 12px;
    }
  }

  &__icon {
    margin-left: 10px;
  }

  &__list {
    margin-bottom: 20px;
  }

  &__row {
    @include flex-space-center;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }

  &__code {
    padding: 0;

    @media (max-width: 576px) {
      margin-bottom: 15px;
    }
  }

  &__total {
    @include flex-align-center;
    font-family: $gotham-font;
    font-size: 18px;

    span {
      margin-right: 5px;
    }

    @media (max-width: 576px) {
      font-size: 16px;
    }
  }
}
</style>
