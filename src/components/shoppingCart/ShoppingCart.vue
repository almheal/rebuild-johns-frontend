<template>
  <div class="shopping-cart">
    <ShoppingCartDecor />
    <div class="shopping-cart__body">
      <CartIcon class="shopping-cart__icon" />
      <AppCartHeader
        :count="getItemsCount"
        :isOpen="isOpened"
        :isCount="isOpened && getItemsCount"
        @clickContent="isOpened = !isOpened"
      >
        <button
          class="shopping-cart__clear"
          @click="clearCartHandler"
          v-if="getItemsCount"
        >
          {{ $t('app.cart.clear') }}
        </button>
      </AppCartHeader>

      <template v-if="getItemsCount">
        <div class="shopping-cart__list" v-if="isOpened">
          <AppCartItem
            v-for="item in getItems"
            :key="item.title"
            :title="$t(item.title)"
            :img="item.variety.img"
            :ingredients="item.ingredients"
            :count="item.count"
            :id="item.id"
            :price="item.size.price"
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
        <div class="shopping-cart__total" :class="{ 'is-closed': !isOpened }">
          <div class="shopping-cart__sum" v-if="isOpened">
            {{ $t('app.cart.orderPrice') }}:
          </div>
          <div class="shopping-cart__count" v-else>{{ cartCountTitle }}</div>
          <AppPrice :price="total" />
        </div>
        <AppButton
          class="shopping-cart__button"
          @clickButton="$router.push('/order')"
          >{{ $t('app.cart.orderNow') }}</AppButton
        >
      </template>

      <div class="shopping-cart__empty" v-if="!getItemsCount && isOpened">
        <img
          class="shopping-cart__img"
          v-lazy="require(`../../assets/img/emptyCart.jpg`)"
          alt="empty-cart-img"
        />
        <div class="shopping-cart__text">{{ $t('app.cart.empty') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingCartDecor from '@components/shoppingCart/ShoppingCartDecor'
import AppCartHeader from '@elements/AppCartHeader'
import CartIcon from '@icons/CartIcon'
import AppCartItem from '@elements/AppCartItem'
import AppPrice from '@elements/AppPrice'
import AppButton from '@elements/AppButton'
import { mapActions, mapGetters, mapState } from 'vuex'
import { wordWithRightEnding, calculateDiscount } from '@utils'

export default {
  name: 'ShoppingCart',
  components: {
    ShoppingCartDecor,
    AppCartHeader,
    CartIcon,
    AppCartItem,
    AppPrice,
    AppButton,
  },
  data() {
    return {
      isOpened: true,
    }
  },
  computed: {
    ...mapState({
      promoCode: (state) => state.promoCode.promoCode,
    }),
    ...mapGetters({
      getItems: 'shoppingCart/getItems',
      getTotal: 'shoppingCart/getTotal',
      getItemsCount: 'shoppingCart/getItemsCount',
    }),

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

    cartCountTitle() {
      return `${this.getItemsCount} ${wordWithRightEnding(this.getItemsCount, [
        this.$t('app.cart.item'),
        this.$t('app.cart.items'),
        this.$t('app.cart.itemsSecond'),
      ])}`
    },
  },
  methods: {
    ...mapActions({
      initCart: 'shoppingCart/initCart',
      calculateCount: 'shoppingCart/calculateCount',
      removeFromCart: 'shoppingCart/removeFromCart',
      clearCart: 'shoppingCart/clearCart',
    }),

    clearCartHandler() {
      this.isOpened = true
      this.clearCart()
    },
  },
  mounted() {
    this.initCart()
  },
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  &__icon {
    @include absolute-left-center;
    top: -20px;
    color: $dark-red-color;
  }

  &__body {
    position: relative;
    z-index: 1;
    background-color: $white-color;
    padding: 24px;
    border-radius: 2px 2px 10px 10px;
  }

  &__clear {
    font-size: 12px;
    color: $green-color;
    margin-left: 8px;
    transition: color 0.3s;

    &:hover {
      color: $dark-green-color;
    }
  }

  &__total {
    @include flex-space-center;
    padding: 15px 0 10px;
    margin-bottom: 15px;

    &.is-closed {
      border-bottom: 1px solid $dark-smoky-white;
    }
  }

  &__count {
    text-transform: lowercase;
    font-size: 12px;
  }

  &__sum {
    font-family: $gotham-font;
    font-weight: 500;
    color: $brown-color;
  }

  &__button {
    margin: 0 auto;
  }

  &__empty {
    text-align: center;
    padding-top: 25px;
  }

  &__img {
    width: 147px;
    height: 147px;
    margin-bottom: 8px;
  }
}
</style>
