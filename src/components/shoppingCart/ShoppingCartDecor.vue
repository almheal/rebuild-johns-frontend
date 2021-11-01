<template>
  <div class="shopping-cart__decor">
    <div class="shopping-cart__circle" />
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartDecor',
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  &__decor {
    position: relative;
    height: 40px;

    &::before {
      @include absolute-bottom-default;
      content: '';
      height: 3px;
      width: 100%;
      background-color: $dark-red-color;
    }
  }

  &__circle {
    @include absolute-left-center;
    top: 0;
    z-index: 1;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: 3px solid $dark-red-color;
    background-color: $white-color;
  }
}
</style>
