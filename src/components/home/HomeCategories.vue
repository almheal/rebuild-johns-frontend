<template>
  <div class="home-categories" :class="{ 'is-loading': loading }">
    <AppCircleLoader v-if="loading" color="green" size="medium" />
    <template v-else>
      <HomeCategoriesItem
        v-for="category in categories"
        :key="category.title"
        :img="category.icon"
        :title="$t(category.title)"
        :width="100 / categories.length"
        @clickCategory="$emit('clickCategory', category)"
      />
    </template>
  </div>
</template>

<script>
import HomeCategoriesItem from '@components/home/HomeCategoriesItem'
import AppCircleLoader from '@elements/AppCircleLoader'

export default {
  name: 'HomeCategories',
  components: {
    HomeCategoriesItem,
    AppCircleLoader,
  },
  emits: ['clickCategory'],
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.home-categories {
  @include flex;
  min-height: 100px;
  border-radius: 25px;
  background-color: $white-color;
  box-shadow: 0 0 10px rgba(69, 69, 69, 0.1);
  padding: 20px 0;

  &.is-loading {
    justify-content: center;
    align-items: center;
  }
}
</style>
