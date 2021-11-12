<template>
  <div class="product-various">
    <div
      class="product-various__item"
      v-for="(item, index) in items"
      data-test="various-item"
      :class="{ 'is-active': toShow(item) === toShow(modelValue) }"
      :key="index"
      @click="$emit('update:modelValue', item)"
    >
      {{ toShow(item) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppProductVarious',
  emits: ['update:modelValue'],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    toShow: {
      type: Function,
      default: (item) => item,
    },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.product-various {
  @include flex;
  height: 36px;
  border: 1px solid $dark-smoky-white;
  border-radius: 100px;

  &__item {
    @include flex-center;
    flex: 1 1 0;
    border-radius: 100px;
    cursor: default;
    user-select: none;
    transition: 0.3s;

    &:not(.is-active) {
      cursor: pointer;
      @include green-color-hover;
    }

    &.is-active {
      color: $brown-color;
      background-color: $dark-smoky-white;
    }
  }
}
</style>
