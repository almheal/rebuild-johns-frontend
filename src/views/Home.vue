<template>
  <div class="home">
    <HomeCarousel />
    <div class="container">
      <div class="home__inner">
        <HomeCategories
          class="home__categories"
          :loading="categoriesLoader"
          :categories="categoriesWithProducts"
          @clickCategory="setCategoryRefId($event._id)"
        />
        <div
          class="home__row row"
          :class="{ 'is-loading': productsLoader && !products.length }"
        >
          <div class="home__body">
            <div
              class="home__products"
              :class="{ 'is-hidden': categoryScrollRefId }"
            >
              <section
                class="section"
                v-if="getPizzaCategory"
                :ref="getPizzaCategory._id"
              >
                <div class="section__header">
                  <h4 class="section__title">
                    {{ $t(getPizzaCategory.title) }}
                  </h4>
                  <div class="row">
                    <div
                      class="section__icon"
                      :class="{ 'is-active': ingredientsIdsFilter.length }"
                      @click="isFilter = !isFilter"
                    >
                      <FilterIcon />
                    </div>
                    <div
                      class="section__icon section__revert"
                      v-if="ingredientsIdsFilter.length || tagsFilter.length"
                      @click="resetFilter"
                    >
                      <RevertIcon />
                    </div>
                  </div>
                </div>
                <HomeTagsFilter
                  v-if="isFilter"
                  :list="filteredPizzasTagsAndFeatures"
                  :activeTags="tagsFilter"
                  @clickFilter="toggleFilterItem($event, 'tagsFilter')"
                />
                <HomeIngredientsFilter
                  v-if="isFilter"
                  :ingredients="ingredients"
                  :activeIngredientsIds="ingredientsIdsFilter"
                  :pizzasIngredientsIds="filteredPizzasIngredientsIds"
                  :loading="ingredientsLoader"
                  @clickIngredient="addIngredientsFilter"
                  @back="isFilter = false"
                />

                <div class="section__products">
                  <ProductList
                    :products="filteredPizzas"
                    :loading="productsLoader"
                  >
                    <AppSpecialCard
                      img="constructor-card.png"
                      :title="$t('app.utils.createYourPizza')"
                      :buttonText="$t('app.utils.createPizza')"
                      :description="$t('app.utils.anyIngredients')"
                      @clickButton="$router.push('/constructor')"
                    />
                    <AppSpecialCard
                      img="halvesPizza.png"
                      :title="$t('app.halves.card.title')"
                      :buttonText="$t('app.halves.card.selectPizza')"
                      :description="$t('app.halves.card.combineTwoFlavors')"
                      @clickButton="$router.push('/halves')"
                    />
                  </ProductList>
                </div>
              </section>
              <section
                class="section"
                v-for="category in categoriesWithoutPizza"
                :key="category._id"
                :ref="category._id"
              >
                <div class="section__header">
                  <h4 class="section__title">{{ $t(category.title) }}</h4>
                </div>
                <div class="section__products">
                  <ProductList
                    :products="productsByCategories[category._id]"
                    :loading="productsLoader"
                  />
                </div>
              </section>
            </div>
          </div>
          <div class="wrapper">
            <div class="home__column">
              <ShoppingCart class="home__cart" />
              <AppPromoCode class="home__promo-code" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppButton
      class="button-cart"
      background-color="red"
      v-if="getTotal"
      @clickButton="$router.push('/order')"
    >
      <CartIcon class="button-cart__icon" />
      <span>{{ getTotal }} ₽</span>
    </AppButton>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import HomeCategories from '@components/home/HomeCategories'
