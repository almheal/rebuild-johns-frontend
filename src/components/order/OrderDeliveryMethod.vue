<template>
  <OrderSection class="order-delivery">
    <div class="order-delivery__row">
      <div
        class="order-delivery__toggle"
        :class="{ 'is-right': activeMethod === DELIVERY_METHODS.PICKUP }"
      />
      <button
        class="order-delivery__button"
        v-for="button in buttons"
        :key="button.title"
        :class="{ 'is-active': activeMethod === button.method }"
        @click="$emit('changeMethod', button.method)"
      >
        {{ $t(button.title) }}
        <span
          class="order-delivery__discount"
          v-if="button.method === DELIVERY_METHODS.PICKUP"
        >
          15%
        </span>
      </button>
    </div>
  </OrderSection>
</template>

<script>
import OrderSection from '@components/order/OrderSection'
import { DELIVERY_METHODS } from '@const'

export default {
  name: 'OrderDeliveryMethod',
  components: {
    OrderSection,
  },
  props: {
    activeMethod: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      DELIVERY_METHODS,
    }
  },
  computed: {
    buttons() {
      return [
        {
          title: 'app.order.delivery.delivery',
          method: DELIVERY_METHODS.DELIVERY,
        },
        {
          title: 'app.order.delivery.pickup',
          method: DELIVERY_METHODS.PICKUP,
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.order-delivery {
  &__row {
    @include flex;
    position: relative;
    z-index: 1;
    width: 362px;
    height: 60px;
    border-radius: 40px;
    background-color: $smoky-white;

    @media (max-width: 769px) {
      width: 100%;
    }
  }

  &__button {
    @include flex-center;
    width: 50%;
    height: 100%;
    font-size: 16px;
    font-weight: 500;
    color: $brown-color;
    transition: color 0.3s;

    &.is-active {
      color: $white-color;
    }

    @media (max-width: 380px) {
      font-size: 14px;
    }
  }

  &__toggle {
    @include absolute-default;
    z-index: -1;
    width: 50%;
    height: 100%;
    background-color: $green-color;
    border-radius: inherit;
    transition: transform 0.3s;

    &.is-right {
      transform: translateX(100%);
    }
  }

  &__discount {
    @include absolute-top-right(-16px, -16px);
    @include flex-center;
    z-index: 5;
    width: 42px;
    height: 42px;
    background-color: $white-color;
    border-radius: 50%;
    color: $white-color;
    font-size: 12px;

    &::before {
      @include absolute-center;
      z-index: -1;
      content: '';
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: $dark-orange;
    }
  }
}
</style>
