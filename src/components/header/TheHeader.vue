<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <router-link class="header__logo" to="/">
          <img class="header__img" src="../../assets/img/logo.svg" alt="logo" />
        </router-link>
        <div class="row-center">
          <div class="row-center wrapper-relative">
            <div class="header__menu row-center">
              <template v-if="menuIsOpen">
                <AppMenu :menu="menuList" />
                <AppButton
                  class="header__button"
                  font="gotham"
                  view="transparent"
                  textTransform="uppercase"
                  :disabled="Boolean(componentFormName)"
                  @clickButton="
                    setComponentFormName(COMPONENT_FORM_NAMES.login)
                  "
                  >{{ $t('app.utils.login') }}</AppButton
                >
              </template>
              <AppLanguage
                v-else
                :languages="locales"
                :selectedLanguageTitle="currentLocale.title"
                @selectLanguage="selectLanguageHandler"
              />
            </div>
            <div class="header__forms" v-if="componentFormName">
              <AppToggleList
                class="header__toggle"
                :list="formToggleList"
                :toShow="(item) => $t(item.title)"
                :toActive="
                  (item) => item.componentFormName === componentFormName
                "
                :activeItem="componentFormName"
                @toggleItem="setComponentFormName($event.componentFormName)"
              />
              <AppCross
                class="header__cross"
                @clickCross="setComponentFormName('')"
              />
              <component
                class="header__form"
                :is="componentFormName"
                @toRegistration="
                  setComponentFormName(COMPONENT_FORM_NAMES.registration)
                "
              />
            </div>
          </div>
          <AppBurgerButton :isCross="menuIsOpen" @clickButton="toggleMenu" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { menuList } from './menuList'
import AppLanguage from '@elements/AppLanguage'
import AppBurgerButton from '@elements/AppBurgerButton'
import AppButton from '@elements/AppButton'
import AppCross from '@icons/CrossIcon'
import AppToggleList from '@elements/AppToggleList'
const AppMenu = defineAsyncComponent(() =>
  import(/*webpackChunkName: "appMenu"*/ '@elements/AppMenu')
)
const LoginForm = defineAsyncComponent(() =>
  import(/*webpackChunkName: "loginForm"*/ '@components/forms/LoginForm')
)
const RegistrationForm = defineAsyncComponent(() =>
  import(
    /*webpackChunkName: "registrationForm"*/ '@components/forms/RegistrationForm'
  )
)

export default {
  name: 'TheHeader',
  components: {
    AppLanguage,
    AppBurgerButton,
    AppButton,
    AppCross,
    AppToggleList,
    AppMenu,
    LoginForm,
    RegistrationForm,
  },
  data() {
    return {
      menuIsOpen: true,
      menuList,
      componentFormName: 'LoginForm',
      COMPONENT_FORM_NAMES: {
        registration: 'RegistrationForm',
        login: 'LoginForm',
      },
    }
  },
  computed: {
    ...mapState({
      currentLocale: (state) => state.locale.currentLocale,
      locales: (state) => state.locale.locales,
    }),
    formToggleList() {
      return [
        {
          title: 'app.utils.login',
          componentFormName: this.COMPONENT_FORM_NAMES.login,
        },
        {
          title: 'app.login.registration',
          componentFormName: this.COMPONENT_FORM_NAMES.registration,
        },
      ]
    },
  },
  methods: {
    ...mapActions({
      changeLocale: 'locale/changeLocale',
    }),
    selectLanguageHandler(language) {
      this.changeLocale({ locale: language.title, languages: this.locales })
    },
    setComponentFormName(value) {
      this.componentFormName = value
    },
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen
      if (!this.menuIsOpen) {
        this.setComponentFormName('')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  background-color: $white-color;

  &__inner {
    @include flex-justify-space;
    padding: 15px 0;
  }

  &__img {
    width: 115px;
    height: 47px;

    @media (max-width: 577px) {
      width: 90px;
      height: 37px;
    }
  }

  &__button {
    margin: 0 16px;
    font-size: 14px;
  }

  &__menu {
    @media (max-width: 769px) {
      display: none;
    }
  }

  &__forms {
    @include absolute-top-right(100%);
    z-index: 10;
    width: 340px;

    @media (max-width: 769px) {
      @include fixed-full;
      background-color: $white-color;

      .header__form {
        box-shadow: initial;
      }
    }
  }

  &__toggle {
    display: none;
    margin-bottom: 32px;

    @media (max-width: 769px) {
      @include flex;
      padding-right: 47px;
    }
  }

  &__cross {
    @include absolute-top-right(24px, 24px);
    z-index: 10;

    @media (max-width: 769px) {
      top: 13px;
    }
  }
}
</style>
