<template>
  <div
    class="ingredients-item"
    @click="$emit('clickIngredient', id)"
    :class="{ 'is-active': count }"
  >
    <div class="ingredients-item__picture">
      <img class="ingredients-item__img" :src="img" alt="ingredient-img" />
    </div>
    <div class="ingredients-item__title">{{ title }}</div>
    <div class="ingredients-item__price">
      {{ price }} <span class="ingredients-item__sign">₽</span>
    </div>
    <button
      class="ingredients-item__button"
      :class="{ 'is-max': count >= 2 }"
    />
    <div class="ingredients-item__counter" v-if="count">{{ `x${count}` }}</div>
    <div
      class="ingredients-item__icon"
      v-if="count"
      @click.stop="$emit('reset', id)"
    >
      <TrashIcon />
    </div>
  </div>
</template>

<script>
import TrashIcon from '@icons/TrashIcon'

export default {
  name: 'ConstructorIngredientsItem',
  components: {
    TrashIcon,
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
    price: {
      type: String,
      default: '',
    },
    count: {
      type: [String, Number],
      default: 0,
    },
    id: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.ingredients-item {
  @include flex-space-center;
  flex-direction: column;
  flex: 0 0 calc(25% - 6px);
  min-height: 132px;

  position: relative;

  padding: 12px;
  margin: 0 8px 8px 0;

  border-radius: 10px;

  background-color: $smoky-white;

  font-family: $gotham-font;
  color: $brown-color;
  text-align: center;

  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: $dark-smoky-white;

    .ingredients-item__button,
    .ingredients-item__icon {
      opacity: 1;
    }
  }

  &.is-active {
    background-color: $light-orange-color;
  }

  &:nth-child(4n + 4) {
    margin-right: 0;
  }

  @media (max-width: 769px) {
    flex: 0 0 calc((100% / 3) - 6px);

    &:nth-child(4n + 4) {
      margin-right: 8px;
    }

    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }

  @media (max-width: 544px) {
    flex: 0 0 calc(50% - 6px);
    margin-right: 0;
    &:nth-child(4n + 4) {
      margin-right: 0;
    }

    &:nth-child(2n) {
      margin-left: 8px;
    }
  }

  @media (max-width: 380px) {
    flex: 0 0 100%;

    &:nth-child(2n) {
      margin-left: 0;
    }
  }

  &__picture {
    min-height: 50px;
    margin-bottom: 10px;
  }

  &__img {
    max-width: 100%;
  }

  &__title {
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 10px;
  }

  &__price {
    font-weight: 500;
  }

  &__sign {
    font-family: $roboto-font;
  }

  &__button {
    @include absolute-left-center;
    top: 20px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: $green-color;
    opacity: 0;
    transition: 0.3s;

    &::before,
    &::after {
      content: '';
      @include absolute-center;
      height: 4px;
      width: 16px;
      background-color: $white-color;
      transition: opacity 0.15s;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }

    &.is-max {
      background-color: $dark-red-color;
      &::after {
        opacity: 0;
      }
    }
  }

  &__counter {
    @include absolute-top-right(6px, 6px);
    font-size: 12px;

    @media (max-width: 1024px) {
      right: initial;
      left: 6px;
    }
  }

  &__icon {
    @include absolute-bottom-default(4px, 4px);
    z-index: 5;
    color: $dark-red-color;
    opacity: 0;
    transition: opacity 0.3s;

    @media (max-width: 1024px) {
      @include flex-center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: $white-color;
      background-color: $dark-red-color;
      opacity: 1;
      bottom: initial;
      left: initial;
      top: -12px;
      right: -12px;
    }

    @media (max-width: 544px) {
      width: 42px;
      height: 42px;
      top: -6px;
      right: -6px;
    }
  }
}
</style>
