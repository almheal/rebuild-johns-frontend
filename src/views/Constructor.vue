<template>
  <div class="constructor">
    <div class="container">
      <div class="constructor__inner">
        <div class="constructor__body" v-if="!isNextView">
          <div class="constructor__wrapper">
            <ConstructorHeader
              :title="$t('app.constructor.title')"
              :subtitle="$t('app.constructor.subtitle')"
            />
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

          <div class="constructor__column">
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
                <AppButton @clickButton="addToCartHandler">{{
                  $t('app.utils.addToCart')
                }}</AppButton>
                <div class="constructor__total">
                  <span>{{ $t('app.utils.total') }}:</span>
                  <AppPrice :price="total" />
                </div>
              </div>
            </template>
            <AppCircleLoader
              class="constructor__loader"
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
              title: constructorProduct.title || this.$t(product.title),
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
        isSuccess = await this.fetchProduct(this.queryId)
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
  },

  mounted() {
    this.requestIngredients().then(() => {
      this.initialIngredientsCounter(this.ingredients, 0)
    })

    this.initialProduct()
  },
}
</script>

<style lang="scss" scoped>
.constructor {
  &__inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 50px 0;
  }

  &__body {
    @include flex;
    background-color: $white-color;
    padding: 50px 64px;
    border-radius: 10px;
  }

  &__column {
    width: 325px;
  }

  &__wrapper {
    flex: 1 1 0;
    margin-right: 40px;
  }

  &__row {
    @include flex-space-center;
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
      font-size: 12px;
    }
  }

  &__error {
    color: $dark-red-color;
  }

  &__loader {
    margin: 0 auto;
  }
}
</style>
