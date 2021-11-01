<template>
  <div class="home">
    <div class="container">
      <div class="home__inner">
        <HomeCategories
          class="home__categories"
          :loading="categoriesLoader"
          :categories="categoriesWithProducts"
          @clickCategory="categoryHandler"
        />
        <div class="home__row row">
          <div class="home__body">
            <section class="section" v-if="getPizzaCategory">
              <h4 class="section__title">{{ $t(getPizzaCategory.title) }}</h4>
              <div class="section__products">
                <ProductList
                  :products="productsByCategories[getPizzaCategory._id]"
                  :loading="productsLoader"
                />
              </div>
            </section>
            <section
              class="section"
              v-for="category in categoriesWithoutPizza"
              :key="category._id"
            >
              <h4 class="section__title">{{ $t(category.title) }}</h4>
              <div class="section__products">
                <ProductList
                  :products="productsByCategories[category._id]"
                  :loading="productsLoader"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCategories from '@components/home/HomeCategories'
import ProductList from '@components/product/ProductList'
import { mapActions, mapState, mapGetters } from 'vuex'

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

    ...mapGetters({
      getPizzaCategory: 'category/getPizzaCategory',
    }),

    categoriesWithProducts() {
      return this.categories.filter((category) =>
        this.products.some((product) => product.category._id === category._id)
      )
    },

    categoriesWithoutPizza() {
      return this.categoriesWithProducts.filter(
        (category) => category._id !== this.getPizzaCategory._id
      )
    },

    productsByCategories() {
      return this.categoriesWithProducts.reduce((acc, category) => {
        if (!acc[category._id]) {
          acc[category._id] = []
        }

        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category._id === category._id) {
            acc[category._id].push(this.products[i])
          }
        }

        return acc
      }, {})
    },
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

  &__row {
    padding-top: 70px;
  }

  &__body {
    width: calc(100% - 272px);
    margin-right: 30px;

    @media (max-width: 993px) {
      width: 100%;
      margin-right: 0;
    }
  }
}

.section {
  padding-bottom: 70px;

  @media (max-width: 576px) {
    padding-bottom: 40px;
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 24px;
    color: $brown-color;
    margin-bottom: 16px;

    @media (max-width: 380px) {
      font-size: 20px;
    }
  }
}
</style>
