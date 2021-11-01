<template>
  <div class="product-ingredients">
    <div class="product-ingredients__body">
      <div class="product-ingredients__content">
        <h5 class="product-ingredients__title">
          {{ $t('app.ingredients.removeIngredients') }}
        </h5>

        <ul class="product-ingredients__list">
          <li
            class="product-ingredients__item"
            v-for="ingredient in ingredients"
            :class="{
              'is-removed': ingredient.isRemoved,
            }"
            :key="ingredient.title"
            @click="$emit('clickIngredient', ingredient)"
          >
            {{ $t(ingredient.title) }}
            <CrossIcon
              class="product-ingredients__cross"
              v-if="!ingredient.isRemoved"
              width="14"
              height="14"
            />
            <ReloadIcon v-else class="product-ingredients__reload" />
          </li>
        </ul>

        <div
          class="product-ingredients__add row-center"
          @click="$emit('addIngredients')"
        >
          <AppPlusButton class="product-ingredients__plus" />
          <div class="product-ingredients__text">
            {{ $t('app.ingredients.addIngredients') }}
          </div>
        </div>
      </div>

      <div class="product-ingredients__actions">
        <button class="product-ingredients__cancel" @click="$emit('cancel')">
          {{ $t('app.utils.cancel') }}
        </button>
        <AppButton @clickButton="$emit('addToCart')">{{
          $t('app.utils.addToCart')
        }}</AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import AppPlusButton from '@elements/AppPlusButton'
import AppButton from '@elements/AppButton'
import CrossIcon from '@icons/CrossIcon'
import ReloadIcon from '@icons/ReloadIcon'

export default {
  name: 'ProductIngredients',
  components: {
    AppPlusButton,
    AppButton,
    CrossIcon,
    ReloadIcon,
  },
  emits: ['clickIngredient', 'addIngredients', 'cancel', 'addToCart'],
  props: {
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.product-ingredients {
  background-color: rgba(128, 117, 115, 0.63);
  border-radius: 10px;
  padding: 16px;

  &__body {
    background-color: $white-color;
    border-radius: 10px;
    padding: 24px 24px 16px;
  }

  &__content {
    border-bottom: 1px solid $wolf-grey-color;
    padding-bottom: 10px;
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 18px;
    color: $brown-color;
    margin-bottom: 16px;
  }

  &__list {
    margin-bottom: 15px;
  }

  &__item {
    @include flex-space-center;
    font-size: 16px;
    color: $brown-color;
    cursor: pointer;
    padding: 7px 0;
    transition: color 0.3s;

    &.is-removed {
      text-decoration: line-through;
      color: $wolf-grey-color;
    }

    &:hover {
      .product-ingredients__cross {
        &::before,
        &::after {
          background-color: $dark-red-color;
        }
      }

      .product-ingredients__reload {
        color: $green-color;
      }
    }
  }

  &__reload {
    width: 16px;
    height: 16px;
    color: $light-grey-color;
    transition: color 0.3s;
  }

  &__text {
    margin-left: 10px;
  }

  &__add {
    font-family: $gotham-font;
    font-weight: 500;
    color: $green-color;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: $dark-green-color;

      .product-ingredients__plus {
        background-color: $dark-green-color;
      }
    }
  }

  &__actions {
    @include flex-space-center;
    padding-top: 16px;
  }

  &__cancel {
    color: $light-grey-color;
    font-weight: 500;
    margin-right: 10px;
    transition: color 0.3s;

    &:hover {
      color: $dark-green-color;
    }
  }
}
</style>
