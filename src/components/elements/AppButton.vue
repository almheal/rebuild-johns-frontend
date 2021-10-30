<template>
  <button
    class="app-button"
    data-test="button"
    :class="{
      'is-loading': loading,
      'gotham-font': font === 'gotham',
      'transparent-view': view === 'transparent',
      uppercase: textTransform === 'uppercase',
    }"
    :disabled="disabled || loading"
    :type="buttonType"
    @click="$emit('clickButton')"
  >
    <slot></slot>
    <AppCircleLoader class="app-button__loader" v-if="loading" />
  </button>
</template>

<script>
import AppCircleLoader from '@elements/AppCircleLoader'

export default {
  name: 'AppButton',
  components: {
    AppCircleLoader,
  },
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
    loading: {
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

  &.is-loading {
    color: transparent;
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

    &:hover {
      &::before {
        transform: scale(1);
      }
    }

    &:not(.is-loading) {
      color: $light-grey-color;

      &::before {
        background-color: $smoky-white;
      }
    }
  }

  &__loader {
    @include absolute-center;
  }
}
</style>
