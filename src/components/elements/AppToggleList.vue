<template>
  <ul class="toggle-list">
    <li
      class="toggle-list__item"
      data-test="item"
      v-for="(item, index) in list"
      :class="{ 'is-active': toActive(item) }"
      :key="index"
      @click="$emit('toggleItem', item)"
    >
      {{ toShow(item) }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppToggleList',
  emits: ['toggleItem'],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    toShow: {
      type: Function,
      default: (item) => item,
    },
    toActive: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle-list {
  @include flex-align-center;
  padding: 0 8px;
  border-bottom: 1px solid $dark-smoky-white;

  &__item {
    position: relative;
    font-family: $gotham-font;
    padding: 15px 12px;
    user-select: none;
    cursor: pointer;

    @include green-color-hover;

    &::after {
      content: '';
      @include absolute-left-center;
      bottom: 0;
      width: calc(100% - 24px);
      height: 3px;
      background-color: $green-color;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &.is-active {
      color: $green-color;

      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
