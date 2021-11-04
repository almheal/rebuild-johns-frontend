<template>
  <div class="halves-card">
    <div class="halves-card__content">
      <h5 class="halves-card__title">{{ $t('app.halves.card.title') }}</h5>
      <div class="halves-card__picture">
        <picture>
          <source
            srcset="../../assets/img/halvesPizza.webp"
            type="image/webp"
          />
          <source srcset="../../assets/img/halvesPizza.png" type="image/png" />
        </picture>
        <img
          class="halves-card__img"
          src="../../assets/img/halvesPizza.webp"
          alt="halves-pizza"
        />
      </div>
    </div>
    <div class="halves-card__content">
      <app-button
        class="halves-card__button"
        :classes="{ uppercase: true, 'font-gotham': true }"
        :text="$t('app.halves.card.selectPizza')"
        backgroundColor="greenTransparent"
        color="green"
        @clickButton="$router.push('/halves')"
      />
      <div class="halves-card__text">
        {{ $t('app.halves.card.combineTwoFlavors') + '!' }}
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@elements/AppButton'

export default {
  name: 'HalvesPizzaCard',
  components: {
    AppButton,
  },
}
</script>

<style lang="scss" scoped>
.halves-card {
  @include flex-space-center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  background-color: $white-color;
  border-radius: 10px;
  padding: 32px 24px 35px;

  &__title {
    font-family: $gotham-font;
    font-size: 18px;
    font-weight: 700;
    color: $brown-color;
    margin-bottom: 8px;
  }

  &__picture {
    min-height: 190px;
  }

  &__img {
    max-width: 100%;
    max-height: 100%;
  }

  &__button {
    width: 100%;
    margin-bottom: 50px;
  }

  &__text {
    font-size: 16px;
    line-height: 1.5;
  }
}
</style>