import HomeCarousel from '@components/home/HomeCarousel'
import ShoppingCart from '@components/shoppingCart/ShoppingCart'
import ProductList from '@components/product/ProductList'
import FilterIcon from '@icons/FilterIcon'
import RevertIcon from '@icons/RevertIcon'
import CartIcon from '@icons/CartIcon'
import AppPromoCode from '@elements/AppPromoCode'
import AppButton from '@elements/AppButton'
import AppSpecialCard from '@elements/AppSpecialCard'
const HomeIngredientsFilter = defineAsyncComponent(() =>
  import(
    /*webpackChunkName: "homeIngredientsFilter"*/ '@components/home/HomeIngredientsFilter'
  )
)
const HomeTagsFilter = defineAsyncComponent(() =>
  import(
    /*webpackChunkName: "homeTagsFilter"*/ '@components/home/HomeTagsFilter'
  )
)
import { moveToElement } from '@utils'
import { SCROLL_TO_CATEGORY_TIMEOUT } from '@const'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    HomeCategories,
    HomeCarousel,
    ShoppingCart,
    ProductList,
    FilterIcon,
    RevertIcon,
    CartIcon,
    AppPromoCode,
    AppButton,
    AppSpecialCard,
    HomeIngredientsFilter,
    HomeTagsFilter,
  },
  data() {
    return {
      ingredientsIdsFilter: [],
      tagsFilter: [],
      isFilter: false,
    }
  },

  watch: {
    categoryScrollRefId(id) {
      if (!id) {
        return
      }

      moveToElement(
        this.$refs[id],
        () => {
          this.setCategoryRefId('')
        },
        SCROLL_TO_CATEGORY_TIMEOUT
      )
    },
  },

  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
      categoriesLoader: (state) => state.category.categoriesLoader,
      categoryScrollRefId: (state) => state.category.scrollCategoryRefId,
      products: (state) => state.product.products,
      productsLoader: (state) => state.product.productsLoader,
      ingredients: (state) => state.ingredient.ingredients,
      ingredientsLoader: (state) => state.ingredient.ingredientsLoader,
    }),

    ...mapGetters({
      getPizzaCategory: 'category/getPizzaCategory',
      getTotal: 'shoppingCart/getTotal',
    }),

    filteredPizzasIngredientsIds() {
      return this.filteredPizzas.reduce((acc, product) => {
        for (let i = 0; i < product.ingredients.length; i++) {
          if (!acc.includes(product.ingredients[i]._id)) {
            acc.push(product.ingredients[i]._id)
          }
        }

        return acc
      }, [])
    },

    filteredPizzasTagsAndFeatures() {
      const uniqueFeaturesAndTags = new Set()

      this.filteredPizzas.forEach((product) => {
        const featuresAndTags = [...product.tags, ...product.features]
        for (let i = 0; i < featuresAndTags.length; i++) {
          uniqueFeaturesAndTags.add(this.$t(featuresAndTags[i].title))
        }
      })

      return [...uniqueFeaturesAndTags]
    },

    filteredPizzas() {
      const pizzaProducts =
        this.productsByCategories[this.getPizzaCategory._id] || []

      if (!this.ingredientsIdsFilter.length && !this.tagsFilter.length) {
        return pizzaProducts
      }

      return pizzaProducts.filter((product) => {
        const productFeaturesAndTags = [...product.tags, ...product.features]
        let successIngredientsLength = 0
        let successTagsLength = 0

        for (let i = 0; i < product.ingredients.length; i++) {
          if (this.ingredientsIdsFilter.includes(product.ingredients[i]._id)) {
            successIngredientsLength++
          }

          if (successIngredientsLength === this.ingredientsIdsFilter.length) {
            break
          }
        }

        for (let i = 0; i < productFeaturesAndTags.length; i++) {
          if (
            this.tagsFilter.includes(this.$t(productFeaturesAndTags[i].title))
          ) {
            successTagsLength++
          }

          if (successTagsLength === this.tagsFilter.length) {
            break
          }
        }

        return (
          successIngredientsLength === this.ingredientsIdsFilter.length &&
          successTagsLength === this.tagsFilter.length
        )
      })
    },

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
      fetchIngredients: 'ingredient/fetchIngredients',
      fetchCategories: 'category/fetchCategories',
    }),

    ...mapMutations({
      setIngredientsLoader: 'ingredient/SET_INGREDIENTS_LOADER',
      setCategoriesLoader: 'category/SET_CATEGORIES_LOADER',
      setCategoryRefId: 'category/SET_SCROLL_CATEGORY_ID',
    }),

    toggleFilterItem(value, property) {
      if (this[property].includes(value)) {
        this[property] = this[property].filter((item) => item !== value)
        return
      }

      this[property].push(value)
    },

    addIngredientsFilter(ingredient) {
      if (!this.filteredPizzasIngredientsIds.includes(ingredient._id)) {
        return
      }

      this.toggleFilterItem(ingredient._id, 'ingredientsIdsFilter')
    },

    resetFilter() {
      this.ingredientsIdsFilter = []
      this.tagsFilter = []
    },

    async requestIngredients() {
      this.setIngredientsLoader(true)
      await this.fetchIngredients({ params: { length: false } })
      this.setIngredientsLoader(false)
    },

    async requestCategories() {
      this.setCategoriesLoader(true)
      await this.fetchCategories()
      this.setCategoriesLoader(false)
    },
  },

  mounted() {
    this.fetchProducts({ params: { length: false } })
    this.requestIngredients()
    this.requestCategories()
  },
}
</script>

<style lang="scss" scoped>
.home {
  &__inner {
    padding: 40px 0;

    @media (max-width: 769px) {
      padding-top: 0;
    }
  }

  &__categories {
    @media (max-width: 769px) {
      display: none;
    }
  }

  &__row {
    padding-top: 70px;
    min-height: 500px;

    @media (max-width: 993px) {
      flex-direction: column;
    }

    @media (max-width: 769px) {
      padding-top: 0;
    }
  }

  &__body {
    position: relative;
    z-index: 11;
    flex: 1 1 0;
    margin-right: 30px;

    @media (max-width: 993px) {
      width: 100%;
      margin-right: 0;
    }
  }

  &__products {
    transition: opacity 0.3s;

    &.is-hidden {
      opacity: 0;
    }
  }

  &__column {
    position: sticky;
    left: 0;
    top: 120px;
    z-index: 10;
    margin-top: 40px;
    width: 272px;

    @media (max-width: 993px) {
      width: 100%;
      order: -1;
      margin-bottom: 25px;
    }
  }

  &__cart {
    margin-bottom: 10px;

    @media (max-width: 993px) {
      display: none;
    }
  }
}

.section {
  padding-bottom: 70px;

  @media (max-width: 576px) {
    padding-bottom: 40px;
  }

  &__products {
    position: relative;
    z-index: 1;
  }

  &__header {
    @include flex-align-center;
    margin-bottom: 16px;
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 24px;
    color: $brown-color;
    margin-right: 16px;

    @media (max-width: 380px) {
      font-size: 20px;
    }
  }

  &__icon {
    @include flex-center;
    width: 36px;
    height: 36px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: $dark-smoky-white;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: $pale-grey-color;
    }

    &.is-active {
      background-color: $green-color;
      color: $white-color;
    }
  }

  &__revert {
    &:hover {
      transform: rotate(90deg);
    }
  }
}

.button-cart {
  @include flex-align-center;
  display: none;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  font-family: $roboto-font;
  padding: 10px 20px;

  @media (max-width: 993px) {
    @include flex;
  }

  &::before {
    background-color: $dark-red-color;
  }

  span {
    display: inline-block;
    margin-left: 5px;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
