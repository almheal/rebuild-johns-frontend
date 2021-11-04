<template>
  <div class="constructor">
    <div class="container">
      <div class="constructor__inner">
        <ConstructorHeader
          class="constructor__header"
          :class="{
            'is-active':
              activeStepKey !== constructorStepNames.CONTENT && !isNextView,
          }"
          :buttonText="$t(constructorSteps[getActiveStep].backText)"
          @toBack="changeStepHandler('prev')"
        >
          <div
            class="constructor__total"
            :class="{
              'is-active': activeStepKey !== constructorStepNames.CONTENT,
            }"
          >
            <span>{{ $t('app.utils.total') }}:</span>
            <AppPrice :price="total" />
          </div>
        </ConstructorHeader>
        <div class="constructor__body" v-if="!isNextView">
          <div class="constructor__wrapper">
            <h1
              class="constructor__title"
              :class="{
                'is-active': activeStepKey !== constructorStepNames.CONTENT,
              }"
            >
              {{
                activeStepKey === constructorStepNames.INGREDIENTS
                  ? $t('app.ingredients.title')
                  : $t('app.constructor.title')
              }}
            </h1>
            <h2
              class="constructor__subtitle"
              :class="{
                'is-active': activeStepKey === constructorStepNames.INGREDIENTS,
              }"
            >
              {{ $t('app.constructor.subtitle') }}
            </h2>
            <template v-if="!ingredientsLoader">
              <ConstructorIngredients
                class="constructor__ingredients"
                :class="{
                  'is-active':
                    activeStepKey === constructorStepNames.INGREDIENTS,
                }"
                :ingredients="filteredIngredients"
                :ingredientsCounter="ingredientsCounter"
                :categories="getIngredientCategories"
                :activeCategory="
                  activeIngredientCategory || getIngredientCategories[0]
                "
                @changeCategory="activeIngredientCategory = $event"
                @clickIngredient="calculateIngredientCounter($event)"
                @resetIngredient="calculateIngredientCounter($event, true)"
              />
              <div class="constructor__error" v-if="isMaxIngredientsError">
                {{ $t('app.constructor.maxIngredientsError') }}?
              </div>
            </template>
            <AppCircleLoader
              class="constructor__loader"
              v-else
              color="green"
              size="medium"
            />
          </div>

          <div
            class="constructor__column"
            :class="{
              'width-100': getActiveStep !== constructorStepNames.PIZZA_BASE,
            }"
          >
            <template v-if="!productLoader">
              <ConstructorProduct
                class="constructor__product"
                :class="{
                  'is-active':
                    getActiveStep === constructorStepNames.PIZZA_BASE,
                }"
                :placeholder="product.title ? $t(product.title) : ''"
                :img="product.img"
                :varieties="varieties"
                :sizes="constructorProduct.activeVariety.sizes"
                :activeVariety="constructorProduct.activeVariety"
                :errorTitle="$t(errors.title)"
                v-model:title="constructorProduct.title"
                v-model:activeSize="constructorProduct.activeSize"
                @update:activeVariety="defaultVarietyAndSize($event)"
                @update:title="errors.title = ''"
              />
              <ConstructorContent
                class="constructor__content"
                :class="{
                  'is-active': getActiveStep === constructorStepNames.CONTENT,
                }"
                :ingredients="ingredientsWithCount"
                :ingredientsCounter="ingredientsCounter"
                :activeVariety="constructorProduct.activeVariety"
                :activeSize="constructorProduct.activeSize"
                @changeCount="changeCountHandler"
                @reset="calculateIngredientCounter($event, true)"
              />
              <div class="constructor__row">
                <AppButton
                  class="constructor__button"
                  @clickButton="addToCartHandler"
                  >{{ $t('app.utils.addToCart') }}</AppButton
                >
                <div class="constructor__action">
                  <AppButton
                    class="constructor__next"
                    @clickButton="changeStepHandler('next')"
                    >{{
                      $t(constructorSteps[getActiveStep].buttonText)
                    }}</AppButton
                  >
                </div>

                <div
                  class="constructor__total"
                  :class="{
                    'is-content':
                      getActiveStep === constructorStepNames.CONTENT,
                  }"
                >
                  <span>{{ $t('app.utils.total') }}:</span>
                  <AppPrice :price="total" />
                </div>
              </div>
            </template>
            <AppCircleLoader
              class="constructor__loader"
              :class="{
                'is-active': getActiveStep === constructorStepNames.PIZZA_BASE,
              }"
              v-else
              color="green"
              size="medium"
            />
          </div>
        </div>
        <AppNextView
          v-else
          :title="
            $t('app.utils.pizzaAddedToCard', {
              title: constructorProduct.title || this.$t(product.title || ''),
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import ConstructorHeader from '@components/constructor/ConstructorHeader'
import ConstructorProduct from '@components/constructor/ConstructorProduct'
import ConstructorIngredients from '@components/constructor/ConstructorIngredients'
import ConstructorContent from '@components/constructor/ConstructorContent'
import AppButton from '@elements/AppButton'
import AppPrice from '@elements/AppPrice'
import AppCircleLoader from '@elements/AppCircleLoader'
import AppNextView from '@elements/AppNextView'
import {
  DEFAULT_PIZZA_OPTIONS,
  MAX_LENGTH_ONE_INGREDIENT,
  MAX_LENGTH_INGREDIENTS,
} from '@const'
import {
  constructorSteps,
  constructorStepNames,
} from '@components/constructor/mobileConstructorSteps.js'
import { requiredMessage } from '@utils/validationMessages'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Constructor',
  components: {
    ConstructorHeader,
    ConstructorProduct,
    ConstructorIngredients,
    ConstructorContent,
    AppButton,
    AppPrice,
    AppCircleLoader,
    AppNextView,
  },
  data() {
    return {
      constructorProduct: {
        title: '',
        activeVariety: {
          variety: '',
          sizes: [],
        },
        activeSize: {},
        ingredients: [],
      },
      isMaxIngredientsError: false,
      activeIngredientCategory: '',
      ingredientsCounter: {},
      errors: {
        title: '',
      },
      isNextView: false,
      activeStepKey: '',
      constructorSteps,
      constructorStepNames,
    }
  },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
      productLoader: (state) => state.product.productLoader,
      ingredients: (state) => state.ingredient.ingredients,
      ingredientsLoader: (state) => state.ingredient.ingredientsLoader,
    }),

    ...mapGetters({
      getIngredientCategories: 'ingredient/getIngredientCategories',
      getPizzaCategory: 'category/getPizzaCategory',
    }),

    getActiveStep() {
      return this.activeStepKey || constructorStepNames.PIZZA_BASE
    },

    queryId() {
      return this.$route.query.id
    },

    queryIngredients() {
      return this.$route.query.ingredients
    },

    varieties() {
      return Object.keys(this.product).length
        ? this.product.options
        : DEFAULT_PIZZA_OPTIONS
    },

    filteredIngredients() {
      return this.ingredients.filter(
        (ingredient) =>
          ingredient.category ===
          (this.activeIngredientCategory
            ? this.activeIngredientCategory
            : this.getIngredientCategories[0])
      )
    },

    ingredientsWithCount() {
      return this.ingredients.filter(
        (ingredient) => this.ingredientsCounter[ingredient._id]
      )
    },

    ingredientsCount() {
      return this.ingredientsWithCount.reduce(
        (acc, ingredient) =>
          (acc += Number(this.ingredientsCounter[ingredient._id])),
        0
      )
    },

    total() {
      return this.ingredientsWithCount.reduce((acc, ingredient) => {
        acc += ingredient.price * this.ingredientsCounter[ingredient._id]
        return acc
      }, Number(this.constructorProduct.activeSize?.price) || 0)
    },
  },

  methods: {
    ...mapActions({
      fetchIngredients: 'ingredient/fetchIngredients',
      fetchProduct: 'product/fetchProduct',
      fetchCategories: 'category/fetchCategories',
      addToCart: 'shoppingCart/addToCart',
    }),

    ...mapMutations({
      setIngredientsLoader: 'ingredient/SET_INGREDIENTS_LOADER',
      setProductLoader: 'product/SET_PRODUCT_LOADER',
    }),

    async addToCartHandler() {
      const isValid = this.validateAddProduct()

      if (!isValid) {
        return
      }

      const { title, activeVariety, activeSize } = this.constructorProduct
      const ingredients = this.generateIngredientsByCounter()

      const product = {
        title: title || this.product.title,
        variety: activeVariety,
        size: { ...activeSize, price: this.total },
        ingredients,
        options: [
          { ...activeVariety, sizes: [{ ...activeSize, price: this.total }] },
        ],
        category: this.getPizzaCategory._id,
      }

      await this.addToCart(product)
      this.isNextView = true
    },

    async requestIngredients() {
      this.setIngredientsLoader(true)
      await this.fetchIngredients({ params: { length: false } })
      this.setIngredientsLoader(false)
    },

    validateAddProduct() {
      if (!this.constructorProduct.title && !this.product.title) {
        this.errors.title = requiredMessage
        return false
      }

      return true
    },

    validateChangeCounter(value, ingredientId) {
      if (
        this.ingredientsCount +
          (value - this.ingredientsCounter[ingredientId]) >
        MAX_LENGTH_INGREDIENTS
      ) {
        this.isMaxIngredientsError = true
        return false
      }

      this.isMaxIngredientsError = false
      return true
    },

    changeCountHandler({ number, id }) {
      const isValid = this.validateChangeCounter(number, id)
      if (isValid) {
        this.ingredientsCounter[id] = number
      }
    },

    calculateIngredientCounter(id, isReset = false) {
      if (isReset) {
        const isValid = this.validateChangeCounter(0, id)
        if (isValid) {
          this.ingredientsCounter[id] = 0
        }
        return
      }

      const count =
        this.ingredientsCounter[id] >= MAX_LENGTH_ONE_INGREDIENT
          ? this.ingredientsCounter[id] - 1
          : this.ingredientsCounter[id] + 1
      const isValid = this.validateChangeCounter(count, id)

      if (isValid) {
        this.ingredientsCounter[id] = count
      }
    },

    defaultVarietyAndSize(option) {
      this.constructorProduct.activeVariety = option
      this.constructorProduct.activeSize = option.sizes[0]
    },

    initialIngredientsCounter(ingredients, value) {
      ingredients.forEach((ingredient) => {
        if (!this.ingredientsCounter[ingredient._id]) {
          this.ingredientsCounter[ingredient._id] = value
        }
      })
    },

    generateIngredientsByCounter() {
      const productIngredientsLength =
        this.constructorProduct.ingredients.length

      return Object.entries(this.ingredientsCounter).reduce(
        (acc, [id, count]) => {
          if (productIngredientsLength) {
            const defaultIngredient = this.constructorProduct.ingredients.find(
              (ingredient) => ingredient._id === id
            )

            if (defaultIngredient) {
              acc.push({
                ...defaultIngredient,
                count,
                isDefault: true,
                isRemoved: !count,
              })

              return acc
            }
          }

          if (count) {
            const ingredient = this.ingredients.find(
              (ingredient) => ingredient._id === id
            )

            acc.push({
              ...ingredient,
              count,
              isDefault: false,
              isRemoved: false,
            })

            return acc
          }

          return acc
        },
        []
      )
    },

    async initialProduct() {
      let isSuccess = false

      if (this.queryId) {
        this.setProductLoader(true)
        isSuccess = await this.fetchProduct(this.queryId)
        this.setProductLoader(false)
        this.constructorProduct.ingredients = this.product.ingredients || []
      }

      if (isSuccess) {
        const ingredients = !this.queryIngredients
          ? this.constructorProduct.ingredients
          : this.constructorProduct.ingredients.filter(
              (ingredient) => !this.queryIngredients.includes(ingredient._id)
            )

        this.initialIngredientsCounter(ingredients, 1)
      }

      this.defaultVarietyAndSize(
        isSuccess ? this.product.options[0] : DEFAULT_PIZZA_OPTIONS[0]
      )
    },

    changeStepHandler(direction) {
      const keys = Object.keys(this.constructorSteps)
      const activeIndex = keys.findIndex((key) => key === this.getActiveStep)
      let activeStepKey

      if (activeIndex === -1) {
        return
      }

      if (
        direction === 'next' &&
        this.getActiveStep === this.constructorStepNames.PIZZA_BASE
      ) {
        const isValid = this.validateAddProduct()
        if (!isValid) {
          return
        }
      }

      if (direction === 'prev' && !keys[activeIndex - 1]) {
        this.$router.push('/')
        return
      }

      if (direction === 'next' && !keys[activeIndex + 1]) {
        this.addToCartHandler()
        return
      }

      if (direction === 'prev') {
        activeStepKey = keys[activeIndex - 1]
      }

      if (direction === 'next') {
        activeStepKey = keys[activeIndex + 1]
      }

      this.activeStepKey = activeStepKey
    },
  },

  mounted() {
    this.fetchCategories()
    this.requestIngredients().then(() => {
      this.initialIngredientsCounter(this.ingredients, 0)
    })

    this.initialProduct()
  },
}
</script>

