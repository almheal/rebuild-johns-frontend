<template>
  <div class="app-dropdown" :class="{ 'is-open': isOpen }">
    <div class="app-dropdown__placeholder" @click.stop="toggle">
      {{ toShow(modelValue) }}
      <ArrowDownIcon class="app-dropdown__arrow" />
    </div>
    <ul class="app-dropdown__list" v-if="isOpen">
      <li
        class="app-dropdown__item"
        v-for="(item, index) in list"
        :key="index"
        :class="{ 'is-active': toShow(item) === toShow(modelValue) }"
        @click="select(item)"
      >
        {{ toShow(item) }}
      </li>
    </ul>
  </div>
</template>

<script>
import ArrowDownIcon from '@icons/ArrowDownIcon'

export default {
  name: 'AppDropdown',
  components: {
    ArrowDownIcon,
  },
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: '',
    },
    toShow: {
      type: Function,
      default: (item) => item,
    },
    list: {
      type: [Array, Object],
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    select(item) {
      this.toggle()
      this.$emit('update:modelValue', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.app-dropdown {
  &.is-open {
    .app-dropdown {
      &__placeholder {
        background-color: $light-smoky-white;
      }

      &__arrow {
        transform: translateY(-50%) rotate(-180deg);
      }
    }
  }

  &__placeholder {
    @include flex-align-center;
    position: relative;
    height: 49px;
    padding: 12px 28px 12px 16px;
    border-radius: 2px;
    font-weight: inherit;
    background-color: $smoky-white;
    color: $brown-color;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s;
  }

  &__arrow {
    @include absolute-top-center-right(10px);
    fill: $brown-color;
    transition: transform 0.3s;
  }

  &__list {
    @include absolute-default(0, calc(100% + 5px));
    width: 100%;
    border-radius: 2px;
    background-color: $white-color;
    box-shadow: 0 2px 12px 0 rgba(41, 44, 51, 0.2);
  }

  &__item {
    padding: 12px 16px;
    font-weight: 400;
    color: $brown-color;
    cursor: pointer;
    transition: background-color 0.3s;

    &:last-child {
      border-radius: 0 0 2px 2px;
    }

    &.is-active {
      background-color: $pale-blue-color;
    }

    &:not(.is-active) {
      &:hover {
        background-color: $light-smoky-white;
      }
    }
  }
}
</style>
