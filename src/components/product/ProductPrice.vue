<template>
  <div class="product-price flex-center">
    <div class="product-price__value">{{ price }}</div>
    <div class="product-price__sign">₽</div>
  </div>
</template>

<script>
export default {
  name: 'ProductPrice',
  props: {
    price: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.product-price {
  @include flex-align-center;
  color: $brown-color;
  font-size: 18px;
  font-weight: 500;

  @meida (max-width: 577px) {
    font-size: 16px;
  }

  &__value {
    font-family: $gotham-font;
    margin-right: 5px;
  }
}
</style>
