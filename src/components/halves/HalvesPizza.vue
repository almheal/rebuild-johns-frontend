<template>
  <div class="halves-pizza">
    <HalvesPizzaHeader
      class="halves-pizza__header"
      :halvesHeader="halvesHeader"
    />
    <div class="halves-pizza__row">
      <div
        class="halves-pizza__picture"
        v-for="picture in getPictures"
        :key="picture.img"
      >
        <img
          class="halves-pizza__img"
          :src="require(`../../assets/img/${picture.emptyImg}`)"
          alt="left-half-pizza"
        />
        <img
          class="halves-pizza__img halves-pizza__img_is-hidden"
          :class="{ 'is-active': picture.half.title }"
          :src="require(`../../assets/img/${picture.img}`)"
          alt="left-half-pizza"
        />
      </div>
    </div>
    <div class="halves-pizza__text" v-if="!leftHalf.title || !rightHalf.title">
      {{ $t('app.halves.text') }}
    </div>

    <template v-if="leftHalf.title && rightHalf.title">
      <div class="halves-pizza__wrapper">
        <div class="halves-pizza__actions">
          <AppProductVarious
            v-if="options.length"
            class="halves-pizza__action"
            :items="options"
            :toShow="(item) => (item ? $t(item.variety) : '')"
            :modelValue="variety"
            @update:modelValue="$emit('update:variety', $event)"
          />

          <AppProductVarious
            v-if="variety?.sizes?.length"
            :items="variety?.sizes || []"
            :toShow="
              (item) => (item ? `${item.size.title} ${$t(item.size.unit)}` : '')
            "
            :modelValue="size"
            @update:modelValue="$emit('update:size', $event)"
          />
        </div>
        <div class="halves-pizza__total">
          <AppButton
            class="halves-pizza__button"
            @clickButton="$emit('toCart')"
          >
            {{ $t('app.utils.addToCart') }}
          </AppButton>
          <AppPrice :price="size?.price" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import HalvesPizzaHeader from '@components/halves/HalvesPizzaHeader'
import AppProductVarious from '@elements/AppProductVarious'
import AppButton from '@elements/AppButton'
import AppPrice from '@elements/AppPrice'

export default {
  name: 'HalvesPizza',
  components: {
    HalvesPizzaHeader,
    AppProductVarious,
    AppButton,
    AppPrice,
  },
  props: {
    leftHalf: {
      type: Object,
      default: () => ({}),
    },
    rightHalf: {
      type: Object,
      default: () => ({}),
    },
    variety: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
    halvesHeader: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getPictures() {
      return [
        {
          emptyImg: 'left-empty-half.svg',
          img: 'left-half.svg',
          half: this.leftHalf,
        },
        {
          emptyImg: 'empty-right-half.svg',
          img: 'right-half.svg',
          half: this.rightHalf,
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.halves-pizza {
  width: 46%;
  margin: 0 25px;
  background-color: $white-color;
  padding: 24px 20px 32px;
  border-radius: 25px;

  @media (max-width: 993px) {
    @include flex-align-center;
    margin: 0 0 15px;
    padding: 20px;
    min-height: 233px;
  }

  @media (max-width: 596px) {
    flex-direction: column;
  }

  @media (max-width: 424px) {
    padding: 20px 10px;
  }

  &__header {
    @media (max-width: 993px) {
      display: none;
    }
  }

  &__row {
    @include flex;
    min-height: 210px;

    @media (max-width: 993px) {
      margin-right: 10px;
      min-height: 160px;
    }
  }

  &__picture {
    position: relative;
    width: 50%;

    @media (max-width: 993px) {
      width: 136px;
    }

    @media (max-width: 424px) {
      width: 120px;
    }
  }

  &__img {
    width: 100%;

    &_is-hidden {
      @include absolute-default(0, 0);
      z-index: -1;
      width: 100%;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &.is-active {
      z-index: 5;
      opacity: 1;
    }
  }

  &__text {
    font-family: $gotham-font;
    font-size: 16px;
    color: $brown-color;
    line-height: 1.3;
    margin: 32px auto 0;
    text-align: center;
    max-width: 320px;

    @media (max-width: 993px) {
      margin-top: 0;
    }

    @media (max-width: 596px) {
      margin-top: 15px;
    }
  }

  &__wrapper {
    max-width: 244px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 993px) {
      max-width: 325px;
    }
  }

  &__actions {
    margin: 32px auto 32px;
  }

  &__action {
    margin-bottom: 8px;
  }

  &__total {
    @include flex-space-center;
    color: $brown-color;
    font-size: 18px;
    margin: 0 auto;
  }

  &__button {
    font-size: 16px;
  }
}
</style>
