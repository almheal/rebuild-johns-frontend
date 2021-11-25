<template>
  <carousel
    class="carousel"
    :settings="settings"
    :breakpoints="breakpoints"
    :touchDrag="touchDrag"
  >
    <slide
      class="carousel__slide"
      v-for="(slide, index) in slides"
      :key="index"
    >
      <div class="carousel__content">
        <slot :slide="slide" :index="index"></slot>
      </div>
    </slide>

    <template #addons>
      <navigation />
      <pagination class="carousel__pagination" />
    </template>
  </carousel>
</template>

<script>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Object,
      default: () => ({}),
    },
    breakpoints: {
      type: Object,
      default: () => ({}),
    },
    touchDrag: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  overflow: hidden;
  padding: 20px 0;

  &__slide {
    max-height: 360px;
    padding: 0 15px;

    @media (max-width: 667px) {
      padding: 0;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>

<style lang="scss">
.carousel {
  &__slide {
    transition: opacity 0.3s;

    &:not(.carousel__slide--active) {
      opacity: 0.5;
    }
  }

  &__prev,
  &__next {
    width: 48px;
    height: 48px;
    background-color: $white-color;
    transform: translateY(-50%);
    font-size: 24px;
    color: $primary-color;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-50%) scale(1.09);
    }

    @media (max-width: 667px) {
      width: 36px;
      height: 36px;
    }

    @media (max-width: 420px) {
      display: none;
    }
  }

  &__next {
    right: 32px;
  }

  &__prev {
    left: 32px;
  }
}
.carousel__pagination {
  margin-top: 15px;

  &-button {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: 0 3px;
    background-color: rgba($black-color, 0.2);
    transition: background-color 0.3s;

    &--active {
      background-color: $green-color;
    }
  }
}
</style>
