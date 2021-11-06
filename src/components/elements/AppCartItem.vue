<template>
  <div class="cart-item" :class="{ 'is-order': componentName === 'order' }">
    <div class="cart-item__row row">
      <div class="cart-item__picture">
        <img class="cart-item__img" :src="img" alt="product-image" />
      </div>
      <div class="cart-item__column">
        <div class="cart-item__header">
          <div class="cart-item__title">{{ title }}</div>
          <CrossIcon
            class="cart-item__cross"
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
            {{ `${index ? ', ' : ''}${title}` }}
          </span>
        </div>
      </div>
    </div>
    <div class="cart-item_bottom">
      <AppCartItemCounter
        class="cart-item__counter"
        :count="count"
        @decrement="$emit('decrement', id)"
        @increment="$emit('increment', id)"
      />
      <div class="row-center">
        <AppPrice class="cart-item__price" :price="count * price" />
        <CrossIcon
          class="cart-item__cross_order"
          width="14"
          height="14"
          @clickCross="$emit('removeItem', id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CrossIcon from '@icons/CrossIcon'
import AppCartItemCounter from '@elements/AppCartItemCounter'
import AppPrice from '@elements/AppPrice'

export default {
  name: 'AppCartItem',
  components: {
    CrossIcon,
    AppCartItemCounter,
    AppPrice,
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
      type: [String, Number],
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
      type: [String, Number],
      default: '',
    },
    varietyTitle: {
      type: String,
      default: '',
    },
    sizeTitle: {
      type: String,
      default: '',
    },
    componentName: {
      type: String,
      default: '',
    },
  },
  computed: {
    ingredientTitlesWithPrefixes() {
      const titles = this.ingredients.reduce(
        (acc, ingredient) => {
          if (ingredient.isRemoved) {
            acc.removedIngredients.push(`- ${this.$t(ingredient.title)}`)
            return acc
          }

          if (ingredient.count > 1) {
            acc.doubleIngredients.push(
              `+ ${this.$t(ingredient.title)} x${ingredient.count}`
            )
            return acc
          }

          if (!ingredient.isDefault) {
            acc.addedIngredients.push(`+ ${this.$t(ingredient.title)}`)
            return acc
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

  &.is-order {
    @include flex-space-center;
    padding: 20px 0;
    border-bottom: 3px solid $dark-smoky-white;

    @media (max-width: 769px) {
      flex-direction: column;
      align-items: flex-start;
    }

    @media (max-width: 424px) {
      padding: 15px 0;
    }

    &:first-child {
      border-top: 3px solid $dark-smoky-white;
    }

    .cart-item {
      &__picture {
        width: 85px;
        height: 85px;
        margin-right: 35px;

        @media (max-width: 424px) {
          display: none;
        }
      }

      &__title {
        font-size: 18px;

        @media (max-width: 769px) {
          font-size: 16px;
        }
      }

      &__header {
        margin-bottom: 10px;

        @media (max-width: 769px) {
          @include flex-space-center;
          width: 100%;
        }
      }

      &__various {
        font-size: 14px;
      }

      &__row {
        margin-bottom: 0;

        @media (max-width: 769px) {
          width: 100%;
          margin-bottom: 15px;
        }
      }

      &_bottom {
        width: 190px;

        @media (max-width: 769px) {
          margin: 0 0 0 auto;
        }
      }

      &__price {
        margin-right: 20px;
        font-size: 16px;
      }

      &__cross {
        display: none;

        @media (max-width: 769px) {
          display: block;
        }

        &_order {
          display: block;

          &:hover {
            &::before,
            &::after {
              background-color: $dark-red-color;
            }
          }

          @media (max-width: 769px) {
            display: none;
          }
        }
      }
    }
  }

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
  }

  &__column {
    flex: 1 1 0;
  }

  &__header {
    @include flex-space-center;
    margin-bottom: 4px;
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

  &__cross {
    &_order {
      display: none;
    }
  }

  &_bottom {
    @include flex-space-center;
  }
}
</style>
