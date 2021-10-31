<template>
  <div class="home-categories">
    <HomeCategoriesItem
      v-for="category in categories"
      :key="category.title"
      :img="category.icon"
      :title="$t(category.title)"
      :width="100 / categories.length"
      @clickCategory="$emit('clickCategory', category)"
    />
  </div>
</template>

<script>
import HomeCategoriesItem from '@components/home/HomeCategoriesItem'

export default {
  name: 'HomeCategories',
  components: {
    HomeCategoriesItem,
  },
  emits: ['clickCategory'],
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.home-categories {
  @include flex;
  border-radius: 25px;
  background-color: $white-color;
  box-shadow: 0 0 10px rgba(69, 69, 69, 0.1);
  padding: 20px 0;
}
</style>
