<template>
  <div class="cart-counter">
    <button
      class="cart-counter__button decrement"
      @click="$emit('decrement')"
    />
    <div class="cart-counter__count">{{ count }}</div>
    <button class="cart-counter__button increment" @click="$emit('increment')">
      <span class="cart-counter__line" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppCartItemCounter',
  props: {
    count: {
      type: [String, Number],
      default: 1,
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-counter {
  @include flex;

  &__button {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;

    &:hover {
      &::after {
        transform: scale(1.08);
      }
    }

    &::before {
      content: '';
    }

    &::after {
      @include absolute-default;
      content: '';
      background-color: $green-color;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: transform 0.15s;
    }
  }

  &__button::before,
  &__line {
    @include absolute-center;
    z-index: 1;
    width: 8px;
    height: 2px;
    background-color: $white-color;
  }

  &__line {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  &__count {
    @include flex-center;
    height: 20px;
    min-width: 40px;
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 16px;
    user-select: none;
    color: $brown-color;
  }
}
</style>
