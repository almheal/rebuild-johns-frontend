<template>
  <div class="home-slider">
    <AppCarousel
      :slides="sliderImageUrls"
      :settings="settings"
      :breakpoints="breakpoints"
    >
      <template v-slot="props">
        <picture>
          <img
            class="home-slider__img"
            v-if="props.index"
            v-lazy="props.slide.defaultWebp?.url"
            alt="slider-image"
          />
          <img
            class="home-slider__img"
            v-else
            :src="props.slide.defaultWebp?.url"
            alt="slider-image"
          />
        </picture>
      </template>
    </AppCarousel>
  </div>
</template>

<script>
import AppCarousel from '@elements/AppCarousel'
import { sliderImageUrls } from '@/const/slider'

export default {
  name: 'HomeSlider',
  components: {
    AppCarousel,
  },
  data: () => ({
    sliderImageUrls,
    settings: {
      wrapAround: true,
      touchDrag: true,
    },
    breakpoints: {
      1400: {
        itemsToShow: 1.8,
      },
      1024: {
        itemsToShow: 1.4,
      },
      700: {
        itemsToShow: 1,
      },
    },
  }),
}
</script>

<style lang="scss" scoped>
.home-slider {
  &__img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    border-radius: 10px;

    @media (max-width: 1024px) {
      width: auto;
      height: auto;
    }

    @media (max-width: 524px) {
      border-radius: 0;
    }
  }
}
</style>
