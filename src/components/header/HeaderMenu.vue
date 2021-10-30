<template>
  <div class="header-menu">
    <div class="header-menu__section header-menu_top">
      <AppCross class="header-menu__cross" @clickCross="$emit('clickCross')" />
    </div>
    <div class="header-menu__section padding_sides-0">
      <AppMenu class="header-menu__list" :menu="menuList" />
    </div>
    <div class="header-menu__section header-menu__login">
      <div class="header-menu__text media_769-hidden">
        {{ $t('app.utils.loginBonusesAndGifts') }}
      </div>
      <AppButton
        class="header-menu__button"
        font="gotham"
        view="transparent"
        textTransform="uppercase"
        :disabled="buttonDisabled"
        @clickButton="$emit('clickButton')"
        >{{ $t('app.utils.login') }}</AppButton
      >
    </div>

    <div class="header-menu__section border-none media_769-hidden">
      <a class="header-menu__phone" href="tel:73952333355"
        >+7 (3952) 33-33-55</a
      >
      <a class="header-menu__icon" href="tel:73952333355">
        <PhoneIcon />
      </a>
    </div>

    <div class="header-menu__language header-menu__section border-none">
      <AppLanguage
        :languages="locales"
        :selectedLanguageTitle="selectedLocaleTitle"
        @selectLanguage="$emit('selectLanguage', $event)"
      />
    </div>
  </div>
</template>

<script>
import AppMenu from '@elements/AppMenu'
import AppButton from '@elements/AppButton'
import AppLanguage from '@elements/AppLanguage'
import AppCross from '@icons/CrossIcon'
import PhoneIcon from '@icons/PhoneIcon'

export default {
  name: 'HeaderMenu',
  emits: ['clickButton', 'selectLanguage', 'clickCross'],
  components: {
    AppMenu,
    AppButton,
    AppLanguage,
    AppCross,
    PhoneIcon,
  },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
    selectedLocaleTitle: {
      type: String,
      default: '',
    },
    locales: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.header-menu {
  @include flex-align-center;

  @media (max-width: 769px) {
    @include fixed-full;
    left: 0;
    z-index: 900;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    overflow: auto;
    background-color: $white-color;
    transition: 0.7s;
  }

  .media_769-hidden {
    display: none;

    @media (max-width: 769px) {
      display: block;
    }
  }

  &__section {
    position: relative;
    @media (max-width: 769px) {
      @include flex-space-center;
      width: 100%;
      border-bottom: 1px solid $dark-smoky-white;
      padding: 16px 20px;

      &.padding_sides-0 {
        padding: 16px 0;
      }

      &.media_769-hidden {
        display: flex;
      }

      &.border-none {
        border-bottom: none;
      }
    }
  }

  &_top {
    display: none;
    order: -2;

    @media (max-width: 769px) {
      display: flex;
    }
  }

  &__cross {
    margin: 0 0 0 auto;
  }

  &__list {
    width: 100%;
    padding: 0;
    @media (max-width: 769px) {
      font-size: 18px;
      font-weight: 700;
    }
  }

  &__button {
    margin: 0 16px;
    font-size: 14px;

    @media (max-width: 769px) {
      margin-right: 0;
    }
  }

  &__login {
    @media (max-width: 769px) {
      order: -1;
    }
  }

  &__phone {
    font-family: $gotham-font;
    font-size: 16px;
    font-weight: 700;
    color: $brown-color;
    @include green-color-hover;
  }

  &__icon {
    @include flex-center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid $light-telegrey;
    color: $brown-color;

    @include green-color-hover;
  }

  &__language {
    display: none;

    @media (max-width: 769px) {
      @include flex-center;
    }
  }
}
</style>
