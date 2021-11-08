<template>
  <div class="home-slider">
    <AppCarousel
      :slides="sliderImageUrls"
      :settings="settings"
      :breakpoints="breakpoints"
    >
      <template v-slot="props">
        <picture>
          <source
            :srcset="props.slide.defaultWebp?.url"
            :media="props.slide.defaultWebp?.media"
            type="image/webp"
          />
          <source
            v-for="(url, key) in props.slide.webp"
            :key="url"
            :srcset="url"
            :media="key"
            type="image/webp"
          />
          <source
            v-for="(url, key) in props.slide.jpg"
            :key="url"
            :srcset="url"
            :media="key"
            type="image/jpeg"
          />
          <img
            class="home-slider__img"
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
    border-radius: 10px;

    @media (max-width: 524px) {
      border-radius: 0;
    }
  }
}
</style>
