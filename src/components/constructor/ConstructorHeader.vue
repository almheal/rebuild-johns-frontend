<template>
  <div class="constructor__header">
    <button class="constructor__back" @click="$emit('toBack')">
      <ArrowDownIcon class="constructor__arrow" />
      <span>{{ buttonText }}</span>
    </button>
    <slot></slot>
  </div>
</template>

<script>
import ArrowDownIcon from '@icons/ArrowDownIcon'

export default {
  name: 'ConstructorHeader',
  components: {
    ArrowDownIcon,
  },
  props: {
    buttonText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.constructor {
  &__header {
    @include flex-space-center;
    padding: 15px 20px;
  }

  &__back {
    @include flex-align-center;
    color: $light-grey-color;
    font-family: $gotham-font;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: $green-color;

      .constructor__arrow {
        fill: $green-color;
      }
    }
  }

  &__arrow {
    margin-right: 8px;
    fill: $light-grey-color;
    transform: rotate(90deg);
    transition: fill 0.3s;
  }
}
</style>
