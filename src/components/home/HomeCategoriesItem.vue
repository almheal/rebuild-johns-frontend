<template>
  <div
    class="home-categories__item"
    :style="{ width: width + '%' }"
    @click="$emit('clickCategory')"
  >
    <div class="home-categories__picture">
      <img class="home-categories__img" :src="img" alt="category-image" />
    </div>
    <div class="home-categories__title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'HomeCategoriesItem',
  emits: ['clickCategory'],
  props: {
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.home-categories {
  &__item {
    @include flex-space-center;
    flex-direction: column;
    text-align: center;
    color: $brown-color;
    cursor: pointer;

    @include green-color-hover;
  }

  &__img {
    height: 52px;
    width: 52px;
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 20px;

    @media (max-width: 993px) {
      display: none;
    }
  }
}
</style>
