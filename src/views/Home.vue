<template>
  <div class="home">
    <div class="container">
      <div class="home__inner">
        <HomeCategories
          class="home__categories"
          :loading="categoriesLoader"
          :categories="categories"
          @clickCategory="categoryHandler"
        />
        <div class="home__body">
          <div class="home__products">
            <ProductList :products="products" :loading="productsLoader" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCategories from '@components/home/HomeCategories'
import ProductList from '@components/product/ProductList'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    HomeCategories,
    ProductList,
  },
  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
      categoriesLoader: (state) => state.category.categoriesLoader,
      products: (state) => state.product.products,
      productsLoader: (state) => state.product.productsLoader,
    }),
  },
  methods: {
    ...mapActions({
      fetchProducts: 'product/fetchProducts',
    }),
    categoryHandler(category) {
      console.log(category)
    },
  },
  mounted() {
    this.fetchProducts({ query: { length: false } })
  },
}
</script>

<style lang="scss" scoped>
.home {
  &__inner {
    padding: 40px 0;
  }

  &__categories {
    @media (max-width: 769px) {
      display: none;
    }
  }

  &__products {
    padding: 70px 0;
    width: calc(100% - 272px);
    margin-right: 30px;

    @media (max-width: 993px) {
      width: 100%;
    }
  }
}
</style>
