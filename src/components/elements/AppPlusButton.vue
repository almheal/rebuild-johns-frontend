<template>
  <button
    class="plus-button"
    :class="{ 'background-grey': backgroundColor === 'grey' }"
  />
</template>

<script>
export default {
  name: 'AppPlusButton',
  props: {
    backgroundColor: {
      type: String,
      default: 'green',
    },
  },
}
</script>

<style lang="scss" scoped>
.plus-button {
  position: relative;
  width: 16px;
  height: 16px;
  background-color: $green-color;
  border-radius: 50%;
  transition: background-color 0.3s;

  &::before,
  &::after {
    @include absolute-center;
    content: '';
    width: 8px;
    height: 2px;
    background-color: $white-color;
  }

  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  &.background-grey {
    background-color: $light-grey-color;
  }
}
</style>
