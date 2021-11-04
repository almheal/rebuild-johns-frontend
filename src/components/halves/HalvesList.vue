<template>
  <div
    class="halves__list"
    :class="{ 'is-active': isShow, 'is-loading': loading }"
  >
    <AppCircleLoader v-if="loading" color="green" size="medium" />
    <template v-else>
      <div
        class="halves-product"
        v-for="product in products"
        :key="product._id"
        :class="{
          'is-disabled': product._id === disabledHalfId,
          'is-active': product._id === activeHalfId,
        }"
        @click="clickHalf(product)"
      >
        <div class="halves-product__header">
          <div class="halves-product__title">{{ $t(product.title) }}</div>
          <div class="halves-product__features" v-if="product.features.length">
            <img
              class="halves-product__feature"
              v-for="feature in product.features"
              :key="feature._id"
              :src="feature.icon"
              alt="feature-img"
            />
          </div>
        </div>
        <div class="halves-product__description">
          {{ $t(product.description) }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AppCircleLoader from '@elements/AppCircleLoader'

export default {
  name: 'HalvesList',
  components: {
    AppCircleLoader,
  },
  props: {
    products: {
      type: Array,
      default: () => {},
    },
    disabledHalfId: {
      type: String,
      default: '',
    },
    activeHalfId: {
      type: String,
      default: '',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickHalf(product) {
      if (product._id === this.disabledHalfId) {
        return
      }

      this.$emit('clickHalf', product)
    },
  },
}
</script>

<style lang="scss" scoped>
.halves {
  &__list {
    width: calc(27% - 25px);

    &.is-loading {
      @include flex-center;
    }

    @media (max-width: 993px) {
      width: calc(50%);
    }

    @media (max-width: 424px) {
      position: fixed;
      left: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      background-color: $white-color;
      width: 100%;
      height: 100vh;
      overflow: auto;
      transition: 0.7s;

      &.is-active {
        left: 0%;
      }
    }
  }

  &-product {
    position: relative;
    border-radius: 25px;
    background-color: $white-color;
    padding: 16px 20px;
    margin-bottom: 8px;
    border: 6px solid $pale-blue-color;

    transition: border-color 0.3s;

    @media (max-width: 424px) {
      border-radius: 0;
      border: none;
      border-bottom: 1px solid $dark-smoky-white;
    }

    &:not(.is-disabled) {
      cursor: pointer;
    }

    &.is-disabled {
      &::before {
        z-index: 5;
        opacity: 1;
      }
    }

    &::before {
      @include absolute-default(0, 0);
      content: '';
      z-index: -5;
      width: 100%;
      height: 100%;
      border-radius: 25px;
      background-color: rgba($white-color, 0.35);
      opacity: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &.is-active {
      border-color: $green-color;
    }

    &__header {
      @include flex-space-center;
      margin-bottom: 8px;
    }

    &__title {
      font-family: $gotham-font;
      font-size: 18px;
      margin-right: 10px;
      color: $brown-color;
    }

    &__features {
      @include flex;
    }

    &__feature {
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__description {
      font-size: 12px;
      line-height: 1.3;
    }
  }
}
</style>
