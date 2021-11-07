<template>
  <ul class="header-categories">
    <li
      class="header-categories__item"
      v-for="category in categories"
      :key="category._id"
      @click="$emit('clickCategory', category._id)"
    >
      {{ $t(category.title) }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HeaderCategories',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.header-categories {
  @include flex;
  height: 100%;
  overflow: auto;

  &__item {
    @include flex-center;
    position: relative;
    padding: 0 10px;
    font-family: $gotham-font;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    color: $brown-color;
    cursor: pointer;

    &:hover {
      &::after {
        opacity: 1;
      }
    }

    &::after {
      content: '';
      @include absolute-left-center;
      bottom: 0;
      width: calc(100% - 20px);
      height: 4px;
      background-color: $dark-red-color;
      opacity: 0;
      transition: opacity 0.3s;
    }
  }
}
</style>
