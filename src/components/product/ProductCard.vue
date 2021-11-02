<template>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__picture wrapper-relative">
        <img
          class="product-card__img"
          v-lazy="activeVariety.img"
          alt="product-image"
        />
        <ProductIngredientsButton
          class="product-card__button"
          v-if="product.ingredients.length"
          @clickButton="isIngredients = true"
        />
      </div>
      <ProductAdditionals
        :tags="product.tags"
        :features="product.features"
        :persons="activeSize.persons"
      />
      <div class="product-card__wrapper">
        <div class="product-card__content">
          <div class="product-card__name">
            <h5 class="product-card__title">{{ $t(product.title) }}</h5>
            <InfoIcon />
          </div>
          <div class="product-card__description" v-if="product.description">
            {{ $t(product.description) }}
          </div>
        </div>

        <div class="product-card__content">
          <div class="product-card__varieties" v-if="productVarieties.length">
            <AppProductVarious
              :items="productVarieties"
              :toShow="(item) => $t(item.variety)"
              :modelValue="activeVariety"
              @update:modelValue="defaultVarietyAndSize($event)"
            />
          </div>

          <template v-if="activeVarietySizes.length">
            <AppProductVarious
              :items="activeVarietySizes"
              :toShow="
                (item) => `${item.size.title} ${$t(item.size?.unit || '')}`
              "
              v-model="activeSize"
            />
          </template>
        </div>
      </div>

      <div class="product-card__row product-card__content">
        <AppButton @clickButton="addToCartHandler">{{
          $t('app.utils.addToCart')
        }}</AppButton>
        <AppProductPrice :price="activeSize.price" />
      </div>
    </div>
    <ProductIngredients
      class="product-card__ingredients"
      v-if="product.ingredients.length && isIngredients"
      :ingredients="ingredients"
      @clickIngredient="toggleIngredient"
      @addIngredients="addIngredientsHandler"
      @cancel="isIngredients = false"
      @addToCart="addToCartHandler"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ProductIngredientsButton from '@components/product/ProductIngredientsButton'
const ProductIngredients = defineAsyncComponent(() =>
  import(
    /*webpackChunkName: "productIngredients"*/ '@components/product/ProductIngredients'
  )
)
import ProductAdditionals from '@components/product/ProductAdditionals'
import AppProductVarious from '@elements/AppProductVarious'
import AppProductPrice from '@elements/AppProductPrice'
import AppButton from '@elements/AppButton'
import InfoIcon from '@icons/InfoIcon'
import { initialIngredients } from '@utils'
import { mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  components: {
    ProductIngredientsButton,
    ProductIngredients,
    ProductAdditionals,
    AppProductVarious,
    AppProductPrice,
    AppButton,
    InfoIcon,
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeVariety: {
        variety: '',
        sizes: [],
      },
      activeSize: {},
      ingredients: [],
      isIngredients: false,
    }
  },
  computed: {
    productVarieties() {
      return this.product.options.filter((option) => option.variety)
    },

    activeVarietySizes() {
      return this.activeVariety.sizes.filter((item) => item.size?.title)
    },
  },
  methods: {
    ...mapActions({
      addToCart: 'shoppingCart/addToCart',
    }),
    defaultVarietyAndSize(option) {
      this.activeVariety = option
      this.activeSize = option.sizes[0]
    },

    addIngredientsHandler() {
      const url = this.generateConstructorUrl()
      this.$router.push(url)
    },

    generateConstructorUrl() {
      return this.ingredients.reduce((acc, ingredient) => {
        if (ingredient.isRemoved) {
          acc += `&ingredients=${ingredient._id}`
        }
        return acc
      }, `/constructor?id=${this.product._id}`)
    },

    addToCartHandler() {
      const product = {
        title: this.product.title,
        ingredients: this.ingredients,
        variety: this.activeVariety,
        size: this.activeSize,
        options: [{ ...this.activeVariety, sizes: [this.activeSize] }],
        category: this.product.category._id,
      }

      this.addToCart(product)
    },

    toggleIngredient(ingredient) {
      ingredient.isRemoved = !ingredient.isRemoved
    },
  },
  mounted() {
    this.defaultVarietyAndSize(this.product.options[0])
    this.ingredients = initialIngredients(this.product.ingredients)
  },
}
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  width: calc((100% - 20px) / 3);
  margin: 0 10px 10px 0;
  background-color: $white-color;
  border-radius: 10px;

  @media (max-width: 1201px) {
    width: calc(50% - 5px);
    margin-right: 0;

    &:nth-child(2n + 2) {
      margin-left: 10px;
    }
  }

  @media (max-width: 769px) {
    width: 100%;

    &:nth-child(2n + 2) {
      margin-left: 0;
    }
  }

  &:nth-child(3n + 3) {
    margin-right: 0;
  }

  &__body {
    @include flex;
    flex-direction: column;
    height: 100%;
  }

  &__picture {
    min-height: 230px;
  }

  &__img {
    height: 223px;
    width: 283px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;

    @media (max-width: 1201px) {
      width: 325px;
      height: 256px;
    }

    @media (max-width: 769px) {
      width: 546px;
      height: 430px;
    }

    @media (max-width: 596px) {
      width: 100%;
      height: auto;
    }
  }

  &__button {
    @include absolute-top-right(0, 0);
    z-index: 50;
  }

  &__wrapper {
    @include flex-justify-space;
    flex-direction: column;
    flex: 1 1 0;
  }

  &__content {
    padding: 12px 24px;

    &:last-child {
      padding-bottom: 24px;
    }
  }

  &__name {
    @include flex-space-center;
    margin-bottom: 8px;
  }

  &__title {
    margin-right: 12px;
    font-family: $gotham-font;
    font-size: 18px;
    font-weight: 700;
    color: $brown-color;

    @media (max-width: 380px) {
      font-size: 16px;
    }
  }

  &__varieties {
    margin-bottom: 8px;
  }

  &__row {
    @include flex-space-center;
  }

  &__ingredients {
    @include absolute-default;
    z-index: 50;
    width: 100%;
    height: 100%;
  }
}
</style>
