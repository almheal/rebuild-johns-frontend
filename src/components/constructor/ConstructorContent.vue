<template>
  <div class="constructor-content">
    <div class="constructor-content__title">
      {{ $t('app.constructor.yourPizzaContains') }}:
    </div>
    <div class="constructor-content__item">
      <div class="constructor-content__name">
        {{ variousTitle }}
      </div>
      <div class="constructor-content__price">
        {{ activeSize.price }}
        <span class="constructor-content__sign">₽</span>
      </div>
    </div>
    <div
      class="constructor-content__item"
      v-for="ingredient in ingredients"
      :key="ingredient._id"
    >
      <div class="constructor-content__name">
        {{ $t(ingredient.title) }}
      </div>
      <div class="row-center">
        <div
          class="constructor-content__counter"
          v-if="ingredientsCounter[ingredient._id]"
        >
          <div
            class="constructor-content__toggle"
            v-for="number in MAX_LENGTH_ONE_INGREDIENT"
            :key="number"
            :class="{
              'is-active': number === ingredientsCounter[ingredient._id],
            }"
            @click="$emit('changeCount', { number, id: ingredient._id })"
          >
            x{{ number }}
          </div>
        </div>
        <div class="constructor-content__price">
          {{ ingredient.price * ingredientsCounter[ingredient._id] }}
          <span class="constructor-content__sign">₽</span>
        </div>
        <div
          class="constructor-content__icon"
          @click="$emit('reset', ingredient._id)"
        >
          <CrossIcon
            class="constructor-content__cross"
            width="12"
            height="12"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CrossIcon from '@icons/CrossIcon'
import { MAX_LENGTH_ONE_INGREDIENT } from '@const'

export default {
  name: 'ConstructorContent',
  components: {
    CrossIcon,
  },
  props: {
    activeVariety: {
      type: Object,
      default: () => ({}),
    },
    activeSize: {
      type: Object,
      default: () => ({}),
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
    ingredientsCounter: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    MAX_LENGTH_ONE_INGREDIENT,
  }),
  computed: {
    variousTitle() {
      const sizeTitle = `${this.activeSize?.size?.title || ''} ${this.$t(
        this.activeSize.size?.unit || ''
      )}`
      const varietyTitle = this.$t(this.activeVariety?.variety || '')

      return `${varietyTitle}${this.activeSize?.size ? `, ${sizeTitle}` : ''}`
    },
  },
}
</script>

<style lang="scss" scoped>
.constructor-content {
  font-size: 12px;
  color: $brown-color;
  padding-bottom: 32px;

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    margin-bottom: 15px;
  }

  &__item {
    @include flex-space-center;
    padding: 8px 0;
    border-bottom: 1px solid $dark-smoky-white;
  }

  &__counter {
    @include flex;
    border-radius: 2px;
    border: 1px solid $wolf-grey-color;
  }

  &__toggle {
    @include flex-center;
    width: 28px;
    height: 22px;
    font-family: $gotham-font;
    font-weight: 700;
    color: $primary-color;
    cursor: default;
    transition: 0.3s;

    &:not(.is-active) {
      cursor: pointer;
      &:hover {
        color: $brown-color;
      }
    }

    &.is-active {
      background-color: $light-orange-color;
      color: $brown-color;
    }
  }

  &__price {
    font-size: 14px;
    width: 50px;
    margin-left: 5px;
    text-align: right;
  }

  &__sign {
    font-family: $roboto-font;
  }

  &__icon {
    @include flex-justify(flex-end);
    width: 20px;
    text-align: right;
  }

  &__cross {
    &:hover {
      &::before,
      &::after {
        background-color: $dark-red-color;
      }
    }
  }
}
</style>
