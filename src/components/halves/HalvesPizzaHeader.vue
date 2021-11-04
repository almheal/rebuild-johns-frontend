<template>
  <div class="halves-pizza__header">
    <div
      class="halves-pizza__half"
      v-for="(item, index) in halvesHeader"
      :key="index"
      @click="$emit('clickHalf', item.side)"
    >
      <div class="halves-pizza__suptitle">{{ $t(item.text) }}</div>
      <div
        class="halves-pizza__title"
        :class="{ 'is-active': item.half.title }"
      >
        {{ $t(item.half.title ? item.half.title : 'app.halves.notSelected') }}
      </div>
      <ArrowDownIcon class="halves-pizza__arrow" />
    </div>
  </div>
</template>

<script>
import ArrowDownIcon from '@icons/ArrowDownIcon'

export default {
  name: 'HalvesPizzaHeader',
  components: {
    ArrowDownIcon,
  },
  props: {
    halvesHeader: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.halves-pizza {
  &__header {
    @include flex-justify-space;
    margin-bottom: 70px;

    @media (max-width: 993px) {
      margin-bottom: 20px;
    }

    @media (max-width: 424px) {
      flex-direction: column;
    }
  }

  &__title {
    font-family: $gotham-font;
    font-size: 16px;
    color: $wolf-grey-color;
    transition: color 0.3s;

    &.is-active {
      color: $brown-color;
    }

    @media (max-width: 424px) {
      order: -1;
      margin-bottom: 10px;
    }
  }

  &__suptitle {
    margin-bottom: 10px;

    @media (max-width: 424px) {
      margin-bottom: 0;
    }
  }

  &__half {
    position: relative;

    &:nth-child(2) {
      text-align: right;
    }

    @media (max-width: 424px) {
      @include flex;
      flex-direction: column;
      background-color: $white-color;
      padding: 12px 45px 12px 16px;
      margin-bottom: 2px;
      border-radius: 4px;
      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }

      &:nth-child(2) {
        text-align: left;
      }
    }
  }

  &__arrow {
    @include absolute-top-center-right(16px);
    transform: translateY(-50%) rotate(-90deg);
    fill: $primary-color;
    display: none;

    @media (max-width: 424px) {
      display: block;
    }
  }
}
</style>
