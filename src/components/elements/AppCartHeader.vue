<template>
  <div class="cart-header">
    <div class="cart-header__row" @click="$emit('clickContent')">
      <div class="cart-header__title">{{ $t('app.cart.title') }}</div>
      <div class="cart-header__count" v-if="isCount">({{ count }})</div>
      <ArrowDownIcon
        class="cart-header__arrow"
        :class="{ 'is-open': isOpen }"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import ArrowDownIcon from '@icons/ArrowDownIcon'

export default {
  name: 'AppCartHeader',
  components: {
    ArrowDownIcon,
  },
  emits: ['clickContent'],
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
    count: {
      type: [Number, String],
      default: 0,
    },
    isCount: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-header {
  @include flex-space-center;

  &__row {
    @include flex-align-center;
    cursor: pointer;

    &:hover {
      .cart-header__arrow {
        fill: $green-color;
      }
    }
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 18px;
    color: $brown-color;
    margin-right: 8px;

    @media (max-width: 424px) {
      font-size: 16px;
    }
  }

  &__count {
    font-size: 18px;
    margin-right: 8px;
  }

  &__arrow {
    fill: $brown-color;
    transition: 0.3s;

    &.is-open {
      transform: rotate(180deg);
    }
  }
}
</style>