<style lang="scss" scoped>
.constructor {
  @media (max-width: 544px) {
    .container {
      padding: 0;
    }
  }

  &__inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 50px 0;

    @media (max-width: 993px) {
      padding: 0;
    }
  }

  &__header {
    display: none;

    @media (max-width: 993px) {
      &.is-active {
        display: flex;
      }
    }
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 8px;
    color: $brown-color;

    @media (max-width: 993px) {
      display: none;

      &.is-active {
        display: block;
      }
    }

    @media (max-width: 544px) {
      font-size: 20px;
    }
  }

  &__subtitle {
    font-size: 12px;
    margin-bottom: 20px;

    @media (max-width: 993px) {
      display: none;

      &.is-active {
        display: block;
      }
    }
  }

  &__body {
    @include flex;
    background-color: $white-color;
    padding: 50px 64px;
    border-radius: 10px;

    @media (max-width: 993px) {
      flex-direction: column;
      align-items: center;
    }

    @media (max-width: 544px) {
      padding: 40px 28px;
    }
  }

  &__column {
    width: 325px;

    @media (max-width: 993px) {
      &.width-100 {
        width: 100%;
      }
    }

    @media (max-width: 380px) {
      width: 100%;
    }
  }

  &__wrapper {
    flex: 1 1 0;
    margin-right: 40px;

    @media (max-width: 993px) {
      margin-right: 0;
    }
  }

  &__row {
    @include flex-space-center;

    @media (max-width: 993px) {
      flex-direction: column;
    }
  }

  &__ingredients,
  &__product,
  &__content {
    @media (max-width: 993px) {
      display: none;

      &.is-active {
        display: block;
      }
    }
  }

  &__total {
    color: $brown-color;
    text-align: right;

    span {
      display: inline-block;
      font-size: 12px;
    }

    @media (max-width: 993px) {
      display: none;

      span {
        font-size: 14px;
        margin-right: 5px;
      }

      &.is-active,
      &.is-content {
        @include flex-align-center;
      }

      &.is-content {
        margin-top: 10px;

        span {
          font-size: 16px;
        }
      }
    }
  }

  &__button {
    @media (max-width: 993px) {
      display: none;
    }
  }

  &__action {
    display: none;
    width: 100%;

    @media (max-width: 993px) {
      display: block;
    }
  }

  &__next {
    width: 100%;
    font-size: 16px;
  }

  &__error {
    color: $dark-red-color;

    @media (max-width: 993px) {
      margin-bottom: 10px;
    }
  }

  &__loader {
    margin: 0 auto;

    @media (max-width: 993px) {
      display: none;

      &.is-active {
        display: block;
      }
    }
  }
}
</style>
