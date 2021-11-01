<template>
  <div class="tags-filter">
    <div
      class="tags-filter__item"
      v-for="item in list"
      :class="{ 'is-active': activeTags.includes(item) }"
      :key="item"
      @click="$emit('clickFilter', item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTagsFilter',
  emits: ['clickFilter'],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    activeTags: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.tags-filter {
  @include flex-align-center;
  flex-wrap: wrap;
  margin-bottom: 15px;

  @media (max-width: 577px) {
    display: none;
  }

  &__item {
    border: 1px solid $wolf-grey-color;
    padding: 8px 16px;
    border-radius: 100px;
    cursor: pointer;
    margin: 0 8px 8px 0;
    user-select: none;
    transition: background-color 0.3s;

    &:not(.is-active) {
      @include green-color-hover;
    }

    &.is-active {
      color: $brown-color;
      background-color: $dark-smoky-white;
      border-color: $dark-smoky-white;
    }
  }
}
</style>
