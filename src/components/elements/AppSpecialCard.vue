<template>
  <div class="app-card">
    <div class="app-card__body">
      <div class="app-card__wrapper">
        <div class="app-card__title" v-if="title">{{ title }}</div>
        <div class="app-card__picture" v-if="img">
          <img
            class="app-card__img"
            v-lazy="require(`../../assets/img/${img}`)"
            alt="card-img"
          />
        </div>
      </div>
      <div class="app-card__wrapper">
        <AppButton
          class="app-card__button"
          v-if="buttonText"
          view="transparent"
          textTransform="uppercase"
          font="gotham"
          @clickButton="$emit('clickButton')"
          >{{ buttonText }}</AppButton
        >
        <div class="app-card__description">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@elements/AppButton'

export default {
  name: 'AppSpecialCard',
  components: {
    AppButton,
  },
  emits: ['clickButton'],
  props: {
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.app-card {
  border-radius: 6px;
  background-color: $white-color;
  padding: 32px 24px 35px;
  text-align: center;
  margin: 0 10px 10px 0;
  width: calc((100% - 20px) / 3);

  @media (max-width: 1201px) {
    width: calc(50% - 5px);
    margin-right: 0;

    &:nth-child(2n + 2) {
      margin-left: 10px;
    }
  }

  @media (max-width: 769px) {
    width: 100%;
    &:nth-child(2n + 2) {
      margin-left: 0;
    }
  }

  &__body {
    @include flex-space-center;
    flex-direction: column;
    height: 100%;
  }

  &__wrapper {
    @include flex-align-center;
    flex-direction: column;
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 18px;
    color: $brown-color;
    margin-bottom: 8px;
  }

  &__picture {
    width: 235px;
    height: 185px;

    @media (max-width: 993px) {
      width: 316px;
      height: 249px;
    }

    @media (max-width: 380px) {
      width: 100%;
      height: auto;
    }
  }

  &__img {
    width: 235px;
    height: 185px;

    @media (max-width: 993px) {
      width: 316px;
      height: 249px;
    }

    @media (max-width: 380px) {
      width: 100%;
      height: auto;
    }
  }

  &__button {
    font-size: 14px;
    margin: 50px 0;
  }

  &__description {
    font-size: 16px;
  }
}
</style>
