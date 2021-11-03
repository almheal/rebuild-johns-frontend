<template>
  <div class="constructor-ingredients">
    <AppToggleList
      class="constructor-ingredients__toggle"
      :list="categories"
      :toShow="(item) => $t(item)"
      :toActive="(item) => item === activeCategory"
      @toggleItem="$emit('changeCategory', $event)"
    />

    <div class="constructor-ingredients__list">
      <ConstructorIngredientsItem
        v-for="ingredient in ingredients"
        :key="ingredient._id"
        :img="ingredient.icon"
        :title="$t(ingredient.title)"
        :price="$t(ingredient.price)"
        :id="ingredient._id"
        :count="ingredientsCounter[ingredient._id]"
        @clickIngredient="$emit('clickIngredient', $event)"
        @reset="$emit('resetIngredient', $event)"
      />
    </div>
  </div>
</template>

<script>
import AppToggleList from '@elements/AppToggleList'
import ConstructorIngredientsItem from '@components/constructor/ConstructorIngredientsItem'

export default {
  name: 'ConstructorIngredients',
  components: {
    AppToggleList,
    ConstructorIngredientsItem,
  },
  emits: ['changeCategory'],
  props: {
    ingredients: {
      type: Array,
      default: () => [],
    },
    ingredientsCounter: {
      type: Object,
      default: () => ({}),
    },
    categories: {
      type: Array,
      default: () => [],
    },
    activeCategory: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.constructor-ingredients {
  &__toggle {
    padding: 0;
    font-size: 12px;

    @media (max-width: 769px) {
      font-size: 16px;
    }
  }

  &__list {
    @include flex;
    flex-wrap: wrap;
    padding: 24px 0;
  }
}
</style>
