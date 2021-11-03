<template>
  <div class="constructor-product">
    <div class="constructor-product__picture">
      <img
        class="constructor-product__img"
        v-if="!img"
        src="../../assets/img/constructor-product.png"
        alt="default-product-img"
      />
      <img
        class="constructor-product__img"
        v-else
        :src="img"
        alt="product-img"
      />
    </div>
    <div class="constructor-product__title">
      <input
        class="constructor-product__input"
        type="text"
        :placeholder="placeholder || $t('app.utils.comeUpName')"
        @input="$emit('update:title', $event.target.value)"
      />
      <PenIcon class="constructor-product__pen" />
    </div>
    <AppProductVarious
      class="constructor-product__various"
      :items="varieties"
      :modelValue="activeVariety"
      :toShow="(item) => $t(item.variety || '')"
      @update:modelValue="$emit('update:activeVariety', $event)"
    />
    <AppProductVarious
      :items="sizes"
      :modelValue="activeSize"
      :toShow="(item) => `${item.size?.title} ${$t(item.size?.unit || '')}`"
      @update:modelValue="$emit('update:activeSize', $event)"
    />
  </div>
</template>

<script>
import AppProductVarious from '@elements/AppProductVarious'
import PenIcon from '@icons/PenIcon'

export default {
  name: 'ConstructorProduct',
  components: {
    AppProductVarious,
    PenIcon,
  },
  props: {
    img: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    varieties: {
      type: Array,
      default: () => [],
    },
    activeVariety: {
      type: Object,
      default: () => ({}),
    },
    activeSize: {
      type: Object,
      default: () => ({}),
    },
    sizes: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.constructor-product {
  padding-bottom: 32px;
  &__picture {
    margin-bottom: 20px;
  }

  &__img {
    max-width: 100%;
  }

  &__title {
    position: relative;
    margin: 0 20px 30px;
  }

  &__input {
    padding: 0 30px;
    font-family: $gotham-font;
    font-weight: 500;
    font-size: 18px;
    color: $brown-color;
    text-align: center;
    width: 100%;

    &::placeholder {
      color: $light-grey-color;
    }
  }

  &__pen {
    @include absolute-top-center-right(0);
    fill: $dark-smoky-white;
    width: 16px;
    height: 16px;
  }

  &__various {
    margin-bottom: 8px;
  }
}
</style>
