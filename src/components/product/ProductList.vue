<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product._id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductCard from '@components/product/ProductCard'

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
.product-list {
  @include flex;
  flex-wrap: wrap;
}
</style>
