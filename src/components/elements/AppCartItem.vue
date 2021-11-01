<template>
  <div class="cart-item">
    <div class="cart-item__row row">
      <div class="cart-item__picture">
        <img class="cart-item__img" :src="img" alt="product-image" />
      </div>
      <div class="cart-item__column">
        <div class="cart-item__header">
          <div class="cart-item__title">{{ title }}</div>
          <CrossIcon
            width="14"
            height="14"
            @clickCross="$emit('removeItem', id)"
          />
        </div>
        <div class="cart-item__content">
          <div class="cart-item__various" v-if="varietyTitle || sizeTitle">
            {{ varietyTitle }}{{ sizeTitle ? `, ${sizeTitle}` : sizeTitle }}
          </div>
          <span
            class="cart-item__ingredient"
            v-for="(title, index) in ingredientTitlesWithPrefixes"
            :class="{ 'is-removed': title.includes('-') }"
            :key="index"
          >
            {{ `${index ? ',' : ''}${title}` }}
          </span>
        </div>
      </div>
    </div>
    <div class="cart-item_bottom">
      <AppCartItemCounter
        :count="count"
        @decrement="$emit('decrement', id)"
        @increment="$emit('increment', id)"
      />
      <AppProductPrice class="cart-item__price" :price="count * price" />
    </div>
  </div>
</template>

<script>
import CrossIcon from '@icons/CrossIcon'
import AppCartItemCounter from '@elements/AppCartItemCounter'
import AppProductPrice from '@elements/AppProductPrice'

export default {
  name: 'AppCartItem',
  components: {
    CrossIcon,
    AppCartItemCounter,
    AppProductPrice,
  },
  emits: ['removeItem', 'decrement', 'increment'],
  props: {
    img: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    count: {
      type: String,
      default: '1',
    },
    price: {
      type: String,
      default: '',
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: '',
    },
    varietyTitle: {
      type: String,
      default: '',
    },
    sizeTitle: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ingredientTitlesWithPrefixes() {
      const titles = this.ingredients.reduce(
        (acc, ingredient) => {
          if (ingredient.isRemoved) {
            acc.removedIngredients.push(`- ${this.$t(ingredient.title)}`)
          }

          if (ingredient.count > 1) {
            acc.doubleIngredients.push(
              `+ ${this.$t(ingredient.title)} x${ingredient.count}`
            )
          }

          if (!ingredient.isDefault) {
            acc.addedIngredients.push(`+ ${this.$t(ingredient.title)}`)
          }

          return acc
        },
        { doubleIngredients: [], removedIngredients: [], addedIngredients: [] }
      )

      return [
        ...titles.doubleIngredients,
        ...titles.addedIngredients,
        ...titles.removedIngredients,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-item {
  padding: 16px 0;
  border-bottom: 1px solid $dark-smoky-white;

  &__row {
    margin-bottom: 12px;
  }

  &__picture {
    width: 50px;
    margin-right: 5px;
  }

  &__img {
    width: 100%;
  }

  &__title {
    font-family: $gotham-font;
    font-size: 12px;
    color: $brown-color;
    margin-bottom: 4px;
  }

  &__column {
    flex: 1 1 0;
  }

  &__header {
    @include flex-space-center;
  }

  &__various {
    font-size: 12px;
  }

  &__ingredient {
    font-size: 12px;
    color: $green-color;

    &.is-removed {
      color: $dark-red-color;
    }
  }

  &__price {
    font-size: 14px;
  }

  &_bottom {
    @include flex-space-center;
  }
}
</style>
