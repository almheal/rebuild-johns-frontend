<template>
  <div
    class="app-poppup"
    ref="poppup"
    :style="{ width: width + 'px' }"
    :class="{
      right: sidePoppup === 'right',
      'background-white': backgroundColor === 'white',
    }"
    @click.stop
  >
    <h5 class="app-poppup__title" v-if="title">{{ title }}</h5>
    <ul class="app-poppup__list">
      <li class="app-poppup__item" v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppPoppup',
  props: {
    title: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: '',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    side: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    sidePoppup: '',
  }),

  computed: {
    ...mapState({
      bodyWidth: (state) => state.bodyWidth,
    }),
  },

  watch: {
    bodyWidth() {
      this.calculatePositionSide()
    },
  },

  methods: {
    calculatePositionSide() {
      const { x } = this.$refs.poppup.getBoundingClientRect()
      const poppupWidth = this.$refs.poppup.clientWidth

      if (x + poppupWidth + 100 > this.bodyWidth) {
        this.sidePoppup = 'right'
      } else {
        this.sidePoppup = ''
      }
    },
  },

  mounted() {
    this.calculatePositionSide()
  },
}
</script>

<style lang="scss" scoped>
.app-poppup {
  @include absolute-bottom-default(-12px, calc(100% + 12px));
  z-index: 1000;
  padding: 14px;
  border-radius: 10px;
  background-color: $brown-color;
  color: $white-color;
  font-weight: 400;
  line-height: 1.3;
  cursor: initial;

  &.right {
    bottom: calc(100% + 12px);
    right: -12px;
    left: initial;

    &::before {
      bottom: 1px;
      right: 12px;
      left: initial;
    }
  }

  &::before {
    @include absolute-bottom-default(12px, 1px);
    content: '';
    transform: translateY(100%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid $brown-color;
  }

  &.background-white {
    background-color: $white-color;
    color: $brown-color;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);

    &::before {
      border-top-color: $white-color;
    }
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    margin-bottom: 8px;
  }

  &__item {
    margin-bottom: 2px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
