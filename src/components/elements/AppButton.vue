<template>
  <button
    class="app-button"
    data-test="button"
    :class="{
      'gotham-font': font === 'gotham',
      'transparent-view': view === 'transparent',
      uppercase: textTransform === 'uppercase',
    }"
    :disabled="disabled"
    :type="buttonType"
    @click="$emit('clickButton')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  emits: ['clickButton'],
  props: {
    buttonType: {
      type: String,
      default: 'button',
    },
    font: {
      type: String,
      default: 'roboto',
    },
    view: {
      type: String,
      default: 'green-view',
    },
    textTransform: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.app-button {
  @include flex-center;
  position: relative;
  z-index: 1;
  height: 48px;
  padding: 15px 25px;
  border-radius: 24px;
  font-weight: 700;
  font-size: 16px;
  color: $white-color;

  &::before {
    content: '';
    @include absolute-default;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    background-color: $green-color;
    transition: transform 0.3s;
  }

  &:hover {
    &::before {
      transform: scale(1.07);
    }
  }

  &.transparent-view {
    color: $green-color;
    &::before {
      background-color: $pale-green-color;
    }
  }

  &.uppercase {
    text-transform: uppercase;
  }

  &.gotham-font {
    font-family: $gotham-font;
  }

  &:disabled {
    cursor: default;
    color: $light-grey-color;

    &::before {
      background-color: $smoky-white;
    }

    &:hover {
      &::before {
        transform: scale(1);
      }
    }
  }
}
</style>
