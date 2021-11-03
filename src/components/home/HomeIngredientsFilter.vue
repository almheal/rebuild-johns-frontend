<template>
  <div class="ingredients-filter" :class="{ 'is-loading': loading }">
    <template v-if="!loading">
      <div class="ingredients-filter__header" @click="$emit('back')">
        <ArrowDownIcon class="ingredients-filter__arrow" />
        <div class="ingredients-filter__title">
          {{ $t('app.utils.filterPizza') }}
        </div>
      </div>
      <AppToggleList
        class="ingredients-filter__toggle"
        :list="categoryTitles"
        :toShow="(item) => $t(item)"
        :toActive="(item) => $t(item) === $t(getActiveCategory)"
        @toggleItem="activeCategory = $event"
      />
      <div
        class="ingredients-filter__list"
        v-for="(ingredients, categoryTitle) in ingredientsByCategories"
        :class="{ 'is-active': categoryTitle === getActiveCategory }"
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
          <AppCheckbox
            class="ingredients-filter__checkbox"
            :modelValue="activeIngredientsIds.includes(ingredient._id)"
          />
          <div class="ingredients-filter__name">{{ $t(ingredient.title) }}</div>
        </div>
      </div>
    </template>
    <AppCircleLoader v-else size="medium" color="green" />
  </div>
</template>

<script>
import CheckMarkIcon from '@icons/CheckMarkIcon'
import AppCircleLoader from '@elements/AppCircleLoader'
import AppToggleList from '@elements/AppToggleList'
import ArrowDownIcon from '@icons/ArrowDownIcon'
import AppCheckbox from '@elements/AppCheckbox'

export default {
  name: 'HomeIngredientsFilter',
  components: {
    CheckMarkIcon,
    AppCircleLoader,
    AppToggleList,
    ArrowDownIcon,
    AppCheckbox,
  },
  emits: ['clickIngredient', 'back'],
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
  data: () => ({
    activeCategory: '',
  }),
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

    categoryTitles() {
      return Object.keys(this.ingredientsByCategories)
    },

    getActiveCategory() {
      return this.activeCategory || this.categoryTitles[0]
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

  @media (max-width: 769px) {
    @include fixed-full;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 1000;
    padding: 0;
    overflow: auto;
  }

  &__header {
    display: none;
    padding: 15px 20px 8px;
    font-family: $gotham-font;
    font-weight: 500;
    cursor: pointer;

    @media (max-width: 769px) {
      @include flex-align-center;
    }
  }

  &__arrow {
    transform: rotate(90deg);
    fill: $primary-color;
  }

  &__title {
    margin-left: 24px;
  }

  &__toggle {
    display: none;
    padding-left: 24px;
    @media (max-width: 769px) {
      display: flex;
    }
  }

  &.is-loading {
    justify-content: center;
    align-items: center;
  }

  &__list {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    @media (max-width: 769px) {
      padding: 25px 0;

      &:not(.is-active) {
        display: none;
      }
    }
  }

  &__category {
    font-family: $gotham-font;
    color: $brown-color;
    margin-bottom: 10px;
    padding-left: 30px;
    user-select: none;

    @media (max-width: 769px) {
      display: none;
    }
  }

  &__item {
    @include flex-align-center;
    position: relative;
    margin-bottom: 5px;
    padding: 5px 15px 5px 30px;
    text-transform: lowercase;
    color: $brown-color;
    border-radius: 1px;
    cursor: default;
    user-select: none;
    transition: 0.3s;

    @media (max-width: 769px) {
      font-weight: 500;
      padding: 6px 20px;
      font-size: 16px;
    }

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

  &__checkbox {
    display: none;
    @media (max-width: 769px) {
      display: flex;
    }
  }

  &__mark {
    @include absolute-top-center(7px);
    width: 16px;
    height: 16px;
    color: $light-grey-color;
    opacity: 0;
    transition: 0.3s;

    @media (max-width: 769px) {
      display: none;
    }
  }
}
</style>
