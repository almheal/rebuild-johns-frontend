<template>
  <div class="halves">
    <div class="container">
      <div class="halves__inner">
        <div class="halves__body" v-if="!isAdded">
          <div class="halves__header">
            <h1 class="halves__title">{{ $t('app.halves.card.title') }}</h1>
            <h3 class="halves__subtitle">
              {{ $t('app.halves.card.combineTwoFlavors') }}
            </h3>
          </div>
          <div class="halves__row">
            <HalvesPizzaHeader
              class="halves__halfs"
              :halvesHeader="halvesHeader"
              @clickHalf="openHalves"
            />
            <HalvesList
              class="halves__list"
              :loading="halvesLoader || categoriesLoader"
              :isShow="openedMobileHalves === 'left'"
              :products="halves"
              :disabledHalfId="rightHalf._id"
              :activeHalfId="leftHalf._id"
              @clickHalf="selectHalf($event, 'left')"
            />
            <HalvesPizza
              class="halves__pizza"
              :leftHalf="leftHalf"
              :rightHalf="rightHalf"
              :halvesHeader="halvesHeader"
              :options="options"
              v-model:variety="product.variety"
              v-model:size="product.size"
              @toCart="addToCartHandler"
            />
            <HalvesList
              class="halves__list"
              :loading="halvesLoader || categoriesLoader"
              :isShow="openedMobileHalves === 'right'"
              :products="halves"
              :disabledHalfId="leftHalf._id"
              :activeHalfId="rightHalf._id"
              @clickHalf="selectHalf($event, 'right')"
            />
          </div>
        </div>
        <AppNextView
          :title="
            $t('app.utils.pizzaAddedToCard', {
              title: getTitle,
            })
          "
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import HalvesPizzaHeader from '@components/halves/HalvesPizzaHeader'
import HalvesList from '@components/halves/HalvesList'
import HalvesPizza from '@components/halves/HalvesPizza'
import AppNextView from '@elements/AppNextView'
import { halvesOptions } from '@components/halves/halves.setup'
import { initialIngredients } from '@utils'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Halves',
  components: {
    HalvesPizzaHeader,
    HalvesList,
    HalvesPizza,
    AppNextView,
  },
  data: () => ({
    product: {
      title: '',
      variety: {},
      size: {},
      isHalf: true,
    },
    options: [],
    leftHalf: {},
    rightHalf: {},
    isAdded: false,
    openedMobileHalves: '',
  }),
  computed: {
    ...mapState({
      halves: (state) => state.halves.halves,
      halvesLoader: (state) => state.halves.halvesLoader,
      categoriesLoader: (state) => state.category.categoriesLoader,
    }),

    ...mapGetters({
      getPizzaCategory: 'category/getPizzaCategory',
    }),

    halvesHeader() {
      const halves = [
        {
          text: 'app.halves.leftHalf',
          half: this.leftHalf,
          side: 'left',
        },
        {
          text: 'app.halves.rightHalf',
          half: this.rightHalf,
          side: 'right',
        },
      ]

      return halves
    },

    getTitle() {
      return `«${this.$t(this.leftHalf.title)} + ${this.$t(
        this.rightHalf.title
      )}»`
    },
  },
  methods: {
    ...mapActions({
      fetchProducts: 'product/fetchProducts',
      fetchCategories: 'category/fetchCategories',
      addToCart: 'shoppingCart/addToCart',
    }),

    ...mapMutations({
      setHalves: 'halves/SET_HALVES',
      setHalvesLoader: 'halves/SET_HALVES_LOADER',
      setCategoriesLoader: 'category/SET_CATEGORIES_LOADER',
    }),

    async addToCartHandler() {
      const { variety, size } = this.product
      const ingredients = initialIngredients([
        ...this.rightHalf.ingredients,
        ...this.leftHalf.ingredients,
      ])

      const product = {
        ...this.product,
        title: this.getTitle,
        ingredients,
        options: [{ ...variety, sizes: [size] }],
        category: this.getPizzaCategory._id,
      }

      await this.addToCart(product)

      this.isAdded = true
    },

    openHalves(side) {
      this.openedMobileHalves = side
    },

    selectHalf(half, halfSide) {
      if (halfSide === 'left') {
        this.leftHalf = half
      }

      if (halfSide === 'right') {
        this.rightHalf = half
      }

      this.openedMobileHalves = ''
    },
  },
  mounted() {
    this.setCategoriesLoader(true)
    this.fetchCategories().then(async () => {
      this.setHalvesLoader(true)
      this.setCategoriesLoader(false)
      const products = await this.fetchProducts({
        params: { category: this.getPizzaCategory._id },
        isSet: false,
      })
      this.setHalvesLoader(false)
      this.setHalves(products)
    })

    this.product.variety = halvesOptions[0]
    this.product.size = this.product.variety.sizes[0]
    this.options = halvesOptions
  },
}
</script>

<style lang="scss" scoped>
.halves {
  &__inner {
    padding: 60px 0 50px;
  }

  &__body {
    max-width: 1000px;
    margin: 0 auto;
  }

  &__halfs {
    width: 100%;
    display: none;

    @media (max-width: 993px) {
      display: flex;
    }

    @media (max-width: 424px) {
      order: -1;
    }
  }

  &__row {
    @include flex-justify-align(initial, initial);
    flex-wrap: wrap;

    @media (max-width: 993px) {
      .halves__pizza {
        order: -1;
        width: 100%;
      }
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 32px;
  }

  &__title {
    font-family: $gotham-font;
    font-size: 24px;
    font-weight: 700;
    color: $brown-color;
    margin-bottom: 8px;
  }

  &__subtitle {
    font-size: 16px;
  }
}
</style>
