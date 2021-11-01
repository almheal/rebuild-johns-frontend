<template>
  <div class="ingredients-filter" :class="{ 'is-loading': loading }">
    <template v-if="!loading">
      <div
        class="ingredients-filter__list"
        v-for="(ingredients, categoryTitle) in ingredientsByCategories"
        :key="categoryTitle"
      >
        <div class="ingredients-filter__category">{{ $t(categoryTitle) }}</div>
        <div
          class="ingredients-filter__item"
          v-for="ingredient in ingredients"
          :class="{
            'is-active': activeIngredientsIds.includes(ingredient._id),
            'is-disabled': !pizzasIngredientsIds.includes(ingredient._id),
          }"
          :key="ingredient._id"
          @click="$emit('clickIngredient', ingredient)"
        >
          <CheckMarkIcon class="ingredients-filter__mark" />
          {{ $t(ingredient.title) }}
        </div>
      </div>
    </template>
    <AppCircleLoader v-else size="medium" color="green" />
  </div>
</template>

<script>
import CheckMarkIcon from '@icons/CheckMarkIcon'
import AppCircleLoader from '@elements/AppCircleLoader'

export default {
  name: 'HomeIngredientsFilter',
  components: {
    CheckMarkIcon,
    AppCircleLoader,
  },
  emits: ['clickIngredient'],
  props: {
    ingredients: {
      type: Array,
      default: () => [],
    },
    activeIngredientsIds: {
      type: Array,
      default: () => [],
    },
    pizzasIngredientsIds: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ingredientsByCategories() {
      return this.ingredients.reduce((acc, ingredient) => {
        if (!acc[ingredient.category]) {
          acc[ingredient.category] = []
        }

        acc[ingredient.category].push(ingredient)
        return acc
      }, {})
    },
  },
}
</script>

<style lang="scss" scoped>
.ingredients-filter {
  @include flex-justify-space;
  background-color: $white-color;
  padding: 20px 48px;
  border-radius: 10px;
  margin-bottom: 24px;

  &.is-loading {
    justify-content: center;
    align-items: center;
  }

  &__list {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__category {
    font-family: $gotham-font;
    color: $brown-color;
    margin-bottom: 10px;
    padding-left: 30px;
    user-select: none;
  }

  &__item {
    position: relative;
    margin-bottom: 5px;
    padding: 5px 15px 5px 30px;
    text-transform: lowercase;
    color: $brown-color;
    border-radius: 1px;
    cursor: default;
    user-select: none;
    transition: 0.3s;

    &.is-active {
      color: $green-color;

      .ingredients-filter__mark {
        color: $green-color;
        opacity: 1;
      }
    }

    &.is-disabled {
      color: $wolf-grey-color;
      text-decoration: line-through;
    }

    &:not(.is-active):not(.is-disabled) {
      cursor: pointer;

      &:hover {
        background-color: $smoky-white;

        .ingredients-filter__mark {
          opacity: 1;
        }
      }
    }
  }

  &__mark {
    @include absolute-top-center(7px);
    width: 16px;
    height: 16px;
    color: $light-grey-color;
    opacity: 0;
    transition: 0.3s;
  }
}
</style>
