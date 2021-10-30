<template>
  <button
    class="burger-button"
    type="button"
    data-test="button"
    :class="{ 'is-cross': isCross }"
    @click="$emit('clickButton')"
  >
    <div class="burger-button__list">
      <span class="burger-button__line" />
      <span class="burger-button__line" />
      <span class="burger-button__line" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'AppBurgerButton',
  emits: ['clickButton'],
  props: {
    isCross: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.burger-button {
  @include flex-center;
  flex-direction: column;
  width: 50px;
  height: 50px;

  &.is-cross {
    .burger-button__line {
      width: 16px;
      border-radius: 6px;
      background-color: $pale-grey-color;

      &:first-child {
        opacity: 0;
      }

      &:nth-child(2),
      &:nth-child(3) {
        left: 50%;
        top: 50%;
      }

      &:nth-child(2) {
        transform: translate(-50%, -50%) rotate(-45deg);
        transition: 0.3s;
      }

      &:nth-child(3) {
        transform: translate(-50%, -50%) rotate(45deg);
        transition: 0.3s;
      }
    }
  }

  &:hover {
    .burger-button__line {
      background-color: $green-color;
    }
  }

  &__list {
    position: relative;
    width: 20px;
    height: 13px;
  }

  &__line {
    width: 20px;
    height: 3px;
    background-color: $light-grey-color;
    transition: 0.3s;

    &:first-child {
      @include absolute-default;
    }

    &:nth-child(2) {
      @include absolute-default(0, 5px);
    }

    &:last-child {
      @include absolute-bottom-default;
    }
  }
}
</style>
